'use client';

import { useState } from 'react';
import { BookOpen, Focus, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MateriaScroller } from '@/components/study/MateriaScroller';
import { UnamTemarioSection } from '@/components/study/UnamTemarioSection';
import { CyberCard, NeonStatusBadge } from '@/components/ui/cyber-card';
import { useStudyAppearance } from '@/contexts/StudyAppearanceContext';
import { useUniTheme } from '@/contexts/UniThemeContext';
import type { StudyMateria } from '@/data/study-materias';
import {
  studyBadge,
  studyHeading,
  studySubtext,
  studyToolbarBtn,
} from '@/lib/study-appearance-styles';
import { cn } from '@/lib/utils';

interface StudyZoneViewProps {
  materias: StudyMateria[];
}

export function StudyZoneView({ materias }: StudyZoneViewProps) {
  const [focusMode, setFocusMode] = useState(false);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const { isDark } = useStudyAppearance();
  const { entry, hydrated, filterId, uniId } = useUniTheme();
  const showUnamTemario = filterId === 'unam' || uniId === 'unam';

  const haloStyle = hydrated
    ? { boxShadow: `0 0 48px ${entry.colors.primary}33, 0 0 80px ${entry.colors.accent}22` }
    : undefined;

  return (
    <div className="relative">
      <AnimatePresence>
        {focusMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
            className={cn(
              'fixed inset-0 z-[58] backdrop-blur-md',
              isDark ? 'bg-zinc-950/88' : 'bg-slate-200/85'
            )}
            aria-hidden
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {focusMode && (
          <motion.button
            type="button"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={() => setFocusMode(false)}
            aria-label="Salir del Modo Enfoque"
            className="fixed bottom-6 right-6 z-[70] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(var(--uni-primary))] text-white shadow-[0_0_24px_hsl(var(--uni-primary)/0.45)] active:scale-95"
            style={{
              bottom: 'calc(1.5rem + env(safe-area-inset-bottom))',
              right: 'calc(1.5rem + env(safe-area-inset-right))',
            }}
          >
            <X className="h-6 w-6" aria-hidden />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {!focusMode && (
          <motion.header
            key="study-header"
            initial={false}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
            className="mb-8 flex flex-col gap-4 overflow-hidden lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <span className={studyBadge(isDark)}>
                <BookOpen className="h-3.5 w-3.5" aria-hidden />
                Zona de estudio
              </span>
              <h1 className={cn('mt-3 text-2xl font-black tracking-tight md:text-3xl', studyHeading(isDark))}>
                ¿Qué quieres repasar hoy?
              </h1>
              <p className={cn('mt-2 max-w-xl text-sm', studySubtext(isDark))}>
                Desliza entre materias y entra a practicar con feedback inmediato.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <NeonStatusBadge tone="active" label="SM-2 sincronizado" />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setFocusMode(true)}
                title="Oculta el temario y centra solo los módulos de materias"
                className={cn(
                  'inline-flex min-h-11 items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-black uppercase tracking-wide transition-all duration-300',
                  studyToolbarBtn(isDark)
                )}
              >
                <Focus className="h-4 w-4" aria-hidden />
                Modo Enfoque
              </button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {!focusMode && showUnamTemario && (
          <motion.div
            key="temario-unam"
            initial={false}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
            className="mb-8 overflow-hidden"
          >
            <CyberCard className="p-5 md:p-6">
              <UnamTemarioSection />
            </CyberCard>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        layout
        animate={
          focusMode && !prefersReducedMotion
            ? { scale: 1.02, y: 0 }
            : { scale: 1, y: 0 }
        }
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        className={cn(
          focusMode &&
            'fixed inset-x-4 top-[5.5rem] z-[65] mx-auto max-w-3xl md:inset-x-8 lg:top-24'
        )}
      >
        {focusMode && (
          <p
            className={cn(
              'mb-3 text-center text-xs font-bold uppercase tracking-wider',
              isDark ? 'text-zinc-400' : 'text-muted-foreground'
            )}
          >
            Modo Enfoque · solo módulos de estudio
          </p>
        )}
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

      {focusMode && <div className="h-[70vh]" aria-hidden />}
    </div>
  );
}
