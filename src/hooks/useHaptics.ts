'use client';

import { useCallback, useRef } from 'react';

/**
 * Wrapper seguro sobre Capacitor Haptics.
 *
 * - En contenedor nativo (iOS/Android) usa el plugin real de Capacitor.
 * - En web con soporte de `navigator.vibrate` cae a una vibración básica.
 * - En cualquier otro caso es un no-op silencioso (nunca rompe la ejecución).
 *
 * Los imports a `@capacitor/*` son dinámicos para que el bundle web no falle
 * si el runtime nativo no está presente.
 */

type CapacitorGlobal = { isNativePlatform?: () => boolean };

function isNativeRuntime(): boolean {
  if (typeof window === 'undefined') return false;
  const cap = (window as unknown as { Capacitor?: CapacitorGlobal }).Capacitor;
  return Boolean(cap?.isNativePlatform?.());
}

function webVibrate(pattern: number | number[]): void {
  if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
    try {
      navigator.vibrate(pattern);
    } catch {
      /* algunos navegadores bloquean vibrate sin gesto de usuario */
    }
  }
}

export interface Haptics {
  /** Pulso de éxito (respuesta correcta). */
  success: () => Promise<void>;
  /** Vibración de error (respuesta incorrecta). */
  error: () => Promise<void>;
  /** Toque ligero para selecciones/taps. */
  selection: () => Promise<void>;
  /** Advertencia intermedia (p. ej. tiempo por agotarse). */
  warning: () => Promise<void>;
}

export function useHaptics(): Haptics {
  // Cacheamos el módulo importado dinámicamente para no re-importar en cada pulso.
  const moduleRef = useRef<Promise<typeof import('@capacitor/haptics')> | null>(null);

  const loadModule = useCallback(() => {
    if (!moduleRef.current) {
      moduleRef.current = import('@capacitor/haptics');
    }
    return moduleRef.current;
  }, []);

  const notify = useCallback(
    async (type: 'Success' | 'Warning' | 'Error', webPattern: number | number[]) => {
      if (!isNativeRuntime()) {
        webVibrate(webPattern);
        return;
      }
      try {
        const { Haptics: NativeHaptics, NotificationType } = await loadModule();
        await NativeHaptics.notification({ type: NotificationType[type] });
      } catch {
        webVibrate(webPattern);
      }
    },
    [loadModule]
  );

  const impact = useCallback(
    async (style: 'Light' | 'Medium' | 'Heavy', webPattern: number) => {
      if (!isNativeRuntime()) {
        webVibrate(webPattern);
        return;
      }
      try {
        const { Haptics: NativeHaptics, ImpactStyle } = await loadModule();
        await NativeHaptics.impact({ style: ImpactStyle[style] });
      } catch {
        webVibrate(webPattern);
      }
    },
    [loadModule]
  );

  return {
    success: useCallback(() => notify('Success', 18), [notify]),
    error: useCallback(() => notify('Error', [40, 60, 40]), [notify]),
    warning: useCallback(() => notify('Warning', [25, 40]), [notify]),
    selection: useCallback(() => impact('Light', 10), [impact]),
  };
}
