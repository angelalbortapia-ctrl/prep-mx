import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import { addCalendarDaysIso, getTodayCalendarIsoMx, daysUntilCalendarIso } from '@/lib/format-date';

type Supabase = SupabaseClient<Database>;

export interface Sm2DueTopicGroup {
  materia: string;
  tema: string;
  dueCount: number;
}

export interface Sm2Summary {
  dueToday: number;
  dueTomorrow: number;
  dueTotal: number;
  nextTopic: string | null;
  nextReviewAt: string | null;
  topicsByMateria: Sm2DueTopicGroup[];
  /** Tema con más repasos vencidos hoy. */
  headlineMateria: string | null;
  headlineTema: string | null;
  headlineDueCount: number;
  /** Último tema fallado ayer (MX), si existe. */
  recentMissMateria: string | null;
  recentMissTema: string | null;
}

interface DueRow {
  question_id: string;
  next_review_at: string | null;
}

interface QuestionMeta {
  materia: string;
  tema: string;
}

function tomorrowIsoMx(now = new Date()): string {
  return addCalendarDaysIso(getTodayCalendarIsoMx(now), 1);
}

function yesterdayRangeUtc(now = new Date()): { start: string; end: string } {
  const yesterday = addCalendarDaysIso(getTodayCalendarIsoMx(now), -1);
  return {
    start: `${yesterday}T00:00:00.000Z`,
    end: `${yesterday}T23:59:59.999Z`,
  };
}

function groupDueTopics(
  dueRows: DueRow[],
  questions: Map<string, QuestionMeta>,
  today: string
): {
  dueToday: number;
  dueTomorrow: number;
  topicsByMateria: Sm2DueTopicGroup[];
  headlineMateria: string | null;
  headlineTema: string | null;
  headlineDueCount: number;
  nextTopic: string | null;
  nextReviewAt: string | null;
} {
  const temaCounts = new Map<string, Sm2DueTopicGroup>();
  const seenDueToday = new Set<string>();
  const seenDueTomorrow = new Set<string>();
  let dueToday = 0;
  let dueTomorrow = 0;
  const tomorrow = tomorrowIsoMx();

  for (const row of dueRows) {
    if (!row.next_review_at || !row.question_id) continue;
    const dateOnly = row.next_review_at.slice(0, 10);

    if (dateOnly <= today && !seenDueToday.has(row.question_id)) {
      seenDueToday.add(row.question_id);
      dueToday += 1;

      const q = questions.get(row.question_id);
      if (q) {
        const key = `${q.materia}::${q.tema}`;
        const existing = temaCounts.get(key);
        if (existing) {
          existing.dueCount += 1;
        } else {
          temaCounts.set(key, { materia: q.materia, tema: q.tema, dueCount: 1 });
        }
      }
    }

    if (dateOnly <= tomorrow && !seenDueTomorrow.has(row.question_id)) {
      seenDueTomorrow.add(row.question_id);
      dueTomorrow += 1;
    }
  }

  const topicsByMateria = Array.from(temaCounts.values()).sort((a, b) => b.dueCount - a.dueCount);
  const top = topicsByMateria[0] ?? null;

  const firstDue = dueRows.find((r) => r.next_review_at && r.next_review_at.slice(0, 10) <= tomorrow);
  let nextTopic: string | null = null;
  if (firstDue) {
    const q = questions.get(firstDue.question_id);
    if (q) nextTopic = `${q.materia} · ${q.tema}`;
  }

  return {
    dueToday,
    dueTomorrow,
    topicsByMateria,
    headlineMateria: top?.materia ?? null,
    headlineTema: top?.tema ?? null,
    headlineDueCount: top?.dueCount ?? 0,
    nextTopic,
    nextReviewAt: firstDue?.next_review_at ?? null,
  };
}

async function fetchQuestionMeta(
  supabase: Supabase,
  questionIds: string[]
): Promise<Map<string, QuestionMeta>> {
  const map = new Map<string, QuestionMeta>();
  if (!questionIds.length) return map;

  const unique = Array.from(new Set(questionIds));
  const { data } = await supabase
    .from('questions')
    .select('id, materia, tema')
    .in('id', unique);

  for (const row of data ?? []) {
    if (row.id) map.set(row.id, { materia: row.materia, tema: row.tema });
  }
  return map;
}

async function fetchYesterdayMissesByUser(
  supabase: Supabase,
  userIds: string[],
  now = new Date()
): Promise<Map<string, { materia: string; tema: string }>> {
  const result = new Map<string, { materia: string; tema: string }>();
  if (!userIds.length) return result;

  const { start, end } = yesterdayRangeUtc(now);
  const { data: misses } = await supabase
    .from('user_progress')
    .select('user_id, question_id, answered_at')
    .in('user_id', userIds)
    .eq('is_correct', false)
    .gte('answered_at', start)
    .lte('answered_at', end)
    .order('answered_at', { ascending: false });

  const latestQuestionByUser = new Map<string, string>();
  for (const row of misses ?? []) {
    if (!row.user_id || !row.question_id || latestQuestionByUser.has(row.user_id)) continue;
    latestQuestionByUser.set(row.user_id, row.question_id);
  }

  const questionIds = Array.from(latestQuestionByUser.values());
  const questions = await fetchQuestionMeta(supabase, questionIds);

  Array.from(latestQuestionByUser.entries()).forEach(([userId, questionId]) => {
    const q = questions.get(questionId);
    if (q) result.set(userId, { materia: q.materia, tema: q.tema });
  });

  return result;
}

