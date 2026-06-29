/** Mapeo plan PrepMX → metadata de checkout (premium_scope en users). */
export type PremiumScope = 'unam' | 'ipn' | 'uam' | 'todos';

export const STRIPE_PRICE_ENV_KEYS = {
  pro_unam: 'STRIPE_PRICE_PRO_UNAM',
  pro_ipn: 'STRIPE_PRICE_PRO_IPN',
  pro_uam: 'STRIPE_PRICE_PRO_UAM',
  todos: 'STRIPE_PRICE_TODOS',
} as const;

export function getAppBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, '');
  return 'http://localhost:3000';
}

export function getStripePublishableKey(): string | null {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim();
  return key || null;
}

export function getStripeSecretKey(): string | null {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  return key || null;
}

export function getStripeWebhookSecret(): string | null {
  const key = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  return key || null;
}

export function isStripeConfigured(): boolean {
  return Boolean(getStripeSecretKey() && getStripePublishableKey());
}

/** Price ID de Stripe Dashboard según universidad / plan Todos. */
export function resolveStripePriceId(
  scope: PremiumScope,
  planId: 'pro' | 'todos'
): string | null {
  if (planId === 'todos' || scope === 'todos') {
    return process.env[STRIPE_PRICE_ENV_KEYS.todos]?.trim() || null;
  }
  if (scope === 'unam') {
    return process.env[STRIPE_PRICE_ENV_KEYS.pro_unam]?.trim() || null;
  }
  if (scope === 'ipn') {
    return process.env[STRIPE_PRICE_ENV_KEYS.pro_ipn]?.trim() || null;
  }
  if (scope === 'uam') {
    return process.env[STRIPE_PRICE_ENV_KEYS.pro_uam]?.trim() || null;
  }
  return null;
}

/** Resuelve premium_scope desde metadata de Stripe Checkout. */
export function resolvePremiumScope(metadata: Record<string, string>): PremiumScope | null {
  const raw = metadata.premium_scope ?? metadata.universidad ?? metadata.plan;
  if (raw === 'unam' || raw === 'ipn' || raw === 'uam' || raw === 'todos') return raw;
  if (raw === 'todas') return 'todos';
  return null;
}
