'use client';

import { useMemo, type CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PreparationTimeCalculator } from '@/components/marketing/PreparationTimeCalculator';
import { UamPromedioTrampaCalculator } from '@/components/marketing/UamPromedioTrampaCalculator';
import { useUniTheme } from '@/hooks/useUniTheme';
import {
  UNIVERSIDAD_LANDING_CONFIG,
  resolveLandingUniId,
  type UniversidadLandingId,
} from '@/data/universidad-landing-config';
import {
  landingBentoCard,
  statusBadgeRisk,
  statusDotRisk,
} from '@/lib/landing-cyber-styles';
import { cn } from '@/lib/utils';

interface LandingBentoGridProps {
  universidad: string;
  className?: string;
}

const springReveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-48px' as const },
  transition: { type: 'spring' as const, stiffness: 280, damping: 26 },
};

export function LandingBentoGrid({ universidad, className }: LandingBentoGridProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const { uniId } = useUniTheme();

  const effectiveUni: UniversidadLandingId = useMemo(() => {
    if (universidad !== 'todas') return resolveLandingUniId(universidad);
    if (uniId === 'ipn' || uniId === 'uam') return uniId;
    return 'unam';
  }, [universidad, uniId]);

  const cfg = UNIVERSIDAD_LANDING_CONFIG[effectiveUni];
  const showUamCalculator = universidad === 'uam' || (universidad === 'todas' && effectiveUni === 'uam');
  const motionProps = prefersReducedMotion ? {} : springReveal;

  return (
    <section
      className={cn('grid grid-cols-1 gap-4 font-sans md:grid-cols-3 md:gap-5', className)}
      aria-label="Estadísticas del concurso oficial"
      style={{ '--uni-primary': cfg.primary, '--uni-accent': cfg.accent } as CSSProperties}
    >
      <motion.article {...motionProps} className={landingBentoCard}>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">{cfg.badge}</div>
        <div className="mt-2 text-5xl font-black tabular-nums tracking-tight text-zinc-900">{cfg.reactivos}</div>
        <div className="text-sm font-medium text-zinc-700">Reactivos oficiales en {cfg.horas} horas</div>
        <p className="mt-3 text-sm leading-relaxed text-zinc-500">{cfg.detalleMaterias}</p>
      </motion.article>

      <motion.article
        {...motionProps}
        transition={{ ...springReveal.transition, delay: prefersReducedMotion ? 0 : 0.05 }}
        className={landingBentoCard}
      >
        <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Tasa de admisión</div>
        <div className="mt-1 text-4xl font-black tabular-nums text-rose-500">{cfg.aceptacion}</div>
        <div className="mt-4 border-t border-zinc-100 pt-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Corte alta competencia</div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-zinc-900">{cfg.carreraTop}</span>
            <span className={statusBadgeRisk}>
              <span className={statusDotRisk} aria-hidden />
              Alta demanda
            </span>
          </div>
          <div className="mt-1 text-xl font-black tabular-nums text-zinc-800">
            {cfg.aciertosTop} {cfg.aciertosTopLabel}
          </div>
        </div>
      </motion.article>

      {showUamCalculator ? (
        <UamPromedioTrampaCalculator />
      ) : (
        <motion.article
          {...motionProps}
          transition={{ ...springReveal.transition, delay: prefersReducedMotion ? 0 : 0.1 }}
          className={cn(landingBentoCard, 'flex flex-col justify-between')}
        >
          <div className="space-y-2">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              Termómetro de riesgo
            </div>
            <div className="text-sm font-semibold text-zinc-900">{cfg.carreraTop}</div>
            <p className="text-sm leading-relaxed text-zinc-500">{cfg.contextoRiesgo}</p>
          </div>
          <p className="mt-4 text-xs text-zinc-400">Convocatoria 2026</p>
        </motion.article>
      )}

      <PreparationTimeCalculator universidad={universidad} />
    </section>
  );
}
