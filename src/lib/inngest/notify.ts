import { inngest } from '@/inngest/client';

interface OnboardedEventInput {
  clerkId: string;
  email: string;
  fullName?: string;
  hadDiagnostic?: boolean;
}

/** Encola secuencia Early Bird (24 h) si el usuario hizo diagnóstico gratis. */
export async function notifyUserOnboarded(input: OnboardedEventInput): Promise<void> {
  if (!process.env.INNGEST_EVENT_KEY && process.env.NODE_ENV === 'production') {
    console.warn('[inngest] INNGEST_EVENT_KEY no configurada');
  }

  try {
    await inngest.send({
      name: 'prepmx/user.onboarded',
      data: input,
    });
  } catch (e) {
    console.error('[inngest] notifyUserOnboarded', e);
  }
}
