/**
 * Variables expuestas al navegador (`'use client'`).
 * En Vercel solo existen en build/runtime si llevan prefijo NEXT_PUBLIC_.
 */
export const clientEnv = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? '',
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  clerkPublishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? '',
  stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '',
  posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY ?? '',
  posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? '',
  sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN ?? '',
  bunnyCdnHostname: process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME ?? '',
  bunnyStreamLibraryId: process.env.NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID ?? '',
  maintenanceMode: process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true',
  demoMode: process.env.NEXT_PUBLIC_DEMO_MODE === 'true',
} as const;

export function assertClientEnv(): void {
  if (process.env.NODE_ENV !== 'production') return;
  if (!clientEnv.supabaseUrl || !clientEnv.supabaseAnonKey) {
    console.error(
      '[PrepMX] Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY en el build de producción.'
    );
  }
  if (!clientEnv.clerkPublishableKey) {
    console.error(
      '[PrepMX] Falta NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY en el build de producción.'
    );
  }
}
