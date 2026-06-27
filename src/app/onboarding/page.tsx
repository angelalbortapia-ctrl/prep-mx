'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { OnboardingProfileWizard } from '@/components/onboarding/OnboardingProfileWizard';
import { UniversityDiagnostic } from '@/components/onboarding/UniversityDiagnostic';
import { calculateAffinity, type AffinityResult, type StudyAreaId } from '@/data/university-comparison';

type OnboardingPhase = 'diagnostic' | 'profile';

export default function OnboardingPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
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

  const resolvedAffinity = affinity ?? calculateAffinity('medio', 'datos', 'bajo');

  return (
    <OnboardingProfileWizard
      affinity={resolvedAffinity}
      studyArea={studyArea}
      onBack={() => setPhase('diagnostic')}
    />
  );
}
