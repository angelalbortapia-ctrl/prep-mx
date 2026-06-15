'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { CheckCircle2, Sparkles, Trophy, XCircle } from 'lucide-react';
import { AmbientExamMode } from '@/components/exam/AmbientExamMode';
import { DueloMatchmaking } from '@/components/exam/DueloMatchmaking';
import { Button } from '@/components/ui/button';
import { ExamThumbBar } from '@/components/exam/ExamThumbBar';
import { ProgressBar } from '@/components/exam/ProgressBar';
import { QuestionCard } from '@/components/exam/QuestionCard';
import { Timer } from '@/components/exam/Timer';
import {
  AdaptiveSheet,
  AdaptiveSheetContent,
  AdaptiveSheetDescription,
  AdaptiveSheetFooter,
  AdaptiveSheetHeader,
  AdaptiveSheetTitle,
} from '@/components/ui/adaptive-sheet';
import { ResultadoFeedback, type MateriaBreakdownItem } from '@/components/simulador/resultado-feedback';
import { useHaptics } from '@/hooks/useHaptics';
import { useExamIntegrity } from '@/hooks/useExamIntegrity';
import { useQuestionBookmarks } from '@/hooks/useQuestionBookmarks';
import { prepareExamQuestions } from '@/lib/shuffle-question-options';
import { cn } from '@/lib/utils';
import type { OpcionId, Question, QuestionCardState } from '@/types/question';

const MathRenderer = dynamic(() => import('@/components/math/MathRenderer'), { ssr: false });

import type { UniId } from '@/lib/uni-theme-config';

interface ExamSimulatorProps {
  questions: Question[];
  title?: string;
  durationMinutes?: number;
  sessionId?: string;
  /** Diagnóstico freemium de 10 preguntas para universidades bloqueadas. */
  freemiumMode?: boolean;
  freemiumUniId?: UniId;
  onFreemiumComplete?: () => void;
  /** Ponderación por materia según área académica seleccionada. */
  academicWeights?: Record<string, number>;
}

function accumulateMateria(
  prev: Record<string, { correct: number; total: number }>,
  materia: string,
  isCorrect: boolean
): Record<string, { correct: number; total: number }> {
  const existing = prev[materia] ?? { correct: 0, total: 0 };
  return {
    ...prev,
    [materia]: {
      correct: existing.correct + (isCorrect ? 1 : 0),
      total: existing.total + 1,
    },
  };
}

