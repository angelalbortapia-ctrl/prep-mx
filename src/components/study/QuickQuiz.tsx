'use client';

import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDownToLine, CheckCircle2, Sparkles, XCircle } from 'lucide-react';
import { ExamOptionCard } from '@/components/exam/ExamOptionCard';
import { examFeedback, metricStatus } from '@/lib/design-system/colors';
import { pressScale } from '@/lib/design-system/interactive';
import { cn } from '@/lib/utils';
import { useHaptics } from '@/hooks/useHaptics';
import { useStudyProgress } from '@/hooks/useStudyProgress';
import type { OpcionId } from '@/types/question';
import type { QuizQuestion } from '@/data/study-guides';

const MathRenderer = dynamic(() => import('@/components/math/MathRenderer'), {
  ssr: false,
  loading: () => <span className="inline-block h-5 w-2/3 animate-pulse rounded bg-muted align-middle" />,
});

interface QuickQuizProps {
  slug: string;
  questions: readonly QuizQuestion[];
}

type QuizItemState = 'idle' | 'correct' | 'error';

function scrollToAnchor(anchorId: string): void {
  if (typeof document === 'undefined') return;
  const target = document.getElementById(anchorId);
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

interface QuizItemProps {
  slug: string;
  question: QuizQuestion;
  index: number;
}

function QuizItem({ slug, question, index }: QuizItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const haptics = useHaptics();
  const { saveProgress, isCompleted } = useStudyProgress();

  const [selected, setSelected] = useState<OpcionId | null>(null);
  const [state, setState] = useState<QuizItemState>('idle');
  const alreadyDone = isCompleted(slug, question.id);

  const handleSelect = useCallback(
    (optionId: OpcionId) => {
      if (state === 'correct') return;
      setSelected(optionId);

      if (optionId === question.opcion_correcta) {
        setState('correct');
        void haptics.success();
        saveProgress({ slug, questionId: question.id });
        if (!prefersReducedMotion && typeof window !== 'undefined') {
          void import('canvas-confetti').then(({ default: confetti }) => {
            confetti({
              particleCount: 48,
              spread: 60,
              origin: { y: 0.75 },
              colors: ['#22c55e', '#3b82f6', '#eab308'],
            });
          });
        }
      } else {
        setState('error');
        void haptics.error();
      }
    },
    [state, question.opcion_correcta, question.id, haptics, saveProgress, slug, prefersReducedMotion]
  );

  const answeredCorrect = state === 'correct';

  return (
    <motion.div
      animate={
        state === 'error' && !prefersReducedMotion
          ? { x: [-10, 10, -10, 10, 0] }
          : { x: 0 }
      }
      transition={{ duration: 0.4 }}
      className="rounded-2xl border bg-card p-5 shadow-sm md:p-6"
    >
      <div className="mb-4 flex items-start gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
          {index + 1}
        </span>
        <div className="flex-1 text-base font-medium leading-snug text-foreground">
          <MathRenderer content={question.pregunta} variant="inline" />
        </div>
      </div>

      <ul className="space-y-3" role="listbox" aria-label={`Opciones pregunta ${index + 1}`}>
        {question.opciones.map((opcion) => {
          const reveal = state !== 'idle';

          return (
            <li key={opcion.id}>
              <ExamOptionCard
                optionId={opcion.id}
                correctAnswer={question.opcion_correcta}
                selectedOption={selected ?? undefined}
                answered={reveal}
                disabled={answeredCorrect}
                onSelect={handleSelect}
              >
                <MathRenderer content={opcion.texto} variant="exam-option" />
              </ExamOptionCard>
            </li>
          );
        })}
      </ul>

      <AnimatePresence>
        {answeredCorrect && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: [0.9, 1.04, 1] }
            }
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className={cn(
              'mt-4 flex items-start gap-2.5 rounded-xl border-2 p-4',
              metricStatus.mastered.surfaceStrong
            )}
          >
            <Sparkles className={cn('mt-0.5 h-5 w-5 shrink-0', examFeedback.correctIcon)} aria-hidden />
            <div>
              <p className={cn('flex items-center gap-1.5 font-semibold', examFeedback.correctIcon)}>
                <CheckCircle2 className="h-4 w-4" aria-hidden />
                ¡Correcto!
              </p>
              <div className="mt-1 text-sm text-muted-foreground">
                <MathRenderer content={question.explicacion} variant="inline" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {state === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={cn(
              'mt-4 flex flex-col gap-3 rounded-xl border-2 p-4',
              metricStatus.review.surfaceStrong
            )}
          >
            <p className={cn('flex items-center gap-1.5 font-semibold', examFeedback.reviewIcon)}>
              <XCircle className="h-4 w-4" aria-hidden />
              Casi — repasa el concepto
            </p>
            <button
              type="button"
              onClick={() => scrollToAnchor(question.anchorId)}
              className={cn(
                'inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white',
                pressScale
              )}
            >
              <ArrowDownToLine className="h-4 w-4" aria-hidden />
              Revisar teoría de nuevo
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {alreadyDone && state === 'idle' && (
        <p className="mt-3 text-xs font-medium text-green-600 dark:text-green-400">
          Ya dominaste esta pregunta antes ✓
        </p>
      )}
    </motion.div>
  );
}

/**
 * Mini-evaluación de retención al final de cada guía.
 * Persiste los aciertos offline (TanStack Query + localStorage) y guía al
 * estudiante de vuelta a la teoría exacta cuando falla.
 */
export function QuickQuiz({ slug, questions }: QuickQuizProps) {
  return (
    <section aria-labelledby="quickquiz-title" className="mt-12 space-y-5">
      <div className="space-y-1">
        <h2 id="quickquiz-title" className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
          Pon a prueba lo aprendido
        </h2>
        <p className="text-sm text-muted-foreground">
          3 preguntas clave. Tus aciertos se guardan aunque estés sin conexión.
        </p>
      </div>
      <div className="space-y-4">
        {questions.map((question, index) => (
          <QuizItem key={question.id} slug={slug} question={question} index={index} />
        ))}
      </div>
    </section>
  );
}
