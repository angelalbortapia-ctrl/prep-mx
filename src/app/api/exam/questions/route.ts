import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { getExamQuestions } from '@/lib/supabase/questions';

export const dynamic = 'force-dynamic';

const ALLOWED_UNIS = new Set(['unam', 'ipn', 'uam']);

/**
 * Preguntas para el simulador vía TanStack Query.
 * Usuarios autenticados (Clerk) pueden recibir reactivos premium; anónimos solo gratuitos.
 */
export async function GET(request: Request) {
  const { userId } = await auth();
  const includePremium = Boolean(userId);

  const { searchParams } = new URL(request.url);

  const limitRaw = Number(searchParams.get('limit'));
  const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(Math.trunc(limitRaw), 1), 120) : 20;

  const uniParam = searchParams.get('uni')?.toLowerCase();
  const universidad = uniParam && ALLOWED_UNIS.has(uniParam) ? uniParam : undefined;

  const questions = await getExamQuestions(limit, universidad, includePremium);

  return NextResponse.json({
    questions,
    count: questions.length,
    universidad: universidad ?? 'todas',
    includePremium,
    fetchedAt: new Date().toISOString(),
  });
}
