export type RiskLevel = 'bajo' | 'medio' | 'alto';

export interface CareerCutoff {
  id: string;
  label: string;
  universidad: 'unam' | 'ipn' | 'uam';
  sede: string;
  cutoffScore: number;
  demanda: RiskLevel;
}

export const CAREER_CUTOFFS: CareerCutoff[] = [
  { id: 'unam-med-cu', label: 'Medicina', universidad: 'unam', sede: 'Ciudad Universitaria', cutoffScore: 111, demanda: 'alto' },
  { id: 'unam-ingenieria-cu', label: 'Ingeniería', universidad: 'unam', sede: 'Ciudad Universitaria', cutoffScore: 108, demanda: 'alto' },
  { id: 'unam-psicologia-cu', label: 'Psicología', universidad: 'unam', sede: 'Ciudad Universitaria', cutoffScore: 106, demanda: 'medio' },
  { id: 'unam-derecho-cu', label: 'Derecho', universidad: 'unam', sede: 'Ciudad Universitaria', cutoffScore: 105, demanda: 'medio' },
  { id: 'ipn-ia-zac', label: 'Ingeniería en Inteligencia Artificial', universidad: 'ipn', sede: 'Zacatenco', cutoffScore: 103, demanda: 'alto' },
  { id: 'ipn-medicina-zac', label: 'Medicina', universidad: 'ipn', sede: 'Zacatenco', cutoffScore: 102, demanda: 'alto' },
  { id: 'ipn-ingenieria-zac', label: 'Ingeniería en Sistemas', universidad: 'ipn', sede: 'Zacatenco', cutoffScore: 98, demanda: 'medio' },
  { id: 'uam-medicina-cad', label: 'Medicina', universidad: 'uam', sede: 'CAD Xochimilco', cutoffScore: 88, demanda: 'alto' },
  { id: 'uam-biologia-csh', label: 'Biología', universidad: 'uam', sede: 'CSH Azcapotzalco', cutoffScore: 85, demanda: 'medio' },
  { id: 'uam-economia-csh', label: 'Economía', universidad: 'uam', sede: 'CSH Azcapotzalco', cutoffScore: 78, demanda: 'bajo' },
];

export function getCareerById(id: string): CareerCutoff | undefined {
  return CAREER_CUTOFFS.find((c) => c.id === id);
}

export function riskBadgeClass(level: RiskLevel): string {
  if (level === 'bajo') return 'bg-green-100 text-green-800 border-green-200';
  if (level === 'medio') return 'bg-amber-100 text-amber-800 border-amber-200';
  return 'bg-red-100 text-red-800 border-red-200';
}

export function riskLabel(level: RiskLevel): string {
  if (level === 'bajo') return 'Demanda baja';
  if (level === 'medio') return 'Demanda media';
  return 'Demanda alta';
}

/** Segmentación de riesgo por puntaje de corte histórico (MetaScore UI). */
export type CutoffRiskTier = 'extremo' | 'alto' | 'moderado';

export function getCutoffRiskTier(cutoffScore: number): CutoffRiskTier {
  if (cutoffScore >= 105) return 'extremo';
  if (cutoffScore >= 85) return 'alto';
  return 'moderado';
}

export function cutoffRiskBadgeClass(cutoffScore: number): string {
  const tier = getCutoffRiskTier(cutoffScore);
  if (tier === 'extremo') {
    return 'bg-destructive/10 text-destructive border-destructive/30';
  }
  if (tier === 'alto') {
    return 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/50 dark:text-amber-200 dark:border-amber-800';
  }
  return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-800';
}

export function cutoffRiskLabel(cutoffScore: number): string {
  const tier = getCutoffRiskTier(cutoffScore);
  if (tier === 'extremo') {
    return 'Riesgo Extremo: Menos del 2% de aceptación. Margen de error mínimo';
  }
  if (tier === 'alto') {
    return 'Riesgo Alto: Competencia severa. Requiere optimización de puntos débiles';
  }
  return 'Riesgo Moderado: Consistencia académica requerida';
}
