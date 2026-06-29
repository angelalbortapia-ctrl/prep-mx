'use client';

import { Bookmark, ChevronLeft, ChevronRight, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ExamThumbBarProps {
  canGoBack: boolean;
  canGoForward: boolean;
  isLast: boolean;
  answered: boolean;
  bookmarked: boolean;
  onBack: () => void;
  onNext: () => void;
  onSkip: () => void;
  onToggleBookmark: () => void;
  onShowExplanation?: () => void;
  /** Ocultar botón de explicación (modo simulacro real). */
  showExplanationButton?: boolean;
  className?: string;
}

/**
 * Zona del pulgar — controles fijos en la parte inferior en móvil
 * para navegación, saltar y banquillo de dudas con una sola mano.
 */
export function ExamThumbBar({
  canGoBack,
  canGoForward,
  isLast,
  answered,
  bookmarked,
  onBack,
  onNext,
  onSkip,
  onToggleBookmark,
  onShowExplanation,
  showExplanationButton = true,
  className,
}: ExamThumbBarProps) {
  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 z-40 w-full border-t border-border/80 bg-card/95 p-4 pb-safe backdrop-blur-md',
        'gpu shadow-[0_-8px_32px_-8px_hsl(var(--uni-primary)/0.12)]',
        'md:relative md:bottom-auto md:left-auto md:z-auto md:w-auto md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none',
        className
      )}
    >
      <div className="mx-auto flex max-w-lg items-center gap-2 md:max-w-none md:justify-end">
        <Button
          type="button"
          variant="outline"
          size="icon"
          disabled={!canGoBack}
          onClick={onBack}
          aria-label="Pregunta anterior"
          className="h-12 w-12 shrink-0 rounded-[var(--radius)] active:scale-95 md:hidden"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onToggleBookmark}
          aria-label={bookmarked ? 'Quitar del banquillo' : 'Guardar en banquillo'}
          aria-pressed={bookmarked}
          className={cn(
            'h-12 w-12 shrink-0 rounded-[var(--radius)] active:scale-95 md:hidden',
            bookmarked && 'border-uni-primary bg-uni-primary/10 text-uni-primary'
          )}
        >
          <Bookmark className={cn('h-5 w-5', bookmarked && 'fill-current')} />
        </Button>

        {!answered && (
          <Button
            type="button"
            variant="ghost"
            onClick={onSkip}
            disabled={!canGoForward}
            className="h-12 flex-1 rounded-[var(--radius)] text-sm font-semibold active:scale-95 md:hidden"
          >
            <SkipForward className="mr-1.5 h-4 w-4" />
            Saltar
          </Button>
        )}

        {answered && showExplanationButton && onShowExplanation && (
          <Button
            type="button"
            variant="outline"
            onClick={onShowExplanation}
            className="h-12 flex-1 rounded-[var(--radius)] text-sm active:scale-95 md:hidden"
          >
            Explicación
          </Button>
        )}

        <Button
          type="button"
          onClick={onNext}
          disabled={!answered && !canGoForward}
          className={cn(
            'h-12 min-w-[7rem] flex-1 rounded-[var(--radius)] shadow-md shadow-primary/15 active:scale-95 md:hidden',
            !answered && 'opacity-50'
          )}
        >
          {isLast ? 'Resultado' : 'Siguiente'}
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
