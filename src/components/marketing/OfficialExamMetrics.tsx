'use client';

import { Clock, FileQuestion } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  getOfficialExamMetrics,
  type OfficialExamMetrics as OfficialExamMetricsData,
} from '@/data/official-exam-metrics';
import type { UniversidadFilter } from '@/lib/university-theme';
import { cn } from '@/lib/utils';

interface OfficialExamMetricsProps {
  universidad: UniversidadFilter;
  area?: string;
  className?: string;
}

function MetricsCard({ data }: { data: OfficialExamMetricsData }) {
  return (
    <article
      className={cn('rounded-2xl border p-5 transition-[background-color,border-color,color] duration-300 md:p-6', data.containerClass)}
    >
      <span
        className={cn(
          'inline-flex rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider',
          data.badgeClass
        )}
      >
        {data.formatBadge}
      </span>

      <dl className="mt-5 grid grid-cols-2 gap-4">
        <div>
          <dt className={cn('text-xs font-semibold uppercase tracking-wide', data.metricLabelClass)}>
            Reactivos
          </dt>
          <dd className={cn('mt-1 flex items-center gap-1.5 text-2xl font-extrabold tabular-nums', data.metricValueClass)}>
            <FileQuestion className="h-5 w-5 shrink-0 opacity-80" aria-hidden />
            {data.reactivos}
          </dd>
        </div>
        <div>
          <dt className={cn('text-xs font-semibold uppercase tracking-wide', data.metricLabelClass)}>
            Tiempo límite
          </dt>
          <dd className={cn('mt-1 flex items-center gap-1.5 text-2xl font-extrabold', data.metricValueClass)}>
            <Clock className="h-5 w-5 shrink-0 opacity-80" aria-hidden />
            {data.timeLimit}
          </dd>
        </div>
      </dl>

      <p className={cn('mt-4 text-sm leading-relaxed', data.id === 'uam' ? 'text-zinc-300' : 'opacity-90')}>
        {data.note}
      </p>
    </article>
  );
}

export function OfficialExamMetrics({ universidad, area = '2', className }: OfficialExamMetricsProps) {
  const prefersReducedMotion = useReducedMotion();
  const metrics = getOfficialExamMetrics(universidad, area);
  const items = Array.isArray(metrics) ? metrics : [metrics];

  return (
    <motion.section
      className={cn('mt-10', className)}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35 }}
      aria-label="Datos oficiales del examen de admisión"
    >
      <div className="mb-4 text-center md:text-left">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Estructura oficial</p>
        <h2 className="mt-1 text-xl font-bold text-foreground md:text-2xl">
          {universidad === 'todas'
            ? 'Métricas reales por universidad'
            : `Examen de admisión ${universidad.toUpperCase()}`}
        </h2>
      </div>

      <div
        className={cn(
          'grid gap-4',
          items.length > 1 ? 'md:grid-cols-3' : 'max-w-2xl'
        )}
      >
        {items.map((item) => (
          <MetricsCard key={item.id} data={item} />
        ))}
      </div>
    </motion.section>
  );
}
