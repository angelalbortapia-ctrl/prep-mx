'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Check, Lock } from 'lucide-react';
import Link from 'next/link';
import { getStudyMilestones, type StudyMilestone } from '@/data/study-milestones';
import { useStudyProgress } from '@/hooks/useStudyProgress';
import { cn } from '@/lib/utils';

interface MilestonesTimelineProps {
  slug: string;
  className?: string;
}

function isMilestoneDone(
  slug: string,
  milestone: StudyMilestone,
  isCompleted: (slug: string, qId: string) => boolean
): boolean {
  return isCompleted(slug, milestone.quizQuestionId);
}

function isMilestoneUnlocked(
  slug: string,
  milestones: StudyMilestone[],
  index: number,
  isCompleted: (slug: string, qId: string) => boolean
): boolean {
  if (index === 0) return true;
  const prev = milestones[index - 1];
  return prev ? isCompleted(slug, prev.quizQuestionId) : true;
}

/**
 * Línea de tiempo gamificada estilo ruta de misiones.
 * Cada nodo se desbloquea al acertar el mini-quiz del hito anterior.
 */
export function MilestonesTimeline({ slug, className }: MilestonesTimelineProps) {
  const prefersReducedMotion = useReducedMotion();
  const { isCompleted } = useStudyProgress();
  const milestones = getStudyMilestones(slug);

  if (!milestones.length) {
    return (
      <p className="text-sm text-muted-foreground">
        Ruta de misiones próximamente para esta materia.
      </p>
    );
  }

  return (
    <ol className={cn('relative space-y-0', className)}>
      <div
        className="absolute bottom-4 left-[1.65rem] top-4 w-0.5 bg-gradient-to-b from-uni-primary/40 via-uni-accent/30 to-muted"
        aria-hidden
      />
      {milestones.map((milestone, index) => {
        const done = isMilestoneDone(slug, milestone, isCompleted);
        const unlocked = isMilestoneUnlocked(slug, milestones, index, isCompleted);

        return (
          <motion.li
            key={milestone.id}
            initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08, duration: 0.35 }}
            className="relative flex gap-4 pb-8 last:pb-0"
          >
            <div
              className={cn(
                'relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 text-xl shadow-md transition-all',
                done && 'border-green-400 bg-green-50',
                unlocked && !done && 'border-uni-accent bg-uni-primary/10 animate-pulse',
                !unlocked && 'border-muted bg-muted/50 opacity-60'
              )}
            >
              {done ? (
                <Check className="h-6 w-6 text-green-600" aria-hidden />
              ) : unlocked ? (
                <span aria-hidden>{milestone.emoji}</span>
              ) : (
                <Lock className="h-5 w-5 text-muted-foreground" aria-hidden />
              )}
            </div>
            <div className="min-w-0 flex-1 pt-1">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Misión {index + 1}
              </p>
              <h3 className="text-lg font-bold">{milestone.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{milestone.description}</p>
              {unlocked && !done && (
                <Link
                  href={`?tab=guia#quiz`}
                  className="mt-2 inline-flex text-sm font-semibold text-uni-primary underline-offset-2 hover:underline"
                >
                  Ir al mini-test →
                </Link>
              )}
              {done && (
                <p className="mt-2 text-xs font-semibold text-green-600">Tema dominado ✓</p>
              )}
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
