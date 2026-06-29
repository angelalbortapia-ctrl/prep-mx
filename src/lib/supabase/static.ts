import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import { serverSupabaseOptions } from './server-options';

let staticClient: SupabaseClient<Database> | null = null;

/**
 * Cliente Supabase para lecturas de catálogo (questions, temarios en BD futura).
 * - Sin `cookies()` ni `@supabase/ssr` → no acopla Clerk ni fuerza dynamic rendering.
 * - Sin persistencia de sesión en el servidor.
 * Combinar con `unstable_cache` en `lib/cache/static-catalog.ts`.
 */
export function createStaticSupabaseClient(): SupabaseClient<Database> {
  if (staticClient) return staticClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error('Supabase no configurado. Agrega variables en .env.local');
  }

  staticClient = createClient<Database>(url, key, {
    ...serverSupabaseOptions(),
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return staticClient;
}

/** Reinicia el singleton (tests / scripts). */
export function resetStaticSupabaseClient(): void {
  staticClient = null;
}
