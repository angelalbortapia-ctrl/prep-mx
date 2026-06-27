import type { TickerItem } from './types';

export type TickerUniFilter = 'all' | 'unam' | 'ipn' | 'uam';

/** Detecta universidad en el texto (fallback si no hay metadata `uni`). */
export function inferTickerUni(text: string): TickerUniFilter | null {
  const upper = text.toUpperCase();

  if (/^UNAM[\s·:]/.test(upper)) return 'unam';
  if (/^IPN[\s·:]/.test(upper)) return 'ipn';
  if (/^UAM[\s·:]/.test(upper)) return 'uam';

  const matches = upper.match(/\b(UNAM|IPN|UAM)\b/g) ?? [];
  const unique = Array.from(new Set(matches));

  if (unique.length === 1) {
    if (unique[0] === 'UNAM') return 'unam';
    if (unique[0] === 'IPN') return 'ipn';
    if (unique[0] === 'UAM') return 'uam';
  }

  return null;
}

function itemUni(item: TickerItem): TickerUniFilter | null {
  if (item.uni && item.uni !== 'all') return item.uni;
  return inferTickerUni(item.text);
}

/** @deprecated usar prepareTickerFeed desde @/lib/ticker/feed */
export function filterTickerItems(items: TickerItem[], filter: TickerUniFilter): TickerItem[] {
  if (filter === 'all') return items;
  return items.filter((item) => {
    if (item.category === 'promo-oferta') return true;
    const uni = itemUni(item);
    return uni === null || uni === filter;
  });
}

export function isTickerUniFilter(value: string): value is TickerUniFilter {
  return value === 'all' || value === 'unam' || value === 'ipn' || value === 'uam';
}

export const TICKER_UNI_FILTERS: { id: TickerUniFilter; label: string; color: string }[] = [
  { id: 'all', label: 'Todas', color: '#ff6600' },
  { id: 'unam', label: 'UNAM', color: '#f59e0b' },
  { id: 'ipn', label: 'IPN', color: '#ef4444' },
  { id: 'uam', label: 'UAM', color: '#14b8a6' },
];
