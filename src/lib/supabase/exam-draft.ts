import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import type { ExamAnswerInput } from './exam-submit';
import {
  assertCanOpenExamSession,
  ExamSessionConflictError,
  findActiveExamSession,
  isUniqueActiveExamViolation,
} from './exam-active-session';
import { assertSupabaseUserId } from './user-ids';

type Supabase = SupabaseClient<Database>;

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export interface ExamDraftPayload {
  examSessionId: string;
  examId?: string | null;
  mode: 'practice' | 'exam';
  currentIndex?: number;
  answers: ExamAnswerInput[];
}

export interface ExamDraftSnapshot {
  examSessionId: string;
  examId: string | null;
  mode: 'practice' | 'exam';
  currentIndex: number;
  answers: ExamAnswerInput[];
  updatedAt: string | null;
}

function isUuid(id: string): boolean {
  return UUID_RE.test(id);
}

function rowToAnswer(row: {
  question_id: string;
  opcion_elegida: string | null;
  is_correct: boolean;
  time_spent_seconds: number | null;
}): ExamAnswerInput {
  return {
    questionId: row.question_id,
    opcionElegida: row.opcion_elegida,
    isCorrect: row.is_correct,
    timeSpentSeconds: row.time_spent_seconds ?? 0,
  };
}

/** Guarda o actualiza el borrador de una sesión de examen. */
export async function upsertExamDraft(
  supabase: Supabase,
  userId: string,
  payload: ExamDraftPayload
): Promise<{ savedCount: number }> {
  if (!isUuid(payload.examSessionId)) {
    throw new Error('examSessionId debe ser UUID');
  }

  const dbUserId = assertSupabaseUserId(userId, 'upsertExamDraft');
  const now = new Date().toISOString();

  if (payload.mode === 'exam') {
    await assertCanOpenExamSession(supabase, userId, payload.examSessionId);
  }

  const { error: sessionError } = await supabase.from('exam_draft_sessions').upsert(
    {
      user_id: dbUserId,
      exam_session_id: payload.examSessionId,
      exam_id: payload.examId ?? null,
      mode: payload.mode,
      current_index: payload.currentIndex ?? 0,
      status: 'in_progress',
      updated_at: now,
    },
    { onConflict: 'user_id,exam_session_id' }
  );

  if (sessionError) {
    if (payload.mode === 'exam' && isUniqueActiveExamViolation(sessionError)) {
      const active = await findActiveExamSession(supabase, userId);
      if (active) throw new ExamSessionConflictError(active);
    }
    throw new Error(sessionError.message);
  }

  if (!payload.answers.length) {
    return { savedCount: 0 };
  }

  const rows = payload.answers.map((answer) => ({
    user_id: dbUserId,
    exam_session_id: payload.examSessionId,
    question_id: answer.questionId,
    opcion_elegida: answer.opcionElegida,
    is_correct: answer.isCorrect,
    time_spent_seconds: answer.timeSpentSeconds ?? 0,
    updated_at: now,
  }));

  const { error: answersError } = await supabase
    .from('exam_answers_draft')
    .upsert(rows, { onConflict: 'user_id,exam_session_id,question_id' });

  if (answersError) throw new Error(answersError.message);

  return { savedCount: rows.length };
}

/** Carga borrador por sesión o el más reciente en progreso para un examId. */
export async function getExamDraft(
  supabase: Supabase,
  userId: string,
  options: { examSessionId?: string; examId?: string }
): Promise<ExamDraftSnapshot | null> {
  const dbUserId = assertSupabaseUserId(userId, 'getExamDraft');

  let session:
    | {
        exam_session_id: string;
        exam_id: string | null;
        mode: string;
        current_index: number;
        updated_at: string;
      }
    | null
    | undefined;

  if (options.examSessionId && isUuid(options.examSessionId)) {
    const { data, error } = await supabase
      .from('exam_draft_sessions')
      .select('exam_session_id, exam_id, mode, current_index, updated_at')
      .eq('user_id', dbUserId)
      .eq('exam_session_id', options.examSessionId)
      .eq('status', 'in_progress')
      .maybeSingle();

    if (error) throw new Error(error.message);
    session = data;
  } else if (options.examId) {
    const { data, error } = await supabase
      .from('exam_draft_sessions')
      .select('exam_session_id, exam_id, mode, current_index, updated_at')
      .eq('user_id', dbUserId)
      .eq('exam_id', options.examId)
      .eq('status', 'in_progress')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw new Error(error.message);
    session = data;
  }

  if (!session) return null;

  const { data: answerRows, error: answersError } = await supabase
    .from('exam_answers_draft')
    .select('question_id, opcion_elegida, is_correct, time_spent_seconds')
    .eq('user_id', dbUserId)
    .eq('exam_session_id', session.exam_session_id);

  if (answersError) throw new Error(answersError.message);

  const mode = session.mode === 'practice' ? 'practice' : 'exam';

  return {
    examSessionId: session.exam_session_id,
    examId: session.exam_id,
    mode,
    currentIndex: session.current_index ?? 0,
    answers: (answerRows ?? []).map(rowToAnswer),
    updatedAt: session.updated_at ?? null,
  };
}

export async function getDraftAnswersForSession(
  supabase: Supabase,
  userId: string,
  examSessionId: string
): Promise<ExamAnswerInput[]> {
  if (!isUuid(examSessionId)) return [];
  const dbUserId = assertSupabaseUserId(userId, 'getDraftAnswersForSession');

  const { data, error } = await supabase
    .from('exam_answers_draft')
    .select('question_id, opcion_elegida, is_correct, time_spent_seconds')
    .eq('user_id', dbUserId)
    .eq('exam_session_id', examSessionId);

  if (error) throw new Error(error.message);
  return (data ?? []).map(rowToAnswer);
}

/** Elimina borrador tras submit exitoso o al reiniciar simulacro. */
export async function deleteExamDraft(
  supabase: Supabase,
  userId: string,
  examSessionId: string
): Promise<void> {
  if (!isUuid(examSessionId)) return;
  const dbUserId = assertSupabaseUserId(userId, 'deleteExamDraft');

  const { error: answersError } = await supabase
    .from('exam_answers_draft')
    .delete()
    .eq('user_id', dbUserId)
    .eq('exam_session_id', examSessionId);

  if (answersError) throw new Error(answersError.message);

  const { error: sessionError } = await supabase
    .from('exam_draft_sessions')
    .delete()
    .eq('user_id', dbUserId)
    .eq('exam_session_id', examSessionId);

  if (sessionError) throw new Error(sessionError.message);
}

export async function markExamDraftSubmitted(
  supabase: Supabase,
  userId: string,
  examSessionId: string
): Promise<void> {
  await deleteExamDraft(supabase, userId, examSessionId);
}
