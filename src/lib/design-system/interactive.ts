import { examFeedback } from '@/lib/design-system/colors';
import { cn } from '@/lib/utils';
import type { OpcionId } from '@/types/question';

/**
 * Micro-interacción táctil — hundimiento al presionar (móvil).
 * Usar en botones y tarjetas interactivas.
 */
export const pressScale = cn(
  'tap-transparent transition-all duration-150 ease-spring',
  'active:scale-[0.98]',
  'disabled:active:scale-100'
);

/** Base de tarjeta secundaria (navegación / descarte — opciones A–D). */
export const examOptionCardBase = cn(
  pressScale,
  'group relative flex w-full min-h-[3.75rem] items-center gap-4 rounded-xl border-2 px-4 py-3.5 text-left',
  'bg-card shadow-sm',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
);

export type ExamOptionVisualState = 'idle' | 'selected' | 'correct' | 'incorrect' | 'dimmed';

export function resolveExamOptionVisualState(
  optionId: OpcionId,
  selectedOption: OpcionId | undefined,
  correctAnswer: OpcionId,
  answered: boolean
): ExamOptionVisualState {
  if (!answered) {
    return selectedOption === optionId ? 'selected' : 'idle';
  }
  if (optionId === correctAnswer) return 'correct';
  if (selectedOption === optionId) return 'incorrect';
  return 'dimmed';
}

export function examOptionCardSurface(state: ExamOptionVisualState): string {
  switch (state) {
    case 'idle':
      return cn(
        'border-border text-foreground',
        'md:hover:-translate-y-px md:hover:border-primary/35 md:hover:bg-primary/[0.04] md:hover:shadow-md'
      );
    case 'selected':
      return 'border-primary bg-primary/[0.06] shadow-md shadow-primary/10 ring-2 ring-primary/25';
    case 'correct':
      return cn('cursor-default shadow-sm', examFeedback.correct);
    case 'incorrect':
      return cn('cursor-default shadow-sm', examFeedback.incorrect);
    case 'dimmed':
      return 'cursor-default border-border bg-muted/25 text-muted-foreground opacity-55';
  }
}

export function examOptionLetterBadge(state: ExamOptionVisualState): string {
  const base =
    'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 text-sm font-bold transition-colors';

  switch (state) {
    case 'selected':
      return cn(base, 'border-primary bg-primary text-primary-foreground shadow-sm');
    case 'correct':
      return cn(base, examFeedback.correctSolid);
    case 'incorrect':
      return cn(base, examFeedback.incorrectSolid);
    default:
      return cn(
        base,
        'border-border bg-muted/60 text-foreground',
        state === 'idle' &&
          'group-hover:border-primary/40 group-hover:bg-primary/10 md:group-hover:text-primary'
      );
  }
}
