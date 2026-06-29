import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { requireAuthenticatedSupabaseUser } from '@/lib/supabase/users';
import { buildSm2SummaryForUser } from '@/lib/study/sm2-summary';

export const dynamic = 'force-dynamic';

export async function GET() {
  const authResult = await requireAuthenticatedSupabaseUser();
  if ('error' in authResult) return authResult.error;

  const supabase = createServerSupabaseClient();
  const summary = await buildSm2SummaryForUser(supabase, authResult.user.id);

  return NextResponse.json({
    synced: summary.dueTotal > 0 || authResult.user.xp_total != null,
    dueToday: summary.dueToday,
    dueTomorrow: summary.dueTomorrow,
    nextTopic: summary.nextTopic,
    nextReviewAt: summary.nextReviewAt,
    xpTotal: authResult.user.xp_total ?? 0,
    headlineMateria: summary.headlineMateria,
    headlineTema: summary.headlineTema,
    topicsByMateria: summary.topicsByMateria,
  });
}
