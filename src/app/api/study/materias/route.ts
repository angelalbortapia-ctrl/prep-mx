import { NextResponse } from 'next/server';
import {
  getCachedStudyMaterias,
  STATIC_CATALOG_MATERIAS_HEADERS,
  STATIC_CATALOG_REVALIDATE_SECONDS,
} from '@/lib/cache/static-catalog';

export const revalidate = STATIC_CATALOG_REVALIDATE_SECONDS;

/** Materias de la Zona de Estudio — catálogo estático (src/data), cacheado en servidor. */
export async function GET() {
  const materias = await getCachedStudyMaterias();
  return NextResponse.json(
    { materias, fetchedAt: new Date().toISOString() },
    { headers: STATIC_CATALOG_MATERIAS_HEADERS }
  );
}
