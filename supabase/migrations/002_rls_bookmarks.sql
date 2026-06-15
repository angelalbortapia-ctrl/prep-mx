-- PrepMX lesson 13: bookmarks, premium flag, RLS, exam tokens

ALTER TABLE questions
  ADD COLUMN IF NOT EXISTS is_premium BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS exam_tokens INTEGER NOT NULL DEFAULT 3;

CREATE TABLE IF NOT EXISTS user_bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  materia TEXT NOT NULL,
  tema TEXT NOT NULL,
  saved_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, question_id)
);

CREATE INDEX IF NOT EXISTS idx_user_bookmarks_user_saved
  ON user_bookmarks (user_id, saved_at DESC);

CREATE INDEX IF NOT EXISTS idx_questions_premium
  ON questions (universidad, is_premium) WHERE active = TRUE;

-- ── Row Level Security ──

ALTER TABLE user_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Preguntas gratuitas visibles para todos (anon + authenticated)
DROP POLICY IF EXISTS questions_read_free ON questions;
CREATE POLICY questions_read_free ON questions
  FOR SELECT
  USING (active = TRUE AND is_premium = FALSE);

-- Preguntas premium solo para usuarios autenticados en Supabase Auth.
-- Con Clerk, el filtrado premium adicional se hace en API routes con service role.
DROP POLICY IF EXISTS questions_read_premium_authenticated ON questions;
CREATE POLICY questions_read_premium_authenticated ON questions
  FOR SELECT
  TO authenticated
  USING (active = TRUE);

-- Bookmarks: el usuario solo ve/modifica los suyos (requiere auth.uid() = users.id)
DROP POLICY IF EXISTS bookmarks_select_own ON user_bookmarks;
CREATE POLICY bookmarks_select_own ON user_bookmarks
  FOR SELECT
  USING (
    user_id IN (SELECT id FROM users WHERE clerk_id = (auth.jwt() ->> 'sub'))
  );

DROP POLICY IF EXISTS bookmarks_insert_own ON user_bookmarks;
CREATE POLICY bookmarks_insert_own ON user_bookmarks
  FOR INSERT
  WITH CHECK (
    user_id IN (SELECT id FROM users WHERE clerk_id = (auth.jwt() ->> 'sub'))
  );

DROP POLICY IF EXISTS bookmarks_delete_own ON user_bookmarks;
CREATE POLICY bookmarks_delete_own ON user_bookmarks
  FOR DELETE
  USING (
    user_id IN (SELECT id FROM users WHERE clerk_id = (auth.jwt() ->> 'sub'))
  );

-- Perfil propio
DROP POLICY IF EXISTS users_read_own ON users;
CREATE POLICY users_read_own ON users
  FOR SELECT
  USING (clerk_id = (auth.jwt() ->> 'sub'));
