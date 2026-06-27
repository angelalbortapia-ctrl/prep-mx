import {
  DEFAULT_LAYOUT_ID,
  getLayoutDefaults,
  isTickerLayoutId,
  type TickerLayoutId,
} from './layouts';
import { getUniThemeEntry } from '@/lib/uni-theme-config';

export type TickerFontSize = 'xs' | 'sm' | 'md';
export type TickerItemGap = 'tight' | 'normal' | 'wide';
export type TickerBorderStyle = 'solid' | 'gradient' | 'glow';

export interface TickerConfig {
  layoutId: TickerLayoutId;
  brandLabel: string;
  liveLabel: string;
  simularLabel: string;
  accentPrimary: string;
  accentSecondary: string;
  background: string;
  borderColor: string;
  badgeTextColor: string;
  itemTextColor: string;
  glowOpacity: number;
  speedMultiplier: number;
  fontSize: TickerFontSize;
  itemGap: TickerItemGap;
  barHeight: string;
  borderStyle: TickerBorderStyle;
  showUniFilters: boolean;
  showLiveBadge: boolean;
  showSimularLink: boolean;
  showPauseButton: boolean;
  pauseOnHover: boolean;
  scanlines: boolean;
  blurBackdrop: boolean;
  roundedTrack: boolean;
  showItemBadges: boolean;
  uppercaseBadges: boolean;
}

export const TICKER_SPEED_PRESETS = [
  { id: 'very-slow', label: 'Muy lento', multiplier: 1.8, hint: '~25 min/ciclo' },
  { id: 'slow', label: 'Lento', multiplier: 1.35, hint: '~18 min' },
  { id: 'normal', label: 'Normal', multiplier: 1, hint: '~13 min' },
  { id: 'fast', label: 'Rápido', multiplier: 0.72, hint: '~9 min' },
  { id: 'turbo', label: 'Turbo', multiplier: 0.5, hint: '~6 min' },
] as const;

export const TICKER_COLOR_PRESETS = [
  { id: 'neon', label: 'Neon', primary: '#22d3ee', secondary: '#e879f9', bg: '#050510' },
  { id: 'unam', label: 'UNAM', primary: '#f59e0b', secondary: '#fbbf24', bg: '#0c0a09' },
  { id: 'ipn', label: 'IPN', primary: '#ef4444', secondary: '#f87171', bg: '#0a0a0a' },
  { id: 'uam', label: 'UAM', primary: '#14b8a6', secondary: '#2dd4bf', bg: '#0a0f0e' },
  { id: 'prep', label: 'PrepMX', primary: '#2563eb', secondary: '#38bdf8', bg: '#0f172a' },
] as const;

const BASE_DEFAULTS: TickerConfig = {
  layoutId: DEFAULT_LAYOUT_ID,
  brandLabel: 'PrepMX',
  liveLabel: 'Live',
  simularLabel: 'Simular',
  accentPrimary: '#22d3ee',
  accentSecondary: '#e879f9',
  background: '#050510',
  borderColor: '#06b6d4',
  badgeTextColor: '#67e8f9',
  itemTextColor: '#fae8ff',
  glowOpacity: 0.15,
  speedMultiplier: 1,
  fontSize: 'sm',
  itemGap: 'normal',
  barHeight: '2.75rem',
  borderStyle: 'glow',
  showUniFilters: true,
  showLiveBadge: true,
  showSimularLink: true,
  showPauseButton: true,
  pauseOnHover: true,
  scanlines: true,
  blurBackdrop: false,
  roundedTrack: false,
  showItemBadges: true,
  uppercaseBadges: true,
};

export function mergeTickerConfig(partial?: Partial<TickerConfig>): TickerConfig {
  const layoutId =
    partial?.layoutId && isTickerLayoutId(partial.layoutId)
      ? partial.layoutId
      : partial?.layoutId
        ? DEFAULT_LAYOUT_ID
        : BASE_DEFAULTS.layoutId;
  return {
    ...BASE_DEFAULTS,
    ...getLayoutDefaults(layoutId),
    ...partial,
    layoutId,
  };
}

