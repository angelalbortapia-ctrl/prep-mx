'use client';

import type { ReactNode } from 'react';
import {
  examOptionCardBase,
  examOptionCardSurface,
  examOptionLetterBadge,
  resolveExamOptionVisualState,
} from '@/lib/design-system/interactive';
import { readingBody } from '@/lib/design-system/typography';
import { cn } from '@/lib/utils';
import type { OpcionId } from '@/types/question';

export interface ExamOptionCardProps {
  optionId: OpcionId;
  correctAnswer: OpcionId;
  selectedOption?: OpcionId;
  answered: boolean;
  disabled?: boolean;
  onSelect: (optionId: OpcionId) => void;
  children: ReactNode;
  className?: string;
  trailing?: ReactNode;
}

/**
 * Tarjeta interactiva para opciones A–D (secundaria / navegación).
 * No es un botón plano: elevación, hover y press scale en móvil.
 */
export function ExamOptionCard({
  optionId,
  correctAnswer,
  selectedOption,
  answered,
  disabled,
  onSelect,
  children,
  className,
  trailing,
}: ExamOptionCardProps) {
  const visualState = resolveExamOptionVisualState(
    optionId,
    selectedOption,
    correctAnswer,
    answered
  );

  return (
    <button
      type="button"
      role="option"
      aria-selected={selectedOption === optionId}
      disabled={disabled ?? answered}
      onClick={() => onSelect(optionId)}
      className={cn(
        examOptionCardBase,
        examOptionCardSurface(visualState),
        className
      )}
    >
      <span className={examOptionLetterBadge(visualState)} aria-hidden>
        {optionId}
      </span>
      <span className={cn('flex min-w-0 flex-1 items-center', readingBody, 'text-foreground')}>
        {children}
      </span>
      {trailing}
    </button>
  );
}
