import type { TickerCategory, TickerItem } from '@/data/ticker/types';
import { isTickerPromo } from '@/data/ticker/types';
import { sanitizeMarketingHref } from '@/lib/marketing-routes';
import { inferTickerUni, type TickerUniFilter } from '@/data/ticker/utils';

export type { TickerUniScope } from '@/data/ticker/types';

const HOT_CATEGORIES: TickerCategory[] = ['alerta-corte', 'crono-vigente', 'estadistica-rechazo'];

/** Señales tipo “aviso oficial” para el dashboard del alumno. */
export const DASHBOARD_AVISO_CATEGORIES: TickerCategory[] = [
  'crono-vigente',
  'alerta-corte',
  'criterio-oficial',
];

const MAX_FEED_ITEMS = 80;
const MAX_DASHBOARD_AVISOS = 24;

/** Uni explícita en metadata o inferida del texto. */
export function resolveItemUni(item: TickerItem): TickerUniFilter | null {
  if (item.uni && item.uni !== 'all') return item.uni;
  return inferTickerUni(item.text);
}

export function filterTickerItemsByUni(items: TickerItem[], filter: TickerUniFilter): TickerItem[] {
  if (filter === 'all') return items;
  return items.filter((item) => {
    if (isTickerPromo(item)) return true;
    const uni = resolveItemUni(item);
    return uni === null || uni === filter;
  });
}

/** Enlace sugerido para señales clave (embudo). */
export function resolveTickerHref(
  item: Pick<TickerItem, 'category' | 'uni' | 'text' | 'href'>
): string | undefined {
  if (item.href) return item.href;

  const uni = item.uni && item.uni !== 'all' ? item.uni : resolveItemUni(item as TickerItem);
  const uniQs = uni && uni !== 'all' ? `?uni=${uni}&plan=universidad` : '';

  switch (item.category) {
    case 'alerta-corte':
    case 'corte-standard':
    case 'estadistica-rechazo':
    case 'trampas-examen':
      return uni && uni !== 'all'
        ? `/simulador-gratis?uni=${uni}&plan=universidad`
        : '/simulador-gratis';
    case 'crono-vigente':
      return uni && uni !== 'all' ? `/precios?uni=${uni}` : '/precios';
    case 'carreras-futuro':
      return uniQs ? `/simulador-gratis${uniQs}` : '/simulador-gratis';
    default:
      return undefined;
  }
}

function parseDateStart(iso: string): number {
  return new Date(`${iso}T00:00:00`).getTime();
}

function parseDateEnd(iso: string): number {
  return new Date(`${iso}T23:59:59.999`).getTime();
}

/** Promos dentro de ventana startsAt / endsAt (inclusive). */
export function isPromoScheduledActive(item: TickerItem, now = new Date()): boolean {
  if (!isTickerPromo(item)) return true;
  const t = now.getTime();
  if (item.startsAt && t < parseDateStart(item.startsAt)) return false;
  if (item.endsAt && t > parseDateEnd(item.endsAt)) return false;
  return true;
}

/** Una promo activa por hora (rotación). Prefiere promos scoped a la uni activa. */
export function pickRotatingPromo(
  promos: TickerItem[],
  filter: TickerUniFilter = 'all',
  now = new Date()
): TickerItem | null {
  const active = promos.filter((p) => isPromoScheduledActive(p, now));
  if (!active.length) return null;

  const scoped =
    filter !== 'all'
      ? active.filter((p) => !p.uni || p.uni === 'all' || p.uni === filter)
      : active;
  const pool = scoped.length ? scoped : active;

  const slot = Math.floor(now.getTime() / 3_600_000);
  return pool[slot % pool.length];
}

function capFeedItems(items: TickerItem[], max = MAX_FEED_ITEMS): TickerItem[] {
  if (items.length <= max) return items;
  const hot = items.filter((i) => HOT_CATEGORIES.includes(i.category));
  const rest = items.filter((i) => !HOT_CATEGORIES.includes(i.category));
  return [...hot, ...rest].slice(0, max);
}

function isCustomTickerItem(item: TickerItem): boolean {
  return item.id.startsWith('custom-');
}

/** Cronos, alertas y avisos custom — con fallback al feed completo si hay pocos. */
export function prepareDashboardAvisosFeed(
  items: TickerItem[],
  filter: TickerUniFilter,
  now = new Date()
): TickerItem[] {
  const promos = items.filter((i) => isTickerPromo(i) && isPromoScheduledActive(i, now));
  const avisos = items.filter(
    (i) =>
      !isTickerPromo(i) &&
      (DASHBOARD_AVISO_CATEGORIES.includes(i.category) || isCustomTickerItem(i))
  );
  const pool = avisos.length >= 3 ? avisos : items.filter((i) => !isTickerPromo(i));
  const filtered = filterTickerItemsByUni(pool, filter);
  const capped = capFeedItems(filtered, MAX_DASHBOARD_AVISOS);
  const promo = pickRotatingPromo(promos, filter, now);
  return promo ? [promo, ...capped] : capped;
}

/** Filtra por uni, rota 1 promo, limita tamaño del feed. */
export function prepareTickerFeed(
  items: TickerItem[],
  filter: TickerUniFilter,
  now = new Date()
): TickerItem[] {
  const promos = items.filter((i) => isTickerPromo(i) && isPromoScheduledActive(i, now));
  const rest = items.filter((i) => !isTickerPromo(i));
  const filtered = filterTickerItemsByUni(rest, filter);
  const capped = capFeedItems(filtered);
  const promo = pickRotatingPromo(promos, filter, now);
  return promo ? [promo, ...capped] : capped;
}

/** Enriquece ítem con href si aplica (solo rutas públicas conocidas). */
export function enrichTickerItem(item: TickerItem): TickerItem {
  const custom = sanitizeMarketingHref(item.href);
  if (custom) return { ...item, href: custom };

  const fallback = resolveTickerHref(item);
  const safe = sanitizeMarketingHref(fallback);
  return safe ? { ...item, href: safe } : item;
}
