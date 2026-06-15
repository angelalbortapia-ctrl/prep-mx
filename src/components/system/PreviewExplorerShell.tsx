'use client';

import type { ReactNode } from 'react';
import { isDemoMode } from '@/lib/demo-mode';
import { PreviewExplorerBar, PreviewExplorerSpacer } from '@/components/system/PreviewExplorerBar';

export function PreviewExplorerShell({ children }: { children: ReactNode }) {
  if (!isDemoMode()) {
    return <>{children}</>;
  }

  return (
    <>
      <PreviewExplorerBar />
      <PreviewExplorerSpacer />
      {children}
    </>
  );
}
