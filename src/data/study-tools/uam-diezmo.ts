/** Simulador del diezmo UAM — fórmula oficial escala 1,000 pts. */

export interface UamCareerCutoff {
  id: string;
  name: string;
  division: string;
  unidad: string;
  /** Puntaje mínimo histórico aproximado (escala 0–1,000). */
  cutoffPoints: number;
}

export const UAM_EXAM_QUESTIONS = 120;

/** Cortes reales alineados con la base del ticker de admisión. */
export const UAM_CAREER_CUTOFFS: UamCareerCutoff[] = [
  { id: 'xoch-medicina', name: 'Medicina', division: 'CBS', unidad: 'Xochimilco', cutoffPoints: 806 },
  { id: 'xoch-estomatologia', name: 'Estomatología', division: 'CBS', unidad: 'Xochimilco', cutoffPoints: 764 },
  { id: 'cuaj-derecho', name: 'Derecho', division: 'CSH', unidad: 'Cuajimalpa', cutoffPoints: 758 },
  { id: 'xoch-enfermeria', name: 'Enfermería', division: 'CBS', unidad: 'Xochimilco', cutoffPoints: 741 },
  { id: 'xoch-nutricion', name: 'Nutrición Humana', division: 'CBS', unidad: 'Xochimilco', cutoffPoints: 738 },
  { id: 'xoch-diseno-ind', name: 'Diseño Industrial', division: 'CAD', unidad: 'Xochimilco', cutoffPoints: 733 },
  { id: 'xoch-diseno-grafico', name: 'Diseño Comunicación Gráfica', division: 'CAD', unidad: 'Xochimilco', cutoffPoints: 727 },
  { id: 'xoch-veterinaria', name: 'Medicina Veterinaria', division: 'CBS', unidad: 'Xochimilco', cutoffPoints: 720 },
  { id: 'xoch-qfb', name: 'Química Farmacéutica Biológica', division: 'CBS', unidad: 'Xochimilco', cutoffPoints: 710 },
  { id: 'xoch-psicologia', name: 'Psicología', division: 'CSH', unidad: 'Xochimilco', cutoffPoints: 701 },
  { id: 'cuaj-computacion', name: 'Ingeniería en Computación', division: 'CBI', unidad: 'Cuajimalpa', cutoffPoints: 675 },
  { id: 'izta-biomedica', name: 'Ingeniería Biomédica', division: 'CBI', unidad: 'Iztapalapa', cutoffPoints: 670 },
  { id: 'azca-diseno-grafico', name: 'Diseño Comunicación Gráfica', division: 'CAD', unidad: 'Azcapotzalco', cutoffPoints: 687 },
  { id: 'azca-fisica', name: 'Ingeniería Física', division: 'CBI', unidad: 'Azcapotzalco', cutoffPoints: 655 },
  { id: 'xoch-comunicacion', name: 'Comunicación Social', division: 'CSH', unidad: 'Xochimilco', cutoffPoints: 618 },
  { id: 'xoch-economia', name: 'Economía', division: 'CSH', unidad: 'Xochimilco', cutoffPoints: 600 },
];

export interface UamDiezmoResult {
  prepaContribution: number;
  examPointsNeeded: number;
  correctAnswersNeeded: number;
  correctAnswersRounded: number;
  percentageNeeded: number;
  margin: number;
  feasible: boolean;
  projectedFinalScore: number;
  message: string;
}

/**
 * Fórmula oficial UAM (escala 1,000):
 * Puntaje = (Promedio prepa × 30) + (% aciertos × 7)
 * Máx. prepa: 300 pts · Máx. examen: 700 pts (100 % aciertos).
 */
export function calculateUamDiezmo(
  prepaAverage: number,
  cutoffPoints: number,
  totalQuestions = UAM_EXAM_QUESTIONS
): UamDiezmoResult {
  const prepa = Math.min(10, Math.max(6, prepaAverage));
  const prepaContribution = prepa * 30;
  const examPointsNeeded = Math.max(0, cutoffPoints - prepaContribution);
  const percentageNeeded = examPointsNeeded / 7;
  const correctAnswersNeeded = (percentageNeeded / 100) * totalQuestions;
  const correctAnswersRounded = Math.min(
    totalQuestions,
    Math.ceil(Math.max(0, correctAnswersNeeded))
  );
  const margin = totalQuestions - correctAnswersRounded;
  const feasible = examPointsNeeded <= 700 && percentageNeeded <= 100;

  const projectedFinalScore =
    prepaContribution + (correctAnswersRounded / totalQuestions) * 100 * 7;

  let message: string;
  if (!feasible && examPointsNeeded > 700) {
    message =
      'Con ese promedio de prepa, el puntaje del examen requerido supera el máximo posible (700 pts). Sube tu promedio o elige otra carrera.';
  } else if (margin <= 5) {
    message = `¡Meta ajustada! Solo puedes fallar ~${Math.max(0, margin)} reactivos.`;
  } else if (prepaContribution >= cutoffPoints * 0.35) {
    message = 'Tu prepa ya aporta una base sólida; el examen sigue siendo decisivo.';
  } else {
    message = `Necesitas ${correctAnswersRounded} de ${totalQuestions} aciertos (${percentageNeeded.toFixed(1)} % del examen).`;
  }

  return {
    prepaContribution,
    examPointsNeeded,
    correctAnswersNeeded,
    correctAnswersRounded,
    percentageNeeded,
    margin,
    feasible,
    projectedFinalScore,
    message,
  };
}
