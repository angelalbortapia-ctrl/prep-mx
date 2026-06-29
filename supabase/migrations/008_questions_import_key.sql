-- Clave estable para upsert de preguntas (seed / import scripts)

ALTER TABLE questions
  ADD COLUMN IF NOT EXISTS import_key TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_questions_import_key
  ON questions (import_key)
  WHERE import_key IS NOT NULL;

COMMENT ON COLUMN questions.import_key IS
  'Identificador estable del reactivo (slug o hash). Usado por npm run seed:questions e import:questions para upsert.';
