import type { Universidad } from '@/types/user-profile';

export type StudyAreaId = 'fms' | 'cbs' | 'csh' | 'cad';

export type AffinityLevel = 'bajo' | 'medio' | 'alto';
export type CognitiveStrength = 'datos' | 'calculo' | 'logica';
export type EnglishLevel = 'bajo' | 'medio' | 'alto';

export interface ReactivoBar {
  label: string;
  val: number;
}

export interface StudyAreaReactivos {
  unam: ReactivoBar[];
  ipn: ReactivoBar[];
  uam: ReactivoBar[];
  titles: { unam: string; ipn: string; uam: string };
}

export type CompareUniId = Universidad;
export type PrepaLevel = AffinityLevel;

export interface AffinityAnswers {
  prepa: PrepaLevel;
  cognitive: CognitiveStrength;
  english: EnglishLevel;
}

export interface ReactivoSegment {
  subject: string;
  count: number;
}

export interface AffinityResult {
  scores: Record<Universidad, number>;
  primary: Universidad;
  recommended: Universidad;
  recommendedArea: string;
  recommendedAreaLabel: string;
  descriptions: Record<Universidad, string>;
  unam: number;
  ipn: number;
  uam: number;
}

export const STUDY_AREAS: { id: StudyAreaId; label: string; subtitle: string }[] = [
  { id: 'fms', label: 'Físico-Matemáticas', subtitle: 'Área 1 / CBI' },
  { id: 'cbs', label: 'Biológicas y Salud', subtitle: 'Área 2 / CBS' },
  { id: 'csh', label: 'Sociales y Humanidades', subtitle: 'Área 3 / CSH' },
  { id: 'cad', label: 'Diseño y Artes', subtitle: 'Área 4 / CAD' },
];

/** Mapeo área de estudio → id de perfil por universidad. */
export const STUDY_AREA_PROFILE_IDS: Record<
  StudyAreaId,
  Record<Universidad, string>
> = {
  fms: { unam: 'area1', ipn: 'general', uam: 'cbi' },
  cbs: { unam: 'area2', ipn: 'general', uam: 'cbs' },
  csh: { unam: 'area3', ipn: 'general', uam: 'csh' },
  cad: { unam: 'area4', ipn: 'general', uam: 'cad' },
};

export const COMPARISON_ROWS = [
  {
    label: 'Número de preguntas',
    unam: '120 reactivos',
    ipn: '140 reactivos',
    uam: '120 reactivos',
  },
  {
    label: 'Duración del examen',
    unam: '3 horas (180 min)\n~1.50 min por reactivo',
    ipn: '3 horas (180 min)\n~1.28 min por reactivo',
    uam: '3 horas (180 min)\n~1.50 min por reactivo',
  },
  {
    label: 'Penalización por error',
    unam: 'Sin penalización',
    ipn: 'Sin penalización',
    uam: 'Sin penalización',
    positive: true,
  },
  {
    label: 'Criterio de selección',
    unam: '100% puntaje de examen\nPromedio mínimo 7.0 en bachillerato para participar.',
    ipn: '100% puntaje de examen\nSin ponderar promedio de prepa.',
    uam: 'Ponderación mixta:\n70% examen · 30% promedio de prepa',
    uamHighlight: true,
  },
  {
    label: 'Modalidad de aplicación',
    unam: 'Presencial (lápiz y papel en sedes CDMX o estados).',
    ipn: 'En línea o presencial según convocatoria.',
    uam: 'En línea desde casa (navegador seguro y cámara).',
  },
  {
    label: 'Enfoque e ingredientes filtro',
    unam:
      'Literatura, Historia y Geografía con mucho peso. Cada acierto memorístico vale igual que uno de cálculo.',
    ipn: 'Álgebra técnica, física y química de alto rigor. Bloque obligatorio de Inglés.',
    uam: 'Aptitud lógica (~40 %): analogías y deducción. Conocimientos de tu división académica.',
    filter: true,
  },
] as const;

export interface SyllabusSubject {
  materia: string;
  conceptos: string[];
}

export const COMPARISON_MATRIX = COMPARISON_ROWS.map((row, i) => ({
  id: `row-${i}`,
  label: row.label,
  values: {
    unam: row.unam,
    ipn: row.ipn,
    uam: row.uam,
  } as Record<Universidad, string>,
  highlight: ('uamHighlight' in row && row.uamHighlight ? 'uam' : undefined) as
    | Universidad
    | undefined,
}));

