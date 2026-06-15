import { NextResponse } from 'next/server';
import { getStudyMaterias } from '@/data/study-materias';

export const dynamic = 'force-dynamic';

/** Materias de la Zona de Estudio (cacheable por TanStack Query en el cliente). */
export async function GET() {
  const materias = getStudyMaterias();
  return NextResponse.json(
    { materias, fetchedAt: new Date().toISOString() },
    {
      headers: {
        // Permite SWR a nivel CDN/navegador; el caché fuerte vive en TanStack.
        'Cache-Control': 'public, max-age=0, s-maxage=600, stale-while-revalidate=86400',
      },
    }
  );
}
