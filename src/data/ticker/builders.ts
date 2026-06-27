import type { TickerCategory, TickerItem, TickerUniScope } from './types';
import { TICKER_BADGE_LABELS } from './types';
import { inferTickerUni } from './utils';
import { resolveTickerHref } from '@/lib/ticker/feed';

function stableId(prefix: string, seed: string): string {
  const slug = seed
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 56);
  return `${prefix}-${slug}`;
}

function inferUni(text: string): TickerUniScope | undefined {
  const u = inferTickerUni(text);
  return u && u !== 'all' ? u : undefined;
}

function finalizeItem(
  prefix: string,
  category: TickerCategory,
  text: string,
  uni?: TickerUniScope
): TickerItem {
  const resolvedUni = uni ?? inferUni(text);
  const item: TickerItem = {
    id: stableId(prefix, text),
    category,
    badge: TICKER_BADGE_LABELS[category],
    text,
    ...(resolvedUni ? { uni: resolvedUni } : {}),
  };
  const href = resolveTickerHref(item);
  return href ? { ...item, href } : item;
}

export function unamCutoff(
  area: string,
  career: string,
  campus: string,
  aciertos: number
): TickerItem {
  const category: TickerCategory = aciertos > 100 ? 'alerta-corte' : 'corte-standard';
  const text = `UNAM ${area} · ${career} · ${campus} · ${aciertos} aciertos mínimos`;
  return finalizeItem('unam', category, text, 'unam');
}

export function ipnCutoff(
  area: string,
  career: string,
  plantel: string,
  aciertos: number
): TickerItem {
  const category: TickerCategory = aciertos > 100 ? 'alerta-corte' : 'corte-standard';
  const text = `IPN ${area} · ${career} · ${plantel} · ${aciertos} aciertos mínimos`;
  return finalizeItem('ipn', category, text, 'ipn');
}

export function uamCutoff(
  unidad: string,
  career: string,
  division: string,
  puntos: number
): TickerItem {
  const category: TickerCategory = puntos > 700 ? 'alerta-corte' : 'corte-standard';
  const text = `UAM ${unidad} · ${career} · ${division} · ${puntos} pts mínimos`;
  return finalizeItem('uam', category, text, 'uam');
}

export function cronograma(text: string): TickerItem {
  return finalizeItem('crono', 'crono-vigente', text);
}

export function criterio(text: string): TickerItem {
  return finalizeItem('crit', 'criterio-oficial', text);
}

export function reactivo(text: string): TickerItem {
  return finalizeItem('react', 'reactivo', text);
}

export function estadistica(text: string): TickerItem {
  return finalizeItem('stat', 'estadistica-rechazo', text);
}

export function trampa(text: string): TickerItem {
  return finalizeItem('trap', 'trampas-examen', text);
}

export function tendencia(text: string): TickerItem {
  return finalizeItem('trend', 'carreras-futuro', text);
}

export function mercado(text: string): TickerItem {
  return finalizeItem('mkt', 'mercado-laboral', text);
}
