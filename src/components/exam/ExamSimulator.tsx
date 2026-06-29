'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { CheckCircle2, Loader2, Sparkles, Trophy, XCircle } from 'lucide-react';
import { AmbientExamMode } from '@/components/exam/AmbientExamMode';
import { ActiveExamSessionBlock } from '@/components/exam/ActiveExamSessionBlock';
import { DueloMatchmaking } from '@/components/exam/DueloMatchmaking';
import { Button } from '@/components/ui/button';
import { ExamFocusLayout } from '@/components/exam/ExamFocusLayout';
import { ExamThumbBar } from '@/components/exam/ExamThumbBar';
import { ProgressBar } from '@/components/exam/ProgressBar';
import { QuestionCard } from '@/components/exam/QuestionCard';
import {
  AdaptiveSheet,
  AdaptiveSheetContent,
  AdaptiveSheetDescription,
  AdaptiveSheetFooter,
  AdaptiveSheetHeader,
  AdaptiveSheetTitle,
} from '@/components/ui/adaptive-sheet';
import { ResultadoFeedback, type MateriaBreakdownItem } from '@/components/simulador/resultado-feedback';
import { useVerifiedClerkSession } from '@/hooks/useVerifiedClerkSession';
import { useHaptics } from '@/hooks/useHaptics';
import { useExamIntegrity } from '@/hooks/useExamIntegrity';
import { useExamKeyboardShortcuts } from '@/hooks/useExamKeyboardShortcuts';
import { useQuestionBookmarks } from '@/hooks/useQuestionBookmarks';
import { useExamSubmit, type TrackedAnswer } from '@/hooks/useExamSubmit';
import {
  clearPersistedExamSessionId,
  resolvePersistedExamSessionId,
  useExamDraft,
} from '@/hooks/useExamDraft';
import { prepareExamQuestions } from '@/lib/shuffle-question-options';
import type { ActiveExamSessionInfo } from '@/lib/exam-session-client';
import { claimExamSession } from '@/lib/exam-session-client';
import { cn } from '@/lib/utils';
import type { OpcionId, Question, QuestionCardState } from '@/types/question';

const MathRenderer = dynamic(() => import('@/components/math/MathRenderer'), { ssr: false });

import type { UniId } from '@/lib/uni-theme-config';
import type { PendingDiagnosticPayload } from '@/lib/pending-diagnostic';
import { isDemoMode } from '@/lib/demo-mode';
import { useFreemiumLives } from '@/hooks/useFreemiumLives';
import {
  FreemiumFreezeOverlay,
  FreemiumLivesHud,
} from '@/components/gamification/DuolingoGamification';
import type { UniversidadFilter } from '@/lib/university-theme';

export type ExamSimulatorMode = 'practice' | 'exam';

interface ExamSimulatorProps {
  questions: Question[];
  title?: string;
  durationMinutes?: number;
  sessionId?: string;
  /** practice: feedback inmediato + SM-2 por pregunta. exam: cronómetro, sin revelar aciertos hasta el final. */
  mode?: ExamSimulatorMode;
  /** ID del examen en data/exams.ts — se envía al guardar en Supabase. */
  examId?: string;
  /** Sesión UUID ya reclamada en servidor (simulacro cronometrado). */
  fixedExamSessionId?: string;
  /** Diagnóstico freemium de 10 preguntas para universidades bloqueadas. */
  freemiumMode?: boolean;
  freemiumUniId?: UniId;
  /** Activa vidas diarias (3) y congelamiento 24h — omitir si Plan Pro. */
  freemiumLivesEnabled?: boolean;
  onFreemiumComplete?: (payload: Omit<PendingDiagnosticPayload, 'completedAt' | 'uniId'>) => void;
  /** Ponderación por materia según área académica seleccionada. */
  academicWeights?: Record<string, number>;
}

