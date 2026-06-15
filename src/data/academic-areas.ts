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
    description: 'Matemáticas, física y química aplicada.',
    weights: { matematicas: 35, fisica: 30, quimica: 25, espanol: 10 },
  },
  {
    id: 'cbs',
    label: 'CBS — Ciencias Biológicas y de la Salud',
    description: 'Biología, química y razonamiento.',
    weights: { biologia: 35, quimica: 30, matematicas: 20, espanol: 15 },
  },
  {
    id: 'csh',
    label: 'CSH — Ciencias Sociales y Humanidades',
    description: 'Historia, geografía y comprensión.',
    weights: { historia: 30, geografia: 25, espanol: 30, matematicas: 15 },
  },
];

const IPN_GENERAL: AcademicArea[] = [
  {
    id: 'general',
    label: 'Examen general IPN',
    description: 'Distribución estándar del examen de ingreso.',
    weights: { matematicas: 30, fisica: 25, quimica: 20, espanol: 25 },
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
