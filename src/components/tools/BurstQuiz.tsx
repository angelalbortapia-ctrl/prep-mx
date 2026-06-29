'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { CheckCircle2, ChevronRight, Loader2, RotateCcw, Smartphone, XCircle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CyberCard } from '@/components/ui/cyber-card';
import { ExamOptionCard } from '@/components/exam/ExamOptionCard';
import { BurstExplanationPaywall } from '@/components/tools/BurstExplanationPaywall';
import { QuestionMediaFigure, QuestionVideoEmbed } from '@/components/exam/QuestionMediaFigure';
import { BURST_FALLBACK_QUESTIONS } from '@/data/study-tools/burst-quiz';
import { stripExplanationForPractice, type BurstPracticeQuestion } from '@/lib/practice-burst';
import { useBurstPracticeAnswer, useBurstPracticeQuestions } from '@/hooks/useBurstPractice';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useUniTheme } from '@/hooks/useUniTheme';
import { canViewPracticeExplanations } from '@/lib/practice-access';
import { SkeletonExamQuestion } from '@/components/ui/skeleton-body';
import type { OpcionId } from '@/types/question';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';

const MathRenderer = dynamic(() => import('@/components/math/MathRenderer'), {
  ssr: false,
  loading: () => <span className="inline-block h-5 w-2/3 animate-pulse rounded bg-muted" />,
});

const SESSION_SIZE = 10;

type Phase = 'idle' | 'question' | 'feedback' | 'ended';

function pickRandom(pool: BurstPracticeQuestion[], excludeId?: string): BurstPracticeQuestion {
  const filtered = excludeId ? pool.filter((q) => q.id !== excludeId) : pool;
  const source = filtered.length > 0 ? filtered : pool;
  return source[Math.floor(Math.random() * source.length)];
}

