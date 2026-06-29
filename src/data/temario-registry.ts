/**
 * Registro ligero de temarios — seguro para importar en el cliente.
 * Los datos pesados viven en `@/lib/temario/server` y `/api/study/temario`.
 */

export type {
  TemarioArea,
  TemarioAreaId,
  TemarioAvailability,
  TemarioMateria,
  TemarioMateriaSummary,
  TemarioTopic,
  TemarioTopicStatus,
  TemarioUniId,
  TemarioUniMeta,
  UnamAreaId,
  UnamTemarioArea,
  UnamTemarioMateria,
  UnamTemarioTopic,
} from '@/lib/temario/types';

export { countTemarioTopics } from '@/lib/temario/utils';

import type { UniversidadFilter } from '@/lib/university-theme';
import type { UniId } from '@/lib/uni-theme-config';
import type { TemarioUniId } from '@/lib/temario/types';

export const TEMARIO_UNI_OPTIONS: { id: TemarioUniId; label: string }[] = [
  { id: 'unam', label: 'UNAM' },
  { id: 'ipn', label: 'IPN' },
  { id: 'uam', label: 'UAM' },
];

const TEMARIO_HAS_DETAILED: Record<TemarioUniId, boolean> = {
  unam: true,
  uam: true,
  ipn: true,
};

export function resolveTemarioUniId(filterId: UniversidadFilter, uniId?: UniId): TemarioUniId {
  if (filterId === 'unam' || filterId === 'ipn' || filterId === 'uam') return filterId;
  if (uniId === 'unam' || uniId === 'ipn' || uniId === 'uam') return uniId;
  return 'unam';
}

export function temarioHasDetailedContent(uni: TemarioUniId): boolean {
  return TEMARIO_HAS_DETAILED[uni];
}

export function isPlaceholderPesoRelativo(_uni: TemarioUniId): boolean {
  return false;
}
