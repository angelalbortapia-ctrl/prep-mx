/** DSN de Sentry — vacío en local = SDK desactivado. */
export function getSentryDsn(): string | undefined {
  const dsn =
    process.env.NEXT_PUBLIC_SENTRY_DSN?.trim() || process.env.SENTRY_DSN?.trim();
  return dsn || undefined;
}

export function isObservabilityEnabled(): boolean {
  return Boolean(getSentryDsn());
}

export function buildSentryInitOptions() {
  const dsn = getSentryDsn();
  const environment =
    process.env.SENTRY_ENVIRONMENT?.trim() ||
    process.env.VERCEL_ENV ||
    process.env.NODE_ENV ||
    'development';

  return {
    dsn,
    enabled: Boolean(dsn),
    environment,
    tracesSampleRate: environment === 'production' ? 0.1 : 1,
    sampleRate: 1,
    sendDefaultPii: false,
    debug: process.env.SENTRY_DEBUG === 'true',
  };
}
