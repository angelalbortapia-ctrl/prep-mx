'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useAuth } from '@clerk/nextjs';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BookOpen, ChevronLeft, Clock, Focus, LogIn, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NeonStatusBadge } from '@/components/ui/cyber-card';
import {
  TheorySegmentProgress,
  filledSegmentsFromPercent,
  readingSegmentsFromMinutes,
} from '@/components/study/TheorySegmentProgress';
import { isDemoMode } from '@/lib/demo-mode';
import { useStudyAppearance } from '@/contexts/StudyAppearanceContext';
import {
  studyBadge,
  studyHeading,
  studyPanel,
  studySubtext,
  studyToolbarBtn,
} from '@/lib/study-appearance-styles';
import { cn } from '@/lib/utils';
import { QuickQuiz } from '@/components/study/QuickQuiz';
import { AudioGuiaPlayer } from '@/components/study/AudioGuiaPlayer';
import { StudyNotesPanel } from '@/components/study/StudyNotesPanel';
import { SkeletonGuideLayout } from '@/components/ui/skeleton-body';
import { useDeviceType } from '@/hooks/useDeviceType';
import { useUniTheme } from '@/contexts/UniThemeContext';
import type { StudyGuide } from '@/data/study-guides';

const GuiaMarkdown = dynamic(() => import('@/components/study/GuiaMarkdown'), {
  ssr: false,
  loading: () => <SkeletonGuideLayout />,
});

interface GuiaLayoutProps {
  guide: StudyGuide;
}

