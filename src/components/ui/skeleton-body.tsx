'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkeletonBlockProps {
  className?: string;
  delay?: number;
}

function SkeletonBlock({ className, delay = 0 }: SkeletonBlockProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      initial={prefersReducedMotion ? { opacity: 0.6 } : { opacity: 0.45 }}
      animate={
        prefersReducedMotion
          ? { opacity: 0.6 }
          : { opacity: [0.45, 0.85, 0.45] }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay }
      }
      className={cn('rounded-lg bg-muted/80', className)}
    />
  );
}

interface SkeletonBodyProps {
  className?: string;
  /** Número de líneas de texto simuladas */
  lines?: number;
}

/** Esqueleto genérico con pulso Framer Motion para mitigar tiempo de espera percibido. */
export function SkeletonBody({ className, lines = 4 }: SkeletonBodyProps) {
  return (
    <div className={cn('space-y-3', className)} aria-busy="true" aria-label="Cargando contenido">
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBlock
          key={i}
          delay={i * 0.08}
          className={cn('h-4', i === 0 ? 'w-2/3 h-6' : i === lines - 1 ? 'w-3/5' : 'w-full')}
        />
      ))}
    </div>
  );
}

/** Esqueleto de guía de estudio (título + bloques + tip/trampa). */
export function SkeletonGuideLayout({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-6', className)} aria-busy="true" aria-label="Cargando guía">
      <SkeletonBlock className="h-8 w-3/4" />
      <SkeletonBlock className="h-4 w-1/3" delay={0.05} />
      <SkeletonBody lines={5} />
      <SkeletonBlock className="h-24 w-full rounded-xl border border-border/50" delay={0.12} />
      <SkeletonBody lines={4} />
      <SkeletonBlock className="h-20 w-full rounded-xl border border-border/50" delay={0.18} />
    </div>
  );
}

/** Esqueleto de gráfica Recharts (ejes + área). */
export function SkeletonChart({ className, height = 200 }: { className?: string; height?: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn('relative overflow-hidden rounded-xl border border-border/60 bg-card/50 p-4', className)}
      style={{ height }}
      aria-busy="true"
      aria-label="Cargando gráfica"
    >
      <div className="flex h-full flex-col justify-end gap-2">
        <div className="flex flex-1 items-end justify-between gap-2 px-2">
          {[0.55, 0.72, 0.48, 0.85, 0.62].map((h, i) => (
            <motion.div
              key={i}
              aria-hidden
              initial={{ scaleY: prefersReducedMotion ? 1 : 0.6 }}
              animate={{ scaleY: prefersReducedMotion ? 1 : [0.6, 1, 0.75] }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 1.4, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }
              }
              style={{ height: `${h * 100}%`, transformOrigin: 'bottom' }}
              className="w-full max-w-[48px] rounded-t-md bg-muted/90"
            />
          ))}
        </div>
        <SkeletonBlock className="mx-2 h-px w-auto rounded-none" delay={0.2} />
        <div className="flex justify-between px-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonBlock key={i} className="h-2 w-8" delay={0.15 + i * 0.04} />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Esqueleto de tarjetas de materia (carrusel / grid). */
export function SkeletonMateriaCards({ count = 4 }: { count?: number }) {
  return (
    <div
      className="flex snap-x snap-mandatory gap-4 overflow-x-hidden md:grid md:grid-cols-2 xl:grid-cols-4"
      aria-busy="true"
      aria-label="Cargando materias"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="w-[78%] shrink-0 space-y-3 rounded-2xl border border-border/50 bg-card/40 p-5 md:w-auto"
        >
          <SkeletonBlock className="h-12 w-12 rounded-xl" delay={i * 0.06} />
          <SkeletonBlock className="h-5 w-2/3" delay={i * 0.06 + 0.04} />
          <SkeletonBody lines={2} />
          <SkeletonBlock className="h-1.5 w-full rounded-full" delay={i * 0.06 + 0.08} />
        </div>
      ))}
    </div>
  );
}

