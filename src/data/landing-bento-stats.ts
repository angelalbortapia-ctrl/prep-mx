import {
  calculateUamDiezmo,
  UAM_EXAM_QUESTIONS,
} from '@/data/study-tools/uam-diezmo';

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
    flagshipCareer: 'Medicina (UAM Xochimilco)',
    flagshipCutoff: '806 pts históricos (escala 1,000)',
    competitionNote: '30% promedio de prepa · 70% examen escrito',
    environmentNote: 'Examen de Selección en Línea',
  },
};

/** Puntaje total histórico Medicina UAM — escala oficial 0–1,000. */
export const UAM_MEDICINA_TOTAL_SCORE = 806;

/** Máximo aporte del promedio de prepa (promedio 10 × 30). */
export const UAM_BACHILLERATO_MAX_POINTS = 300;

/** Máximo aporte del examen (100 % aciertos × 7). */
export const UAM_EXAMEN_MAX_POINTS = 700;

export function uamBachilleratoPoints(promedio: number): number {
  const prepa = Math.min(10, Math.max(0, promedio));
  return prepa * 30;
}

export function uamExamReactivosNeeded(
  promedio: number,
  totalRequired = UAM_MEDICINA_TOTAL_SCORE
): number {
  return calculateUamDiezmo(promedio, totalRequired, UAM_EXAM_QUESTIONS).correctAnswersRounded;
}
