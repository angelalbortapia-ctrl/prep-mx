import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export function loadEnvLocal() {
  const path = resolve(process.cwd(), '.env.local');
  if (!existsSync(path)) {
    return { path, vars: {} as Record<string, string> };
  }

  const vars: Record<string, string> = {};
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    vars[key] = val;
    process.env[key] = val;
  }

  return { path, vars };
}

export function requireSupabaseEnv(vars: Record<string, string>) {
  const url = vars.NEXT_PUBLIC_SUPABASE_URL;
  const anon = vars.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const service = vars.SUPABASE_SERVICE_ROLE_KEY;
  const missing: string[] = [];
  if (!url) missing.push('NEXT_PUBLIC_SUPABASE_URL');
  if (!anon) missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  if (!service) missing.push('SUPABASE_SERVICE_ROLE_KEY');
  return { url, anon, service, missing };
}
