import type { SupabaseClientOptions } from '@supabase/supabase-js';

/** Node < 22 no trae WebSocket nativo; @supabase/supabase-js lo necesita. */
export function supabaseClientOptions(): SupabaseClientOptions {
  if (typeof window !== 'undefined') return {};
  if (typeof globalThis.WebSocket !== 'undefined') return {};

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const ws = require('ws');
    return { realtime: { transport: ws } };
  } catch {
    return {};
  }
}
