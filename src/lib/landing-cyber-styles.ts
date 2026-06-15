import { cn } from '@/lib/utils';

/** Tarjeta Bento — modo claro. */
export const landingBentoCard = cn(
  'rounded-2xl border border-zinc-200 bg-white p-6 font-sans shadow-sm',
  'transition-all duration-200 ease-out',
  'hover:border-zinc-300 hover:shadow-md'
);

export const statusBadgeLive = cn(
  'inline-flex items-center gap-1.5 rounded-full border border-emerald-200',
  'bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700'
);

export const statusBadgeRisk = cn(
  'inline-flex items-center gap-1.5 rounded-full border border-rose-200',
  'bg-rose-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-rose-700'
);

export const statusDotLive = 'h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500';
export const statusDotRisk = 'h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500';
