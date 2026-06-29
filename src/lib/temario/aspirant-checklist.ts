import {
  ADMISSION_CAREERS,
  careersForUniversity,
  type AdmissionCareer,
} from '@/data/career-admission-cutoffs';
import { getIpnTemarioMaterias, IPN_TEMARIO_META } from '@/data/ipn-temario';
import {
  filterUamMateriasByDivision,
  getUamMateriasForDivision,
  UAM_TEMARIO_META,
  type UamDivisionFilter,
  type UamDivisionId,
} from '@/data/uam-temario';
import {
  filterMateriasByArea,
  getUnamTemarioMaterias,
  UNAM_TEMARIO_META,
  type UnamAreaId,
  type UnamTemarioMateria,
  type UnamTemarioTopic,
} from '@/data/unam-temario';
import type { Universidad } from '@/types/user-profile';

export interface ChecklistTopicItem {
  id: string;
  materiaId: string;
  materiaNombre: string;
  materiaIcon: string;
  codigo?: string;
  titulo: string;
  descripcion?: string;
  depth: number;
  isLeaf: boolean;
}

export interface AspirantChecklistData {
  career: AdmissionCareer;
  universidad: Universidad;
  convocatoria: string;
  totalReactivos: number;
  fuente: string;
  areaLabel?: string;
  materias: {
    id: string;
    nombre: string;
    icon: string;
    reactivosOficiales: number;
    topics: ChecklistTopicItem[];
  }[];
  stats: { totalTopics: number; materiaCount: number };
}

const UNI_LABEL: Record<Universidad, string> = {
  unam: 'UNAM',
  ipn: 'IPN',
  uam: 'UAM',
};

export function getChecklistCareerOptions(): AdmissionCareer[] {
  return ADMISSION_CAREERS;
}

export function getChecklistCareersByUni(uni: Universidad): AdmissionCareer[] {
  return careersForUniversity(uni);
}

function parseUnamAreaId(area?: string): UnamAreaId | 'todas' {
  if (!area) return 'todas';
  const match = area.match(/área\s*(\d)/i);
  if (match) return `area${match[1]}` as UnamAreaId;
  return 'todas';
}

function parseUamDivision(area?: string): UamDivisionFilter {
  if (!area) return 'todas';
  const code = area.trim().toUpperCase();
  const map: Record<string, UamDivisionFilter> = {
    CBI: 'cbi',
    CBS: 'cbs',
    CSH: 'csh',
    CAD: 'cad',
    CNI: 'cni',
    CCD: 'ccd',
  };
  for (const [key, id] of Object.entries(map)) {
    if (code.includes(key)) return id;
  }
  return 'todas';
}

function flattenMateriaTopics(materia: UnamTemarioMateria): ChecklistTopicItem[] {
  const items: ChecklistTopicItem[] = [];

  function walk(topics: UnamTemarioTopic[], depth: number) {
    for (const topic of topics) {
      const hasChildren = Boolean(topic.children?.length);
      items.push({
        id: `${materia.id}::${topic.id}`,
        materiaId: materia.id,
        materiaNombre: materia.nombre,
        materiaIcon: materia.icon,
        codigo: topic.codigo,
        titulo: topic.titulo,
        descripcion: topic.descripcion,
        depth,
        isLeaf: !hasChildren,
      });
      if (hasChildren) walk(topic.children!, depth + 1);
    }
  }

  walk(materia.topics, 0);
  return items;
}

function resolveMateriasForCareer(career: AdmissionCareer): UnamTemarioMateria[] {
  switch (career.universidad) {
    case 'unam':
      return getUnamTemarioMaterias();
    case 'ipn':
      return getIpnTemarioMaterias();
    case 'uam':
      return filterUamMateriasByDivision(parseUamDivision(career.area));
    default:
      return [];
  }
}

function resolveMeta(career: AdmissionCareer) {
  switch (career.universidad) {
    case 'unam':
      return {
        convocatoria: UNAM_TEMARIO_META.convocatoria,
        totalReactivos: UNAM_TEMARIO_META.totalReactivos,
        fuente: UNAM_TEMARIO_META.fuente,
      };
    case 'ipn':
      return {
        convocatoria: IPN_TEMARIO_META.convocatoria,
        totalReactivos: IPN_TEMARIO_META.totalReactivos,
        fuente: IPN_TEMARIO_META.fuente,
      };
    case 'uam':
      return {
        convocatoria: UAM_TEMARIO_META.convocatoria,
        totalReactivos: UAM_TEMARIO_META.totalReactivos,
        fuente: UAM_TEMARIO_META.fuente,
      };
  }
}

/** Construye el checklist interactivo desde los archivos `src/data/*-temario*.ts`. */
export function buildAspirantChecklist(careerId: string): AspirantChecklistData | null {
  const career = ADMISSION_CAREERS.find((c) => c.id === careerId);
  if (!career) return null;

  const materias = resolveMateriasForCareer(career);
  const meta = resolveMeta(career);

  const mapped = materias.map((m) => {
    const topics = flattenMateriaTopics(m);
    return {
      id: m.id,
      nombre: m.nombre,
      icon: m.icon,
      reactivosOficiales: m.reactivosOficiales,
      topics,
    };
  });

  const leafCount = mapped.reduce(
    (acc, m) => acc + m.topics.filter((t) => t.isLeaf).length,
    0
  );

  let areaLabel: string | undefined;
  if (career.universidad === 'unam' && career.area) {
    areaLabel = career.area;
  } else if (career.universidad === 'uam' && career.area) {
    areaLabel = `División ${career.area}`;
  } else if (career.universidad === 'ipn' && career.area) {
    areaLabel = career.area;
  }

  return {
    career,
    universidad: career.universidad,
    convocatoria: meta.convocatoria,
    totalReactivos: meta.totalReactivos,
    fuente: meta.fuente,
    areaLabel,
    materias: mapped,
    stats: { totalTopics: leafCount, materiaCount: mapped.length },
  };
}

export function formatCareerLabel(career: AdmissionCareer): string {
  return `${career.name} · ${career.campus} (${UNI_LABEL[career.universidad]})`;
}

export function careerDiagnosticUni(career: AdmissionCareer): 'unam' | 'ipn' | 'uam' {
  return career.universidad;
}

/** Materias con mayor peso para la carrera (énfasis visual). */
export function getEmphasisMateriaIds(career: AdmissionCareer): Set<string> {
  if (career.universidad === 'unam') {
    const area = parseUnamAreaId(career.area);
    return new Set(filterMateriasByArea(area).map((m) => m.id));
  }
  if (career.universidad === 'uam') {
    const div = parseUamDivision(career.area);
    if (div === 'todas') return new Set(filterUamMateriasByDivision('todas').map((m) => m.id));
    return new Set(getUamMateriasForDivision(div as UamDivisionId).map((m) => m.id));
  }
  return new Set(getIpnTemarioMaterias().map((m) => m.id));
}
