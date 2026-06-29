'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Bell, Brain, CalendarClock, CheckCircle2, FlaskConical, Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  buildSm2DemoEvents,
  SM2_DEMO_QUESTION,
  sm2DemoStep,
  type Sm2DemoEvent,
} from '@/lib/sm2-demo';
import { landingCtaLink } from '@/lib/landing-cta';
import { cn } from '@/lib/utils';

const spring = { type: 'spring' as const, stiffness: 320, damping: 28 };

const KIND_STYLES: Record<Sm2DemoEvent['kind'], string> = {
  fail: 'border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300',
  review: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-800 dark:text-indigo-200',
  reminder: 'border-amber-500/50 bg-amber-500/15 text-amber-900 dark:text-amber-100',
  exam: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200',
};

interface Sm2InteractiveTimelineProps {
  variant?: 'landing' | 'blog';
  className?: string;
  showBlogLink?: boolean;
}

export function Sm2InteractiveTimeline({
  variant = 'landing',
  className,
  showBlogLink = variant === 'landing',
}: Sm2InteractiveTimelineProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const demoEvents = useMemo(() => buildSm2DemoEvents(42), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [manualInterval, setManualInterval] = useState(1);
  const [manualEase, setManualEase] = useState(2.5);
  const [manualDay, setManualDay] = useState(0);
  const [mode, setMode] = useState<'auto' | 'manual'>('auto');

  const current = demoEvents[stepIndex] ?? demoEvents[0];

  const reset = useCallback(() => {
    setPlaying(false);
    setStepIndex(0);
    setManualInterval(1);
    setManualEase(2.5);
    setManualDay(0);
    setMode('auto');
  }, []);

  const playDemo = useCallback(() => {
    reset();
    setMode('auto');
    setPlaying(true);
    setStepIndex(0);
  }, [reset]);

  useEffect(() => {
    if (!playing || prefersReducedMotion) return;
    if (stepIndex >= demoEvents.length - 1) {
      setPlaying(false);
      return;
    }
    const delay = stepIndex === 0 ? 2200 : 2800;
    const id = window.setTimeout(() => setStepIndex((i) => i + 1), delay);
    return () => window.clearTimeout(id);
  }, [playing, stepIndex, demoEvents.length, prefersReducedMotion]);

  const answer = (quality: 0 | 1 | 2 | 3 | 4 | 5) => {
    setMode('manual');
    setPlaying(false);
    const next = sm2DemoStep(quality, manualInterval, manualEase);
    setManualInterval(next.interval);
    setManualEase(next.ease);
    setManualDay((d) => d + next.nextReviewDays);
  };

  const manualNextReview =
    manualDay === 0
      ? 'Mañana (intervalo 1 día tras fallar)'
      : manualDay === 1
        ? 'Mañana'
        : `En ${manualDay} días`;

  return (
    <div
      className={cn(
        'rounded-3xl border border-indigo-200/80 bg-gradient-to-br from-slate-50/90 via-white to-indigo-50/50 p-6 shadow-sm dark:border-indigo-900/40 dark:from-slate-950/50 dark:via-zinc-950 dark:to-indigo-950/30 md:p-8',
        className
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Algoritmo SM-2 · {variant === 'landing' ? 'Demo en vivo' : 'Simulación interactiva'}
          </p>
          <h2 className="mt-1 text-xl font-black tracking-tight text-foreground md:text-2xl">
            Tu app te recuerda la pregunta exacta antes del examen
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Misma lógica que <code className="text-xs">lib/sm2.ts</code> y tu dashboard: no repasas todo el PDF,
            solo lo que fallaste — en el día calculado.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-9 rounded-xl"
            onClick={playDemo}
          >
            <Play className="mr-1.5 h-3.5 w-3.5" />
            Ver demo automática
          </Button>
          <Button type="button" size="sm" variant="ghost" className="h-9 rounded-xl" onClick={reset}>
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
            Reiniciar
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-4 w-4 text-indigo-600 dark:text-indigo-400" aria-hidden />
            <Badge variant="secondary">{SM2_DEMO_QUESTION.materia}</Badge>
            <span className="text-xs text-muted-foreground">{SM2_DEMO_QUESTION.tema}</span>
          </div>
          <p className="mt-3 text-sm font-semibold leading-relaxed text-foreground">
            {SM2_DEMO_QUESTION.text}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">{SM2_DEMO_QUESTION.hint}</p>

          {mode === 'manual' ? (
            <div className="mt-4 space-y-2">
              <p className="text-xs font-medium text-muted-foreground">¿Cómo te fue en el repaso?</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="h-8 border-rose-300 text-rose-700 dark:border-rose-800 dark:text-rose-300"
                  onClick={() => answer(1)}
                >
                  Fallé
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="h-8"
                  onClick={() => answer(4)}
                >
                  Bien
                </Button>
                <Button
                  type="button"
                  size="sm"
                  className="h-8 bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => answer(5)}
                >
                  Dominada
                </Button>
              </div>
              <p className="text-xs text-indigo-600 dark:text-indigo-400">
                Próximo repaso: <strong>{manualNextReview}</strong> · intervalo {manualInterval} d · EF{' '}
                {manualEase.toFixed(2)}
              </p>
            </div>
          ) : (
            <Button
              type="button"
              size="sm"
              variant="secondary"
              className="mt-4 h-8"
              onClick={() => setMode('manual')}
            >
              Probar tú mismo
            </Button>
          )}
        </div>

        <div className="relative min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode === 'auto' ? `auto-${stepIndex}` : 'manual'}
              initial={prefersReducedMotion ? false : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={spring}
              className={cn(
                'rounded-2xl border p-4',
                mode === 'auto' ? KIND_STYLES[current.kind] : KIND_STYLES.review
              )}
            >
              {mode === 'auto' ? (
                <>
                  <div className="flex items-center gap-2">
                    {current.kind === 'reminder' ? (
                      <Bell className="h-4 w-4 shrink-0" aria-hidden />
                    ) : current.kind === 'exam' ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
                    ) : (
                      <CalendarClock className="h-4 w-4 shrink-0" aria-hidden />
                    )}
                    <span className="text-xs font-bold uppercase tracking-wide opacity-80">
                      {current.dateLabel}
                    </span>
                  </div>
                  <p className="mt-2 font-bold">{current.headline}</p>
                  <p className="mt-1 text-sm opacity-90">{current.detail}</p>
                  {current.kind === 'reminder' ? (
                    <p className="mt-3 rounded-lg bg-background/60 px-3 py-2 text-sm font-medium">
                      🔔 &quot;{SM2_DEMO_QUESTION.materia}: {SM2_DEMO_QUESTION.tema}&quot; — te toca hoy
                    </p>
                  ) : null}
                  {current.intervalDays > 0 && current.kind !== 'exam' ? (
                    <p className="mt-2 font-mono text-[10px] opacity-70">
                      SM-2 → intervalo {current.intervalDays} d · facilidad {current.easeFactor}
                    </p>
                  ) : null}
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 shrink-0" aria-hidden />
                    <span className="text-xs font-bold uppercase tracking-wide opacity-80">Modo manual</span>
                  </div>
                  <p className="mt-2 font-bold">Tú controlas la calidad de respuesta</p>
                  <p className="mt-1 text-sm opacity-90">
                    Cada clic usa <code className="text-xs">calcularProximaRevision()</code> — la misma función
                    que corre al enviar un simulacro en PrepMX.
                  </p>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {mode === 'auto' ? (
            <div className="mt-4 flex gap-1">
              {demoEvents.map((ev, i) => (
                <button
                  key={ev.dayOffset}
                  type="button"
                  aria-label={`Paso ${i + 1}: ${ev.headline}`}
                  onClick={() => {
                    setPlaying(false);
                    setStepIndex(i);
                  }}
                  className={cn(
                    'h-1.5 flex-1 rounded-full transition-colors',
                    i <= stepIndex ? 'bg-indigo-600 dark:bg-indigo-400' : 'bg-indigo-200 dark:bg-indigo-900'
                  )}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {showBlogLink ? (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link
            href="/blog/memorizar-pdfs-unam-repeticion-espaciada-100-aciertos"
            className={cn('font-semibold underline-offset-4 hover:underline', landingCtaLink)}
          >
            Leer por qué el PDF no basta para la UNAM
          </Link>
          {' · '}
          <Link
            href="/simulador-gratis"
            className="font-semibold text-violet-700 underline-offset-4 hover:underline dark:text-violet-300"
          >
            Probar diagnóstico gratis
          </Link>
        </p>
      ) : null}
    </div>
  );
}
