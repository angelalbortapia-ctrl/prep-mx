import type { UniId } from '@/lib/uni-theme-config';

/** Tipografía institucional por universidad (Tailwind utility classes). */
export const uniFonts = {
  unam: 'font-serif tracking-normal',
  ipn: 'font-sans font-black uppercase',
  uam: 'font-sans font-extrabold tracking-tighter',
  todos: 'font-sans tracking-normal',
} as const satisfies Record<UniId, string>;

export function getUniFontClass(uniId: UniId): string {
  return uniFonts[uniId];
}
export interface UniVisualIdentity {
  primaryHex: string;
  accentHex: string;
  radius: string;
  radiusValue: string;
  skinClass: string;
  fontClass: string;
  pageBgClass: string;
  shellClass: string;
  examShellClass: string;
  buttonClass: string;
  tabActiveClass: string;
  cardClass: string;
  timerClass: string;
  metricClass: string;
  neonClass: string;
  gridClass: string;
  showcaseClass: string;
  cardShadow: string;
}

export const UNI_VISUAL_IDENTITY: Record<UniId, UniVisualIdentity> = {
  unam: {
    primaryHex: '#002B49',
    accentHex: '#D4AF37',
    radius: 'rounded-full',
    radiusValue: '9999px',
    skinClass: 'uni-skin-unam',
    fontClass: uniFonts.unam,
    pageBgClass: 'bg-slate-50',
    shellClass:
      'border-[#002B49]/20 bg-gradient-to-br from-slate-50 via-[#faf6ed] to-slate-100 shadow-[0_12px_40px_-8px_rgba(0,43,73,0.18)]',
    examShellClass: 'exam-shell-unam rounded-xl border-[#002B49]/15 bg-white/90',
    buttonClass:
      'rounded-full bg-[#002B49] text-[#D4AF37] shadow-md shadow-[#D4AF37]/25 hover:bg-[#002B49]/90',
    tabActiveClass: 'rounded-full bg-[#002B49] text-[#D4AF37] shadow-md shadow-[#D4AF37]/20',
    cardClass: 'rounded-xl border-[#002B49]/15 bg-white/95 shadow-sm',
    timerClass: 'exam-timer-unam rounded-full font-serif tabular-nums tracking-normal text-[#002B49]',
    metricClass: 'font-serif tabular-nums tracking-normal text-[#002B49]',
    neonClass: '',
    gridClass: 'grid gap-3 sm:grid-cols-3',
    showcaseClass: 'showcase-carrosserie-unam border-[#002B49]/25',
    cardShadow: '0 12px 40px -8px rgba(212, 175, 55, 0.22)',
  },
  ipn: {
    primaryHex: '#6A1B29',
    accentHex: '#E2E8F0',
    radius: 'rounded-md',
    radiusValue: '0.375rem',
    skinClass: 'uni-skin-ipn',
    fontClass: uniFonts.ipn,
    pageBgClass: 'bg-[#faf5f6]',
    shellClass:
      'rounded-md border-[#6A1B29]/30 bg-gradient-to-b from-[#faf5f6] to-white shadow-[0_0_28px_rgba(106,27,41,0.28)] ring-1 ring-[#6A1B29]/20',
    examShellClass: 'exam-shell-ipn rounded-md border-[#6A1B29]/25 bg-white',
    buttonClass:
      'rounded-md bg-[#6A1B29] font-bold text-white shadow-[0_0_20px_rgba(106,27,41,0.45)] hover:bg-[#6A1B29]/90',
    tabActiveClass:
      'rounded-md bg-[#6A1B29] font-bold text-white shadow-[0_0_18px_rgba(106,27,41,0.5)]',
    cardClass: 'rounded-md border-[#6A1B29]/20 bg-white shadow-[inset_0_1px_0_rgba(226,232,240,0.8)]',
    timerClass:
      'exam-timer-ipn showcase-timer rounded-md font-mono font-bold tabular-nums tracking-wider text-[#6A1B29] shadow-[0_0_14px_rgba(106,27,41,0.45)]',
    metricClass: 'font-mono font-bold tabular-nums tracking-wider text-[#6A1B29]',
    neonClass: 'shadow-[0_0_28px_rgba(106,27,41,0.45)] ring-1 ring-[#6A1B29]/25',
    gridClass: 'grid gap-2 sm:grid-cols-3',
    showcaseClass: 'showcase-carrosserie-ipn border-[#6A1B29]/25',
    cardShadow:
      'inset 0 1px 0 rgba(226, 232, 240, 0.25), 0 4px 24px -4px rgba(106, 27, 41, 0.45)',
  },
  uam: {
    primaryHex: '#F05454',
    accentHex: '#111111',
    radius: 'rounded-lg',
    radiusValue: '0.5rem',
    skinClass: 'uni-skin-uam',
    fontClass: uniFonts.uam,
    pageBgClass: 'bg-[#111111] text-zinc-100',
    shellClass: 'rounded-lg border border-zinc-800 bg-[#111111] text-zinc-100',
    examShellClass: 'exam-shell-uam rounded-lg border border-zinc-800 bg-[#111111]',
    buttonClass:
      'rounded-lg border border-zinc-800 bg-[#F05454] font-semibold text-white hover:bg-[#F05454]/90',
    tabActiveClass: 'rounded-lg border border-zinc-700 bg-[#F05454] text-white',
    cardClass: 'rounded-lg border border-zinc-800 bg-[#111111]/95',
    timerClass:
      'exam-timer-uam rounded-lg border border-zinc-800 bg-[#111111] font-mono tabular-nums text-[#F05454]',
    metricClass: 'font-mono tabular-nums text-[#F05454]',
    neonClass: 'shadow-[0_0_0_1px_rgba(240,84,84,0.35)]',
    gridClass: 'showcase-bento-grid',
    showcaseClass: 'showcase-carrosserie-uam border-zinc-800 bg-[#111111]',
    cardShadow: '0 0 0 1px rgb(39 39 42 / 0.9)',
  },
  todos: {
    primaryHex: '#1D4ED8',
    accentHex: '#8B5CF6',
    radius: 'rounded-xl',
    radiusValue: '0.75rem',
    skinClass: 'uni-skin-todos',
    fontClass: uniFonts.todos,
    pageBgClass: 'bg-slate-50',
    shellClass: 'rounded-xl border-border bg-card shadow-xl',
    examShellClass: 'exam-shell-todos rounded-xl',
    buttonClass: 'rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/25',
    tabActiveClass: 'rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/25',
    cardClass: 'rounded-xl border border-border bg-card shadow-sm',
    timerClass: 'exam-timer-todos font-mono tabular-nums',
    metricClass: 'font-mono tabular-nums text-primary',
    neonClass: '',
    gridClass: 'grid gap-3 sm:grid-cols-3',
    showcaseClass: 'showcase-carrosserie-todos',
    cardShadow: '0 12px 40px -8px rgba(139, 92, 246, 0.18)',
  },
};

export function getUniVisualIdentity(uniId: UniId): UniVisualIdentity {
  return UNI_VISUAL_IDENTITY[uniId];
}

export function buildUniVisualCssVars(uniId: UniId): Record<string, string> {
  const visual = getUniVisualIdentity(uniId);
  return {
    '--radius': visual.radiusValue,
    '--uni-card-shadow': visual.cardShadow,
    '--uni-brand-primary': visual.primaryHex,
    '--uni-brand-accent': visual.accentHex,
  };
}
