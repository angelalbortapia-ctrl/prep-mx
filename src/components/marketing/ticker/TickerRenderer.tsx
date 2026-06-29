'use client';

import { useMemo } from 'react';
import { megaUniversityTickerData } from '@/data/ticker';
import { applyTickerUniFilter, mergeTickerConfig, type TickerConfig } from '@/data/ticker/ticker-config';
import type { TickerUniFilter } from '@/data/ticker/utils';
import { useTickerController, type TickerSurface } from '@/hooks/useTickerController';
import { useTickerItems, useTickerSettings } from '@/hooks/useTickerData';
import { enrichTickerItem } from '@/lib/ticker/feed';
import type { TickerPlacement } from './TickerShared';
import { TickerLayoutView } from './TickerLayoutView';

interface TickerRendererProps {
  previewMode?: boolean;
  configOverride?: Partial<TickerConfig>;
  /** Solo preview admin: simula filtro UNAM / IPN / UAM. */
  previewUniFilter?: TickerUniFilter;
  placement?: TickerPlacement;
  surface?: TickerSurface;
}

export function TickerRenderer({
  previewMode,
  configOverride,
  previewUniFilter = 'all',
  placement = 'bottom',
  surface = 'marketing',
}: TickerRendererProps) {
  const { data: itemsData } = useTickerItems();
  const { data: settingsData } = useTickerSettings();

  const items = useMemo(() => {
    const raw = itemsData?.items ?? megaUniversityTickerData;
    return raw.map(enrichTickerItem);
  }, [itemsData?.items]);

  const baseConfig = useMemo(
    () => mergeTickerConfig({ ...settingsData?.theme, ...configOverride }),
    [settingsData?.theme, configOverride]
  );

  const ctrl = useTickerController(
    items,
    baseConfig.showUniFilters,
    previewMode,
    previewUniFilter,
    surface
  );

  const config = useMemo(() => {
    const activeFilter = previewMode ? previewUniFilter : ctrl.filter;
    return activeFilter === 'all'
      ? baseConfig
      : applyTickerUniFilter(baseConfig, activeFilter);
  }, [previewMode, previewUniFilter, baseConfig, ctrl.filter]);

  return (
    <TickerLayoutView
      items={ctrl.filtered}
      filter={ctrl.filter}
      onFilterChange={ctrl.onFilterChange}
      paused={ctrl.paused}
      onTogglePause={ctrl.onTogglePause}
      radarHref={ctrl.radarHref}
      config={config}
      previewMode={previewMode}
      hasMobileCta={previewMode ? false : ctrl.hasMobileCta}
      placement={placement}
    />
  );
}
