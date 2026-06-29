import type { TickerItem } from '@/data/ticker/types';
import type { TickerUniFilter } from '@/data/ticker/utils';
import type { TickerConfig } from '@/data/ticker/ticker-config';
import type { TickerPlacement } from './TickerShared';

export interface TickerViewProps {
  items: TickerItem[];
  filter: TickerUniFilter;
  onFilterChange: (filter: TickerUniFilter) => void;
  paused: boolean;
  onTogglePause: () => void;
  radarHref: string;
  config: TickerConfig;
  previewMode?: boolean;
  hasMobileCta?: boolean;
  placement?: TickerPlacement;
}
