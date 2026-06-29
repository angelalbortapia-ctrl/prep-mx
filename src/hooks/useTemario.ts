'use client';

import { useQuery } from '@tanstack/react-query';
import type {
  TemarioMateriaDetailResponse,
  TemarioOverviewItem,
  TemarioSummaryResponse,
  TemarioUniId,
} from '@/lib/temario/types';

/** Temarios — staleTime 24h vía setQueryDefaults(['study', 'temario']). */

export function useTemarioSummary(uni: TemarioUniId, filter: string) {
  return useQuery<TemarioSummaryResponse>({
    queryKey: ['study', 'temario', uni, filter],
    queryFn: async () => {
      const qs = new URLSearchParams({ uni, filter });
      const res = await fetch(`/api/study/temario?${qs}`);
      if (!res.ok) throw new Error('Temario no disponible');
      return (await res.json()) as TemarioSummaryResponse;
    },
  });
}

export function useTemarioMateriaDetail(
  uni: TemarioUniId,
  materiaId: string | null,
  enabled: boolean
) {
  return useQuery<TemarioMateriaDetailResponse>({
    queryKey: ['study', 'temario', uni, 'materia', materiaId],
    queryFn: async () => {
      const qs = new URLSearchParams({ uni });
      const res = await fetch(`/api/study/temario/${materiaId}?${qs}`);
      if (!res.ok) throw new Error('Materia no encontrada');
      return (await res.json()) as TemarioMateriaDetailResponse;
    },
    enabled: enabled && Boolean(materiaId),
  });
}

export function useTemarioOverview() {
  return useQuery<{ exams: TemarioOverviewItem[] }>({
    queryKey: ['temario', 'overview'],
    queryFn: async () => {
      const res = await fetch('/api/temario/overview');
      if (!res.ok) throw new Error('Overview no disponible');
      return (await res.json()) as { exams: TemarioOverviewItem[] };
    },
  });
}
