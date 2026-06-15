'use client';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { StudyMateria } from '@/data/study-materias';
import type { Question } from '@/types/question';
import { DEFAULT_STALE_TIME } from '@/lib/query/query-client';

export const queryKeys = {
  materias: ['study', 'materias'] as const,
  examQuestions: (uni: string, limit: number) => ['exam', 'questions', uni, limit] as const,
  bookmarks: ['user', 'bookmarks'] as const,
  profile: ['user', 'profile'] as const,
};

async function fetchJSON<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { ...init, headers: { accept: 'application/json', ...init?.headers } });
  if (!res.ok) throw new Error(`Request a ${url} falló: ${res.status}`);
  return (await res.json()) as T;
}

/**
 * Materias de la Zona de Estudio con caché de 10 min + persistencia offline.
 * Si el alumno pierde señal, TanStack sirve la última copia desde LocalStorage.
 */
export function useStudyMaterias(
  initialData?: StudyMateria[]
): UseQueryResult<StudyMateria[], Error> {
  return useQuery({
    queryKey: queryKeys.materias,
    queryFn: async () => {
      const data = await fetchJSON<{ materias: StudyMateria[] }>('/api/study/materias');
      return data.materias;
    },
    initialData,
    staleTime: DEFAULT_STALE_TIME,
  });
}

/**
 * Preguntas del simulador con caché. Mantiene la copia previa mientras refresca
 * (placeholderData) para que el examen no parpadee en transiciones.
 */
export function useExamQuestions(params: {
  universidad?: string;
  limit?: number;
  initialData?: Question[];
  enabled?: boolean;
}): UseQueryResult<Question[], Error> {
  const uni = params.universidad ?? 'todas';
  const limit = params.limit ?? 20;

  return useQuery({
    queryKey: queryKeys.examQuestions(uni, limit),
    queryFn: async () => {
      const search = new URLSearchParams({ limit: String(limit) });
      if (uni && uni !== 'todas') search.set('uni', uni);
      const data = await fetchJSON<{ questions: Question[] }>(`/api/exam/questions?${search}`, {
        credentials: 'include',
      });
      return data.questions;
    },
    initialData: params.initialData,
    enabled: params.enabled ?? true,
    staleTime: DEFAULT_STALE_TIME,
  });
}
