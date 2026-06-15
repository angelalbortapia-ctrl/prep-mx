'use client';

import Link from 'next/link';
import { Zap } from 'lucide-react';
import {
  AdaptiveSheet,
  AdaptiveSheetContent,
  AdaptiveSheetDescription,
  AdaptiveSheetFooter,
  AdaptiveSheetHeader,
  AdaptiveSheetTitle,
} from '@/components/ui/adaptive-sheet';
import { Button } from '@/components/ui/button';
import { TOKEN_PACKS } from '@/types/exam-tokens';

interface TokenPaywallSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPurchase: (tokens: number) => void;
}

/** Muro de pago para recargar créditos de simulacro (micro-paquetes). */
export function TokenPaywallSheet({ open, onOpenChange, onPurchase }: TokenPaywallSheetProps) {
  return (
    <AdaptiveSheet open={open} onOpenChange={onOpenChange}>
      <AdaptiveSheetContent>
        <AdaptiveSheetHeader>
          <AdaptiveSheetTitle>Sin créditos de simulacro</AdaptiveSheetTitle>
          <AdaptiveSheetDescription>
            Cada simulacro completo consume 1 crédito. Recarga rápida o actualiza tu plan.
          </AdaptiveSheetDescription>
        </AdaptiveSheetHeader>

        <ul className="mt-4 space-y-2">
          {TOKEN_PACKS.map((pack) => (
            <li key={pack.id}>
              <button
                type="button"
                onClick={() => {
                  onPurchase(pack.tokens);
                  onOpenChange(false);
                }}
                className="flex w-full items-center justify-between rounded-xl border bg-card px-4 py-3 text-left transition-all active:scale-[0.98] hover:border-primary/40"
              >
                <span className="font-semibold">{pack.label}</span>
                <span className="text-sm font-bold text-primary">${pack.priceMxn} MXN</span>
              </button>
            </li>
          ))}
        </ul>

        <AdaptiveSheetFooter className="mt-6">
          <Button asChild className="h-12 w-full rounded-xl">
            <Link href="/precios">
              <Zap className="mr-2 h-4 w-4" />
              Ver planes ilimitados
            </Link>
          </Button>
        </AdaptiveSheetFooter>
      </AdaptiveSheetContent>
    </AdaptiveSheet>
  );
}
