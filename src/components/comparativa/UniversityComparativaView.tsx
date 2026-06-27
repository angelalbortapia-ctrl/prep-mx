'use client';

import { useEffect, useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { AffinityTest } from '@/components/comparativa/AffinityTest';
import { ComparisonMatrix } from '@/components/comparativa/ComparisonMatrix';
import { ReactivosChart } from '@/components/comparativa/ReactivosChart';
import { StrategicTipsSection } from '@/components/comparativa/StrategicTipsSection';
import { SyllabusExplorer } from '@/components/comparativa/SyllabusExplorer';
import { CyberCard } from '@/components/ui/cyber-card';
import { PageHeader } from '@/components/layout/PageHeader';
import { useStudyAppearance } from '@/contexts/StudyAppearanceContext';
import type { AffinityResult } from '@/data/university-comparison';
import { loadAffinityResult } from '@/lib/persist-affinity';
import { studySubtext } from '@/lib/study-appearance-styles';
import { cn } from '@/lib/utils';

export function UniversityComparativaView() {
  const { isDark } = useStudyAppearance();
  const [affinityResult, setAffinityResult] = useState<AffinityResult | null>(null);

  useEffect(() => {
    const saved = loadAffinityResult();
    if (saved) setAffinityResult(saved);
  }, []);

  return (
    <div className="space-y-8 pb-8">
      <PageHeader
        eyebrow={
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <GraduationCap className="h-4 w-4" aria-hidden />
            Diagnóstico de afinidad
          </span>
        }
        title="Descubre tu examen ideal"
        description="Compara UNAM, IPN y UAM con datos del temario PrepMX y encuentra la universidad que mejor encaja con tu perfil."
      />

      <CyberCard className="p-5 md:p-6">
        <ComparisonMatrix dark={isDark} />
      </CyberCard>

      <CyberCard className="p-5 md:p-6">
        <ReactivosChart dark={isDark} />
      </CyberCard>

      <CyberCard className="p-5 md:p-6">
        <SyllabusExplorer dark={isDark} />
      </CyberCard>

      <CyberCard className="p-5 md:p-6">
        <AffinityTest
          dark={isDark}
          initialResult={affinityResult}
          onResult={(result) => setAffinityResult(result)}
        />
      </CyberCard>

      <CyberCard className="p-5 md:p-6">
        <StrategicTipsSection dark={isDark} highlightUni={affinityResult?.recommended} />
      </CyberCard>

      <p className={cn('text-center text-xs', studySubtext(isDark))}>
        Puedes volver a este diagnóstico cuando quieras desde tu dashboard o zona de estudio.
      </p>
    </div>
  );
}
