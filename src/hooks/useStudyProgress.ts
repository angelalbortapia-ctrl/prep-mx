'use client';

import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isQuestionMastered, recordMasterySuccess } from '@/lib/study-mastery';

const STORAGE_KEY = 'prepmx-study-progress';

/** Resultado de un intento de quiz para un concepto/guía concreto. */
export interface StudyProgressEntry {
  /** Slug de la guía (materia). */
  slug: string;
  /** Id de la pregunta acertada dentro del quiz. */
  questionId: string;
  /** Marca de tiempo en ms del acierto (epoch). */
  completedAt: number;
}

/** Mapa de progreso: clave `${slug}:${questionId}` -> entrada. */
export type StudyProgressMap = Record<string, StudyProgressEntry>;

const QUERY_KEY = ['study-progress'] as const;

function readProgress(): StudyProgressMap {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === 'object') return parsed as StudyProgressMap;
    return {};
  } catch {
    return {};
  }
}

function writeProgress(map: StudyProgressMap): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    /* almacenamiento lleno o bloqueado: el progreso es best-effort */
  }
}

export interface UseStudyProgressResult {
  /** Progreso actual cacheado. */
  progress: StudyProgressMap;
  /** `true` si la pregunta ya fue acertada antes. */
  isCompleted: (slug: string, questionId: string) => boolean;
  /** `true` si SM-2 marcó el concepto como dominado. */
  isMastered: (slug: string, questionId: string) => boolean;
  /** Persiste un acierto de quiz (offline-first). */
  saveProgress: (entry: Omit<StudyProgressEntry, 'completedAt'>) => void;
  /** Estado de la mutación de guardado. */
  isSaving: boolean;
}

/**
 * Persiste el progreso de los mini-quizzes de las guías de estudio.
 *
 * La `mutationFn` escribe directamente en `localStorage` (no hay red), por lo
 * que funciona offline. Usa `networkMode: 'offlineFirst'` para que TanStack
 * Query nunca pause la mutación esperando conexión.
 */
export function useStudyProgress(): UseStudyProgressResult {
  const queryClient = useQueryClient();

  const { data: progress = {} } = useQuery<StudyProgressMap>({
    queryKey: QUERY_KEY,
    queryFn: readProgress,
    staleTime: Infinity,
  });

  const mutation = useMutation<
    StudyProgressMap,
    Error,
    Omit<StudyProgressEntry, 'completedAt'>,
    { previous: StudyProgressMap }
  >({
    networkMode: 'offlineFirst',
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEY });
      const previous = queryClient.getQueryData<StudyProgressMap>(QUERY_KEY) ?? readProgress();
      const key = `${input.slug}:${input.questionId}`;
      const optimistic: StudyProgressMap = {
        ...previous,
        [key]: { ...input, completedAt: Date.now() },
      };
      queryClient.setQueryData<StudyProgressMap>(QUERY_KEY, optimistic);
      return { previous };
    },
    mutationFn: async (input) => {
      recordMasterySuccess(input.slug, input.questionId);
      const current = readProgress();
      const key = `${input.slug}:${input.questionId}`;
      const next: StudyProgressMap = {
        ...current,
        [key]: { ...input, completedAt: Date.now() },
      };
      writeProgress(next);
      return next;
    },
    onError: (_err, _input, context) => {
      if (context?.previous) {
        queryClient.setQueryData<StudyProgressMap>(QUERY_KEY, context.previous);
      }
    },
    onSuccess: (next) => {
      queryClient.setQueryData<StudyProgressMap>(QUERY_KEY, next);
    },
  });

  const isCompleted = useCallback(
    (slug: string, questionId: string) => Boolean(progress[`${slug}:${questionId}`]),
    [progress]
  );

  const saveProgress = useCallback(
    (entry: Omit<StudyProgressEntry, 'completedAt'>) => {
      mutation.mutate(entry);
    },
    [mutation]
  );

  const isMastered = useCallback(
    (slug: string, questionId: string) => isQuestionMastered(slug, questionId),
    []
  );

  return {
    progress,
    isCompleted,
    isMastered,
    saveProgress,
    isSaving: mutation.isPending,
  };
}