export function ExamSimulator({
  questions,
  title = 'Simulador',
  durationMinutes = 15,
  sessionId = 'demo',
  mode = 'practice',
  examId,
  fixedExamSessionId,
  freemiumMode = false,
  freemiumUniId,
  freemiumLivesEnabled = true,
  onFreemiumComplete,
  academicWeights,
}: ExamSimulatorProps) {
  const isPractice = mode === 'practice';
  const needsTimedSession = !isPractice && !freemiumMode;
  const preparedQuestions = useMemo(() => prepareExamQuestions(questions), [questions]);
  const queryClient = useQueryClient();
  const haptics = useHaptics();
  const { isSessionReady, sessionError: clerkSessionError } = useVerifiedClerkSession();
  const { submitExam, canPersist, resetSubmitCache } = useExamSubmit();
  const localDemoSession = isDemoMode() && !canPersist;
  const livesGate = useFreemiumLives(freemiumMode && freemiumLivesEnabled);

  const [index, setIndex] = useState(0);
  const [cardState, setCardState] = useState<QuestionCardState>('idle');
  const [selectedOption, setSelectedOption] = useState<OpcionId | undefined>();
  const [answersByQuestion, setAnswersByQuestion] = useState<Record<string, TrackedAnswer>>({});
  const [finished, setFinished] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [submitState, setSubmitState] = useState<
    'idle' | 'saving' | 'saved' | 'queued' | 'error' | 'skipped'
  >('idle');
  const [savedFeedbackId, setSavedFeedbackId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [practiceSavedCount, setPracticeSavedCount] = useState(0);
  const [draftRestoredCount, setDraftRestoredCount] = useState(0);
  const freemiumReported = useRef(false);
  const examBatchSubmittedRef = useRef(false);
  const practiceSubmittedRef = useRef<Set<string>>(new Set());
  const examSessionIdRef = useRef(
    fixedExamSessionId ?? resolvePersistedExamSessionId(examId ?? sessionId)
  );
  const [sessionConflict, setSessionConflict] = useState<ActiveExamSessionInfo | null>(null);
  const [timedClockReady, setTimedClockReady] = useState(!needsTimedSession);
  const [clockSessionId, setClockSessionId] = useState<string | null>(null);
  const [sessionBootstrapError, setSessionBootstrapError] = useState<string | null>(null);
  const draftEnabled = !isPractice && !freemiumMode && canPersist && !sessionConflict && timedClockReady;

  const { draftState, restoreDraft, clearDraft, flushDraft } = useExamDraft({
    examSessionId: examSessionIdRef.current,
    examId,
    mode: 'exam',
    answersByQuestion,
    currentIndex: index,
    enabled: draftEnabled,
  });
  const draftRestoreAttempted = useRef(false);

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ['exam', 'questions'] });
    };
  }, [queryClient]);

  useEffect(() => {
    if (!needsTimedSession) {
      setTimedClockReady(true);
      return;
    }

    let cancelled = false;
    setSessionBootstrapError(null);

    const authorizeClock = (sessionUuid: string) => {
      const clockId = `${sessionUuid}-exam`;
      if (typeof window !== 'undefined') {
        localStorage.removeItem(`prepmx-timer-${clockId}`);
      }
      setClockSessionId(clockId);
      setTimedClockReady(true);
    };

    if (fixedExamSessionId) {
      authorizeClock(fixedExamSessionId);
      return;
    }

    if (isDemoMode()) {
      authorizeClock(examSessionIdRef.current);
      return;
    }

    if (!isSessionReady) {
      setTimedClockReady(false);
      setClockSessionId(null);
      setSessionBootstrapError(null);
      return;
    }

    void claimExamSession(examSessionIdRef.current, examId)
      .then((result) => {
        if (cancelled) return;
        if ('conflict' in result) {
          setSessionConflict(result.conflict);
          setTimedClockReady(false);
          return;
        }
        authorizeClock(examSessionIdRef.current);
      })
      .catch((e) => {
        if (cancelled) return;
        setTimedClockReady(false);
        setSessionBootstrapError(
          e instanceof Error ? e.message : 'No se pudo iniciar la sesión del simulacro'
        );
      });

    return () => {
      cancelled = true;
    };
  }, [needsTimedSession, isSessionReady, fixedExamSessionId, examId]);

  const integrity = useExamIntegrity(
    sessionId,
    !finished && needsTimedSession && timedClockReady
  );
  const { isBookmarked, toggleBookmark } = useQuestionBookmarks();

  const current = preparedQuestions[index];
  const durationSeconds = durationMinutes * 60;
  const isLast = index + 1 >= preparedQuestions.length;
  const hasSelection = selectedOption !== undefined;
  const revealed = cardState === 'correct' || cardState === 'error';
  const canAdvance = isPractice ? revealed : hasSelection;

  const sessionKey = useMemo(
    () => `${sessionId}-${mode}-${preparedQuestions.map((q) => q.id).join('-')}`,
    [sessionId, mode, preparedQuestions]
  );

  const materiaBreakdown = useMemo<MateriaBreakdownItem[]>(() => {
    const stats: Record<string, { correct: number; total: number }> = {};
    for (const answer of Object.values(answersByQuestion)) {
      const q = preparedQuestions.find((item) => item.id === answer.questionId);
      const materia = q?.materia ?? 'general';
      const bucket = stats[materia] ?? { correct: 0, total: 0 };
      bucket.total += 1;
      if (answer.isCorrect) bucket.correct += 1;
      stats[materia] = bucket;
    }
    return Object.entries(stats).map(([materia, s]) => ({
      materia,
      correct: s.correct,
      total: s.total,
    }));
  }, [answersByQuestion, preparedQuestions]);

  const score = useMemo(
    () => Object.values(answersByQuestion).filter((a) => a.isCorrect).length,
    [answersByQuestion]
  );

  const livePct = preparedQuestions.length > 0 ? Math.round((score / preparedQuestions.length) * 100) : 0;

  useEffect(() => {
    if (!current) return;
    const saved = answersByQuestion[current.id];
    if (!saved?.opcionElegida) {
      setCardState('idle');
      setSelectedOption(undefined);
      setFeedbackOpen(false);
      return;
    }
    setSelectedOption(saved.opcionElegida as OpcionId);
    if (isPractice) {
      setCardState(saved.isCorrect ? 'correct' : 'error');
    } else {
      setCardState('selected');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, current?.id, isPractice]);

  useEffect(() => {
    if (!draftEnabled || draftRestoreAttempted.current) return;
    draftRestoreAttempted.current = true;

    void restoreDraft().then((draft) => {
      if (!draft?.answers?.length) return;

      if (draft.examSessionId !== examSessionIdRef.current) {
        examSessionIdRef.current = draft.examSessionId;
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(
            `prepmx-exam-session:${examId ?? sessionId}`,
            draft.examSessionId
          );
        }
      }

      const restored: Record<string, TrackedAnswer> = {};
      for (const answer of draft.answers) {
        restored[answer.questionId] = answer;
      }
      setAnswersByQuestion(restored);
      setDraftRestoredCount(draft.answers.length);

      if (
        draft.currentIndex >= 0 &&
        draft.currentIndex < preparedQuestions.length
      ) {
        setIndex(draft.currentIndex);
      }
    });
  }, [draftEnabled, restoreDraft, examId, sessionId, preparedQuestions.length]);

  useEffect(() => {
    if (!finished || freemiumMode || isPractice) return;
    if (examBatchSubmittedRef.current) return;

    const answers = Object.values(answersByQuestion);
    if (!canPersist) {
      setSubmitState('skipped');
      return;
    }

    examBatchSubmittedRef.current = true;
    let cancelled = false;
    setSubmitState('saving');

    void (async () => {
      await flushDraft();
      if (cancelled) return;

      const result = await submitExam({
        examId,
        examSessionId: examSessionIdRef.current,
        answers: Object.values(answersByQuestion),
        mode: 'exam',
      });

      if (cancelled) return;
      if (result.ok) {
        setSavedFeedbackId(result.feedbackId ?? null);
        setSubmitState(result.processing ? 'queued' : 'saved');
      } else {
        examBatchSubmittedRef.current = false;
        setSubmitState('error');
        setSubmitError(result.error ?? 'No se pudo guardar');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [finished, freemiumMode, isPractice, canPersist, examId, answersByQuestion, submitExam, flushDraft]);

  useEffect(() => {
    if (!finished || !freemiumMode || !freemiumUniId || freemiumReported.current) return;
    freemiumReported.current = true;
    const pctDone =
      preparedQuestions.length > 0 ? Math.round((score / preparedQuestions.length) * 100) : 0;
    onFreemiumComplete?.({
      answers: Object.values(answersByQuestion),
      score,
      total: preparedQuestions.length,
      percentage: pctDone,
      materiaBreakdown: materiaBreakdown.length > 0 ? materiaBreakdown : undefined,
    });
  }, [
    finished,
    freemiumMode,
    freemiumUniId,
    answersByQuestion,
    score,
    preparedQuestions.length,
    materiaBreakdown,
    onFreemiumComplete,
  ]);

  useEffect(() => {
    if (!finished || !isPractice || freemiumMode) return;
    if (practiceSavedCount > 0 && canPersist) {
      setSubmitState('saved');
      setSavedFeedbackId(examSessionIdRef.current);
    } else if (!canPersist) {
      setSubmitState('skipped');
    }
  }, [finished, isPractice, freemiumMode, practiceSavedCount, canPersist]);

  function recordAnswer(optionId: OpcionId, isCorrect: boolean) {
    setAnswersByQuestion((prev) => ({
      ...prev,
      [current.id]: {
        questionId: current.id,
        opcionElegida: optionId,
        isCorrect,
      },
    }));
  }

  async function persistPracticeAnswer(answer: TrackedAnswer) {
    if (freemiumMode || !canPersist) return;
    if (practiceSubmittedRef.current.has(answer.questionId)) return;

    practiceSubmittedRef.current.add(answer.questionId);
    const result = await submitExam({
      examId,
      examSessionId: examSessionIdRef.current,
      answers: [answer],
      mode: 'practice',
    });
    if (!result.ok) {
      practiceSubmittedRef.current.delete(answer.questionId);
      return;
    }
    if (result.ok) {
      setPracticeSavedCount((n) => n + (result.savedCount ?? 1));
    }
  }

  function handleSelect(optionId: OpcionId) {
    if (isPractice && revealed) return;

    const isCorrect = optionId === current.opcion_correcta;
    setSelectedOption(optionId);

    if (isPractice) {
      setCardState(isCorrect ? 'correct' : 'error');
      recordAnswer(optionId, isCorrect);
      if (isCorrect) void haptics.success();
      else {
        void haptics.error();
        if (freemiumMode && livesGate.enabled) {
          livesGate.loseLife();
        }
      }
      const answer: TrackedAnswer = {
        questionId: current.id,
        opcionElegida: optionId,
        isCorrect,
      };
      void persistPracticeAnswer(answer);
      return;
    }

    setCardState('selected');
    recordAnswer(optionId, isCorrect);
  }

  function handleNext() {
    setFeedbackOpen(false);
    if (isLast) {
      if (draftEnabled) void flushDraft();
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
  }

  function handleSkip() {
    if (isLast) return;
    setFeedbackOpen(false);
    setIndex((i) => i + 1);
  }

  function handleBack() {
    if (index <= 0) return;
    setFeedbackOpen(false);
    setIndex((i) => i - 1);
  }

  const availableOptionIds = useMemo(
    () => current?.opciones.map((opcion) => opcion.id) ?? [],
    [current]
  );

  useExamKeyboardShortcuts({
    enabled: !finished && Boolean(current),
    availableOptions: availableOptionIds,
    onSelect: handleSelect,
    onNext: () => {
      if (canAdvance) handleNext();
    },
    onBack: handleBack,
  });

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
    setAnswersByQuestion({});
    setFinished(false);
    setCardState('idle');
    setSelectedOption(undefined);
    setFeedbackOpen(false);
    setSubmitState('idle');
    setSavedFeedbackId(null);
    setSubmitError(null);
    setPracticeSavedCount(0);
    setDraftRestoredCount(0);
    freemiumReported.current = false;
    examBatchSubmittedRef.current = false;
    practiceSubmittedRef.current.clear();
    draftRestoreAttempted.current = false;
    resetSubmitCache();
    void clearDraft();
    clearPersistedExamSessionId(examId ?? sessionId);
    examSessionIdRef.current = resolvePersistedExamSessionId(examId ?? sessionId);
    setTimedClockReady(!needsTimedSession);
    setClockSessionId(null);
    setSessionBootstrapError(null);
    if (clockSessionId) {
      localStorage.removeItem(`prepmx-timer-${clockSessionId}`);
    }
    localStorage.removeItem(`prepmx-timer-${sessionKey}`);
  }

  if (sessionConflict) {
    return <ActiveExamSessionBlock active={sessionConflict} />;
  }

  if (needsTimedSession && !timedClockReady) {
    return (
      <div className="exam-shell mx-auto max-w-lg space-y-4 p-8 text-center">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" aria-hidden />
        <p className="text-sm font-medium text-foreground">Verificando tu sesión…</p>
        <p className="text-xs text-muted-foreground">
          {sessionBootstrapError ?? clerkSessionError ?? 'Preparando el cronómetro del simulacro'}
        </p>
      </div>
    );
  }

  if (!preparedQuestions.length || !current) {
    return (
      <div className="exam-shell text-center text-muted-foreground">
        No hay preguntas disponibles para este simulador.
      </div>
    );
  }

  const freemiumUniFilter: UniversidadFilter =
    freemiumUniId === 'todos' ? 'todas' : (freemiumUniId ?? 'unam');

  if (freemiumMode && livesGate.enabled && livesGate.frozen && livesGate.freezeLabel) {
    return (
      <FreemiumFreezeOverlay
        freezeLabel={livesGate.freezeLabel}
        universidad={freemiumUniFilter}
      />
    );
  }

  const pct = Math.round((score / preparedQuestions.length) * 100);
  const isCorrect = cardState === 'correct';
  const bookmarked = isBookmarked(current.id);

  function handleExit() {
    if (draftEnabled) void flushDraft();
  }

  const answeredCount = Object.keys(answersByQuestion).length;

  const draftBadge =
    !isPractice && draftEnabled && draftState !== 'idle' ? (
      <span
        className={cn(
          'hidden rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide sm:inline',
          draftState === 'saved' && 'bg-emerald-500/15 text-emerald-800',
          draftState === 'saving' && 'bg-muted text-muted-foreground',
          draftState === 'error' && 'bg-amber-500/15 text-amber-800'
        )}
      >
        {draftState === 'saving'
          ? 'Guardando…'
          : draftState === 'error'
            ? 'Sin conexión'
            : 'Guardado'}
      </span>
    ) : null;

  const resultSheets = (
    <>
      {isPractice && (
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
              <MathRenderer content={current.explicacion} variant="rich" />
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
      )}

      <AdaptiveSheet open={finished} onOpenChange={(o) => !o && handleRetry()} dismissible={false}>
        <AdaptiveSheetContent className="max-h-[92vh] overflow-y-auto">
          <div className="space-y-6 py-2">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-uni-primary/10 text-uni-primary">
                <Trophy className="h-8 w-8" />
              </div>
              <AdaptiveSheetTitle className="mt-4 text-center text-2xl">
                {freemiumMode
                  ? 'Diagnóstico gratuito completado'
                  : isPractice
                    ? 'Práctica completada'
                    : 'Simulacro completado'}
              </AdaptiveSheetTitle>
              <p className="mt-2 text-muted-foreground">
                {isPractice || freemiumMode
                  ? `Acertaste ${score} de ${preparedQuestions.length} preguntas`
                  : `Resultado final: ${score} de ${preparedQuestions.length} aciertos`}
                {freemiumMode && ' · Este fue tu acceso gratuito'}
                {!isPractice && !freemiumMode && ' · Revisa tu diagnóstico completo abajo'}
              </p>
            </div>

            <ResultadoFeedback
              score={score}
              totalQuestions={preparedQuestions.length}
              materiaBreakdown={materiaBreakdown.length > 0 ? materiaBreakdown : undefined}
              percentage={pct}
              integrityScore={isPractice ? undefined : integrity.score}
              integrityBlurCount={isPractice ? undefined : integrity.blurCount}
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
              {submitState === 'saving' && (
                <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  Enviando tu simulacro…
                </p>
              )}
              {submitState === 'queued' && (
                <p className="text-center text-sm text-muted-foreground">
                  Guardado en cola. SM-2 y diagnóstico se procesan en segundo plano — puedes ver el
                  resumen ahora; el detalle en Supabase llega en unos segundos.
                </p>
              )}
              {submitState === 'saved' && savedFeedbackId && (
                <Button asChild className="h-12 rounded-xl shadow-lg shadow-primary/20 active:scale-95">
                  <Link href={`/dashboard/diagnostico/${savedFeedbackId}`}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Ver diagnóstico guardado
                  </Link>
                </Button>
              )}
              {isPractice && practiceSavedCount > 0 && submitState === 'saved' && (
                <p className="text-center text-xs text-emerald-700">
                  SM-2 actualizado en {practiceSavedCount} reactivo
                  {practiceSavedCount === 1 ? '' : 's'}.
                </p>
              )}
              {submitState === 'error' && (
                <p className="text-center text-sm text-amber-700">{submitError ?? 'No se pudo guardar'}</p>
              )}
              {freemiumMode && freemiumUniId ? (
                <>
                  <Button asChild className="h-12 rounded-xl shadow-lg shadow-primary/20 active:scale-95">
                    <Link href="/sign-up?redirect_url=%2Fonboarding">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Ver mi Diagnóstico con IA / Guardar Progreso
                    </Link>
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Regístrate gratis — tus respuestas se guardan al terminar el onboarding.
                  </p>
                  <Button asChild variant="outline" className="h-11 rounded-xl">
                    <Link
                      href={`/precios?uni=${freemiumUniId === 'todos' ? 'todas' : freemiumUniId}&plan=${freemiumUniId === 'todos' ? 'todo' : 'universidad'}`}
                    >
                      Ver planes Premium
                    </Link>
                  </Button>
                </>
              ) : submitState !== 'saved' && submitState !== 'queued' ? (
                <Button asChild className="h-12 rounded-xl shadow-lg shadow-primary/20 active:scale-95">
                  <Link href={canPersist || localDemoSession ? '/dashboard' : '/sign-up'}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    {canPersist || localDemoSession ? 'Ir a mi dashboard' : 'Guardar y ver mi plan'}
                  </Link>
                </Button>
              ) : null}
              {!freemiumMode && (
                <Button variant="outline" className="h-12 active:scale-95" onClick={handleRetry}>
                  Reintentar
                </Button>
              )}
            </div>
          </div>
        </AdaptiveSheetContent>
      </AdaptiveSheet>
    </>
  );

  if (!isPractice) {
    return (
      <>
        {!finished && <AmbientExamMode />}
        <ExamFocusLayout
          answeredCount={answeredCount}
          totalQuestions={preparedQuestions.length}
          currentIndex={index}
          clockSessionId={!finished && timedClockReady ? clockSessionId : null}
          durationSeconds={durationSeconds}
          onTimerExpire={() => setFinished(true)}
          onExit={handleExit}
          canGoBack={index > 0}
          canAdvance={canAdvance}
          isLast={isLast}
          onBack={handleBack}
          onNext={handleNext}
          draftBadge={draftBadge}
        >
          {draftRestoredCount > 0 && !finished && (
            <p className="mb-6 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-900">
              Recuperamos tu simulacro en curso ({draftRestoredCount} respuesta
              {draftRestoredCount === 1 ? '' : 's'} guardada{draftRestoredCount === 1 ? '' : 's'}).
            </p>
          )}
          <QuestionCard
            question={current}
            state={cardState}
            selectedOption={selectedOption}
            onSelect={handleSelect}
            showBookmark
            layout="split"
          />
        </ExamFocusLayout>
        {resultSheets}
      </>
    );
  }

  return (
    <div className="space-y-6 pb-28 md:pb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Modo práctica · Feedback inmediato y SM-2 por pregunta
            {academicWeights && Object.keys(academicWeights).length > 0 && (
              <> · Ponderación por área académica</>
            )}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {freemiumMode && livesGate.enabled ? (
            <FreemiumLivesHud livesRemaining={livesGate.livesRemaining} />
          ) : null}
          <DueloMatchmaking userScore={livePct} />
          <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-800">
            Práctica
          </span>
        </div>
      </div>

      <ProgressBar current={index + 1} total={preparedQuestions.length} />

      <QuestionCard
        question={current}
        state={cardState}
        selectedOption={selectedOption}
        onSelect={handleSelect}
        showExplanation={revealed}
        showBookmark
      />

      {canAdvance && (
        <div className="hidden justify-end gap-3 md:flex">
          <Button
            onClick={handleNext}
            className="h-12 min-w-36 rounded-[var(--radius)] shadow-md shadow-primary/20 active:scale-95"
          >
            {isLast ? 'Ver resultado' : 'Siguiente →'}
          </Button>
        </div>
      )}

      <ExamThumbBar
        canGoBack={index > 0}
        canGoForward={!isLast}
        isLast={isLast}
        answered={canAdvance}
        bookmarked={bookmarked}
        onBack={handleBack}
        onNext={canAdvance ? handleNext : handleSkip}
        onSkip={handleSkip}
        onToggleBookmark={handleToggleBookmark}
        onShowExplanation={() => setFeedbackOpen(true)}
        showExplanationButton
      />

      {resultSheets}
    </div>
  );
}
