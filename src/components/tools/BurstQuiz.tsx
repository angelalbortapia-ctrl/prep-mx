'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Flame, RotateCcw, Timer, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CyberCard } from '@/components/ui/cyber-card';
import {
  BURST_FALLBACK_QUESTIONS,
  BURST_POINTS_CORRECT,
  BURST_TIMER_SECONDS,
} from '@/data/study-tools/burst-quiz';
import { useExamQuestions } from '@/hooks/useStudyData';
import type { OpcionId, Question } from '@/types/question';
import { cn } from '@/lib/utils';

const MathRenderer = dynamic(() => import('@/components/math/MathRenderer'), {
  ssr: false,
  loading: () => <span className="inline-block h-5 w-2/3 animate-pulse rounded bg-muted" />,
});

const TOTAL_ROUNDS = 10;

type BurstPhase = 'idle' | 'playing' | 'feedback' | 'ended';

function pickRandomQuestion(pool: Question[], excludeId?: string): Question {
  const filtered = excludeId ? pool.filter((q) => q.id !== excludeId) : pool;
  const source = filtered.length > 0 ? filtered : pool;
  return source[Math.floor(Math.random() * source.length)];
}

export function BurstQuiz() {
  const { data: apiQuestions, isLoading, isError } = useExamQuestions({ limit: 40, enabled: true });

  const pool = useMemo(() => {
    if (apiQuestions && apiQuestions.length > 0) return apiQuestions;
    return BURST_FALLBACK_QUESTIONS;
  }, [apiQuestions]);

  const [phase, setPhase] = useState<BurstPhase>('idle');
  const [current, setCurrent] = useState<Question | null>(null);
  const [selected, setSelected] = useState<OpcionId | null>(null);
  const [timedOut, setTimedOut] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [round, setRound] = useState(0);
  const [timeLeft, setTimeLeft] = useState(BURST_TIMER_SECONDS);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startRound = useCallback(
    (prevId?: string) => {
      const next = pickRandomQuestion(pool, prevId);
      setCurrent(next);
      setSelected(null);
      setTimedOut(false);
      setTimeLeft(BURST_TIMER_SECONDS);
      setPhase('playing');
      setRound((r) => r + 1);
    },
    [pool]
  );

  useEffect(() => {
    if (phase !== 'playing') {
      clearTimer();
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return clearTimer;
  }, [phase, current?.id, clearTimer]);

  useEffect(() => {
    if (phase === 'playing' && timeLeft === 0) {
      clearTimer();
      setTimedOut(true);
      setStreak(0);
      setPhase('feedback');
    }
  }, [phase, timeLeft, clearTimer]);

  function startGame() {
    clearTimer();
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setRound(0);
    startRound();
  }

  function selectOption(optionId: OpcionId) {
    if (phase !== 'playing' || !current || selected) return;
    clearTimer();
    setSelected(optionId);

    const correct = optionId === current.opcion_correcta;
    if (correct) {
      setStreak((prev) => {
        const next = prev + 1;
        setMaxStreak((m) => Math.max(m, next));
        const bonus = prev >= 2 ? 5 : 0;
        setScore((s) => s + BURST_POINTS_CORRECT + bonus);
        return next;
      });
    } else {
      setStreak(0);
    }
    setPhase('feedback');
  }

  function nextQuestion() {
    if (round >= TOTAL_ROUNDS) {
      setPhase('ended');
      return;
    }
    startRound(current?.id);
  }

  const timerPct = (timeLeft / BURST_TIMER_SECONDS) * 100;
  const isCorrect = current && selected === current.opcion_correcta;

  return (
    <div className="space-y-4">
      <CyberCard className="flex flex-wrap items-center justify-between gap-3 p-4">
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1 font-bold">
            <Zap className="h-4 w-4 text-amber-500" />
            {score} pts
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <Flame className="h-4 w-4 text-orange-500" />
            Racha: {streak}
          </span>
          <span className="text-muted-foreground">
            Ronda {Math.min(round, TOTAL_ROUNDS)}/{TOTAL_ROUNDS}
          </span>
        </div>
        {phase === 'playing' ? (
          <div className="flex items-center gap-2">
            <Timer className={cn('h-4 w-4', timeLeft <= 10 ? 'text-red-500' : 'text-primary')} />
            <span className={cn('font-mono font-bold', timeLeft <= 10 && 'text-red-500')}>
              {timeLeft}s
            </span>
          </div>
        ) : null}
      </CyberCard>

      {phase === 'playing' ? (
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              'h-full transition-all duration-1000 ease-linear',
              timeLeft <= 10 ? 'bg-red-500' : 'bg-primary'
            )}
            style={{ width: `${timerPct}%` }}
          />
        </div>
      ) : null}

      {phase === 'idle' ? (
        <CyberCard className="space-y-4 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            {TOTAL_ROUNDS} preguntas aleatorias · {BURST_TIMER_SECONDS} segundos cada una · puntos por
            acierto y bonus por racha (3+ seguidas).
          </p>
          {isError ? (
            <p className="text-xs text-amber-600">Sin conexión al banco — usamos preguntas locales.</p>
          ) : null}
          <Button
            type="button"
            className="h-12 rounded-xl px-8"
            onClick={startGame}
            disabled={isLoading && pool.length === 0}
          >
            {isLoading ? 'Cargando banco…' : 'Iniciar ráfaga'}
          </Button>
        </CyberCard>
      ) : null}

      {current && phase !== 'idle' && phase !== 'ended' ? (
        <CyberCard className="space-y-4 p-5 md:p-6">
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold capitalize text-primary">
              {current.materia}
            </span>
            <span className="text-xs text-muted-foreground">{current.tema}</span>
          </div>

          <div className="text-base font-medium leading-relaxed">
            <MathRenderer content={current.pregunta} />
          </div>

          <div className="space-y-2">
            {current.opciones.map((opt) => {
              let style = 'border-border hover:border-primary/40';
              if (phase === 'feedback' || selected) {
                if (opt.id === current.opcion_correcta) style = 'border-green-500 bg-green-50';
                else if (opt.id === selected) style = 'border-red-400 bg-red-50';
                else style = 'border-border opacity-50';
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={phase === 'feedback'}
                  onClick={() => selectOption(opt.id)}
                  className={cn(
                    'w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors',
                    style
                  )}
                >
                  <span className="mr-2 font-bold">{opt.id}.</span>
                  <MathRenderer content={opt.texto} />
                </button>
              );
            })}
          </div>

          {phase === 'feedback' ? (
            <div
              className={cn(
                'rounded-xl border p-4 text-sm',
                isCorrect ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'
              )}
            >
              <p className="font-bold">{isCorrect ? '¡Correcto!' : 'Truco del reactivo'}</p>
              {timedOut && !selected ? (
                <p className="mt-1 text-muted-foreground">Se acabó el tiempo.</p>
              ) : null}
              <p className="mt-2 leading-relaxed text-muted-foreground">
                <MathRenderer content={current.explicacion} />
              </p>
              <Button type="button" className="mt-4 rounded-xl" onClick={nextQuestion}>
                {round >= TOTAL_ROUNDS ? 'Ver puntaje final' : 'Siguiente pregunta'}
              </Button>
            </div>
          ) : null}
        </CyberCard>
      ) : null}

      {phase === 'ended' ? (
        <CyberCard className="space-y-4 p-6 text-center">
          <p className="text-2xl font-black">Puntaje final: {score}</p>
          <p className="text-sm text-muted-foreground">
            Completaste {TOTAL_ROUNDS} rondas · mejor racha: {maxStreak}
          </p>
          <Button type="button" variant="outline" className="rounded-xl" onClick={startGame}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Jugar de nuevo
          </Button>
        </CyberCard>
      ) : null}
    </div>
  );
}
