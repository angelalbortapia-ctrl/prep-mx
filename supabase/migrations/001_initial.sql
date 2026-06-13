-- PrepMX initial schema (SRS v1.0)
-- Run in Supabase SQL Editor or via CLI

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_id TEXT UNIQUE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  exam_target TEXT,
  exam_date DATE,
  status TEXT DEFAULT 'free_tier',
  xp_total INTEGER DEFAULT 0,
  current_streak_days INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  universidad TEXT NOT NULL,
  materia TEXT NOT NULL,
  tema TEXT NOT NULL,
  pregunta TEXT NOT NULL,
  opciones JSONB NOT NULL,
  opcion_correcta TEXT NOT NULL,
  explicacion TEXT NOT NULL,
  dificultad TEXT DEFAULT 'medium',
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS exams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  universidad TEXT NOT NULL,
  area TEXT,
  total_questions INTEGER DEFAULT 120,
  duration_mins INTEGER DEFAULT 180,
  active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  exam_session_id UUID,
  opcion_elegida TEXT,
  is_correct BOOLEAN NOT NULL,
  time_spent_seconds INTEGER DEFAULT 0,
  next_review_at DATE DEFAULT CURRENT_DATE + 1,
  interval_days INTEGER DEFAULT 1,
  ease_factor NUMERIC(4,2) DEFAULT 2.5,
  answered_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS study_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  exam_target TEXT NOT NULL,
  exam_date DATE NOT NULL,
  plan_data JSONB NOT NULL,
  completion_pct NUMERIC(5,2) DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_user_progress_user_date ON user_progress (user_id, answered_at DESC);
CREATE INDEX IF NOT EXISTS idx_questions_filter ON questions (universidad, materia, dificultad) WHERE active = TRUE;
