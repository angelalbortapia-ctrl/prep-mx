'use client';

import type { ReactNode } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useDashboardAppearance } from '@/contexts/StudyAppearanceContext';
import { useHaptics } from '@/hooks/useHaptics';
import { cn } from '@/lib/utils';

interface DashboardThemeToggleProps {
  className?: string;
}

export function DashboardThemeToggle({ className }: DashboardThemeToggleProps) {
  const { isDark, setDark } = useDashboardAppearance();
  const haptics = useHaptics();

  const handleSelect = (dark: boolean) => {
    if (dark === isDark) return;
    void haptics.selection();
    setDark(dark);
  };

  return (
    <div
      role="group"
      aria-label="Apariencia del dashboard"
      className={cn(
        'inline-flex h-9 shrink-0 rounded-lg border p-0.5',
        isDark ? 'border-zinc-700/80 bg-zinc-900/80' : 'border-border bg-muted/70',
        className
      )}
    >
      <SegmentButton
        pressed={!isDark}
        label="Modo claro"
        onClick={() => handleSelect(false)}
        isDark={isDark}
      >
        <Sun className="h-3.5 w-3.5" aria-hidden />
        <span className="hidden sm:inline">Claro</span>
      </SegmentButton>
      <SegmentButton
        pressed={isDark}
        label="Modo oscuro"
        onClick={() => handleSelect(true)}
        isDark={isDark}
      >
        <Moon className="h-3.5 w-3.5" aria-hidden />
        <span className="hidden sm:inline">Oscuro</span>
      </SegmentButton>
    </div>
  );
}

function SegmentButton({
  children,
  pressed,
  label,
  onClick,
  isDark,
}: {
  children: ReactNode;
  pressed: boolean;
  label: string;
  onClick: () => void;
  isDark: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-label={label}
      onClick={onClick}
      className={cn(
        'inline-flex h-full items-center justify-center gap-1 rounded-md px-2 text-[10px] font-black uppercase tracking-wide transition-all duration-200 sm:px-2.5 sm:text-[11px]',
        pressed
          ? cn(
              'bg-[hsl(var(--uni-primary))] text-[hsl(var(--uni-primary-foreground))] shadow-sm',
              isDark && 'shadow-[0_0_10px_hsl(var(--uni-primary)/0.22)]'
            )
          : 'text-muted-foreground hover:text-foreground'
      )}
    >
      {children}
    </button>
  );
}
