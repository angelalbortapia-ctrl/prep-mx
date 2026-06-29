export interface ActiveExamSessionInfo {
  examSessionId: string;
  examId: string | null;
  updatedAt: string;
}

export type ClaimExamSessionResult =
  | { ok: true }
  | { conflict: ActiveExamSessionInfo };

/** Reclama sesión de simulacro cronometrado (una por usuario). */
export async function claimExamSession(
  examSessionId: string,
  examId?: string
): Promise<ClaimExamSessionResult> {
  const res = await fetch('/api/exams/session/start', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ examSessionId, examId }),
  });

  if (res.status === 409) {
    const data = (await res.json()) as { activeSession?: ActiveExamSessionInfo };
    if (data.activeSession) {
      return { conflict: data.activeSession };
    }
  }

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error ?? 'No se pudo iniciar el simulacro');
  }

  return { ok: true };
}

export async function fetchActiveExamSession(): Promise<ActiveExamSessionInfo | null> {
  const res = await fetch('/api/exams/session/start', { credentials: 'include' });
  if (!res.ok) return null;
  const data = (await res.json()) as { activeSession?: ActiveExamSessionInfo | null };
  return data.activeSession ?? null;
}
