'use client';

import { ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IntegrityMetricBarProps {
  score: number;
  blurCount: number;
  className?: string;
}

export function IntegrityMetricBar({ score, blurCount, className }: IntegrityMetricBarProps) {
  const tone =
    score >= 90 ? 'bg-green-500' : score >= 70 ? 'bg-amber-500' : 'bg-red-500';

  return (
    <div className={cn('rounded-2xl border bg-card p-4', className)}>
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
        <ShieldAlert className="h-4 w-4 text-muted-foreground" aria-hidden />
        Métrica de honestidad / integridad
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-muted">
        <div
          className={cn('h-full rounded-full transition-all duration-500', tone)}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        {score}% de integridad
        {blurCount > 0
          ? ` · ${blurCount} cambio(s) de pestaña detectado(s). En el examen real no habrá pestañas extras.`
          : ' · Sin cambios de pestaña durante el simulacro.'}
      </p>
    </div>
  );
}
