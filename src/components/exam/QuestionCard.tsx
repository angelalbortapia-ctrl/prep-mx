'use client';

import dynamic from 'next/dynamic';
import { Bookmark, CheckCircle2, XCircle } from 'lucide-react';
import { ExamOptionCard } from '@/components/exam/ExamOptionCard';
import { QuestionMediaFigure, QuestionVideoEmbed } from '@/components/exam/QuestionMediaFigure';
import { examFeedback, metricStatus } from '@/lib/design-system/colors';
import { pressScale } from '@/lib/design-system/interactive';
import { examStemText } from '@/lib/design-system/typography';
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
  matematicas: 'bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300',
  fisica: 'bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300',
  quimica: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
};

interface QuestionCardProps {
  question: Question;
  state: QuestionCardState;
  selectedOption?: OpcionId;
  onSelect: (optionId: OpcionId) => void;
  showExplanation?: boolean;
  showBookmark?: boolean;
  /** stack: enunciado arriba y opciones abajo. split: dos columnas en escritorio. */
  layout?: 'stack' | 'split';
}

export function QuestionCard({
  question,
  state,
  selectedOption,
  onSelect,
  showExplanation = false,
  showBookmark = false,
  layout = 'stack',
}: QuestionCardProps) {
  const answered = state === 'correct' || state === 'error';
  const badgeClass = materiaStyles[question.materia] ?? 'bg-primary/10 text-primary';
  const { isBookmarked, toggleBookmark } = useQuestionBookmarks();
  const bookmarked = isBookmarked(question.id);
  const isSplit = layout === 'split';

  const metaRow = (
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
            'ml-auto inline-flex h-9 w-9 items-center justify-center rounded-xl border',
            pressScale,
            bookmarked
              ? 'border-uni-primary bg-uni-primary/10 text-uni-primary'
              : 'border-border text-muted-foreground hover:border-primary/40'
          )}
        >
          <Bookmark className={cn('h-4 w-4', bookmarked && 'fill-current')} />
        </button>
      )}
    </div>
  );

  const stemBlock = (
    <>
      {metaRow}
      <div className={cn('text-lg text-foreground md:text-xl', examStemText)}>
        <MathRenderer content={question.pregunta} variant="exam-stem" />
      </div>
      {question.imagenUrl && (
        <QuestionMediaFigure
          src={question.imagenUrl}
          alt={`Diagrama — ${question.materia}`}
          className="mt-2"
        />
      )}
    </>
  );

  const optionsBlock = (
    <ul className="space-y-3" role="listbox" aria-label="Opciones de respuesta">
      {question.opciones.map((opcion) => (
        <li key={opcion.id}>
          <ExamOptionCard
            optionId={opcion.id}
            correctAnswer={question.opcion_correcta}
            selectedOption={selectedOption}
            answered={answered}
            onSelect={onSelect}
          >
            <MathRenderer content={opcion.texto} variant="exam-option" />
            {opcion.imagenUrl && (
              <QuestionMediaFigure
                src={opcion.imagenUrl}
                alt={`Opción ${opcion.id}`}
                className="mt-2"
                aspect="square"
              />
            )}
          </ExamOptionCard>
        </li>
      ))}
    </ul>
  );

  return (
    <article
      className={cn(
        'exam-shell',
        isSplit ? 'grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10' : 'space-y-6'
      )}
    >
      {isSplit ? (
        <>
          <header className="space-y-4">{stemBlock}</header>
          <div className="space-y-4">{optionsBlock}</div>
        </>
      ) : (
        <>
          <header className="space-y-4">{stemBlock}</header>
          {optionsBlock}
        </>
      )}

      {showExplanation && answered && (
        <div
          className={cn(
            'flex gap-3 rounded-xl border-2 p-4 md:p-5',
            isSplit && 'lg:col-span-2',
            state === 'correct'
              ? metricStatus.mastered.surfaceStrong
              : metricStatus.review.surfaceStrong
          )}
        >
          {state === 'correct' ? (
            <CheckCircle2 className={cn('mt-0.5 h-5 w-5 shrink-0', examFeedback.correctIcon)} />
          ) : (
            <XCircle className={cn('mt-0.5 h-5 w-5 shrink-0', examFeedback.reviewIcon)} />
          )}
          <div>
            <p className="font-semibold text-foreground">
              {state === 'correct' ? '¡Excelente!' : 'Casi — repasa esto:'}
            </p>
            <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
              <MathRenderer content={question.explicacion} variant="rich" />
            </div>
            {question.explicacionImagenUrl && (
              <QuestionMediaFigure
                src={question.explicacionImagenUrl}
                alt="Explicación visual"
                className="mt-3"
              />
            )}
            {question.explicacionVideoUrl && (
              <QuestionVideoEmbed
                embedUrl={question.explicacionVideoUrl}
                title="Video explicativo"
                className="mt-3"
              />
            )}
          </div>
        </div>
      )}
    </article>
  );
}
