/**
 * Temario oficial del Examen de Selección UAM.
 * Tronco común (aptitud ~40 %) + conocimientos por división académica.
 */

import {
  UAM_RAZONAMIENTO_MATEMATICO_TOPICS,
  UAM_RAZONAMIENTO_VERBAL_TOPICS,
} from './uam-temario-aptitud';
import {
  UAM_CBI_FISICA_TOPICS,
  UAM_CBI_MATEMATICAS_TOPICS,
  UAM_CBI_QUIMICA_TOPICS,
} from './uam-temario-cbi';
import {
  UAM_CBS_BIOLOGIA_TOPICS,
  UAM_CBS_FISICA_TOPICS,
  UAM_CBS_QUIMICA_TOPICS,
} from './uam-temario-cbs';
import {
  UAM_CAD_ARTE_TOPICS,
  UAM_CAD_DISENO_TOPICS,
  UAM_CAD_FISICA_MAT_TOPICS,
  UAM_CAD_GEOMETRIA_TOPICS,
} from './uam-temario-cad';
import {
  UAM_CSH_HISTORIA_TOPICS,
  UAM_CSH_LITERATURA_TOPICS,
  UAM_CSH_POLITICA_TOPICS,
} from './uam-temario-csh';
import {
  UAM_CCD_PLACEHOLDER_TOPICS,
  UAM_CNI_PLACEHOLDER_TOPICS,
} from './uam-temario-cuajimalpa';
import type { UnamTemarioMateria, UnamTemarioMeta } from './unam-temario';

export const UAM_TEMARIO_META: UnamTemarioMeta = {
  convocatoria: '2026',
  totalReactivos: 120,
  horasExamen: 3,
  fuente:
    'Examen de Selección UAM — Aptitud (tronco común) + conocimientos por división académica (CBI, CBS, CSH, CAD, CNI, CCD)',
};

export type UamDivisionId = 'cbi' | 'cbs' | 'csh' | 'cad' | 'cni' | 'ccd';

export type UamDivisionFilter = UamDivisionId | 'todas';

export interface UamTemarioDivision {
  id: UamDivisionId;
  nombre: string;
  descripcion: string;
  cuajimalpaOnly?: boolean;
}

export const UAM_TEMARIO_DIVISIONS: UamTemarioDivision[] = [
  {
    id: 'cbi',
    nombre: 'CBI — Ciencias Básicas e Ingeniería',
    descripcion: 'Matemáticas avanzadas, física y química.',
  },
  {
    id: 'cbs',
    nombre: 'CBS — Ciencias Biológicas y de la Salud',
    descripcion: 'Biología celular y humana, química y física médica.',
  },
  {
    id: 'csh',
    nombre: 'CSH — Ciencias Sociales y Humanidades',
    descripcion: 'Historia, literatura, política y sociedad.',
  },
  {
    id: 'cad',
    nombre: 'CAD — Ciencias y Artes para el Diseño',
    descripcion: 'Diseño, arte, geometría técnica y física aplicada.',
  },
  {
    id: 'cni',
    nombre: 'CNI — Ciencias Naturales e Ingeniería',
    descripcion: 'División exclusiva del campus Cuajimalpa.',
    cuajimalpaOnly: true,
  },
  {
    id: 'ccd',
    nombre: 'CCD — Comunicación y Diseño',
    descripcion: 'División exclusiva del campus Cuajimalpa.',
    cuajimalpaOnly: true,
  },
];

/** Aptitud — ~48 reactivos (40 %), todas las divisiones. */
export const UAM_APTITUD_MATERIAS: UnamTemarioMateria[] = [
  {
    id: 'razonamiento-verbal',
    nombre: 'Razonamiento Verbal',
    icon: '📝',
    reactivosOficiales: 24,
    areasRelacionadas: [],
    topics: UAM_RAZONAMIENTO_VERBAL_TOPICS,
  },
  {
    id: 'razonamiento-matematico',
    nombre: 'Razonamiento Matemático',
    icon: '🧩',
    reactivosOficiales: 24,
    areasRelacionadas: [],
    topics: UAM_RAZONAMIENTO_MATEMATICO_TOPICS,
  },
];

/** Alias del tronco común de aptitud. */
export const UAM_TRONCO_MATERIAS = UAM_APTITUD_MATERIAS;

