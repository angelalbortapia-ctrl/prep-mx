/**
 * Temario oficial del Examen de Ingreso UNAM.
 * Estructura lista para hidratar: añade `topics` por materia cuando el usuario entregue el contenido.
 */

import { UNAM_FISICA_TOPICS } from './unam-temario-fisica';
import { UNAM_MATEMATICAS_TOPICS } from './unam-temario-matematicas';
import { UNAM_QUIMICA_TOPICS } from './unam-temario-quimica';
import { UNAM_HISTORIA_TOPICS } from './unam-temario-historia';
import { UNAM_HISTORIA_MEXICO_TOPICS } from './unam-temario-historia-mexico';
import { UNAM_GEOGRAFIA_TOPICS } from './unam-temario-geografia';
import { UNAM_BIOLOGIA_TOPICS } from './unam-temario-biologia';
import { UNAM_ESPANOL_TOPICS } from './unam-temario-espanol';
import { UNAM_FILOSOFIA_TOPICS } from './unam-temario-filosofia';
import { UNAM_LITERATURA_TOPICS } from './unam-temario-literatura';

export type UnamAreaId = 'area1' | 'area2' | 'area3' | 'area4' | 'area5' | 'area6';

export type UnamTemarioTopicStatus = 'pendiente' | 'publicado';

export interface UnamTemarioTopic {
  id: string;
  /** Código oficial del temario, ej. "1.1.1". */
  codigo?: string;
  titulo: string;
  /** Detalle del subtema (contenido ultra-detallado). */
  descripcion?: string;
  /** Orden dentro del nivel padre (1-based). */
  orden: number;
  status: UnamTemarioTopicStatus;
  /** Slug de guía en `/dashboard/estudio/guia/[slug]` cuando exista. */
  guideSlug?: string;
  /** Subtemas anidados (secciones → subsecciones → ítems). */
  children?: UnamTemarioTopic[];
}

export interface UnamTemarioMateria {
  id: string;
  nombre: string;
  icon: string;
  /** Reactivos oficiales en el examen (de 120 totales). */
  reactivosOficiales: number;
  /** Áreas de carrera donde esta materia pesa más en la orientación vocacional. */
  areasRelacionadas: UnamAreaId[];
  /** Temas del temario — vacío hasta que se carguen. */
  topics: UnamTemarioTopic[];
}

export interface UnamTemarioArea {
  id: UnamAreaId;
  nombre: string;
  descripcion: string;
}

export interface UnamTemarioMeta {
  convocatoria: string;
  totalReactivos: number;
  horasExamen: number;
  fuente: string;
}

export const UNAM_TEMARIO_META: UnamTemarioMeta = {
  convocatoria: '2026',
  totalReactivos: 120,
  horasExamen: 3,
  fuente: 'Guía del aspirante UNAM — estructura oficial de evaluación',
};

export const UNAM_TEMARIO_AREAS: UnamTemarioArea[] = [
  {
    id: 'area1',
    nombre: 'Área 1 — Físico-Matemáticas',
    descripcion: 'Ingenierías, exactas y ciencias duras.',
  },
  {
    id: 'area2',
    nombre: 'Área 2 — Biológicas y de la Salud',
    descripcion: 'Medicina, biología, química de la vida.',
  },
  {
    id: 'area3',
    nombre: 'Área 3 — Ciencias Sociales',
    descripcion: 'Derecho, economía, relaciones internacionales.',
  },
  {
    id: 'area4',
    nombre: 'Área 4 — Humanidades y Artes',
    descripcion: 'Letras, filosofía, artes, comunicación.',
  },
  {
    id: 'area5',
    nombre: 'Área 5 — Arte y Diseño',
    descripcion: 'Arquitectura, diseño, artes plásticas.',
  },
  {
    id: 'area6',
    nombre: 'Área 6 — Económico-Administrativas',
    descripcion: 'Administración, contaduría, actuaría.',
  },
];

