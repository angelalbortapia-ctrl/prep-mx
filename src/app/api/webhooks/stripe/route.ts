import { processStripeWebhook } from '@/lib/stripe/webhook-handler';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Webhook oficial Stripe → activa is_premium en Supabase.
 * Configura en Stripe Dashboard: https://tu-dominio.com/api/webhooks/stripe
 */
export async function POST(request: Request) {
  return processStripeWebhook(request);
}
