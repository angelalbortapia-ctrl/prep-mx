/** publicMetadata.onboardingComplete en el JWT de Clerk */
export function isOnboardingComplete(
  sessionClaims: Record<string, unknown> | null | undefined
): boolean {
  if (!sessionClaims) return false;

  const metadata = sessionClaims.metadata as Record<string, unknown> | undefined;
  const publicMetadata = sessionClaims.publicMetadata as Record<string, unknown> | undefined;

  return (
    metadata?.onboardingComplete === true || publicMetadata?.onboardingComplete === true
  );
}
