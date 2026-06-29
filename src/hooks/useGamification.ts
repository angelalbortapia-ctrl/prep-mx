'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import type { PeerRankingResult } from '@/lib/gamification/ranking';

export interface GamificationResponse {
  streakDays: number;
  studiedToday: boolean;
  streakQualifiedToday: boolean;
  streakAtRisk: boolean;
  questionsAnsweredToday: number;
  streakGoal: number;
  lastStudyDate: string | null;
  streakMessage: string;
  xpTotal: number;
  isPremium: boolean;
  ranking: PeerRankingResult | null;
  rankingMessage: string | null;
}

export function useGamification() {
  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<GamificationResponse>({
    queryKey: ['study', 'gamification'],
    queryFn: async () => {
      const res = await fetch('/api/study/gamification', { credentials: 'include' });
      if (!res.ok) throw new Error('Gamificación no disponible');
      return (await res.json()) as GamificationResponse;
    },
    enabled: isLoaded && isSignedIn,
    staleTime: 60_000,
    refetchOnWindowFocus: true,
  });
}
