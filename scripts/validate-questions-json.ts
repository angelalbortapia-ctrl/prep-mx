/**
 * Valida JSON de preguntas sin tocar Supabase.
 * Uso: npm run validate:questions
 *      npm run validate:questions -- data/questions/lote-1.json
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';
import { jsonrepair } from 'jsonrepair';
import { fixGeminiJsonQuotes, fixGeminiJsonTypos } from './normalize-gemini';
import { formatValidationReport, validateQuestionBatch } from './question-import-schema';

function parseQuestionsFile(path: string): unknown[] {
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
  return parsed;
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

function main() {
  const arg = process.argv[2];
  const files = resolveFiles(arg);

  if (!files.length) {
    console.error('❌ No hay JSON en data/questions/. Pasa un archivo: npm run validate:questions -- data/questions/lote-1.json');
    process.exit(1);
  }

  let totalOk = 0;
  let totalFail = 0;

  for (const file of files) {
    const label = basename(file);
    console.log(`\n📄 ${label}`);
    let raw: unknown[];
    try {
      raw = parseQuestionsFile(file);
    } catch (e) {
      console.error(`❌ JSON inválido: ${e instanceof Error ? e.message : e}`);
      totalFail++;
      continue;
    }

    const result = validateQuestionBatch(raw, label);
    if (result.ok) {
      totalOk++;
      console.log(`  ✅ ${result.questions.length} preguntas válidas (esquema + KaTeX)`);
    } else {
      totalFail++;
      console.error(`  ❌ ${result.issues.length} error(es):\n${formatValidationReport(label, result.issues)}`);
    }
  }

  if (totalFail > 0) {
    console.error(`\n⛔ ${totalFail} archivo(s) con errores. Corrige antes de import:questions.`);
    process.exit(1);
  }

  console.log(`\n🎉 ${totalOk} archivo(s) listos para producción.`);
}

main();
