import type { UniversidadFilter } from '@/lib/university-theme';
import { buildUniVisualCssVars } from '@/lib/uni-visual-identity';

/** Identificador de universidad para el tema dinámico omnichannel. */
export type UniId = 'unam' | 'ipn' | 'uam' | 'todos';

export const UNI_THEME_STORAGE_KEY = 'prepmx-uni-theme';

export interface UniColorTokens {
  /** Hex para referencia y gráficos. */
  primary: string;
  accent: string;
  /** Componentes HSL sin envoltorio `hsl()` — para CSS vars y Tailwind. */
  primaryHsl: string;
  accentHsl: string;
}

export interface UniAnalyticsMeta {
  examName: string;
  region: string;
  cohort: string;
}

export interface UniThemeEntry {
  id: UniId;
  /** Id compatible con imports existentes de `university-theme`. */
  filterId: UniversidadFilter;
  name: string;
  shortLabel: string;
  colors: UniColorTokens;
  slogan: string;
  /** Plantilla de identidad para copy dinámico (ej. "Prepárate para {name}"). */
  identityTemplate: string;
  /** Puntaje mínimo de selección simulado para analytics. */
  cutoffScore: number;
  analytics: UniAnalyticsMeta;
}

/** Convierte `#RRGGBB` a `"H S% L%"` para variables CSS. */
export function hexToHslComponents(hex: string): string {
  const normalized = hex.replace('#', '');
  const r = parseInt(normalized.slice(0, 2), 16) / 255;
  const g = parseInt(normalized.slice(2, 4), 16) / 255;
  const b = parseInt(normalized.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) {
    return `0 0% ${Math.round(l * 100)}%`;
  }

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function entry(
  id: UniId,
  filterId: UniversidadFilter,
  name: string,
  shortLabel: string,
  primary: string,
  accent: string,
  slogan: string,
  identityTemplate: string,
  cutoffScore: number,
  analytics: UniAnalyticsMeta
): UniThemeEntry {
  return {
    id,
    filterId,
    name,
    shortLabel,
    colors: {
      primary,
      accent,
      primaryHsl: hexToHslComponents(primary),
      accentHsl: hexToHslComponents(accent),
    },
    slogan,
    identityTemplate,
    cutoffScore,
    analytics,
  };
}

export const UNI_THEME_CONFIG: Record<UniId, UniThemeEntry> = {
  unam: entry(
    'unam',
    'unam',
    'UNAM',
    'UNAM',
    '#002B49',
    '#D4AF37',
    '¡Goya! Estás a [X] aciertos de ser un Puma',
    '¡Goya! Prepárate para el examen UNAM con simulacros reales',
    105,
    { examName: 'Examen de Ingreso UNAM', region: 'CDMX', cohort: '2026' }
  ),
  ipn: entry(
    'ipn',
    'ipn',
    'IPN',
    'IPN',
    '#6A1B29',
    '#E2E8F0',
    '¡Huélum! Ciencia y tecnología bajo presión',
    '¡Huélum! Entrena bajo presión como en el examen IPN',
    98,
    { examName: 'Examen de Admisión IPN', region: 'CDMX', cohort: '2026' }
  ),
  uam: entry(
    'uam',
    'uam',
    'UAM',
    'UAM',
    '#F05454',
    '#111111',
    'Casa abierta al tiempo',
    'Casa abierta al tiempo — domina el examen UAM',
    92,
    { examName: 'Examen de Ingreso UAM', region: 'CDMX', cohort: '2026' }
  ),
  todos: entry(
    'todos',
    'todas',
    'Todo en uno',
    'TODOS',
    '#1D4ED8',
    '#8B5CF6',
    'PrepMX — preparación universal',
    'Enfoque SaaS: UNAM, IPN y UAM en una sola suscripción',
    100,
    { examName: 'Diagnóstico Multi-Universidad', region: 'MX', cohort: '2026' }
  ),
};

export const UNI_IDS = Object.keys(UNI_THEME_CONFIG) as UniId[];

export function isUniId(raw: string | null | undefined): raw is UniId {
  return raw === 'unam' || raw === 'ipn' || raw === 'uam' || raw === 'todos';
}

/** Convierte query param `uni` (incluye alias `todas`) a UniId. */
export function parseUniId(raw?: string | null): UniId {
  if (raw === 'todas') return 'todos';
  if (isUniId(raw)) return raw;
  return 'unam';
}

export function uniIdToFilter(id: UniId): UniversidadFilter {
  return UNI_THEME_CONFIG[id].filterId;
}

export function filterToUniId(filter: UniversidadFilter): UniId {
  if (filter === 'todas') return 'todos';
  return filter;
}

export function getUniThemeEntry(id: UniId): UniThemeEntry {
  return UNI_THEME_CONFIG[id];
}

/** Variables CSS inyectadas en `<html>` por el provider. */
export const UNI_CSS_VARS = [
  '--uni-primary',
  '--uni-accent',
  '--uni-primary-foreground',
  '--uni-cutoff-score',
  '--radius',
  '--uni-card-shadow',
] as const;

export function buildUniCssVars(entry: UniThemeEntry): Record<string, string> {
  const visualVars = buildUniVisualCssVars(entry.id);
  const fg = '0 0% 100%';
  return {
    ...visualVars,
    '--uni-primary': entry.colors.primaryHsl,
    '--uni-accent': entry.colors.accentHsl,
    '--uni-primary-foreground': fg,
    '--uni-cutoff-score': String(entry.cutoffScore),
  };
}