export function ExamSimulator({
  questions,
  title = 'Simulador',
  durationMinutes = 15,
  sessionId = 'demo',
  freemiumMode = false,
  freemiumUniId,
  onFreemiumComplete,
  academicWeights,
}: ExamSimulatorProps) {
  const preparedQuestions = useMemo(() => prepareExamQuestions(questions), [questions]);
  const haptics = useHaptics();

  const [index, setIndex] = useState(0);
  const [cardState, setCardState] = useState<QuestionCardState>('idle');
  const [selectedOption, setSelectedOption] = useState<OpcionId | undefined>();
  const [score, setScore] = useState(0);
  const [materiaStats, setMateriaStats] = useState<Record<string, { correct: number; total: number }>>({});
  const [finished, setFinished] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const integrity = useExamIntegrity(sessionId, !finished);
  const { isBookmarked, toggleBookmark } = useQuestionBookmarks();

  const current = preparedQuestions[index];
  const durationSeconds = durationMinutes * 60;
  const isLast = index + 1 >= preparedQuestions.length;
  const answered = cardState === 'correct' || cardState === 'error';

  const sessionKey = useMemo(
    () => `${sessionId}-${preparedQuestions.map((q) => q.id).join('-')}`,
    [sessionId, preparedQuestions]
  );

  const materiaBreakdown = useMemo<MateriaBreakdownItem[]>(
    () =>
      Object.entries(materiaStats).map(([materia, stats]) => ({
        materia,
        correct: stats.correct,
        total: stats.total,
      })),
    [materiaStats]
  );

  const livePct = preparedQuestions.length > 0 ? Math.round((score / preparedQuestions.length) * 100) : 0;

  function handleSelect(optionId: OpcionId) {
    if (answered) return;

    const isCorrect = optionId === current.opcion_correcta;
    setSelectedOption(optionId);
    setCardState(isCorrect ? 'correct' : 'error');
    if (isCorrect) setScore((s) => s + 1);
    setMateriaStats((prev) => accumulateMateria(prev, current.materia, isCorrect));

    if (isCorrect) void haptics.success();
    else void haptics.error();

    setFeedbackOpen(true);
  }

  function handleNext() {
    setFeedbackOpen(false);
    if (isLast) {
      setFinished(true);
      if (freemiumMode && freemiumUniId) {
        onFreemiumComplete?.();
      }
      return;
    }
    setIndex((i) => i + 1);
    setCardState('idle');
    setSelectedOption(undefined);
  }

  function handleSkip() {
    if (isLast) return;
    setFeedbackOpen(false);
    setIndex((i) => i + 1);
    setCardState('idle');
    setSelectedOption(undefined);
  }

  function handleBack() {
    if (index <= 0) return;
    setFeedbackOpen(false);
    setIndex((i) => i - 1);
    setCardState('idle');
    setSelectedOption(undefined);
  }

  function handleToggleBookmark() {
    if (!current) return;
    toggleBookmark({
      questionId: current.id,
      materia: current.materia,
      tema: current.tema,
    });
  }

  function handleRetry() {
    setIndex(0);
    setScore(0);
    setMateriaStats({});
    setFinished(false);
    setCardState('idle');
    setSelectedOption(undefined);
    setFeedbackOpen(false);
    localStorage.removeItem(`prepmx-timer-${sessionKey}`);
  }

  if (!preparedQuestions.length || !current) {
    return (
      <div className="exam-shell text-center text-muted-foreground">
        No hay preguntas disponibles para este simulador.
      </div>
    );
  }

  const pct = Math.round((score / preparedQuestions.length) * 100);
  const isCorrect = cardState === 'correct';
  const bookmarked = isBookmarked(current.id);

  return (
    <div className="space-y-6 pb-28 md:pb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Modo práctica · Feedback inmediato en cada respuesta
            {academicWeights && Object.keys(academicWeights).length > 0 && (
              <> · Ponderación por área académica</>
            )}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <DueloMatchmaking userScore={livePct} />
          <Timer
            sessionId={sessionKey}
            durationSeconds={durationSeconds}
            onExpire={() => setFinished(true)}
          />
        </div>
      </div>

      <AmbientExamMode />

      <ProgressBar current={index + 1} total={preparedQuestions.length} />

      <QuestionCard
        question={current}
        state={cardState}
        selectedOption={selectedOption}
        onSelect={handleSelect}
        showExplanation={false}
        showBookmark
      />

      {answered && !feedbackOpen && (
        <div className="hidden justify-end gap-3 md:flex">
          <Button variant="outline" className="h-12 rounded-[var(--radius)] active:scale-95" onClick={() => setFeedbackOpen(true)}>
            Ver explicación
          </Button>
          <Button onClick={handleNext} className="h-12 min-w-36 rounded-[var(--radius)] shadow-md shadow-primary/20 active:scale-95">
            {isLast ? 'Ver resultado' : 'Siguiente →'}
          </Button>
        </div>
      )}

      <ExamThumbBar
        canGoBack={index > 0}
        canGoForward={!isLast}
        isLast={isLast}
        answered={answered}
        bookmarked={bookmarked}
        onBack={handleBack}
        onNext={answered ? handleNext : handleSkip}
        onSkip={handleSkip}
        onToggleBookmark={handleToggleBookmark}
        onShowExplanation={() => setFeedbackOpen(true)}
      />

      <AdaptiveSheet open={feedbackOpen} onOpenChange={setFeedbackOpen} dismissible>
        <AdaptiveSheetContent>
          <AdaptiveSheetHeader>
            <div
              className={cn(
                'mb-1 flex h-12 w-12 items-center justify-center rounded-2xl',
                isCorrect ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
              )}
            >
              {isCorrect ? <CheckCircle2 className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
            </div>
            <AdaptiveSheetTitle>{isCorrect ? '¡Correcto!' : 'Casi — repasa esto'}</AdaptiveSheetTitle>
            <AdaptiveSheetDescription>
              {isCorrect
                ? 'Bien hecho. Aquí va el porqué para fijar el concepto.'
                : `La respuesta correcta era la opción ${current.opcion_correcta}.`}
            </AdaptiveSheetDescription>
          </AdaptiveSheetHeader>

          <div className="prose prose-sm mt-4 max-w-none text-muted-foreground">
            <MathRenderer content={current.explicacion} />
          </div>

          <AdaptiveSheetFooter className="mt-6">
            <Button
              onClick={handleNext}
              className="h-12 w-full rounded-xl shadow-md shadow-primary/20 active:scale-95"
            >
              {isLast ? 'Ver resultado' : 'Siguiente pregunta →'}
            </Button>
          </AdaptiveSheetFooter>
        </AdaptiveSheetContent>
      </AdaptiveSheet>

      <AdaptiveSheet open={finished} onOpenChange={(o) => !o && handleRetry()} dismissible={false}>
        <AdaptiveSheetContent className="max-h-[92vh] overflow-y-auto">
          <div className="space-y-6 py-2">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-uni-primary/10 text-uni-primary">
                <Trophy className="h-8 w-8" />
              </div>
              <AdaptiveSheetTitle className="mt-4 text-center text-2xl">
                {freemiumMode ? 'Diagnóstico gratuito completado' : 'Diagnóstico completado'}
              </AdaptiveSheetTitle>
              <p className="mt-2 text-muted-foreground">
                Acertaste {score} de {preparedQuestions.length} preguntas
                {freemiumMode && ' · Este fue tu acceso gratuito'}
              </p>
            </div>

            <ResultadoFeedback
              score={score}
              totalQuestions={preparedQuestions.length}
              materiaBreakdown={materiaBreakdown.length > 0 ? materiaBreakdown : undefined}
              percentage={pct}
              integrityScore={integrity.score}
              integrityBlurCount={integrity.blurCount}
            />

            <div className="relative mx-auto flex h-28 w-28 items-center justify-center">
              <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--secondary))" strokeWidth="8" />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="hsl(var(--uni-primary))"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${pct * 2.64} 264`}
                />
              </svg>
              <span className="text-2xl font-extrabold text-uni-primary">{pct}%</span>
            </div>

            <div className="flex flex-col gap-3">
              {freemiumMode && freemiumUniId ? (
                <>
                  <Button asChild className="h-12 rounded-xl shadow-lg shadow-primary/20 active:scale-95">
                    <Link
                      href={`/precios?uni=${freemiumUniId === 'todos' ? 'todas' : freemiumUniId}&plan=${freemiumUniId === 'todos' ? 'todo' : 'universidad'}`}
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Desbloquear simulacros completos
                    </Link>
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Los exámenes pesados quedan bloqueados hasta que actualices tu plan.
                  </p>
                </>
              ) : (
                <Button asChild className="h-12 rounded-xl shadow-lg shadow-primary/20 active:scale-95">
                  <Link href="/sign-up">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Guardar y ver mi plan
                  </Link>
                </Button>
              )}
              {!freemiumMode && (
                <Button variant="outline" className="h-12 rounded-[var(--radius)] active:scale-95" onClick={handleRetry}>
                  Reintentar
                </Button>
              )}
            </div>
          </div>
        </AdaptiveSheetContent>
      </AdaptiveSheet>
    </div>
  );
}
