'use client';

import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

export type ClerkSessionStatus = 'loading' | 'signed-out' | 'verifying' | 'ready' | 'error';

export interface VerifiedClerkSession {
  status: ClerkSessionStatus;
  /** Clerk terminó de hidratar (`isLoaded`). */
  isLoaded: boolean;
  isSignedIn: boolean;
  /** Token JWT obtenido — listo para APIs protegidas por middleware. */
  isSessionVerified: boolean;
  /** Alias de `status === 'ready'`. */
  isSessionReady: boolean;
  sessionError: string | null;
}

/**
 * Espera a que Clerk hidrate y el JWT esté disponible antes de llamar APIs
 * protegidas (evita 401 justo tras sign-up → /onboarding).
 */
export function useVerifiedClerkSession(): VerifiedClerkSession {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const [status, setStatus] = useState<ClerkSessionStatus>('loading');
  const [sessionError, setSessionError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded) {
      setStatus('loading');
      setSessionError(null);
      return;
    }

    if (!isSignedIn) {
      setStatus('signed-out');
      setSessionError(null);
      return;
    }

    let cancelled = false;
    setStatus('verifying');
    setSessionError(null);

    void (async () => {
      try {
        const token = await getToken();
        if (cancelled) return;

        if (!token) {
          setStatus('error');
          setSessionError('No se pudo obtener el token de sesión. Intenta recargar.');
          return;
        }

        setStatus('ready');
      } catch {
        if (!cancelled) {
          setStatus('error');
          setSessionError('No se pudo verificar la sesión. Intenta recargar.');
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn, getToken]);

  const isSessionVerified = status === 'ready';
  const isSessionReady = isLoaded && Boolean(isSignedIn) && isSessionVerified;

  return {
    status,
    isLoaded,
    isSignedIn: Boolean(isSignedIn),
    isSessionVerified,
    isSessionReady,
    sessionError,
  };
}
