'use client';

import { ProductShowcase } from '@/components/marketing/ProductShowcase';
import type { UniversidadFilter } from '@/lib/university-theme';
import { cn } from '@/lib/utils';

interface LandingHeroVisualProps {
  universidad: UniversidadFilter;
  className?: string;
}

/** Vista del producto en el hero — columna derecha del zig-zag. */
export function LandingHeroVisual({ universidad, className }: LandingHeroVisualProps) {
  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-xl lg:max-w-none',
        'rounded-2xl border border-border/80 bg-card/50 p-1 shadow-xl shadow-primary/10',
        'ring-1 ring-border/50 backdrop-blur-sm',
        className
      )}
    >
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-indigo-500/10 via-transparent to-violet-500/10" aria-hidden />
      <div className="relative overflow-hidden rounded-[calc(1rem-2px)]">
        <ProductShowcase universidad={universidad} variant="embed" />
      </div>
    </div>
  );
}
