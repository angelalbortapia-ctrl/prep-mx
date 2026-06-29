import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { parseUniId } from '@/lib/uni-theme-config';
import { canViewPracticeExplanationsServer } from '@/lib/practice-access';
import { getBurstPracticeQuestions, getPracticeQuestionWithExplanation } from '@/lib/practice-burst';
import { submitExamAnswers } from '@/lib/supabase/exam-submit';
import { requireAuthenticatedSupabaseUser } from '@/lib/supabase/users';
import { SUBSCRIPTION_COOKIE_KEY, UNI_THEME_COOKIE_KEY } from '@/types/subscription';
import type { OpcionId } from '@/types/question';

export const dynamic = 'force-dynamic';

const ALLOWED_UNIS = new Set(['unam', 'ipn', 'uam']);

export async function GET(request: Request) {
  const authResult = await requireAuthenticatedSupabaseUser();
  if ('error' in authResult) return authResult.error;

  const { searchParams } = new URL(request.url);
  const limitRaw = Number(searchParams.get('limit'));
  const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(Math.trunc(limitRaw), 1), 60) : 25;

  const uniParam = searchParams.get('uni')?.toLowerCase();
  const universidad = uniParam && ALLOWED_UNIS.has(uniParam) ? uniParam : undefined;

  const questions = await getBurstPracticeQuestions(limit, universidad);

  return NextResponse.json({
    questions,
    count: questions.length,
    universidad: universidad ?? 'todas',
    explanationsGated: true,
  });
}

interface BurstAnswerBody {
  questionId?: string;
  opcionElegida?: OpcionId | null;
  timeSpentSeconds?: number;
}

export async function POST(request: Request) {
  const authResult = await requireAuthenticatedSupabaseUser();
  if ('error' in authResult) return authResult.error;

  let body: BurstAnswerBody;
  try {
    body = (await request.json()) as BurstAnswerBody;
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  const questionId = body.questionId?.trim();
  if (!questionId) {
    return NextResponse.json({ error: 'questionId requerido' }, { status: 400 });
  }

  const question = await getPracticeQuestionWithExplanation(questionId);
  if (!question) {
    return NextResponse.json({ error: 'Pregunta no encontrada' }, { status: 404 });
  }

  const opcionElegida = body.opcionElegida ?? null;
  const isCorrect = opcionElegida !== null && opcionElegida === question.opcion_correcta;

  const cookieStore = cookies();
  const subCookie = cookieStore.get(SUBSCRIPTION_COOKIE_KEY)?.value ?? null;
  const activeUni = parseUniId(cookieStore.get(UNI_THEME_COOKIE_KEY)?.value ?? 'unam');
  const canExplain = canViewPracticeExplanationsServer(authResult.user, activeUni, subCookie);

  let sm2: { xpEarned: number; savedCount: number } | null = null;
  try {
    const result = await submitExamAnswers(
      authResult.user,
      [
        {
          questionId,
          opcionElegida,
          isCorrect,
          timeSpentSeconds: body.timeSpentSeconds ?? 0,
        },
      ],
      `burst-${crypto.randomUUID()}`,
      { mode: 'practice' }
    );
    sm2 = { xpEarned: result.xpEarned, savedCount: result.savedCount };
  } catch {
    sm2 = null;
  }

  return NextResponse.json({
    isCorrect,
    correctOption: question.opcion_correcta,
    explanation: canExplain ? question.explicacion : null,
    explanationImagenUrl: canExplain ? question.explicacionImagenUrl ?? null : null,
    explanationVideoUrl: canExplain ? question.explicacionVideoUrl ?? null : null,
    explanationLocked: !canExplain,
    sm2,
  });
}