export const DEFAULT_TICKER_CONFIG: TickerConfig = mergeTickerConfig();

export function tickerCycleSeconds(itemCount: number, speedMultiplier: number): number {
  return Math.max(360, itemCount * 3.5 * speedMultiplier);
}

export function formatTickerCycleDuration(seconds: number): string {
  if (seconds >= 3600) return `~${(seconds / 3600).toFixed(1)} h por ciclo`;
  if (seconds >= 60) return `~${Math.round(seconds / 60)} min por ciclo`;
  return `~${Math.round(seconds)} s por ciclo`;
}

export function nearestSpeedPreset(multiplier: number): string {
  type Preset = (typeof TICKER_SPEED_PRESETS)[number];
  let best: Preset = TICKER_SPEED_PRESETS[2];
  let bestDiff = Math.abs(multiplier - best.multiplier);
  for (const p of TICKER_SPEED_PRESETS) {
    const diff = Math.abs(multiplier - p.multiplier);
    if (diff < bestDiff) {
      best = p;
      bestDiff = diff;
    }
  }
  return best.id;
}

export function itemGapClass(gap: TickerItemGap): string {
  if (gap === 'tight') return 'gap-2';
  if (gap === 'wide') return 'gap-6';
  return 'gap-4';
}

export function fontSizeClasses(size: TickerFontSize): { badge: string; text: string } {
  if (size === 'xs') return { badge: 'text-[7px]', text: 'text-[10px]' };
  if (size === 'md') return { badge: 'text-[9px]', text: 'text-xs' };
  return { badge: 'text-[8px]', text: 'text-[11px]' };
}

