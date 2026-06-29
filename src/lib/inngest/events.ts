import type { ExamAnswerInput } from '@/lib/supabase/exam-submit';

export interface ExamSubmittedEventData {
  userId: string;
  email: string;
  fullName?: string | null;
  examSessionId: string;
  examId?: string | null;
  mode: 'practice' | 'exam';
  answers: ExamAnswerInput[];
}

export const EXAM_SUBMITTED_EVENT = 'prepmx/exam.submitted' as const;
