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

export async function fetchQuestionIdsByPregunta(
  url: string,
  serviceKey: string
): Promise<Map<string, string>> {
  const res = await fetch(`${url}/rest/v1/questions?select=id,pregunta`, {
    headers: supabaseHeaders(serviceKey),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`questions fetch: ${res.status} ${text}`);
  }

  const rows = (await res.json()) as { id: string; pregunta: string }[];
  return new Map(rows.map((r) => [r.pregunta, r.id]));
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

export async function upsertQuestions(
  url: string,
  serviceKey: string,
  rows: Record<string, unknown>[]
) {
  const existing = await fetchQuestionIdsByPregunta(url, serviceKey);
  let inserted = 0;
  let updated = 0;

  for (const row of rows) {
    const pregunta = String(row.pregunta);
    const id = existing.get(pregunta);

    if (id) {
      await patchRow(url, serviceKey, 'questions', id, row);
      updated++;
    } else {
      await insertRows(url, serviceKey, 'questions', [row]);
      existing.set(pregunta, 'pending');
      inserted++;
    }
  }

  return { inserted, updated };
}
