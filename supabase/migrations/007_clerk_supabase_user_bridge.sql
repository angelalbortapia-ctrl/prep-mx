-- PrepMX: puente de identidad Clerk ↔ Supabase
--
-- CORRECTO (ya implementado en 001_initial.sql):
--   users.id        UUID PK interno
--   users.clerk_id  TEXT UNIQUE — ID de Clerk (ej. user_2Niz...)
--   user_progress.user_id, user_bookmarks.user_id, etc. → UUID FK → users.id
--
-- INCORRECTO (no hacer):
--   Cambiar user_id a TEXT y guardar user_2Niz... directo en user_progress
--   Eso rompe FKs y duplica identidad sin necesidad.
--
-- En API routes: auth() → clerk_id → lookup users → usar users.id en inserts.

COMMENT ON COLUMN users.id IS
  'PK interna UUID. Todas las FK (user_progress, bookmarks, lessons) apuntan aquí.';

COMMENT ON COLUMN users.clerk_id IS
  'ID externo de Clerk (user_xxx). Solo para login/sync; nunca como user_id en otras tablas.';

CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users (clerk_id) WHERE clerk_id IS NOT NULL;
