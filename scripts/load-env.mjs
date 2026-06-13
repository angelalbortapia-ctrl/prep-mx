import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

/** Carga .env.local sin dependencias extra */
export function loadEnvLocal() {
  const path = resolve(root, '.env.local');
  if (!existsSync(path)) {
    return { path, vars: {} };
  }
  const vars = {};
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
  }
  return { path, vars };
}

export function requireSupabaseEnv(vars) {
  const url = vars.NEXT_PUBLIC_SUPABASE_URL;
  const anon = vars.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const service = vars.SUPABASE_SERVICE_ROLE_KEY;
  const missing = [];
  if (!url) missing.push('NEXT_PUBLIC_SUPABASE_URL');
  if (!anon) missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  if (!service) missing.push('SUPABASE_SERVICE_ROLE_KEY');
  return { url, anon, service, missing };
}
