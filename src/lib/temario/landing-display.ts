/**
 * Temario serializado para la landing — solo servidor (importa datos pesados).
 */

import { getTemarioForUni } from './server';
import type { TemarioUniId, UnamTemarioTopic } from './types';

export interface LandingTopicGroup {
  titulo: string;
  codigo?: string;
  subtemas: { titulo: string; codigo?: string }[];
  moreSubtemas?: number;
}

export interface LandingMateriaBlock {
  id: string;
  nombre: string;
  icon: string;
  reactivosOficiales: number;
  topicGroups: LandingTopicGroup[];
  hasTopics: boolean;
}

export interface LandingTemarioBlock {
  uniId: TemarioUniId;
  nombre: string;
  convocatoria: string;
  totalReactivos: number;
  fuente: string;
  materias: LandingMateriaBlock[];
}

const MAX_SUBTEMAS = 10;

function buildTopicGroups(topics: UnamTemarioTopic[]): LandingTopicGroup[] {
  return topics.map((topic) => {
    const children = topic.children ?? [];
    const visible = children.slice(0, MAX_SUBTEMAS);
    const more = children.length - visible.length;
    return {
      titulo: topic.titulo,
      codigo: topic.codigo,
      subtemas: visible.map((child) => ({
        titulo: child.titulo,
        codigo: child.codigo,
      })),
      ...(more > 0 ? { moreSubtemas: more } : {}),
    };
  });
}

export function getLandingTemarioCatalog(): LandingTemarioBlock[] {
  const unis: TemarioUniId[] = ['unam', 'ipn', 'uam'];
  return unis.map((uniId) => {
    const data = getTemarioForUni(uniId);
    return {
      uniId,
      nombre: data.meta.nombre,
      convocatoria: data.meta.convocatoria,
      totalReactivos: data.meta.totalReactivos,
      fuente: data.meta.fuente,
      materias: data.materias.map((materia) => ({
        id: materia.id,
        nombre: materia.nombre,
        icon: materia.icon,
        reactivosOficiales: materia.reactivosOficiales,
        topicGroups: buildTopicGroups(materia.topics),
        hasTopics: materia.topics.length > 0,
      })),
    };
  });
}
