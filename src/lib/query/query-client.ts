import { QueryClient } from '@tanstack/react-query';

/** 10 minutos: las preguntas y materias casi no cambian dentro de una sesión. */
export const DEFAULT_STALE_TIME = 1000 * 60 * 10;
/** 24h en caché para servir contenido offline al reabrir la app. */
export const DEFAULT_GC_TIME = 1000 * 60 * 60 * 24;

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: DEFAULT_STALE_TIME,
        gcTime: DEFAULT_GC_TIME,
        // En móvil bajo presión no queremos reintentos agresivos que congelen la UI.
        retry: 2,
        retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),
        refetchOnWindowFocus: false,
        // Al recuperar señal, TanStack reintenta automáticamente las queries pausadas.
        networkMode: 'offlineFirst',
      },
      mutations: {
        networkMode: 'offlineFirst',
        retry: 3,
      },
    },
  });
}
