'use client';

import { Coins } from 'lucide-react';
import { useExamTokens } from '@/contexts/ExamTokensContext';
import { cn } from '@/lib/utils';

interface TokenBalanceBadgeProps {
  className?: string;
}

/** Indicador de créditos de simulacro en navbar. */
export function TokenBalanceBadge({ className }: TokenBalanceBadgeProps) {
  const { balance, hydrated } = useExamTokens();

  if (!hydrated) return null;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-amber-200/80 bg-amber-50/90 px-2.5 py-1 text-xs font-semibold text-amber-900',
        balance === 0 && 'border-red-200 bg-red-50 text-red-800',
        className
      )}
      title="Créditos de simulacro completo"
    >
      <Coins className="h-3.5 w-3.5" aria-hidden />
      {balance} {balance === 1 ? 'crédito' : 'créditos'}
    </div>
  );
}
