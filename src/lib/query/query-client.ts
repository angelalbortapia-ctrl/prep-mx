import { QueryClient, type QueryKey } from '@tanstack/react-query';

/** Datos de usuario / progreso — refresco moderado. */
export const DEFAULT_STALE_TIME = 1000 * 60 * 5;
/** Caché en memoria para queries dinámicas. */
export const DEFAULT_GC_TIME = 1000 * 60 * 60 * 24;

/**
 * Catálogo estático (materias, temarios): cambia con la convocatoria, no cada sesión.
 * 24h sin refetch al cambiar pestañas en el dashboard.
 */
export const STATIC_CATALOG_STALE_TIME = 1000 * 60 * 60 * 24;
/** Mantener temario/materias en caché persistida toda la semana (offline). */
export const STATIC_CATALOG_GC_TIME = 1000 * 60 * 60 * 24 * 7;

/**
 * Banco de preguntas del simulador (hasta 120 ítems): fresco mientras la vista está abierta,
 * pero se libera en cuanto el alumno sale del simulador (gcTime 0).
 */
export const BULK_QUESTIONS_STALE_TIME = 1000 * 60 * 5;
export const BULK_QUESTIONS_GC_TIME = 0;

const STATIC_CATALOG_QUERY_DEFAULTS = {
  staleTime: STATIC_CATALOG_STALE_TIME,
  gcTime: STATIC_CATALOG_GC_TIME,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
} as const;

const BULK_QUESTIONS_QUERY_DEFAULTS = {
  staleTime: BULK_QUESTIONS_STALE_TIME,
  gcTime: BULK_QUESTIONS_GC_TIME,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
} as const;

/** Prefijos de queryKey que apuntan a contenido estático de convocatoria. */
export function isStaticCatalogQueryKey(queryKey: QueryKey): boolean {
  const [root, second] = queryKey;
  if (root === 'study' && (second === 'materias' || second === 'temario')) return true;
  if (root === 'temario') return true;
  return false;
}

export function isBulkQuestionsQueryKey(queryKey: QueryKey): boolean {
  const [root, second] = queryKey;
  return root === 'exam' && second === 'questions';
}

export function createQueryClient(): QueryClient {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: DEFAULT_STALE_TIME,
        gcTime: DEFAULT_GC_TIME,
        retry: 2,
        retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),
        refetchOnWindowFocus: false,
        networkMode: 'offlineFirst',
      },
      mutations: {
        networkMode: 'offlineFirst',
        /** Por defecto sin reintentos — las mutaciones críticas lo declaran explícito. */
        retry: false,
      },
    },
  });

  client.setQueryDefaults(['study', 'materias'], STATIC_CATALOG_QUERY_DEFAULTS);
  client.setQueryDefaults(['study', 'temario'], STATIC_CATALOG_QUERY_DEFAULTS);
  client.setQueryDefaults(['temario'], STATIC_CATALOG_QUERY_DEFAULTS);
  client.setQueryDefaults(['exam', 'questions'], BULK_QUESTIONS_QUERY_DEFAULTS);

  return client;
}

/** Duración máxima del caché persistido en LocalStorage (temarios offline). */
export const PERSISTED_QUERY_MAX_AGE = STATIC_CATALOG_GC_TIME;
