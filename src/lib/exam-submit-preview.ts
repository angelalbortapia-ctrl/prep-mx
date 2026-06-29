import type { ExamAnswerInput } from '@/lib/supabase/exam-submit';

export function computeExamPreview(answers: ExamAnswerInput[]) {
  const score = answers.filter((a) => a.isCorrect).length;
  const total = answers.length;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  return { score, total, percentage };
}

/** Sin Inngest configurado, el submit corre en la misma petición (dev local). */
export function isExamSubmitAsyncEnabled(): boolean {
  return Boolean(process.env.INNGEST_EVENT_KEY?.trim());
}
