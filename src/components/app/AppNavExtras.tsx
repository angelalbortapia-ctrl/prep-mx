'use client';

import { TokenBalanceBadge } from '@/components/exam/TokenBalanceBadge';
import { cn } from '@/lib/utils';

export function AppNavExtras({ className }: { className?: string }) {
  return <TokenBalanceBadge className={className} />;
}
