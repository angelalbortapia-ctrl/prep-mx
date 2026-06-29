'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useRef, useState } from 'react';
import { ProductEvents } from '@/lib/analytics/events';
import { captureProductEvent } from '@/lib/analytics/capture';
import { useVerifiedClerkSession } from '@/hooks/useVerifiedClerkSession';

export interface TrackedAnswer {
  questionId: string;
  opcionElegida: string | null;
  isCorrect: boolean;
}

export interface SubmitExamPayload {
  examId?: string;
  examSessionId?: string;
  answers: TrackedAnswer[];
  /** practice: una pregunta; exam: lote al final */
  mode?: 'practice' | 'exam';
}

export interface SubmitExamResult {
  ok: boolean;
  feedbackId?: string;
  processing?: boolean;
  score?: number;
  total?: number;
  percentage?: number;
  savedCount?: number;
  skippedDemoCount?: number;
  xpEarned?: number;
  duplicate?: boolean;
  error?: string;
}

function submitKey(payload: SubmitExamPayload): string {
  const mode = payload.mode ?? (payload.answers.length === 1 ? 'practice' : 'exam');
  const session = payload.examSessionId ?? 'no-session';
  if (mode === 'practice') {
    return `practice:${session}:${payload.answers[0]?.questionId ?? ''}`;
  }
  return `exam:${session}`;
}

async function postExamSubmit(payload: SubmitExamPayload): Promise<SubmitExamResult> {
  const res = await fetch('/api/exams/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = (await res.json()) as SubmitExamResult & {
    feedbackId?: string;
    processing?: boolean;
    score?: number;
    total?: number;
    percentage?: number;
    savedCount?: number;
    skippedDemoCount?: number;
    xpEarned?: number;
    duplicate?: boolean;
    error?: string;
  };

  if (!res.ok) {
    return { ok: false, error: data.error ?? 'No se pudo guardar' };
  }

  return {
    ok: true,
    feedbackId: data.feedbackId,
    processing: data.processing,
    score: data.score,
    total: data.total,
    percentage: data.percentage,
    savedCount: data.savedCount,
    skippedDemoCount: data.skippedDemoCount,
    xpEarned: data.xpEarned,
    duplicate: data.duplicate,
  };
}

export function useExamSubmit() {
  const { isSessionReady, isLoaded, isSignedIn, sessionError } = useVerifiedClerkSession();
  const queryClient = useQueryClient();
  const [lastResult, setLastResult] = useState<SubmitExamResult | null>(null);
  const inFlightRef = useRef<Map<string, Promise<SubmitExamResult>>>(new Map());
  const completedRef = useRef<Map<string, SubmitExamResult>>(new Map());
  const payloadRef = useRef<SubmitExamPayload | null>(null);

  const canPersist = isSessionReady;

  const mutation = useMutation({
    mutationFn: postExamSubmit,
    /** Sin reintentos: un POST a medias podría duplicar SM-2 en Supabase. */
    retry: false,
    networkMode: 'always',
    onSuccess: (result) => {
      const payload = payloadRef.current;
      if (!result.ok || !payload) return;

      const key = submitKey(payload);
      completedRef.current.set(key, result);

      const mode = payload.mode ?? (payload.answers.length === 1 ? 'practice' : 'exam');
      if (mode === 'exam') {
        captureProductEvent(ProductEvents.EXAM_SUBMITTED, {
          exam_id: payload.examId ?? null,
          processing: result.processing ?? false,
          percentage: result.percentage,
          duplicate: result.duplicate ?? false,
        });
      }

      void queryClient.invalidateQueries({ queryKey: ['study', 'sm2-summary'] });
      void queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
      void queryClient.invalidateQueries({ queryKey: ['study', 'gamification'] });
    },
  });

  const submitExam = useCallback(
    async (payload: SubmitExamPayload): Promise<SubmitExamResult> => {
      if (!canPersist) {
        const result: SubmitExamResult = { ok: false, error: 'Inicia sesión para guardar' };
        setLastResult(result);
        return result;
      }

      if (!payload.examSessionId?.trim()) {
        const result: SubmitExamResult = {
          ok: false,
          error: 'Sesión de examen inválida',
        };
        setLastResult(result);
        return result;
      }

      const key = submitKey(payload);
      const cached = completedRef.current.get(key);
      if (cached) return cached;

      const inflight = inFlightRef.current.get(key);
      if (inflight) return inflight;

      payloadRef.current = payload;

      const promise = mutation
        .mutateAsync(payload)
        .then((result) => {
          setLastResult(result);
          return result;
        })
        .catch(() => {
          const result: SubmitExamResult = { ok: false, error: 'Error de red' };
          setLastResult(result);
          return result;
        })
        .finally(() => {
          inFlightRef.current.delete(key);
          payloadRef.current = null;
        });

      inFlightRef.current.set(key, promise);
      return promise;
    },
    [canPersist, mutation]
  );

  const resetSubmitCache = useCallback(() => {
    inFlightRef.current.clear();
    completedRef.current.clear();
    payloadRef.current = null;
    mutation.reset();
    setLastResult(null);
  }, [mutation]);

  return {
    submitExam,
    submitting: mutation.isPending || inFlightRef.current.size > 0,
    lastResult,
    canPersist,
    isAuthLoaded: isLoaded,
    isSignedIn,
    sessionError,
    resetSubmitCache,
  };
}
