'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="es">
      <body className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 text-center">
        <h1 className="text-xl font-bold text-zinc-900">Algo salió mal</h1>
        <p className="mt-2 max-w-md text-sm text-zinc-600">
          El equipo ya fue notificado. Intenta recargar la página.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white"
        >
          Reintentar
        </button>
      </body>
    </html>
  );
}
