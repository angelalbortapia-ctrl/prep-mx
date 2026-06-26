'use client';

import type { ReactNode } from 'react';
import { DashboardAppearanceProvider, useDashboardAppearance } from '@/contexts/StudyAppearanceContext';
import { UniThemeVisualRoot } from '@/components/theme/UniThemeVisualRoot';

interface AppDashboardShellProps {
  children: ReactNode;
}

export function AppDashboardShell({ children }: AppDashboardShellProps) {
  return (
    <DashboardAppearanceProvider>
      <AppDashboardThemeRoot>{children}</AppDashboardThemeRoot>
    </DashboardAppearanceProvider>
  );
}

function AppDashboardThemeRoot({ children }: { children: ReactNode }) {
  const { isDark } = useDashboardAppearance();

  return (
    <UniThemeVisualRoot dark={isDark} className="flex min-h-screen flex-col bg-mesh">
      {children}
    </UniThemeVisualRoot>
  );
}
