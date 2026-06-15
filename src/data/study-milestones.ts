export type StudyTabId = 'timeline' | 'guia' | 'flashcards';

export const STUDY_TAB_IDS: StudyTabId[] = ['timeline', 'guia', 'flashcards'];

export function parseStudyTab(raw: string | null | undefined): StudyTabId {
  if (raw === 'timeline' || raw === 'guia' || raw === 'flashcards') return raw;
  return 'timeline';
}

export interface StudyMilestone {
  id: string;
  title: string;
  description: string;
  /** Pregunta del quiz que debe acertarse para marcar dominado. */
  quizQuestionId: string;
  emoji: string;
}

/** Hitos gamificados por materia (ruta de misiones). */
export const studyMilestonesBySlug: Record<string, StudyMilestone[]> = {
  matematicas: [
    {
      id: 'm1',
      title: 'Fundamentos cuadráticos',
      description: 'Identifica $a$, $b$, $c$ y el discriminante.',
      quizQuestionId: 'mat-q1',
      emoji: '🎯',
    },
    {
      id: 'm2',
      title: 'Fórmula general',
      description: 'Aplica $x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$ sin errores de signo.',
      quizQuestionId: 'mat-q2',
      emoji: '⚡',
    },
    {
      id: 'm3',
      title: 'Dominio del tema',
      description: 'Resuelve problemas de contexto con interpretación gráfica.',
      quizQuestionId: 'mat-q3',
      emoji: '🏆',
    },
  ],
  fisica: [
    {
      id: 'f1',
      title: 'Cinemática básica',
      description: 'Velocidad, aceleración y gráficas $s$-$t$.',
      quizQuestionId: 'fis-q1',
      emoji: '🚀',
    },
    {
      id: 'f2',
      title: 'Fuerzas y Newton',
      description: 'Diagrama de cuerpo libre y suma de fuerzas.',
      quizQuestionId: 'fis-q2',
      emoji: '🧲',
    },
    {
      id: 'f3',
      title: 'Energía y trabajo',
      description: 'Conservación de energía mecánica.',
      quizQuestionId: 'fis-q3',
      emoji: '⚙️',
    },
  ],
  quimica: [
    {
      id: 'q1',
      title: 'Estequiometría I',
      description: 'Moles, masa molar y proporciones.',
      quizQuestionId: 'qui-q1',
      emoji: '⚗️',
    },
    {
      id: 'q2',
      title: 'Balanceo de ecuaciones',
      description: 'Coeficientes estequiométricos correctos.',
      quizQuestionId: 'qui-q2',
      emoji: '🔬',
    },
    {
      id: 'q3',
      title: 'Reactivo limitante',
      description: 'Calcula producto máximo teórico.',
      quizQuestionId: 'qui-q3',
      emoji: '🧪',
    },
  ],
};

export function getStudyMilestones(slug: string): StudyMilestone[] {
  return studyMilestonesBySlug[slug] ?? [];
}
