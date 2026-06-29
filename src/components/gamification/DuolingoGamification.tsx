'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Flame, Heart, Lock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StripeCheckoutButton } from '@/components/marketing/StripeCheckoutButton';
import { cn } from '@/lib/utils';
import type { UniversidadFilter } from '@/lib/university-theme';

interface FreemiumLivesHudProps {
  livesRemaining: number;
  maxLives?: number;
  className?: string;
}

export function FreemiumLivesHud({ livesRemaining, maxLives = 3, className }: FreemiumLivesHudProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50/90 px-3 py-1.5 dark:border-rose-900/50 dark:bg-rose-950/40',
        className
      )}
      aria-label={`${livesRemaining} de ${maxLives} vidas restantes`}
    >
      {Array.from({ length: maxLives }).map((_, i) => (
        <Heart
          key={i}
          className={cn(
            'h-4 w-4',
            i < livesRemaining
              ? 'fill-rose-500 text-rose-500'
              : 'fill-transparent text-rose-300 dark:text-rose-800'
          )}
          aria-hidden
        />
      ))}
      <span className="ml-1 text-xs font-bold text-rose-800 dark:text-rose-200">Vidas</span>
    </div>
  );
}

interface FreemiumFreezeOverlayProps {
  freezeLabel: string;
  universidad: UniversidadFilter;
  onClose?: () => void;
}

export function FreemiumFreezeOverlay({
  freezeLabel,
  universidad,
}: FreemiumFreezeOverlayProps) {
  const checkoutUni = universidad === 'todas' ? 'todas' : universidad;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
      <div className="max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/15">
          <Lock className="h-8 w-8 text-rose-600 dark:text-rose-400" aria-hidden />
        </div>
        <h2 className="mt-4 text-xl font-black">Sin vidas — simulador en pausa</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Cada error te quitó una vida. Vuelves a practicar en <strong>{freezeLabel}</strong>… o desbloqueas
          práctica ilimitada con Plan Pro.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <StripeCheckoutButton
            planId={checkoutUni === 'todas' ? 'todos' : 'pro'}
            universidad={checkoutUni}
            label="Desbloquear con Plan Pro"
            className="h-12 w-full rounded-xl"
          />
          <Button asChild variant="outline" className="h-11 rounded-xl">
            <Link href="/precios">Comparar planes</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

interface DuolingoStreakHeroProps {
  streakDays: number;
  questionsAnsweredToday: number;
  streakGoal: number;
  streakQualifiedToday: boolean;
  streakAtRisk: boolean;
  message?: string;
  className?: string;
}

export function DuolingoStreakHero({
  streakDays,
  questionsAnsweredToday,
  streakGoal,
  streakQualifiedToday,
  streakAtRisk,
  message,
  className,
}: DuolingoStreakHeroProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const progressPct = Math.min(100, Math.round((questionsAnsweredToday / streakGoal) * 100));
  const remaining = Math.max(0, streakGoal - questionsAnsweredToday);

  const fireScale = streakDays >= 7 ? 1.15 : streakDays >= 3 ? 1.05 : 1;
  const fireColor =
    streakQualifiedToday
      ? 'text-orange-500'
      : streakAtRisk
        ? 'text-amber-500 animate-pulse'
        : streakDays > 0
          ? 'text-orange-400/70'
          : 'text-muted-foreground';

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-3xl border border-orange-200/80 bg-gradient-to-br from-orange-500/15 via-amber-500/5 to-transparent p-6 dark:border-orange-900/40 md:p-8',
        streakAtRisk && 'border-amber-400/60 ring-2 ring-amber-400/30',
        className
      )}
    >
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col items-center sm:flex-row sm:items-center sm:gap-6">
          <motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : { scale: fireScale, rotate: streakQualifiedToday ? [0, -4, 4, 0] : 0 }
            }
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="relative"
          >
            <Flame className={cn('h-20 w-20 md:h-24 md:w-24', fireColor)} strokeWidth={1.5} aria-hidden />
            <span className="absolute inset-0 flex items-center justify-center pt-2 text-2xl font-black text-white drop-shadow-md md:text-3xl">
              {streakDays}
            </span>
          </motion.div>

          <div className="text-center sm:text-left">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-700 dark:text-orange-300">
              Racha diaria
            </p>
            <h2 className="text-2xl font-black tracking-tight md:text-3xl">
              {streakDays > 0 ? (
                <>
                  {streakDays} día{streakDays === 1 ? '' : 's'} de racha
                </>
              ) : (
                'Enciende tu racha'
              )}
            </h2>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              {message ??
                (streakQualifiedToday
                  ? 'Meta de hoy cumplida. Vuelve mañana para no perder el fuego.'
                  : `Responde ${remaining} pregunta${remaining === 1 ? '' : 's'} más hoy (mínimo ${streakGoal}) o pierdes la racha.`)}
            </p>
          </div>
        </div>

        <div className="w-full min-w-[12rem] max-w-xs sm:w-auto">
          <div className="flex justify-between text-xs font-semibold">
            <span>Hoy: {questionsAnsweredToday}/{streakGoal}</span>
            {streakQualifiedToday ? (
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <Sparkles className="h-3.5 w-3.5" /> Meta OK
              </span>
            ) : streakAtRisk ? (
              <span className="text-amber-600 dark:text-amber-400">En riesgo</span>
            ) : null}
          </div>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-orange-950/10 dark:bg-orange-950/40">
            <motion.div
              className={cn(
                'h-full rounded-full',
                streakQualifiedToday ? 'bg-emerald-500' : 'bg-gradient-to-r from-orange-500 to-amber-400'
              )}
              initial={false}
              animate={{ width: `${progressPct}%` }}
              transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 28 }}
            />
          </div>
          <Button asChild size="sm" className="mt-3 w-full rounded-xl" variant={streakQualifiedToday ? 'outline' : 'default'}>
            <Link href={streakQualifiedToday ? '/dashboard/herramientas/rafaga' : '/dashboard/simulacros'}>
              {streakQualifiedToday ? 'Seguir practicando' : 'Responder ahora'}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
