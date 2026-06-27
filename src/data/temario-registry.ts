/**
 * Registro unificado de temarios por universidad.
 * UNAM, IPN y UAM con temario detallado.
 */

import { getAcademicAreasForUni, type AcademicArea } from './academic-areas';
import { getIpnTemarioMaterias, IPN_TEMARIO_META, ipnTemarioHasDetailedContent } from './ipn-temario';
import {
  getUamTemarioMaterias,
  getUamStudyModuleIds,
  UAM_TEMARIO_META,
  uamTemarioHasDetailedContent,
} from './uam-temario';
import { studyMaterias } from './study-materias';
import {
  UNAM_TEMARIO_AREAS,
  UNAM_TEMARIO_META,
  countTemarioTopics,
  filterMateriasByArea,
  getUnamTemarioMaterias,
  type UnamAreaId,
  type UnamTemarioArea,
  type UnamTemarioMateria,
  type UnamTemarioTopic,
  type UnamTemarioTopicStatus,
} from './unam-temario';
import type { UniversidadFilter } from '@/lib/university-theme';
import type { UniId } from '@/lib/uni-theme-config';

export type TemarioUniId = 'unam' | 'uam' | 'ipn';

export type TemarioAvailability = 'disponible' | 'preparacion';

export type {
  UnamAreaId as TemarioAreaId,
  UnamTemarioArea as TemarioArea,
  UnamTemarioMateria as TemarioMateria,
  UnamTemarioTopic as TemarioTopic,
  UnamTemarioTopicStatus as TemarioTopicStatus,
};

export { countTemarioTopics, filterMateriasByArea, UNAM_TEMARIO_AREAS };

export interface TemarioUniMeta {
  uniId: TemarioUniId;
  nombre: string;
  convocatoria: string;
  totalReactivos: number;
  horasExamen: number;
  fuente: string;
  availability: TemarioAvailability;
}

export interface TemarioData {
  meta: TemarioUniMeta;
  materias: UnamTemarioMateria[];
  /** Áreas de carrera UNAM (filtros del temario completo). */
  areas: UnamTemarioArea[] | null;
  /** Divisiones UAM / bloque IPN para filtros del placeholder. */
  divisions: AcademicArea[] | null;
}

const TEMARIO_REGISTRY: Record<TemarioUniId, Omit<TemarioUniMeta, 'uniId'>> = {
  unam: {
    nombre: 'UNAM',
    convocatoria: UNAM_TEMARIO_META.convocatoria,
    totalReactivos: UNAM_TEMARIO_META.totalReactivos,
    horasExamen: UNAM_TEMARIO_META.horasExamen,
    fuente: UNAM_TEMARIO_META.fuente,
    availability: 'disponible',
  },
  uam: {
    nombre: 'UAM',
    convocatoria: UAM_TEMARIO_META.convocatoria,
    totalReactivos: UAM_TEMARIO_META.totalReactivos,
    horasExamen: UAM_TEMARIO_META.horasExamen,
    fuente: UAM_TEMARIO_META.fuente,
    availability: uamTemarioHasDetailedContent() ? 'disponible' : 'preparacion',
  },
  ipn: {
    nombre: 'IPN',
    convocatoria: IPN_TEMARIO_META.convocatoria,
    totalReactivos: IPN_TEMARIO_META.totalReactivos,
    horasExamen: IPN_TEMARIO_META.horasExamen,
    fuente: IPN_TEMARIO_META.fuente,
    availability: ipnTemarioHasDetailedContent() ? 'disponible' : 'preparacion',
  },
};

export const TEMARIO_UNI_OPTIONS: { id: TemarioUniId; label: string }[] = [
  { id: 'unam', label: 'UNAM' },
  { id: 'ipn', label: 'IPN' },
  { id: 'uam', label: 'UAM' },
];

interface PlaceholderMateriaBuild {
  materias: UnamTemarioMateria[];
  divisions: AcademicArea[];
}

function buildPlaceholderMaterias(uni: 'uam'): PlaceholderMateriaBuild {
  const divisions = getAcademicAreasForUni(uni);
  const weightMap = new Map<string, number>();

  for (const division of divisions) {
    for (const [materiaId, weight] of Object.entries(division.weights)) {
      weightMap.set(materiaId, Math.max(weightMap.get(materiaId) ?? 0, weight));
    }
  }

  const materias = studyMaterias
    .filter((m) => weightMap.has(m.id))
    .map((m) => ({
      id: m.id,
      nombre: m.nombre,
      icon: m.icon,
      /** En placeholders: peso relativo estimado (0–100), no reactivos oficiales. */
      reactivosOficiales: weightMap.get(m.id) ?? 10,
      areasRelacionadas: [] as UnamAreaId[],
      topics: [],
    }))
    .sort((a, b) => b.reactivosOficiales - a.reactivosOficiales);

  return { materias, divisions };
}

/** Resuelve la universidad activa del temario (URL, tema global o default UNAM). */
export function resolveTemarioUniId(filterId: UniversidadFilter, uniId?: UniId): TemarioUniId {
  if (filterId === 'unam' || filterId === 'ipn' || filterId === 'uam') return filterId;
  if (uniId === 'unam' || uniId === 'ipn' || uniId === 'uam') return uniId;
  return 'unam';
}

export function getTemarioForUni(uni: TemarioUniId): TemarioData {
  const base = TEMARIO_REGISTRY[uni];
  const meta: TemarioUniMeta = { ...base, uniId: uni };

  if (uni === 'unam') {
    return {
      meta,
      materias: getUnamTemarioMaterias(),
      areas: UNAM_TEMARIO_AREAS,
      divisions: null,
    };
  }

  if (uni === 'ipn') {
    return {
      meta,
      materias: getIpnTemarioMaterias(),
      areas: null,
      divisions: getAcademicAreasForUni('ipn'),
    };
  }

  if (uni === 'uam') {
    return {
      meta,
      materias: getUamTemarioMaterias(),
      areas: null,
      divisions: getAcademicAreasForUni('uam'),
    };
  }

  const { materias, divisions } = buildPlaceholderMaterias(uni);
  return {
    meta,
    materias,
    areas: null,
    divisions,
  };
}

export function getTemarioMeta(uni: TemarioUniId): TemarioUniMeta {
  return getTemarioForUni(uni).meta;
}

/** Filtra materias del placeholder por división UAM o bloque IPN. */
export function filterTemarioMateriasByDivision(
  materias: UnamTemarioMateria[],
  divisions: AcademicArea[] | null,
  divisionId: string | 'todas'
): UnamTemarioMateria[] {
  if (divisionId === 'todas' || !divisions?.length) return materias;
  const division = divisions.find((d) => d.id === divisionId);
  if (!division) return materias;
  return materias.filter((m) => division.weights[m.id] != null);
}

/** IDs de materias relevantes para la universidad (temario + módulos de estudio). */
export function getTemarioMateriaIds(uni: TemarioUniId): Set<string> {
  if (uni === 'uam') return getUamStudyModuleIds();
  return new Set(getTemarioForUni(uni).materias.map((m) => m.id));
}

/** En placeholders el campo `reactivosOficiales` guarda peso relativo (%). */
export function isPlaceholderPesoRelativo(uni: TemarioUniId): boolean {
  return false;
}

/** True si la universidad tiene al menos una materia con árbol de temario cargado. */
export function temarioHasDetailedContent(uni: TemarioUniId): boolean {
  return getTemarioForUni(uni).materias.some((m) => m.topics.length > 0);
}
