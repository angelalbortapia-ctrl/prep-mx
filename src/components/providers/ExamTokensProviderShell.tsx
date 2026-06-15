'use client';

import { ExamTokensProvider } from '@/contexts/ExamTokensContext';

export function ExamTokensProviderShell({ children }: { children: React.ReactNode }) {
  return <ExamTokensProvider>{children}</ExamTokensProvider>;
}
