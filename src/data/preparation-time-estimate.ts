import {
  UNIVERSIDAD_LANDING_CONFIG,
  type UniversidadLandingId,
} from '@/data/universidad-landing-config';

export type StudyIntensity = 'mantenimiento' | 'aspirante' | 'bestia';

export type FatigueLevel = 'minima' | 'optima' | 'critica';

export interface IntensityModeConfig {
  id: StudyIntensity;
  tabLabel: string;
  minutesPerDay: number;
  baseWeeks: number;
  baseDailyReactivos: number;
  fatigueLevel: FatigueLevel;
  fatigueBadge: string;
}

export interface CombatTelemetry {
  intensidad: StudyIntensity;
  universidad: UniversidadLandingId;
  weeks: number;
  readyLabel: string;
  dailyReactivos: number;
  dailyLabel: string;
  fatigueLevel: FatigueLevel;
  fatigueBadge: string;
  minutesPerDay: number;
}

export const INTENSITY_MODES: IntensityModeConfig[] = [
  {
    id: 'mantenimiento',
    tabLabel: '⚡ Mantenimiento',
    minutesPerDay: 15,
    baseWeeks: 24,
    baseDailyReactivos: 15,
    fatigueLevel: 'minima',
    fatigueBadge: 'Mínima (Ideal para constancia)',
  },
  {
    id: 'aspirante',
    tabLabel: '🔥 Aspirante',
    minutesPerDay: 45,
    baseWeeks: 12,
    baseDailyReactivos: 45,
    fatigueLevel: 'optima',
    fatigueBadge: 'Óptima (Ritmo recomendado)',
  },
  {
    id: 'bestia',
    tabLabel: '💀 Modo Bestia',
    minutesPerDay: 120,
    baseWeeks: 4,
    baseDailyReactivos: 120,
    fatigueLevel: 'critica',
    fatigueBadge: 'Crítica (Sprint de emergencia)',
  },
];

const REFERENCE_REACTIVOS = 120;

/** Cruza universidad activa + intensidad para telemetría de combate. */
export function getCombatTelemetry(
  intensidad: StudyIntensity,
  universidad: UniversidadLandingId
): CombatTelemetry {
  const mode = INTENSITY_MODES.find((m) => m.id === intensidad)!;
  const uniCfg = UNIVERSIDAD_LANDING_CONFIG[universidad];
  const loadFactor = uniCfg.reactivos / REFERENCE_REACTIVOS;

  const weeks = Math.max(1, Math.round(mode.baseWeeks * loadFactor));
  const dailyReactivos = Math.max(1, Math.round(mode.baseDailyReactivos * loadFactor));

  return {
    intensidad,
    universidad,
    weeks,
    readyLabel: `Listo en ${weeks} Semanas`,
    dailyReactivos,
    dailyLabel: `${dailyReactivos} reactivos/día`,
    fatigueLevel: mode.fatigueLevel,
    fatigueBadge: mode.fatigueBadge,
    minutesPerDay: mode.minutesPerDay,
  };
}

export const FATIGUE_STYLES: Record<
  FatigueLevel,
  { badge: string; dot: string; pulse?: boolean }
> = {
  minima: {
    badge: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-400',
    dot: 'bg-emerald-500',
  },
  optima: {
    badge: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-400',
    dot: 'bg-sky-500',
  },
  critica: {
    badge: 'border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-700 dark:bg-rose-950 dark:text-rose-400',
    dot: 'bg-rose-500',
    pulse: true,
  },
};
