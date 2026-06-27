'use client';

import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Calculator } from 'lucide-react';
import {
  UAM_BACHILLERATO_MAX_POINTS,
  UAM_EXAMEN_MAX_POINTS,
  UAM_MEDICINA_TOTAL_SCORE,
  uamBachilleratoPoints,
  uamExamReactivosNeeded,
} from '@/data/landing-bento-stats';
import { landingBentoCard } from '@/lib/landing-cyber-styles';
import { cn } from '@/lib/utils';

const springReveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-48px' as const },
  transition: { type: 'spring' as const, stiffness: 280, damping: 26 },
};

interface UamPromedioTrampaCalculatorProps {
  className?: string;
}

export function UamPromedioTrampaCalculator({ className }: UamPromedioTrampaCalculatorProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [promedio, setPromedio] = useState(8.0);

  const bachilleratoPoints = useMemo(() => uamBachilleratoPoints(promedio), [promedio]);
  const examReactivos = useMemo(
    () => uamExamReactivosNeeded(promedio, UAM_MEDICINA_TOTAL_SCORE),
    [promedio]
  );

  const motionProps = prefersReducedMotion ? {} : springReveal;

  return (
    <motion.article
      {...motionProps}
      transition={{ ...springReveal.transition, delay: prefersReducedMotion ? 0 : 0.18 }}
        className={cn(
        landingBentoCard,
        'md:col-span-1',
        className
      )}
      aria-label="Calculadora Promedio Trampa UAM"
    >
      <div className="mb-4 flex items-center gap-2 text-[#F05454]">
        <Calculator className="h-5 w-5 shrink-0" aria-hidden />
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
          Calculadora del Promedio Trampa UAM
        </span>
      </div>

      <p className="text-xs text-zinc-500">
        Fórmula UAM: (promedio × 30) + (% aciertos × 7) en escala 1,000. Tu prepa aporta hasta{' '}
        {UAM_BACHILLERATO_MAX_POINTS} pts; el examen hasta {UAM_EXAMEN_MAX_POINTS}. Meta Medicina:{' '}
        {UAM_MEDICINA_TOTAL_SCORE} pts.
      </p>

      <label className="mt-5 block text-[10px] font-bold uppercase text-zinc-400">
        Tu promedio de bachillerato
        <div className="mt-2 flex flex-wrap items-center gap-4">
          <input
            type="range"
            min={6}
            max={10}
            step={0.1}
            value={promedio}
            onChange={(e) => setPromedio(parseFloat(e.target.value))}
            className="h-2 w-full max-w-xs flex-1 cursor-pointer accent-[#F05454]"
            aria-valuemin={6}
            aria-valuemax={10}
            aria-valuenow={promedio}
          />
          <input
            type="number"
            min={6}
            max={10}
            step={0.1}
            value={promedio}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              if (!Number.isNaN(v)) setPromedio(Math.min(10, Math.max(6, v)));
            }}
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-2 text-xs font-bold text-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
      </label>

      <motion.div
        key={`${bachilleratoPoints}-${examReactivos}`}
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        className="mt-5 space-y-1 rounded-lg border border-zinc-100 bg-zinc-50 p-2.5 text-[11px] dark:border-zinc-900 dark:bg-zinc-900"
      >
        <div className="font-bold text-zinc-800 dark:text-zinc-200">
          Puntos de la prepa:{' '}
          <span className="text-[#F05454]">
            {bachilleratoPoints} / {UAM_BACHILLERATO_MAX_POINTS}
          </span>
        </div>
        <div className="font-bold text-zinc-500">
          Reactivos mínimos en examen:{' '}
          <span className="text-zinc-900 dark:text-zinc-100">{examReactivos} / 120</span>
        </div>
      </motion.div>
    </motion.article>
  );
}
