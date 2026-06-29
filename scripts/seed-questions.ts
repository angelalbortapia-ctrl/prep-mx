/**
 * Lee preguntas desde data/questions/seed.json y hace upsert en Supabase.
 * Idempotente por `import_key` (slug explícito o hash de materia + opciones).
 * Si el reactivo ya existe, actualiza; si no, inserta.
 *
 * Uso: npm run seed:questions
 *      npm run seed:questions -- data/questions/seed.json
 */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadEnvLocal, requireSupabaseEnv } from './load-env';
import { countRows, upsertQuestions } from './supabase-rest';
import { toDbRow, type GeminiQuestion } from './normalize-gemini';
import { formatValidationReport, validateQuestionBatch } from './question-import-schema';

const DEFAULT_FILE = 'data/questions/seed.json';

function loadQuestions(filePath: string): GeminiQuestion[] {
  if (!existsSync(filePath)) {
    throw new Error(`No existe ${filePath}. Crea el JSON con al menos una pregunta.`);
  }

  const raw = readFileSync(filePath, 'utf8');
  const parsed = JSON.parse(raw) as unknown;

  if (!Array.isArray(parsed)) {
    throw new Error(`${filePath}: se esperaba un array JSON`);
  }

  const label = filePath.split('/').pop() ?? filePath;
  const validation = validateQuestionBatch(parsed, label);
  if (!validation.ok) {
    throw new Error(
      `Validación fallida (${validation.issues.length} error(es)):\n${formatValidationReport(label, validation.issues)}`
    );
  }

  return validation.questions;
}

async function main() {
  const arg = process.argv[2];
  const filePath = resolve(process.cwd(), arg ?? DEFAULT_FILE);

  console.log(`📄 ${arg ?? DEFAULT_FILE}`);

  let questions: GeminiQuestion[];
  try {
    questions = loadQuestions(filePath);
  } catch (e) {
    console.error(`❌ ${e instanceof Error ? e.message : e}`);
    process.exit(1);
  }

  const rows = questions.map(toDbRow);
  console.log(`   ${rows.length} preguntas en el JSON\n`);

  const { vars } = loadEnvLocal();
  const { url, service, missing } = requireSupabaseEnv(vars);

  if (missing.length || !url || !service) {
    console.error(`❌ Faltan en .env.local: ${missing.join(', ')}`);
    process.exit(1);
  }

  try {
    const { inserted, updated, skipped } = await upsertQuestions(url, service, rows);
    const total = await countRows(url, service, 'questions');
    console.log(
      `✅ Upsert listo: ${inserted} nuevas, ${updated} actualizadas${skipped ? `, ${skipped} omitidas` : ''}. Total en BD: ${total}`
    );
  } catch (e) {
    console.error(`❌ ${e instanceof Error ? e.message : e}`);
    process.exit(1);
  }
}

main();
