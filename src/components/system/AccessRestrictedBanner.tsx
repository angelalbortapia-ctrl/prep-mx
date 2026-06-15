'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, X } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Alerta sutil cuando el middleware redirige por acceso restringido.
 * Se activa con `?access=restricted` en la URL.
 */
export function AccessRestrictedBanner({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const restricted = searchParams.get('access') === 'restricted';
  const uni = searchParams.get('uni');
  const [visible, setVisible] = useState(restricted);

  useEffect(() => {
    setVisible(restricted);
  }, [restricted]);

  function dismiss() {
    setVisible(false);
    const params = new URLSearchParams(searchParams.toString());
    params.delete('access');
    router.replace(`/?${params.toString()}`, { scroll: false });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className={cn(
            'fixed inset-x-0 top-0 z-[100] border-b border-amber-200/80 bg-amber-50/95 px-4 py-3 shadow-sm backdrop-blur-md',
            'pt-[max(0.75rem,env(safe-area-inset-top))]',
            className
          )}
          role="alert"
        >
          <div className="mx-auto flex max-w-3xl items-start gap-3">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden />
            <div className="flex-1 text-sm">
              <p className="font-semibold text-amber-950">
                Acceso restringido: Este módulo no está en tu plan
              </p>
              <p className="mt-0.5 text-amber-800/90">
                {uni
                  ? `Necesitas una suscripción activa para ${uni.toUpperCase()} o el plan todo en uno.`
                  : 'Actualiza tu plan para desbloquear simulacros y guías premium.'}
              </p>
            </div>
            <button
              type="button"
              onClick={dismiss}
              className="rounded-lg p-1 text-amber-700 hover:bg-amber-100 active:scale-95"
              aria-label="Cerrar aviso"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