export const REACTIVOS_AREA_MAP: Record<StudyAreaId, StudyAreaReactivos> = {
  fms: {
    unam: [
      { label: 'Matemáticas', val: 26 },
      { label: 'Física', val: 16 },
      { label: 'Español', val: 18 },
      { label: 'Literatura', val: 10 },
      { label: 'Geografía', val: 10 },
      { label: 'Química', val: 10 },
      { label: 'Biología', val: 10 },
      { label: 'Historia (Univ./Méx.)', val: 20 },
    ],
    ipn: [
      { label: 'Matemáticas (Cálculo/Álgebra)', val: 40 },
      { label: 'Español (Lectura/Redacción)', val: 40 },
      { label: 'Física', val: 15 },
      { label: 'Inglés', val: 15 },
      { label: 'Química y Biología', val: 20 },
      { label: 'Historia de la Ciencia', val: 10 },
    ],
    uam: [
      { label: 'Razonamiento lógico y verbal', val: 48 },
      { label: 'Matemáticas avanzadas', val: 24 },
      { label: 'Física', val: 24 },
      { label: 'Química', val: 24 },
    ],
    titles: {
      unam: 'Área 1 — Físico-Matemáticas',
      ipn: 'Ingenierías y Cs. Físico-Matemáticas',
      uam: 'CBI — Ciencias Básicas e Ingeniería',
    },
  },
  cbs: {
    unam: [
      { label: 'Matemáticas', val: 24 },
      { label: 'Biología', val: 12 },
      { label: 'Química', val: 14 },
      { label: 'Física', val: 12 },
      { label: 'Español', val: 18 },
      { label: 'Literatura', val: 10 },
      { label: 'Geografía', val: 10 },
      { label: 'Historia (Univ./Méx.)', val: 20 },
    ],
    ipn: [
      { label: 'Matemáticas', val: 30 },
      { label: 'Biología', val: 20 },
      { label: 'Química', val: 15 },
      { label: 'Español', val: 40 },
      { label: 'Inglés', val: 15 },
      { label: 'Física e Historia Ciencia', val: 20 },
    ],
    uam: [
      { label: 'Razonamiento lógico y verbal', val: 48 },
      { label: 'Biología celular e humana', val: 24 },
      { label: 'Química general/orgánica', val: 24 },
      { label: 'Física médica', val: 24 },
    ],
    titles: {
      unam: 'Área 2 — Biológicas y de la Salud',
      ipn: 'Ciencias Médico-Biológicas',
      uam: 'CBS — Biológicas y de la Salud',
    },
  },
  csh: {
    unam: [
      { label: 'Historia (Univ. e México)', val: 28 },
      { label: 'Matemáticas', val: 24 },
      { label: 'Español', val: 18 },
      { label: 'Geografía', val: 10 },
      { label: 'Literatura', val: 10 },
      { label: 'Física', val: 10 },
      { label: 'Química', val: 10 },
      { label: 'Biología', val: 10 },
    ],
    ipn: [
      { label: 'Español (Lectura/Comprensión)', val: 50 },
      { label: 'Matemáticas básicas', val: 35 },
      { label: 'Inglés', val: 30 },
      { label: 'Física, Química, Bio', val: 15 },
      { label: 'Historia de la Ciencia', val: 10 },
    ],
    uam: [
      { label: 'Razonamiento lógico y verbal', val: 48 },
      { label: 'Historia Universal y México', val: 24 },
      { label: 'Literatura', val: 24 },
      { label: 'Formación cívica y política', val: 24 },
    ],
    titles: {
      unam: 'Área 3 — Ciencias Sociales',
      ipn: 'Ciencias Sociales y Administrativas',
      uam: 'CSH — Sociales y Humanidades',
    },
  },
  cad: {
    unam: [
      { label: 'Literatura y Español', val: 28 },
      { label: 'Filosofía (Área 4)', val: 10 },
      { label: 'Matemáticas', val: 22 },
      { label: 'Historia (Univ./Méx.)', val: 20 },
      { label: 'Física, Química, Bio', val: 30 },
      { label: 'Geografía', val: 10 },
    ],
    ipn: [
      { label: 'Español', val: 50 },
      { label: 'Matemáticas', val: 35 },
      { label: 'Inglés', val: 30 },
      { label: 'Física, Química y Bio', val: 15 },
      { label: 'Historia de la Ciencia', val: 10 },
    ],
    uam: [
      { label: 'Razonamiento lógico y verbal', val: 48 },
      { label: 'Fundamentos del diseño', val: 18 },
      { label: 'Historia del arte', val: 18 },
      { label: 'Geometría y física de diseño', val: 18 },
    ],
    titles: {
      unam: 'Área 4 — Artes y Humanidades',
      ipn: 'Ciencias Sociales / Diseño',
      uam: 'CAD — Diseño y Arquitectura',
    },
  },
};

