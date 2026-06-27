'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AdmissionConvocatoriaTimeline } from '@/components/dashboard/AdmissionConvocatoriaTimeline';
import { PageHeader } from '@/components/layout/PageHeader';
import { StreakWidget } from '@/components/dashboard/StreakWidget';
import { WeaknessRadar } from '@/components/dashboard/WeaknessRadar';
import { StudyCalendar } from '@/components/dashboard/StudyCalendar';
import { OnboardingAffinityBanner } from '@/components/comparativa/OnboardingAffinityBanner';
import { useUniTheme } from '@/hooks/useUniTheme';
import { examCountdownLabel, getAdmissionMilestones } from '@/data/admission-timeline';

export function DashboardView() {
  const { entry } = useUniTheme();
  const now = new Date();
  const milestones = getAdmissionMilestones(entry.id, now);
  const examLabel = examCountdownLabel(milestones, now);

  return (
    <div className="space-y-8">
      <OnboardingAffinityBanner />

      <PageHeader
        badge={<Badge variant="secondary">{entry.shortLabel}</Badge>}
        title="Hola, bienvenido de vuelta"
        description={`${examLabel} · Plan al 18%`}
        actions={
          <Button asChild className="h-11 rounded-xl">
            <Link href="/dashboard/simulacros">Continuar estudio</Link>
          </Button>
        }
      />

      <AdmissionConvocatoriaTimeline />

      <div className="grid gap-4 sm:grid-cols-3">
        <StreakWidget days={3} />
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">XP total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">120</p>
            <p className="text-sm text-muted-foreground">Nivel 2 — Estudiante</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Próximo repaso SM-2</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">Mañana</p>
            <p className="text-sm text-muted-foreground">Estequiometría · 12 preguntas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <StudyCalendar />
        <WeaknessRadar />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Acciones rápidas</CardTitle>
          <CardDescription>Flujo del alumno según tu plan PrepMX</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild variant="outline" className="h-11 rounded-xl">
            <Link href="/dashboard/simulacros">Simulacros</Link>
          </Button>
          <Button asChild variant="outline" className="h-11 rounded-xl">
            <Link href="/dashboard/plan">Mi plan</Link>
          </Button>
          <Button asChild variant="outline" className="h-11 rounded-xl">
            <Link href="/dashboard/tutor">Tutor IA</Link>
          </Button>
          <Button asChild variant="outline" className="h-11 rounded-xl">
            <Link href="/dashboard/comparativa">Descubre tu examen ideal</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
