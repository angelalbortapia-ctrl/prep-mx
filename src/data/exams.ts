export interface ExamConfig {
  id: string;
  name: string;
  universidad: 'unam' | 'ipn' | 'uam' | 'general';
  area?: string;
  totalQuestions: number;
  durationMins: number;
  description: string;
  isOfficial?: boolean;
}

export const availableExams: ExamConfig[] = [
  {
    id: 'unam-area2-completo',
    name: 'Simulacro UNAM Área 2 — Completo',
    universidad: 'unam',
    area: 'area2',
    totalQuestions: 120,
    durationMins: 180,
    description: 'Examen completo de 3 horas, 120 reactivos.',
    isOfficial: true,
  },
  {
    id: 'unam-area2-practica',
    name: 'Práctica rápida — 20 preguntas',
    universidad: 'unam',
    area: 'area2',
    totalQuestions: 20,
    durationMins: 30,
    description: 'Diagnóstico corto con feedback inmediato.',
  },
  {
    id: 'ipn-general',
    name: 'Simulacro IPN — General',
    universidad: 'ipn',
    totalQuestions: 100,
    durationMins: 150,
    description: 'Modelo general de ingreso al IPN.',
  },
  {
    id: 'uam-general',
    name: 'Simulacro UAM — General',
    universidad: 'uam',
    totalQuestions: 80,
    durationMins: 120,
    description: 'Práctica para examen UAM.',
  },
];

export function getExamById(id: string) {
  return availableExams.find((e) => e.id === id);
}
