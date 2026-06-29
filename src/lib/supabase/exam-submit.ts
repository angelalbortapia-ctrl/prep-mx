import { calcularProximaRevision } from '@/lib/sm2';
import { syncStudyStreak } from '@/lib/gamification/streak';
import {
  getDraftAnswersForSession,
  markExamDraftSubmitted,
} from '@/lib/supabase/exam-draft';
import { findIdempotentExamResult } from '@/lib/supabase/exam-submit-idempotency';
import { assertSupabaseUserId } from '@/lib/supabase/user-ids';
import type { DbUserRow } from '@/types/database';
import { createServerSupabaseClient } from './server';

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export interface ExamAnswerInput {
  questionId: string;
  opcionElegida: string | null;
  isCorrect: boolean;
  timeSpentSeconds?: number;
}

export interface ExamSubmitResult {
  examSessionId: string;
  score: number;
  total: number;
  percentage: number;
  savedCount: number;
  skippedDemoCount: number;
  xpEarned: number;
  materiaBreakdown: Record<string, { correct: number; total: number }>;
  /** true si el intento ya existía (re-submit / doble click) */
  duplicate?: boolean;
}

export interface SubmitExamOptions {
  mode?: 'practice' | 'exam';
}

function isUuid(id: string): boolean {
  return UUID_RE.test(id);
}

function sm2Quality(isCorrect: boolean): 0 | 1 | 2 | 3 | 4 | 5 {
  return isCorrect ? 4 : 1;
}

function addDays(base: Date, days: number): string {
  const d = new Date(base);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Persiste respuestas del simulacro en user_progress con intervalos SM-2. */
export async function submitExamAnswers(
  user: DbUserRow,
  answers: ExamAnswerInput[],
  examSessionId?: string,
  options?: SubmitExamOptions
): Promise<ExamSubmitResult> {
  const sessionId = examSessionId ?? crypto.randomUUID();
  const mode = options?.mode ?? (answers.length === 1 ? 'practice' : 'exam');
  const supabase = createServerSupabaseClient();
  const dbUserId = assertSupabaseUserId(user.id, 'submitExamAnswers');

  let answersToProcess = answers;
  if (mode === 'exam' && isUuid(sessionId)) {
    const draftAnswers = await getDraftAnswersForSession(supabase, dbUserId, sessionId);
    if (draftAnswers.length > 0) {
      answersToProcess = draftAnswers;
    }
  }

  if (answersToProcess.length === 0) {
    throw new Error('No hay respuestas para calificar');
  }

  const existing = await findIdempotentExamResult(
    supabase,
    dbUserId,
    sessionId,
    answersToProcess,
    mode
  );
  if (existing) {
    if (mode === 'exam' && isUuid(sessionId)) {
      await markExamDraftSubmitted(supabase, dbUserId, sessionId);
    }
    return { ...existing, duplicate: true };
  }

  let score = 0;
  const materiaBreakdown: Record<string, { correct: number; total: number }> = {};
  const uuidAnswers = answersToProcess.filter((a) => isUuid(a.questionId));
  const questionIds = uuidAnswers.map((a) => a.questionId);

  const previousProgress: Record<string, { interval_days: number; ease_factor: number }> = {};
  if (questionIds.length) {
    const { data } = await supabase
      .from('user_progress')
      .select('question_id, interval_days, ease_factor, answered_at')
      .eq('user_id', dbUserId)
      .in('question_id', questionIds)
      .order('answered_at', { ascending: false });

    for (const row of data ?? []) {
      if (row.question_id && !previousProgress[row.question_id]) {
        previousProgress[row.question_id] = {
          interval_days: row.interval_days ?? 1,
          ease_factor: Number(row.ease_factor ?? 2.5),
        };
      }
    }
  }

  const questionMaterias: Record<string, string> = {};
  if (questionIds.length) {
    const { data: questions } = await supabase
      .from('questions')
      .select('id, materia')
      .in('id', questionIds);

    for (const q of questions ?? []) {
      questionMaterias[q.id] = q.materia;
    }
  }

  const rowsToInsert: Array<{
    user_id: string;
    question_id: string;
    exam_session_id: string;
    opcion_elegida: string | null;
    is_correct: boolean;
    time_spent_seconds: number;
    next_review_at: string;
    interval_days: number;
    ease_factor: number;
  }> = [];

  const now = new Date();
  let skippedDemoCount = 0;

  for (const answer of answersToProcess) {
    if (answer.isCorrect) score += 1;

    const materia = questionMaterias[answer.questionId] ?? 'general';
    const bucket = materiaBreakdown[materia] ?? { correct: 0, total: 0 };
    bucket.total += 1;
    if (answer.isCorrect) bucket.correct += 1;
    materiaBreakdown[materia] = bucket;

    if (!isUuid(answer.questionId)) {
      skippedDemoCount += 1;
      continue;
    }

    const prev = previousProgress[answer.questionId];
    const intervalo = prev?.interval_days ?? 1;
    const facilidad = prev?.ease_factor ?? 2.5;
    const { nuevoIntervalo, nuevaFacilidad } = calcularProximaRevision(
      sm2Quality(answer.isCorrect),
      intervalo,
      facilidad
    );

    rowsToInsert.push({
      user_id: dbUserId,
      question_id: answer.questionId,
      exam_session_id: sessionId,
      opcion_elegida: answer.opcionElegida,
      is_correct: answer.isCorrect,
      time_spent_seconds: answer.timeSpentSeconds ?? 0,
      next_review_at: addDays(now, nuevoIntervalo),
      interval_days: nuevoIntervalo,
      ease_factor: nuevaFacilidad,
    });
  }

  if (rowsToInsert.length) {
    const { error } = await supabase.from('user_progress').insert(rowsToInsert);
    if (error) throw new Error(error.message);
  }

  const total = answersToProcess.length;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const xpEarned = score * 10;

  if (xpEarned > 0) {
    await supabase
      .from('users')
      .update({ xp_total: (user.xp_total ?? 0) + xpEarned })
      .eq('id', user.id);
  }

  if (rowsToInsert.length > 0) {
    const refreshed = {
      ...user,
      xp_total: (user.xp_total ?? 0) + xpEarned,
    };
    await syncStudyStreak(supabase, refreshed);
  }

  if (mode === 'exam' && isUuid(sessionId)) {
    await markExamDraftSubmitted(supabase, dbUserId, sessionId);
  }

  return {
    examSessionId: sessionId,
    score,
    total,
    percentage,
    savedCount: rowsToInsert.length,
    skippedDemoCount,
    xpEarned,
    materiaBreakdown,
  };
}
