'use client';

import Link from 'next/link';
import { Lock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StripeCheckoutButton } from '@/components/marketing/StripeCheckoutButton';
import type { UniId } from '@/lib/uni-theme-config';
import type { UniversidadFilter } from '@/lib/university-theme';
import { trust } from '@/lib/design-system/colors';
import { cn } from '@/lib/utils';

interface BurstExplanationPaywallProps {
  uniId: UniId;
  className?: string;
  onUpgradeDemo?: () => void;
}

function toCheckoutUni(uniId: UniId): UniversidadFilter {
  if (uniId === 'todos') return 'todas';
  return uniId;
}

/** Muro Pro inline: feedback verde/rojo gratis, explicación KaTeX solo con Pase Pro. */
export function BurstExplanationPaywall({
  uniId,
  className,
  onUpgradeDemo,
}: BurstExplanationPaywallProps) {
  const checkoutUni = toCheckoutUni(uniId);

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border p-4',
        trust.accentBorder,
        'bg-indigo-600/5 dark:bg-indigo-500/10',
        className
      )}
    >
      <div className="pointer-events-none select-none blur-[2px] opacity-40" aria-hidden>
        <p className="text-sm leading-relaxed">
          Truco del reactivo: identifica el peróxido (−1 en O) antes de aplicar la regla general −2…
        </p>
      </div>

      <div className="relative mt-0 flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
        <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', trust.accentBgSoft)}>
          <Lock className="h-5 w-5" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <p className="flex items-center justify-center gap-1.5 font-bold text-foreground sm:justify-start">
            <Sparkles className={cn('h-4 w-4', trust.accent)} aria-hidden />
            Explicación detallada — Plan Pro
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Ves si acertaste o fallaste gratis. El truco con fórmulas KaTeX y el porqué de cada distractor
            es parte del Pase Pro.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:items-end">
          <StripeCheckoutButton
            planId={checkoutUni === 'todas' ? 'todos' : 'pro'}
            universidad={checkoutUni}
            label="Desbloquear explicaciones"
            className="h-10"
          />
          {onUpgradeDemo ? (
            <Button type="button" variant="ghost" size="sm" className="h-8 text-xs" onClick={onUpgradeDemo}>
              Demo: activar Pro
            </Button>
          ) : null}
          <Button asChild variant="link" className="h-8 text-xs text-muted-foreground">
            <Link href="/precios">Comparar planes</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