export function BurstQuiz() {
  const { uniId } = useUniTheme();
  const subscription = useSubscription();
  const queryClient = useQueryClient();
  const answerMutation = useBurstPracticeAnswer();

  const uniFilter = uniId === 'todos' ? 'todas' : uniId;
  const { data: apiPool, isLoading, isError, refetch } = useBurstPracticeQuestions(uniFilter);

  const pool = useMemo(() => {
    if (apiPool && apiPool.length > 0) return apiPool;
    return BURST_FALLBACK_QUESTIONS.map(stripExplanationForPractice);
  }, [apiPool]);

  const canExplain = canViewPracticeExplanations(subscription.subscriptions, uniId);

  const [phase, setPhase] = useState<Phase>('idle');
  const [current, setCurrent] = useState<BurstPracticeQuestion | null>(null);
  const [selected, setSelected] = useState<OpcionId | null>(null);
  const [round, setRound] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [correctOption, setCorrectOption] = useState<OpcionId | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [explanationImagenUrl, setExplanationImagenUrl] = useState<string | null>(null);
  const [explanationVideoUrl, setExplanationVideoUrl] = useState<string | null>(null);
  const [explanationLocked, setExplanationLocked] = useState(false);
  const startedAtRef = useRef<number>(0);

  const startRound = useCallback(
    (prevId?: string) => {
      const next = pickRandom(pool, prevId);
      setCurrent(next);
      setSelected(null);
      setCorrectOption(null);
      setExplanation(null);
      setExplanationImagenUrl(null);
      setExplanationVideoUrl(null);
      setExplanationLocked(false);
      answerMutation.reset();
      startedAtRef.current = Date.now();
      setPhase('question');
      setRound((r) => r + 1);
    },
    [pool, answerMutation]
  );

  const startSession = useCallback(() => {
    setCorrectCount(0);
    setRound(0);
    void refetch();
    startRound();
  }, [refetch, startRound]);

  const selectOption = async (optionId: OpcionId) => {
    if (phase !== 'question' || !current || selected || answerMutation.isPending) return;

    setSelected(optionId);
    const elapsed = Math.max(1, Math.round((Date.now() - startedAtRef.current) / 1000));

    try {
      const result = await answerMutation.mutateAsync({
        questionId: current.id,
        opcionElegida: optionId,
        timeSpentSeconds: elapsed,
      });

      setCorrectOption(result.correctOption);
      setExplanation(result.explanation);
      setExplanationImagenUrl(result.explanationImagenUrl);
      setExplanationVideoUrl(result.explanationVideoUrl);
      setExplanationLocked(result.explanationLocked);
      if (result.isCorrect) setCorrectCount((c) => c + 1);

      void queryClient.invalidateQueries({ queryKey: ['study', 'sm2-summary'] });
      void queryClient.invalidateQueries({ queryKey: ['gamification'] });
      setPhase('feedback');
    } catch {
      setPhase('question');
      setSelected(null);
    }
  };

  const nextQuestion = () => {
    if (round >= SESSION_SIZE) {
      setPhase('ended');
      return;
    }
    startRound(current?.id);
  };

  const isCorrect = selected !== null && correctOption !== null && selected === correctOption;

  return (
    <div className="space-y-4">
      <CyberCard className="flex flex-wrap items-center justify-between gap-3 border-primary/20 bg-primary/[0.03] p-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Modo práctica de ráfaga</p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Una pregunta · feedback al instante · ~10 min en el camión
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Smartphone className="h-4 w-4" aria-hidden />
          {phase === 'idle' || phase === 'ended' ? (
            <span>{SESSION_SIZE} preguntas por sesión</span>
          ) : (
            <span>
              {Math.min(round, SESSION_SIZE)}/{SESSION_SIZE} · {correctCount} aciertos
            </span>
          )}
        </div>
      </CyberCard>

      {phase === 'idle' ? (
        isLoading && !apiPool ? (
          <SkeletonExamQuestion />
        ) : (
          <CyberCard className="space-y-4 p-6 text-center">
            <Zap className="mx-auto h-8 w-8 text-amber-500" aria-hidden />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Sin cronómetro de 3 horas. Respondes una pregunta, ves verde o rojo al momento y{' '}
              {canExplain ? (
                'la explicación con KaTeX'
              ) : (
                <strong className="text-foreground">desbloqueas la explicación con Plan Pro</strong>
              )}
              . Cada respuesta actualiza tu SM-2.
            </p>
            {isError ? (
              <p className="text-xs text-amber-600 dark:text-amber-400">
                Sin conexión al banco — modo local limitado.
              </p>
            ) : null}
            <Button type="button" className="h-12 rounded-xl px-8" onClick={startSession}>
              Empezar ráfaga
            </Button>
          </CyberCard>
        )
      ) : null}

      {current && (phase === 'question' || phase === 'feedback') ? (
        <CyberCard className="space-y-4 p-5 md:p-6">
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold capitalize text-primary">
              {current.materia}
            </span>
            <span className="text-xs text-muted-foreground">{current.tema}</span>
          </div>

          <div className="text-base font-medium leading-relaxed text-foreground">
            <MathRenderer content={current.pregunta} />
          </div>

          <div className="space-y-3">
            {current.opciones.map((opt) => {
              const revealed = phase === 'feedback' && correctOption !== null;

              return (
                <ExamOptionCard
                  key={opt.id}
                  optionId={opt.id}
                  correctAnswer={correctOption ?? current.opcion_correcta}
                  selectedOption={selected ?? undefined}
                  answered={revealed}
                  disabled={phase === 'feedback' || answerMutation.isPending}
                  onSelect={(id) => void selectOption(id)}
                  trailing={
                    answerMutation.isPending && selected === opt.id ? (
                      <Loader2 className="h-4 w-4 shrink-0 animate-spin text-primary" />
                    ) : null
                  }
                >
                  <MathRenderer content={opt.texto} variant="exam-option" />
                </ExamOptionCard>
              );
            })}
          </div>

          {phase === 'feedback' ? (
            <div className="space-y-3">
              <div
                className={cn(
                  'flex gap-3 rounded-xl border-2 p-4',
                  isCorrect
                    ? 'border-green-200 bg-green-50/90 dark:border-green-800 dark:bg-green-950/40'
                    : 'border-amber-200 bg-amber-50/90 dark:border-amber-800 dark:bg-amber-950/40'
                )}
              >
                {isCorrect ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
                ) : (
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-foreground">
                    {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                  </p>
                  {!isCorrect && correctOption ? (
                    <p className="mt-1 text-sm text-muted-foreground">
                      La respuesta correcta es <strong className="text-foreground">{correctOption}</strong>
                    </p>
                  ) : null}
                </div>
              </div>

              {explanationLocked || !explanation ? (
                <BurstExplanationPaywall
                  uniId={uniId}
                  onUpgradeDemo={
                    subscription.addSubscription
                      ? () => subscription.addSubscription(uniId === 'todos' ? 'todos' : uniId)
                      : undefined
                  }
                />
              ) : (
                <div className="rounded-xl border border-border bg-muted/30 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    Explicación Pro
                  </p>
                  <div className="mt-2 text-sm leading-relaxed text-foreground">
                    <MathRenderer content={explanation} variant="rich" />
                  </div>
                  {explanationImagenUrl ? (
                    <QuestionMediaFigure
                      src={explanationImagenUrl}
                      alt="Explicación visual"
                      className="mt-3"
                    />
                  ) : null}
                  {explanationVideoUrl ? (
                    <QuestionVideoEmbed
                      embedUrl={explanationVideoUrl}
                      title="Video explicativo"
                      className="mt-3"
                    />
                  ) : null}
                </div>
              )}

              <Button type="button" className="w-full rounded-xl sm:w-auto" onClick={nextQuestion}>
                {round >= SESSION_SIZE ? 'Ver resumen' : 'Siguiente pregunta'}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          ) : null}
        </CyberCard>
      ) : null}

      {phase === 'ended' ? (
        <CyberCard className="space-y-4 p-6 text-center">
          <p className="text-2xl font-black text-foreground">
            {correctCount}/{SESSION_SIZE} aciertos
          </p>
          <p className="text-sm text-muted-foreground">
            Sesión de ráfaga completada. Tu SM-2 ya programó los repasos de lo que fallaste.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button type="button" className="rounded-xl" onClick={startSession}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Otra ráfaga
            </Button>
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/dashboard/simulacros">Simulacro completo</Link>
            </Button>
          </div>
        </CyberCard>
      ) : null}
    </div>
  );
}
