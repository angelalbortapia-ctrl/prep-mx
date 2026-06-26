'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { useDashboardDarkMode } from '@/hooks/useDashboardDarkMode';

export interface DashboardAppearanceContextValue {
  isDark: boolean;
  hydrated: boolean;
  toggle: () => void;
  setDark: (value: boolean) => void;
}

const DashboardAppearanceContext = createContext<DashboardAppearanceContextValue | null>(null);

/** Proveedor de tema claro/oscuro para todo el dashboard. */
export function DashboardAppearanceProvider({ children }: { children: ReactNode }) {
  const { isDark, hydrated, toggle, setDark } = useDashboardDarkMode();

  return (
    <DashboardAppearanceContext.Provider value={{ isDark, hydrated, toggle, setDark }}>
      {children}
    </DashboardAppearanceContext.Provider>
  );
}

/** @deprecated Usa `useDashboardAppearance`. */
export const StudyAppearanceProvider = DashboardAppearanceProvider;

export function useDashboardAppearance(): DashboardAppearanceContextValue {
  const ctx = useContext(DashboardAppearanceContext);
  if (!ctx) {
    return {
      isDark: true,
      hydrated: true,
      toggle: () => {},
      setDark: () => {},
    };
  }
  return ctx;
}

/** Alias histórico — mismo contexto del dashboard completo. */
export const useStudyAppearance = useDashboardAppearance;
