export interface ExamSubmitStatusResponse {
  status: 'processing' | 'completed';
  summary?: {
    examSessionId: string;
    score: number;
    total: number;
    percentage: number;
    materiaBreakdown: Array<{ materia: string; correct: number; total: number }>;
    weakestMateria: string | null;
  };
}

export async function fetchExamSubmitStatus(
  examSessionId: string
): Promise<ExamSubmitStatusResponse> {
  const qs = new URLSearchParams({ examSessionId });
  const res = await fetch(`/api/exams/submit/status?${qs}`, { credentials: 'include' });
  if (!res.ok) return { status: 'processing' };
  return (await res.json()) as ExamSubmitStatusResponse;
}

/** Espera a que Inngest termine de persistir el simulacro (máx. ~30s). */
export async function waitForExamSubmitComplete(
  examSessionId: string,
  options?: { maxAttempts?: number; intervalMs?: number }
): Promise<ExamSubmitStatusResponse> {
  const maxAttempts = options?.maxAttempts ?? 15;
  const intervalMs = options?.intervalMs ?? 2000;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const status = await fetchExamSubmitStatus(examSessionId);
    if (status.status === 'completed') return status;
    await new Promise((r) => setTimeout(r, intervalMs));
  }

  return { status: 'processing' };
}
