-- Un solo simulacro completo (mode=exam) en progreso por usuario a la vez.

CREATE UNIQUE INDEX IF NOT EXISTS idx_exam_draft_sessions_one_active_exam
  ON exam_draft_sessions (user_id)
  WHERE status = 'in_progress' AND mode = 'exam';

COMMENT ON INDEX idx_exam_draft_sessions_one_active_exam IS
  'Evita dos simulacros cronometrados simultáneos (compartición de cuentas premium).';
