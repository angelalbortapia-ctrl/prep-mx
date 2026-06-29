import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import { assertSupabaseUserId } from './user-ids';

type Supabase = SupabaseClient<Database>;

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Sin actividad de autosave → la sesión se libera (evita bloqueos eternos). */
export const EXAM_SESSION_STALE_MS = 4 * 60 * 60 * 1000;

export interface ActiveExamSession {
  examSessionId: string;
  examId: string | null;
  updatedAt: string;
}

export class ExamSessionConflictError extends Error {
  readonly code = 'ACTIVE_EXAM_SESSION' as const;
  readonly active: ActiveExamSession;

  constructor(active: ActiveExamSession) {
    super('Ya hay un simulacro en curso para esta cuenta');
    this.name = 'ExamSessionConflictError';
    this.active = active;
  }
}

function isUuid(id: string): boolean {
  return UUID_RE.test(id);
}

function toActiveSession(row: {
  exam_session_id: string;
  exam_id: string | null;
  updated_at: string;
}): ActiveExamSession {
  return {
    examSessionId: row.exam_session_id,
    examId: row.exam_id,
    updatedAt: row.updated_at,
  };
}

/** Elimina borradores de simulacro abandonados (sin submit). */
export async function expireStaleExamSessions(
  supabase: Supabase,
  userId: string
): Promise<number> {
  const dbUserId = assertSupabaseUserId(userId, 'expireStaleExamSessions');
  const staleBefore = new Date(Date.now() - EXAM_SESSION_STALE_MS).toISOString();

  const { data: staleRows, error: selectError } = await supabase
    .from('exam_draft_sessions')
    .select('exam_session_id')
    .eq('user_id', dbUserId)
    .eq('mode', 'exam')
    .eq('status', 'in_progress')
    .lt('updated_at', staleBefore);

  if (selectError) throw new Error(selectError.message);
  if (!staleRows?.length) return 0;

  for (const row of staleRows) {
    const sessionId = row.exam_session_id;
    await supabase
      .from('exam_answers_draft')
      .delete()
      .eq('user_id', dbUserId)
      .eq('exam_session_id', sessionId);
    await supabase
      .from('exam_draft_sessions')
      .delete()
      .eq('user_id', dbUserId)
      .eq('exam_session_id', sessionId);
  }

  return staleRows.length;
}

export async function findActiveExamSession(
  supabase: Supabase,
  userId: string
): Promise<ActiveExamSession | null> {
  const dbUserId = assertSupabaseUserId(userId, 'findActiveExamSession');

  const { data, error } = await supabase
    .from('exam_draft_sessions')
    .select('exam_session_id, exam_id, updated_at')
    .eq('user_id', dbUserId)
    .eq('mode', 'exam')
    .eq('status', 'in_progress')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;
  return toActiveSession(data);
}

/**
 * Solo permite una sesión `exam` en progreso por usuario.
 * Misma examSessionId → reanudar; otra → conflicto.
 */
export async function assertCanOpenExamSession(
  supabase: Supabase,
  userId: string,
  examSessionId: string
): Promise<void> {
  if (!isUuid(examSessionId)) {
    throw new Error('examSessionId debe ser UUID');
  }

  await expireStaleExamSessions(supabase, userId);

  const active = await findActiveExamSession(supabase, userId);
  if (active && active.examSessionId !== examSessionId) {
    throw new ExamSessionConflictError(active);
  }
}

export function isExamSessionConflictError(
  error: unknown
): error is ExamSessionConflictError {
  return error instanceof ExamSessionConflictError;
}

export function isUniqueActiveExamViolation(error: { code?: string }): boolean {
  return error.code === '23505';
}
