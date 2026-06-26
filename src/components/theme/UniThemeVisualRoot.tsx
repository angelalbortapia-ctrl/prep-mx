'use client';

import { useEffect, type ReactNode } from 'react';
import { useUniTheme } from '@/contexts/UniThemeContext';
import { getUniVisualIdentity } from '@/lib/uni-visual-identity';
import { cn } from '@/lib/utils';

interface UniThemeVisualRootProps {
  children: ReactNode;
  /** Activa tokens de modo oscuro ergonómico (Zinc-950 / Zinc-100). */
  dark?: boolean;
  className?: string;
}

/**
 * Envuelve la UI con la identidad visual adaptativa según `useUniTheme`:
 * bordes, sombras, tipografía de cronómetro y estilo OLED por universidad.
 */
export function UniThemeVisualRoot({ children, dark = false, className }: UniThemeVisualRootProps) {
  const { uniId, hydrated } = useUniTheme();
  const visual = getUniVisualIdentity(uniId);

  useEffect(() => {
    if (!hydrated || typeof document === 'undefined') return;
    document.documentElement.dataset.uniTheme = uniId;
    document.documentElement.classList.add(visual.skinClass);
    const skins = ['uni-skin-unam', 'uni-skin-ipn', 'uni-skin-uam', 'uni-skin-todos'];
    skins.forEach((s) => {
      if (s !== visual.skinClass) document.documentElement.classList.remove(s);
    });
  }, [uniId, hydrated, visual.skinClass]);

  return (
    <div
      data-uni-theme={hydrated ? uniId : undefined}
      className={cn(
        'uni-visual-root min-h-full font-sans transition-[background-color,color] duration-300',
        dark && 'dark',
        visual.skinClass,
        dark ? visual.pageBgClass : 'bg-background text-foreground',
        className
      )}
    >
      {children}
    </div>
  );
}