export const TEMARIOS_BY_UNI: Record<Universidad, SyllabusSubject[]> = {
  unam: [
    {
      materia: 'Matemáticas',
      conceptos: [
        'Álgebra: polinomios, factorización, ecuaciones y sistemas',
        'Trigonometría e identidades fundamentales',
        'Geometría analítica: recta, circunferencia, cónicas',
        'Cálculo diferencial e integral (límites, derivadas, áreas)',
      ],
    },
    {
      materia: 'Física',
      conceptos: [
        'Cinemática, dinámica y leyes de Newton',
        'Trabajo, energía y termodinámica básica',
        'Electromagnetismo y circuitos resistivos',
        'Fluidos: Pascal, Arquímedes',
      ],
    },
    {
      materia: 'Química',
      conceptos: [
        'Estructura atómica y tabla periódica',
        'Enlaces iónico, covalente y metálico',
        'Estequiometría y reacciones químicas',
        'Química orgánica elemental',
      ],
    },
    {
      materia: 'Biología',
      conceptos: [
        'Teoría celular y organelos',
        'Metabolismo: fotosíntesis y respiración celular',
        'Genética mendeliana y ADN/ARN',
        'Ecología y evolución',
      ],
    },
    {
      materia: 'Español y Literatura',
      conceptos: [
        'Comprensión lectora y gramática',
        'Géneros literarios y figuras retóricas',
        'Corrientes: romanticismo, modernismo, realismo mágico',
      ],
    },
    {
      materia: 'Historia y Geografía',
      conceptos: [
        'Historia Universal: guerras mundiales, Guerra Fría',
        'Historia de México: Independencia, Revolución',
        'Geografía física, humana y económica de México',
      ],
    },
  ],
  ipn: [
    {
      materia: 'Matemáticas',
      conceptos: [
        'Sucesiones, álgebra avanzada y sistemas 3x3',
        'Trigonometría e identidades de ángulo doble',
        'Cálculo diferencial e integral (cadena, partes)',
      ],
    },
    {
      materia: 'Física',
      conceptos: [
        'Vectores, tiro parabólico y dinámica rotacional',
        'Termodinámica y gases ideales',
        'Electromagnetismo: Coulomb, Ohm, inducción',
      ],
    },
    {
      materia: 'Química',
      conceptos: [
        'Configuración electrónica y geometría molecular',
        'Balanceo redox y estequiometría avanzada',
        'Nomenclatura IUPAC de hidrocarburos',
      ],
    },
    {
      materia: 'Biología',
      conceptos: [
        'Biología celular y metabolismo energético',
        'Genética: cruces dihíbridos y dogma central',
      ],
    },
    {
      materia: 'Inglés (obligatorio)',
      conceptos: [
        'Reading comprehension de textos técnicos',
        'Present Perfect y Passive Voice',
        'First and Second Conditional',
      ],
    },
    {
      materia: 'Historia de la Ciencia',
      conceptos: [
        'Revoluciones industriales y ciencia moderna',
        'Fundación del IPN y contexto histórico',
      ],
    },
  ],
  uam: [
    {
      materia: 'Razonamiento Verbal (aptitud)',
      conceptos: [
        'Comprensión de lectura en textos científicos y sociales',
        'Analogías verbales complejas',
        'Completar oraciones con nexos argumentativos',
      ],
    },
    {
      materia: 'Razonamiento Matemático (aptitud)',
      conceptos: [
        'Lógica abstracta y tablas de verdad',
        'Sucesiones y series espaciales',
        'Problemas verbales con álgebra y porcentajes',
      ],
    },
    {
      materia: 'Conocimientos por división',
      conceptos: [
        'CBI: matemáticas avanzadas, física y química',
        'CBS: biología celular, química orgánica, física médica',
        'CSH: historia, literatura y formación cívica',
        'CAD: diseño, arte, geometría técnica',
      ],
    },
  ],
};

export const STRATEGY_TIPS: Record<
  Universidad,
  { title: string; body: string; tone: 'amber' | 'red' | 'teal' }
