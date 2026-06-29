'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimerProps {
  sessionId: string;
  durationSeconds: number;
  onExpire?: () => void;
  className?: string;
}

/** Persistido en localStorage — solo ancla de tiempo, no contador decreciente. */
interface TimerState {
  startedAt: number;
  durationSeconds: number;
}

function storageKey(sessionId: string): string {
  return `prepmx-timer-${sessionId}`;
}

function computeRemaining(startedAt: number, durationSeconds: number): number {
  const elapsed = Math.floor((Date.now() - startedAt) / 1000);
  return Math.max(0, durationSeconds - elapsed);
}

function loadState(sessionId: string, durationSeconds: number): TimerState {
  const fallback: TimerState = { startedAt: Date.now(), durationSeconds };

  if (typeof window === 'undefined') {
    return fallback;
  }

  const raw = localStorage.getItem(storageKey(sessionId));
  if (!raw) {
    return fallback;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<TimerState> & { remaining?: number };
    if (typeof parsed.startedAt !== 'number' || !Number.isFinite(parsed.startedAt)) {
      return fallback;
    }

    const storedDuration =
      typeof parsed.durationSeconds === 'number' && parsed.durationSeconds > 0
        ? parsed.durationSeconds
        : durationSeconds;

    return { startedAt: parsed.startedAt, durationSeconds: storedDuration };
  } catch {
    return fallback;
  }
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function Timer({ sessionId, durationSeconds, onExpire, className }: TimerProps) {
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(durationSeconds);
  const expiredRef = useRef(false);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  const persist = useCallback(
    (state: TimerState) => {
      localStorage.setItem(storageKey(sessionId), JSON.stringify(state));
    },
    [sessionId]
  );

  const syncFromClock = useCallback(
    (anchor: TimerState) => {
      const next = computeRemaining(anchor.startedAt, anchor.durationSeconds);
      setRemaining(next);
      if (next <= 0 && !expiredRef.current) {
        expiredRef.current = true;
        onExpireRef.current?.();
      }
      return next;
    },
    []
  );

  useEffect(() => {
    expiredRef.current = false;
    const state = loadState(sessionId, durationSeconds);
    setStartedAt(state.startedAt);
    persist(state);
    syncFromClock(state);
  }, [sessionId, durationSeconds, persist, syncFromClock]);

  useEffect(() => {
    if (startedAt === null) return;

    const anchor: TimerState = { startedAt, durationSeconds };

    const tick = () => {
      syncFromClock(anchor);
    };

    tick();
    const interval = window.setInterval(tick, 1000);

    const onVisible = () => {
      if (document.visibilityState === 'visible') tick();
    };

    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', tick);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', tick);
    };
  }, [startedAt, durationSeconds, syncFromClock]);

  const isLow = remaining <= 60;

  return (
    <div
      className={cn(
        'exam-timer inline-flex items-center gap-2 rounded-[var(--radius)] border px-4 py-2 text-sm font-semibold tabular-nums shadow-sm',
        isLow ? 'border-red-400/50 bg-red-950/40 text-red-400' : 'border-border bg-card text-foreground',
        className
      )}
      aria-live="polite"
    >
      <Clock className={cn('h-4 w-4', isLow ? 'text-red-500' : 'text-primary')} />
      {formatTime(remaining)}
    </div>
  );
}
