-- Progreso del curso guiado (/admin → Mi curso) sincronizado entre dispositivos

CREATE TABLE IF NOT EXISTS user_course_state (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  current_lesson_id TEXT,
  just_completed_lesson_id TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_lessons_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  checked_steps JSONB NOT NULL DEFAULT '[]'::jsonb,
  active_step_index INTEGER NOT NULL DEFAULT 0,
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, lesson_id)
);

CREATE INDEX IF NOT EXISTS idx_user_lessons_progress_user_lesson
  ON user_lessons_progress (user_id, lesson_id);

CREATE INDEX IF NOT EXISTS idx_user_lessons_progress_completed
  ON user_lessons_progress (lesson_id, completed, updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_user_course_state_current_lesson
  ON user_course_state (current_lesson_id);
