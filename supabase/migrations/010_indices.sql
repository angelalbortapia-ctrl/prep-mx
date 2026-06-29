-- PrepMX: índices compuestos para escalar user_progress, questions y users.
--
-- Nota del curso: si tu lección pide "003_indices.sql", en este repo el 003 es
-- stripe_subscription.sql. Aplica ESTE archivo como migración 010 en Supabase.
--
-- Consultas cubiertas:
--   GET  /api/study/sm2-summary     → user_id + next_review_at
--   POST /api/exams/submit          → user_id + question_id + answered_at
--   GET  /api/user/profile          → user_id + answered_at (últimas 50)
--   GET  /api/study/gamification    → ranking por exam_target + user_progress
--   Inngest recordatorios SM-2      → next_review_at global
--   Simulador (getExamQuestions)    → questions active + premium + universidad

-- ── user_progress (crece con cada respuesta de cada alumno) ──

-- Repasos SM-2 vencidos por usuario (TanStack: useSm2Summary)
CREATE INDEX IF NOT EXISTS idx_user_progress_user_next_review
  ON user_progress (user_id, next_review_at ASC);

-- Último intento por pregunta al recalcular intervalo SM-2 (exam-submit)
CREATE INDEX IF NOT EXISTS idx_user_progress_user_question_answered
  ON user_progress (user_id, question_id, answered_at DESC);

-- Diagnóstico / idempotencia de simulacro completo por sesión
CREATE INDEX IF NOT EXISTS idx_user_progress_user_session
  ON user_progress (user_id, exam_session_id)
  WHERE exam_session_id IS NOT NULL;

-- Idempotencia modo práctica: una fila por sesión + pregunta
CREATE INDEX IF NOT EXISTS idx_user_progress_user_session_question
  ON user_progress (user_id, exam_session_id, question_id)
  WHERE exam_session_id IS NOT NULL;

-- Jobs batch (Inngest): filas con repaso vencido hoy en toda la BD
CREATE INDEX IF NOT EXISTS idx_user_progress_next_review_due
  ON user_progress (next_review_at ASC, user_id)
  WHERE next_review_at IS NOT NULL;

-- Admin: conteo de intentos del día y última actividad global
CREATE INDEX IF NOT EXISTS idx_user_progress_answered_at
  ON user_progress (answered_at DESC);

-- ── questions (de cientos a miles de reactivos) ──

-- Pool del simulador: universidad + freemium/premium + activas
CREATE INDEX IF NOT EXISTS idx_questions_uni_premium_active
  ON questions (universidad, is_premium, active)
  WHERE active = TRUE;

-- Filtros por materia dentro de universidad (dashboard, métricas)
CREATE INDEX IF NOT EXISTS idx_questions_uni_materia_active
  ON questions (universidad, materia, active)
  WHERE active = TRUE;

-- Tema dentro de materia (futuro: flashcards / SM-2 por tema)
CREATE INDEX IF NOT EXISTS idx_questions_uni_materia_tema
  ON questions (universidad, materia, tema)
  WHERE active = TRUE;

-- ── users (ranking por carrera / exam_target) ──

CREATE INDEX IF NOT EXISTS idx_users_exam_target
  ON users (exam_target)
  WHERE exam_target IS NOT NULL;

COMMENT ON INDEX idx_user_progress_user_next_review IS
  'SM-2 dashboard: repasos due por user_id ordenados por fecha.';

COMMENT ON INDEX idx_user_progress_user_question_answered IS
  'Último estado SM-2 por pregunta antes de insertar nuevo intento.';

COMMENT ON INDEX idx_user_progress_user_session IS
  'Resumen de simulacro e idempotencia de POST /api/exams/submit (modo exam).';
