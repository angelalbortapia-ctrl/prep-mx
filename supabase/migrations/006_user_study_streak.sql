-- Rachas de estudio: última fecha activa para calcular current_streak_days

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS last_study_date DATE;

CREATE INDEX IF NOT EXISTS idx_user_progress_user_answered
  ON user_progress (user_id, answered_at DESC);
