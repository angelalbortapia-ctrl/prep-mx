'use client';

import { useEffect, useRef } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
import { ProductEvents } from '@/lib/analytics/events';
import { captureProductEvent } from '@/lib/analytics/capture';
import { trackPurchase } from '@/lib/analytics/conversion';
import type { CheckoutPlanId } from '@/lib/analytics/conversion-items';
import type { PremiumScope } from '@/lib/stripe/config';

const STORAGE_PREFIX = 'prepmx_purchase_tracked_';

function parsePlanId(raw: string | null): CheckoutPlanId | null {
  return raw === 'pro' || raw === 'todos' ? raw : null;
}

function parsePremiumScope(raw: string | null): PremiumScope | null {
  if (raw === 'unam' || raw === 'ipn' || raw === 'uam' || raw === 'todos') return raw;
  return null;
}

/**
 * Dispara Purchase (Meta + GA4) una sola vez al volver de Stripe Checkout.
 * URL esperada: /dashboard?checkout=success&scope=unam&plan=pro&session_id=cs_...
 */
export function CheckoutSuccessTracker() {
  const searchParams = useSearchParams();
  const { userId, isLoaded } = useAuth();
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    if (searchParams.get('checkout') !== 'success') return;

    const sessionId = searchParams.get('session_id');
    const planId = parsePlanId(searchParams.get('plan'));
    const premiumScope = parsePremiumScope(searchParams.get('scope'));

    if (!sessionId || !planId || !premiumScope) return;

    const dedupeKey = `${STORAGE_PREFIX}${sessionId}`;
    try {
      if (sessionStorage.getItem(dedupeKey)) return;
      sessionStorage.setItem(dedupeKey, '1');
    } catch {
      // sessionStorage bloqueado — seguir sin dedupe
    }

    firedRef.current = true;

    trackPurchase({
      transactionId: sessionId,
      planId,
      premiumScope,
      userId: isLoaded ? userId ?? undefined : undefined,
    });

    captureProductEvent(ProductEvents.CHECKOUT_COMPLETED, {
      transaction_id: sessionId,
      plan_id: planId,
      premium_scope: premiumScope,
      clerk_id: isLoaded ? userId : undefined,
    });
  }, [isLoaded, searchParams, userId]);

  return null;
}
