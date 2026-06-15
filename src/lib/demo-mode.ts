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
