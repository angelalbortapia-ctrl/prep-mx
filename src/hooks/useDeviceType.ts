'use client';

import { useEffect, useState } from 'react';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export interface DeviceInfo {
  /** Categoría de ancho de viewport. */
  type: DeviceType;
  /** El dispositivo expone entrada táctil (no es lo mismo que ser móvil). */
  isTouch: boolean;
  /** El puntero principal NO soporta hover (móvil/tablet real). */
  isCoarsePointer: boolean;
  /** La app corre dentro de un contenedor nativo Capacitor (iOS/Android). */
  isNative: boolean;
  /** Plataforma nativa cuando aplica. */
  nativePlatform: 'ios' | 'android' | 'web';
  /** `type === 'mobile'` */
  isMobile: boolean;
  /** `type === 'tablet'` */
  isTablet: boolean;
  /** `type === 'desktop'` */
  isDesktop: boolean;
  /** Útil para SSR: aún no se ha medido el viewport real. */
  hydrated: boolean;
}

// Alineado con los breakpoints de Tailwind: md = 768, lg = 1024.
const TABLET_MIN = 768;
const DESKTOP_MIN = 1024;

function readNative(): { isNative: boolean; nativePlatform: DeviceInfo['nativePlatform'] } {
  if (typeof window === 'undefined') return { isNative: false, nativePlatform: 'web' };
  const cap = (window as unknown as { Capacitor?: { isNativePlatform?: () => boolean; getPlatform?: () => string } })
    .Capacitor;
  const platform = (cap?.getPlatform?.() ?? 'web') as DeviceInfo['nativePlatform'];
  const isNative = Boolean(cap?.isNativePlatform?.()) || platform === 'ios' || platform === 'android';
  return { isNative, nativePlatform: isNative ? platform : 'web' };
}

function computeDeviceInfo(): DeviceInfo {
  if (typeof window === 'undefined') {
    return {
      type: 'desktop',
      isTouch: false,
      isCoarsePointer: false,
      isNative: false,
      nativePlatform: 'web',
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      hydrated: false,
    };
  }

  const width = window.innerWidth;
  const isCoarsePointer = window.matchMedia?.('(pointer: coarse)').matches ?? false;
  const isTouch = isCoarsePointer || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const { isNative, nativePlatform } = readNative();

  let type: DeviceType = 'desktop';
  if (width < TABLET_MIN) type = 'mobile';
  else if (width < DESKTOP_MIN) type = 'tablet';

  return {
    type,
    isTouch,
    isCoarsePointer,
    isNative,
    nativePlatform,
    isMobile: type === 'mobile',
    isTablet: type === 'tablet',
    isDesktop: type === 'desktop',
    hydrated: true,
  };
}

/**
 * Detecta el tipo de dispositivo (móvil/tablet/escritorio), capacidades táctiles
 * y si la app corre embebida en un contenedor nativo Capacitor.
 *
 * SSR-safe: en el primer render devuelve un estado "desktop" no hidratado para
 * evitar mismatches; tras el montaje mide el viewport real y se re-renderiza.
 */
export function useDeviceType(): DeviceInfo {
  const [info, setInfo] = useState<DeviceInfo>(() => computeDeviceInfo());

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setInfo(computeDeviceInfo()));
    };

    update();
    window.addEventListener('resize', update, { passive: true });
    window.addEventListener('orientationchange', update, { passive: true });

    const mql = window.matchMedia?.('(pointer: coarse)');
    mql?.addEventListener?.('change', update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
      mql?.removeEventListener?.('change', update);
    };
  }, []);

  return info;
}
