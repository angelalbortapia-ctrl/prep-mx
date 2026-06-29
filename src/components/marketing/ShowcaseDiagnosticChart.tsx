'use client';

import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { cn } from '@/lib/utils';

const SUBJECT_SCORES = [
  { materia: 'Matemáticas', aciertos: 82, weak: false },
  { materia: 'Física', aciertos: 76, weak: false },
  { materia: 'Química', aciertos: 71, weak: false },
  { materia: 'Historia', aciertos: 58, weak: true },
  { materia: 'Literatura', aciertos: 74, weak: false },
];

const liquidSpring = { type: 'spring' as const, stiffness: 140, damping: 18 };

interface LiquidProgressBarProps {
  label: string;
  value: number;
  weak?: boolean;
  delay?: number;
}

function LiquidProgressBar({ label, value, weak = false, delay = 0 }: LiquidProgressBarProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-bold text-foreground">{label}</span>
        <span
          className={cn(
            'text-[10px] font-black tabular-nums',
            weak ? 'text-rose-500' : 'text-primary'
          )}
        >
          {value}%
        </span>
      </div>
      <div className="relative h-2.5 overflow-hidden rounded-full bg-zinc-200/80 dark:bg-zinc-800/80">
        <motion.div
          initial={prefersReducedMotion ? false : { width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ ...liquidSpring, delay: prefersReducedMotion ? 0 : delay }}
          className={cn(
            'relative h-full rounded-full',
            weak
              ? 'bg-gradient-to-r from-rose-600 via-rose-500 to-rose-400 shadow-[0_0_22px_rgba(244,63,94,0.45)]'
              : 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 shadow-[0_0_18px_rgba(79,70,229,0.35)]'
          )}
        >
          <span
            className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/70 blur-[2px]"
            aria-hidden
          />
          <span
            className={cn(
              'absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1/2 rounded-full',
              weak ? 'bg-rose-200 shadow-[0_0_12px_rgba(254,202,202,0.9)]' : 'bg-sky-100 shadow-[0_0_10px_rgba(186,230,253,0.9)]'
            )}
            aria-hidden
          />
        </motion.div>
      </div>
    </div>
  );
}

interface ShowcaseDiagnosticChartProps {
  metricClass?: string;
}

export function ShowcaseDiagnosticChart({ metricClass }: ShowcaseDiagnosticChartProps) {
  const bars = useMemo(() => SUBJECT_SCORES, []);

  return (
    <div className="flex h-full min-h-0 flex-col gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">Diagnóstico avanzado</p>
        <h3 className="text-lg font-bold text-foreground">Mapa de materias débiles</h3>
      </div>

      <div className="space-y-3 rounded-xl border border-zinc-200/70 bg-zinc-50/50 p-4 dark:border-zinc-800/70 dark:bg-zinc-900/30">
        {bars.map((entry, index) => (
          <LiquidProgressBar
            key={entry.materia}
            label={entry.materia}
            value={entry.aciertos}
            weak={entry.weak}
            delay={index * 0.06}
          />
        ))}
      </div>

      <div className="min-h-[140px] min-w-0 flex-1">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={140}>
          <BarChart data={SUBJECT_SCORES} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
            <XAxis
              dataKey="materia"
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={false}
              tickLine={false}
              width={28}
            />
            <Bar dataKey="aciertos" radius={[6, 6, 0, 0]} maxBarSize={40}>
              {SUBJECT_SCORES.map((entry) => (
                <Cell
                  key={entry.materia}
                  className={entry.weak ? 'showcase-weak-blink' : undefined}
                  fill={entry.weak ? '#f43f5e' : '#4f46e5'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p
        className={cn(
          'rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm font-medium leading-relaxed text-rose-900 dark:text-rose-200',
          metricClass
        )}
      >
        <span className="showcase-weak-blink font-bold">Alerta predictiva:</span> Tu rendimiento actual en{' '}
        <strong>Historia</strong> te dejaría a <strong>7 aciertos</strong> de la línea de corte histórica.
      </p>
    </div>
  );
}
