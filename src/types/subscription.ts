import type { UniId } from '@/lib/uni-theme-config';

/** Universidades individuales contratables. */
export type SubscriptionUni = Exclude<UniId, 'todos'>;

/** Plan activo: una uni, varias, o acceso total. */
export type SubscriptionScope = SubscriptionUni | 'todos';

export interface UserSubscriptionState {
  /** Suscripciones activas del alumno. Ej: `['unam']`, `['unam','ipn']`, `['todos']`. */
  subscriptions: SubscriptionScope[];
}

export const SUBSCRIPTION_COOKIE_KEY = 'prepmx-subscriptions';
export const SUBSCRIPTION_STORAGE_KEY = 'prepmx-subscriptions';
export const UNI_THEME_COOKIE_KEY = 'prepmx-uni-theme';
export const FREE_DIAGNOSTIC_STORAGE_PREFIX = 'prepmx-free-diag-done-';
export const FREE_DIAGNOSTIC_QUESTION_LIMIT = 10;

/** Suscripción demo por defecto: solo UNAM (IPN/UAM bloqueadas para demostrar paywall). */
export const DEFAULT_DEMO_SUBSCRIPTIONS: SubscriptionScope[] = ['unam'];
