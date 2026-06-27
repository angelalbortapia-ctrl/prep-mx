import { NextResponse } from 'next/server';
import {
  addCustomTickerItem,
  deleteCustomTickerItem,
  getMergedTickerItems,
  readCustomTickerItems,
  type TickerCustomItemInput,
} from '@/lib/ticker/persistence';
import { tickerWriteForbidden } from '@/lib/ticker/api-auth';
import type { TickerCategory } from '@/data/ticker/types';
import { TICKER_CATEGORIES } from '@/data/ticker/types';

function isCategory(value: unknown): value is TickerCategory {
  return typeof value === 'string' && (TICKER_CATEGORIES as readonly string[]).includes(value);
}

export async function GET() {
  try {
    const { items, customCount, staticCount } = await getMergedTickerItems();
    return NextResponse.json({ items, customCount, staticCount });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error al leer ticker' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const forbidden = tickerWriteForbidden();
  if (forbidden) return forbidden;

  try {
    const body = (await request.json()) as Partial<TickerCustomItemInput>;
    if (!body.text?.trim()) {
      return NextResponse.json({ error: 'El texto es obligatorio' }, { status: 400 });
    }
    if (!isCategory(body.category)) {
      return NextResponse.json({ error: 'Categoría inválida' }, { status: 400 });
    }

    const item = await addCustomTickerItem({
      category: body.category,
      text: body.text,
      badge: body.badge,
      universidad: body.universidad ?? null,
      href: body.href ?? null,
      startsAt: body.startsAt ?? null,
      endsAt: body.endsAt ?? null,
    });

    const custom = await readCustomTickerItems();
    return NextResponse.json({ item, customCount: custom.length }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error al guardar' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const forbidden = tickerWriteForbidden();
  if (forbidden) return forbidden;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Falta id' }, { status: 400 });
    }
    const ok = await deleteCustomTickerItem(id);
    if (!ok) {
      return NextResponse.json({ error: 'Ítem no encontrado' }, { status: 404 });
    }
    const custom = await readCustomTickerItems();
    return NextResponse.json({ ok: true, customCount: custom.length });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error al eliminar' },
      { status: 500 }
    );
  }
}