/** Materias del examen UNAM (10 reactivos × 9 + 30 de Matemáticas = 120). Sin Historia del Arte. */
export const UNAM_TEMARIO_MATERIAS: UnamTemarioMateria[] = [
  {
    id: 'matematicas',
    nombre: 'Matemáticas',
    icon: '📐',
    reactivosOficiales: 30,
    areasRelacionadas: ['area1', 'area2', 'area6'],
    topics: UNAM_MATEMATICAS_TOPICS,
  },
  {
    id: 'espanol',
    nombre: 'Español',
    icon: '📖',
    reactivosOficiales: 10,
    areasRelacionadas: ['area3', 'area4'],
    topics: UNAM_ESPANOL_TOPICS,
  },
  {
    id: 'literatura',
    nombre: 'Literatura',
    icon: '✍️',
    reactivosOficiales: 10,
    areasRelacionadas: ['area4'],
    topics: UNAM_LITERATURA_TOPICS,
  },
  {
    id: 'historia',
    nombre: 'Historia Universal',
    icon: '🌍',
    reactivosOficiales: 10,
    areasRelacionadas: ['area3', 'area4'],
    topics: UNAM_HISTORIA_TOPICS,
  },
  {
    id: 'historia-de-mexico',
    nombre: 'Historia de México',
    icon: '🏛️',
    reactivosOficiales: 10,
    areasRelacionadas: ['area3', 'area4'],
    topics: UNAM_HISTORIA_MEXICO_TOPICS,
  },
  {
    id: 'geografia',
    nombre: 'Geografía',
    icon: '🌎',
    reactivosOficiales: 10,
    areasRelacionadas: ['area3'],
    topics: UNAM_GEOGRAFIA_TOPICS,
  },
  {
    id: 'fisica',
    nombre: 'Física',
    icon: '🧲',
    reactivosOficiales: 10,
    areasRelacionadas: ['area1', 'area2'],
    topics: UNAM_FISICA_TOPICS,
  },
  {
    id: 'quimica',
    nombre: 'Química',
    icon: '⚗️',
    reactivosOficiales: 10,
    areasRelacionadas: ['area1', 'area2'],
    topics: UNAM_QUIMICA_TOPICS,
  },
  {
    id: 'biologia',
    nombre: 'Biología',
    icon: '🧬',
    reactivosOficiales: 10,
    areasRelacionadas: ['area2'],
    topics: UNAM_BIOLOGIA_TOPICS,
  },
  {
    id: 'filosofia',
    nombre: 'Filosofía',
    icon: '🦉',
    reactivosOficiales: 10,
    areasRelacionadas: ['area3', 'area4'],
    topics: UNAM_FILOSOFIA_TOPICS,
  },
];

export function getUnamTemarioMaterias(): UnamTemarioMateria[] {
  return UNAM_TEMARIO_MATERIAS;
}

export function getUnamTemarioArea(id: UnamAreaId): UnamTemarioArea | undefined {
  return UNAM_TEMARIO_AREAS.find((a) => a.id === id);
}

export function filterMateriasByArea(areaId: UnamAreaId | 'todas'): UnamTemarioMateria[] {
  if (areaId === 'todas') return UNAM_TEMARIO_MATERIAS;
  return UNAM_TEMARIO_MATERIAS.filter((m) => m.areasRelacionadas.includes(areaId));
}

export function countTemarioTopics(materias: UnamTemarioMateria[]): {
  total: number;
  publicados: number;
  pendientes: number;
} {
  let total = 0;
  let publicados = 0;
  for (const m of materias) {
    const counts = countTopicLeaves(m.topics);
    total += counts.total;
    publicados += counts.publicados;
  }
  return { total, publicados, pendientes: total - publicados };
}

function countTopicLeaves(topics: UnamTemarioTopic[]): { total: number; publicados: number } {
  let total = 0;
  let publicados = 0;
  for (const t of topics) {
    if (t.children?.length) {
      const sub = countTopicLeaves(t.children);
      total += sub.total;
      publicados += sub.publicados;
    } else {
      total += 1;
      if (t.status === 'publicado') publicados += 1;
    }
  }
  return { total, publicados };
}

export type UnamTemarioTopicInput = Omit<UnamTemarioTopic, 'status' | 'children'> & {
  status?: UnamTemarioTopicStatus;
  children?: UnamTemarioTopicInput[];
};

function normalizeTopic(t: UnamTemarioTopicInput, fallbackOrden: number): UnamTemarioTopic {
  return {
    id: t.id,
    codigo: t.codigo,
    titulo: t.titulo,
    descripcion: t.descripcion,
    orden: t.orden ?? fallbackOrden,
    guideSlug: t.guideSlug,
    status: t.status ?? 'publicado',
    children: t.children?.map((c, i) => normalizeTopic(c, i + 1)),
  };
}

/** Helper para cargar temas cuando el usuario los entregue. */
export function mergeUnamTopics(
  materiaId: string,
  topics: UnamTemarioTopicInput[]
): UnamTemarioMateria[] {
  return UNAM_TEMARIO_MATERIAS.map((m) =>
    m.id === materiaId
      ? {
          ...m,
          topics: topics.map((t, i) => normalizeTopic(t, i + 1)),
        }
      : m
  );
}
