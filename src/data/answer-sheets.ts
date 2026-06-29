export type AnswerSheetUniId = 'unam' | 'ipn' | 'uam';

export interface AnswerSheetTemplate {
  id: AnswerSheetUniId;
  title: string;
  examName: string;
  totalQuestions: number;
  options: readonly ('A' | 'B' | 'C' | 'D')[];
  filename: string;
  /** Campo de identificación en el encabezado */
  idLabel: string;
  idDigits: number;
}

export const ANSWER_SHEET_TEMPLATES: AnswerSheetTemplate[] = [
  {
    id: 'unam',
    title: 'UNAM',
    examName: 'Examen de Selección — Área de Ciencias y Humanidades',
    totalQuestions: 120,
    options: ['A', 'B', 'C', 'D'],
    filename: 'hoja-respuestas-unam.pdf',
    idLabel: 'Número de cuenta',
    idDigits: 8,
  },
  {
    id: 'ipn',
    title: 'IPN',
    examName: 'Examen de Admisión — Nivel Superior',
    totalQuestions: 100,
    options: ['A', 'B', 'C', 'D'],
    filename: 'hoja-respuestas-ipn.pdf',
    idLabel: 'Folio del aspirante',
    idDigits: 9,
  },
  {
    id: 'uam',
    title: 'UAM',
    examName: 'Examen General de Conocimientos',
    totalQuestions: 80,
    options: ['A', 'B', 'C', 'D'],
    filename: 'hoja-respuestas-uam.pdf',
    idLabel: 'Clave UAM',
    idDigits: 8,
  },
];

export const ANSWER_SHEET_TIPS = [
  'Usa lápiz del #2 (HB) o bolígrafo negro solo si la convocatoria lo permite.',
  'Rellena el óvalo completo, sin salirte del borde. Una marca ligera puede no leerse.',
  'Borra por completo si cambias de respuesta; manchas confunden al lector óptico.',
  'No hagas marcas fuera de los óvalos ni dobles respuestas en la misma pregunta.',
  'Practica transferir tus respuestas del simulador digital a esta hoja en los últimos 5 minutos.',
] as const;

export function getAnswerSheetDownloadPath(filename: string): string {
  return `/downloads/${filename}`;
}

export function getAnswerSheetById(id: AnswerSheetUniId): AnswerSheetTemplate | undefined {
  return ANSWER_SHEET_TEMPLATES.find((t) => t.id === id);
}
