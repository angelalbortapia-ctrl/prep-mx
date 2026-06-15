export interface UniBentoStats {
  acceptanceRate?: string;
  acceptanceLabel?: string;
  flagshipCareer: string;
  flagshipCutoff: string;
  competitionNote: string;
  environmentNote?: string;
}

export const LANDING_BENTO_STATS: Record<'unam' | 'ipn' | 'uam', UniBentoStats> = {
  unam: {
    acceptanceRate: '9%',
    acceptanceLabel: 'Tasa de aceptación UNAM',
    flagshipCareer: 'Medicina (Ciudad Universitaria)',
    flagshipCutoff: '111 aciertos oficiales',
    competitionNote: 'Corte cerrado en convocatoria reciente — margen de error mínimo',
  },
  ipn: {
    flagshipCareer: 'Ingeniería en Inteligencia Artificial',
    flagshipCutoff: 'Cortes superiores a 100 aciertos',
    competitionNote: 'Demanda altísima en carreras STEM de vanguardia',
    environmentNote: 'Examen 100% digital en línea',
  },
  uam: {
    flagshipCareer: 'Medicina (CAD Xochimilco)',
    flagshipCutoff: '88 puntos totales históricos',
    competitionNote: '70% promedio de bachillerato · 30% examen escrito',
    environmentNote: 'Examen de Selección en Línea',
  },
};

/** Puntaje total histórico requerido para Medicina UAM (escala 0–100). */
export const UAM_MEDICINA_TOTAL_SCORE = 88;

/** Puntos máximos del promedio de bachillerato (70% del puntaje total). */
export const UAM_BACHILLERATO_MAX_POINTS = 30;

/** Puntos máximos del examen escrito (30% del puntaje total = 70 reactivos). */
export const UAM_EXAMEN_MAX_POINTS = 70;

export function uamBachilleratoPoints(promedio: number): number {
  const clamped = Math.min(10, Math.max(0, promedio));
  return Math.min(UAM_BACHILLERATO_MAX_POINTS, Math.round(clamped * 3 * 10) / 10);
}

export function uamExamReactivosNeeded(
  promedio: number,
  totalRequired = UAM_MEDICINA_TOTAL_SCORE
): number {
  const bachillerato = uamBachilleratoPoints(promedio);
  const puntosExamen = Math.max(0, totalRequired - bachillerato);
  const reactivos = Math.ceil((puntosExamen / UAM_EXAMEN_MAX_POINTS) * 120);
  return Math.min(120, reactivos);
}
