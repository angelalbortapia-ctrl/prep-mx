type WebhookLogLevel = 'info' | 'warn' | 'error';

export interface WebhookLogPayload {
  event: string;
  stripeEventId?: string;
  stripeEventType?: string;
  sessionId?: string;
  clerkId?: string;
  email?: string;
  premiumScope?: string;
  customerId?: string;
  rowsUpdated?: number;
  error?: string;
  detail?: unknown;
}

/** Logs JSON estructurados para auditar conciliación Clerk → Stripe → Supabase. */
export function logStripeWebhook(level: WebhookLogLevel, payload: WebhookLogPayload): void {
  const line = JSON.stringify({
    ts: new Date().toISOString(),
    scope: 'stripe/webhook',
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
