import { cn } from '@/lib/utils';

/**
 * PrepMX — paleta de 3 roles
 *
 * 1. Confianza (base): slate-900 + acentos indigo-600 — autoridad, calma pre-examen.
 * 2. Conversión (dopamina): violet-600 — SOLO CTAs de registro / compra Pro.
 * 3. Semáforo (métricas): emerald / amber / rose — dashboard y diagnósticos.
 */

export type MetricStatus = 'mastered' | 'review' | 'critical';

/** ≥80 % dominado · 60–79 % repasar · <60 % crítico */
export function scoreToMetricStatus(scorePercent: number): MetricStatus {
  if (scorePercent >= 80) return 'mastered';
  if (scorePercent >= 60) return 'review';
  return 'critical';
}

/** Confianza — fondos oscuros y acentos de marca (no conversión). */
export const trust = {
  surface: 'bg-slate-900 text-slate-50',
  surfaceMuted: 'bg-slate-900/90 text-slate-100',
  accent: 'text-indigo-600 dark:text-indigo-400',
  accentSoft: 'text-indigo-600/90 dark:text-indigo-300',
  accentBg: 'bg-indigo-600 text-white',
  accentBgSoft: 'bg-indigo-600/10 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300',
  accentBorder: 'border-indigo-600/30 dark:border-indigo-500/40',
  ring: 'focus-visible:ring-indigo-500',
  link: 'font-semibold text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-400',
} as const;

/** Conversión — reservado para botones que generan registro o ingreso. */
export const conversion = {
  cta: cn(
    'border-0 bg-violet-600 font-bold text-white shadow-md shadow-violet-600/25',
    'hover:bg-violet-700',
    'focus-visible:ring-violet-500'
  ),
  ctaSubtle: cn(
    'border border-violet-600/40 bg-violet-600/10 font-semibold text-violet-800',
    'hover:bg-violet-600/15 dark:text-violet-200'
  ),
} as const;

const METRIC_STATUS_STYLES = {
  mastered: {
    solid: 'bg-emerald-500',
    text: 'text-emerald-500',
    textStrong: 'text-emerald-700 dark:text-emerald-400',
    surface: 'border-emerald-500/30 bg-emerald-500/10',
    surfaceStrong: 'border-emerald-200 bg-emerald-50/90 dark:border-emerald-800 dark:bg-emerald-950/40',
    dot: 'bg-emerald-500',
  },
  review: {
    solid: 'bg-amber-500',
    text: 'text-amber-500',
    textStrong: 'text-amber-700 dark:text-amber-400',
    surface: 'border-amber-500/30 bg-amber-500/10',
    surfaceStrong: 'border-amber-200 bg-amber-50/90 dark:border-amber-800 dark:bg-amber-950/40',
    dot: 'bg-amber-500',
  },
  critical: {
    solid: 'bg-rose-500',
    text: 'text-rose-500',
    textStrong: 'text-rose-700 dark:text-rose-400',
    surface: 'border-rose-500/30 bg-rose-500/10',
    surfaceStrong: 'border-rose-200 bg-rose-50/90 dark:border-rose-800 dark:bg-rose-950/40',
    dot: 'bg-rose-500',
  },
} as const;

export const metricStatus = METRIC_STATUS_STYLES;

export function metricStatusClasses(status: MetricStatus) {
  return METRIC_STATUS_STYLES[status];
}

/** Barra de progreso / integridad según porcentaje. */
export function metricBarTone(scorePercent: number): string {
  return metricStatusClasses(scoreToMetricStatus(scorePercent)).solid;
}

/** Feedback de pregunta en simulador / ráfaga. */
export const examFeedback = {
  correct: cn(
    'border-emerald-500/40 bg-emerald-500/10',
    'text-emerald-800 dark:text-emerald-200'
  ),
  correctSolid: 'border-emerald-500 bg-emerald-500 text-white',
  incorrect: cn(
    'border-rose-500/40 bg-rose-500/10',
    'text-rose-800 dark:text-rose-200'
  ),
  incorrectSolid: 'border-rose-500 bg-rose-500 text-white',
  correctIcon: 'text-emerald-500',
  incorrectIcon: 'text-rose-500',
  reviewIcon: 'text-amber-500',
} as const;

/** Hex para correos HTML (sin Tailwind). */
export const EMAIL_COLORS = {
  trustSurface: '#0f172a',
  trustAccent: '#4f46e5',
  conversion: '#7c3aed',
} as const;
