'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { UniId } from '@/lib/uni-theme-config';
import { isDemoMode } from '@/lib/demo-mode';
import {
  canAccessHeavyExam,
  canStartFreeDiagnostic,
  defaultSubscriptionState,
  getLockedUniIds,
  hasUniAccess,
  isFreeDiagnosticDone,
  markFreeDiagnosticDone,
  parseSubscriptions,
  serializeSubscriptions,
  subscriptionLabel,
} from '@/lib/subscriptions';
import {
  SUBSCRIPTION_COOKIE_KEY,
  SUBSCRIPTION_STORAGE_KEY,
  type SubscriptionScope,
  type UserSubscriptionState,
} from '@/types/subscription';

export interface SubscriptionContextValue extends UserSubscriptionState {
  hydrated: boolean;
  label: string;
  lockedUniIds: UniId[];
  hasAccess: (uniId: UniId) => boolean;
  canHeavyExam: (uniId: UniId) => boolean;
  canFreeDiagnostic: (uniId: UniId) => boolean;
  isDiagnosticDone: (uniId: UniId) => boolean;
  markDiagnosticDone: (uniId: UniId) => void;
  /** Simula upgrade (demo) — en producción iría vía Stripe webhook → Clerk metadata. */
  addSubscription: (scope: SubscriptionScope) => void;
  setSubscriptions: (subs: SubscriptionScope[]) => void;
}

const SubscriptionContext = createContext<SubscriptionContextValue | null>(null);

function syncSubscriptionCookie(subs: SubscriptionScope[]): void {
  if (typeof document === 'undefined') return;
  const value = encodeURIComponent(serializeSubscriptions(subs));
  document.cookie = `${SUBSCRIPTION_COOKIE_KEY}=${value}; path=/; max-age=31536000; SameSite=Lax`;
}

function readStoredSubscriptions(): SubscriptionScope[] {
  if (typeof window === 'undefined') return defaultSubscriptionState().subscriptions;
  try {
    const raw = localStorage.getItem(SUBSCRIPTION_STORAGE_KEY);
    return parseSubscriptions(raw);
  } catch {
    return defaultSubscriptionState().subscriptions;
  }
}

function writeStoredSubscriptions(subs: SubscriptionScope[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SUBSCRIPTION_STORAGE_KEY, serializeSubscriptions(subs));
  } catch {
    /* best-effort */
  }
  syncSubscriptionCookie(subs);
}

interface SubscriptionProviderProps {
  children: ReactNode;
  /** Valor inicial desde cookie SSR (opcional). */
  initialSubscriptions?: SubscriptionScope[];
}

export function SubscriptionProvider({
  children,
  initialSubscriptions,
}: SubscriptionProviderProps) {
  const [subscriptions, setSubscriptionsState] = useState<SubscriptionScope[]>(
    () => initialSubscriptions ?? defaultSubscriptionState().subscriptions
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (isDemoMode()) {
      const allAccess: SubscriptionScope[] = ['todos'];
      setSubscriptionsState(allAccess);
      writeStoredSubscriptions(allAccess);
      setHydrated(true);
      return;
    }
    const stored = readStoredSubscriptions();
    setSubscriptionsState(stored);
    syncSubscriptionCookie(stored);
    setHydrated(true);
  }, []);

  const setSubscriptions = useCallback((subs: SubscriptionScope[]) => {
    setSubscriptionsState(subs);
    writeStoredSubscriptions(subs);
  }, []);

  const addSubscription = useCallback(
    (scope: SubscriptionScope) => {
      setSubscriptionsState((prev) => {
        const next =
          scope === 'todos'
            ? (['todos'] as SubscriptionScope[])
            : prev.includes('todos')
              ? prev
              : Array.from(new Set([...prev, scope]));
        writeStoredSubscriptions(next);
        return next;
      });
    },
    []
  );

  const demo = isDemoMode();

  const value = useMemo<SubscriptionContextValue>(
    () => ({
      subscriptions: demo ? (['todos'] as SubscriptionScope[]) : subscriptions,
      hydrated,
      label: demo ? 'Exploración — todo desbloqueado' : subscriptionLabel(subscriptions),
      lockedUniIds: demo ? [] : getLockedUniIds(subscriptions),
      hasAccess: (uniId) => demo || hasUniAccess(subscriptions, uniId),
      canHeavyExam: (uniId) => demo || canAccessHeavyExam(subscriptions, uniId),
      canFreeDiagnostic: (uniId) => demo || canStartFreeDiagnostic(subscriptions, uniId),
      isDiagnosticDone: (uniId) => isFreeDiagnosticDone(uniId),
      markDiagnosticDone: (uniId) => {
        markFreeDiagnosticDone(uniId);
      },
      addSubscription,
      setSubscriptions,
    }),
    [subscriptions, hydrated, addSubscription, setSubscriptions, demo]
  );

  return (
    <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>
  );
}

export function useSubscription(): SubscriptionContextValue {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) {
    throw new Error('useSubscription debe usarse dentro de SubscriptionProvider');
  }
  return ctx;
}

export function useSubscriptionOptional(): SubscriptionContextValue | null {
  return useContext(SubscriptionContext);
}
