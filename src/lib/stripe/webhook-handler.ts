import Stripe from 'stripe';
import {
  CHECKOUT_CLERK_METADATA_KEY,
  CHECKOUT_USER_ID_METADATA_KEY,
} from '@/lib/stripe/checkout';
import {
  getStripeSecretKey,
  getStripeWebhookSecret,
  resolvePremiumScope,
} from '@/lib/stripe/config';
import { logStripeWebhook } from '@/lib/stripe/logger';
import { captureOperationalError } from '@/lib/observability/capture';
import {
  activateUserPremiumByClerkId,
  activateUserPremiumByEmail,
  deactivateUserPremium,
  type PremiumSyncResult,
} from '@/lib/stripe/subscription-sync';

function getStripe(): Stripe | null {
  const key = getStripeSecretKey();
  if (!key) return null;
  return new Stripe(key, { apiVersion: '2025-02-24.acacia' });
}

function resolveClerkId(
  metadata: Record<string, string>,
  clientReferenceId?: string | null
): string | undefined {
  return (
    metadata[CHECKOUT_CLERK_METADATA_KEY] ??
    metadata[CHECKOUT_USER_ID_METADATA_KEY] ??
    metadata.clerk_user_id ??
    clientReferenceId ??
    undefined
  );
}

function assertPremiumActivated(
  result: PremiumSyncResult,
  context: { sessionId: string; stripeEventId: string }
): void {
  if (result.ok) {
    logStripeWebhook('info', {
      event: 'premium_activated',
      stripeEventId: context.stripeEventId,
      sessionId: context.sessionId,
      clerkId: result.clerkId,
      email: result.email,
      rowsUpdated: result.rowsUpdated,
      detail: result.retriedSync ? { retriedSync: true } : undefined,
    });
    return;
  }

  logStripeWebhook('error', {
    event: 'premium_activation_failed',
    stripeEventId: context.stripeEventId,
    sessionId: context.sessionId,
    clerkId: result.clerkId,
    email: result.email,
    error: result.error,
    rowsUpdated: result.rowsUpdated,
  });

  throw new Error(result.error ?? 'No se pudo activar premium en Supabase');
}

async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
  stripeEventId: string
) {
  const metadata = (session.metadata ?? {}) as Record<string, string>;
  const scope = resolvePremiumScope(metadata);

  logStripeWebhook('info', {
    event: 'checkout_received',
    stripeEventId,
    sessionId: session.id,
    clerkId: resolveClerkId(metadata, session.client_reference_id),
    email: session.customer_email ?? session.customer_details?.email ?? undefined,
    premiumScope: scope ?? undefined,
    customerId:
      typeof session.customer === 'string' ? session.customer : session.customer?.id,
  });

  if (!scope) {
    logStripeWebhook('error', {
      event: 'checkout_missing_premium_scope',
      stripeEventId,
      sessionId: session.id,
      detail: metadata,
    });
    throw new Error('checkout.session.completed sin premium_scope en metadata');
  }

  const customerId =
    typeof session.customer === 'string' ? session.customer : session.customer?.id;

  const clerkId = resolveClerkId(metadata, session.client_reference_id);
  if (clerkId) {
    const result = await activateUserPremiumByClerkId(clerkId, scope, customerId);
    assertPremiumActivated(result, { sessionId: session.id, stripeEventId });
    return;
  }

  const email = session.customer_email ?? session.customer_details?.email;
  if (!email) {
    logStripeWebhook('error', {
      event: 'checkout_missing_clerk_and_email',
      stripeEventId,
      sessionId: session.id,
      premiumScope: scope,
      detail: metadata,
    });
    throw new Error('checkout.session.completed sin clerk_id ni email para conciliar');
  }

  logStripeWebhook('warn', {
    event: 'checkout_email_fallback',
    stripeEventId,
    sessionId: session.id,
    email,
    premiumScope: scope,
  });

  const result = await activateUserPremiumByEmail(email, scope, customerId);
  assertPremiumActivated(result, { sessionId: session.id, stripeEventId });
}

/** Procesa eventos firmados de Stripe (Checkout → is_premium en Supabase). */
export async function processStripeWebhook(request: Request): Promise<Response> {
  const stripe = getStripe();
  const webhookSecret = getStripeWebhookSecret();

  if (!stripe || !webhookSecret) {
    logStripeWebhook('error', { event: 'stripe_not_configured' });
    return Response.json({ error: 'Stripe no configurado' }, { status: 503 });
  }

  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    logStripeWebhook('warn', { event: 'missing_signature' });
    return Response.json({ error: 'Falta stripe-signature' }, { status: 400 });
  }

  const body = await request.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Firma inválida';
    logStripeWebhook('error', { event: 'signature_invalid', error: message });
    return Response.json({ error: message }, { status: 400 });
  }

  logStripeWebhook('info', {
    event: 'event_received',
    stripeEventId: event.id,
    stripeEventType: event.type,
  });

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(
          event.data.object as Stripe.Checkout.Session,
          event.id
        );
        break;
      case 'customer.subscription.deleted':
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription;
        const clerkId = resolveClerkId((sub.metadata ?? {}) as Record<string, string>);
        if (clerkId && (sub.status === 'canceled' || sub.status === 'unpaid')) {
          const result = await deactivateUserPremium(clerkId);
          if (!result.ok) {
            throw new Error(result.error ?? 'No se pudo cancelar premium');
          }
          logStripeWebhook('info', {
            event: 'premium_deactivated',
            stripeEventId: event.id,
            clerkId,
            rowsUpdated: result.rowsUpdated,
          });
        }
        break;
      }
      default:
        logStripeWebhook('info', {
          event: 'event_ignored',
          stripeEventId: event.id,
          stripeEventType: event.type,
        });
        break;
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Error procesando evento';
    logStripeWebhook('error', {
      event: 'handler_failed',
      stripeEventId: event.id,
      stripeEventType: event.type,
      error: message,
    });
    captureOperationalError(message, {
      route: '/api/webhooks/stripe',
      stripeEventId: event.id,
      stripeEventType: event.type,
    });
    // 500 → Stripe reintenta el webhook si hubo fallo de red o Supabase.
    return Response.json({ error: message }, { status: 500 });
  }

  logStripeWebhook('info', {
    event: 'event_processed',
    stripeEventId: event.id,
    stripeEventType: event.type,
  });

  return Response.json({ received: true });
}
