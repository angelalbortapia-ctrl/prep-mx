'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  formatFreezeCountdown,
  freezeEndsAt,
  getFreemiumLivesState,
  isFreemiumFrozen,
  loseFreemiumLife,
  type FreemiumLivesState,
  FREEMIUM_DAILY_LIVES,
} from '@/lib/gamification/freemium-lives';

export function useFreemiumLives(enabled: boolean) {
  const [state, setState] = useState<FreemiumLivesState | null>(null);

  const refresh = useCallback(() => {
    if (!enabled) {
      setState(null);
      return;
    }
    setState(getFreemiumLivesState());
  }, [enabled]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (!enabled || !state?.frozenUntil) return;
    const id = window.setInterval(refresh, 30_000);
    return () => window.clearInterval(id);
  }, [enabled, state?.frozenUntil, refresh]);

  const loseLife = useCallback(() => {
    if (!enabled) return state;
    const next = loseFreemiumLife();
    setState(next);
    return next;
  }, [enabled, state]);

  const frozen = enabled && state ? isFreemiumFrozen(state) : false;
  const freezeUntil = state ? freezeEndsAt(state) : null;

  return {
    enabled,
    livesRemaining: enabled ? (state?.livesRemaining ?? FREEMIUM_DAILY_LIVES) : FREEMIUM_DAILY_LIVES,
    frozen,
    freezeUntil,
    freezeLabel: freezeUntil ? formatFreezeCountdown(freezeUntil) : null,
    loseLife,
    refresh,
  };
}
