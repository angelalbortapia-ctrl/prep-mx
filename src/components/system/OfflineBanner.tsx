'use client';

import { useEffect, useState } from 'react';
import { CloudOff, Wifi } from 'lucide-react';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { cn } from '@/lib/utils';

/**
 * Banner sutil y animado de estado de red. Aparece deslizándose desde arriba
 * cuando se pierde conexión y muestra brevemente "Reconectado" al volver.
 * Respeta el safe-area superior (notch) en dispositivos nativos.
 */
export function OfflineBanner() {
  const { isOnline, wasOffline } = useOnlineStatus();
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    if (isOnline && wasOffline) {
      setShowReconnected(true);
      const t = setTimeout(() => setShowReconnected(false), 2600);
      return () => clearTimeout(t);
    }
  }, [isOnline, wasOffline]);

  const visible = !isOnline || showReconnected;

  return (
    <div
      aria-live="polite"
      role="status"
      className={cn(
        'pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-center px-3',
        'pt-[max(0.5rem,env(safe-area-inset-top))] transition-all duration-500 ease-out',
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      )}
    >
      <div
        className={cn(
          'pointer-events-auto flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-lg backdrop-blur-md',
          isOnline
            ? 'bg-emerald-600/95 text-white shadow-emerald-900/20'
            : 'bg-amber-500/95 text-amber-950 shadow-amber-900/20'
        )}
      >
        {isOnline ? (
          <>
            <Wifi className="h-4 w-4" />
            Conexión restaurada · sincronizando…
          </>
        ) : (
          <>
            <CloudOff className="h-4 w-4 animate-pulse" />
            Sin conexión · tu progreso se guarda en el dispositivo
          </>
        )}
      </div>
    </div>
  );
}
