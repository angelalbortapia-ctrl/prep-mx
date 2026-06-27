import { DEFAULT_TICKER_CONFIG, mergeTickerConfig, type TickerConfig } from '@/data/ticker/ticker-config';

/** Sincroniza variables CSS globales usadas por padding de marketing y demo bar. */
export function applyTickerDocumentVars(config: Partial<TickerConfig> = DEFAULT_TICKER_CONFIG): void {
  if (typeof document === 'undefined') return;
  const merged = mergeTickerConfig(config);
  const root = document.documentElement;

  root.style.setProperty('--ticker-height', merged.barHeight);
  root.style.setProperty(
    '--ticker-uni-filter-height',
    merged.showUniFilters ? '1.75rem' : '0px'
  );

  if (merged.showUniFilters) {
    root.dataset.tickerUniFilters = 'true';
  } else {
    delete root.dataset.tickerUniFilters;
  }
}
