import { cn } from '@/lib/utils';

/** Clases compartidas para la zona de estudio (oscuro cyber / claro legible). */
export function studyShell(isDark: boolean, hydrated: boolean) {
  return cn(
    'relative font-sans transition-[background-color,color] duration-300',
    hydrated && !isDark && 'study-light'
  );
}

/** Superficie tipo tarjeta (CyberCard, artículos de guía, etc.). */
export function studyPanel(isDark: boolean) {
  return isDark
    ? 'rounded-2xl border border-zinc-800 bg-zinc-950'
    : 'rounded-2xl border border-border bg-card shadow-sm';
}

export function studyBadge(isDark: boolean) {
  return cn(
    'inline-flex items-center gap-2 rounded-md border px-3 py-1 text-[10px] font-black uppercase tracking-wider',
    isDark
      ? 'border-zinc-800 bg-zinc-950 text-zinc-400'
      : 'border-border bg-muted text-muted-foreground'
  );
}

export function studyHeading(isDark: boolean) {
  return isDark ? 'text-zinc-50' : 'text-foreground';
}

export function studySubtext(isDark: boolean) {
  return isDark ? 'text-zinc-500' : 'text-muted-foreground';
}

export function studyToolbarBtn(isDark: boolean, active = false) {
  if (active) {
    return cn(
      'border-[hsl(var(--uni-primary))] bg-[hsl(var(--uni-primary)/0.15)] shadow-[0_0_20px_hsl(var(--uni-primary)/0.2)]',
      isDark ? 'text-zinc-50' : 'text-foreground'
    );
  }
  return isDark
    ? 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-[hsl(var(--uni-primary))] hover:shadow-[0_0_16px_hsl(var(--uni-primary)/0.12)]'
    : 'border-border bg-card text-foreground shadow-sm hover:border-[hsl(var(--uni-primary)/0.45)] hover:shadow-md';
}

/** Acento UNAM que respeta el modo de estudio (no el `.dark` del layout). */
export function unamAccent(isDark: boolean) {
  return isDark ? 'text-[#D4AF37]' : 'text-[#002B49]';
}

export function unamAccentMuted(isDark: boolean) {
  return isDark ? 'text-[#D4AF37]/80' : 'text-[#002B49]/70';
}

export function unamAccentLink(isDark: boolean) {
  return cn(
    'font-semibold hover:underline',
    isDark ? 'text-[#D4AF37]' : 'text-[#002B49]'
  );
}

export function unamGuidePill(isDark: boolean) {
  return cn(
    'shrink-0 rounded-lg border px-2.5 py-1 text-[10px] font-bold transition-colors',
    isDark
      ? 'border-[#D4AF37]/25 bg-[#002B49]/20 text-[#D4AF37] hover:bg-[#002B49]/30'
      : 'border-[#002B49]/20 bg-[#002B49]/5 text-[#002B49] hover:bg-[#002B49]/10'
  );
}

export function unamHeaderBadge(isDark: boolean) {
  return cn(
    'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider',
    isDark
      ? 'border-[#D4AF37]/30 bg-[#002B49]/25 text-[#D4AF37]'
      : 'border-[#D4AF37]/30 bg-[#002B49]/10 text-[#002B49]'
  );
}
