/** Signing secret del endpoint en Clerk Dashboard → Webhooks. */
export function getClerkWebhookSigningSecret(): string | undefined {
  return process.env.CLERK_WEBHOOK_SIGNING_SECRET?.trim() || undefined;
}
