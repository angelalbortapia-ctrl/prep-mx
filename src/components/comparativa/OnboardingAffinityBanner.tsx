'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COMPARATIVA_AFFINITY_HREF } from '@/components/comparativa/ComparativaAffinityEmptyState';
import { loadAffinityResult } from '@/lib/persist-affinity';
import { cn } from '@/lib/utils';

const DISMISS_KEY = 'prep-mx-comparativa-banner-dismissed';

export function OnboardingAffinityBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const hasResult = loadAffinityResult() || localStorage.getItem('prepmx-profile');
      const dismissed = sessionStorage.getItem(DISMISS_KEY);
      setVisible(!hasResult && !dismissed);
    } catch {
      setVisible(false);
    }
  }, []);

  function dismiss() {
    try {
      sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-2xl border border-primary/25 bg-primary/5 p-4 sm:flex-row sm:items-center sm:justify-between'
      )}
      role="status"
    >
      <div className="flex items-start gap-3">
        <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
        <div>
          <p className="text-sm font-semibold">¿Aún no haces el test de afinidad?</p>
          <p className="text-xs text-muted-foreground">
            Descubre si UNAM, IPN o UAM encaja mejor con tu perfil académico.
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Button asChild size="sm" className="rounded-xl">
          <Link href={COMPARATIVA_AFFINITY_HREF}>Descubre tu examen ideal</Link>
        </Button>
        <button
          type="button"
          onClick={dismiss}
          className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
          aria-label="Cerrar aviso"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