const UAM_DIVISION_MATERIAS: Record<UamDivisionId, UnamTemarioMateria[]> = {
  cbi: [
    {
      id: 'matematicas',
      nombre: 'Matemáticas Avanzadas',
      icon: '📐',
      reactivosOficiales: 24,
      areasRelacionadas: [],
      topics: UAM_CBI_MATEMATICAS_TOPICS,
    },
    {
      id: 'fisica',
      nombre: 'Física',
      icon: '🧲',
      reactivosOficiales: 24,
      areasRelacionadas: [],
      topics: UAM_CBI_FISICA_TOPICS,
    },
    {
      id: 'quimica',
      nombre: 'Química',
      icon: '⚗️',
      reactivosOficiales: 24,
      areasRelacionadas: [],
      topics: UAM_CBI_QUIMICA_TOPICS,
    },
  ],
  cbs: [
    {
      id: 'biologia',
      nombre: 'Biología Celular y Humana',
      icon: '🧬',
      reactivosOficiales: 24,
      areasRelacionadas: [],
      topics: UAM_CBS_BIOLOGIA_TOPICS,
    },
    {
      id: 'quimica',
      nombre: 'Química General y Orgánica',
      icon: '⚗️',
      reactivosOficiales: 24,
      areasRelacionadas: [],
      topics: UAM_CBS_QUIMICA_TOPICS,
    },
    {
      id: 'fisica',
      nombre: 'Física Médica y Básica',
      icon: '🩺',
      reactivosOficiales: 24,
      areasRelacionadas: [],
      topics: UAM_CBS_FISICA_TOPICS,
    },
  ],
  csh: [
    {
      id: 'historia',
      nombre: 'Historia Universal y de México',
      icon: '🏛️',
      reactivosOficiales: 24,
      areasRelacionadas: [],
      topics: UAM_CSH_HISTORIA_TOPICS,
    },
    {
      id: 'literatura',
      nombre: 'Literatura',
      icon: '📚',
      reactivosOficiales: 24,
      areasRelacionadas: [],
      topics: UAM_CSH_LITERATURA_TOPICS,
    },
    {
      id: 'formacion-civica',
      nombre: 'Política y Sociedad',
      icon: '⚖️',
      reactivosOficiales: 24,
      areasRelacionadas: [],
      topics: UAM_CSH_POLITICA_TOPICS,
    },
  ],
  cad: [
    {
      id: 'diseno',
      nombre: 'Fundamentos del Diseño',
      icon: '🎨',
      reactivosOficiales: 18,
      areasRelacionadas: [],
      topics: UAM_CAD_DISENO_TOPICS,
    },
    {
      id: 'arte-arquitectura',
      nombre: 'Historia del Arte y Arquitectura',
      icon: '🏺',
      reactivosOficiales: 18,
      areasRelacionadas: [],
      topics: UAM_CAD_ARTE_TOPICS,
    },
    {
      id: 'dibujo-tecnico',
      nombre: 'Geometría y Dibujo Técnico',
      icon: '📏',
      reactivosOficiales: 18,
      areasRelacionadas: [],
      topics: UAM_CAD_GEOMETRIA_TOPICS,
    },
    {
      id: 'fisica-diseno',
      nombre: 'Física y Matemáticas para el Diseño',
      icon: '📐',
      reactivosOficiales: 18,
      areasRelacionadas: [],
      topics: UAM_CAD_FISICA_MAT_TOPICS,
    },
  ],
  cni: [
    {
      id: 'cni-cuajimalpa',
      nombre: 'Ciencias Naturales e Ingeniería (Cuajimalpa)',
      icon: '🌿',
      reactivosOficiales: 72,
      areasRelacionadas: [],
      topics: UAM_CNI_PLACEHOLDER_TOPICS,
    },
  ],
  ccd: [
    {
      id: 'ccd-cuajimalpa',
      nombre: 'Ciencias de la Comunicación y Diseño (Cuajimalpa)',
      icon: '📡',
      reactivosOficiales: 72,
      areasRelacionadas: [],
      topics: UAM_CCD_PLACEHOLDER_TOPICS,
    },
  ],
};

export function getUamTemarioDivision(id: UamDivisionId): UamTemarioDivision | undefined {
  return UAM_TEMARIO_DIVISIONS.find((d) => d.id === id);
}

export function filterUamMateriasByDivision(divisionId: UamDivisionFilter): UnamTemarioMateria[] {
  if (divisionId === 'todas') return UAM_APTITUD_MATERIAS;
  return [...UAM_APTITUD_MATERIAS, ...getUamMateriasForDivision(divisionId)];
}

export function getUamAptitudMaterias(): UnamTemarioMateria[] {
  return UAM_APTITUD_MATERIAS;
}

export function getUamMateriasForDivision(divisionId: UamDivisionId): UnamTemarioMateria[] {
  return UAM_DIVISION_MATERIAS[divisionId] ?? [];
}

/** Todas las materias (aptitud + todas las divisiones) para el registro global. */
export function getUamTemarioMaterias(): UnamTemarioMateria[] {
  const seen = new Set<string>();
  const all: UnamTemarioMateria[] = [];

  for (const m of UAM_APTITUD_MATERIAS) {
    if (!seen.has(m.id)) {
      seen.add(m.id);
      all.push(m);
    }
  }

  for (const division of Object.values(UAM_DIVISION_MATERIAS)) {
    for (const m of division) {
      if (!seen.has(m.id)) {
        seen.add(m.id);
        all.push(m);
      }
    }
  }

  return all;
}

/** IDs de módulos de estudio con contenido practicable hoy. */
export function getUamStudyModuleIds(): Set<string> {
  return new Set([
    'matematicas',
    'fisica',
    'quimica',
    'biologia',
    'espanol',
    'historia',
    'geografia',
  ]);
}

export function uamTemarioHasDetailedContent(): boolean {
  return getUamTemarioMaterias().some((m) => m.topics.length > 0);
}
