import { getMonetizationPlan } from '@/data/pricing';
import type { PremiumScope } from '@/lib/stripe/config';

export type CheckoutPlanId = 'pro' | 'todos';

export interface CheckoutConversionPayload {
  planId: CheckoutPlanId;
  premiumScope: PremiumScope;
  value: number;
  currency: 'MXN';
  itemId: string;
  itemName: string;
}

export function buildCheckoutConversionPayload(
  planId: CheckoutPlanId,
  premiumScope: PremiumScope
): CheckoutConversionPayload {
  const monetizationId = planId === 'todos' ? 'todos' : 'pro';
  const plan = getMonetizationPlan(monetizationId);
  const scopeLabel =
    premiumScope === 'todos'
      ? 'UNAM+IPN+UAM'
      : premiumScope.toUpperCase();

  return {
    planId,
    premiumScope,
    value: plan.price,
    currency: 'MXN',
    itemId: `prepmx_${planId}_${premiumScope}`,
    itemName: `${plan.name} · ${scopeLabel}`,
  };
}
