import type { TemarioMateriaSummary, TemarioTopicStats, UnamTemarioMateria, UnamTemarioTopic } from './types';

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

export function countTemarioTopics(materias: Pick<UnamTemarioMateria, 'topics'>[]): TemarioTopicStats {
  let total = 0;
  let publicados = 0;
  for (const m of materias) {
    const counts = countTopicLeaves(m.topics);
    total += counts.total;
    publicados += counts.publicados;
  }
  return { total, publicados, pendientes: total - publicados };
}

export function summarizeMateria(materia: UnamTemarioMateria): TemarioMateriaSummary {
  const counts = countTopicLeaves(materia.topics);
  return {
    id: materia.id,
    nombre: materia.nombre,
    icon: materia.icon,
    reactivosOficiales: materia.reactivosOficiales,
    areasRelacionadas: materia.areasRelacionadas,
    topicCount: counts.total,
    topicsPublicados: counts.publicados,
    hasTopics: materia.topics.length > 0,
  };
}

export function stripMateriaTopics(materia: UnamTemarioMateria): UnamTemarioMateria {
  return { ...materia, topics: [] };
}
