/**
 * Vidas diarias del simulador gratis (efecto Duolingo).
 * Persistencia en localStorage — sin cuenta; Pro en servidor omite el gate.
 */

export const FREEMIUM_DAILY_LIVES = 3;
export const FREEMIUM_FREEZE_HOURS = 24;
const STORAGE_KEY = 'prepmx-freemium-lives-v1';

export interface FreemiumLivesState {
  date: string;
  livesRemaining: number;
  frozenUntil: string | null;
}

function todayMx(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Mexico_City',
  }).format(new Date());
}

function readRaw(): FreemiumLivesState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as FreemiumLivesState;
  } catch {
    return null;
  }
}

function write(state: FreemiumLivesState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* best-effort */
  }
}

function freshState(): FreemiumLivesState {
  return {
    date: todayMx(),
    livesRemaining: FREEMIUM_DAILY_LIVES,
    frozenUntil: null,
  };
}

export function normalizeFreemiumLivesState(raw: FreemiumLivesState | null): FreemiumLivesState {
  const today = todayMx();
  if (!raw || raw.date !== today) {
    return freshState();
  }

  if (raw.frozenUntil) {
    const until = new Date(raw.frozenUntil).getTime();
    if (Date.now() >= until) {
      return freshState();
    }
  }

  return {
    date: today,
    livesRemaining: Math.max(0, Math.min(FREEMIUM_DAILY_LIVES, raw.livesRemaining)),
    frozenUntil: raw.frozenUntil,
  };
}

export function getFreemiumLivesState(): FreemiumLivesState {
  return normalizeFreemiumLivesState(readRaw());
}

export function isFreemiumFrozen(state: FreemiumLivesState): boolean {
  if (!state.frozenUntil) return false;
  return Date.now() < new Date(state.frozenUntil).getTime();
}

export function freezeEndsAt(state: FreemiumLivesState): Date | null {
  if (!state.frozenUntil) return null;
  const d = new Date(state.frozenUntil);
  return Date.now() < d.getTime() ? d : null;
}

/** Resta una vida por respuesta incorrecta. Devuelve el nuevo estado. */
export function loseFreemiumLife(): FreemiumLivesState {
  const state = getFreemiumLivesState();
  if (isFreemiumFrozen(state)) return state;

  const nextLives = Math.max(0, state.livesRemaining - 1);
  const next: FreemiumLivesState = {
    ...state,
    livesRemaining: nextLives,
    frozenUntil:
      nextLives === 0
        ? new Date(Date.now() + FREEMIUM_FREEZE_HOURS * 60 * 60 * 1000).toISOString()
        : state.frozenUntil,
  };
  write(next);
  return next;
}

export function resetFreemiumLivesForDev(): FreemiumLivesState {
  const next = freshState();
  write(next);
  return next;
}

export function formatFreezeCountdown(until: Date): string {
  const ms = until.getTime() - Date.now();
  if (ms <= 0) return '0 min';
  const hours = Math.floor(ms / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes} min`;
}
