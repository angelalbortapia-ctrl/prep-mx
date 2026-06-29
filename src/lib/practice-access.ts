import type { UniId } from '@/lib/uni-theme-config';
import type { PremiumScope } from '@/lib/stripe/config';
import type { DbUserRow } from '@/types/database';
import { isDemoMode } from '@/lib/demo-mode';
import { hasUniAccess, parseSubscriptions } from '@/lib/subscriptions';
import type { SubscriptionScope } from '@/types/subscription';

function parsePremiumScope(raw: string | null | undefined): PremiumScope | null {
  if (raw === 'unam' || raw === 'ipn' || raw === 'uam' || raw === 'todos') return raw;
  return null;
}

/** Acceso Pro vía fila `users` (Stripe webhook). */
export function userHasDbPremium(
  user: Pick<DbUserRow, 'is_premium' | 'premium_scope' | 'subscription_status'> | null,
  activeUni: UniId
): boolean {
  if (!user?.is_premium) return false;
  const status = user.subscription_status;
  if (status && status !== 'active' && status !== 'trialing') return false;

  const scope = parsePremiumScope(user.premium_scope);
  if (!scope || scope === 'todos') return true;
  if (activeUni === 'todos') return true;
  return scope === activeUni;
}

/** ¿Puede ver explicaciones detalladas en modo ráfaga? (servidor) */
export function canViewPracticeExplanationsServer(
  user: Pick<DbUserRow, 'is_premium' | 'premium_scope' | 'subscription_status'> | null,
  activeUni: UniId,
  cookieSubscriptions?: string | null
): boolean {
  if (isDemoMode()) return true;
  if (userHasDbPremium(user, activeUni)) return true;

  const subs: SubscriptionScope[] = cookieSubscriptions
    ? parseSubscriptions(cookieSubscriptions)
    : [];
  return hasUniAccess(subs, activeUni);
}

/** ¿Puede ver explicaciones? (cliente — SubscriptionContext) */
export function canViewPracticeExplanations(
  subscriptions: SubscriptionScope[],
  activeUni: UniId
): boolean {
  return hasUniAccess(subscriptions, activeUni);
}
