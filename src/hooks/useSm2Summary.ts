'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';

export interface Sm2SummaryResponse {
  synced: boolean;
  dueToday: number;
  dueTomorrow: number;
  nextTopic: string | null;
  /** Próxima fecha de repaso (YYYY-MM-DD desde Supabase). */
  nextReviewAt: string | null;
  xpTotal: number;
}

export function useSm2Summary() {
  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<Sm2SummaryResponse>({
    queryKey: ['study', 'sm2-summary'],
    queryFn: async () => {
      const res = await fetch('/api/study/sm2-summary', { credentials: 'include' });
      if (!res.ok) throw new Error('SM-2 no disponible');
      return (await res.json()) as Sm2SummaryResponse;
    },
    enabled: isLoaded && isSignedIn,
    staleTime: 60_000,
  });
}
