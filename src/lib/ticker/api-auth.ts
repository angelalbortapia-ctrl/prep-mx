import { NextResponse } from 'next/server';
import { isDemoMode } from '@/lib/demo-mode';

/** En producción sin demo, bloquea escrituras al ticker (filesystem local). */
export function tickerWriteForbidden(): NextResponse | null {
  if (isDemoMode()) return null;
  return NextResponse.json(
    {
      error:
        'Edición del ticker deshabilitada en producción. Activa NEXT_PUBLIC_DEMO_MODE o usa entorno local.',
    },
    { status: 403 }
  );
}
