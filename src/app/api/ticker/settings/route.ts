import { NextResponse } from 'next/server';
import { patchTickerTheme, readTickerSettings } from '@/lib/ticker/persistence';
import { tickerWriteForbidden } from '@/lib/ticker/api-auth';
import type { TickerConfig } from '@/data/ticker/ticker-config';

export async function GET() {
  try {
    const settings = await readTickerSettings();
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error al leer settings' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const forbidden = tickerWriteForbidden();
  if (forbidden) return forbidden;

  try {
    const body = (await request.json()) as { theme?: Partial<TickerConfig> };
    if (!body.theme || typeof body.theme !== 'object') {
      return NextResponse.json({ error: 'Falta objeto theme' }, { status: 400 });
    }
    const settings = await patchTickerTheme(body.theme);
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error al guardar settings' },
      { status: 500 }
    );
  }
}
