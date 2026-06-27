export type TickerLayoutId =
  | 'neon-cyber'
  | 'bloomberg'
  | 'minimal-clean'
  | 'glass-float'
  | 'terminal-hacker'
  | 'newspaper'
  | 'dual-lane'
  | 'card-stream'
  | 'sunset-vibe'
  | 'retro-vhs'
  | 'unam-gold'
  | 'ipn-guinda'
  | 'spotlight'
  | 'stock-tape'
  | 'neon-outline'
  | 'corporate-navy'
  | 'aurora'
  | 'stadium-led';

export interface TickerLayoutMeta {
  id: TickerLayoutId;
  name: string;
  tagline: string;
  previewGradient: string;
  defaults: Record<string, string | number | boolean>;
}

export const TICKER_LAYOUTS: TickerLayoutMeta[] = [
  {
    id: 'neon-cyber',
    name: 'Neon Cyber',
    tagline: 'Cian/fucsia glow — estilo futurista',
    previewGradient: 'linear-gradient(90deg,#22d3ee,#e879f9)',
    defaults: {
      accentPrimary: '#22d3ee',
      accentSecondary: '#e879f9',
      background: '#050510',
      borderColor: '#06b6d4',
      badgeTextColor: '#67e8f9',
      itemTextColor: '#fae8ff',
      glowOpacity: 0.15,
      borderStyle: 'glow',
      scanlines: true,
      blurBackdrop: false,
    },
  },
  {
    id: 'bloomberg',
    name: 'Bloomberg',
    tagline: 'Terminal oscura con acento naranja',
    previewGradient: 'linear-gradient(90deg,#ff6600,#1a1a1a)',
    defaults: {
      accentPrimary: '#ff6600',
      accentSecondary: '#ffb347',
      background: '#080808',
      borderColor: '#ff6600',
      badgeTextColor: '#fdba74',
      itemTextColor: '#d4d4d8',
      glowOpacity: 0.08,
      borderStyle: 'solid',
      scanlines: true,
      blurBackdrop: false,
    },
  },
  {
    id: 'minimal-clean',
    name: 'Minimal',
    tagline: 'Línea limpia sobre fondo claro',
    previewGradient: 'linear-gradient(90deg,#f8fafc,#e2e8f0)',
    defaults: {
      accentPrimary: '#1e3a8a',
      accentSecondary: '#64748b',
      background: '#ffffff',
      borderColor: '#e2e8f0',
      badgeTextColor: '#64748b',
      itemTextColor: '#1e293b',
      glowOpacity: 0,
      borderStyle: 'solid',
      scanlines: false,
      blurBackdrop: false,
      fontSize: 'sm',
    },
  },
  {
    id: 'glass-float',
    name: 'Glass',
    tagline: 'Cristal esmerilado flotante',
    previewGradient: 'linear-gradient(90deg,rgba(255,255,255,0.8),rgba(148,163,184,0.4))',
    defaults: {
      accentPrimary: '#6366f1',
      accentSecondary: '#a5b4fc',
      background: 'rgba(255,255,255,0.72)',
      borderColor: '#c7d2fe',
      badgeTextColor: '#4338ca',
      itemTextColor: '#1e293b',
      glowOpacity: 0.05,
      borderStyle: 'solid',
      scanlines: false,
      blurBackdrop: true,
    },
  },
  {
    id: 'terminal-hacker',
    name: 'Matrix',
    tagline: 'Verde fosforescente terminal',
    previewGradient: 'linear-gradient(90deg,#22c55e,#000000)',
    defaults: {
      accentPrimary: '#22c55e',
      accentSecondary: '#4ade80',
      background: '#000000',
      borderColor: '#166534',
      badgeTextColor: '#86efac',
      itemTextColor: '#bbf7d0',
      glowOpacity: 0.12,
      borderStyle: 'solid',
      scanlines: true,
      blurBackdrop: false,
      fontSize: 'xs',
    },
  },
  {
    id: 'newspaper',
    name: 'Extra Extra',
    tagline: 'Periódico editorial urgente',
    previewGradient: 'linear-gradient(90deg,#f4efe4,#78716c)',
    defaults: {
      accentPrimary: '#1c1917',
      accentSecondary: '#78716c',
      background: '#f4efe4',
      borderColor: '#1c1917',
      badgeTextColor: '#44403c',
      itemTextColor: '#1c1917',
      glowOpacity: 0,
      borderStyle: 'solid',
      scanlines: false,
      blurBackdrop: false,
      fontSize: 'md',
      roundedTrack: false,
    },
  },
  {
    id: 'dual-lane',
    name: 'Dual Lane',
    tagline: 'Alertas arriba · feed abajo',
    previewGradient: 'linear-gradient(180deg,#ef4444,#0a0a0a)',
    defaults: {
      accentPrimary: '#ef4444',
      accentSecondary: '#f97316',
      background: '#0a0a0a',
      borderColor: '#ef4444',
      badgeTextColor: '#fca5a5',
      itemTextColor: '#e5e5e5',
      glowOpacity: 0.1,
      borderStyle: 'solid',
      barHeight: '4rem',
      scanlines: false,
      blurBackdrop: false,
    },
  },
  {
    id: 'card-stream',
    name: 'Cards',
    tagline: 'Chips grandes legibles',
    previewGradient: 'linear-gradient(90deg,#6366f1,#f8fafc)',
    defaults: {
      accentPrimary: '#6366f1',
      accentSecondary: '#818cf8',
      background: '#f1f5f9',
      borderColor: '#cbd5e1',
      badgeTextColor: '#475569',
      itemTextColor: '#0f172a',
      glowOpacity: 0,
      borderStyle: 'solid',
      itemGap: 'wide',
      roundedTrack: true,
      barHeight: '3.25rem',
      scanlines: false,
      blurBackdrop: false,
    },
  },
  {
    id: 'sunset-vibe',
    name: 'Sunset',
    tagline: 'Gradiente cálido atardecer',
    previewGradient: 'linear-gradient(90deg,#7c2d12,#db2777,#7c3aed)',
    defaults: {
      accentPrimary: '#fb923c',
      accentSecondary: '#f472b6',
      background: '#1a0a2e',
      borderColor: '#db2777',
      badgeTextColor: '#fdba74',
      itemTextColor: '#fce7f3',
      glowOpacity: 0.2,
      borderStyle: 'gradient',
      scanlines: false,
      blurBackdrop: false,
    },
  },
  {
    id: 'retro-vhs',
    name: 'Retro VHS',
    tagline: 'Rosa/cian con scanlines 80s',
    previewGradient: 'linear-gradient(90deg,#ff00ff,#00ffff,#ff00ff)',
    defaults: {
      accentPrimary: '#ff00ff',
      accentSecondary: '#00ffff',
      background: '#12001a',
      borderColor: '#ff00ff',
      badgeTextColor: '#67e8f9',
      itemTextColor: '#f0abfc',
      glowOpacity: 0.18,
      borderStyle: 'glow',
      scanlines: true,
      blurBackdrop: false,
      fontSize: 'xs',
    },
  },
  {
    id: 'unam-gold',
    name: 'UNAM Oro',
    tagline: 'Azul marino y oro puma',
    previewGradient: 'linear-gradient(90deg,#003b71,#f59e0b)',
    defaults: {
      accentPrimary: '#f59e0b',
      accentSecondary: '#fbbf24',
      background: '#001a33',
      borderColor: '#003b71',
      badgeTextColor: '#fcd34d',
      itemTextColor: '#e2e8f0',
      glowOpacity: 0.1,
      borderStyle: 'solid',
      scanlines: false,
      blurBackdrop: false,
    },
  },
  {
    id: 'ipn-guinda',
    name: 'IPN Guinda',
    tagline: 'Guinda y blanco politécnico',
    previewGradient: 'linear-gradient(90deg,#6b0f1a,#ffffff)',
    defaults: {
      accentPrimary: '#dc2626',
      accentSecondary: '#f87171',
      background: '#1a0508',
      borderColor: '#991b1b',
      badgeTextColor: '#fca5a5',
      itemTextColor: '#f5f5f5',
      glowOpacity: 0.08,
      borderStyle: 'solid',
      scanlines: false,
      blurBackdrop: false,
      uppercaseBadges: true,
    },
  },
  {
    id: 'spotlight',
    name: 'Spotlight',
    tagline: 'Una señal a la vez, rotación lenta',
    previewGradient: 'linear-gradient(90deg,#0f172a,#334155)',
    defaults: {
      accentPrimary: '#38bdf8',
      accentSecondary: '#818cf8',
      background: '#0f172a',
      borderColor: '#334155',
      badgeTextColor: '#7dd3fc',
      itemTextColor: '#f1f5f9',
      glowOpacity: 0.12,
      borderStyle: 'solid',
      scanlines: false,
      blurBackdrop: false,
      showUniFilters: false,
      barHeight: '3.25rem',
      fontSize: 'md',
    },
  },
  {
    id: 'stock-tape',
    name: 'Stock Tape',
    tagline: 'Cinta clásica con separadores',
    previewGradient: 'linear-gradient(90deg,#111827,#374151)',
    defaults: {
      accentPrimary: '#10b981',
      accentSecondary: '#34d399',
      background: '#111827',
      borderColor: '#374151',
      badgeTextColor: '#6ee7b7',
      itemTextColor: '#d1d5db',
      glowOpacity: 0,
      borderStyle: 'solid',
      scanlines: false,
      blurBackdrop: false,
      fontSize: 'xs',
      showItemBadges: true,
    },
  },
  {
    id: 'neon-outline',
    name: 'Neon Outline',
    tagline: 'Texto hueco con brillo perimetral',
    previewGradient: 'linear-gradient(90deg,#000,#22d3ee)',
    defaults: {
      accentPrimary: '#22d3ee',
      accentSecondary: '#a78bfa',
      background: '#030712',
      borderColor: '#22d3ee',
      badgeTextColor: '#22d3ee',
      itemTextColor: '#22d3ee',
      glowOpacity: 0.35,
      borderStyle: 'glow',
      scanlines: false,
      blurBackdrop: false,
      showItemBadges: false,
    },
  },
  {
    id: 'corporate-navy',
    name: 'Corporate',
    tagline: 'Azul corporativo sobrio',
    previewGradient: 'linear-gradient(90deg,#1e3a8a,#eff6ff)',
    defaults: {
      accentPrimary: '#1d4ed8',
      accentSecondary: '#60a5fa',
      background: '#ffffff',
      borderColor: '#bfdbfe',
      badgeTextColor: '#1e40af',
      itemTextColor: '#1e293b',
      glowOpacity: 0,
      borderStyle: 'solid',
      scanlines: false,
      blurBackdrop: false,
      fontSize: 'sm',
    },
  },
  {
    id: 'aurora',
    name: 'Aurora',
    tagline: 'Boreal verde/violeta en movimiento',
    previewGradient: 'linear-gradient(90deg,#134e4a,#312e81,#581c87)',
    defaults: {
      accentPrimary: '#34d399',
      accentSecondary: '#a78bfa',
      background: '#0f172a',
      borderColor: '#6366f1',
      badgeTextColor: '#6ee7b7',
      itemTextColor: '#e0e7ff',
      glowOpacity: 0.22,
      borderStyle: 'glow',
      scanlines: false,
      blurBackdrop: true,
    },
  },
  {
    id: 'stadium-led',
    name: 'Stadium LED',
    tagline: 'Tablero deportivo verde LED',
    previewGradient: 'linear-gradient(90deg,#052e16,#14532d)',
    defaults: {
      accentPrimary: '#4ade80',
      accentSecondary: '#86efac',
      background: '#052e16',
      borderColor: '#166534',
      badgeTextColor: '#bbf7d0',
      itemTextColor: '#dcfce7',
      glowOpacity: 0.15,
      borderStyle: 'solid',
      scanlines: true,
      blurBackdrop: false,
      fontSize: 'md',
      uppercaseBadges: true,
      barHeight: '3.25rem',
    },
  },
];

