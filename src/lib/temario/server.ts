/**
 * Acceso a temarios pesados — solo servidor / API routes.
 * No importar desde componentes con 'use client'.
 */

import { getAcademicAreasForUni } from '@/data/academic-areas';
import { getIpnTemarioMaterias, IPN_TEMARIO_META, ipnTemarioHasDetailedContent } from '@/data/ipn-temario';
import { studyMaterias } from '@/data/study-materias';
import {
  filterUamMateriasByDivision,
  getUamStudyModuleIds,
  getUamTemarioMaterias,
  UAM_TEMARIO_DIVISIONS,
  UAM_TEMARIO_META,
  uamTemarioHasDetailedContent,
  type UamDivisionFilter,
} from '@/data/uam-temario';
import {
  filterMateriasByArea,
  getUnamTemarioMaterias,
  UNAM_TEMARIO_AREAS,
  UNAM_TEMARIO_META,
  type UnamAreaId,
  type UnamTemarioMateria,
} from '@/data/unam-temario';
import type {
  TemarioMateriaDetailResponse,
  TemarioOverviewItem,
  TemarioSummaryResponse,
  TemarioUniId,
  TemarioUniMeta,
} from './types';
import { countTemarioTopics, summarizeMateria } from './utils';

export interface TemarioData {
  meta: TemarioUniMeta;
  materias: UnamTemarioMateria[];
  areas: typeof UNAM_TEMARIO_AREAS | null;
  divisions: ReturnType<typeof getAcademicAreasForUni> | null;
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

function buildPlaceholderMaterias(uni: 'uam'): {
  materias: UnamTemarioMateria[];
  divisions: ReturnType<typeof getAcademicAreasForUni>;
} {
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
      reactivosOficiales: weightMap.get(m.id) ?? 10,
      areasRelacionadas: [] as UnamAreaId[],
      topics: [],
    }))
    .sort((a, b) => b.reactivosOficiales - a.reactivosOficiales);

  return { materias, divisions };
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
  return { meta, materias, areas: null, divisions };
}

export function filterTemarioMateriasByDivision(
  materias: UnamTemarioMateria[],
  divisions: ReturnType<typeof getAcademicAreasForUni> | null,
  divisionId: string | 'todas'
): UnamTemarioMateria[] {
  if (divisionId === 'todas' || !divisions?.length) return materias;
  const division = divisions.find((d) => d.id === divisionId);
  if (!division) return materias;
  return materias.filter((m) => division.weights[m.id] != null);
}

export function getTemarioMateriaIds(uni: TemarioUniId): Set<string> {
  if (uni === 'uam') return getUamStudyModuleIds();
  return new Set(getTemarioForUni(uni).materias.map((m) => m.id));
}

function filterMateriasForUni(
  uni: TemarioUniId,
  filter: string,
  data: TemarioData
): UnamTemarioMateria[] {
  if (uni === 'unam') {
    return filterMateriasByArea((filter as UnamAreaId | 'todas') ?? 'todas');
  }
  if (uni === 'uam') {
    return filterUamMateriasByDivision((filter as UamDivisionFilter) ?? 'cbi');
  }
  return filterTemarioMateriasByDivision(data.materias, data.divisions, filter);
}

function buildFilters(uni: TemarioUniId, data: TemarioData) {
  if (uni === 'unam' && data.areas) {
    return [
      { id: 'todas', label: 'Todo el examen' },
      ...data.areas.map((a) => ({
        id: a.id,
        label: a.nombre.replace(/^Área \d+ — /, ''),
      })),
    ];
  }
  if (uni === 'uam') {
    return [
      { id: 'todas', label: 'Todo el examen' },
      ...UAM_TEMARIO_DIVISIONS.map((d) => ({
        id: d.id,
        label: d.nombre.replace(/^(CBI|CBS|CSH|CAD|CNI|CCD) — /, ''),
      })),
    ];
  }
  if (data.divisions?.length) {
    return [
      { id: 'todas', label: 'Todo el examen' },
      ...data.divisions.map((d) => ({
        id: d.id,
        label: d.label.replace(/^(CBI|CBS|CSH|CAD|CNI|CCD) — /, ''),
      })),
    ];
  }
  return [{ id: 'todas', label: 'Todo el examen' }];
}

export function getDefaultTemarioFilter(uni: TemarioUniId): string {
  return uni === 'uam' ? 'cbi' : 'todas';
}

export function getTemarioSummary(uni: TemarioUniId, filter?: string): TemarioSummaryResponse {
  const data = getTemarioForUni(uni);
  const activeFilter = filter ?? getDefaultTemarioFilter(uni);
  const materias = filterMateriasForUni(uni, activeFilter, data);
  const summaries = materias.map(summarizeMateria);
  const stats = countTemarioTopics(materias);
  const hasDetailedContent = data.materias.some((m) => m.topics.length > 0);

  return {
    meta: data.meta,
    filters: buildFilters(uni, data),
    defaultFilter: getDefaultTemarioFilter(uni),
    materias: summaries,
    materiaIds: Array.from(getTemarioMateriaIds(uni)),
    stats,
    hasDetailedContent,
    fetchedAt: new Date().toISOString(),
  };
}

export function getTemarioMateriaDetail(
  uni: TemarioUniId,
  materiaId: string
): TemarioMateriaDetailResponse | null {
  const data = getTemarioForUni(uni);
  const materia = data.materias.find((m) => m.id === materiaId);
  if (!materia) return null;

  return {
    uni,
    materiaId,
    materia: summarizeMateria(materia),
    topics: materia.topics,
    fetchedAt: new Date().toISOString(),
  };
}

export function getTemarioOverviewItems(): TemarioOverviewItem[] {
  const options: { id: TemarioUniId; label: string }[] = [
    { id: 'unam', label: 'UNAM' },
    { id: 'ipn', label: 'IPN' },
    { id: 'uam', label: 'UAM' },
  ];

  return options.map(({ id, label }) => {
    const data = getTemarioForUni(id);
    const stats = countTemarioTopics(data.materias);
    return {
      id,
      label,
      convocatoria: data.meta.convocatoria,
      totalReactivos: data.meta.totalReactivos,
      horasExamen: data.meta.horasExamen,
      materiasCount: data.materias.length,
      topicsPublicados: stats.publicados,
      availability: data.meta.availability,
    };
  });
}
