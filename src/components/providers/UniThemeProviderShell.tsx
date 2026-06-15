'use client';

import { Suspense, type ReactNode } from 'react';
import { UniThemeProvider } from '@/contexts/UniThemeContext';

function UniThemeProviderInner({ children }: { children: ReactNode }) {
  return <UniThemeProvider>{children}</UniThemeProvider>;
}

/** Provider de tema institucional con Suspense para `useSearchParams`. */
export function UniThemeProviderShell({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <UniThemeProviderInner>{children}</UniThemeProviderInner>
    </Suspense>
  );
}
