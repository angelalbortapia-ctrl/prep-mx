'use client';

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'prep-mx-dashboard-dark-mode';
const LEGACY_STORAGE_KEY = 'prep-mx-study-dark-mode';
const STORAGE_EVENT = 'prep-mx-dashboard-dark-mode-change';

function readStored(): boolean {
  if (typeof window === 'undefined') return true;
  const current = localStorage.getItem(STORAGE_KEY);
  if (current === 'false') return false;
  if (current === 'true') return true;

  const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
  if (legacy === 'false' || legacy === 'true') {
    localStorage.setItem(STORAGE_KEY, legacy);
    return legacy !== 'false';
  }

  return true;
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === 'undefined') return () => {};
  const handler = () => onStoreChange();
  window.addEventListener(STORAGE_EVENT, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(STORAGE_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
}

/** Preferencia de modo oscuro del dashboard (persistida en localStorage). */
export function useDashboardDarkMode() {
  const isDark = useSyncExternalStore(subscribe, readStored, () => true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const setDark = useCallback((value: boolean) => {
    localStorage.setItem(STORAGE_KEY, String(value));
    window.dispatchEvent(new Event(STORAGE_EVENT));
  }, []);

  const toggle = useCallback(() => {
    setDark(!readStored());
  }, [setDark]);

  return { isDark, hydrated, setDark, toggle };
}
