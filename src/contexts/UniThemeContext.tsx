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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  buildUniCssVars,
  filterToUniId,
  getUniThemeEntry,
  parseUniId,
  uniIdToFilter,
  UNI_THEME_STORAGE_KEY,
  type UniId,
  type UniThemeEntry,
} from '@/lib/uni-theme-config';
import { UNI_THEME_COOKIE_KEY } from '@/types/subscription';
import {
  getUniversityTheme,
  type UniversidadFilter,
  type UniversityTheme,
} from '@/lib/university-theme';

export interface UniThemeContextValue {
  uniId: UniId;
  entry: UniThemeEntry;
  /** Tema visual existente (banner, tabs) — sin duplicar lógica. */
  universityTheme: UniversityTheme;
  filterId: UniversidadFilter;
  cutoffScore: number;
  setUniId: (id: UniId, options?: { syncUrl?: boolean }) => void;
  /** Texto de identidad renderizado con la plantilla activa. */
  identityText: string;
  hydrated: boolean;
}

const UniThemeContext = createContext<UniThemeContextValue | null>(null);

function readStoredUniId(): UniId | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(UNI_THEME_STORAGE_KEY);
    if (raw === 'unam' || raw === 'ipn' || raw === 'uam' || raw === 'todos') return raw;
    return null;
  } catch {
    return null;
  }
}

function writeStoredUniId(id: UniId): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(UNI_THEME_STORAGE_KEY, id);
    document.cookie = `${UNI_THEME_COOKIE_KEY}=${id}; path=/; max-age=31536000; SameSite=Lax`;
  } catch {
    /* best-effort */
  }
}

function applyCssVars(entry: UniThemeEntry): void {
  if (typeof document === 'undefined') return;
  const vars = buildUniCssVars(entry);
  const root = document.documentElement;
  for (const [key, value] of Object.entries(vars)) {
    root.style.setProperty(key, value);
  }
  root.style.setProperty('--primary', entry.colors.primaryHsl);
  root.style.setProperty('--accent', entry.colors.accentHsl);
  root.style.setProperty('--ring', entry.colors.primaryHsl);
  root.dataset.uniTheme = entry.id;
}

interface UniThemeProviderProps {
  children: ReactNode;
  /** Id inicial desde searchParams del servidor (opcional). */
  initialUniId?: UniId;
}

export function UniThemeProvider({ children, initialUniId }: UniThemeProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlUni = searchParams.get('uni');
  const urlDerived = urlUni ? parseUniId(urlUni) : null;

  const [uniId, setUniIdState] = useState<UniId>(() => initialUniId ?? urlDerived ?? 'unam');
  const [hydrated, setHydrated] = useState(false);

  // Hidratar desde localStorage tras montaje (evita mismatch SSR).
  useEffect(() => {
    const stored = readStoredUniId();
    if (urlDerived) {
      setUniIdState(urlDerived);
      writeStoredUniId(urlDerived);
    } else if (stored) {
      setUniIdState(stored);
    }
    setHydrated(true);
  }, [urlDerived]);

  const entry = useMemo(() => getUniThemeEntry(uniId), [uniId]);
  const filterId = useMemo(() => uniIdToFilter(uniId), [uniId]);
  const universityTheme = useMemo(() => getUniversityTheme(filterId), [filterId]);

  useEffect(() => {
    if (!hydrated) return;
    applyCssVars(entry);
    writeStoredUniId(uniId);
  }, [entry, uniId, hydrated]);

  const setUniId = useCallback(
    (id: UniId, options?: { syncUrl?: boolean }) => {
      setUniIdState(id);
      writeStoredUniId(id);

      if (options?.syncUrl !== false) {
        const params = new URLSearchParams(searchParams.toString());
        const filter = uniIdToFilter(id);
        if (filter === 'todas') {
          params.set('uni', 'todas');
          params.set('plan', 'todo');
        } else {
          params.set('uni', filter);
          params.set('plan', 'universidad');
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      }
    },
    [pathname, router, searchParams]
  );

  const identityText = entry.identityTemplate.replace('{name}', entry.name);

  const value = useMemo<UniThemeContextValue>(
    () => ({
      uniId,
      entry,
      universityTheme,
      filterId,
      cutoffScore: entry.cutoffScore,
      setUniId,
      identityText,
      hydrated,
    }),
    [uniId, entry, universityTheme, filterId, setUniId, identityText, hydrated]
  );

  return <UniThemeContext.Provider value={value}>{children}</UniThemeContext.Provider>;
}

export function useUniTheme(): UniThemeContextValue {
  const ctx = useContext(UniThemeContext);
  if (!ctx) {
    throw new Error('useUniTheme debe usarse dentro de UniThemeProvider');
  }
  return ctx;
}

/** Versión segura para componentes que pueden renderizarse fuera del provider. */
export function useUniThemeOptional(): UniThemeContextValue | null {
  return useContext(UniThemeContext);
}

/** Sincroniza el provider con un filtro existente de `university-theme`. */
export function syncUniFromFilter(filter: UniversidadFilter): UniId {
  return filterToUniId(filter);
}
