import type { TrackedAnswer } from '@/hooks/useExamSubmit';
import type { MateriaBreakdownItem } from '@/components/simulador/resultado-feedback';
import { waitForExamSubmitComplete } from '@/lib/exam-submit-status';

export const PENDING_DIAGNOSTIC_KEY = 'prepmx-pending-diagnostic-v1';
const DIAG_RESULT_PREFIX = 'prepmx-diag-result-';

export interface PendingDiagnosticPayload {
  uniId: string;
  answers: TrackedAnswer[];
  score: number;
  total: number;
  percentage: number;
  materiaBreakdown?: MateriaBreakdownItem[];
  completedAt: string;
}

export interface StoredDiagnosticResult {
  score: number;
  total: number;
  percentage: number;
  materiaBreakdown?: MateriaBreakdownItem[];
  weakestMateria?: string | null;
  source: 'freemium' | 'supabase';
}

export function savePendingDiagnostic(payload: PendingDiagnosticPayload): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PENDING_DIAGNOSTIC_KEY, JSON.stringify(payload));
  } catch {
    /* best-effort */
  }
}

export function readPendingDiagnostic(): PendingDiagnosticPayload | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(PENDING_DIAGNOSTIC_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PendingDiagnosticPayload;
  } catch {
    return null;
  }
}

export function clearPendingDiagnostic(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(PENDING_DIAGNOSTIC_KEY);
  } catch {
    /* best-effort */
  }
}

export function saveDiagnosticResult(feedbackId: string, result: StoredDiagnosticResult): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${DIAG_RESULT_PREFIX}${feedbackId}`, JSON.stringify(result));
  } catch {
    /* best-effort */
  }
}

export function readDiagnosticResult(feedbackId: string): StoredDiagnosticResult | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(`${DIAG_RESULT_PREFIX}${feedbackId}`);
    if (!raw) return null;
    return JSON.parse(raw) as StoredDiagnosticResult;
  } catch {
    return null;
  }
}

function weakestFromBreakdown(
  breakdown?: MateriaBreakdownItem[]
): string | null {
  if (!breakdown?.length) return null;
  let worst: MateriaBreakdownItem | null = null;
  let worstRate = 1;
  for (const item of breakdown) {
    const rate = item.correct / item.total;
    if (rate < worstRate) {
      worstRate = rate;
      worst = item;
    }
  }
  return worst?.materia ?? null;
}

/**
 * Tras registro/onboarding: impacta Supabase (XP + filas UUID si hay)
 * y guarda resumen local para /dashboard/diagnostico/[id].
 */
export async function flushPendingDiagnostic(): Promise<{
  feedbackId?: string;
  saved: boolean;
}> {
  const pending = readPendingDiagnostic();
  if (!pending?.answers?.length) {
    return { saved: false };
  }

  const localSessionId = crypto.randomUUID();

  try {
    const res = await fetch('/api/exams/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        examId: `freemium-${pending.uniId}`,
        examSessionId: localSessionId,
        answers: pending.answers,
        mode: 'exam',
      }),
    });

    const data = (await res.json()) as {
      feedbackId?: string;
      savedCount?: number;
      processing?: boolean;
      error?: string;
    };

    const feedbackId = data.feedbackId ?? localSessionId;

    if (res.ok && data.processing) {
      await waitForExamSubmitComplete(feedbackId, { maxAttempts: 10, intervalMs: 2000 });
    }

    const refreshed = await fetch(`/api/exams/submit/status?examSessionId=${encodeURIComponent(feedbackId)}`, {
      credentials: 'include',
    }).then((r) => (r.ok ? r.json() : null)) as {
      status?: string;
      summary?: { score: number; total: number; percentage: number; weakestMateria: string | null };
    } | null;

    const fromDb = refreshed?.status === 'completed';

    saveDiagnosticResult(feedbackId, {
      score: refreshed?.summary?.score ?? pending.score,
      total: refreshed?.summary?.total ?? pending.total,
      percentage: refreshed?.summary?.percentage ?? pending.percentage,
      materiaBreakdown: pending.materiaBreakdown,
      weakestMateria: refreshed?.summary?.weakestMateria ?? weakestFromBreakdown(pending.materiaBreakdown),
      source: fromDb || (res.ok && (data.savedCount ?? 0) > 0) ? 'supabase' : 'freemium',
    });

    clearPendingDiagnostic();
    return { feedbackId, saved: true };
  } catch {
    saveDiagnosticResult(localSessionId, {
      score: pending.score,
      total: pending.total,
      percentage: pending.percentage,
      materiaBreakdown: pending.materiaBreakdown,
      weakestMateria: weakestFromBreakdown(pending.materiaBreakdown),
      source: 'freemium',
    });
    clearPendingDiagnostic();
    return { feedbackId: localSessionId, saved: true };
  }
}
