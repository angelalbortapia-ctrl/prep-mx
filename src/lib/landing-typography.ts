import type { UniId } from '@/lib/uni-theme-config';
import {
  headingHero,
  headingSection,
  readingBody,
} from '@/lib/design-system/typography';
import { landingContainer } from '@/lib/design-system/layout';
import { cn } from '@/lib/utils';

/** Escala tipográfica única — Geist títulos + Jakarta lectura */
export const landingHeroTitle = cn(headingHero, 'text-foreground');

export const landingSectionTitle = cn(headingSection, 'text-foreground');

export const landingBody = cn(readingBody, 'text-muted-foreground md:text-lg');

export const landingBadge = cn(
  'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider'
);

/** Contenedor ancho fijo — max-w-7xl centrado */
export const landingSectionInner = landingContainer;

/** Layout — espacio vertical entre bloques (padding horizontal en LandingContainer). */
export const landingSection = 'scroll-mt-24 py-16 md:py-24';

export const landingHeroSection = 'relative scroll-mt-24 pt-8 pb-12 md:pt-12 md:pb-16';

export const landingSectionMuted = cn(
  landingSection,
  'overflow-x-clip border-y border-border bg-muted'
);

export const landingSectionHeader = 'mb-10 text-center md:mb-14';

export const landingSectionLead = cn(
  'mx-auto mt-3 max-w-xl font-sans text-sm font-normal leading-relaxed text-muted-foreground',
  'md:mt-4 md:text-base'
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
    badgeText: 'text-[#6A1B29] dark:text-rose-300',
    highlightGradient: 'from-[#6A1B29] to-[#6A1B29]',
  },
  uam: {
    primary: '#F05454',
    accent: '#F05454',
    badgeBorder: 'border-[#F05454]/40',
    badgeBg: 'bg-[#F05454]/10',
    badgeText: 'text-[#F05454] dark:text-[#F05454]',
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
