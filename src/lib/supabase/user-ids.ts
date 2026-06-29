/**
 * Identidad Clerk vs Supabase — NO mezclar formatos.
 *
 * - Clerk ID: `user_2Niz...` (TEXT) → columna `users.clerk_id`
 * - Supabase user PK: UUID → columna `users.id`
 * - FKs (`user_progress.user_id`, `user_bookmarks.user_id`, etc.) → siempre `users.id` (UUID)
 *
 * Nunca insertes `user_2Niz...` en columnas `user_id` UUID.
 */

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const CLERK_USER_ID_RE = /^user_[a-zA-Z0-9]+$/;

export function isSupabaseUserUuid(id: string): boolean {
  return UUID_RE.test(id);
}

export function isClerkUserId(id: string): boolean {
  return CLERK_USER_ID_RE.test(id);
}

/**
 * Valida que un valor sea `users.id` (UUID interno), no el string de Clerk.
 * Úsalo antes de `.eq('user_id', id)` o inserts con FK a users.
 */
export function assertSupabaseUserId(id: string, context?: string): string {
  if (isClerkUserId(id)) {
    throw new Error(
      `Se recibió clerk_id (${id}) donde se esperaba users.id (UUID)${
        context ? ` — ${context}` : ''
      }. Usa requireAuthenticatedSupabaseUser() y authResult.user.id.`
    );
  }
  if (!isSupabaseUserUuid(id)) {
    throw new Error(
      `user_id no es un UUID válido${context ? ` (${context})` : ''}: ${id}`
    );
  }
  return id;
}
