'use client';

import { Suspense, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AppCommandPalette } from '@/components/search/AppCommandPalette';
import { DashboardAdmissionTicker } from '@/components/dashboard/DashboardAdmissionTicker';
import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import {
  appExamPadding,
  appMainShell,
  appPagePadding,
} from '@/lib/design-system/layout';
import { cn } from '@/lib/utils';

function isExamFocusRoute(pathname: string): boolean {
  return /^\/dashboard\/simulacros\/[^/]+$/.test(pathname);
}

interface AppLayoutChromeProps {
  children: ReactNode;
}

export function AppLayoutChrome({ children }: AppLayoutChromeProps) {
  const pathname = usePathname();
  const examFocus = isExamFocusRoute(pathname);

  return (
    <>
      <Suspense fallback={<div className="glass-header h-16" aria-hidden />}>
        <SiteNav variant="app" />
      </Suspense>
      {!examFocus ? <DashboardAdmissionTicker /> : null}
      <main
        className={cn(
          appMainShell,
          examFocus ? cn('app-viewport-exam', appExamPadding, 'py-0') : appPagePadding
        )}
      >
        {children}
      </main>
      {!examFocus ? (
        <Suspense fallback={null}>
          <SiteFooter variant="app" />
        </Suspense>
      ) : null}
      <AppCommandPalette />
    </>
  );
}