> = {
  unam: {
    title: 'Consejos para Examen UNAM',
    body: 'No descuides las asignaturas memorísticas. En la UNAM, geografía o literatura valen igual que cálculo difícil. El equilibrio es tu pase.',
    tone: 'amber',
  },
  ipn: {
    title: 'Consejos para Examen IPN',
    body: 'Perfecciona velocidad operativa en álgebra y física sin calculadora. Practica inglés: actúa como sección filtro definitiva.',
    tone: 'red',
  },
  uam: {
    title: 'Consejos para Examen UAM',
    body: 'Prepárate para analogías semánticas y lógica matemática. Si tu promedio de prepa supera 9.0, ya tienes ventaja del 30 %.',
    tone: 'teal',
  },
};

const AFFINITY_DESCRIPTIONS: Record<Universidad, [string, string]> = {
  unam: [
    '¡Excelente afinidad! Tu retención teórica en historia, geografía y literatura te dará ventaja en el examen UNAM.',
    'Buen perfil. Practica retención sistemática de materias teóricas para complementar tus habilidades.',
  ],
  ipn: [
    '¡Perfil idóneo para el Poli! Tu cálculo operativo y nivel de inglés te colocan como aspirante de alto rango.',
    'Retador. El IPN exige operaciones rápidas sin calculadora y un bloque de inglés obligatorio.',
  ],
  uam: [
    '¡Combinación perfecta! Tu promedio de prepa y razonamiento deductivo encajan con el modelo ponderado de la UAM.',
    'Atención. Tu promedio o resistencia a la lógica abstracta exigen redoblar esfuerzos en el tronco común.',
  ],
};

function clampScore(val: number): number {
  return Math.min(Math.max(val, 10), 99);
}

const COGNITIVE_STUDY_AREA: Record<CognitiveStrength, StudyAreaId> = {
  datos: 'csh',
  calculo: 'fms',
  logica: 'fms',
};

export function cognitiveToStudyArea(cognitive: CognitiveStrength): StudyAreaId {
  return COGNITIVE_STUDY_AREA[cognitive];
}

export function getRecommendedProfileArea(
  recommended: Universidad,
  cognitive: CognitiveStrength
): { areaId: string; areaLabel: string } {
  const studyArea = COGNITIVE_STUDY_AREA[cognitive];
  const areaId = STUDY_AREA_PROFILE_IDS[studyArea][recommended];
  const areaLabel = REACTIVOS_AREA_MAP[studyArea].titles[recommended];
  return { areaId, areaLabel };
}

export function areaIdForUni(
  uni: Universidad,
  studyArea: StudyAreaId,
  affinity?: Pick<AffinityResult, 'recommended' | 'recommendedArea'>
): string {
  if (affinity && uni === affinity.recommended && affinity.recommendedArea) {
    return affinity.recommendedArea;
  }
  return STUDY_AREA_PROFILE_IDS[studyArea][uni];
}

export function calculateAffinity(
  prepaAverage: AffinityLevel,
  cognitive: CognitiveStrength,
  english: EnglishLevel
): AffinityResult {
  let unam = 65;
  let ipn = 55;
  let uam = 50;

  if (prepaAverage === 'alto') {
    uam += 30;
    unam += 15;
    ipn += 10;
  } else if (prepaAverage === 'medio') {
    uam += 20;
    unam += 15;
    ipn += 15;
  } else {
    uam += 5;
    unam += 10;
    ipn += 20;
  }

  if (cognitive === 'datos') {
    unam += 20;
    ipn -= 10;
    uam += 10;
  } else if (cognitive === 'calculo') {
    ipn += 30;
    unam += 10;
    uam -= 5;
  } else {
    uam += 25;
    unam += 5;
    ipn += 5;
  }

  if (english === 'alto') {
    ipn += 15;
    unam += 5;
    uam += 5;
  } else if (english === 'medio') {
    ipn += 10;
    unam += 5;
    uam += 5;
  } else {
    ipn -= 15;
    unam += 5;
    uam += 5;
  }

  const scores = {
    unam: clampScore(unam),
    ipn: clampScore(ipn),
    uam: clampScore(uam),
  };

  const entries = (Object.entries(scores) as [Universidad, number][]).sort(
    (a, b) => b[1] - a[1]
  );
  const primary = entries[0][0];
  const { areaId, areaLabel } = getRecommendedProfileArea(primary, cognitive);

  const descriptions = {
    unam: AFFINITY_DESCRIPTIONS.unam[scores.unam >= 80 ? 0 : 1],
    ipn: AFFINITY_DESCRIPTIONS.ipn[scores.ipn >= 80 ? 0 : 1],
    uam: AFFINITY_DESCRIPTIONS.uam[scores.uam >= 80 ? 0 : 1],
  };

  return {
    scores,
    primary,
    recommended: primary,
    recommendedArea: areaId,
    recommendedAreaLabel: areaLabel,
    descriptions,
    unam: scores.unam,
    ipn: scores.ipn,
    uam: scores.uam,
  };
}

