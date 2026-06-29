import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import type { DbUserRow } from '@/types/database';

type Supabase = SupabaseClient<Database>;

/** Mínimo de preguntas respondidas en un día para mantener / extender la racha. */
export const STREAK_DAILY_GOAL = 5;

/** Fecha local México (YYYY-MM-DD) para rachas de calendario. */
export function todayStudyDate(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Mexico_City',
  }).format(now);
}

export function yesterdayStudyDate(now = new Date()): string {
  const today = todayStudyDate(now);
  const [y, m, d] = today.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d - 1));
  return dt.toISOString().slice(0, 10);
}

export function computeNextStreak(
  lastStudyDate: string | null | undefined,
  currentStreak: number,
  today: string
): { streakDays: number; lastStudyDate: string } {
  if (lastStudyDate === today) {
    return { streakDays: Math.max(currentStreak, 1), lastStudyDate: today };
  }

  const yesterday = yesterdayStudyDate();
  if (lastStudyDate === yesterday) {
    return { streakDays: Math.max(currentStreak, 0) + 1, lastStudyDate: today };
  }

  return { streakDays: 1, lastStudyDate: today };
}

/** Respuestas guardadas hoy (MX) en user_progress. */
export async function countQuestionsAnsweredToday(
  supabase: Supabase,
  userId: string,
  now = new Date()
): Promise<number> {
  const today = todayStudyDate(now);
  const start = `${today}T00:00:00.000Z`;
  const end = `${today}T23:59:59.999Z`;

  const { count, error } = await supabase
    .from('user_progress')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('answered_at', start)
    .lte('answered_at', end);

  if (error) return 0;
  return count ?? 0;
}

/**
 * Racha visible: se pierde si no cumpliste la meta ayer ni hoy.
 * (Duolingo-style loss aversion)
 */
export function effectiveStreakDays(user: DbUserRow, now = new Date()): number {
  const today = todayStudyDate(now);
  const yesterday = yesterdayStudyDate(now);
  const last = user.last_study_date ?? null;
  const stored = user.current_streak_days ?? 0;

  if (stored <= 0 || !last) return 0;
  if (last === today || last === yesterday) return stored;
  return 0;
}

export interface StreakStatus {
  streakDays: number;
  effectiveStreakDays: number;
  studiedToday: boolean;
  streakQualifiedToday: boolean;
  questionsAnsweredToday: number;
  streakGoal: number;
  streakAtRisk: boolean;
  lastStudyDate: string | null;
}

export function streakStatusFromUser(
  user: DbUserRow,
  questionsAnsweredToday = 0,
  now = new Date()
): StreakStatus {
  const today = todayStudyDate(now);
  const yesterday = yesterdayStudyDate(now);
  const lastStudyDate = user.last_study_date ?? null;
  const stored = user.current_streak_days ?? 0;
  const effective = effectiveStreakDays(user, now);
  const streakQualifiedToday =
    questionsAnsweredToday >= STREAK_DAILY_GOAL || lastStudyDate === today;
  const studiedToday = streakQualifiedToday;

  const streakAtRisk =
    effective > 0 &&
    !streakQualifiedToday &&
    (lastStudyDate === yesterday || lastStudyDate === today);

  return {
    streakDays: stored,
    effectiveStreakDays: effective,
    studiedToday,
    streakQualifiedToday,
    questionsAnsweredToday,
    streakGoal: STREAK_DAILY_GOAL,
    streakAtRisk,
    lastStudyDate,
  };
}

/** Actualiza racha solo si hoy ya respondió al menos STREAK_DAILY_GOAL preguntas. */
export async function syncStudyStreak(supabase: Supabase, user: DbUserRow): Promise<number> {
  const questionsToday = await countQuestionsAnsweredToday(supabase, user.id);
  if (questionsToday < STREAK_DAILY_GOAL) {
    return effectiveStreakDays(user);
  }

  const today = todayStudyDate();
  const lastStudy = user.last_study_date ?? null;
  const current = user.current_streak_days ?? 0;

  const next = computeNextStreak(lastStudy, current, today);

  if (lastStudy === today && current === next.streakDays) {
    return effectiveStreakDays({ ...user, current_streak_days: current, last_study_date: lastStudy });
  }

  const { error } = await supabase
    .from('users')
    .update({
      current_streak_days: next.streakDays,
      last_study_date: next.lastStudyDate,
    })
    .eq('id', user.id);

  if (error) throw new Error(error.message);
  return next.streakDays;
}

export function streakMotivation(status: Pick<
  StreakStatus,
  'effectiveStreakDays' | 'streakQualifiedToday' | 'questionsAnsweredToday' | 'streakGoal' | 'streakAtRisk'
>): string {
  const { effectiveStreakDays, streakQualifiedToday, questionsAnsweredToday, streakGoal, streakAtRisk } =
    status;
  const remaining = Math.max(0, streakGoal - questionsAnsweredToday);

  if (effectiveStreakDays <= 0 && !streakQualifiedToday) {
    if (questionsAnsweredToday > 0) {
      return `Te faltan ${remaining} pregunta${remaining === 1 ? '' : 's'} hoy para encender tu racha.`;
    }
    return `Responde ${streakGoal} preguntas hoy para empezar tu racha.`;
  }

  if (streakAtRisk && !streakQualifiedToday) {
    return `¡Tu racha de ${effectiveStreakDays} días está en riesgo! Faltan ${remaining} preguntas antes de medianoche.`;
  }

  if (streakQualifiedToday) {
    if (effectiveStreakDays >= 7) {
      return `¡${effectiveStreakDays} días seguidos! Modo Turbo: tu cerebro ya está en ritmo de examen.`;
    }
    return `¡Racha activa! Llevas ${effectiveStreakDays} día${effectiveStreakDays === 1 ? '' : 's'} cumpliendo la meta diaria.`;
  }

  return `Responde ${streakGoal} preguntas hoy para mantener tu racha.`;
}
