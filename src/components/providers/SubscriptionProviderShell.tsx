'use client';

import { SubscriptionProvider } from '@/contexts/SubscriptionContext';
import type { SubscriptionScope } from '@/types/subscription';
import { parseSubscriptions } from '@/lib/subscriptions';
import { SUBSCRIPTION_COOKIE_KEY } from '@/types/subscription';

function readInitialFromCookie(): SubscriptionScope[] | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${SUBSCRIPTION_COOKIE_KEY}=`));
  if (!match) return undefined;
  try {
    const raw = decodeURIComponent(match.split('=')[1] ?? '');
    return parseSubscriptions(raw);
  } catch {
    return undefined;
  }
}

export function SubscriptionProviderShell({ children }: { children: React.ReactNode }) {
  const initial = readInitialFromCookie();
  return <SubscriptionProvider initialSubscriptions={initial}>{children}</SubscriptionProvider>;
}
