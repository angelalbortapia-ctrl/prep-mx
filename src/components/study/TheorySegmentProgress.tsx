'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useStudyAppearance } from '@/contexts/StudyAppearanceContext';
import { cn } from '@/lib/utils';

const segmentSpring = { type: 'spring' as const, stiffness: 280, damping: 22 };

interface TheorySegmentProgressProps {
  /** Bloques de lectura rápida (~5 min c/u). */
  totalSegments: number;
  /** Segmentos completados (0 … totalSegments). */
  filledSegments: number;
  className?: string;
  label?: string;
}

/**
 * Indicador segmentado de teoría: micro-barras horizontales que se llenan
 * conforme avanza la lectura de cápsulas de ~5 minutos.
 */
export function TheorySegmentProgress({
  totalSegments,
  filledSegments,
  className,
  label = 'Progreso de lectura',
}: TheorySegmentProgressProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const { isDark } = useStudyAppearance();
  const segments = Math.max(1, totalSegments);
  const filled = Math.min(segments, Math.max(0, filledSegments));

  return (
    <div className={cn('space-y-1.5', className)} aria-label={label}>
      <div className="flex items-center justify-between gap-2">
        <span className={cn('text-[10px] font-black uppercase tracking-wider', isDark ? 'text-zinc-500' : 'text-muted-foreground')}>
          {label}
        </span>
        <span className={cn('text-[10px] font-bold tabular-nums', isDark ? 'text-zinc-400' : 'text-muted-foreground')}>
          {filled}/{segments}
        </span>
      </div>
      <div className="flex gap-1" role="progressbar" aria-valuenow={filled} aria-valuemin={0} aria-valuemax={segments}>
        {Array.from({ length: segments }, (_, i) => {
          const isFilled = i < filled;
          return (
            <div
              key={i}
              className={cn(
                'relative h-1.5 flex-1 overflow-hidden rounded-full',
                isDark ? 'bg-zinc-800/90' : 'bg-muted'
              )}
            >
              <motion.div
                initial={false}
                animate={{
                  scaleX: isFilled ? 1 : 0,
                  opacity: isFilled ? 1 : 0.35,
                }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { ...segmentSpring, delay: i * 0.04 }
                }
                className="h-full origin-left rounded-full bg-gradient-to-r from-[hsl(var(--uni-primary))] via-[hsl(var(--uni-accent))] to-emerald-400 shadow-[0_0_8px_hsl(var(--uni-primary)/0.5)]"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Convierte minutos de lectura en número de cápsulas de 5 min. */
export function readingSegmentsFromMinutes(minutes: number): number {
  return Math.max(1, Math.ceil(minutes / 5));
}

/** Deriva segmentos llenos desde un porcentaje 0–100. */
export function filledSegmentsFromPercent(totalSegments: number, percent: number): number {
  return Math.round((Math.min(100, Math.max(0, percent)) / 100) * totalSegments);
}
