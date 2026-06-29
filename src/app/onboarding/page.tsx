'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import { OnboardingProfileWizard } from '@/components/onboarding/OnboardingProfileWizard';
import { UniversityDiagnostic } from '@/components/onboarding/UniversityDiagnostic';
import { calculateAffinity, type AffinityResult, type StudyAreaId } from '@/data/university-comparison';
import { useVerifiedClerkSession } from '@/hooks/useVerifiedClerkSession';

type OnboardingPhase = 'diagnostic' | 'profile';

export default function OnboardingPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const { isSessionReady, sessionError } = useVerifiedClerkSession();
  const [phase, setPhase] = useState<OnboardingPhase>('diagnostic');
  const [affinity, setAffinity] = useState<AffinityResult | null>(null);
  const [studyArea, setStudyArea] = useState<StudyAreaId>('fms');

  useEffect(() => {
    if (isLoaded && !user) {
      router.replace('/sign-in');
    }
  }, [isLoaded, user, router]);

  if (!isLoaded || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-mesh">
        <p className="text-sm text-muted-foreground">Cargando…</p>
      </div>
    );
  }

  if (phase === 'diagnostic') {
    return (
      <UniversityDiagnostic
        onContinue={(result, area) => {
          setAffinity(result);
          setStudyArea(area);
          setPhase('profile');
        }}
      />
    );
  }

  if (!isSessionReady) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-mesh px-4 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden />
        <p className="text-sm font-medium text-foreground">Verificando tu sesión…</p>
        <p className="max-w-sm text-xs text-muted-foreground">
          {sessionError ?? 'Un momento — estamos preparando tu cuenta tras el registro.'}
        </p>
      </div>
    );
  }

  const resolvedAffinity = affinity ?? calculateAffinity('medio', 'datos', 'bajo');

  return (
    <OnboardingProfileWizard
      affinity={resolvedAffinity}
      studyArea={studyArea}
      onBack={() => setPhase('diagnostic')}
    />
  );
}
