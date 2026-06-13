import ws from 'ws';

/** Node < 22 en scripts/SSR: @supabase/supabase-js necesita transport ws. */
export function serverSupabaseOptions() {
  if (typeof window !== 'undefined') return {};
  if (typeof globalThis.WebSocket !== 'undefined') return {};
  return { realtime: { transport: ws as unknown as typeof WebSocket } };
}
