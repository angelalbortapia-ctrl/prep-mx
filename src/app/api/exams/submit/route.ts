import { NextResponse } from 'next/server';
import { captureApiRouteError } from '@/lib/observability/capture';
import { computeExamPreview, isExamSubmitAsyncEnabled } from '@/lib/exam-submit-preview';
import { enqueueExamSubmitted } from '@/lib/inngest/enqueue-exam';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { findIdempotentExamResult } from '@/lib/supabase/exam-submit-idempotency';
import { getDraftAnswersForSession } from '@/lib/supabase/exam-draft';
import { submitExamAnswers, type ExamAnswerInput } from '@/lib/supabase/exam-submit';
import { assertSupabaseUserId } from '@/lib/supabase/user-ids';
import { requireAuthenticatedSupabaseUser } from '@/lib/supabase/users';

export const dynamic = 'force-dynamic';

interface SubmitBody {
  examId?: string;
  examSessionId?: string;
  answers?: ExamAnswerInput[];
  mode?: 'practice' | 'exam';
}

function parseBody(raw: unknown): SubmitBody | null {
  if (!raw || typeof raw !== 'object') return null;
  const body = raw as SubmitBody;
  if (!Array.isArray(body.answers)) return null;
  return body;
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

async function resolveAnswersForSubmit(
  dbUserId: string,
  examSessionId: string,
  mode: 'practice' | 'exam',
  answers: ExamAnswerInput[]
): Promise<ExamAnswerInput[]> {
  if (mode !== 'exam' || !UUID_RE.test(examSessionId)) return answers;
  const supabase = createServerSupabaseClient();
  const draftAnswers = await getDraftAnswersForSession(supabase, dbUserId, examSessionId);
  return draftAnswers.length > 0 ? draftAnswers : answers;
}

export async function POST(request: Request) {
  const authResult = await requireAuthenticatedSupabaseUser();
  if ('error' in authResult) return authResult.error;

  let body: SubmitBody | null;
  try {
    body = parseBody(await request.json());
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  if (!body) {
    return NextResponse.json({ error: 'Cuerpo inválido: se requiere answers[]' }, { status: 400 });
  }

  const mode =
    body.mode === 'practice' || body.mode === 'exam'
      ? body.mode
      : body.answers!.length === 1
        ? 'practice'
        : 'exam';
  const answers = body.answers ?? [];

  if (!answers.length && mode !== 'exam') {
    return NextResponse.json({ error: 'Se requiere un arreglo answers no vacío' }, { status: 400 });
  }

  if (!body.examSessionId?.trim()) {
    return NextResponse.json(
      { error: 'examSessionId requerido para evitar envíos duplicados' },
      { status: 400 }
    );
  }

  for (const answer of answers) {
    if (!answer.questionId || typeof answer.isCorrect !== 'boolean') {
      return NextResponse.json({ error: 'Cada respuesta requiere questionId e isCorrect' }, { status: 400 });
    }
  }

  const examSessionId = body.examSessionId.trim();
  const dbUserId = assertSupabaseUserId(authResult.user.id, 'examSubmitApi');

  try {
    const answersToProcess = await resolveAnswersForSubmit(dbUserId, examSessionId, mode, answers);

    if (answersToProcess.length === 0 && mode === 'exam') {
      return NextResponse.json({ error: 'No hay respuestas para calificar' }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();
    const existing =
      answersToProcess.length > 0
        ? await findIdempotentExamResult(
            supabase,
            dbUserId,
            examSessionId,
            answersToProcess,
            mode
          )
        : null;

    if (existing) {
      return NextResponse.json({
        ok: true,
        processing: false,
        examId: body.examId ?? null,
        feedbackId: existing.examSessionId,
        duplicate: true,
        ...existing,
      });
    }

    // Modo práctica: una pregunta → guardado síncrono rápido
    if (mode === 'practice') {
      const result = await submitExamAnswers(authResult.user, answersToProcess, examSessionId, {
        mode,
      });
      return NextResponse.json({
        ok: true,
        processing: false,
        examId: body.examId ?? null,
        feedbackId: result.examSessionId,
        duplicate: false,
        ...result,
      });
    }

    const preview = computeExamPreview(answersToProcess);

    // Simulacro completo: encolar en Inngest si está configurado
    if (isExamSubmitAsyncEnabled()) {
      const queued = await enqueueExamSubmitted({
        userId: dbUserId,
        email: authResult.user.email,
        fullName: authResult.user.full_name,
        examSessionId,
        examId: body.examId ?? null,
        mode: 'exam',
        answers: answersToProcess,
      });

      if (queued) {
        return NextResponse.json({
          ok: true,
          processing: true,
          examId: body.examId ?? null,
          feedbackId: examSessionId,
          duplicate: false,
          ...preview,
          savedCount: 0,
          skippedDemoCount: 0,
          xpEarned: 0,
          materiaBreakdown: {},
        });
      }
    }

    // Fallback: sin Inngest (dev local) → procesamiento síncrono
    const result = await submitExamAnswers(authResult.user, answersToProcess, examSessionId, {
      mode: 'exam',
    });

    return NextResponse.json({
      ok: true,
      processing: false,
      examId: body.examId ?? null,
      feedbackId: result.examSessionId,
      duplicate: false,
      ...result,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Error al guardar';
    captureApiRouteError(e, {
      route: '/api/exams/submit',
      method: 'POST',
      status: 500,
      userId: authResult.user.id,
      examSessionId: body?.examSessionId?.trim(),
      extra: { mode: body?.mode ?? 'exam', examId: body?.examId ?? null },
    });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
