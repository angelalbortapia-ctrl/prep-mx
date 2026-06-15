'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useUniTheme } from '@/contexts/UniThemeContext';
import { filterToUniId } from '@/lib/uni-theme-config';
import { parsePageUniversidad, type UniversidadFilter } from '@/lib/university-theme';
import { cn } from '@/lib/utils';

const SWITCHER_OPTIONS: { id: UniversidadFilter; label: string }[] = [
  { id: 'unam', label: 'UNAM' },
  { id: 'ipn', label: 'IPN' },
  { id: 'uam', label: 'UAM' },
];

interface LandingUniSwitcherProps {
  /** desktop = header centrado; mobile = fila bajo el header en pantallas pequeñas */
  placement?: 'desktop' | 'mobile';
  className?: string;
}

/** Selector compacto UNAM / IPN / UAM para el header de marketing. */
export function LandingUniSwitcher({ placement = 'desktop', className }: LandingUniSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setUniId, hydrated } = useUniTheme();

  const rawUni = parsePageUniversidad(searchParams.get('uni'));
  const activeUni: UniversidadFilter =
    rawUni === 'todas' ? 'unam' : rawUni;

  function select(universidad: UniversidadFilter) {
    if (universidad === activeUni && rawUni !== 'todas') return;

    const params = new URLSearchParams(searchParams.toString());
    params.set('uni', universidad);
    params.set('plan', 'universidad');

    setUniId(filterToUniId(universidad), { syncUrl: false });
    const base = pathname === '/' || pathname === '/simulador-gratis' || pathname === '/precios' ? pathname : '/';
    router.push(`${base}?${params.toString()}`, { scroll: false });
  }

  return (
    <nav
      className={cn(
        'items-center gap-1 rounded-full bg-zinc-100 p-1 text-xs font-bold dark:bg-zinc-900',
        placement === 'mobile' ? 'flex w-full justify-center sm:hidden' : 'hidden sm:flex',
        className
      )}
      aria-label="Universidad meta"
    >
      {SWITCHER_OPTIONS.map(({ id, label }) => {
        const isActive = hydrated ? activeUni === id : id === 'unam';
        return (
          <button
            key={id}
            type="button"
            onClick={() => select(id)}
            aria-pressed={isActive}
            className={cn(
              'rounded-full px-3 py-1.5 uppercase transition-all',
              isActive
                ? 'bg-white text-zinc-950 shadow-sm dark:bg-zinc-800 dark:text-zinc-50'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
            )}
          >
            {label}
          </button>
        );
      })}
    </nav>
  );
}
