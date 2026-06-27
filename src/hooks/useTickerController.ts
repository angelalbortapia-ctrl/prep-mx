'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { TickerUniFilter } from '@/data/ticker';
import type { TickerItem } from '@/data/ticker/types';
import { useUniThemeOptional } from '@/contexts/UniThemeContext';
import { filterToUniId } from '@/lib/uni-theme-config';
import { prepareTickerFeed } from '@/lib/ticker/feed';

function parseUrlUni(raw: string | null): TickerUniFilter | null {
  if (raw === 'unam' || raw === 'ipn' || raw === 'uam') return raw;
  return null;
}

/** Uni activa: URL → UniTheme → UNAM por defecto. */
function resolveSiteUni(
  urlUni: string | null,
  siteUniId: 'unam' | 'ipn' | 'uam' | 'todos' | undefined,
  hydrated: boolean
): TickerUniFilter {
  const fromUrl = parseUrlUni(urlUni);
  if (fromUrl) return fromUrl;
  if (hydrated && siteUniId && siteUniId !== 'todos') return siteUniId;
  return 'unam';
}

const noop = () => {};

export function useTickerController(
  items: TickerItem[],
  showUniFilters: boolean,
  previewMode = false,
  previewFilter: TickerUniFilter = 'all'
) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const uniTheme = useUniThemeOptional();
  const hasMobileCta = pathname === '/';

  const [paused, setPaused] = useState(false);
  const [tabOverride, setTabOverride] = useState<TickerUniFilter | null>(null);

  const urlUni = searchParams.get('uni');
  const siteUni = resolveSiteUni(urlUni, uniTheme?.uniId, uniTheme?.hydrated ?? false);

  const filter: TickerUniFilter = previewMode
    ? previewFilter
    : !showUniFilters || tabOverride === null
      ? siteUni
      : tabOverride;

  useEffect(() => {
    if (previewMode || !showUniFilters) return;
    if (parseUrlUni(urlUni)) setTabOverride(null);
  }, [urlUni, previewMode, showUniFilters]);

  const filtered = useMemo(
    () => prepareTickerFeed(items, filter),
    [items, filter]
  );

  const onFilterChange = useCallback(
    (id: TickerUniFilter) => {
      if (previewMode) return;

      if (showUniFilters) setTabOverride(id);

      const params = new URLSearchParams(searchParams.toString());

      if (id === 'all') {
        params.delete('uni');
        params.set('plan', 'todo');
        uniTheme?.setUniId('todos', { syncUrl: false });
      } else {
        params.set('uni', id);
        params.set('plan', 'universidad');
        uniTheme?.setUniId(filterToUniId(id), { syncUrl: false });
      }

      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [previewMode, showUniFilters, searchParams, pathname, router, uniTheme]
  );

  const onTogglePause = useCallback(() => setPaused((p) => !p), []);

  const radarHref =
    filter === 'all' ? '/simulador-gratis' : `/simulador-gratis?uni=${filter}`;

  if (previewMode) {
    return {
      filter,
      filtered,
      paused,
      hasMobileCta: false,
      radarHref: filter === 'all' ? '/simulador-gratis' : `/simulador-gratis?uni=${filter}`,
      onFilterChange: noop,
      onTogglePause,
    };
  }

  return {
    filter,
    filtered,
    paused,
    hasMobileCta,
    radarHref,
    onFilterChange,
    onTogglePause,
  };
}
