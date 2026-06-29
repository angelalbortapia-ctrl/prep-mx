import Stripe from 'stripe';
import {
  getStripeSecretKey,
  resolvePremiumScope,
  resolveStripePriceId,
  type PremiumScope,
} from '@/lib/stripe/config';

export const CHECKOUT_CLERK_METADATA_KEY = 'clerk_id';
/** Alias que pide la lección del curso (`userId` de Clerk). */
export const CHECKOUT_USER_ID_METADATA_KEY = 'userId';

export interface CreateCheckoutSessionInput {
  clerkId: string;
  email: string;
  premiumScope: PremiumScope;
  planId: 'pro' | 'todos';
  successUrl: string;
  cancelUrl: string;
  stripeCustomerId?: string | null;
}

function getStripe(): Stripe {
  const key = getStripeSecretKey();
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY no configurada');
  }
  return new Stripe(key, { apiVersion: '2025-02-24.acacia' });
}

/** Metadata que el webhook usa para activar is_premium en Supabase. */
export function buildCheckoutMetadata(input: {
  clerkId: string;
  premiumScope: PremiumScope;
  planId: 'pro' | 'todos';
}): Record<string, string> {
  return {
    [CHECKOUT_CLERK_METADATA_KEY]: input.clerkId,
    [CHECKOUT_USER_ID_METADATA_KEY]: input.clerkId,
    premium_scope: input.premiumScope,
    plan_id: input.planId,
  };
}

export async function createStripeCheckoutSession(
  input: CreateCheckoutSessionInput
): Promise<Stripe.Checkout.Session> {
  const priceId = resolveStripePriceId(input.premiumScope, input.planId);
  if (!priceId) {
    throw new Error(
      `Precio Stripe no configurado para scope=${input.premiumScope} plan=${input.planId}`
    );
  }

  const metadata = buildCheckoutMetadata({
    clerkId: input.clerkId,
    premiumScope: input.premiumScope,
    planId: input.planId,
  });

  const stripe = getStripe();

  return stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
    customer_email: input.stripeCustomerId ? undefined : input.email,
    customer: input.stripeCustomerId ?? undefined,
    client_reference_id: input.clerkId,
    metadata,
    payment_intent_data: {
      metadata,
    },
  });
}

export function parseCheckoutPlanBody(body: unknown): {
  planId: 'pro' | 'todos';
  premiumScope: PremiumScope;
} | null {
  if (!body || typeof body !== 'object') return null;
  const raw = body as Record<string, unknown>;
  const planId = raw.planId === 'pro' || raw.planId === 'todos' ? raw.planId : null;
  const scopeRaw =
    typeof raw.premiumScope === 'string'
      ? raw.premiumScope
      : typeof raw.universidad === 'string'
        ? raw.universidad
        : null;
  const premiumScope = scopeRaw ? resolvePremiumScope({ premium_scope: scopeRaw }) : null;
  if (!planId || !premiumScope) return null;
  if (planId === 'todos' && premiumScope !== 'todos') {
    return { planId, premiumScope: 'todos' };
  }
  if (planId === 'pro' && premiumScope === 'todos') {
    return null;
  }
  return { planId, premiumScope };
}
