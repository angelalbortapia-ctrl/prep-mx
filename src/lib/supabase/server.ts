import { createClient } from '@supabase/supabase-js';
import { serverSupabaseOptions } from './server-options';

export function createServerSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error('Supabase no configurado. Agrega variables en .env.local');
  }
  return createClient(url, key, serverSupabaseOptions());
}
