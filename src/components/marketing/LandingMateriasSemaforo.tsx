'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LandingContainer } from '@/components/marketing/LandingContainer';
import { ShowcaseDiagnosticChart } from '@/components/marketing/ShowcaseDiagnosticChart';
import { metricStatus } from '@/lib/design-system/colors';
import {
  landingBody,
  landingSection,
  landingSectionTitle,
} from '@/lib/landing-typography';
import { cn } from '@/lib/utils';

const springTransition = { type: 'spring' as const, stiffness: 280, damping: 26 };

const SEMAFORO_ITEMS = [
  {
    tone: metricStatus.mastered,
    label: 'Verde — Dominado',
    text: 'Materias por encima del corte simulado. Mantén con repaso SM-2 ligero.',
  },
  {
    tone: metricStatus.review,
    label: 'Ámbar — Repasar',
    text: 'Estás cerca pero un simulacro más puede costarte el lugar.',
  },
  {
    tone: metricStatus.critical,
    label: 'Rojo — Crítico',
    text: 'Punto ciego detectado. Prioridad en tu plan de la semana.',
  },
] as const;

export function LandingMateriasSemaforo() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <section id="caracteristicas" className={cn(landingSection, 'overflow-x-clip')}>
      <LandingContainer>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            className="order-2 lg:order-1"
            initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={springTransition}
          >
            <div className="rounded-2xl border border-border bg-card p-4 shadow-lg shadow-primary/5 md:p-6">
              <ShowcaseDiagnosticChart />
            </div>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2"
            initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={springTransition}
          >
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Diagnóstico visual
            </p>
            <h2 className={cn('mt-2', landingSectionTitle)}>Tu semáforo de materias</h2>
            <p className={cn('mt-4', landingBody)}>
              No es un puntaje genérico: ves qué bloques te separan del corte histórico y dónde
              concentrar el tiempo que sí cuenta.
            </p>

            <ul className="mt-8 space-y-4">
              {SEMAFORO_ITEMS.map((item) => (
                <li key={item.label} className="flex gap-3">
                  <span
                    className={cn('mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full', item.tone.solid)}
                    aria-hidden
                  />
                  <div>
                    <p className="text-sm font-bold text-foreground">{item.label}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Button asChild variant="default" size="cta" className="mt-8 w-full sm:w-auto">
              <Link href="/simulador-gratis">
                Ver mi mapa de materias
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </motion.div>
        </div>
      </LandingContainer>
    </section>
  );
}
