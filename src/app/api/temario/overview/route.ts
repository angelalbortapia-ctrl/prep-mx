import { NextResponse } from 'next/server';
import {
  getCachedTemarioOverview,
  STATIC_CATALOG_CACHE_HEADERS,
  STATIC_CATALOG_REVALIDATE_SECONDS,
} from '@/lib/cache/static-catalog';

export const revalidate = STATIC_CATALOG_REVALIDATE_SECONDS;

/** Metadatos ligeros para marketing (dropdown Exámenes soportados). */
export async function GET() {
  const exams = await getCachedTemarioOverview();
  return NextResponse.json(
    { exams, fetchedAt: new Date().toISOString() },
    { headers: STATIC_CATALOG_CACHE_HEADERS }
  );
}
