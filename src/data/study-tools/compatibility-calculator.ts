import type { Universidad } from '@/types/user-profile';

export type FavoriteSubject =
  | 'matematicas'
  | 'fisica'
  | 'quimica'
  | 'biologia'
  | 'historia'
  | 'geografia'
  | 'literatura'
  | 'filosofia'
  | 'ingles';

export type LearningStyle = 'teoria' | 'practica' | 'balanceado';
export type ReadingSpeed = 'lenta' | 'media' | 'rapida';

export interface CompatibilityInput {
  favoriteSubjects: FavoriteSubject[];
  learningStyle: LearningStyle;
  readingSpeed: ReadingSpeed;
  prepaAverage: number;
}

export interface CompatibilityScores {
  unam: number;
  ipn: number;
  uam: number;
  primary: Universidad;
  insights: string[];
}

const SUBJECT_LABELS: Record<FavoriteSubject, string> = {
  matematicas: 'Matemáticas',
  fisica: 'Física',
  quimica: 'Química',
  biologia: 'Biología',
  historia: 'Historia',
  geografia: 'Geografía',
  literatura: 'Literatura',
  filosofia: 'Filosofía',
  ingles: 'Inglés',
};

/** Peso de cada materia favorita hacia cada universidad (0–15 pts c/u). */
const SUBJECT_WEIGHTS: Record<FavoriteSubject, Record<Universidad, number>> = {
  matematicas: { unam: 6, ipn: 15, uam: 8 },
  fisica: { unam: 5, ipn: 14, uam: 6 },
  quimica: { unam: 4, ipn: 13, uam: 5 },
  biologia: { unam: 8, ipn: 10, uam: 9 },
  historia: { unam: 15, ipn: 4, uam: 7 },
  geografia: { unam: 14, ipn: 3, uam: 6 },
  literatura: { unam: 15, ipn: 2, uam: 8 },
  filosofia: { unam: 10, ipn: 3, uam: 12 },
  ingles: { unam: 5, ipn: 14, uam: 4 },
};

function clamp(n: number): number {
  return Math.min(99, Math.max(5, Math.round(n)));
}

export function calculateCompatibility(input: CompatibilityInput): CompatibilityScores {
  let unam = 42;
  let ipn = 42;
  let uam = 42;
  const insights: string[] = [];

  for (const subject of input.favoriteSubjects) {
    unam += SUBJECT_WEIGHTS[subject].unam;
    ipn += SUBJECT_WEIGHTS[subject].ipn;
    uam += SUBJECT_WEIGHTS[subject].uam;
  }

  if (input.learningStyle === 'teoria') {
    unam += 18;
    uam += 10;
    ipn -= 8;
    insights.push('Tu preferencia por la teoría encaja con el peso memorístico de la UNAM.');
  } else if (input.learningStyle === 'practica') {
    ipn += 20;
    unam -= 5;
    uam += 5;
    insights.push('Resolver ejercicios te favorece en el bloque técnico del IPN.');
  } else {
    unam += 8;
    ipn += 8;
    uam += 12;
    insights.push('Un perfil equilibrado te da flexibilidad en las tres opciones.');
  }

  if (input.readingSpeed === 'lenta') {
    unam += 5;
    ipn -= 12;
    uam += 3;
    insights.push('Con lectura lenta, prioriza exámenes con menos reactivos por minuto (UNAM/UAM).');
  } else if (input.readingSpeed === 'rapida') {
    ipn += 15;
    unam += 5;
    uam += 8;
    insights.push('Leer rápido te ayuda en el IPN (140 reactivos en 180 min).');
  } else {
    unam += 6;
    ipn += 6;
    uam += 6;
  }

  const prepa = input.prepaAverage;
  if (prepa >= 9) {
    uam += 22;
    unam += 10;
    ipn += 8;
    insights.push(`Tu promedio ${prepa.toFixed(1)} potencia la ponderación del 30 % en la UAM.`);
  } else if (prepa >= 8) {
    uam += 15;
    unam += 8;
    ipn += 8;
  } else if (prepa >= 7) {
    uam += 8;
    unam += 6;
    ipn += 10;
  } else {
    ipn += 12;
    unam += 4;
    uam -= 5;
    insights.push('Con promedio bajo, el IPN (100 % examen) puede ser más justo para ti.');
  }

  const scores = {
    unam: clamp(unam),
    ipn: clamp(ipn),
    uam: clamp(uam),
  };

  const ranked = (Object.entries(scores) as [Universidad, number][]).sort((a, b) => b[1] - a[1]);
  const primary = ranked[0][0];

  if (input.favoriteSubjects.length > 0) {
    const labels = input.favoriteSubjects.map((s) => SUBJECT_LABELS[s]).join(', ');
    insights.unshift(`Tus materias (${labels}) orientan tu perfil hacia ${primary.toUpperCase()}.`);
  }

  return { ...scores, primary, insights };
}

export const FAVORITE_SUBJECT_OPTIONS: { id: FavoriteSubject; label: string }[] = [
  { id: 'matematicas', label: 'Matemáticas' },
  { id: 'fisica', label: 'Física' },
  { id: 'quimica', label: 'Química' },
  { id: 'biologia', label: 'Biología' },
  { id: 'historia', label: 'Historia' },
  { id: 'geografia', label: 'Geografía' },
  { id: 'literatura', label: 'Literatura' },
  { id: 'filosofia', label: 'Filosofía' },
  { id: 'ingles', label: 'Inglés' },
];
