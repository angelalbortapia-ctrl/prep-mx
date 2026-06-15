'use client';

import { useState } from 'react';
import { BookOpen, Focus } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MateriaScroller } from '@/components/study/MateriaScroller';
import { CyberCard, NeonStatusBadge } from '@/components/ui/cyber-card';
import { useUniTheme } from '@/contexts/UniThemeContext';
import type { StudyMateria } from '@/data/study-materias';
import { cn } from '@/lib/utils';

interface StudyZoneViewProps {
  materias: StudyMateria[];
}

export function StudyZoneView({ materias }: StudyZoneViewProps) {
  const [focusMode, setFocusMode] = useState(false);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const { entry, hydrated } = useUniTheme();

  const haloStyle = hydrated
    ? { boxShadow: `0 0 48px ${entry.colors.primary}33, 0 0 80px ${entry.colors.accent}22` }
    : undefined;

  return (
    <div className="relative font-sans">
      <AnimatePresence>
        {focusMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
            className="fixed inset-0 z-40 bg-black/95"
            aria-hidden
          />
        )}
      </AnimatePresence>

      <div className={cn('relative space-y-8', focusMode && 'z-50')}>
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-zinc-400">
              <BookOpen className="h-3.5 w-3.5" aria-hidden />
              Zona de estudio
            </span>
            <h1 className="mt-3 text-2xl font-black tracking-tight text-zinc-50 md:text-3xl">
              ¿Qué quieres repasar hoy?
            </h1>
            <p className="mt-2 max-w-xl text-sm text-zinc-500">
              Desliza entre materias y entra a practicar con feedback inmediato.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <NeonStatusBadge tone="active" label="SM-2 sincronizado" />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setFocusMode((v) => !v)}
            aria-pressed={focusMode}
            className={cn(
              'inline-flex min-h-11 items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-black uppercase tracking-wide transition-all duration-300',
              focusMode
                ? 'border-[hsl(var(--uni-primary))] bg-[hsl(var(--uni-primary)/0.15)] text-zinc-50 shadow-[0_0_20px_hsl(var(--uni-primary)/0.2)]'
                : 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-[hsl(var(--uni-primary))] hover:shadow-[0_0_16px_hsl(var(--uni-primary)/0.12)]'
            )}
          >
            <Focus className="h-4 w-4" aria-hidden />
            Modo Enfoque
          </button>
        </header>

        <motion.div
          animate={focusMode && !prefersReducedMotion ? { scale: 1.01 } : { scale: 1 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        >
          <CyberCard
            className={cn(
              'p-5 md:p-6',
              focusMode && 'border-[hsl(var(--uni-primary))] ring-1 ring-[hsl(var(--uni-primary)/0.35)]'
            )}
            style={focusMode ? haloStyle : undefined}
          >
            <MateriaScroller initialData={materias} focusMode={focusMode} />
          </CyberCard>
        </motion.div>
      </div>
    </div>
  );
}
