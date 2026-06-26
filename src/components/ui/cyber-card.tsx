'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useStudyAppearance } from '@/contexts/StudyAppearanceContext';
import { studyPanel } from '@/lib/study-appearance-styles';
import { cn } from '@/lib/utils';

interface CyberCardProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'section';
  style?: CSSProperties;
}

/** Tarjeta cyber-minimal: fondo negro mate, borde fibra óptica, neón institucional al hover. */
export function CyberCard({ children, className, as: Tag = 'div', style }: CyberCardProps) {
  const { isDark } = useStudyAppearance();

  return (
    <Tag
      className={cn(
        studyPanel(isDark),
        'font-sans transition-all duration-300',
        isDark
          ? 'hover:border-[hsl(var(--uni-primary))] hover:shadow-[0_0_20px_hsl(var(--uni-primary)/0.15)]'
          : 'hover:border-[hsl(var(--uni-primary)/0.4)] hover:shadow-md',
        className
      )}
      style={style}
    >
      {children}
    </Tag>
  );
}

type NeonStatusTone = 'active' | 'critical';

interface NeonStatusBadgeProps {
  tone: NeonStatusTone;
  label: string;
  className?: string;
}

const STATUS_TONE: Record<
  NeonStatusTone,
  { dot: string; badge: string }
> = {
  active: {
    dot: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]',
    badge: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
  },
  critical: {
    dot: 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.95)]',
    badge: 'border-rose-500/40 bg-rose-500/10 text-rose-400',
  },
};

const STATUS_TONE_LIGHT: Record<NeonStatusTone, { dot: string; badge: string }> = {
  active: {
    dot: 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]',
    badge: 'border-emerald-500/35 bg-emerald-500/10 text-emerald-700',
  },
  critical: {
    dot: 'bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.45)]',
    badge: 'border-rose-500/35 bg-rose-500/10 text-rose-700',
  },
};

/** Punto de estado parpadeante estilo telemetría neón. */
export function NeonStatusBadge({ tone, label, className }: NeonStatusBadgeProps) {
  const { isDark } = useStudyAppearance();
  const styles = isDark ? STATUS_TONE[tone] : STATUS_TONE_LIGHT[tone];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5',
        'text-[10px] font-black uppercase tracking-wider',
        styles.badge,
        className
      )}
    >
      <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full animate-pulse', styles.dot)} aria-hidden />
      {label}
    </span>
  );
}
