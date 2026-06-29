import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { notifyUserOnboarded } from '@/lib/inngest/notify';
import { LEGAL_CONSENT_VERSION } from '@/lib/legal-consent';
import { syncClerkUserToSupabase } from '@/lib/supabase/users';
import { isSupabaseConfigured } from '@/lib/supabase/client';

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const body = (await req.json()) as {
    fullName?: string;
    universidad?: string;
    area?: string;
    examDate?: string;
    examTarget?: string;
    hadDiagnostic?: boolean;
    legalConsentAccepted?: boolean;
  };

  if (body.legalConsentAccepted !== true) {
    return NextResponse.json(
      { error: 'Debes aceptar los Términos y el Aviso de Privacidad' },
      { status: 400 }
    );
  }

  const client = await clerkClient();
  const clerkUser = await client.users.getUser(userId);

  const { legalConsentAccepted: _consent, ...profileFields } = body;

  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      ...profileFields,
      onboardingComplete: true,
      legalConsentAt: new Date().toISOString(),
      legalConsentVersion: LEGAL_CONSENT_VERSION,
    },
  });

  if (isSupabaseConfigured) {
    await syncClerkUserToSupabase(userId);
  }

  const email = clerkUser.emailAddresses[0]?.emailAddress;
  if (email) {
    await notifyUserOnboarded({
      clerkId: userId,
      email,
      fullName: body.fullName ?? clerkUser.fullName ?? undefined,
      hadDiagnostic: body.hadDiagnostic === true,
    });
  }

  return NextResponse.json({ ok: true });
}
