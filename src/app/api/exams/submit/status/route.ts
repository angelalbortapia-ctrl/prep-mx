import { NextResponse } from 'next/server';
import { getExamSessionSummary } from '@/lib/supabase/exam-session';
import { requireAuthenticatedSupabaseUser } from '@/lib/supabase/users';

export const dynamic = 'force-dynamic';

/** GET ?examSessionId= — polling mientras Inngest procesa el simulacro. */
export async function GET(request: Request) {
  const authResult = await requireAuthenticatedSupabaseUser();
  if ('error' in authResult) return authResult.error;

  const examSessionId = new URL(request.url).searchParams.get('examSessionId')?.trim();
  if (!examSessionId) {
    return NextResponse.json({ error: 'examSessionId requerido' }, { status: 400 });
  }

  const summary = await getExamSessionSummary(authResult.user.id, examSessionId);
  if (!summary) {
    return NextResponse.json({ status: 'processing' as const });
  }

  return NextResponse.json({
    status: 'completed' as const,
    summary,
  });
}
