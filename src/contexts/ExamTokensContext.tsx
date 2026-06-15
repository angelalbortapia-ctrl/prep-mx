'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useAuth } from '@clerk/nextjs';
import { addExamTokens, consumeExamToken, readExamTokenBalance, writeExamTokenBalance } from '@/lib/exam-tokens';
import { isDemoMode } from '@/lib/demo-mode';
import { DEFAULT_EXAM_TOKENS } from '@/types/exam-tokens';

interface ExamTokensContextValue {
  balance: number;
  hydrated: boolean;
  canStartFullExam: boolean;
  consumeToken: () => Promise<boolean>;
  purchasePack: (tokens: number) => void;
  authRequired: boolean;
}

const ExamTokensContext = createContext<ExamTokensContextValue | null>(null);

export function ExamTokensProvider({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  const demo = isDemoMode();
  const sessionOk = demo || Boolean(isSignedIn);

  const [balance, setBalance] = useState(DEFAULT_EXAM_TOKENS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setBalance(readExamTokenBalance());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || demo) return;
    fetch('/api/exam/consume-token', { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { balance?: number } | null) => {
        if (data && typeof data.balance === 'number') {
          writeExamTokenBalance(data.balance);
          setBalance(data.balance);
        }
      })
      .catch(() => {
        /* fallback local */
      });
  }, [isLoaded, isSignedIn, demo]);

  const consumeToken = useCallback(async (): Promise<boolean> => {
    if (!isLoaded) return false;
    if (!sessionOk) return false;

    const current = readExamTokenBalance();
    if (current <= 0) return false;

    const optimistic = consumeExamToken();
    setBalance(optimistic);

    if (demo || !isSignedIn) {
      return true;
    }

    try {
      const res = await fetch('/api/exam/consume-token', {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        const data = (await res.json()) as { balance: number };
        writeExamTokenBalance(data.balance);
        setBalance(data.balance);
        return true;
      }
      if (res.status === 503) {
        return optimistic >= 0;
      }
      writeExamTokenBalance(current);
      setBalance(current);
      return false;
    } catch {
      return optimistic >= 0;
    }
  }, [isLoaded, isSignedIn, sessionOk, demo]);

  const purchasePack = useCallback((tokens: number) => {
    const next = addExamTokens(tokens);
    setBalance(next);
  }, []);

  const value = useMemo(
    () => ({
      balance,
      hydrated,
      canStartFullExam: balance > 0 && sessionOk,
      consumeToken,
      purchasePack,
      authRequired: isLoaded && !sessionOk,
    }),
    [balance, hydrated, consumeToken, purchasePack, sessionOk, isLoaded]
  );

  return <ExamTokensContext.Provider value={value}>{children}</ExamTokensContext.Provider>;
}

export function useExamTokens(): ExamTokensContextValue {
  const ctx = useContext(ExamTokensContext);
  if (!ctx) throw new Error('useExamTokens debe usarse dentro de ExamTokensProvider');
  return ctx;
}
