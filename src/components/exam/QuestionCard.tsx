'use client';

import dynamic from 'next/dynamic';
import { Bookmark, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuestionBookmarks } from '@/hooks/useQuestionBookmarks';
import type { OpcionId, Question, QuestionCardState } from '@/types/question';

const MathRenderer = dynamic(() => import('@/components/math/MathRenderer'), {
  ssr: false,
  loading: () => (
    <div className="h-6 w-3/4 animate-pulse rounded-md bg-muted" />
  ),
});

const materiaStyles: Record<string, string> = {
  matematicas: 'bg-violet-100 text-violet-700',
  fisica: 'bg-sky-100 text-sky-700',
  quimica: 'bg-emerald-100 text-emerald-700',
};

interface QuestionCardProps {
  question: Question;
  state: QuestionCardState;
  selectedOption?: OpcionId;
  onSelect: (optionId: OpcionId) => void;
  showExplanation?: boolean;
  showBookmark?: boolean;
}

function optionStyles(
  optionId: OpcionId,
  state: QuestionCardState,
  selectedOption: OpcionId | undefined,
  correctAnswer: OpcionId
): string {
  if (state === 'idle' || state === 'selected') {
    return selectedOption === optionId
      ? 'border-primary bg-primary/5 shadow-md shadow-primary/10 ring-2 ring-primary/30'
      : 'border-border bg-white hover:border-primary/40 hover:bg-primary/[0.02] hover:shadow-sm';
  }

  if (optionId === correctAnswer) {
    return 'border-green-400 bg-green-50 shadow-sm';
  }

  if (selectedOption === optionId) {
    return 'border-red-300 bg-red-50 shadow-sm';
  }

  return 'border-border bg-muted/30 opacity-60';
}

export function QuestionCard({
  question,
  state,
  selectedOption,
  onSelect,
  showExplanation = false,
  showBookmark = false,
}: QuestionCardProps) {
  const answered = state === 'correct' || state === 'error';
  const badgeClass = materiaStyles[question.materia] ?? 'bg-primary/10 text-primary';
  const { isBookmarked, toggleBookmark } = useQuestionBookmarks();
  const bookmarked = isBookmarked(question.id);

  return (
    <article className="exam-shell space-y-6">
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className={cn('rounded-full px-3 py-1 text-xs font-semibold capitalize', badgeClass)}>
            {question.materia}
          </span>
          <span className="text-xs text-muted-foreground">{question.tema.replace('_', ' ')}</span>
          {question.dificultad && (
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs capitalize text-muted-foreground">
              {question.dificultad}
            </span>
          )}
          {showBookmark && (
            <button
              type="button"
              aria-label={bookmarked ? 'Quitar de banquillo de dudas' : 'Guardar en banquillo de dudas'}
              aria-pressed={bookmarked}
              onClick={() =>
                toggleBookmark({
                  questionId: question.id,
                  materia: question.materia,
                  tema: question.tema,
                })
              }
              className={cn(
                'ml-auto hidden h-9 w-9 items-center justify-center rounded-lg border transition-all active:scale-95 md:inline-flex',
                bookmarked
                  ? 'border-uni-primary bg-uni-primary/10 text-uni-primary'
                  : 'border-border text-muted-foreground hover:border-primary/40'
              )}
            >
              <Bookmark className={cn('h-4 w-4', bookmarked && 'fill-current')} />
            </button>
          )}
        </div>
        <div className="text-lg font-medium leading-snug md:text-xl">
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
              disabled={answered}
              onClick={() => onSelect(opcion.id)}
              className={cn(
                'flex min-h-14 w-full items-center gap-4 rounded-xl border-2 px-4 py-3.5 text-left transition-all duration-200',
                optionStyles(opcion.id, state, selectedOption, question.opcion_correcta),
                !answered && 'active:scale-[0.99]',
                answered && 'cursor-default'
              )}
            >
              <span
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 text-sm font-bold',
                  selectedOption === opcion.id && !answered && 'border-primary bg-primary text-primary-foreground',
                  answered && opcion.id === question.opcion_correcta && 'border-green-500 bg-green-500 text-white',
                  answered && selectedOption === opcion.id && opcion.id !== question.opcion_correcta && 'border-red-400 bg-red-400 text-white'
                )}
              >
                {opcion.id}
              </span>
              <span className="flex-1 font-medium">
                <MathRenderer content={opcion.texto} />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {showExplanation && answered && (
        <div
          className={cn(
            'flex gap-3 rounded-xl border-2 p-4 md:p-5',
            state === 'correct'
              ? 'border-green-200 bg-green-50/80'
              : 'border-amber-200 bg-amber-50/80'
          )}
        >
          {state === 'correct' ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
          ) : (
            <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          )}
          <div>
            <p className="font-semibold text-foreground">
              {state === 'correct' ? '¡Excelente!' : 'Casi — repasa esto:'}
            </p>
            <div className="mt-2 text-sm text-muted-foreground">
              <MathRenderer content={question.explicacion} />
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
