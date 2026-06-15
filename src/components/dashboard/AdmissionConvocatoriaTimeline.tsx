'use client';

import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import {
  examCountdownLabel,
  getAdmissionMilestones,
  resolveMilestoneStatuses,
  type MilestoneStatus,
} from '@/data/admission-timeline';
import { useUniTheme } from '@/hooks/useUniTheme';
import { cn } from '@/lib/utils';

const springTransition = { type: 'spring' as const, stiffness: 280, damping: 26 };

interface MilestoneNodeProps {
  label: string;
  status: MilestoneStatus;
  primaryHex: string;
  animateIn: boolean;
}

function MilestoneNode({ label, status, primaryHex, animateIn }: MilestoneNodeProps) {
  return (
    <motion.li
      className="flex min-w-[8rem] shrink-0 snap-center flex-col items-center gap-2 sm:min-w-0 sm:flex-1"
      initial={false}
      animate={animateIn ? { opacity: 1, y: 0 } : undefined}
      transition={springTransition}
    >
      <div
        className={cn(
          'relative flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300',
          status === 'past' && 'text-white shadow-sm',
          status === 'current' && 'animate-pulse border-[3px] bg-primary/15 shadow-md shadow-primary/25',
          status === 'future' && 'bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500'
        )}
        style={
          status === 'past'
            ? { backgroundColor: primaryHex }
            : status === 'current'
              ? { borderColor: primaryHex, color: primaryHex }
              : undefined
        }
        aria-current={status === 'current' ? 'step' : undefined}
      >
        {status === 'past' ? (
          <Check className="h-5 w-5" strokeWidth={3} aria-hidden />
        ) : (
          <span
            className={cn(
              'h-2.5 w-2.5 rounded-full',
              status === 'current' ? 'bg-current' : 'bg-zinc-300 dark:bg-zinc-600'
            )}
            aria-hidden
          />
        )}
      </div>
      <p
        className={cn(
          'max-w-[9rem] text-center text-[11px] font-semibold leading-tight sm:max-w-none sm:text-xs',
          status === 'past' && 'text-foreground',
          status === 'current' && 'text-primary',
          status === 'future' && 'text-zinc-400 dark:text-zinc-500'
        )}
      >
        {label}
      </p>
    </motion.li>
  );
}

function Connector({ filled, primaryHex }: { filled: boolean; primaryHex: string }) {
  return (
    <div
      className={cn('mt-5 h-1 min-w-6 flex-1 shrink-0', !filled && 'bg-zinc-200 dark:bg-zinc-800')}
      style={filled ? { backgroundColor: primaryHex } : undefined}
      aria-hidden
    />
  );
}

export function AdmissionConvocatoriaTimeline() {
  const { entry, uniId, hydrated } = useUniTheme();
  const prefersReducedMotion = useReducedMotion() ?? false;
  const now = useMemo(() => new Date(), []);

  const milestones = useMemo(() => getAdmissionMilestones(uniId, now), [uniId, now]);
  const statuses = useMemo(() => resolveMilestoneStatuses(milestones, now), [milestones, now]);
  const countdown = examCountdownLabel(milestones, now);
  const primaryHex = entry.colors.primary;
  const animateIn = hydrated && !prefersReducedMotion;

  return (
    <section
      className="mb-6 w-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
      aria-label="Ruta de admisión oficial"
    >
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
            Tu Ruta de Admisión Oficial {entry.shortLabel}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Seguimiento del proceso de selección según la convocatoria vigente.
          </p>
        </div>
        <span
          suppressHydrationWarning
          className="inline-flex w-fit shrink-0 items-center rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary"
        >
          {countdown}
        </span>
      </div>

      <div className="-mx-1 overflow-x-auto px-1 pb-1 snap-x snap-mandatory scroll-smooth [scrollbar-width:thin]">
        <ol className="flex min-w-max items-start sm:min-w-0 sm:w-full">
          {milestones.map((milestone, index) => (
            <li key={milestone.id} className="flex items-start sm:flex-1">
              <MilestoneNode
                label={milestone.label}
                status={statuses[index]}
                primaryHex={primaryHex}
                animateIn={animateIn}
              />
              {index < milestones.length - 1 && (
                <Connector
                  filled={statuses[index] === 'past'}
                  primaryHex={primaryHex}
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
