'use client';

import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  FATIGUE_STYLES,
  INTENSITY_MODES,
  getCombatTelemetry,
  type StudyIntensity,
} from '@/data/preparation-time-estimate';
import { resolveLandingUniId, type UniversidadLandingId } from '@/data/universidad-landing-config';
import { landingBentoCard } from '@/lib/landing-cyber-styles';
import { getLandingAccent, landingSectionTitle } from '@/lib/landing-typography';
import { useUniTheme } from '@/hooks/useUniTheme';
import { cn } from '@/lib/utils';

const springTransition = { type: 'spring' as const, stiffness: 420, damping: 22 };

interface PreparationTimeCalculatorProps {
  universidad: string;
  className?: string;
}

export function PreparationTimeCalculator({ universidad, className }: PreparationTimeCalculatorProps) {
  const [intensidad, setIntensidad] = useState<StudyIntensity>('aspirante');
  const prefersReducedMotion = useReducedMotion() ?? false;
  const { uniId, hydrated } = useUniTheme();

  const effectiveUni: UniversidadLandingId = useMemo(() => {
    if (universidad !== 'todas') return resolveLandingUniId(universidad);
    if (uniId === 'ipn' || uniId === 'uam') return uniId;
    return 'unam';
  }, [universidad, uniId]);

  const accent = useMemo(() => getLandingAccent(effectiveUni), [effectiveUni]);
  const telemetry = useMemo(
    () => getCombatTelemetry(intensidad, effectiveUni),
    [intensidad, effectiveUni]
  );
  const fatigueStyle = FATIGUE_STYLES[telemetry.fatigueLevel];

  const activeBtnStyle =
    hydrated
      ? {
          backgroundColor: accent.primary,
          color: effectiveUni === 'unam' ? accent.accent : '#ffffff',
          boxShadow: `0 0 18px ${accent.primary}88, 0 4px 14px ${accent.primary}44`,
        }
      : undefined;

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={springTransition}
      className={cn(
        landingBentoCard,
        'md:col-span-3',
        className
      )}
      aria-label="Tablero de esfuerzo adaptativo y telemetría estudiantil"
    >
      <header className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className={landingSectionTitle}>Tu Cronograma de Combate</h2>
          <p className="mt-1 text-xs font-medium text-muted-foreground">
            Telemetría en vivo para{' '}
            <span className="font-bold text-foreground">{effectiveUni.toUpperCase()}</span>
            {' · '}
            {telemetry.minutesPerDay} min/día
          </p>
        </div>

        <div
          className="flex w-full gap-1 rounded-xl bg-muted p-1 text-[10px] font-black uppercase sm:max-w-lg"
          role="tablist"
          aria-label="Nivel de carga de estudio"
        >
          {INTENSITY_MODES.map((mode) => {
            const isActive = intensidad === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setIntensidad(mode.id)}
                className={cn(
                  'flex-1 rounded-lg px-2 py-2.5 transition-all duration-200',
                  !isActive && 'text-muted-foreground hover:text-foreground'
                )}
                style={isActive ? activeBtnStyle : undefined}
              >
                {mode.tabLabel}
              </button>
            );
          })}
        </div>
      </header>

      <motion.div
        key={intensidad}
        animate={prefersReducedMotion ? { scale: 1 } : { scale: [0.98, 1] }}
        transition={{ duration: 0.32, ease: [0.34, 1.56, 0.64, 1] }}
        className="grid grid-cols-1 gap-4 rounded-xl border border-border bg-muted/60 p-4 sm:grid-cols-3"
      >
        <div className="text-center sm:text-left">
          <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Tiempo total</p>
          <p
            className="mt-1 text-3xl font-black tabular-nums tracking-tight text-foreground"
            style={hydrated ? { color: accent.primary } : undefined}
          >
            {telemetry.weeks}
          </p>
          <p className="mt-0.5 text-xs font-bold text-muted-foreground">{telemetry.readyLabel}</p>
        </div>

        <div className="border-border text-center sm:border-x sm:px-4 sm:text-left">
          <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Dosis diaria</p>
          <p className="mt-1 text-3xl font-black tabular-nums tracking-tight text-amber-500">
            {telemetry.dailyReactivos}
          </p>
          <p className="mt-0.5 text-xs font-bold text-muted-foreground">{telemetry.dailyLabel}</p>
        </div>

        <div className="text-center sm:text-left">
          <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
            Fatiga cognitiva
          </p>
          <div className="mt-2 flex justify-center sm:justify-start">
            <span
              className={cn(
                'inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-[11px] font-black',
                fatigueStyle.badge,
                fatigueStyle.pulse && 'animate-pulse'
              )}
            >
              <span
                className={cn('h-2 w-2 shrink-0 rounded-full', fatigueStyle.dot)}
                aria-hidden
              />
              {telemetry.fatigueBadge}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}
