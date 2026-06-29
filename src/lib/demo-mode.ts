/**
 * Bypass de Clerk para desarrollo y demos.
 * Producción permanece protegida salvo NEXT_PUBLIC_DEMO_MODE=true explícito.
 */
export function isDemoMode(): boolean {
  return (
    process.env.NEXT_PUBLIC_DEMO_MODE === 'true' ||
    process.env.NODE_ENV === 'development'
  );
}

/** No bloquear botones/pantallas en demo si Clerk tarda o no tiene keys locales. */
export function isClerkUiReady(isLoaded: boolean): boolean {
  return isLoaded || isDemoMode();
}
