'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AdmissionConvocatoriaTimeline } from '@/components/dashboard/AdmissionConvocatoriaTimeline';
import { PageHeader } from '@/components/layout/PageHeader';
import { DuolingoStreakHero } from '@/components/gamification/DuolingoGamification';
import { STREAK_DAILY_GOAL } from '@/lib/gamification/streak';
import { BanquilloPanel } from '@/components/bookmarks/BanquilloPanel';
import { CareerRankingCard } from '@/components/dashboard/CareerRankingCard';
import { WeaknessRadar } from '@/components/dashboard/WeaknessRadar';
import { StudyCalendar } from '@/components/dashboard/StudyCalendar';
import { OnboardingAffinityBanner } from '@/components/comparativa/OnboardingAffinityBanner';
import { SkeletonDashboard } from '@/components/ui/skeleton-body';
import { CheckoutSuccessTracker } from '@/components/analytics/CheckoutSuccessTracker';
import { useUniTheme } from '@/hooks/useUniTheme';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useSm2Summary } from '@/hooks/useSm2Summary';
import { useGamification } from '@/hooks/useGamification';
import { Sm2ReviewSummary } from '@/components/dashboard/Sm2ReviewSummary';
import { ExamCountdownDescription } from '@/components/dashboard/ExamCountdownDescription';
import { isClerkUiReady } from '@/lib/demo-mode';

export function DashboardView() {
  const { isLoaded, isSignedIn } = useAuth();
  const { entry } = useUniTheme();
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const { data: sm2, isLoading: sm2Loading } = useSm2Summary();
  const { data: gamification, isLoading: gamificationLoading } = useGamification();

  const showSkeleton =
    !isClerkUiReady(isLoaded) ||
    (isSignedIn &&
      ((profileLoading && profile === undefined) ||
        (gamificationLoading && gamification === undefined) ||
        (sm2Loading && sm2 === undefined)));

  if (showSkeleton) {
    return <SkeletonDashboard />;
  }

  const isAuthenticated = Boolean(profile?.authenticated);
  const streakDays = gamification?.streakDays ?? (isAuthenticated ? 0 : 3);
  const xpTotal = gamification?.xpTotal ?? sm2?.xpTotal ?? (isAuthenticated ? 0 : 120);
  const planLabel = isAuthenticated ? 'Plan (próximamente con IA)' : 'Plan demo';

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <Suspense fallback={null}>
        <CheckoutSuccessTracker />
      </Suspense>
      <OnboardingAffinityBanner />

      <PageHeader
        badge={<Badge variant="secondary">{entry.shortLabel}</Badge>}
        title="Hola, bienvenido de vuelta"
        description={<ExamCountdownDescription planLabel={planLabel} />}
        actions={
          <div className="flex flex-wrap gap-2">
            <Button asChild className="h-11 rounded-xl">
              <Link href="/dashboard/herramientas/rafaga">Ráfaga 10 min</Link>
            </Button>
            <Button asChild variant="outline" className="h-11 rounded-xl">
              <Link href="/dashboard/simulacros">Simulacro completo</Link>
            </Button>
          </div>
        }
      />

      <AdmissionConvocatoriaTimeline />

      <DuolingoStreakHero
        streakDays={streakDays}
        questionsAnsweredToday={gamification?.questionsAnsweredToday ?? (isAuthenticated ? 0 : 3)}
        streakGoal={gamification?.streakGoal ?? STREAK_DAILY_GOAL}
        streakQualifiedToday={gamification?.streakQualifiedToday ?? !isAuthenticated}
        streakAtRisk={gamification?.streakAtRisk ?? false}
        message={gamification?.streakMessage}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">XP total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{xpTotal}</p>
            <p className="text-sm text-muted-foreground">
              {isAuthenticated ? 'Ganas XP al guardar simulacros' : 'Nivel 2 — demo'}
            </p>
          </CardContent>
        </Card>
        <Sm2ReviewSummary sm2={sm2} isAuthenticated={isAuthenticated} />
      </div>

      {gamification?.ranking ? (
        <CareerRankingCard
          ranking={gamification.ranking}
          message={gamification.rankingMessage}
        />
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <StudyCalendar />
        <WeaknessRadar items={isAuthenticated ? [] : undefined} />
      </div>

      <BanquilloPanel variant="card" />

      <Card>
        <CardHeader>
          <CardTitle>Acciones rápidas</CardTitle>
          <CardDescription>Flujo del alumno según tu plan PrepMX</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild className="h-11 rounded-xl">
            <Link href="/dashboard/herramientas/rafaga">Práctica de ráfaga</Link>
          </Button>
          <Button asChild variant="outline" className="h-11 rounded-xl">
            <Link href="/dashboard/simulacros">Simulacros</Link>
          </Button>
          <Button asChild variant="outline" className="h-11 rounded-xl">
            <Link href="/dashboard/plan">Mi plan</Link>
          </Button>
          <Button asChild variant="outline" className="h-11 rounded-xl">
            <Link href="/dashboard/tutor">Tutor IA</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
