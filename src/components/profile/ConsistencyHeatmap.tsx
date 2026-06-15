'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';

const WEEKS = 12;
const DAYS = 7;

function readActivityDays(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem('prepmx-study-progress');
    if (!raw) return demoActivity();
    const map = JSON.parse(raw) as Record<string, { completedAt: number }>;
    const days = new Set<string>();
    for (const entry of Object.values(map)) {
      const d = new Date(entry.completedAt);
      days.add(d.toISOString().slice(0, 10));
    }
    return days.size ? days : demoActivity();
  } catch {
    return demoActivity();
  }
}

function demoActivity(): Set<string> {
  const set = new Set<string>();
  const today = new Date();
  for (let i = 0; i < 28; i++) {
    if (i % 2 === 0 || i % 5 === 0) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      set.add(d.toISOString().slice(0, 10));
    }
  }
  return set;
}

interface ConsistencyHeatmapProps {
  className?: string;
}

/** Mapa de calor estilo GitHub: días con guía o simulador completado. */
export function ConsistencyHeatmap({ className }: ConsistencyHeatmapProps) {
  const activeDays = useMemo(() => readActivityDays(), []);

  const cells = useMemo(() => {
    const result: { key: string; date: string; level: number }[] = [];
    const today = new Date();
    for (let w = WEEKS - 1; w >= 0; w--) {
      for (let d = 0; d < DAYS; d++) {
        const date = new Date(today);
        date.setDate(date.getDate() - (w * DAYS + (6 - d)));
        const iso = date.toISOString().slice(0, 10);
        result.push({
          key: iso,
          date: iso,
          level: activeDays.has(iso) ? 3 : 0,
        });
      }
    }
    return result;
  }, [activeDays]);

  return (
    <div className={cn('space-y-2', className)}>
      <p className="text-sm font-semibold">Mapa de consistencia</p>
      <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
        {Array.from({ length: WEEKS }).map((_, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {cells.slice(wi * DAYS, wi * DAYS + DAYS).map((cell) => (
              <div
                key={cell.key}
                title={cell.date}
                className={cn(
                  'h-3 w-3 rounded-sm',
                  cell.level === 0 && 'bg-muted',
                  cell.level === 3 && 'bg-green-500'
                )}
              />
            ))}
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Cada cuadro verde = día con guía o simulador completado
      </p>
    </div>
  );
}
