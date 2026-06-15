import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { resolveCareerFromMetadata } from '@/lib/user-career';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { syncClerkUserToSupabase, getSupabaseUserByClerkId } from '@/lib/supabase/users';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  const client = await clerkClient();
  const clerkUser = await client.users.getUser(userId);
  const meta = clerkUser.publicMetadata as Record<string, unknown>;

  let dbUser = isSupabaseConfigured ? await getSupabaseUserByClerkId(userId) : null;
  if (!dbUser && isSupabaseConfigured) {
    dbUser = await syncClerkUserToSupabase(userId);
  }

  let averageScore: number | undefined;
  if (dbUser && isSupabaseConfigured) {
    const supabase = createServerSupabaseClient();
    const { data: progress } = await supabase
      .from('user_progress')
      .select('is_correct')
      .eq('user_id', dbUser.id)
      .order('answered_at', { ascending: false })
      .limit(50);

    if (progress?.length) {
      const correct = progress.filter((p) => p.is_correct).length;
      averageScore = Math.round((correct / progress.length) * 120);
    }
  }

  const careerContext = resolveCareerFromMetadata({
    examTarget: typeof meta.examTarget === 'string' ? meta.examTarget : dbUser?.exam_target,
    universidad: typeof meta.universidad === 'string' ? meta.universidad : undefined,
    careerId: typeof meta.careerId === 'string' ? meta.careerId : undefined,
  });

  return NextResponse.json({
    authenticated: true,
    clerkId: userId,
    fullName: typeof meta.fullName === 'string' ? meta.fullName : clerkUser.fullName,
    universidad: typeof meta.universidad === 'string' ? meta.universidad : careerContext?.universidad,
    examTarget: typeof meta.examTarget === 'string' ? meta.examTarget : dbUser?.exam_target,
    careerId: careerContext?.careerId,
    cutoffScore: careerContext?.career.cutoffScore,
    averageScore,
    examTokens: dbUser?.exam_tokens,
    onboardingComplete: meta.onboardingComplete === true,
  });
}
