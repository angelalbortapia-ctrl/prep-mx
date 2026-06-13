'use client';

import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import type { OpcionId, Question, QuestionCardState } from '@/types/question';

const MathRenderer = dynamic(() => import('@/components/math/MathRenderer'), {
  ssr: false,
  loading: () => <p className="animate-pulse text-sm text-muted-foreground">Cargando fórmula...</p>,
});

interface QuestionCardProps {
  question: Question;
  state: QuestionCardState;
  selectedOption?: OpcionId;
  onSelect: (optionId: OpcionId) => void;
  showExplanation?: boolean;
}

function optionStyles(
  optionId: OpcionId,
  state: QuestionCardState,
  selectedOption: OpcionId | undefined,
  correctAnswer: OpcionId
): string {
  if (state === 'idle' || state === 'selected') {
    return selectedOption === optionId
      ? 'border-primary bg-primary/5 ring-2 ring-primary'
      : 'hover:border-primary/50 hover:bg-accent';
  }

  if (optionId === correctAnswer) {
    return 'border-green-600 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100';
  }

  if (selectedOption === optionId) {
    return 'border-destructive bg-destructive/10 text-destructive';
  }

  return 'opacity-50';
}

export function QuestionCard({
  question,
  state,
  selectedOption,
  onSelect,
  showExplanation = false,
}: QuestionCardProps) {
  const answered = state === 'correct' || state === 'error';
  const disabled = answered;

  return (
    <article className="space-y-6 rounded-xl border bg-card p-4 md:p-6">
      <header className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {question.materia} · {question.tema}
        </p>
        <div className="text-base md:text-lg">
          <MathRenderer content={question.pregunta} />
        </div>
      </header>

      <ul className="space-y-3" role="listbox" aria-label="Opciones de respuesta">
        {question.opciones.map((opcion) => (
          <li key={opcion.id}>
            <button
              type="button"
              role="option"
              aria-selected={selectedOption === opcion.id}
              disabled={disabled}
              onClick={() => onSelect(opcion.id)}
              className={cn(
                'flex min-h-12 w-full items-start gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors md:text-base',
                optionStyles(opcion.id, state, selectedOption, question.opcion_correcta),
                disabled && 'cursor-default'
              )}
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold">
                {opcion.id}
              </span>
              <span className="flex-1 pt-0.5">
                <MathRenderer content={opcion.texto} />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {showExplanation && answered && (
        <div
          className={cn(
            'rounded-lg border p-4 text-sm',
            state === 'correct'
              ? 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950'
              : 'border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950'
          )}
        >
          <p className="mb-2 font-medium">
            {state === 'correct' ? '¡Correcto!' : 'Incorrecto — repasa esto:'}
          </p>
          <MathRenderer content={question.explicacion} />
        </div>
      )}
    </article>
  );
}
