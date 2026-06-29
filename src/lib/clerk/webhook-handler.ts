import { Webhook } from 'svix';
import { getClerkWebhookSigningSecret } from '@/lib/clerk/config';
import { logClerkWebhook } from '@/lib/clerk/logger';
import { captureOperationalError } from '@/lib/observability/capture';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { upsertSupabaseUserFromClerk } from '@/lib/supabase/users';

interface ClerkEmailAddress {
  id: string;
  email_address: string;
}

interface ClerkWebhookUser {
  id: string;
  email_addresses?: ClerkEmailAddress[];
  primary_email_address_id?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  public_metadata?: Record<string, unknown>;
}

interface ClerkWebhookEvent {
  type: string;
  data: ClerkWebhookUser & { id: string };
}

function resolvePrimaryEmail(user: ClerkWebhookUser): string | null {
  const emails = user.email_addresses ?? [];
  if (user.primary_email_address_id) {
    const primary = emails.find((entry) => entry.id === user.primary_email_address_id);
    if (primary?.email_address) return primary.email_address;
  }
  return emails[0]?.email_address ?? null;
}

function resolveFullName(user: ClerkWebhookUser): string | null {
  const meta = user.public_metadata ?? {};
  if (typeof meta.fullName === 'string' && meta.fullName.trim()) {
    return meta.fullName.trim();
  }
  const parts = [user.first_name, user.last_name].filter(Boolean);
  if (parts.length) return parts.join(' ');
  return null;
}

function mapWebhookUserToSyncInput(user: ClerkWebhookUser) {
  const email = resolvePrimaryEmail(user);
  if (!email) return null;

  const meta = user.public_metadata ?? {};
  return {
    clerkId: user.id,
    email,
    fullName: resolveFullName(user),
    examTarget: typeof meta.examTarget === 'string' ? meta.examTarget : null,
    examDate: typeof meta.examDate === 'string' ? meta.examDate : null,
  };
}

async function syncUserFromWebhookEvent(
  user: ClerkWebhookUser,
  context: { eventType: string; svixId?: string | null }
): Promise<Response> {
  if (!isSupabaseConfigured) {
    logClerkWebhook('warn', {
      event: 'supabase_not_configured',
      clerkEventType: context.eventType,
      clerkId: user.id,
      svixId: context.svixId ?? undefined,
    });
    return Response.json({ ok: true, skipped: 'supabase_not_configured' });
  }

  const input = mapWebhookUserToSyncInput(user);
  if (!input) {
    logClerkWebhook('error', {
      event: 'missing_email',
      clerkEventType: context.eventType,
      clerkId: user.id,
      svixId: context.svixId ?? undefined,
      error: 'Usuario sin correo en payload de Clerk',
    });
    return Response.json({ error: 'Usuario sin correo' }, { status: 422 });
  }

  const row = await upsertSupabaseUserFromClerk(input);
  if (!row) {
    const message = 'No se pudo crear/actualizar users en Supabase';
    logClerkWebhook('error', {
      event: 'supabase_upsert_failed',
      clerkEventType: context.eventType,
      clerkId: user.id,
      email: input.email,
      svixId: context.svixId ?? undefined,
      error: message,
    });
    captureOperationalError(message, {
      route: '/api/webhooks/clerk',
      clerkId: user.id,
      eventType: context.eventType,
      svixId: context.svixId,
    });
    return Response.json({ error: message }, { status: 500 });
  }

  logClerkWebhook('info', {
    event: 'user_synced',
    clerkEventType: context.eventType,
    clerkId: user.id,
    email: input.email,
    svixId: context.svixId ?? undefined,
    rowsUpdated: 1,
  });

  return Response.json({ ok: true, userId: row.id });
}

export async function processClerkWebhook(request: Request): Promise<Response> {
  const secret = getClerkWebhookSigningSecret();
  if (!secret) {
    logClerkWebhook('error', {
      event: 'missing_signing_secret',
      error: 'CLERK_WEBHOOK_SIGNING_SECRET no configurado',
    });
    return Response.json({ error: 'Webhook no configurado' }, { status: 503 });
  }

  const svixId = request.headers.get('svix-id');
  const svixTimestamp = request.headers.get('svix-timestamp');
  const svixSignature = request.headers.get('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    return Response.json({ error: 'Faltan cabeceras Svix' }, { status: 400 });
  }

  const payload = await request.text();
  let event: ClerkWebhookEvent;

  try {
    const wh = new Webhook(secret);
    event = wh.verify(payload, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as ClerkWebhookEvent;
  } catch (error) {
    logClerkWebhook('error', {
      event: 'signature_verification_failed',
      svixId,
      error: error instanceof Error ? error.message : 'Firma inválida',
    });
    return Response.json({ error: 'Firma de webhook inválida' }, { status: 400 });
  }

  logClerkWebhook('info', {
    event: 'received',
    clerkEventType: event.type,
    clerkEventId: event.data.id,
    clerkId: event.data.id,
    svixId,
  });

  switch (event.type) {
    case 'user.created':
    case 'user.updated':
      return syncUserFromWebhookEvent(event.data, { eventType: event.type, svixId });
    default:
      logClerkWebhook('info', {
        event: 'ignored',
        clerkEventType: event.type,
        svixId,
      });
      return Response.json({ ok: true, ignored: event.type });
  }
}
