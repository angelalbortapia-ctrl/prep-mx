/**
 * Importa preguntas desde JSON en data/questions/ → Supabase (upsert idempotente).
 * Uso: npm run import:questions
 *      npm run import:questions -- data/questions/lote-1.json
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, join, basename } from 'node:path';
import { jsonrepair } from 'jsonrepair';
import { loadEnvLocal, requireSupabaseEnv } from './load-env';
import { countRows, upsertQuestions } from './supabase-rest';
import { fixGeminiJsonQuotes, fixGeminiJsonTypos, toDbRow, type GeminiQuestion } from './normalize-gemini';
import { formatValidationReport, validateQuestionBatch } from './question-import-schema';

function parseQuestionsFile(path: string): GeminiQuestion[] {
  let raw = readFileSync(path, 'utf8');
  raw = raw.replace(/CONTINUAR_DESDE:\d+/gi, '').trim();
  if (!raw.endsWith(']')) {
    const m = raw.match(/\}\s*\]\s*$/);
    if (m) raw = raw.slice(0, raw.lastIndexOf(']') + 1);
  }
  raw = raw.replace(/"opcion_corrector"\s*:\s*"[^"]*",?\s*/g, '');
  raw = fixGeminiJsonQuotes(fixGeminiJsonTypos(raw));

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = JSON.parse(jsonrepair(raw));
  }
  if (!Array.isArray(parsed)) {
    throw new Error(`${basename(path)}: se esperaba un array JSON`);
  }

  const label = basename(path);
  const validation = validateQuestionBatch(parsed, label);
  if (!validation.ok) {
    throw new Error(
      `Validación fallida (${validation.issues.length} error(es)):\n${formatValidationReport(label, validation.issues)}`
    );
  }
  return validation.questions;
}

function resolveFiles(arg?: string): string[] {
  const dir = resolve(process.cwd(), 'data/questions');
  if (arg) {
    const p = resolve(process.cwd(), arg);
    if (!existsSync(p)) throw new Error(`No existe: ${p}`);
    return [p];
  }
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => join(dir, f))
    .sort();
}

async function main() {
  const arg = process.argv[2];
  const files = resolveFiles(arg);

  if (!files.length) {
    console.error(
      '❌ No hay JSON en data/questions/. Pasa un archivo: npm run import:questions -- data/questions/lote-1.json'
    );
    process.exit(1);
  }

  const { vars } = loadEnvLocal();
  const { url, service, missing } = requireSupabaseEnv(vars);
  if (missing.length || !url || !service) {
    console.error(`❌ Faltan en .env.local: ${missing.join(', ')}`);
    process.exit(1);
  }

  let totalInserted = 0;
  let totalUpdated = 0;
  let totalSkipped = 0;

  for (const file of files) {
    console.log(`\n📄 ${basename(file)}`);
    let questions: GeminiQuestion[];
    try {
      questions = parseQuestionsFile(file);
    } catch (e) {
      console.error(`❌ ${e instanceof Error ? e.message : e}`);
      continue;
    }

    const rows = questions.map(toDbRow);
    try {
      const { inserted, updated, skipped } = await upsertQuestions(url, service, rows);
      totalInserted += inserted;
      totalUpdated += updated;
      totalSkipped += skipped;
      console.log(`  ✅ ${inserted} nuevas, ${updated} actualizadas${skipped ? `, ${skipped} omitidas` : ''}`);
    } catch (e) {
      console.error(`  ❌ Upsert falló: ${e instanceof Error ? e.message : e}`);
    }
  }

  const finalCount = await countRows(url, service, 'questions');
  console.log(
    `\n🎉 Listo: ${totalInserted} nuevas, ${totalUpdated} actualizadas, ${totalSkipped} omitidas. Total en BD: ${finalCount}`
  );
}

main();
