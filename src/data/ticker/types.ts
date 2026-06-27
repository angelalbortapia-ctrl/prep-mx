export type TickerCategory =
  | 'alerta-corte'
  | 'corte-standard'
  | 'crono-vigente'
  | 'criterio-oficial'
  | 'estadistica-rechazo'
  | 'trampas-examen'
  | 'carreras-futuro'
  | 'mercado-laboral'
  | 'reactivo'
  | 'promo-oferta';

export type TickerUniScope = 'unam' | 'ipn' | 'uam' | 'all';

export interface TickerItem {
  id: string;
  category: TickerCategory;
  /** Etiqueta visible del badge, p. ej. [ALERTA CORTE] */
  badge: string;
  text: string;
  /** Universidad dueña de la señal (filtrado fiable). */
  uni?: TickerUniScope;
  /** Enlace opcional — promos, cortes, cronos */
  href?: string;
  /** Promo: visible desde (YYYY-MM-DD, inclusive). */
  startsAt?: string;
  /** Promo: visible hasta (YYYY-MM-DD, inclusive). */
  endsAt?: string;
}

export const TICKER_PROMO_CATEGORY: TickerCategory = 'promo-oferta';

export const TICKER_CATEGORIES = [
  'alerta-corte',
  'corte-standard',
  'crono-vigente',
  'criterio-oficial',
  'estadistica-rechazo',
  'trampas-examen',
  'carreras-futuro',
  'mercado-laboral',
  'reactivo',
  'promo-oferta',
] as const satisfies readonly TickerCategory[];

export function isTickerPromo(item: Pick<TickerItem, 'category' | 'badge'>): boolean {
  if (item.category === TICKER_PROMO_CATEGORY) return true;
  const badge = formatTickerBadge(item.badge).toUpperCase();
  return badge.includes('OFERTA') || badge.includes('PROMO');
}

export const TICKER_BADGE_LABELS: Record<TickerCategory, string> = {
  'alerta-corte': 'ALERTA CORTE',
  'corte-standard': 'CORTE OFICIAL',
  'crono-vigente': 'CRONOGRAMA VIGENTE',
  'criterio-oficial': 'CRITERIO OFICIAL',
  'estadistica-rechazo': 'ESTADÍSTICA DE RECHAZO',
  'trampas-examen': 'TRAMPAS DEL EXAMEN',
  'carreras-futuro': 'CARRERAS DEL FUTURO',
  'mercado-laboral': 'MERCADO LABORAL',
  reactivo: 'REACTIVO CLAVE',
  'promo-oferta': 'PROMO / OFERTA',
};

/** Normaliza badge con o sin corchetes → texto visible. */
export function formatTickerBadge(badge: string): string {
  return badge.replace(/^\[|\]$/g, '').trim();
}
