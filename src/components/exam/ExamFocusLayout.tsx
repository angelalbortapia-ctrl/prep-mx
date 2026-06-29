'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { Timer } from '@/components/exam/Timer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  AdaptiveSheet,
  AdaptiveSheetContent,
  AdaptiveSheetDescription,
  AdaptiveSheetFooter,
  AdaptiveSheetHeader,
  AdaptiveSheetTitle,
} from '@/components/ui/adaptive-sheet';
import { appContentWide } from '@/lib/design-system/layout';
import { cn } from '@/lib/utils';

interface ExamFocusLayoutProps {
  answeredCount: number;
  totalQuestions: number;
  currentIndex: number;
  clockSessionId: string | null;
  durationSeconds: number;
  onTimerExpire: () => void;
  onExit: () => void;
  canGoBack: boolean;
  canAdvance: boolean;
  isLast: boolean;
  onBack: () => void;
  onNext: () => void;
  draftBadge?: React.ReactNode;
  children: React.ReactNode;
}

export function ExamFocusLayout({
  answeredCount,
  totalQuestions,
  currentIndex,
  clockSessionId,
  durationSeconds,
  onTimerExpire,
  onExit,
  canGoBack,
  canAdvance,
  isLast,
  onBack,
  onNext,
  draftBadge,
  children,
}: ExamFocusLayoutProps) {
  const [exitOpen, setExitOpen] = useState(false);
  const progressValue =
    totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  return (
    <div className="flex min-h-[var(--app-viewport-main)] flex-1 flex-col">
      <header className="sticky top-0 z-30 shrink-0 border-b border-border/80 bg-background/95 py-3 backdrop-blur-md">
        <div className={cn(appContentWide, 'flex items-center gap-3 md:gap-4')}>
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="flex items-center justify-between gap-2 text-xs font-medium text-muted-foreground">
              <span>
                Pregunta {currentIndex + 1} de {totalQuestions}
              </span>
              <span className="tabular-nums">
                {answeredCount}/{totalQuestions} contestadas
              </span>
            </div>
            <Progress value={progressValue} aria-label="Progreso del simulacro" />
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {draftBadge}
            {clockSessionId ? (
              <Timer
                sessionId={clockSessionId}
                durationSeconds={durationSeconds}
                onExpire={onTimerExpire}
                className="shrink-0"
              />
            ) : null}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setExitOpen(true)}
              className="h-9 gap-1.5 px-2.5 text-xs text-muted-foreground md:px-3"
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden />
              <span className="hidden sm:inline">Pausar / Salir</span>
              <span className="sm:hidden">Salir</span>
            </Button>
          </div>
        </div>
      </header>

      <div className={cn(appContentWide, 'flex min-h-0 flex-1 flex-col py-4 md:py-6')}>
        {children}
      </div>

      <footer className="sticky bottom-0 z-30 shrink-0 border-t border-border/80 bg-card/95 py-4 pb-safe backdrop-blur-md">
        <div className={cn(appContentWide, 'flex items-center justify-between gap-3')}>
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={!canGoBack}
            className="h-12 min-w-[7.5rem] rounded-xl active:scale-[0.98]"
          >
            <ChevronLeft className="mr-1 h-4 w-4" aria-hidden />
            Anterior
          </Button>

          <Button
            type="button"
            onClick={onNext}
            disabled={!canAdvance}
            title={!canAdvance ? 'Selecciona una opción para continuar' : undefined}
            className={cn(
              'h-12 min-w-[9rem] flex-1 rounded-xl shadow-md shadow-primary/15 active:scale-[0.98] sm:flex-none sm:min-w-[10rem]',
              !canAdvance && 'opacity-50'
            )}
          >
            {isLast ? 'Enviar' : 'Siguiente'}
            {!isLast ? <ChevronRight className="ml-1 h-4 w-4" aria-hidden /> : null}
          </Button>
        </div>
      </footer>

      <AdaptiveSheet open={exitOpen} onOpenChange={setExitOpen}>
        <AdaptiveSheetContent>
          <AdaptiveSheetHeader>
            <AdaptiveSheetTitle>¿Salir del simulacro?</AdaptiveSheetTitle>
            <AdaptiveSheetDescription>
              Tu progreso se guarda automáticamente. Podrás retomarlo más tarde desde Simulacros.
            </AdaptiveSheetDescription>
          </AdaptiveSheetHeader>
          <AdaptiveSheetFooter className="mt-6 gap-2 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() => setExitOpen(false)}
              className="h-12 w-full rounded-xl sm:flex-1"
            >
              Seguir examen
            </Button>
            <Button asChild className="h-12 w-full rounded-xl sm:flex-1">
              <Link
                href="/dashboard/simulacros"
                onClick={() => {
                  setExitOpen(false);
                  onExit();
                }}
              >
                Salir y guardar
              </Link>
            </Button>
          </AdaptiveSheetFooter>
        </AdaptiveSheetContent>
      </AdaptiveSheet>
    </div>
  );
}
