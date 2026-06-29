import { NextResponse } from 'next/server';
import {
  getCachedTemarioMateriaDetail,
  STATIC_CATALOG_CACHE_HEADERS,
  STATIC_CATALOG_REVALIDATE_SECONDS,
} from '@/lib/cache/static-catalog';
import type { TemarioUniId } from '@/lib/temario/types';

export const revalidate = STATIC_CATALOG_REVALIDATE_SECONDS;

function parseUni(value: string | null): TemarioUniId | null {
  if (value === 'unam' || value === 'ipn' || value === 'uam') return value;
  return null;
}

/** Subtemas de una materia — solo se descarga al expandir la fila en el temario. */
export async function GET(
  request: Request,
  { params }: { params: { materiaId: string } }
) {
  const { searchParams } = new URL(request.url);
  const uni = parseUni(searchParams.get('uni'));
  if (!uni) {
    return NextResponse.json({ error: 'Query `uni` requerido (unam|ipn|uam)' }, { status: 400 });
  }

  const detail = await getCachedTemarioMateriaDetail(uni, params.materiaId);
  if (!detail) {
    return NextResponse.json({ error: 'Materia no encontrada' }, { status: 404 });
  }

  return NextResponse.json(detail, { headers: STATIC_CATALOG_CACHE_HEADERS });
}
