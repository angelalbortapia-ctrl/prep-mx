'use client';

import {
  buildCheckoutConversionPayload,
  type CheckoutConversionPayload,
  type CheckoutPlanId,
} from '@/lib/analytics/conversion-items';
import {
  isGa4Enabled,
  isMetaPixelEnabled,
} from '@/lib/analytics/conversion-config';
import type { PremiumScope } from '@/lib/stripe/config';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export interface PurchaseConversionInput {
  transactionId: string;
  planId: CheckoutPlanId;
  premiumScope: PremiumScope;
  userId?: string;
}

function toGa4Items(payload: CheckoutConversionPayload) {
  return [
    {
      item_id: payload.itemId,
      item_name: payload.itemName,
      price: payload.value,
      quantity: 1,
    },
  ];
}

/** Meta InitiateCheckout + GA4 begin_checkout — al pulsar pagar en /precios. */
export function trackBeginCheckout(planId: CheckoutPlanId, premiumScope: PremiumScope): void {
  const payload = buildCheckoutConversionPayload(planId, premiumScope);

  if (isMetaPixelEnabled() && typeof window.fbq === 'function') {
    window.fbq('track', 'InitiateCheckout', {
      value: payload.value,
      currency: payload.currency,
      content_ids: [payload.itemId],
      content_type: 'product',
      contents: [{ id: payload.itemId, quantity: 1 }],
      num_items: 1,
    });
  }

  if (isGa4Enabled() && typeof window.gtag === 'function') {
    window.gtag('event', 'begin_checkout', {
      currency: payload.currency,
      value: payload.value,
      items: toGa4Items(payload),
    });
  }
}

/** Meta Purchase + GA4 purchase — tras volver de Stripe con éxito. */
export function trackPurchase(input: PurchaseConversionInput): void {
  const payload = buildCheckoutConversionPayload(input.planId, input.premiumScope);

  if (isMetaPixelEnabled() && typeof window.fbq === 'function') {
    window.fbq(
      'track',
      'Purchase',
      {
        value: payload.value,
        currency: payload.currency,
        content_ids: [payload.itemId],
        content_type: 'product',
        contents: [{ id: payload.itemId, quantity: 1 }],
      },
      { eventID: input.transactionId }
    );
  }

  if (isGa4Enabled() && typeof window.gtag === 'function') {
    window.gtag('event', 'purchase', {
      transaction_id: input.transactionId,
      currency: payload.currency,
      value: payload.value,
      items: toGa4Items(payload),
      ...(input.userId ? { user_id: input.userId } : {}),
    });
  }
}
