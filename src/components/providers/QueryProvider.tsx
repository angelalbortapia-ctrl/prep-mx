'use client';

import { useEffect, useState } from 'react';
import { onlineManager, QueryClientProvider } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { createQueryClient, isStaticCatalogQueryKey, PERSISTED_QUERY_MAX_AGE } from '@/lib/query/query-client';

const STORAGE_KEY = 'prepmx-query-cache';

/**
 * Provee TanStack Query con persistencia en LocalStorage.
 *
 * - El caché sobrevive recargas y reaperturas (clave para offline en móvil).
 * - `onlineManager` se conecta a los eventos de red del navegador para que las
 *   queries/mutaciones se reanuden solas al recuperar conexión.
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => createQueryClient());
  const [persister] = useState(() => {
    if (typeof window === 'undefined') return undefined;
    return createSyncStoragePersister({
      storage: window.localStorage,
      key: STORAGE_KEY,
      throttleTime: 1000,
    });
  });

  useEffect(() => {
    return onlineManager.subscribe(() => {
      if (onlineManager.isOnline()) {
        void queryClient.resumePausedMutations().then(() =>
          queryClient.invalidateQueries({
            predicate: (query) => !isStaticCatalogQueryKey(query.queryKey),
          })
        );
      }
    });
  }, [queryClient]);

  if (!persister) {
    // SSR: persistencia requiere window; el cliente sí necesita QueryClientProvider.
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: PERSISTED_QUERY_MAX_AGE,
        dehydrateOptions: {
          shouldDehydrateQuery: (query) => isStaticCatalogQueryKey(query.queryKey),
        },
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
