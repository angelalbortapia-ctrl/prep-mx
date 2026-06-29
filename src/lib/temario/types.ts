/** Tipos compartidos del temario (sin datos pesados — seguro para el cliente). */

export type UnamAreaId = 'area1' | 'area2' | 'area3' | 'area4' | 'area5' | 'area6';

export type UnamTemarioTopicStatus = 'pendiente' | 'publicado';

export interface UnamTemarioTopic {
  id: string;
  codigo?: string;
  titulo: string;
  descripcion?: string;
  orden: number;
  status: UnamTemarioTopicStatus;
  guideSlug?: string;
  children?: UnamTemarioTopic[];
}

export interface UnamTemarioMateria {
  id: string;
  nombre: string;
  icon: string;
  reactivosOficiales: number;
  areasRelacionadas: UnamAreaId[];
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

export type TemarioUniId = 'unam' | 'uam' | 'ipn';

export type TemarioAvailability = 'disponible' | 'preparacion';

export type TemarioAreaId = UnamAreaId;
export type TemarioArea = UnamTemarioArea;
export type TemarioMateria = UnamTemarioMateria;
export type TemarioTopic = UnamTemarioTopic;
export type TemarioTopicStatus = UnamTemarioTopicStatus;

export interface TemarioUniMeta {
  uniId: TemarioUniId;
  nombre: string;
  convocatoria: string;
  totalReactivos: number;
  horasExamen: number;
  fuente: string;
  availability: TemarioAvailability;
}

export interface TemarioFilterOption {
  id: string;
  label: string;
}

export interface TemarioMateriaSummary {
  id: string;
  nombre: string;
  icon: string;
  reactivosOficiales: number;
  areasRelacionadas: UnamAreaId[];
  topicCount: number;
  topicsPublicados: number;
  hasTopics: boolean;
}

export interface TemarioTopicStats {
  total: number;
  publicados: number;
  pendientes: number;
}

export interface TemarioSummaryResponse {
  meta: TemarioUniMeta;
  filters: TemarioFilterOption[];
  defaultFilter: string;
  materias: TemarioMateriaSummary[];
  materiaIds: string[];
  stats: TemarioTopicStats;
  hasDetailedContent: boolean;
  fetchedAt: string;
}

export interface TemarioMateriaDetailResponse {
  uni: TemarioUniId;
  materiaId: string;
  materia: TemarioMateriaSummary;
  topics: UnamTemarioTopic[];
  fetchedAt: string;
}

export interface TemarioOverviewItem {
  id: TemarioUniId;
  label: string;
  convocatoria: string;
  totalReactivos: number;
  horasExamen: number;
  materiasCount: number;
  topicsPublicados: number;
  availability: TemarioAvailability;
}
