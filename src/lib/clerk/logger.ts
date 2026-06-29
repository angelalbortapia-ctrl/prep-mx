type WebhookLogLevel = 'info' | 'warn' | 'error';

export interface ClerkWebhookLogPayload {
  event: string;
  clerkEventId?: string;
  clerkEventType?: string;
  clerkId?: string;
  email?: string;
  svixId?: string;
  rowsUpdated?: number;
  error?: string;
  detail?: unknown;
}

/** Logs JSON para auditar sincronización Clerk → Supabase. */
export function logClerkWebhook(level: WebhookLogLevel, payload: ClerkWebhookLogPayload): void {
  const line = JSON.stringify({
    ts: new Date().toISOString(),
    scope: 'clerk/webhook',
    level,
    ...payload,
  });

  if (level === 'error') {
    console.error(line);
    return;
  }
  if (level === 'warn') {
    console.warn(line);
    return;
  }
  console.info(line);
}
