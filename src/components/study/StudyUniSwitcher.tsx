'use client';

import { TEMARIO_UNI_OPTIONS, resolveTemarioUniId, type TemarioUniId } from '@/data/temario-registry';
import { useStudyAppearance } from '@/contexts/StudyAppearanceContext';
import { useUniTheme } from '@/contexts/UniThemeContext';
import { filterToUniId } from '@/lib/uni-theme-config';
import { cn } from '@/lib/utils';

interface StudyUniSwitcherProps {
  className?: string;
}

/** Selector UNAM / IPN / UAM para la sección de temario en Zona de Estudio. */
export function StudyUniSwitcher({ className }: StudyUniSwitcherProps) {
  const { filterId, uniId, setUniId, hydrated } = useUniTheme();
  const { isDark } = useStudyAppearance();
  const active = resolveTemarioUniId(filterId, uniId);

  function select(id: TemarioUniId) {
    if (id === active) return;
    setUniId(filterToUniId(id));
  }

  return (
    <nav
      className={cn(
        'flex w-full gap-1 overflow-x-auto rounded-xl border p-1 scrollbar-none sm:w-auto',
        isDark ? 'border-zinc-800 bg-zinc-950/60' : 'border-border bg-muted/40',
        className
      )}
      aria-label="Seleccionar universidad del temario"
      role="tablist"
    >
      {TEMARIO_UNI_OPTIONS.map(({ id, label }) => {
        const isActive = hydrated ? active === id : id === 'unam';
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => select(id)}
            className={cn(
              'min-h-11 flex-1 shrink-0 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wide transition-all sm:flex-none',
              isActive
                ? 'bg-[hsl(var(--uni-primary))] text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {label}
          </button>
        );
      })}
    </nav>
  );
}
