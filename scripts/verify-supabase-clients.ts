/**
 * Verifica client.ts y server.ts con query real.
 * Uso: npm run verify:supabase
 */
import { loadEnvLocal } from './load-env';

async function main() {
  loadEnvLocal();

  const { isSupabaseConfigured } = await import('../src/lib/supabase/client');
  const { createServerSupabaseClient } = await import('../src/lib/supabase/server');

  if (!isSupabaseConfigured) {
    console.error('❌ client.ts: isSupabaseConfigured = false');
    process.exit(1);
  }
  console.log('✅ client.ts: isSupabaseConfigured OK');

  const server = createServerSupabaseClient();
  const { count, error } = await server
    .from('questions')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error(`❌ server.ts: ${error.message}`);
    process.exit(1);
  }

  console.log(`✅ server.ts: query OK (${count ?? 0} preguntas en questions)`);
}

main();
