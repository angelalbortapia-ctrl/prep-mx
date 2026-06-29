import {
  ADMISSION_EXAM_REACTIVOS,
  type AdmissionCareer,
} from '@/data/career-admission-cutoffs';

export interface AdmissionSimulatorInput {
  aciertos: number;
  totalReactivos?: number;
  /** Solo UAM — aporte de prepa (×30 en escala 1,000). */
  promedioPrepa?: number;
}

/** Puntaje UAM: (promedio × 30) + (% aciertos × 700). */
export function uamTotalPoints(
  aciertos: number,
  totalReactivos = ADMISSION_EXAM_REACTIVOS,
  promedioPrepa = 9
): number {
  const examShare = Math.max(0, Math.min(1, aciertos / totalReactivos));
  return Math.round(promedioPrepa * 30 + examShare * 700);
}

export function qualifiesForAdmission(
  career: AdmissionCareer,
  input: AdmissionSimulatorInput
): boolean {
  const total = input.totalReactivos ?? ADMISSION_EXAM_REACTIVOS;

  if (career.scoreKind === 'aciertos' && career.minAciertos != null) {
    return input.aciertos >= career.minAciertos;
  }

  if (career.scoreKind === 'puntos' && career.minPuntos != null) {
    const puntos = uamTotalPoints(input.aciertos, total, input.promedioPrepa ?? 9);
    return puntos >= career.minPuntos;
  }

  return false;
}

export function cutoffLabel(career: AdmissionCareer): string {
  if (career.minAciertos != null) {
    return `${career.minAciertos} aciertos mín.`;
  }
  if (career.minPuntos != null) {
    return `${career.minPuntos} pts mín.`;
  }
  return '—';
}

export function gapToCutoff(
  career: AdmissionCareer,
  input: AdmissionSimulatorInput
): number {
  if (career.minAciertos != null) {
    return input.aciertos - career.minAciertos;
  }
  if (career.minPuntos != null) {
    const total = input.totalReactivos ?? ADMISSION_EXAM_REACTIVOS;
    const puntos = uamTotalPoints(input.aciertos, total, input.promedioPrepa ?? 9);
    return puntos - career.minPuntos;
  }
  return 0;
}
