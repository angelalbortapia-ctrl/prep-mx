import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import type { ExamAnswerInput, ExamSubmitResult } from './exam-submit';
import { assertSupabaseUserId } from './user-ids';

type Supabase = SupabaseClient<Database>;

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isUuid(id: string): boolean {
  return UUID_RE.test(id);
}

interface ProgressRow {
  question_id: string | null;
  is_correct: boolean;
  opcion_elegida: string | null;
}

async function fetchSessionRows(
  supabase: Supabase,
  userId: string,
  examSessionId: string,
  questionId?: string
): Promise<ProgressRow[]> {
  let query = supabase
    .from('user_progress')
    .select('question_id, is_correct, opcion_elegida')
    .eq('user_id', userId)
    .eq('exam_session_id', examSessionId);

  if (questionId) {
    query = query.eq('question_id', questionId);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []) as ProgressRow[];
}

function buildResultFromRows(
  sessionId: string,
  rows: ProgressRow[],
  answers: ExamAnswerInput[],
  materiaByQuestion: Record<string, string>
): ExamSubmitResult {
  let score = 0;
  let skippedDemoCount = 0;
  const materiaBreakdown: Record<string, { correct: number; total: number }> = {};

  for (const answer of answers) {
    if (answer.isCorrect) score += 1;
    const materia = materiaByQuestion[answer.questionId] ?? 'general';
    const bucket = materiaBreakdown[materia] ?? { correct: 0, total: 0 };
    bucket.total += 1;
    if (answer.isCorrect) bucket.correct += 1;
    materiaBreakdown[materia] = bucket;
    if (!isUuid(answer.questionId)) skippedDemoCount += 1;
  }

  const total = answers.length;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  return {
    examSessionId: sessionId,
    score,
    total,
    percentage,
    savedCount: rows.length,
    skippedDemoCount,
    xpEarned: 0,
    materiaBreakdown,
  };
}

/**
 * Si el intento ya se guardó (mismo examSessionId), devuelve el resultado sin reinsertar.
 */
export async function findIdempotentExamResult(
  supabase: Supabase,
  userId: string,
  examSessionId: string,
  answers: ExamAnswerInput[],
  mode: 'practice' | 'exam'
): Promise<ExamSubmitResult | null> {
  if (!isUuid(examSessionId)) return null;
  const dbUserId = assertSupabaseUserId(userId, 'findIdempotentExamResult');

  if (mode === 'practice') {
    const questionId = answers[0]?.questionId;
    if (!questionId || !isUuid(questionId)) return null;

    const rows = await fetchSessionRows(supabase, dbUserId, examSessionId, questionId);
    if (!rows.length) return null;

    const { data: questions } = await supabase
      .from('questions')
      .select('id, materia')
      .eq('id', questionId)
      .maybeSingle();

    const materiaByQuestion: Record<string, string> = {};
    if (questions) materiaByQuestion[questions.id] = questions.materia;

    return buildResultFromRows(examSessionId, rows, answers, materiaByQuestion);
  }

  const rows = await fetchSessionRows(supabase, dbUserId, examSessionId);
  if (!rows.length) return null;

  const questionIds = rows.map((r) => r.question_id).filter(Boolean) as string[];
  const materiaByQuestion: Record<string, string> = {};

  if (questionIds.length) {
    const { data: questions } = await supabase
      .from('questions')
      .select('id, materia')
      .in('id', questionIds);

    for (const q of questions ?? []) {
      materiaByQuestion[q.id] = q.materia;
    }
  }

  return buildResultFromRows(examSessionId, rows, answers, materiaByQuestion);
}
