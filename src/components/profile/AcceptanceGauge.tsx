'use client';

import dynamic from 'next/dynamic';
import { SkeletonChart } from '@/components/ui/skeleton-body';
import { useUniTheme } from '@/contexts/UniThemeContext';

const GaugeChartInner = dynamic(
  () => import('@/components/profile/acceptance-gauge-chart').then((m) => m.AcceptanceGaugeChart),
  {
    ssr: false,
    loading: () => <SkeletonChart height={176} />,
  }
);

interface AcceptanceGaugeProps {
  /** Aciertos promedio simulados (0–120 escala UNAM). */
  averageScore?: number;
  className?: string;
}

/**
 * Medidor predictivo: cruza aciertos promedio vs línea de corte institucional.
 */
export function AcceptanceGauge({ averageScore = 78, className }: AcceptanceGaugeProps) {
  const { cutoffScore, entry } = useUniTheme();
  const probability = Math.min(
    100,
    Math.max(5, Math.round((averageScore / cutoffScore) * 72 + (averageScore >= cutoffScore ? 18 : 0)))
  );

  return (
    <div className={className}>
      <GaugeChartInner
        value={probability}
        cutoffScore={cutoffScore}
        uniLabel={entry.shortLabel}
        averageScore={averageScore}
      />
    </div>
  );
}
