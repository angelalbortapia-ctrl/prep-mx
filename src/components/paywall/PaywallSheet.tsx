'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Sparkles, Zap } from 'lucide-react';
import {
  AdaptiveSheet,
  AdaptiveSheetContent,
  AdaptiveSheetDescription,
  AdaptiveSheetFooter,
  AdaptiveSheetHeader,
  AdaptiveSheetTitle,
} from '@/components/ui/adaptive-sheet';
import { Button } from '@/components/ui/button';
import { getUniThemeEntry, type UniId } from '@/lib/uni-theme-config';
import { getScopedPlanOffer } from '@/data/pricing';
import { cn } from '@/lib/utils';

interface PaywallSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  uniId: UniId;
  onStartFreeDiagnostic?: () => void;
  freeDiagnosticAvailable?: boolean;
  onUpgradeDemo?: () => void;
}

/**
 * Muro de pago seductor: bottom sheet en móvil, modal en desktop (via AdaptiveSheet).
 * Usa los colores institucionales de la universidad bloqueada.
 */
export function PaywallSheet({
  open,
  onOpenChange,
  uniId,
  onStartFreeDiagnostic,
  freeDiagnosticAvailable = true,
  onUpgradeDemo,
}: PaywallSheetProps) {
  const entry = getUniThemeEntry(uniId);
  const plan =
    uniId === 'todos'
      ? getScopedPlanOffer('todo', 'Multi-universidad')
      : getScopedPlanOffer('universidad', entry.name);

  return (
    <AdaptiveSheet open={open} onOpenChange={onOpenChange}>
      <AdaptiveSheetContent
        className="overflow-hidden border-0 p-0"
        style={{
          background: `linear-gradient(165deg, hsl(${entry.colors.primaryHsl}) 0%, hsl(${entry.colors.primaryHsl} / 0.88) 45%, hsl(${entry.colors.accentHsl} / 0.35) 100%)`,
        }}
      >
        <div className="relative px-6 pb-8 pt-2 text-white">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md"
          >
            <Sparkles className="h-7 w-7" aria-hidden />
          </motion.div>

          <AdaptiveSheetHeader className="space-y-2 text-center text-white">
            <AdaptiveSheetTitle className="text-2xl font-extrabold text-white">
              Desbloquea {entry.shortLabel}
            </AdaptiveSheetTitle>
            <AdaptiveSheetDescription className="text-base text-white/85">
              {entry.identityTemplate}. Línea de corte meta:{' '}
              <strong>{entry.cutoffScore} aciertos</strong>.
            </AdaptiveSheetDescription>
          </AdaptiveSheetHeader>

          <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
              {plan.badge}
            </p>
            <p className="mt-1 text-3xl font-extrabold">
              ${plan.price.toLocaleString('es-MX')}
              <span className="text-base font-medium text-white/80"> {plan.period}</span>
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/90">
              {plan.features.slice(0, 4).map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <AdaptiveSheetFooter className="mt-6 flex-col gap-3 sm:flex-col">
            <Button
              asChild
              className={cn(
                'h-12 w-full rounded-xl border-0 bg-white font-bold shadow-lg',
                'text-[color:var(--paywall-fg)] active:scale-[0.98]'
              )}
              style={{ ['--paywall-fg' as string]: entry.colors.primary }}
              onClick={() => onUpgradeDemo?.()}
            >
              <Link href={`/precios?uni=${entry.filterId}&plan=${uniId === 'todos' ? 'todo' : 'universidad'}`}>
                <Zap className="mr-2 h-4 w-4" />
                Actualizar mi plan
              </Link>
            </Button>

            {freeDiagnosticAvailable && onStartFreeDiagnostic && (
              <Button
                type="button"
                variant="outline"
                className="h-12 w-full rounded-xl border-white/40 bg-white/10 text-white hover:bg-white/20 active:scale-[0.98]"
                onClick={() => {
                  onOpenChange(false);
                  onStartFreeDiagnostic();
                }}
              >
                Probar diagnóstico gratis (10 preguntas)
              </Button>
            )}

            <Button
              type="button"
              variant="ghost"
              className="text-white/70 hover:bg-white/10 hover:text-white"
              onClick={() => onOpenChange(false)}
            >
              Ahora no
            </Button>
          </AdaptiveSheetFooter>
        </div>
      </AdaptiveSheetContent>
    </AdaptiveSheet>
  );
}
