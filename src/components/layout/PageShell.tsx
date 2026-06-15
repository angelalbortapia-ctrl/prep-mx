import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageShellProps {
  children: ReactNode;
  className?: string;
  /** Ancho máximo del contenido interior. */
  size?: 'narrow' | 'default' | 'wide';
}

const sizeClass: Record<NonNullable<PageShellProps['size']>, string> = {
  narrow: 'max-w-4xl',
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
};

export function PageShell({ children, className, size = 'default' }: PageShellProps) {
  return (
    <div className={cn('mx-auto w-full px-4 py-8 md:px-8 md:py-12', sizeClass[size], className)}>
      {children}
    </div>
  );
}
