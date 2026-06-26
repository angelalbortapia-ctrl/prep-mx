'use client';

import Link from 'next/link';
import { ArrowUpRight, Lock } from 'lucide-react';
import type { StudyMateria } from '@/data/study-materias';
import { studyGuideSlugs } from '@/data/study-guides';
import { useStudyMaterias } from '@/hooks/useStudyData';
import {
  TheorySegmentProgress,
  filledSegmentsFromPercent,
  readingSegmentsFromMinutes,
} from '@/components/study/TheorySegmentProgress';
import { SkeletonMateriaCards } from '@/components/ui/skeleton-body';
import { useStudyAppearance } from '@/contexts/StudyAppearanceContext';
import { useHaptics } from '@/hooks/useHaptics';
import { studyHeading, studyPanel, studySubtext } from '@/lib/study-appearance-styles';
import { cn } from '@/lib/utils';

interface MateriaScrollerProps {
  initialData: StudyMateria[];
  focusMode?: boolean;
}

const availableSlugs = new Set(studyGuideSlugs);

/** Minutos estimados por tema para cápsulas de lectura (~5 min). */
const MINUTES_PER_TOPIC = 5;

export function MateriaScroller({ initialData, focusMode = false }: MateriaScrollerProps) {
  const { data: materias = initialData, isFetching, isLoading } = useStudyMaterias(initialData);
  const { isDark } = useStudyAppearance();
  const showSkeleton = isLoading && materias.length === 0;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className={cn('text-lg font-black tracking-tight md:text-xl', studyHeading(isDark))}>
          Módulos de estudio
        </h2>
        {isFetching && !showSkeleton && (
          <span className={cn('text-xs', studySubtext(isDark))}>Actualizando…</span>
        )}
      </div>

      {showSkeleton ? (
        <SkeletonMateriaCards />
      ) : (
        <div
          className={cn(
            'flex snap-x snap-mandatory gap-4 overflow-x-auto scrollbar-none',
            '[-webkit-overflow-scrolling:touch] -mx-1 px-1 pb-2',
            'md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0',
            'xl:grid-cols-3',
            focusMode && 'md:grid-cols-2 xl:grid-cols-2'
          )}
        >
          {materias.map((materia) => (
            <MateriaCard
              key={materia.id}
              materia={materia}
              available={availableSlugs.has(materia.id)}
              focusMode={focusMode}
              isDark={isDark}
            />
          ))}
        </div>
      )}
    </section>
  );
}

const cardBaseDark = cn(
  studyPanel(true),
  'group relative flex w-[78%] shrink-0 snap-start flex-col gap-3 p-5',
  'transition-all duration-300 tap-transparent gpu sm:w-[60%] md:w-auto md:shrink',
  'hover:scale-[1.01] hover:border-[hsl(var(--uni-primary))]',
  'hover:shadow-[0_0_20px_hsl(var(--uni-primary)/0.15)]'
);

const cardBaseLight = cn(
  studyPanel(false),
  'group relative flex w-[78%] shrink-0 snap-start flex-col gap-3 p-5',
  'transition-all duration-300 tap-transparent gpu sm:w-[60%] md:w-auto md:shrink',
  'hover:scale-[1.01] hover:border-[hsl(var(--uni-primary)/0.4)] hover:shadow-md'
);

function MateriaCard({
  materia,
  available,
  focusMode,
  isDark,
}: {
  materia: StudyMateria;
  available: boolean;
  focusMode: boolean;
  isDark: boolean;
}) {
  const cardBase = isDark ? cardBaseDark : cardBaseLight;
  const haptics = useHaptics();
  const totalSegments = readingSegmentsFromMinutes(materia.totalTemas * MINUTES_PER_TOPIC);
  const filledSegments = filledSegmentsFromPercent(totalSegments, available ? materia.progreso : 0);

  const inner = (
    <>
      <TheorySegmentProgress
        totalSegments={Math.min(totalSegments, 12)}
        filledSegments={Math.min(filledSegments, 12)}
        label="Cápsulas de teoría"
      />

      <div
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-xl border text-2xl',
          isDark ? 'border-zinc-800 bg-zinc-900' : 'border-border bg-muted',
          materia.accent
        )}
      >
        <span aria-hidden>{materia.icon}</span>
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className={cn('font-black leading-tight', isDark ? 'text-zinc-100' : 'text-foreground')}>
            {materia.nombre}
          </h3>
          {available ? (
            <ArrowUpRight
              className={cn(
                'h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[hsl(var(--uni-accent))]',
                isDark ? 'text-zinc-500' : 'text-muted-foreground'
              )}
            />
          ) : (
            <Lock className={cn('h-4 w-4 shrink-0', isDark ? 'text-zinc-600' : 'text-muted-foreground/60')} />
          )}
        </div>
        <p className={cn('mt-1 line-clamp-2 text-sm', isDark ? 'text-zinc-500' : 'text-muted-foreground')}>
          {materia.descripcion}
        </p>
      </div>

      <div
        className={cn(
          'flex items-center justify-between text-xs font-bold',
          isDark ? 'text-zinc-500' : 'text-muted-foreground'
        )}
      >
        <span>{available ? `${materia.totalTemas} temas` : 'Próximamente'}</span>
        {available && <span className="tabular-nums text-[hsl(var(--uni-accent))]">{materia.progreso}%</span>}
      </div>
    </>
  );

  if (!available) {
    return (
      <div className={cn(cardBase, 'opacity-60')} aria-disabled>
        {inner}
      </div>
    );
  }

  return (
    <Link
      href={`/dashboard/estudio/guia/${materia.id}`}
      onClick={() => void haptics.selection()}
      className={cn(
        cardBase,
        focusMode && 'border-[hsl(var(--uni-primary)/0.6)] shadow-[0_0_24px_hsl(var(--uni-primary)/0.12)]',
        'active:scale-[0.98]'
      )}
    >
      {inner}
    </Link>
  );
}
