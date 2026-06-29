import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import { serverSupabaseOptions } from './server-options';

export { createStaticSupabaseClient, resetStaticSupabaseClient } from './static';

/**
 * Cliente Supabase en rutas servidor (API, Server Components, webhooks).
 *
 * Usa `@supabase/supabase-js` con service role / anon — **no** `@supabase/ssr` ni
 * `cookies()`, así Clerk no fuerza dynamic rendering en catálogos estáticos.
 *
 * Para lecturas de catálogo cacheables (temario, materias, pool de questions),
 * preferir `createStaticSupabaseClient()` + `unstable_cache` en `lib/cache/static-catalog.ts`.
 */
export function createServerSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error('Supabase no configurado. Agrega variables en .env.local');
  }
  return createClient<Database>(url, key, serverSupabaseOptions());
}
