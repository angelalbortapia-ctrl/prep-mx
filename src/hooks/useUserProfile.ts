'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { queryKeys } from '@/hooks/useStudyData';
import type { Universidad } from '@/types/user-profile';

export interface UserProfileResponse {
  authenticated: boolean;
  clerkId?: string;
  fullName?: string;
  universidad?: Universidad;
  examTarget?: string;
  careerId?: string;
  cutoffScore?: number;
  averageScore?: number;
  examTokens?: number;
  onboardingComplete?: boolean;
}

export function useUserProfile() {
  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<UserProfileResponse>({
    queryKey: queryKeys.profile,
    queryFn: async () => {
      const res = await fetch('/api/user/profile', { credentials: 'include' });
      if (!res.ok) throw new Error('Perfil no disponible');
      return (await res.json()) as UserProfileResponse;
    },
    enabled: isLoaded && isSignedIn,
    staleTime: 5 * 60_000,
  });
}
