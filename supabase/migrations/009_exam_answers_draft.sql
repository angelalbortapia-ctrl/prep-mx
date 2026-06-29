-- Borradores de respuestas del simulador (autosave antes del submit definitivo)

CREATE TABLE IF NOT EXISTS exam_draft_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  exam_session_id UUID NOT NULL,
  exam_id TEXT,
  mode TEXT NOT NULL CHECK (mode IN ('practice', 'exam')),
  current_index INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'submitted')),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, exam_session_id)
);

CREATE TABLE IF NOT EXISTS exam_answers_draft (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  exam_session_id UUID NOT NULL,
  question_id TEXT NOT NULL,
  opcion_elegida TEXT,
  is_correct BOOLEAN NOT NULL,
  time_spent_seconds INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, exam_session_id, question_id)
);

CREATE INDEX IF NOT EXISTS idx_exam_draft_sessions_user_status
  ON exam_draft_sessions (user_id, status, updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_exam_answers_draft_session
  ON exam_answers_draft (user_id, exam_session_id);

COMMENT ON TABLE exam_draft_sessions IS
  'Metadatos de simulacro en curso (índice actual, modo). Limpiado tras POST /api/exams/submit.';

COMMENT ON TABLE exam_answers_draft IS
  'Respuestas parciales con autosave (debounce ~2s). Una fila por pregunta y sesión.';
