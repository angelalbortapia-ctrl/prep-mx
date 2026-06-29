import { unstable_cache } from 'next/cache';
import { getStudyMaterias } from '@/data/study-materias';
import {
  getTemarioMateriaDetail,
  getTemarioOverviewItems,
  getTemarioSummary,
} from '@/lib/temario/server';
import type { TemarioUniId } from '@/lib/temario/types';

/** Alineado con STATIC_CATALOG_STALE_TIME en TanStack Query (24 h). */
export const STATIC_CATALOG_REVALIDATE_SECONDS = 60 * 60 * 24;

export const STATIC_CATALOG_CACHE_HEADERS = {
  'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
} as const;

export const STATIC_CATALOG_MATERIAS_HEADERS = {
  'Cache-Control': 'public, max-age=0, s-maxage=600, stale-while-revalidate=86400',
} as const;

export async function getCachedStudyMaterias() {
  return unstable_cache(
    async () => getStudyMaterias(),
    ['prepmx-catalog', 'study-materias'],
    {
      revalidate: STATIC_CATALOG_REVALIDATE_SECONDS,
      tags: ['catalog-materias'],
    }
  )();
}

export async function getCachedTemarioSummary(uni: TemarioUniId, filter?: string) {
  const filterKey = filter ?? '__default__';
  return unstable_cache(
    async () => getTemarioSummary(uni, filter),
    ['prepmx-catalog', 'temario-summary', uni, filterKey],
    {
      revalidate: STATIC_CATALOG_REVALIDATE_SECONDS,
      tags: ['catalog-temario', `temario-${uni}`],
    }
  )();
}

export async function getCachedTemarioMateriaDetail(uni: TemarioUniId, materiaId: string) {
  return unstable_cache(
    async () => getTemarioMateriaDetail(uni, materiaId),
    ['prepmx-catalog', 'temario-materia', uni, materiaId],
    {
      revalidate: STATIC_CATALOG_REVALIDATE_SECONDS,
      tags: ['catalog-temario', `temario-${uni}`, `temario-materia-${materiaId}`],
    }
  )();
}

export async function getCachedTemarioOverview() {
  return unstable_cache(
    async () => getTemarioOverviewItems(),
    ['prepmx-catalog', 'temario-overview'],
    {
      revalidate: STATIC_CATALOG_REVALIDATE_SECONDS,
      tags: ['catalog-temario'],
    }
  )();
}
