import { NextResponse } from 'next/server';
import { deleteExamDraft, getExamDraft, upsertExamDraft } from '@/lib/supabase/exam-draft';
import { isExamSessionConflictError } from '@/lib/supabase/exam-active-session';
import type { ExamAnswerInput } from '@/lib/supabase/exam-submit';
import { requireAuthenticatedSupabaseUser } from '@/lib/supabase/users';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

interface DraftBody {
  examSessionId?: string;
  examId?: string;
  mode?: 'practice' | 'exam';
  currentIndex?: number;
  answers?: ExamAnswerInput[];
}

function parseDraftBody(raw: unknown): DraftBody | null {
  if (!raw || typeof raw !== 'object') return null;
  const body = raw as DraftBody;
  if (!body.examSessionId?.trim()) return null;
  if (body.mode !== 'practice' && body.mode !== 'exam') return null;
  if (!Array.isArray(body.answers)) return null;
  return body;
}

/** GET ?examSessionId=… o ?examId=… — recupera borrador en progreso. */
export async function GET(request: Request) {
  const authResult = await requireAuthenticatedSupabaseUser();
  if ('error' in authResult) return authResult.error;

  const { searchParams } = new URL(request.url);
  const examSessionId = searchParams.get('examSessionId') ?? undefined;
  const examId = searchParams.get('examId') ?? undefined;

  if (!examSessionId && !examId) {
    return NextResponse.json(
      { error: 'Indica examSessionId o examId' },
      { status: 400 }
    );
  }

  try {
    const supabase = createServerSupabaseClient();
    const draft = await getExamDraft(supabase, authResult.user.id, { examSessionId, examId });
    if (!draft) {
      return NextResponse.json({ draft: null });
    }
    return NextResponse.json({ draft });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Error al cargar borrador';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/** POST — autosave debounced del simulacro (respuestas parciales). */
export async function POST(request: Request) {
  const authResult = await requireAuthenticatedSupabaseUser();
  if ('error' in authResult) return authResult.error;

  let body: DraftBody | null;
  try {
    body = parseDraftBody(await request.json());
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  if (!body) {
    return NextResponse.json({ error: 'Payload de borrador inválido' }, { status: 400 });
  }

  for (const answer of body.answers!) {
    if (!answer.questionId || typeof answer.isCorrect !== 'boolean') {
      return NextResponse.json(
        { error: 'Cada respuesta requiere questionId e isCorrect' },
        { status: 400 }
      );
    }
  }

  try {
    const supabase = createServerSupabaseClient();
    const result = await upsertExamDraft(supabase, authResult.user.id, {
      examSessionId: body.examSessionId!.trim(),
      examId: body.examId ?? null,
      mode: body.mode!,
      currentIndex: body.currentIndex,
      answers: body.answers!,
    });

    return NextResponse.json({
      ok: true,
      savedCount: result.savedCount,
      savedAt: new Date().toISOString(),
    });
  } catch (e) {
    if (isExamSessionConflictError(e)) {
      return NextResponse.json(
        {
          error: 'Ya tienes un simulacro en curso en otro dispositivo o pestaña.',
          code: 'ACTIVE_EXAM_SESSION',
          activeSession: e.active,
        },
        { status: 409 }
      );
    }
    const message = e instanceof Error ? e.message : 'Error al guardar borrador';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/** DELETE ?examSessionId=… — limpia borrador (reintentar simulacro). */
export async function DELETE(request: Request) {
  const authResult = await requireAuthenticatedSupabaseUser();
  if ('error' in authResult) return authResult.error;

  const examSessionId = new URL(request.url).searchParams.get('examSessionId')?.trim();
  if (!examSessionId) {
    return NextResponse.json({ error: 'examSessionId requerido' }, { status: 400 });
  }

  try {
    const supabase = createServerSupabaseClient();
    await deleteExamDraft(supabase, authResult.user.id, examSessionId);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Error al borrar borrador';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