export const DEFAULT_LAYOUT_ID: TickerLayoutId = 'neon-cyber';

const LIGHT_LAYOUTS = new Set<TickerLayoutId>([
  'minimal-clean',
  'glass-float',
  'card-stream',
  'newspaper',
  'corporate-navy',
]);

export function isLightTickerLayout(id: TickerLayoutId): boolean {
  return LIGHT_LAYOUTS.has(id);
}

export function isTickerLayoutId(value: string): value is TickerLayoutId {
  return TICKER_LAYOUTS.some((l) => l.id === value);
}

export function getTickerLayoutMeta(id: TickerLayoutId): TickerLayoutMeta {
  return TICKER_LAYOUTS.find((l) => l.id === id) ?? TICKER_LAYOUTS[0];
}

export function getLayoutDefaults(id: TickerLayoutId): Record<string, string | number | boolean> {
  return getTickerLayoutMeta(id).defaults;
}

export function switchTickerLayout(
  current: import('./ticker-config').TickerConfig,
  layoutId: TickerLayoutId,
  resetColors: boolean
): import('./ticker-config').TickerConfig {
  const layoutDefaults = getLayoutDefaults(layoutId);
  if (resetColors) {
    return {
      ...current,
      ...layoutDefaults,
      layoutId,
      brandLabel: current.brandLabel,
      speedMultiplier: current.speedMultiplier,
      showUniFilters: current.showUniFilters,
      showLiveBadge: current.showLiveBadge,
      showSimularLink: current.showSimularLink,
      showPauseButton: current.showPauseButton,
      pauseOnHover: current.pauseOnHover,
    };
  }
  return { ...current, layoutId };
}
