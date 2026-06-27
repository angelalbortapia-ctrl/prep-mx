'use client';

import { useState } from 'react';
import {
  REACTIVOS_AREA_MAP,
  STUDY_AREAS,
  UNI_COLORS,
  type ReactivoBar,
  type StudyAreaId,
} from '@/data/university-comparison';
import { universidadLabels, type Universidad } from '@/types/user-profile';
import { cn } from '@/lib/utils';

const UNIS: Universidad[] = ['unam', 'ipn', 'uam'];

interface ReactivosChartProps {
  className?: string;
  dark?: boolean;
}

function BarGroup({
  segments,
  color,
  dark,
}: {
  segments: ReactivoBar[];
  color: string;
  dark: boolean;
}) {
  const max = Math.max(...segments.map((s) => s.val), 1);

  return (
    <div className="space-y-2">
      {segments.map((seg) => (
        <div key={seg.label} className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className={dark ? 'text-zinc-400' : 'text-muted-foreground'}>{seg.label}</span>
            <span className={cn('font-bold tabular-nums', dark ? 'text-zinc-200' : '')}>
              {seg.val}
            </span>
          </div>
          <div
            className={cn('h-2 overflow-hidden rounded-full', dark ? 'bg-zinc-800' : 'bg-muted')}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${(seg.val / max) * 100}%`, backgroundColor: color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ReactivosChart({ className, dark = false }: ReactivosChartProps) {
  const [areaId, setAreaId] = useState<StudyAreaId>('fms');
  const area = REACTIVOS_AREA_MAP[areaId];
  const meta = STUDY_AREAS.find((a) => a.id === areaId);

  return (
    <section className={className}>
      <h2 className={cn('mb-2 text-lg font-bold', dark ? 'text-zinc-50' : 'text-foreground')}>
        Distribución de reactivos por área
      </h2>
      <p className={cn('mb-4 text-sm', dark ? 'text-zinc-500' : 'text-muted-foreground')}>
        {meta?.label} · {meta?.subtitle}
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {STUDY_AREAS.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => setAreaId(a.id)}
            className={cn(
              'rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors',
              a.id === areaId
                ? 'border-primary bg-primary/10 text-primary'
                : dark
                  ? 'border-zinc-800 text-zinc-400 hover:bg-zinc-900'
                  : 'text-muted-foreground hover:bg-muted'
            )}
          >
            {a.subtitle}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {UNIS.map((uni) => (
          <div
            key={uni}
            className={cn(
              'rounded-xl border p-4',
              dark ? 'border-zinc-800 bg-zinc-950' : 'border-border bg-card'
            )}
          >
            <h3 className="mb-1 text-sm font-bold" style={{ color: UNI_COLORS[uni] }}>
              {universidadLabels[uni]}
            </h3>
            <p className={cn('mb-3 text-xs', dark ? 'text-zinc-500' : 'text-muted-foreground')}>
              {area.titles[uni]}
            </p>
            <BarGroup segments={area[uni]} color={UNI_COLORS[uni]} dark={dark} />
          </div>
        ))}
      </div>
    </section>
  );
}
