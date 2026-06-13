/**
 * Importa preguntas desde JSON en data/questions/ → Supabase.
 * Uso: npm run import:questions
 *      npm run import:questions -- data/questions/lote-1.json
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, join, basename } from 'node:path';
import { jsonrepair } from 'jsonrepair';
import { loadEnvLocal, requireSupabaseEnv } from './load-env';
import { countRows, insertRows } from './supabase-rest';
import { fixGeminiJsonQuotes, fixGeminiJsonTypos, toDbRow, type GeminiQuestion } from './normalize-gemini';

const BATCH = 25;

function parseQuestionsFile(path: string): GeminiQuestion[] {
  let raw = readFileSync(path, 'utf8');
  raw = raw.replace(/CONTINUAR_DESDE:\d+/gi, '').trim();
  // Arrays formateados terminan en "}\n]" en vez de "}]"
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
  return parsed as GeminiQuestion[];
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

async function fetchExistingPreguntas(url: string, service: string): Promise<Set<string>> {
  const res = await fetch(`${url}/rest/v1/questions?select=pregunta`, {
    headers: {
      apikey: service,
      Authorization: `Bearer ${service}`,
    },
  });
  if (!res.ok) return new Set();
  const rows = (await res.json()) as { pregunta: string }[];
  return new Set(rows.map((r) => r.pregunta.slice(0, 120)));
}

async function main() {
  const arg = process.argv[2];
  const files = resolveFiles(arg);

  if (!files.length) {
    console.error('❌ No hay JSON en data/questions/. Pasa un archivo: npm run import:questions -- data/questions/lote-1.json');
    process.exit(1);
  }

  const { vars } = loadEnvLocal();
  const { url, service, missing } = requireSupabaseEnv(vars);
  if (missing.length || !url || !service) {
    console.error(`❌ Faltan en .env.local: ${missing.join(', ')}`);
    process.exit(1);
  }

  const existing = await fetchExistingPreguntas(url, service);
  let totalInserted = 0;
  let totalSkipped = 0;

  for (const file of files) {
    console.log(`\n📄 ${basename(file)}`);
    let questions: GeminiQuestion[];
    try {
      questions = parseQuestionsFile(file);
    } catch (e) {
      console.error(`❌ JSON inválido: ${e instanceof Error ? e.message : e}`);
      continue;
    }

    const rows = questions
      .map(toDbRow)
      .filter((row) => {
        const key = row.pregunta.slice(0, 120);
        if (existing.has(key)) {
          totalSkipped++;
          return false;
        }
        existing.add(key);
        return true;
      });

    for (let i = 0; i < rows.length; i += BATCH) {
      const chunk = rows.slice(i, i + BATCH);
      if (!chunk.length) continue;
      try {
        await insertRows(url, service, 'questions', chunk);
        totalInserted += chunk.length;
        console.log(`  ✅ +${chunk.length} (${totalInserted} acumuladas)`);
      } catch (e) {
        console.error(`  ❌ Lote falló: ${e instanceof Error ? e.message : e}`);
      }
    }
  }

  const finalCount = await countRows(url, service, 'questions');
  console.log(`\n🎉 Listo: ${totalInserted} nuevas, ${totalSkipped} duplicadas omitidas. Total en BD: ${finalCount}`);
}

main();
