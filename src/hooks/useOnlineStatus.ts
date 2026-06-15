'use client';

import { useEffect, useState } from 'react';

export interface OnlineStatus {
  /** Hay conexión a la red ahora mismo. */
  isOnline: boolean;
  /** Estuvo offline en algún momento de la sesión (para mostrar "reconectado"). */
  wasOffline: boolean;
  /** Marca de tiempo del último cambio de conexión. */
  changedAt: number;
}

/**
 * Estado de conectividad reactivo. SSR-safe (asume online hasta hidratar).
 * Útil para pausar/reanudar sincronización y mostrar banners de red.
 */
export function useOnlineStatus(): OnlineStatus {
  const [status, setStatus] = useState<OnlineStatus>(() => ({
    isOnline: typeof navigator === 'undefined' ? true : navigator.onLine,
    wasOffline: false,
    changedAt: Date.now(),
  }));

  useEffect(() => {
    const goOnline = () =>
      setStatus((prev) => ({ isOnline: true, wasOffline: prev.wasOffline, changedAt: Date.now() }));
    const goOffline = () => setStatus({ isOnline: false, wasOffline: true, changedAt: Date.now() });

    // Re-sincroniza con el valor real tras montar.
    setStatus((prev) => ({ ...prev, isOnline: navigator.onLine }));

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  return status;
}
