import { processStripeWebhook } from '@/lib/stripe/webhook-handler';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** @deprecated Usa /api/webhooks/stripe — se mantiene por compatibilidad. */
export async function POST(request: Request) {
  return processStripeWebhook(request);
}