/** Misma lógica que GET /api/study/sm2-summary — reutilizable en Inngest y API. */
export async function buildSm2SummaryForUser(
  supabase: Supabase,
  userId: string,
  now = new Date()
): Promise<Sm2Summary> {
  const today = getTodayCalendarIsoMx(now);
  const tomorrow = tomorrowIsoMx(now);

  const { data: dueRows, error } = await supabase
    .from('user_progress')
    .select('question_id, next_review_at')
    .eq('user_id', userId)
    .lte('next_review_at', tomorrow)
    .order('next_review_at', { ascending: true });

  if (error || !dueRows?.length) {
    return {
      dueToday: 0,
      dueTomorrow: 0,
      dueTotal: 0,
      nextTopic: null,
      nextReviewAt: null,
      topicsByMateria: [],
      headlineMateria: null,
      headlineTema: null,
      headlineDueCount: 0,
      recentMissMateria: null,
      recentMissTema: null,
    };
  }

  const questionIds = dueRows.map((r) => r.question_id).filter(Boolean) as string[];
  const questions = await fetchQuestionMeta(supabase, questionIds);
  const grouped = groupDueTopics(dueRows as DueRow[], questions, today);
  const missesByUser = await fetchYesterdayMissesByUser(supabase, [userId], now);
  const recentMiss = missesByUser.get(userId);

  return {
    dueToday: grouped.dueToday,
    dueTomorrow: grouped.dueTomorrow,
    dueTotal: grouped.dueTomorrow,
    nextTopic: grouped.nextTopic,
    nextReviewAt: grouped.nextReviewAt,
    topicsByMateria: grouped.topicsByMateria,
    headlineMateria: grouped.headlineMateria,
    headlineTema: grouped.headlineTema,
    headlineDueCount: grouped.headlineDueCount,
    recentMissMateria: recentMiss?.materia ?? null,
    recentMissTema: recentMiss?.tema ?? null,
  };
}

export interface Sm2MorningRecipient {
  userId: string;
  email: string;
  fullName: string | null;
  examDate: string | null;
  examTarget: string | null;
  daysUntilExam: number | null;
  summary: Sm2Summary;
}

/** Usuarios con repasos SM-2 vencidos hoy — candidatos al correo de las 8:00. */
export async function fetchSm2MorningRecipients(
  supabase: Supabase,
  now = new Date()
): Promise<Sm2MorningRecipient[]> {
  const today = getTodayCalendarIsoMx(now);

  const { data: dueRows, error } = await supabase
    .from('user_progress')
    .select('user_id, question_id, next_review_at')
    .lte('next_review_at', today);

  if (error || !dueRows?.length) return [];

  const dueByUser = new Map<string, DueRow[]>();
  for (const row of dueRows) {
    if (!row.user_id || !row.next_review_at || !row.question_id) continue;
    if (row.next_review_at.slice(0, 10) > today) continue;
    const list = dueByUser.get(row.user_id) ?? [];
    list.push({ question_id: row.question_id, next_review_at: row.next_review_at });
    dueByUser.set(row.user_id, list);
  }

  const userIds = Array.from(dueByUser.keys());
  if (!userIds.length) return [];

  const { data: users } = await supabase
    .from('users')
    .select('id, email, full_name, exam_date, exam_target')
    .in('id', userIds);

  const allQuestionIds = dueRows.map((r) => r.question_id).filter(Boolean) as string[];
  const questions = await fetchQuestionMeta(supabase, allQuestionIds);
  const missesByUser = await fetchYesterdayMissesByUser(supabase, userIds, now);

  const recipients: Sm2MorningRecipient[] = [];

  for (const user of users ?? []) {
    const userDue = dueByUser.get(user.id);
    if (!userDue?.length || !user.email) continue;

    const grouped = groupDueTopics(userDue, questions, today);
    if (grouped.dueToday < 1) continue;

    const recentMiss = missesByUser.get(user.id);
    const daysUntilExam = user.exam_date
      ? daysUntilCalendarIso(user.exam_date.slice(0, 10), today)
      : null;

    recipients.push({
      userId: user.id,
      email: user.email,
      fullName: user.full_name,
      examDate: user.exam_date,
      examTarget: user.exam_target,
      daysUntilExam: daysUntilExam != null && daysUntilExam >= 0 ? daysUntilExam : null,
      summary: {
        dueToday: grouped.dueToday,
        dueTomorrow: grouped.dueTomorrow,
        dueTotal: grouped.dueToday,
        nextTopic: grouped.nextTopic,
        nextReviewAt: grouped.nextReviewAt,
        topicsByMateria: grouped.topicsByMateria,
        headlineMateria: grouped.headlineMateria,
        headlineTema: grouped.headlineTema,
        headlineDueCount: grouped.headlineDueCount,
        recentMissMateria: recentMiss?.materia ?? null,
        recentMissTema: recentMiss?.tema ?? null,
      },
    });
  }

  return recipients;
}
