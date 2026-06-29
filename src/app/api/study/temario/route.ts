import { NextResponse } from 'next/server';
import {
  getCachedTemarioSummary,
  STATIC_CATALOG_CACHE_HEADERS,
  STATIC_CATALOG_REVALIDATE_SECONDS,
} from '@/lib/cache/static-catalog';
import type { TemarioUniId } from '@/lib/temario/types';

export const revalidate = STATIC_CATALOG_REVALIDATE_SECONDS;

function parseUni(value: string | null): TemarioUniId | null {
  if (value === 'unam' || value === 'ipn' || value === 'uam') return value;
  return null;
}

/** Resumen del temario (sin árbol de subtemas) — una universidad a la vez. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uni = parseUni(searchParams.get('uni'));
  if (!uni) {
    return NextResponse.json({ error: 'Query `uni` requerido (unam|ipn|uam)' }, { status: 400 });
  }

  const filter = searchParams.get('filter') ?? undefined;
  const summary = await getCachedTemarioSummary(uni, filter);
  return NextResponse.json(summary, { headers: STATIC_CATALOG_CACHE_HEADERS });
}
