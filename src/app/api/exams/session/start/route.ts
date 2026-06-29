import { NextResponse } from 'next/server';
import {
  assertCanOpenExamSession,
  ExamSessionConflictError,
  expireStaleExamSessions,
  findActiveExamSession,
  isExamSessionConflictError,
} from '@/lib/supabase/exam-active-session';
import { upsertExamDraft } from '@/lib/supabase/exam-draft';
import { requireAuthenticatedSupabaseUser } from '@/lib/supabase/users';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

function conflictResponse(active: ExamSessionConflictError['active']) {
  return NextResponse.json(
    {
      error: 'Ya tienes un simulacro en curso en otro dispositivo o pestaña.',
      code: 'ACTIVE_EXAM_SESSION',
      activeSession: active,
    },
    { status: 409 }
  );
}

/** GET — sesión de simulacro completo activa (si existe). */
export async function GET() {
  const authResult = await requireAuthenticatedSupabaseUser();
  if ('error' in authResult) return authResult.error;

  try {
    const supabase = createServerSupabaseClient();
    await expireStaleExamSessions(supabase, authResult.user.id);
    const active = await findActiveExamSession(supabase, authResult.user.id);
    return NextResponse.json({ activeSession: active });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Error al consultar sesión';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * POST — reclama sesión antes de iniciar simulacro cronometrado.
 * Body: { examSessionId, examId? }
 */
export async function POST(request: Request) {
  const authResult = await requireAuthenticatedSupabaseUser();
  if ('error' in authResult) return authResult.error;

  let body: { examSessionId?: string; examId?: string };
  try {
    body = (await request.json()) as { examSessionId?: string; examId?: string };
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  const examSessionId = body.examSessionId?.trim();
  if (!examSessionId) {
    return NextResponse.json({ error: 'examSessionId requerido' }, { status: 400 });
  }

  try {
    const supabase = createServerSupabaseClient();
    await assertCanOpenExamSession(supabase, authResult.user.id, examSessionId);

    await upsertExamDraft(supabase, authResult.user.id, {
      examSessionId,
      examId: body.examId ?? null,
      mode: 'exam',
      currentIndex: 0,
      answers: [],
    });

    return NextResponse.json({
      ok: true,
      examSessionId,
      examId: body.examId ?? null,
    });
  } catch (e) {
    if (isExamSessionConflictError(e)) {
      return conflictResponse(e.active);
    }
    const message = e instanceof Error ? e.message : 'No se pudo iniciar la sesión';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
