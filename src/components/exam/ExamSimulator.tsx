'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Sparkles, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/exam/ProgressBar';
import { QuestionCard } from '@/components/exam/QuestionCard';
import { Timer } from '@/components/exam/Timer';
import { prepareExamQuestions } from '@/lib/shuffle-question-options';
import type { OpcionId, Question, QuestionCardState } from '@/types/question';

interface ExamSimulatorProps {
  questions: Question[];
  title?: string;
  durationMinutes?: number;
  sessionId?: string;
}

export function ExamSimulator({
  questions,
  title = 'Simulador',
  durationMinutes = 15,
  sessionId = 'demo',
}: ExamSimulatorProps) {
  const preparedQuestions = useMemo(() => prepareExamQuestions(questions), [questions]);

  const [index, setIndex] = useState(0);
  const [cardState, setCardState] = useState<QuestionCardState>('idle');
  const [selectedOption, setSelectedOption] = useState<OpcionId | undefined>();
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = preparedQuestions[index];
  const durationSeconds = durationMinutes * 60;

  const sessionKey = useMemo(
    () => `${sessionId}-${preparedQuestions.map((q) => q.id).join('-')}`,
    [sessionId, preparedQuestions]
  );

  function handleSelect(optionId: OpcionId) {
    if (cardState === 'correct' || cardState === 'error') return;

    setSelectedOption(optionId);
    setCardState('selected');

    const isCorrect = optionId === current.opcion_correcta;
    setCardState(isCorrect ? 'correct' : 'error');
    if (isCorrect) setScore((s) => s + 1);
  }

  function handleNext() {
    if (index + 1 >= preparedQuestions.length) {
      setFinished(true);
      return;
    }

    setIndex((i) => i + 1);
    setCardState('idle');
    setSelectedOption(undefined);
  }

  function handleRetry() {
    setIndex(0);
    setScore(0);
    setFinished(false);
    setCardState('idle');
    setSelectedOption(undefined);
    localStorage.removeItem(`prepmx-timer-${sessionKey}`);
  }

  if (!preparedQuestions.length || !current) {
    return (
      <div className="exam-shell text-center text-muted-foreground">
        No hay preguntas disponibles para este simulador.
      </div>
    );
  }

  if (finished) {
    const pct = Math.round((score / preparedQuestions.length) * 100);

    return (
      <div className="exam-shell mx-auto max-w-lg space-y-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Trophy className="h-8 w-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Diagnóstico completado</h2>
          <p className="mt-2 text-muted-foreground">
            Acertaste {score} de {preparedQuestions.length} preguntas
          </p>
        </div>
        <div className="relative mx-auto flex h-36 w-36 items-center justify-center">
          <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--secondary))" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${pct * 2.64} 264`}
            />
          </svg>
          <span className="text-3xl font-extrabold text-primary">{pct}%</span>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild className="h-12 rounded-xl shadow-lg shadow-primary/20">
            <Link href="/sign-up">
              <Sparkles className="mr-2 h-4 w-4" />
              Guardar y ver mi plan
            </Link>
          </Button>
          <Button variant="outline" className="h-12 rounded-xl bg-white" onClick={handleRetry}>
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Modo práctica · Feedback inmediato en cada respuesta
          </p>
        </div>
        <Timer
          sessionId={sessionKey}
          durationSeconds={durationSeconds}
          onExpire={() => setFinished(true)}
        />
      </div>

      <ProgressBar current={index + 1} total={preparedQuestions.length} />

      <QuestionCard
        question={current}
        state={cardState}
        selectedOption={selectedOption}
        onSelect={handleSelect}
        showExplanation
      />

      {(cardState === 'correct' || cardState === 'error') && (
        <div className="flex justify-end">
          <Button onClick={handleNext} className="h-12 min-w-36 rounded-xl shadow-md shadow-primary/20">
            {index + 1 >= preparedQuestions.length ? 'Ver resultado' : 'Siguiente →'}
          </Button>
        </div>
      )}
    </div>
  );
}
