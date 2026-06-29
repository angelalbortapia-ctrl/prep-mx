'use client';

import { useVerifiedClerkSession } from '@/hooks/useVerifiedClerkSession';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { TrackedAnswer } from '@/hooks/useExamSubmit';

const DEBOUNCE_MS = 2000;

export type ExamDraftMode = 'practice' | 'exam';

export interface ExamDraftSnapshot {
  examSessionId: string;
  examId: string | null;
  mode: ExamDraftMode;
  currentIndex: number;
  answers: TrackedAnswer[];
  updatedAt: string | null;
}

interface UseExamDraftOptions {
  examSessionId: string;
  examId?: string;
  mode: ExamDraftMode;
  answersByQuestion: Record<string, TrackedAnswer>;
  currentIndex: number;
  /** Solo simulacro completo (exam) y usuario autenticado */
  enabled: boolean;
}

export function useExamDraft({
  examSessionId,
  examId,
  mode,
  answersByQuestion,
  currentIndex,
  enabled,
}: UseExamDraftOptions) {
  const { isSessionReady } = useVerifiedClerkSession();
  const canPersist = isSessionReady;
  const [draftState, setDraftState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const persistDraft = useCallback(
    async (answers: Record<string, TrackedAnswer>, index: number) => {
      if (!canPersist || !enabled) return;

      setDraftState('saving');
      try {
        const res = await fetch('/api/exams/draft', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            examSessionId,
            examId,
            mode,
            currentIndex: index,
            answers: Object.values(answers),
          }),
        });
        const data = (await res.json()) as { ok?: boolean; savedAt?: string; error?: string };
        if (!res.ok) {
          setDraftState('error');
          return;
        }
        setDraftState('saved');
        setLastSavedAt(data.savedAt ?? new Date().toISOString());
      } catch {
        setDraftState('error');
      }
    },
    [canPersist, enabled, examSessionId, examId, mode]
  );

  const scheduleSave = useCallback(
    (answers: Record<string, TrackedAnswer>, index: number) => {
      if (!canPersist || !enabled) return;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        void persistDraft(answers, index);
      }, DEBOUNCE_MS);
    },
    [canPersist, enabled, persistDraft]
  );

  useEffect(() => {
    scheduleSave(answersByQuestion, currentIndex);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [answersByQuestion, currentIndex, scheduleSave]);

  const restoreDraft = useCallback(async (): Promise<ExamDraftSnapshot | null> => {
    if (!canPersist || !enabled) return null;

    async function fetchDraft(params: Record<string, string>) {
      const qs = new URLSearchParams(params);
      const res = await fetch(`/api/exams/draft?${qs}`, { credentials: 'include' });
      if (!res.ok) return null;
      const data = (await res.json()) as { draft: ExamDraftSnapshot | null };
      return data.draft;
    }

    try {
      if (examSessionId) {
        const bySession = await fetchDraft({ examSessionId });
        if (bySession?.answers?.length) return bySession;
      }
      if (examId) {
        return await fetchDraft({ examId });
      }
      return null;
    } catch {
      return null;
    }
  }, [canPersist, enabled, examSessionId, examId]);

  const clearDraft = useCallback(async () => {
    if (!canPersist) return;
    try {
      await fetch(`/api/exams/draft?examSessionId=${encodeURIComponent(examSessionId)}`, {
        method: 'DELETE',
        credentials: 'include',
      });
    } catch {
      /* ignore */
    }
    setDraftState('idle');
    setLastSavedAt(null);
  }, [canPersist, examSessionId]);

  const flushDraft = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    return persistDraft(answersByQuestion, currentIndex);
  }, [persistDraft, answersByQuestion, currentIndex]);

  return {
    draftState,
    lastSavedAt,
    restoreDraft,
    clearDraft,
    flushDraft,
  };
}

export function resolvePersistedExamSessionId(examId?: string): string {
  const fallback = () =>
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `session-${Date.now()}`;

  if (typeof window === 'undefined') return fallback();

  const key = `prepmx-exam-session:${examId ?? 'default'}`;
  const stored = sessionStorage.getItem(key);
  const uuidRe =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (stored && uuidRe.test(stored)) return stored;

  const id = fallback();
  sessionStorage.setItem(key, id);
  return id;
}

export function clearPersistedExamSessionId(examId?: string): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(`prepmx-exam-session:${examId ?? 'default'}`);
}
