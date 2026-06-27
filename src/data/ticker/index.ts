export type { TickerCategory, TickerItem, TickerUniScope } from './types';
export {
  TICKER_BADGE_LABELS,
  TICKER_CATEGORIES,
  TICKER_PROMO_CATEGORY,
  formatTickerBadge,
  isTickerPromo,
} from './types';
export { megaUniversityTickerData } from './mega-university-ticker-data';
export {
  DEFAULT_TICKER_CONFIG,
  TICKER_COLOR_PRESETS,
  TICKER_SPEED_PRESETS,
  formatTickerCycleDuration,
  mergeTickerConfig,
  nearestSpeedPreset,
  tickerCycleSeconds,
  applyTickerUniFilter,
  getTickerPaletteForUni,
  type TickerConfig,
} from './ticker-config';
export {
  DEFAULT_LAYOUT_ID,
  TICKER_LAYOUTS,
  getTickerLayoutMeta,
  isLightTickerLayout,
  switchTickerLayout,
  type TickerLayoutId,
} from './layouts';
export {
  filterTickerItems,
  inferTickerUni,
  isTickerUniFilter,
  TICKER_UNI_FILTERS,
  type TickerUniFilter,
} from './utils';

export { prepareTickerFeed, resolveItemUni, resolveTickerHref } from '@/lib/ticker/feed';
