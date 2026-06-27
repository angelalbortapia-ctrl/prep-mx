import type { UniId } from '@/lib/uni-theme-config';

export interface AcademicArea {
  id: string;
  label: string;
  description: string;
  /** Ponderación relativa por materia (suma ~100). */
  weights: Record<string, number>;
}

const UNAM_AREAS: AcademicArea[] = [
  {
    id: 'area1',
    label: 'Área 1 — Físico-Matemáticas',
    description: 'Énfasis en matemáticas, física y química.',
    weights: { matematicas: 35, fisica: 30, quimica: 25, espanol: 10 },
  },
  {
    id: 'area2',
    label: 'Área 2 — Biológicas y de la Salud',
    description: 'Biología, química y razonamiento cuantitativo.',
    weights: { biologia: 30, quimica: 30, matematicas: 25, espanol: 15 },
  },
  {
    id: 'area3',
    label: 'Área 3 — Sociales',
    description: 'Historia, geografía y comprensión lectora.',
    weights: { historia: 30, geografia: 25, espanol: 25, matematicas: 20 },
  },
  {
    id: 'area4',
    label: 'Área 4 — Humanidades y Artes',
    description: 'Literatura, historia y pensamiento crítico.',
    weights: { literatura: 30, historia: 25, espanol: 25, filosofia: 20 },
  },
];

const UAM_DIVISIONS: AcademicArea[] = [
  {
    id: 'cbi',
    label: 'CBI — Ciencias Básicas e Ingeniería',
    description: 'Matemáticas avanzadas, física y química.',
    weights: { matematicas: 24, fisica: 24, quimica: 24 },
  },
  {
    id: 'cbs',
    label: 'CBS — Ciencias Biológicas y de la Salud',
    description: 'Biología, química orgánica y física médica.',
    weights: { biologia: 30, quimica: 24, fisica: 18 },
  },
  {
    id: 'csh',
    label: 'CSH — Ciencias Sociales y Humanidades',
    description: 'Historia, literatura y política.',
    weights: { historia: 24, literatura: 24, 'formacion-civica': 24 },
  },
  {
    id: 'cad',
    label: 'CAD — Ciencias y Artes para el Diseño',
    description: 'Diseño, arte, geometría técnica y física aplicada.',
    weights: {
      diseno: 18,
      'arte-arquitectura': 18,
      'dibujo-tecnico': 18,
      'fisica-diseno': 18,
    },
  },
  {
    id: 'cni',
    label: 'CNI — Ciencias Naturales e Ingeniería (Cuajimalpa)',
    description: 'División exclusiva del campus Cuajimalpa.',
    weights: { 'cni-cuajimalpa': 72 },
  },
  {
    id: 'ccd',
    label: 'CCD — Comunicación y Diseño (Cuajimalpa)',
    description: 'División exclusiva del campus Cuajimalpa.',
    weights: { 'ccd-cuajimalpa': 72 },
  },
];

const IPN_GENERAL: AcademicArea[] = [
  {
    id: 'general',
    label: 'Examen general IPN',
    description: 'Distribución estándar del examen de ingreso digital.',
    weights: {
      matematicas: 29,
      fisica: 25,
      quimica: 18,
      biologia: 9,
      espanol: 9,
      ingles: 6,
      historia: 4,
    },
  },
];

export function getAcademicAreasForUni(uni: UniId | 'general'): AcademicArea[] {
  if (uni === 'unam') return UNAM_AREAS;
  if (uni === 'uam') return UAM_DIVISIONS;
  if (uni === 'ipn') return IPN_GENERAL;
  return UNAM_AREAS;
}

export function getAcademicAreaById(uni: UniId | 'general', areaId: string): AcademicArea | undefined {
  return getAcademicAreasForUni(uni).find((a) => a.id === areaId);
}
