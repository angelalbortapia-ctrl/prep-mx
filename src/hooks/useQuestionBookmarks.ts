'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isDemoMode } from '@/lib/demo-mode';
import { queryKeys } from '@/hooks/useStudyData';

export interface BookmarkedQuestion {
  questionId: string;
  materia: string;
  tema: string;
  savedAt: string;
}

interface TogglePayload {
  questionId: string;
  materia: string;
  tema: string;
  add: boolean;
}

const LOCAL_KEY = 'prepmx-question-bookmarks';

function readLocalBookmarks(): BookmarkedQuestion[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? (JSON.parse(raw) as BookmarkedQuestion[]) : [];
  } catch {
    return [];
  }
}

function writeLocalBookmarks(items: BookmarkedQuestion[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
  } catch {
    /* best-effort */
  }
}

export function useQuestionBookmarks() {
  const { isSignedIn, isLoaded } = useAuth();
  const demo = isDemoMode();
  const useLocalOnly = demo && !isSignedIn;
  const queryClient = useQueryClient();
  const [localBookmarks, setLocalBookmarks] = useState<BookmarkedQuestion[]>([]);
  const [localHydrated, setLocalHydrated] = useState(false);

  useEffect(() => {
    if (useLocalOnly) {
      setLocalBookmarks(readLocalBookmarks());
      setLocalHydrated(true);
    }
  }, [useLocalOnly]);

  const { data: remoteBookmarks = [], isFetched } = useQuery<BookmarkedQuestion[]>({
    queryKey: queryKeys.bookmarks,
    queryFn: async () => {
      const res = await fetch('/api/bookmarks', { credentials: 'include' });
      if (res.status === 401) return [];
      if (!res.ok) throw new Error('No se pudieron cargar los marcadores');
      const data = (await res.json()) as { bookmarks: BookmarkedQuestion[] };
      return data.bookmarks;
    },
    enabled: isLoaded && isSignedIn && !useLocalOnly,
    staleTime: 60_000,
  });

  const bookmarks = useLocalOnly ? localBookmarks : remoteBookmarks;

  const mutation = useMutation<void, Error, TogglePayload, { previous: BookmarkedQuestion[] }>({
    onMutate: async (payload) => {
      if (useLocalOnly) {
        const previous = readLocalBookmarks();
        const next = payload.add
          ? [
              ...previous.filter((b) => b.questionId !== payload.questionId),
              {
                questionId: payload.questionId,
                materia: payload.materia,
                tema: payload.tema,
                savedAt: new Date().toISOString(),
              },
            ]
          : previous.filter((b) => b.questionId !== payload.questionId);
        setLocalBookmarks(next);
        writeLocalBookmarks(next);
        return { previous };
      }

      await queryClient.cancelQueries({ queryKey: queryKeys.bookmarks });
      const previous = queryClient.getQueryData<BookmarkedQuestion[]>(queryKeys.bookmarks) ?? [];
      const next = payload.add
        ? [
            ...previous.filter((b) => b.questionId !== payload.questionId),
            {
              questionId: payload.questionId,
              materia: payload.materia,
              tema: payload.tema,
              savedAt: new Date().toISOString(),
            },
          ]
        : previous.filter((b) => b.questionId !== payload.questionId);
      queryClient.setQueryData<BookmarkedQuestion[]>(queryKeys.bookmarks, next);
      return { previous };
    },
    mutationFn: async (payload) => {
      if (useLocalOnly) return;

      if (payload.add) {
        const res = await fetch('/api/bookmarks', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            questionId: payload.questionId,
            materia: payload.materia,
            tema: payload.tema,
          }),
        });
        if (!res.ok) throw new Error('Error al guardar marcador');
      } else {
        const res = await fetch('/api/bookmarks', {
          method: 'DELETE',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ questionId: payload.questionId }),
        });
        if (!res.ok) throw new Error('Error al quitar marcador');
      }
    },
    onError: (_err, _payload, context) => {
      if (useLocalOnly && context?.previous) {
        setLocalBookmarks(context.previous);
        writeLocalBookmarks(context.previous);
        return;
      }
      if (context?.previous) {
        queryClient.setQueryData<BookmarkedQuestion[]>(queryKeys.bookmarks, context.previous);
      }
    },
  });

  const isBookmarked = useCallback(
    (questionId: string) => bookmarks.some((b) => b.questionId === questionId),
    [bookmarks]
  );

  const toggleBookmark = useCallback(
    (payload: Omit<TogglePayload, 'add'>) => {
      if (!isLoaded) return;
      if (!useLocalOnly && !isSignedIn) {
        const redirect = encodeURIComponent(
          typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/'
        );
        window.location.href = `/sign-in?redirect_url=${redirect}`;
        return;
      }
      const add = !isBookmarked(payload.questionId);
      mutation.mutate({ ...payload, add });
    },
    [isBookmarked, isLoaded, isSignedIn, mutation, useLocalOnly]
  );

  return {
    bookmarks,
    hydrated: useLocalOnly ? localHydrated : isLoaded && (!isSignedIn || isFetched),
    isBookmarked,
    toggleBookmark,
  };
}
