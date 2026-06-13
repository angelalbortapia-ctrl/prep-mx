'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/exam/ProgressBar';
import { QuestionCard } from '@/components/exam/QuestionCard';
import { Timer } from '@/components/exam/Timer';
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
  const [index, setIndex] = useState(0);
  const [cardState, setCardState] = useState<QuestionCardState>('idle');
  const [selectedOption, setSelectedOption] = useState<OpcionId | undefined>();
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = questions[index];
  const durationSeconds = durationMinutes * 60;

  const sessionKey = useMemo(
    () => `${sessionId}-${questions.map((q) => q.id).join('-')}`,
    [sessionId, questions]
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
    if (index + 1 >= questions.length) {
      setFinished(true);
      return;
    }

    setIndex((i) => i + 1);
    setCardState('idle');
    setSelectedOption(undefined);
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);

    return (
      <div className="mx-auto max-w-lg space-y-6 text-center">
        <h2 className="text-2xl font-bold">Diagnóstico completado</h2>
        <p className="text-4xl font-bold text-primary">{pct}%</p>
        <p className="text-muted-foreground">
          Acertaste {score} de {questions.length} preguntas.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild className="h-12">
            <Link href="/sign-up">Guardar resultado y ver mi plan</Link>
          </Button>
          <Button
            variant="outline"
            className="h-12"
            onClick={() => {
              setIndex(0);
              setScore(0);
              setFinished(false);
              setCardState('idle');
              setSelectedOption(undefined);
              localStorage.removeItem(`prepmx-timer-${sessionKey}`);
            }}
          >
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold md:text-2xl">{title}</h1>
          <p className="text-sm text-muted-foreground">
            Modo práctica — feedback inmediato
          </p>
        </div>
        <Timer
          sessionId={sessionKey}
          durationSeconds={durationSeconds}
          onExpire={() => setFinished(true)}
        />
      </div>

      <ProgressBar current={index + 1} total={questions.length} />

      <QuestionCard
        question={current}
        state={cardState}
        selectedOption={selectedOption}
        onSelect={handleSelect}
        showExplanation
      />

      {(cardState === 'correct' || cardState === 'error') && (
        <div className="flex justify-end">
          <Button onClick={handleNext} className="h-12 min-w-32">
            {index + 1 >= questions.length ? 'Ver resultado' : 'Siguiente'}
          </Button>
        </div>
      )}
    </div>
  );
}
