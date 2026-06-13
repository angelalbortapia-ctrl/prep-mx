/** Cliente mínimo vía REST (sin WebSocket — compatible con Node 20). */

export function supabaseHeaders(serviceKey, extra = {}) {
  return {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    'Content-Type': 'application/json',
    ...extra,
  };
}

export async function countRows(url, serviceKey, table) {
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

export async function insertRows(url, serviceKey, table, rows) {
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