/** Dashboard home — header, stats y gráficas. */
export function SkeletonDashboard({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-8', className)} aria-busy="true" aria-label="Cargando dashboard">
      <div className="space-y-3">
        <SkeletonBlock className="h-6 w-24 rounded-full" />
        <SkeletonBlock className="h-9 w-2/3 max-w-md" />
        <SkeletonBlock className="h-4 w-1/2 max-w-sm" delay={0.05} />
      </div>
      <SkeletonBlock className="h-28 w-full rounded-2xl border border-border/50" delay={0.08} />
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="space-y-3 rounded-2xl border border-border/50 bg-card/40 p-5"
          >
            <SkeletonBlock className="h-4 w-24" delay={i * 0.06} />
            <SkeletonBlock className="h-9 w-16" delay={i * 0.06 + 0.04} />
            <SkeletonBlock className="h-3 w-full" delay={i * 0.06 + 0.08} />
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <SkeletonChart height={220} />
        <div className="space-y-3 rounded-2xl border border-border/50 bg-card/40 p-5">
          <SkeletonBlock className="h-5 w-40" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <SkeletonBlock className="h-3 w-32" delay={i * 0.05} />
                <SkeletonBlock className="h-3 w-10" delay={i * 0.05} />
              </div>
              <SkeletonBlock className="h-2 w-full rounded-full" delay={i * 0.05 + 0.02} />
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4 rounded-2xl border border-border/50 bg-card/40 p-6">
        <SkeletonBlock className="h-5 w-36" />
        <SkeletonBlock className="h-4 w-56" delay={0.04} />
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonBlock key={i} className="h-11 w-28 rounded-xl" delay={0.08 + i * 0.04} />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Listado de simulacros en /dashboard/simulacros. */
export function SkeletonSimulacrosList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Cargando simulacros">
      <SkeletonBlock className="h-14 w-full rounded-xl" />
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="space-y-4 rounded-2xl border border-border/50 bg-card/40 p-6"
        >
          <div className="flex justify-between gap-3">
            <SkeletonBlock className="h-6 w-48" delay={i * 0.05} />
            <SkeletonBlock className="h-6 w-20 rounded-full" delay={i * 0.05} />
          </div>
          <SkeletonBody lines={2} />
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <SkeletonBlock className="h-4 w-24" delay={i * 0.05 + 0.04} />
              <SkeletonBlock className="h-4 w-20" delay={i * 0.05 + 0.06} />
            </div>
            <SkeletonBlock className="h-11 w-24 rounded-xl" delay={i * 0.05 + 0.08} />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Panel previo al simulacro (créditos / área). */
export function SkeletonExamStartPanel({ className }: { className?: string }) {
  return (
    <div
      className={cn('exam-shell mx-auto max-w-lg space-y-5 p-8', className)}
      aria-busy="true"
      aria-label="Preparando simulacro"
    >
      <SkeletonBlock className="mx-auto h-14 w-14 rounded-2xl" />
      <SkeletonBlock className="mx-auto h-7 w-48" delay={0.05} />
      <SkeletonBlock className="mx-auto h-4 w-full max-w-sm" delay={0.08} />
      <SkeletonBlock className="h-12 w-full rounded-xl" delay={0.12} />
    </div>
  );
}

/** Silueta de pregunta + opciones en el simulador. */
export function SkeletonExamQuestion({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-6', className)} aria-busy="true" aria-label="Cargando pregunta">
      <div className="flex items-center justify-between gap-4">
        <SkeletonBlock className="h-4 w-32" />
        <SkeletonBlock className="h-8 w-20 rounded-lg" delay={0.04} />
      </div>
      <div className="space-y-3 rounded-2xl border border-border/50 bg-card/40 p-6">
        <SkeletonBody lines={4} />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonBlock
            key={i}
            className="h-14 w-full rounded-xl"
            delay={0.1 + i * 0.05}
          />
        ))}
      </div>
      <div className="flex justify-between gap-3">
        <SkeletonBlock className="h-11 flex-1 rounded-xl" delay={0.2} />
        <SkeletonBlock className="h-11 flex-1 rounded-xl" delay={0.24} />
      </div>
    </div>
  );
}

/** Temario oficial (header + acordeón de materias). */
export function SkeletonTemarioSection({
  rows = 5,
  className,
}: {
  rows?: number;
  className?: string;
}) {
  return (
    <section
      className={cn('scroll-mt-24 font-sans', className)}
      aria-busy="true"
      aria-label="Cargando temario"
    >
      <div className="mb-5 space-y-3">
        <SkeletonBlock className="h-6 w-56 rounded-full" />
        <SkeletonBlock className="h-8 w-3/4 max-w-lg" delay={0.05} />
        <SkeletonBlock className="h-4 w-full max-w-xl" delay={0.08} />
        <div className="flex gap-2 pt-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonBlock key={i} className="h-8 w-20 rounded-lg" delay={0.1 + i * 0.03} />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        {Array.from({ length: rows }).map((_, i) => (
          <SkeletonBlock key={i} className="h-16 w-full rounded-xl" delay={0.12 + i * 0.04} />
        ))}
      </div>
    </section>
  );
}

/** Subtemas dentro de una materia expandida. */
export function SkeletonTemarioTopics({ lines = 4 }: { lines?: number }) {
  return (
    <div className="space-y-2 py-1" aria-busy="true" aria-label="Cargando subtemas">
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBlock key={i} className="h-4 w-full" delay={i * 0.05} />
      ))}
    </div>
  );
}