export function GuiaLayout({ guide }: GuiaLayoutProps) {
  const prefersReducedMotion = useReducedMotion();
  const { isDesktop, isTablet } = useDeviceType();
  const { isLoaded, isSignedIn } = useAuth();
  const { entry, hydrated } = useUniTheme();
  const { isDark } = useStudyAppearance();
  const demo = isDemoMode();
  const [focusMode, setFocusMode] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  const splitView = focusMode && (isDesktop || isTablet);

  const totalSegments = useMemo(
    () => readingSegmentsFromMinutes(guide.tiempoLecturaMin),
    [guide.tiempoLecturaMin]
  );
  const filledSegments = filledSegmentsFromPercent(totalSegments, readProgress);

  const haloStyle = hydrated
    ? {
        boxShadow: `0 0 40px ${entry.colors.primary}33, 0 0 64px ${entry.colors.accent}22`,
        borderColor: `${entry.colors.primary}88`,
      }
    : undefined;

  useEffect(() => {
    if (!focusMode) return;
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? Math.round((window.scrollY / max) * 100) : 0;
      setReadProgress(pct);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [focusMode]);

  const secondaryTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.3, ease: 'easeInOut' as const };

  return (
    <div className="relative font-sans">
      <AnimatePresence>
        {focusMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
            className={cn('fixed inset-0 z-40 backdrop-blur-sm', isDark ? 'bg-black/92' : 'bg-background/90')}
            aria-hidden
          />
        )}
      </AnimatePresence>

      <div
        className={cn(
          'relative mx-auto max-w-2xl px-5 pb-24 pt-2 transition-colors duration-300 sm:px-6',
          focusMode && 'z-50'
        )}
      >
        <AnimatePresence initial={false}>
          {!focusMode && (
            <motion.header
              key="guia-header"
              initial={false}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={secondaryTransition}
              className="overflow-hidden"
            >
              <nav className={cn('mb-4 flex items-center gap-1 text-sm', studySubtext(isDark))}>
                <Link
                  href="/dashboard/estudio"
                  className="inline-flex items-center gap-1 rounded-lg px-2 py-1 font-medium transition-colors hover:text-[hsl(var(--uni-accent))]"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden />
                  Guías de estudio
                </Link>
              </nav>

              <div className="mb-6 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={studyBadge(isDark)}>
                    <BookOpen className="h-3.5 w-3.5" aria-hidden />
                    {guide.materia}
                  </span>
                  <span className={cn('inline-flex items-center gap-1.5 text-xs', studySubtext(isDark))}>
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    {guide.tiempoLecturaMin} min de lectura
                  </span>
                  <NeonStatusBadge tone="active" label="Tutor IA conectado" />
                </div>
                <h1 className={cn('text-2xl font-black leading-tight tracking-tight md:text-3xl', studyHeading(isDark))}>
                  {guide.titulo}
                </h1>
                <p className={cn('text-base leading-relaxed', studySubtext(isDark))}>{guide.resumen}</p>
              </div>

              <button
                type="button"
                onClick={() => setFocusMode(true)}
                className={cn(
                  'mb-2 inline-flex min-h-11 items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-black uppercase tracking-wide transition-all duration-300',
                  studyToolbarBtn(isDark)
                )}
              >
                <Focus className="h-4 w-4" aria-hidden />
                Modo Enfoque
              </button>
            </motion.header>
          )}
        </AnimatePresence>

        <motion.article
          animate={focusMode && !prefersReducedMotion ? { scale: 1.01 } : { scale: 1 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          className={cn(
            studyPanel(isDark),
            'transition-[padding,box-shadow]',
            focusMode && 'border p-5 ring-1 ring-[hsl(var(--uni-primary)/0.3)] md:p-6',
            splitView ? 'grid gap-6 lg:grid-cols-2 lg:max-w-none' : 'max-w-2xl'
          )}
          style={focusMode ? haloStyle : undefined}
        >
          <div className={cn(focusMode ? 'space-y-4' : 'space-y-3', splitView && 'mx-auto max-w-2xl')}>
            <TheorySegmentProgress
              totalSegments={totalSegments}
              filledSegments={focusMode ? filledSegments : filledSegmentsFromPercent(totalSegments, 35)}
              label="Cápsulas de lectura · 5 min"
            />
            <GuiaMarkdown content={guide.contenido} />
          </div>
          {splitView && <StudyNotesPanel slug={guide.slug} className="sticky top-4 self-start" />}
        </motion.article>

        {!focusMode && (
          <div id="quiz">
            {isLoaded && !isSignedIn && !demo ? (
              <div className={cn('mt-8 p-6 text-center', studyPanel(isDark))}>
                <LogIn className="mx-auto mb-3 h-8 w-8 text-[hsl(var(--uni-primary))]" aria-hidden />
                <p className={cn('text-sm font-bold', studyHeading(isDark))}>Guía de estudio · acceso personalizado</p>
                <p className={cn('mt-1 text-sm', studySubtext(isDark))}>
                  Inicia sesión para registrar tu progreso SM-2 y sincronizar el banquillo de dudas.
                </p>
                <Button asChild className="mt-4 rounded-xl">
                  <Link href={`/sign-in?redirect_url=${encodeURIComponent(`/dashboard/estudio/guia/${guide.slug}`)}`}>
                    Entrar con mi cuenta
                  </Link>
                </Button>
              </div>
            ) : (
              <QuickQuiz slug={guide.slug} questions={guide.quiz} />
            )}
          </div>
        )}

        {!focusMode && (
          <AudioGuiaPlayer summaryText={guide.resumen} title={`Resumen: ${guide.titulo}`} />
        )}

        <AnimatePresence>
          {focusMode && (
            <motion.button
              type="button"
              onClick={() => setFocusMode(false)}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              aria-label="Salir del Modo Enfoque"
              className="fixed bottom-6 right-6 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(var(--uni-primary))] text-white shadow-[0_0_24px_hsl(var(--uni-primary)/0.45)] active:scale-95"
              style={{
                bottom: 'calc(1.5rem + env(safe-area-inset-bottom))',
                right: 'calc(1.5rem + env(safe-area-inset-right))',
              }}
            >
              <X className="h-6 w-6" aria-hidden />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
