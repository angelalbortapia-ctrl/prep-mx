'use client';

import { useCallback, useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimerProps {
  sessionId: string;
  durationSeconds: number;
  onExpire?: () => void;
  className?: string;
}

interface TimerState {
  remaining: number;
  startedAt: number;
}

function loadState(sessionId: string, durationSeconds: number): TimerState {
  if (typeof window === 'undefined') {
    return { remaining: durationSeconds, startedAt: Date.now() };
  }

  const raw = localStorage.getItem(`prepmx-timer-${sessionId}`);
  if (!raw) {
    return { remaining: durationSeconds, startedAt: Date.now() };
  }

  try {
    const parsed = JSON.parse(raw) as TimerState;
    const elapsed = Math.floor((Date.now() - parsed.startedAt) / 1000);
    return {
      startedAt: parsed.startedAt,
      remaining: Math.max(0, parsed.remaining - elapsed),
    };
  } catch {
    return { remaining: durationSeconds, startedAt: Date.now() };
  }
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function Timer({ sessionId, durationSeconds, onExpire, className }: TimerProps) {
  const [remaining, setRemaining] = useState(durationSeconds);
  const [startedAt, setStartedAt] = useState<number | null>(null);

  useEffect(() => {
    const state = loadState(sessionId, durationSeconds);
    setRemaining(state.remaining);
    setStartedAt(state.startedAt);
    if (state.remaining === durationSeconds) {
      localStorage.setItem(
        `prepmx-timer-${sessionId}`,
        JSON.stringify({ remaining: durationSeconds, startedAt: state.startedAt })
      );
    }
  }, [sessionId, durationSeconds]);

  const persist = useCallback(
    (value: number) => {
      if (startedAt === null) return;
      localStorage.setItem(
        `prepmx-timer-${sessionId}`,
        JSON.stringify({ remaining: value, startedAt })
      );
    },
    [sessionId, startedAt]
  );

  useEffect(() => {
    if (startedAt === null || remaining <= 0) return;

    const interval = setInterval(() => {
      setRemaining((prev) => {
        const next = prev - 1;
        persist(next);
        if (next <= 0) onExpire?.();
        return Math.max(0, next);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [startedAt, remaining, onExpire, persist]);

  const isLow = remaining <= 60;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-xl border bg-white px-4 py-2 font-mono text-sm font-semibold tabular-nums shadow-sm',
        isLow ? 'border-red-300 bg-red-50 text-red-600' : 'border-border text-foreground',
        className
      )}
      aria-live="polite"
    >
      <Clock className={cn('h-4 w-4', isLow ? 'text-red-500' : 'text-primary')} />
      {formatTime(remaining)}
    </div>
  );
}
