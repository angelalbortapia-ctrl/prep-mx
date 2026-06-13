export type OpcionId = 'A' | 'B' | 'C' | 'D' | 'E';

export interface QuestionOption {
  id: OpcionId;
  texto: string;
}

export interface Question {
  id: string;
  materia: string;
  tema: string;
  pregunta: string;
  opciones: QuestionOption[];
  opcion_correcta: OpcionId;
  explicacion: string;
  dificultad?: 'easy' | 'medium' | 'hard';
}

export type QuestionCardState = 'idle' | 'selected' | 'correct' | 'error';
