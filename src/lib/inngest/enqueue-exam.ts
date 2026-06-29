import { inngest } from '@/inngest/client';
import {
  EXAM_SUBMITTED_EVENT,
  type ExamSubmittedEventData,
} from '@/lib/inngest/events';

/** Encola procesamiento SM-2 + diagnóstico + correo en background. */
export async function enqueueExamSubmitted(input: ExamSubmittedEventData): Promise<boolean> {
  if (!process.env.INNGEST_EVENT_KEY?.trim()) {
    return false;
  }

  try {
    await inngest.send({
      id: `exam-submit-${input.examSessionId}`,
      name: EXAM_SUBMITTED_EVENT,
      data: input,
    });
    return true;
  } catch (e) {
    console.error('[inngest] enqueueExamSubmitted', e);
    return false;
  }
}
