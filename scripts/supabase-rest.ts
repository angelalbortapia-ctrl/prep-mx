/** REST mínimo para scripts Node (evita WebSocket de @supabase/supabase-js). */

export function supabaseHeaders(serviceKey: string, extra: Record<string, string> = {}) {
  return {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    'Content-Type': 'application/json',
    ...extra,
  };
}

export async function countRows(url: string, serviceKey: string, table: string) {
  const res = await fetch(`${url}/rest/v1/${table}?select=id`, {
    method: 'HEAD',
    headers: supabaseHeaders(serviceKey, { Prefer: 'count=exact' }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${table}: ${res.status} ${text}`);
  }

  const range = res.headers.get('content-range') ?? '';
  const total = range.split('/')[1];
  return total === '*' ? 0 : Number.parseInt(total ?? '0', 10);
}

export async function insertRows(
  url: string,
  serviceKey: string,
  table: string,
  rows: Record<string, unknown>[]
) {
  const res = await fetch(`${url}/rest/v1/${table}`, {
    method: 'POST',
    headers: supabaseHeaders(serviceKey, { Prefer: 'return=representation' }),
    body: JSON.stringify(rows),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${table} insert: ${res.status} ${text}`);
  }

  return res.json();
}

export interface ExistingQuestionIndex {
  byImportKey: Map<string, string>;
  byPregunta: Map<string, string>;
}

/** Índice de preguntas existentes para upsert (import_key + fallback por enunciado). */
export async function fetchExistingQuestionIndex(
  url: string,
  serviceKey: string
): Promise<ExistingQuestionIndex> {
  const res = await fetch(`${url}/rest/v1/questions?select=id,pregunta,import_key`, {
    headers: supabaseHeaders(serviceKey),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`questions fetch: ${res.status} ${text}`);
  }

  const rows = (await res.json()) as {
    id: string;
    pregunta: string;
    import_key?: string | null;
  }[];

  const byImportKey = new Map<string, string>();
  const byPregunta = new Map<string, string>();

  for (const row of rows) {
    if (row.import_key) byImportKey.set(row.import_key, row.id);
    byPregunta.set(row.pregunta, row.id);
    byPregunta.set(row.pregunta.slice(0, 120), row.id);
  }

  return { byImportKey, byPregunta };
}

export async function patchRow(
  url: string,
  serviceKey: string,
  table: string,
  id: string,
  row: Record<string, unknown>
) {
  const res = await fetch(`${url}/rest/v1/${table}?id=eq.${id}`, {
    method: 'PATCH',
    headers: supabaseHeaders(serviceKey, { Prefer: 'return=representation' }),
    body: JSON.stringify(row),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${table} patch: ${res.status} ${text}`);
  }

  return res.json();
}

export interface UpsertQuestionsResult {
  inserted: number;
  updated: number;
  skipped: number;
}

/**
 * Inserta o actualiza preguntas por `import_key` (único en BD).
 * Si no hay import_key en BD pero el enunciado coincide, actualiza y asigna import_key.
 */
export async function upsertQuestions(
  url: string,
  serviceKey: string,
  rows: Record<string, unknown>[]
): Promise<UpsertQuestionsResult> {
  const existing = await fetchExistingQuestionIndex(url, serviceKey);
  let inserted = 0;
  let updated = 0;
  let skipped = 0;

  for (const row of rows) {
    const importKey = String(row.import_key ?? '');
    const pregunta = String(row.pregunta);

    if (!importKey) {
      skipped++;
      continue;
    }

    const existingId =
      existing.byImportKey.get(importKey) ??
      existing.byPregunta.get(pregunta) ??
      existing.byPregunta.get(pregunta.slice(0, 120));

    if (existingId) {
      await patchRow(url, serviceKey, 'questions', existingId, row);
      existing.byImportKey.set(importKey, existingId);
      existing.byPregunta.set(pregunta, existingId);
      updated++;
    } else {
      const insertedRows = (await insertRows(url, serviceKey, 'questions', [row])) as {
        id: string;
        pregunta: string;
        import_key?: string;
      }[];
      const newId = insertedRows[0]?.id;
      if (newId) {
        existing.byImportKey.set(importKey, newId);
        existing.byPregunta.set(pregunta, newId);
      }
      inserted++;
    }
  }

  return { inserted, updated, skipped };
}

/** @deprecated Usa fetchExistingQuestionIndex */
export async function fetchQuestionIdsByPregunta(
  url: string,
  serviceKey: string
): Promise<Map<string, string>> {
  const index = await fetchExistingQuestionIndex(url, serviceKey);
  return index.byPregunta;
}
