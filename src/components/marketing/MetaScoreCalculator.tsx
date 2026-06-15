'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useAuth } from '@clerk/nextjs';
import { Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SkeletonChart } from '@/components/ui/skeleton-body';
import {
  CAREER_CUTOFFS,
  getCareerById,
  cutoffRiskBadgeClass,
  cutoffRiskLabel,
  type CareerCutoff,
} from '@/data/career-cutoffs';
import { useUserProfile } from '@/hooks/useUserProfile';
import { resolveCareerFromMetadata } from '@/lib/user-career';
import { filterToUniId, getUniThemeEntry } from '@/lib/uni-theme-config';
import type { UniversidadFilter } from '@/lib/university-theme';
import { cn } from '@/lib/utils';

const ThermometerChart = dynamic(
  () => import('@/components/marketing/cutoff-thermometer-chart').then((m) => m.CutoffThermometerChart),
  { ssr: false, loading: () => <SkeletonChart height={160} /> }
);

export function MetaScoreCalculator({
  className,
  universidad = 'todas',
}: {
  className?: string;
  universidad?: UniversidadFilter;
}) {
  const { isLoaded, isSignedIn } = useAuth();
  const { data: profile, isFetched: profileReady } = useUserProfile();
  const uniEntry = getUniThemeEntry(filterToUniId(universidad));

  const filteredCareers = useMemo(() => {
    if (universidad === 'todas') return CAREER_CUTOFFS;
    return CAREER_CUTOFFS.filter((c) => c.universidad === universidad);
  }, [universidad]);

  const [selectedId, setSelectedId] = useState(filteredCareers[0]?.id ?? '');
  const [profileApplied, setProfileApplied] = useState(false);

  useEffect(() => {
    if (!filteredCareers.some((c) => c.id === selectedId)) {
      setSelectedId(filteredCareers[0]?.id ?? '');
    }
  }, [filteredCareers, selectedId]);

  // Pre-carga post-hidratación: evita mismatch SSR cuando Clerk trae carrera registrada.
  useEffect(() => {
    if (!isLoaded || profileApplied) return;
    if (!isSignedIn) {
      setProfileApplied(true);
      return;
    }
    if (!profileReady || !profile?.authenticated) return;

    const resolved = resolveCareerFromMetadata({
      examTarget: profile.examTarget,
      universidad: profile.universidad,
      careerId: profile.careerId,
    });

    if (resolved && filteredCareers.some((c) => c.id === resolved.careerId)) {
      setSelectedId(resolved.careerId);
    }
    setProfileApplied(true);
  }, [isLoaded, isSignedIn, profile, profileReady, profileApplied, filteredCareers]);

  const career = useMemo(() => getCareerById(selectedId), [selectedId]);
  const userScore = profile?.averageScore;

  return (
    <section
      className={cn(
        'rounded-3xl border border-border bg-card p-6 shadow-lg shadow-primary/10 md:p-8',
        className
      )}
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Target className="h-5 w-5 text-primary" aria-hidden />
        <h2 className="text-xl font-bold">Calculadora de aciertos meta</h2>
        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
          {uniEntry.shortLabel} · corte {uniEntry.cutoffScore}
        </span>
        {isSignedIn && profile?.careerId && (
          <span className="rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
            Tu meta cargada
          </span>
        )}
      </div>
      <p className="mb-4 text-sm text-muted-foreground">
        Busca tu carrera y sede para ver el corte histórico simulado y el nivel de demanda.
      </p>

      <label className="block text-sm font-medium">
        Carrera y sede
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="mt-1.5 w-full rounded-[var(--radius)] border bg-background px-3 py-2.5 text-sm"
        >
          {filteredCareers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label} — {c.universidad.toUpperCase()} · {c.sede}
            </option>
          ))}
        </select>
      </label>

      {career && <CareerResult career={career} userScore={userScore} />}
    </section>
  );
}

function CareerResult({ career, userScore }: { career: CareerCutoff; userScore?: number }) {
  const entry = getUniThemeEntry(career.universidad);
  return (
    <div className="mt-6 space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge className={cn('border text-left leading-snug', cutoffRiskBadgeClass(career.cutoffScore))}>
          {cutoffRiskLabel(career.cutoffScore)}
        </Badge>
        <span className="text-sm text-muted-foreground">
          Meta: <strong className="text-accent">{career.cutoffScore} aciertos</strong>
          <span className="ml-1 text-xs text-primary">({entry.name})</span>
        </span>
        {userScore != null && (
          <span className="text-sm font-medium text-primary">
            · Tú: {userScore} aciertos
          </span>
        )}
      </div>
      <ThermometerChart
        cutoff={career.cutoffScore}
        label={career.label}
        userScore={userScore}
        universidad={career.universidad}
      />
    </div>
  );
}
