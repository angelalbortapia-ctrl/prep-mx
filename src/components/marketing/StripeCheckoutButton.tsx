'use client';

import { useCallback, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { buildJourneyHref } from '@/lib/journey-links';
import type { PremiumScope } from '@/lib/stripe/config';
import { ProductEvents } from '@/lib/analytics/events';
import { captureProductEvent } from '@/lib/analytics/capture';
import { trackBeginCheckout } from '@/lib/analytics/conversion';
import type { MonetizationPlanId } from '@/data/pricing';
import type { UniversidadFilter } from '@/lib/university-theme';
import { cn } from '@/lib/utils';

interface StripeCheckoutButtonProps {
  planId: MonetizationPlanId;
  universidad: UniversidadFilter;
  label: string;
  className?: string;
  variant?: 'default' | 'outline' | 'conversion';
}

function resolvePremiumScope(
  planId: MonetizationPlanId,
  universidad: UniversidadFilter
): PremiumScope | null {
  if (planId === 'express') return null;
  if (planId === 'todos') return 'todos';
  if (universidad === 'unam' || universidad === 'ipn' || universidad === 'uam') {
    return universidad;
  }
  return 'unam';
}

export function StripeCheckoutButton({
  planId,
  universidad,
  label,
  className,
  variant = 'conversion',
}: StripeCheckoutButtonProps) {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const premiumScope = resolvePremiumScope(planId, universidad);
  const checkoutPlanId = planId === 'todos' ? 'todos' : 'pro';

  const startCheckout = useCallback(async () => {
    if (!premiumScope) return;

    if (!isLoaded) return;
    if (!isSignedIn) {
      const uni = planId === 'todos' ? 'todas' : universidad === 'todas' ? 'unam' : universidad;
      const planScope = planId === 'todos' ? 'todo' : 'universidad';
      router.push(buildJourneyHref('/sign-up', { uni, plan: planScope }));
      return;
    }

    setLoading(true);
    setError(null);
    captureProductEvent(ProductEvents.CHECKOUT_STARTED, {
      plan_id: checkoutPlanId,
      premium_scope: premiumScope,
    });
    trackBeginCheckout(checkoutPlanId, premiumScope);

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          planId: checkoutPlanId,
          premiumScope,
        }),
      });

      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? 'No se pudo abrir el checkout');
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError('Error de red al iniciar el pago');
      setLoading(false);
    }
  }, [checkoutPlanId, isLoaded, isSignedIn, planId, premiumScope, router, universidad]);

  if (planId === 'express') {
    return null;
  }

  const buttonVariant = variant === 'outline' ? 'outline' : 'conversion';

  return (
    <div className="w-full space-y-1">
      <Button
        type="button"
        className={cn('h-12 min-h-12 w-full', className)}
        variant={buttonVariant}
        size="cta"
        disabled={loading}
        onClick={() => void startCheckout()}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
            Redirigiendo a Stripe…
          </>
        ) : (
          label
        )}
      </Button>
      {error ? <p className="text-center text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
