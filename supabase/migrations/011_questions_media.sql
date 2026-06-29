-- Assets de reactivos (diagramas, gráficas) — rutas Bunny CDN, no Base64 en JSON.

ALTER TABLE questions
  ADD COLUMN IF NOT EXISTS media JSONB NOT NULL DEFAULT '{}'::jsonb;

COMMENT ON COLUMN questions.media IS
  'Rutas CDN Bunny (relativas o bunny:). Ej: {"stem":"questions/unam/fisica/uuid-diagrama.webp","video":"video:..."}';

CREATE INDEX IF NOT EXISTS idx_questions_media_nonempty
  ON questions ((media <> '{}'::jsonb))
  WHERE active = TRUE AND media <> '{}'::jsonb;
