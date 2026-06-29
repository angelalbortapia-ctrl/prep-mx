import { processClerkWebhook } from '@/lib/clerk/webhook-handler';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Webhook Clerk → crea/actualiza fila en Supabase al registrarse el alumno.
 * Clerk Dashboard → Webhooks → URL: https://tu-dominio.com/api/webhooks/clerk
 * Eventos: user.created, user.updated
 */
export async function POST(request: Request) {
  return processClerkWebhook(request);
}
