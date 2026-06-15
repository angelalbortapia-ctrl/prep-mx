import type { UniId } from '@/lib/uni-theme-config';
import { cn } from '@/lib/utils';

/** Escala tipográfica única — estilo Duolingo / Brilliant. */
export const landingHeroTitle = cn(
  'text-4xl font-black tracking-tight leading-tight text-zinc-900 dark:text-zinc-50 md:text-6xl'
);

export const landingSectionTitle = cn(
  'text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-3xl'
);

export const landingBody = 'text-base leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-lg';

export const landingBadge = cn(
  'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider'
);

export interface LandingAccentTokens {
  primary: string;
  accent: string;
  badgeBorder: string;
  badgeBg: string;
  badgeText: string;
  highlightGradient: string;
}

const ACCENTS: Record<UniId, LandingAccentTokens> = {
  unam: {
    primary: '#002B49',
    accent: '#D4AF37',
    badgeBorder: 'border-[#D4AF37]/40',
    badgeBg: 'bg-[#002B49]/10',
    badgeText: 'text-[#002B49] dark:text-[#D4AF37]',
    highlightGradient: 'from-[#002B49] to-[#D4AF37]',
  },
  ipn: {
    primary: '#6A1B29',
    accent: '#6A1B29',
    badgeBorder: 'border-[#6A1B29]/35',
    badgeBg: 'bg-[#6A1B29]/10',
    badgeText: 'text-[#6A1B29]',
    highlightGradient: 'from-[#6A1B29] to-[#6A1B29]',
  },
  uam: {
    primary: '#F05454',
    accent: '#F05454',
    badgeBorder: 'border-[#F05454]/40',
    badgeBg: 'bg-[#F05454]/10',
    badgeText: 'text-[#F05454]',
    highlightGradient: 'from-[#F05454] to-[#F05454]',
  },
  todos: {
    primary: '#002B49',
    accent: '#D4AF37',
    badgeBorder: 'border-[#D4AF37]/40',
    badgeBg: 'bg-[#002B49]/10',
    badgeText: 'text-[#002B49] dark:text-zinc-100',
    highlightGradient: 'from-[#002B49] via-[#6A1B29] to-[#F05454]',
  },
};

export function getLandingAccent(uniId: UniId): LandingAccentTokens {
  return ACCENTS[uniId];
}
