import * as Sentry from '@sentry/nextjs';
import { isObservabilityEnabled } from '@/lib/observability/sentry-options';

export interface ApiErrorContext {
  route: string;
  method?: string;
  status?: number;
  userId?: string;
  examSessionId?: string;
  extra?: Record<string, unknown>;
}

/** Reporta errores 5xx de API routes a Sentry (alertas en dashboard). */
export function captureApiRouteError(error: unknown, context: ApiErrorContext): void {
  if (!isObservabilityEnabled()) return;

  Sentry.withScope((scope) => {
    scope.setTag('prepmx.area', 'api');
    scope.setTag('api.route', context.route);
    if (context.method) scope.setTag('http.method', context.method);
    if (context.status) scope.setTag('http.status', String(context.status));
    if (context.userId) scope.setUser({ id: context.userId });
    if (context.examSessionId) scope.setTag('exam.session_id', context.examSessionId);
    if (context.extra) scope.setContext('request', context.extra);

    if (error instanceof Error) {
      Sentry.captureException(error);
      return;
    }
    Sentry.captureMessage(String(error), 'error');
  });
}

/** Mensaje estructurado (webhooks, jobs) sin lanzar excepción. */
export function captureOperationalError(
  message: string,
  context: Record<string, unknown> & { route?: string }
): void {
  if (!isObservabilityEnabled()) return;

  Sentry.withScope((scope) => {
    scope.setTag('prepmx.area', 'ops');
    if (context.route) scope.setTag('api.route', context.route);
    scope.setContext('details', context);
    Sentry.captureMessage(message, 'error');
  });
}
