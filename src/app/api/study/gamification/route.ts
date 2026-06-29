import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getPeerRanking, rankingMotivation } from '@/lib/gamification/ranking';
import {
  countQuestionsAnsweredToday,
  streakMotivation,
  streakStatusFromUser,
  STREAK_DAILY_GOAL,
} from '@/lib/gamification/streak';
import { resolveCareerFromMetadata } from '@/lib/user-career';
import { requireAuthenticatedSupabaseUser } from '@/lib/supabase/users';
import { auth, clerkClient } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const authResult = await requireAuthenticatedSupabaseUser();
  if ('error' in authResult) return authResult.error;

  const { user } = authResult;
  const supabase = createServerSupabaseClient();

  const questionsAnsweredToday = await countQuestionsAnsweredToday(supabase, user.id);
  const streak = streakStatusFromUser(user, questionsAnsweredToday);

  let ranking = null;
  let rankingMessage: string | null = null;

  try {
    const { userId } = await auth();
    if (userId) {
      const client = await clerkClient();
      const clerkUser = await client.users.getUser(userId);
      const meta = clerkUser.publicMetadata as Record<string, unknown>;
      const careerContext = resolveCareerFromMetadata({
        examTarget: typeof meta.examTarget === 'string' ? meta.examTarget : user.exam_target,
        universidad: typeof meta.universidad === 'string' ? meta.universidad : undefined,
        careerId: typeof meta.careerId === 'string' ? meta.careerId : undefined,
      });

      const peer = await getPeerRanking(
        supabase,
        user.id,
        user.exam_target,
        careerContext?.career.label
      );
      if (peer) {
        ranking = peer;
        rankingMessage = rankingMotivation(peer);
      }
    }
  } catch {
    /* ranking es best-effort */
  }

  return NextResponse.json({
    streakDays: streak.effectiveStreakDays,
    rawStreakDays: streak.streakDays,
    studiedToday: streak.studiedToday,
    streakQualifiedToday: streak.streakQualifiedToday,
    streakAtRisk: streak.streakAtRisk,
    questionsAnsweredToday: streak.questionsAnsweredToday,
    streakGoal: STREAK_DAILY_GOAL,
    lastStudyDate: streak.lastStudyDate,
    streakMessage: streakMotivation(streak),
    xpTotal: user.xp_total ?? 0,
    isPremium: Boolean(user.is_premium),
    ranking,
    rankingMessage,
  });
}
