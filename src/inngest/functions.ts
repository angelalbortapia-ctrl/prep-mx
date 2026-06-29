import { createServerSupabaseClient } from '@/lib/supabase/server';
import {
  earlyBirdEmailHtml,
  examCompletedEmailHtml,
  sendTransactionalEmail,
  sm2MorningDigestEmailHtml,
  sm2MorningDigestSubject,
} from '@/lib/email/resend';
import { buildExamRecommendations, formatRecommendationsText } from '@/lib/exam-diagnostic';
import { EXAM_SUBMITTED_EVENT } from '@/lib/inngest/events';
import { fetchSm2MorningRecipients } from '@/lib/study/sm2-summary';
import { submitExamAnswers } from '@/lib/supabase/exam-submit';
import type { DbUserRow } from '@/types/database';
import { inngest } from './client';

async function isUserStillFree(clerkId: string): Promise<boolean> {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase
    .from('users')
    .select('subscription_status, is_premium')
    .eq('clerk_id', clerkId)
    .maybeSingle();

  if (!data) return true;
  if (data.is_premium) return false;
  return data.subscription_status !== 'active';
}

async function getSupabaseUserById(userId: string): Promise<DbUserRow | null> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from('users').select('*').eq('id', userId).maybeSingle();
  if (error || !data) return null;
  return data as DbUserRow;
}

/** SM-2, diagnóstico y correo tras POST /api/exams/submit (modo examen). */
export const processExamSubmitted = inngest.createFunction(
  {
    id: 'process-exam-submitted',
    retries: 3,
    triggers: [{ event: EXAM_SUBMITTED_EVENT }],
  },
  async ({ event, step }) => {
    const data = event.data as {
      userId: string;
      email: string;
      fullName?: string | null;
      examSessionId: string;
      examId?: string | null;
      mode: 'practice' | 'exam';
      answers: Parameters<typeof submitExamAnswers>[1];
    };

    const result = await step.run('persist-sm2-xp-streak', async () => {
      const user = await getSupabaseUserById(data.userId);
      if (!user) throw new Error('Usuario no encontrado');
      return submitExamAnswers(user, data.answers, data.examSessionId, { mode: data.mode });
    });

    const recommendations = await step.run('build-diagnostic', () =>
      buildExamRecommendations(result.materiaBreakdown)
    );

    const emailSent = await step.run('send-completion-email', () => {
      if (data.mode !== 'exam') return false;
      return sendTransactionalEmail({
        to: data.email,
        subject: `Simulacro guardado — ${result.percentage}% · PrepMX`,
        html: examCompletedEmailHtml(
          data.fullName ?? 'Estudiante',
          result,
          formatRecommendationsText(recommendations)
        ),
      });
    });

    return {
      examSessionId: data.examSessionId,
      savedCount: result.savedCount,
      percentage: result.percentage,
      recommendations: recommendations.length,
      emailSent,
    };
  }
);

/** 24 h tras onboarding + diagnóstico sin compra → correo Early Bird. */
export const earlyBirdAbandonment = inngest.createFunction(
  {
    id: 'early-bird-abandonment',
    retries: 2,
    triggers: [{ event: 'prepmx/user.onboarded' }],
  },
  async ({ event, step }) => {
    const { clerkId, email, fullName, hadDiagnostic } = event.data as {
      clerkId: string;
      email: string;
      fullName?: string;
      hadDiagnostic?: boolean;
    };
    if (!hadDiagnostic) return { skipped: 'sin diagnostico' };

    await step.sleep('wait-24-hours', '24h');

    const stillFree = await step.run('check-still-free', () => isUserStillFree(clerkId));
    if (!stillFree) return { skipped: 'ya es premium' };

    const sent = await step.run('send-early-bird-email', () =>
      sendTransactionalEmail({
        to: email,
        subject: 'Tu diagnóstico PrepMX + 15% Early Bird',
        html: earlyBirdEmailHtml(fullName ?? 'Estudiante'),
      })
    );

    return { sent };
  }
);

/** Cada mañana 8:00 CDMX (14:00 UTC) — correo SM-2 personalizado por materia/tema. */
export const sm2DailyReminders = inngest.createFunction(
  {
    id: 'sm2-daily-reminders',
    retries: 1,
    triggers: [{ cron: '0 14 * * *' }],
  },
  async ({ step }) => {
    const recipients = await step.run('fetch-sm2-digest-recipients', async () => {
      const supabase = createServerSupabaseClient();
      return fetchSm2MorningRecipients(supabase);
    });

    let sent = 0;
    for (const recipient of recipients) {
      const { summary } = recipient;
      const emailInput = {
        name: recipient.fullName ?? 'Estudiante',
        dueToday: summary.dueToday,
        headlineMateria: summary.headlineMateria,
        headlineTema: summary.headlineTema,
        headlineDueCount: summary.headlineDueCount,
        recentMissTema: summary.recentMissTema,
        daysUntilExam: recipient.daysUntilExam,
        topicsByMateria: summary.topicsByMateria,
      };

      const ok = await step.run(`email-${recipient.userId}`, () =>
        sendTransactionalEmail({
          to: recipient.email,
          subject: sm2MorningDigestSubject(emailInput),
          html: sm2MorningDigestEmailHtml(emailInput),
        })
      );
      if (ok) sent += 1;
    }

    return { candidates: recipients.length, sent };
  }
);

export const inngestFunctions = [processExamSubmitted, earlyBirdAbandonment, sm2DailyReminders];
