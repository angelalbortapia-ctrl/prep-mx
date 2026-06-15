'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ClipboardCheck, LineChart, Sparkles, Trophy } from 'lucide-react';
import { filterToUniId, getUniThemeEntry } from '@/lib/uni-theme-config';
import type { UniversidadFilter } from '@/lib/university-theme';
import { cn } from '@/lib/utils';

const STEPS = [
  {
    icon: Sparkles,
    title: 'Diagnóstico inicial',
    desc: '10–20 preguntas para ubicar tu nivel por materia.',
  },
  {
    icon: ClipboardCheck,
    title: 'Guías + mini-quizzes',
    desc: 'Repasa teoría con trampas de examen y retención SM-2.',
  },
  {
    icon: LineChart,
    title: 'Simulacros cronometrados',
    desc: 'Practica bajo presión con métrica de integridad.',
  },
  {
    icon: Trophy,
    title: 'Puntaje de selección',
    desc: 'Compara tu avance vs la línea de corte de tu carrera.',
  },
];

export function SuccessPathTimeline({
  className,
  universidad = 'todas',
}: {
  className?: string;
  universidad?: UniversidadFilter;
}) {
  const prefersReducedMotion = useReducedMotion();
  const uniEntry = getUniThemeEntry(filterToUniId(universidad));

  return (
    <section className={cn('space-y-6 dark:text-zinc-100', className)}>
      <div>
        <h2 className="text-2xl font-bold">Ruta de éxito en 4 pasos</h2>
        <p className="mt-1 text-sm text-muted-foreground dark:text-zinc-400">
          Meta {uniEntry.shortLabel}:{' '}
          <strong className="text-uni-primary">{uniEntry.cutoffScore} aciertos</strong> de corte simulado.
        </p>
      </div>
      <ol className="relative space-y-8 border-l-2 border-uni-primary/20 pl-8">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.li
              key={step.title}
              initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="relative"
            >
              <span className="absolute -left-[2.4rem] flex h-10 w-10 items-center justify-center rounded-xl border-2 border-uni-primary/30 bg-card text-uni-primary shadow-sm">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="font-bold">{step.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
