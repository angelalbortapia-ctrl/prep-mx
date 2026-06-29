import { cn } from '@/lib/utils';

/** Tarjeta Bento — respeta tokens de tema (claro / oscuro / UAM). */
export const landingBentoCard = cn(
  'rounded-2xl border border-border bg-card p-6 font-sans text-card-foreground shadow-sm',
  'transition-all duration-200 ease-out',
  'hover:border-zinc-300 hover:shadow-md dark:hover:border-zinc-600'
);

export const statusBadgeLive = cn(
  'inline-flex items-center gap-1.5 rounded-full border border-emerald-200',
  'bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700',
  'dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-400'
);

export const statusBadgeRisk = cn(
  'inline-flex items-center gap-1.5 rounded-full border border-rose-200',
  'bg-rose-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-rose-700',
  'dark:border-rose-800 dark:bg-rose-950 dark:text-rose-400'
);

export const statusDotLive = 'h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500';
export const statusDotRisk = 'h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500';
