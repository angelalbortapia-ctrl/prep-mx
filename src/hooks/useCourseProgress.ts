'use client';

import { useCallback, useRef } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getFirstIncompleteLesson } from '@/data/implementation-course';
import { isDemoMode } from '@/lib/demo-mode';
import {
  getDefaultProgress,
  loadCourseProgress,
  saveCourseProgress,
  type CourseProgress,
} from '@/lib/course-progress';
import type { LessonToggleInput } from '@/lib/supabase/lessons-progress';

export const COURSE_PROGRESS_QUERY_KEY = ['course-progress'] as const;

function readLocalCourseProgress(): CourseProgress {
  return { ...getDefaultProgress(), ...loadCourseProgress() };
}

function hasLocalProgress(progress: CourseProgress): boolean {
  return (
    progress.completedLessonIds.length > 0 ||
    Object.keys(progress.checkedSteps).length > 0 ||
    Boolean(progress.currentLessonId)
  );
}

function isEmptyProgress(progress: CourseProgress): boolean {
  return (
    progress.completedLessonIds.length === 0 &&
    Object.keys(progress.checkedSteps).length === 0 &&
    !progress.currentLessonId
  );
}

async function fetchRemoteProgress(): Promise<CourseProgress> {
  const res = await fetch('/api/study/lessons/progress', { credentials: 'include' });
  if (res.status === 401) return getDefaultProgress();
  if (!res.ok) throw new Error('No se pudo cargar el progreso del curso');
  const data = (await res.json()) as { progress: CourseProgress };
  return { ...getDefaultProgress(), ...data.progress };
}

async function postToggle(input: LessonToggleInput): Promise<CourseProgress> {
  const res = await fetch('/api/study/lessons/toggle', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error ?? 'No se pudo guardar el progreso');
  }
  const data = (await res.json()) as { progress: CourseProgress };
  return { ...getDefaultProgress(), ...data.progress };
}

export interface UseCourseProgressResult {
  progress: CourseProgress;
  hydrated: boolean;
  isSyncing: boolean;
  useLocalOnly: boolean;
  persist: (next: CourseProgress) => void;
  syncToggle: (input: LessonToggleInput) => void;
  resetProgress: () => void;
}

/**
 * Progreso del curso guiado: Supabase + TanStack Query (con fallback local si no hay sesión).
 */
export function useCourseProgress(): UseCourseProgressResult {
  const { isSignedIn, isLoaded } = useAuth();
  const demo = isDemoMode();
  const syncToRemote = isLoaded && Boolean(isSignedIn) && !(demo && !isSignedIn);
  const useLocalOnly = !syncToRemote;
  const queryClient = useQueryClient();
  const migratedRef = useRef(false);

  const { data: progress = readLocalCourseProgress(), isFetched } = useQuery<CourseProgress>({
    queryKey: [...COURSE_PROGRESS_QUERY_KEY, syncToRemote ? 'remote' : 'local'],
    queryFn: async () => {
      if (!syncToRemote) {
        return readLocalCourseProgress();
      }
      try {
        const remote = await fetchRemoteProgress();
        if (!migratedRef.current && isEmptyProgress(remote)) {
          const local = loadCourseProgress();
          if (hasLocalProgress(local)) {
            migratedRef.current = true;
            const imported = await postToggle({ lessonId: 'lesson-welcome', importProgress: local });
            saveCourseProgress(imported);
            return imported;
          }
        }
        saveCourseProgress(remote);
        return remote;
      } catch {
        return readLocalCourseProgress();
      }
    },
    placeholderData: readLocalCourseProgress,
    staleTime: syncToRemote ? 30_000 : Infinity,
    refetchOnWindowFocus: syncToRemote,
  });

  const hydrated = isFetched;

  const mutation = useMutation<CourseProgress, Error, LessonToggleInput, { previous: CourseProgress }>({
    mutationFn: postToggle,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: COURSE_PROGRESS_QUERY_KEY });
      const previous =
        queryClient.getQueryData<CourseProgress>(COURSE_PROGRESS_QUERY_KEY) ?? readLocalCourseProgress();
      return { previous };
    },
    onSuccess: (next, input) => {
      const merged = input.reset
        ? {
            ...getDefaultProgress(),
            currentLessonId: getFirstIncompleteLesson([]).id,
          }
        : { ...getDefaultProgress(), ...next };
      saveCourseProgress(merged);
      queryClient.setQueryData([...COURSE_PROGRESS_QUERY_KEY, 'remote'], merged);
    },
    onError: (_err, _input, context) => {
      if (context?.previous) {
        queryClient.setQueryData([...COURSE_PROGRESS_QUERY_KEY, 'local'], context.previous);
      }
    },
  });

  const persist = useCallback(
    (next: CourseProgress) => {
      saveCourseProgress(next);
      queryClient.setQueryData(
        [...COURSE_PROGRESS_QUERY_KEY, syncToRemote ? 'remote' : 'local'],
        next
      );
    },
    [queryClient, syncToRemote]
  );

  const syncToggle = useCallback(
    (input: LessonToggleInput) => {
      if (!syncToRemote) return;
      mutation.mutate(input);
    },
    [mutation, syncToRemote]
  );

  const resetProgress = useCallback(() => {
    const fresh = {
      ...getDefaultProgress(),
      currentLessonId: getFirstIncompleteLesson([]).id,
    };
    saveCourseProgress(fresh);
    queryClient.setQueryData(
      [...COURSE_PROGRESS_QUERY_KEY, syncToRemote ? 'remote' : 'local'],
      fresh
    );
    if (syncToRemote) {
      mutation.mutate({ lessonId: 'lesson-welcome', reset: true });
    }
  }, [mutation, queryClient, syncToRemote]);

  return {
    progress,
    hydrated,
    isSyncing: mutation.isPending,
    useLocalOnly,
    persist,
    syncToggle,
    resetProgress,
  };
}
