import { BURST_FALLBACK_QUESTIONS } from '@/data/study-tools/burst-quiz';
import { getExamQuestions, getQuestionById } from '@/lib/supabase/questions';
import type { Question } from '@/types/question';

export type BurstPracticeQuestion = Omit<
  Question,
  'explicacion' | 'explicacionImagenUrl' | 'explicacionVideoUrl'
>;

export function stripExplanationForPractice(question: Question): BurstPracticeQuestion {
  const {
    explicacion: _e,
    explicacionImagenUrl: _ei,
    explicacionVideoUrl: _ev,
    ...publicFields
  } = question;
  return publicFields;
}

export async function getBurstPracticeQuestions(
  limit: number,
  universidad?: string
): Promise<BurstPracticeQuestion[]> {
  const raw = await getExamQuestions(limit, universidad, false);
  const source =
    raw.length > 0 ? raw : BURST_FALLBACK_QUESTIONS.slice(0, Math.max(limit, 5));
  return source.map(stripExplanationForPractice);
}

export { getQuestionById as getPracticeQuestionWithExplanation };
