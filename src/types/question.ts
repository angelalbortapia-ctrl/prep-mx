export type OpcionId = 'A' | 'B' | 'C' | 'D' | 'E';

export interface QuestionOption {
  id: OpcionId;
  texto: string;
  /** URL CDN resuelta para diagrama en la opción (opcional). */
  imagenUrl?: string | null;
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
  /** URL CDN del diagrama del enunciado (Bunny.net). */
  imagenUrl?: string | null;
  /** URL CDN en la explicación post-respuesta. */
  explicacionImagenUrl?: string | null;
  /** Embed Bunny Stream para video explicativo. */
  explicacionVideoUrl?: string | null;
}

export type QuestionCardState = 'idle' | 'selected' | 'correct' | 'error';
