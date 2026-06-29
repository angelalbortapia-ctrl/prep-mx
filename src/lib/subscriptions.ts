import type { UniId } from '@/lib/uni-theme-config';
import { filterToUniId } from '@/lib/uni-theme-config';
import type { UniversidadFilter } from '@/lib/university-theme';
import {
  DEFAULT_DEMO_SUBSCRIPTIONS,
  FREE_DIAGNOSTIC_STORAGE_PREFIX,
  type SubscriptionScope,
  type SubscriptionUni,
  type UserSubscriptionState,
} from '@/types/subscription';

export function isSubscriptionScope(value: string): value is SubscriptionScope {
  return value === 'unam' || value === 'ipn' || value === 'uam' || value === 'todos';
}

export function parseSubscriptions(raw: string | null | undefined): SubscriptionScope[] {
  if (!raw) return [...DEFAULT_DEMO_SUBSCRIPTIONS];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed) && parsed.every((v) => typeof v === 'string' && isSubscriptionScope(v))) {
      return parsed.length ? parsed : [...DEFAULT_DEMO_SUBSCRIPTIONS];
    }
  } catch {
    /* fallback abajo */
  }
  const parts = raw.split(',').map((s) => s.trim()).filter(isSubscriptionScope);
  return parts.length ? parts : [...DEFAULT_DEMO_SUBSCRIPTIONS];
}

export function serializeSubscriptions(subs: SubscriptionScope[]): string {
  return JSON.stringify(subs);
}

/** ¿Tiene acceso de pago al módulo de esta universidad? */
export function hasUniAccess(subscriptions: SubscriptionScope[], uniId: UniId): boolean {
  if (subscriptions.includes('todos')) return true;
  if (uniId === 'todos') return subscriptions.includes('todos');
  return subscriptions.includes(uniId as SubscriptionUni);
}

export function hasFilterAccess(
  subscriptions: SubscriptionScope[],
  filter: UniversidadFilter
): boolean {
  return hasUniAccess(subscriptions, filterToUniId(filter));
}

export function getLockedUniIds(subscriptions: SubscriptionScope[]): UniId[] {
  if (subscriptions.includes('todos')) return [];
  const all: SubscriptionUni[] = ['unam', 'ipn', 'uam'];
  return all.filter((id) => !subscriptions.includes(id));
}

export function subscriptionLabel(subscriptions: SubscriptionScope[]): string {
  if (subscriptions.includes('todos')) return 'Plan todo en uno';
  if (subscriptions.length === 0) return 'Sin plan activo';
  return subscriptions.map((s) => s.toUpperCase()).join(' + ');
}

export function defaultSubscriptionState(): UserSubscriptionState {
  return { subscriptions: [...DEFAULT_DEMO_SUBSCRIPTIONS] };
}

/** Marca el diagnóstico gratuito de 10 preguntas como completado para una uni. */
export function markFreeDiagnosticDone(uniId: UniId): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${FREE_DIAGNOSTIC_STORAGE_PREFIX}${uniId}`, new Date().toISOString());
  } catch {
    /* best-effort */
  }
}

export function isFreeDiagnosticDone(uniId: UniId): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return Boolean(localStorage.getItem(`${FREE_DIAGNOSTIC_STORAGE_PREFIX}${uniId}`));
  } catch {
    return false;
  }
}

/** Simulacros pesados bloqueados si no hay suscripción y ya usó el diagnóstico gratis. */
export function canAccessHeavyExam(
  subscriptions: SubscriptionScope[],
  uniId: UniId
): boolean {
  if (hasUniAccess(subscriptions, uniId)) return true;
  return false;
}

export function canStartFreeDiagnostic(
  subscriptions: SubscriptionScope[],
  uniId: UniId
): boolean {
  return !hasUniAccess(subscriptions, uniId) && !isFreeDiagnosticDone(uniId);
}

/** Explicaciones KaTeX en modo ráfaga — requiere Pase Pro de la uni activa. */
export function canViewBurstExplanations(
  subscriptions: SubscriptionScope[],
  uniId: UniId
): boolean {
  return hasUniAccess(subscriptions, uniId);
}