export function configToCssVars(config: TickerConfig): Record<string, string> {
  return {
    '--ticker-neon-primary': config.accentPrimary,
    '--ticker-neon-secondary': config.accentSecondary,
    '--ticker-neon-bg': config.background,
    '--ticker-neon-border': config.borderColor,
    '--ticker-neon-badge': config.badgeTextColor,
    '--ticker-neon-text': config.itemTextColor,
    '--ticker-neon-glow': String(config.glowOpacity),
    '--ticker-height': config.barHeight,
  };
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return null;
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

export function glowShadow(config: TickerConfig): string {
  const rgb = hexToRgb(config.accentPrimary);
  if (!rgb || config.glowOpacity <= 0) return 'none';
  const a = config.glowOpacity;
  return `0 0 24px rgba(${rgb.r},${rgb.g},${rgb.b},${a}), 0 -4px 20px rgba(${rgb.r},${rgb.g},${rgb.b},${a * 0.5})`;
}

export function badgeGlow(config: TickerConfig): string {
  const rgb = hexToRgb(config.accentPrimary);
  if (!rgb) return 'none';
  return `0 0 8px rgba(${rgb.r},${rgb.g},${rgb.b},0.85)`;
}

export function isValidHexColor(value: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
}

export function isValidRgbaOrHex(value: string): boolean {
  return isValidHexColor(value) || value.startsWith('rgba(');
}

export function sanitizeTickerConfig(input: Partial<TickerConfig>): Partial<TickerConfig> {
  const out: Partial<TickerConfig> = {};

  if (input.layoutId && isTickerLayoutId(input.layoutId)) out.layoutId = input.layoutId;
  if (typeof input.brandLabel === 'string') {
    out.brandLabel = input.brandLabel.slice(0, 24).trim() || BASE_DEFAULTS.brandLabel;
  }
  if (typeof input.liveLabel === 'string') {
    out.liveLabel = input.liveLabel.slice(0, 16).trim() || BASE_DEFAULTS.liveLabel;
  }
  if (typeof input.simularLabel === 'string') {
    out.simularLabel = input.simularLabel.slice(0, 16).trim() || BASE_DEFAULTS.simularLabel;
  }
  for (const key of ['accentPrimary', 'accentSecondary', 'borderColor', 'badgeTextColor', 'itemTextColor'] as const) {
    const v = input[key];
    if (typeof v === 'string' && isValidHexColor(v)) out[key] = v;
  }
  if (typeof input.background === 'string' && isValidRgbaOrHex(input.background)) {
    out.background = input.background;
  }
  if (typeof input.glowOpacity === 'number') {
    out.glowOpacity = Math.min(1, Math.max(0, input.glowOpacity));
  }
  if (typeof input.speedMultiplier === 'number') {
    out.speedMultiplier = Math.min(2.2, Math.max(0.4, input.speedMultiplier));
  }
  if (input.fontSize === 'xs' || input.fontSize === 'sm' || input.fontSize === 'md') {
    out.fontSize = input.fontSize;
  }
  if (input.itemGap === 'tight' || input.itemGap === 'normal' || input.itemGap === 'wide') {
    out.itemGap = input.itemGap;
  }
  if (input.borderStyle === 'solid' || input.borderStyle === 'gradient' || input.borderStyle === 'glow') {
    out.borderStyle = input.borderStyle;
  }
  if (typeof input.showUniFilters === 'boolean') out.showUniFilters = input.showUniFilters;
  if (typeof input.showLiveBadge === 'boolean') out.showLiveBadge = input.showLiveBadge;
  if (typeof input.showSimularLink === 'boolean') out.showSimularLink = input.showSimularLink;
  if (typeof input.showPauseButton === 'boolean') out.showPauseButton = input.showPauseButton;
  if (typeof input.pauseOnHover === 'boolean') out.pauseOnHover = input.pauseOnHover;
  if (typeof input.scanlines === 'boolean') out.scanlines = input.scanlines;
  if (typeof input.blurBackdrop === 'boolean') out.blurBackdrop = input.blurBackdrop;
  if (typeof input.roundedTrack === 'boolean') out.roundedTrack = input.roundedTrack;
  if (typeof input.showItemBadges === 'boolean') out.showItemBadges = input.showItemBadges;
  if (typeof input.uppercaseBadges === 'boolean') out.uppercaseBadges = input.uppercaseBadges;
  if (typeof input.barHeight === 'string' && ['2.25rem', '2.75rem', '3.25rem', '4rem'].includes(input.barHeight)) {
    out.barHeight = input.barHeight;
  }

  return out;
}

export type TickerUniPaletteId = 'unam' | 'ipn' | 'uam';

/** Paleta del ticker alineada con `uni-theme-config` (colores oficiales). */
export function getTickerPaletteForUni(id: TickerUniPaletteId): Partial<TickerConfig> {
  const entry = getUniThemeEntry(id);
  const primary = entry.colors.primary;
  const accent = entry.colors.accent;

  if (id === 'unam') {
    return {
      accentPrimary: accent,
      accentSecondary: primary,
      background: '#001528',
      borderColor: primary,
      badgeTextColor: accent,
      itemTextColor: '#e2e8f0',
      glowOpacity: 0.14,
    };
  }
  if (id === 'ipn') {
    return {
      accentPrimary: accent,
      accentSecondary: '#f87171',
      background: '#14080c',
      borderColor: primary,
      badgeTextColor: '#fecdd3',
      itemTextColor: '#f1f5f9',
      glowOpacity: 0.1,
    };
  }
  return {
    accentPrimary: primary,
    accentSecondary: accent,
    background: '#0f0a0a',
    borderColor: primary,
    badgeTextColor: primary,
    itemTextColor: '#fafafa',
    glowOpacity: 0.12,
  };
}

/** Aplica colores de la uni; con "all" conserva la config guardada. */
export function applyTickerUniFilter(
  config: TickerConfig,
  filter: 'all' | TickerUniPaletteId
): TickerConfig {
  if (filter === 'all') return config;
  return { ...config, ...getTickerPaletteForUni(filter) };
}
