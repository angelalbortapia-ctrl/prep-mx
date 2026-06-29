#!/usr/bin/env node
/**
 * Verifica conexión a Supabase y que existan las tablas del schema inicial.
 * Uso: npm run check:supabase
 */
import { loadEnvLocal, requireSupabaseEnv } from './load-env.mjs';
import { countRows } from './supabase-rest.mjs';

const EXPECTED_TABLES = ['users', 'questions', 'exams', 'user_progress', 'study_plans'];

function ok(msg) {
  console.log(`✅ ${msg}`);
}
function fail(msg) {
  console.error(`❌ ${msg}`);
}

const { path, vars } = loadEnvLocal();

if (!Object.keys(vars).length) {
  fail(`No existe ${path} o está vacío.`);
  console.log('\nPasos rápidos:');
  console.log('  1. Copia .env.example → .env.local');
  console.log('  2. Supabase → Project Settings → API → pega URL, anon key y service_role');
  console.log('  3. SQL Editor → pega supabase/migrations/001_initial.sql → Run');
  console.log('  4. Vuelve a correr: npm run check:supabase\n');
  process.exit(1);
}

const { url, service, missing } = requireSupabaseEnv(vars);

if (missing.length) {
  fail(`Faltan variables en .env.local: ${missing.join(', ')}`);
  process.exit(1);
}

console.log('Comprobando Supabase...\n');

let questionCount;
try {
  questionCount = await countRows(url, service, 'questions');
} catch (e) {
  fail(`No se pudo leer la tabla "questions": ${e.message}`);
  const msg = String(e.message);
  if (msg.includes('does not exist') || msg.includes('42P01')) {
    console.log('\n→ Ejecuta el SQL en Supabase: supabase/migrations/001_initial.sql\n');
  } else if (msg.includes('fetch failed') || msg.includes('ENOTFOUND') || msg.includes('ECONNREFUSED')) {
    console.log('\n→ Posibles causas:');
    console.log('  • Proyecto Supabase pausado → supabase.com → tu proyecto → Resume');
    console.log('  • NEXT_PUBLIC_SUPABASE_URL incorrecta en .env.local');
    console.log('  • Sin conexión a internet');
    console.log('  • Ejecuta también: supabase/migrations/002_rls_bookmarks.sql\n');
  }
  process.exit(1);
}

ok(`Conexión OK (${url})`);

for (const table of EXPECTED_TABLES) {
  try {
    await countRows(url, service, table);
    ok(`Tabla "${table}" existe`);
  } catch (e) {
    fail(`Tabla "${table}" no accesible: ${e.message}`);
    process.exit(1);
  }
}

ok(`Preguntas en BD: ${questionCount}`);

let migration002Ok = true;
try {
  const res = await fetch(`${url}/rest/v1/questions?select=is_premium&limit=1`, {
    headers: {
      apikey: service,
      Authorization: `Bearer ${service}`,
    },
  });
  if (!res.ok) {
    migration002Ok = false;
    fail('Migración 002 pendiente (falta columna questions.is_premium)');
  } else {
    ok('Migración 002: columna is_premium existe');
  }
} catch {
  migration002Ok = false;
}

try {
  await countRows(url, service, 'user_bookmarks');
  ok('Migración 002: tabla user_bookmarks existe');
} catch {
  migration002Ok = false;
  fail('Migración 002 pendiente (falta tabla user_bookmarks)');
}

if (!migration002Ok) {
  console.log('\n⚠️  Ejecuta en Supabase SQL Editor:');
  console.log('   supabase/migrations/002_rls_bookmarks.sql\n');
  console.log('   (Bookmarks, exam_tokens y filtro premium no funcionarán hasta entonces.)\n');
}

if (questionCount === 0) {
  console.log('\n💡 La tabla está vacía. Carga demo con: npm run seed:questions\n');
} else if (migration002Ok) {
  console.log('\n🎉 Supabase listo. Reinicia dev si acabas de crear .env.local: npm run dev:clean\n');
} else {
  console.log('\n✅ Conexión y preguntas OK. Completa migración 002 para bookmarks y tokens.\n');
}