export function getAffinityResult(answers: AffinityAnswers): AffinityResult {
  return calculateAffinity(answers.prepa, answers.cognitive, answers.english);
}

/** Alias para componentes de gráficos por área de estudio. */
export const REACTIVOS_BY_AREA = REACTIVOS_AREA_MAP;

export const SYLLABUS_PREVIEW: Record<
  Universidad,
  { id: string; nombre: string; reactivos: number; href: string }[]
> = {
  unam: [
    { id: 'mat', nombre: 'Matemáticas', reactivos: 26, href: '/dashboard/estudio?uni=unam' },
    { id: 'fis', nombre: 'Física', reactivos: 16, href: '/dashboard/estudio?uni=unam' },
    { id: 'qui', nombre: 'Química', reactivos: 10, href: '/dashboard/estudio?uni=unam' },
    { id: 'esp', nombre: 'Español y Literatura', reactivos: 28, href: '/dashboard/estudio?uni=unam' },
    { id: 'his', nombre: 'Historia y Geografía', reactivos: 30, href: '/dashboard/estudio?uni=unam' },
  ],
  ipn: [
    { id: 'mat', nombre: 'Matemáticas', reactivos: 40, href: '/dashboard/estudio?uni=ipn' },
    { id: 'fis', nombre: 'Física', reactivos: 35, href: '/dashboard/estudio?uni=ipn' },
    { id: 'qui', nombre: 'Química', reactivos: 25, href: '/dashboard/estudio?uni=ipn' },
    { id: 'ing', nombre: 'Inglés', reactivos: 8, href: '/dashboard/estudio?uni=ipn' },
  ],
  uam: [
    { id: 'rv', nombre: 'Razonamiento Verbal', reactivos: 24, href: '/dashboard/estudio?uni=uam' },
    { id: 'rm', nombre: 'Razonamiento Matemático', reactivos: 24, href: '/dashboard/estudio?uni=uam' },
    { id: 'div', nombre: 'Conocimientos por división', reactivos: 72, href: '/dashboard/estudio?uni=uam' },
  ],
};

export const STRATEGIC_TIPS: { uni: Universidad; tips: string[] }[] = [
  { uni: 'unam', tips: [STRATEGY_TIPS.unam.body] },
  { uni: 'ipn', tips: [STRATEGY_TIPS.ipn.body] },
  { uni: 'uam', tips: [STRATEGY_TIPS.uam.body] },
];

export const AFFINITY_STORAGE_KEY = 'prep-mx-onboarding-affinity';

/** Alias usado por el flujo de onboarding / banner del dashboard. */
export const ONBOARDING_RESULT_STORAGE_KEY = AFFINITY_STORAGE_KEY;

export const UNI_COLORS: Record<Universidad, string> = {
  unam: '#f59e0b',
  ipn: '#dc2626',
  uam: '#0d9488',
};

export const AFFINITY_QUESTIONS = {
  prepa: {
    label: '¿Cuál fue tu promedio en prepa?',
    options: [
      { id: 'bajo' as const, label: '6.0 – 7.4', hint: 'Hay espacio para subir con constancia' },
      { id: 'medio' as const, label: '7.5 – 8.4', hint: 'Perfil competitivo en varias opciones' },
      { id: 'alto' as const, label: '8.5 – 10', hint: 'Fuerte para carreras de alta demanda' },
    ],
  },
  cognitive: {
    label: '¿Dónde te sientes más fuerte cognitivamente?',
    options: [
      { id: 'datos' as const, label: 'Memoria y retención de datos (historia, geografía)' },
      { id: 'calculo' as const, label: 'Cálculo y operaciones (álgebra, física)' },
      { id: 'logica' as const, label: 'Lógica abstracta y deducción' },
    ],
  },
  english: {
    label: '¿Cómo calificarías tu inglés?',
    options: [
      { id: 'bajo' as const, label: 'Básico (A1–A2)' },
      { id: 'medio' as const, label: 'Intermedio (B1)' },
      { id: 'alto' as const, label: 'Avanzado (B2+)' },
    ],
  },
};
