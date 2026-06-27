'use client';

import type { TickerViewProps } from './types';
import { TickerUniTabs } from './TickerShared';
import { isLightTickerLayout } from '@/data/ticker/layouts';

/** Tabs UNAM/IPN/UAM — solo visible en mobile (< md). */
export function TickerMobileUniRow({ props }: { props: TickerViewProps }) {
  const { config } = props;
  if (!config.showUniFilters) return null;

  return (
    <div
      className="flex shrink-0 border-t px-2 py-1 md:hidden"
      style={{ borderColor: `${config.borderColor}33` }}
    >
      <TickerUniTabs
        filter={props.filter}
        onChange={props.onFilterChange}
        dark={!isLightTickerLayout(config.layoutId)}
      />
    </div>
  );
}
