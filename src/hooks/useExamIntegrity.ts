'use client';

import { useCallback, useEffect, useState } from 'react';

const INTEGRITY_STORAGE_PREFIX = 'prepmx-exam-integrity-';

export interface ExamIntegrityState {
  /** 0–100 */
  score: number;
  blurCount: number;
}

function sessionKey(sessionId: string) {
  return `${INTEGRITY_STORAGE_PREFIX}${sessionId}`;
}

function readIntegrity(sessionId: string): ExamIntegrityState {
  if (typeof window === 'undefined') return { score: 100, blurCount: 0 };
  try {
    const raw = sessionStorage.getItem(sessionKey(sessionId));
    if (!raw) return { score: 100, blurCount: 0 };
    return JSON.parse(raw) as ExamIntegrityState;
  } catch {
    return { score: 100, blurCount: 0 };
  }
}

function writeIntegrity(sessionId: string, state: ExamIntegrityState) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(sessionKey(sessionId), JSON.stringify(state));
  } catch {
    /* best-effort */
  }
}

/**
 * Detecta pérdida de foco (`visibilitychange`) durante un examen y reduce
 * la métrica de integridad (5 pts por evento, mínimo 40).
 */
export function useExamIntegrity(sessionId: string, active: boolean) {
  const [integrity, setIntegrity] = useState<ExamIntegrityState>(() =>
    readIntegrity(sessionId)
  );

  const recordBlur = useCallback(() => {
    setIntegrity((prev) => {
      const next: ExamIntegrityState = {
        blurCount: prev.blurCount + 1,
        score: Math.max(40, prev.score - 5),
      };
      writeIntegrity(sessionId, next);
      return next;
    });
  }, [sessionId]);

  useEffect(() => {
    if (!active || typeof document === 'undefined') return;

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        recordBlur();
      }
    };

    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [active, recordBlur]);

  return integrity;
}
