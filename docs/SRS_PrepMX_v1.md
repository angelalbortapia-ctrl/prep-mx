# SRS — Plataforma Inteligente de Preparación para Exámenes de Admisión (UNAM/IPN/UAM)

**Versión:** 1.0  
**Stack:** Next.js · Tailwind CSS · Shadcn/ui · Supabase/PostgreSQL · Clerk/NextAuth · Stripe · Bunny.net · Vercel · Cloudflare · Capacitor  
**Clasificación:** Documento Interno de Arquitectura — Uso Restringido

---

## TABLA DE CONTENIDO

1. [Filosofía del Producto y Experiencia de Usuario (UX/UI)](#1)
2. [Arquitectura de Base de Datos y Gestión de Ciclo de Vida (Supabase/PostgreSQL)](#2)
3. [Ingeniería de Backend, Seguridad y Control de Costos (Next.js & APIs)](#3)
4. [Logística de Pagos, Monetización y Marketing Automatizado](#4)
5. [Infraestructura, Monitoreo y Rendimiento](#5)
6. [Panel de Control General (Admin Dashboard)](#6)
7. [Reglas para Cursor y Roadmap de Lanzamiento (MVP)](#7)

---

<a name="1"></a>
## 1. FILOSOFÍA DEL PRODUCTO Y EXPERIENCIA DE USUARIO (UX/UI)

### 1.1 Ángulo Único de Valor (Diferenciador vs. Unitips/Conamat)

No vendemos "un curso de preparación". Vendemos **certeza matemática de entrada**. El alumno llega con miedo; se va con un plan de ataque basado en sus propios datos de error. El contenido es quirúrgico: cada lección está validada contra los temarios oficiales de la convocatoria vigente y los exámenes de los últimos 5 años. La IA no genera resúmenes genéricos — reescribe reactivos reales alterando valores numéricos y contexto, manteniendo la competencia pedagógica exacta, produciendo activos 100% propios y legalmente blindados.

---

### 1.2 Los Tres Pilares Técnicos

#### Pilar 1 — Planificador Adaptativo

**Flujo de entrada del usuario:**
1. El alumno selecciona: `universidad` (UNAM/IPN/UAM), `área` (Área 1–6 o carrera), `fecha_examen` (date picker).
2. El backend calcula `días_disponibles = fecha_examen - today()`.
3. Se consulta la tabla `curricula` para obtener los temas del temario oficial de esa universidad/área.
4. Un prompt estructurado envía a la API (OpenAI/Claude) la lista de temas + días disponibles.
5. La IA devuelve un objeto JSON con bloques de estudio por semana.
6. El resultado se persiste en `study_plans` (ver sección 2) y se renderiza como un calendario interactivo en `/dashboard/plan`.

**Prompt interno del backend (nunca expuesto al frontend):**
```
SYSTEM: Eres un planificador académico experto en el temario oficial de [universidad] para [área].
USER: El alumno tiene [N] días hasta su examen. Los temas del temario son: [lista_de_temas].
Distribuye los temas en bloques diarios de máximo 2 horas. Prioriza los temas con mayor frecuencia histórica de aparición en el examen (datos: [top_temas_frecuentes]). Devuelve SOLO JSON válido con este schema:
{
  "semanas": [
    { "semana": 1, "dias": [
        { "dia": "Lunes", "tema": "string", "subtemas": ["string"], "tipo": "teoria|practica|simulacro" }
    ]}
  ]
}
```

#### Pilar 2 — Analítica de Fallas (Motor de Repaso Automatizado)

**Flujo técnico post-simulacro:**
1. Al enviar el examen, el frontend hace `POST /api/exams/submit` con `{ exam_id, user_id, respuestas: [{question_id, opcion_elegida}] }`.
2. El backend no expone el resultado de inmediato. Lanza un job asíncrono (Inngest) para procesar.
3. El job compara `opcion_elegida` vs `opcion_correcta` en la tabla `questions`.
4. Agrupa los errores por `tema` y calcula el porcentaje de fallo por materia.
5. Construye un prompt rígido y llama a la API de IA: `"El alumno falló [N] de [M] preguntas de [tema]. Genera un micro-resumen de 3 párrafos y 2 ejercicios nuevos de práctica con nivel medium. Devuelve JSON."`.
6. El resultado se guarda en `ai_feedback` y se notifica al usuario vía WebSocket/Pusher: `{ tipo: "diagnostico_listo", feedback_id }`.
7. El frontend redirige al alumno a `/dashboard/diagnostico/[feedback_id]`.

**Algoritmo SM-2 (Repetición Espaciada) en el backend:**
```typescript
// src/lib/sm2.ts
export function calcularProximaRevision(
  calidad: 0 | 1 | 2 | 3 | 4 | 5, // 0-2=falló, 3-5=acertó
  intervalo: number,                // días actuales de intervalo
  facilidad: number                 // factor EF, empieza en 2.5
): { nuevoIntervalo: number; nuevaFacilidad: number } {
  let nuevaFacilidad = facilidad + (0.1 - (5 - calidad) * (0.08 + (5 - calidad) * 0.02));
  if (nuevaFacilidad < 1.3) nuevaFacilidad = 1.3;

  let nuevoIntervalo: number;
  if (calidad < 3) {
    nuevoIntervalo = 1; // Repite mañana si falló
  } else if (intervalo === 1) {
    nuevoIntervalo = 6;
  } else {
    nuevoIntervalo = Math.round(intervalo * nuevaFacilidad);
  }
  return { nuevoIntervalo, nuevaFacilidad };
}
```

Los campos `next_review_at`, `interval_days`, `ease_factor` se actualizan en `user_progress` después de cada respuesta.

#### Pilar 3 — Mentoría 24/7 (AI Tutor Seguro)

El endpoint `/api/ai-tutor` **nunca recibe texto libre del usuario**. El frontend envía solo:
```json
{ "question_id": "uuid", "opcion_elegida": "B", "contexto": "post_simulacro" }
```

El backend busca la pregunta en la BD, arma el prompt de forma programática, y devuelve la explicación. El alumno final **nunca controla el prompt**. Ver sección 3.3 para el detalle de seguridad.

---

### 1.3 Los 4 Ejes Modulares

| Eje | Materias | Aplica a |
|-----|----------|----------|
| **Matemáticas y Razonamiento Lógico** | Álgebra, Geometría, Cálculo, Estadística, Razonamiento Verbal | Todas las áreas |
| **Ciencias Experimentales** | Física, Química, Biología | Áreas 1, 2, 3 (UNAM); exactas IPN |
| **Humanidades y Ciencias Sociales** | Historia de México, Historia Universal, Literatura, Geografía, Filosofía | Áreas 4, 5, 6 (UNAM); humanidades |
| **Simulacros y Estrategia de Examen** | Gestión del tiempo, exámenes cronometrados, análisis de patrones | Todas las áreas |

Cada eje tiene sub-módulos: teoría (video + lectura), práctica (ejercicios interactivos), y simulacro (examen completo con timer).

---

### 1.4 Mapa de Ruta UX — Flujo del Alumno

```
Día 1 (Onboarding)
  └─ Landing Page → Registro (Clerk) → Diagnóstico inicial gratuito (20 preguntas)
  └─ Resultado: "Tienes fortaleza en Geometría pero debilidad en Estequiometría"
  └─ CTA: Desbloquea tu Plan Completo → Stripe Checkout

Días 1–7 (Hook)
  └─ Dashboard activo: barra de progreso del plan semanal
  └─ Videos cortos (≤ 8 min) + ejercicios inmediatos post-video
  └─ Primer insignia: "Semana 1 completada" → notificación push

Día 15 (Punto de deserción — Intervención activa)
  └─ Si el alumno lleva 3 días sin entrar:
      └─ Push notification: "¿Todo bien? Tu examen es en [N] días."
      └─ Email automático (MailerLite): muestra progreso actual vs. promedio de alumnos que sí pasaron
      └─ IA detecta si su promedio cayó → desbloquea micro-módulo de recuperación

Días 15–60 (Engagement sostenido)
  └─ Simulacros semanales completos con diagnóstico IA
  └─ Leaderboard opcional entre amigos (referral_code)
  └─ Rachas de estudio: si estudias 7 días seguidos, desbloqueas "Modo Turbo" (más preguntas hard)

Día -30 antes del examen (Urgencia)
  └─ Automatización de marketing activa (ver sección 4)
  └─ Simulacros diarios en modo examen real (3 horas, 120 preguntas)
  └─ Reporte PDF descargable con análisis de velocidad por sección
```

---

### 1.5 Sistema de Gamificación Anti-Deserción

**Componentes en la BD (`users` y `gamification`):**

| Elemento | Lógica de trigger | Persistencia |
|----------|-------------------|--------------|
| **Barra de progreso** | % de temas del plan completados | `study_plans.completion_pct` |
| **Rachas** | `answered_at` consecutivos en días distintos | `users.current_streak_days` |
| **Insignias** | Eventos: primer simulacro, 7 días seguidos, 90 aciertos en un examen | Tabla `badges_earned` |
| **Niveles** | XP acumulado por preguntas correctas (`+10 easy`, `+20 medium`, `+35 hard`) | `users.xp_total` |
| **Leaderboard** | Ranking semanal entre usuarios con el mismo `exam_target` (ej. UNAM Área 2) | Calculado en tiempo real con índice compuesto |

**Dificultad Dinámica (anti-frustración):**
- Semana 1–2: `70% easy + 30% medium`
- Semana 3–4: Si racha de aciertos > 60%: `40% easy + 45% medium + 15% hard`
- Semana 5+: `20% easy + 40% medium + 40% hard`
- Si el alumno saca < 40% en 2 simulacros seguidos: el sistema regresa a semana 1–2 y activa micro-módulo de recuperación.

---

<a name="2"></a>
## 2. ARQUITECTURA DE BASE DE DATOS Y GESTIÓN DE CICLO DE VIDA (SUPABASE/POSTGRESQL)

### 2.1 Script SQL Completo — Tablas del Sistema

```sql
-- ============================================================
-- EXTENSIONES
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_cron";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- TABLA: organizations (B2B)
-- ============================================================
CREATE TABLE organizations (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,        -- "prepa-tepeyac"
  logo_url      TEXT,
  license_type  TEXT DEFAULT 'annual',       -- 'annual' | 'monthly'
  seats         INTEGER DEFAULT 0,
  active        BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: users
-- ============================================================
CREATE TABLE users (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_id              TEXT UNIQUE NOT NULL,
  email                 TEXT UNIQUE NOT NULL,
  full_name             TEXT,
  phone                 TEXT,
  push_token            TEXT,               -- FCM/OneSignal para notificaciones push
  organization_id       UUID REFERENCES organizations(id) ON DELETE SET NULL,
  role                  TEXT DEFAULT 'student' CHECK (role IN ('student','tutor','admin','org_admin')),
  status                TEXT DEFAULT 'free_tier' CHECK (
                          status IN (
                            'free_tier',
                            'premium',
                            'premium_expired',
                            'churned_reprobo',  -- reprobó examen real; candidato re-venta
                            'inactive',         -- > 90 días sin actividad
                            'banned'
                          )
                        ),
  exam_target           TEXT,               -- 'unam_area1' | 'ipn_escom' | 'uam_azcapotzalco'
  exam_date             DATE,
  referral_code         TEXT UNIQUE DEFAULT substr(md5(random()::text), 1, 8),
  referred_by           UUID REFERENCES users(id),
  xp_total              INTEGER DEFAULT 0,
  current_streak_days   INTEGER DEFAULT 0,
  last_active_at        TIMESTAMPTZ,
  session_token         TEXT,               -- Control de sesión simultánea anti-piratería
  session_device        TEXT,
  ip_address            INET,
  gdpr_accepted_at      TIMESTAMPTZ,        -- LFPD: timestamp de aceptación
  facturapi_customer_id TEXT,               -- Para facturación SAT/CFDI 4.0
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: exams (Configuración de simulacros)
-- ============================================================
CREATE TABLE exams (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            TEXT NOT NULL,           -- "Simulacro UNAM Área 2 — Completo"
  universidad     TEXT NOT NULL CHECK (universidad IN ('unam','ipn','uam','general')),
  area            TEXT,                    -- 'area1' .. 'area6'
  total_questions INTEGER NOT NULL DEFAULT 120,
  duration_mins   INTEGER NOT NULL DEFAULT 180, -- 3 horas
  difficulty_mix  JSONB,                   -- {"easy": 0.3, "medium": 0.5, "hard": 0.2}
  is_official     BOOLEAN DEFAULT FALSE,   -- Basado en examen real histórico
  active          BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: questions (El banco de preguntas — activo principal)
-- ============================================================
CREATE TABLE questions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  universidad     TEXT NOT NULL CHECK (universidad IN ('unam','ipn','uam','general')),
  materia         TEXT NOT NULL,           -- 'matematicas', 'quimica', 'historia_mexico'
  tema            TEXT NOT NULL,           -- 'estequiometria', 'ley_de_charles'
  subtema         TEXT,
  pregunta        TEXT NOT NULL,           -- Puede incluir LaTeX: $$\lim_{x \to 0}...$$
  opciones        JSONB NOT NULL,          -- [{"id":"A","texto":"..."},{"id":"B",...}]
  opcion_correcta TEXT NOT NULL CHECK (opcion_correcta IN ('A','B','C','D','E')),
  explicacion     TEXT NOT NULL,           -- Explicación pedagógica, puede incluir LaTeX
  image_url       TEXT,                    -- Supabase Storage / CDN URL
  dificultad      TEXT NOT NULL DEFAULT 'medium' CHECK (dificultad IN ('easy','medium','hard')),
  -- Calibración dinámica (se actualiza en tiempo real)
  failure_rate    NUMERIC(4,2) DEFAULT 0,  -- 0.00 – 1.00 (% de alumnos que falla)
  avg_time_secs   INTEGER DEFAULT 90,      -- Tiempo promedio de respuesta en segundos
  times_answered  INTEGER DEFAULT 0,
  source          TEXT DEFAULT 'ai_generated', -- 'ai_generated' | 'historical_exam' | 'curated'
  convocatoria    TEXT,                    -- '2025', '2026' (año del examen fuente)
  active          BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: user_progress (Telemetría por pregunta)
-- ============================================================
CREATE TABLE user_progress (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id           UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_id       UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  exam_session_id   UUID,                  -- Agrupa respuestas de un mismo simulacro
  opcion_elegida    TEXT,
  is_correct        BOOLEAN NOT NULL,
  time_spent_seconds INTEGER NOT NULL DEFAULT 0, -- TELEMETRÍA DE ANSIEDAD
  -- SM-2: Repetición espaciada
  next_review_at    DATE DEFAULT (CURRENT_DATE + INTERVAL '1 day'),
  interval_days     INTEGER DEFAULT 1,
  ease_factor       NUMERIC(4,2) DEFAULT 2.5,
  review_count      INTEGER DEFAULT 0,
  answered_at       TIMESTAMPTZ DEFAULT NOW() -- Permite purga por inactividad
);

-- ============================================================
-- TABLA: ai_costs (FinOps — Control de tokens por usuario)
-- ============================================================
CREATE TABLE ai_costs (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  endpoint        TEXT NOT NULL,           -- '/api/ai-tutor' | '/api/exams/submit'
  model           TEXT NOT NULL,           -- 'gpt-4o-mini' | 'claude-3-5-sonnet' | 'llama3'
  prompt_tokens   INTEGER NOT NULL DEFAULT 0,
  completion_tokens INTEGER NOT NULL DEFAULT 0,
  cost_usd        NUMERIC(10,6),           -- Costo calculado en USD
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: historical_analytics (Agregación antes de purga)
-- ============================================================
CREATE TABLE historical_analytics (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  convocatoria    TEXT NOT NULL,           -- '2026'
  universidad     TEXT NOT NULL,
  materia         TEXT NOT NULL,
  tema            TEXT NOT NULL,
  question_id     UUID,                    -- Puede ser NULL si la pregunta fue borrada
  total_answered  INTEGER NOT NULL,
  total_correct   INTEGER NOT NULL,
  failure_rate    NUMERIC(4,2) NOT NULL,
  avg_time_secs   INTEGER,
  aggregated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: study_plans (Planificador Adaptativo)
-- ============================================================
CREATE TABLE study_plans (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  exam_target     TEXT NOT NULL,
  exam_date       DATE NOT NULL,
  plan_data       JSONB NOT NULL,          -- Output de la IA (semanas/días/temas)
  completion_pct  NUMERIC(5,2) DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: badges_earned (Gamificación)
-- ============================================================
CREATE TABLE badges_earned (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  badge_slug  TEXT NOT NULL,              -- 'first_simulacro' | 'racha_7_dias' | '90_aciertos'
  earned_at   TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 2.2 Índices Compuestos (Performance del Dashboard)

```sql
-- Dashboard del alumno: historial de preguntas ordenado por fecha
CREATE INDEX idx_user_progress_user_date
  ON user_progress (user_id, answered_at DESC);

-- Simulador: obtener preguntas por universidad/materia/dificultad
CREATE INDEX idx_questions_filter
  ON questions (universidad, materia, dificultad)
  WHERE active = TRUE;

-- Semáforo de calidad: agrupar fallos por tema
CREATE INDEX idx_questions_tema_failure
  ON questions (tema, failure_rate DESC);

-- Purga de datos muertos: identificar inactivos rápidamente
CREATE INDEX idx_user_progress_cleanup
  ON user_progress (answered_at, user_id);

-- FinOps: costos por usuario y mes
CREATE INDEX idx_ai_costs_user_month
  ON ai_costs (user_id, created_at DESC);

-- Control de sesiones simultáneas
CREATE INDEX idx_users_session_token
  ON users (session_token)
  WHERE session_token IS NOT NULL;
```

---

### 2.3 Cron Job de Purga Automática (pg_cron)

**Paso 1: Función de agregación (guarda inteligencia antes de borrar)**
```sql
CREATE OR REPLACE FUNCTION aggregate_before_purge()
RETURNS void LANGUAGE plpgsql AS $$
BEGIN
  -- Agrega estadísticas por pregunta de los usuarios que serán purgados
  INSERT INTO historical_analytics (
    convocatoria, universidad, materia, tema, question_id,
    total_answered, total_correct, failure_rate, avg_time_secs
  )
  SELECT
    EXTRACT(YEAR FROM up.answered_at)::TEXT AS convocatoria,
    q.universidad,
    q.materia,
    q.tema,
    up.question_id,
    COUNT(*) AS total_answered,
    SUM(CASE WHEN up.is_correct THEN 1 ELSE 0 END) AS total_correct,
    1.0 - AVG(CASE WHEN up.is_correct THEN 1.0 ELSE 0.0 END) AS failure_rate,
    AVG(up.time_spent_seconds)::INTEGER AS avg_time_secs
  FROM user_progress up
  JOIN questions q ON q.id = up.question_id
  JOIN users u ON u.id = up.user_id
  WHERE
    u.status IN ('inactive', 'free_tier')
    AND up.answered_at < NOW() - INTERVAL '90 days'
  GROUP BY
    EXTRACT(YEAR FROM up.answered_at), q.universidad, q.materia, q.tema, up.question_id
  ON CONFLICT DO NOTHING;
END;
$$;
```

**Paso 2: Función de purga**
```sql
CREATE OR REPLACE FUNCTION purge_dead_user_progress()
RETURNS void LANGUAGE plpgsql AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  -- Primero agrega para no perder datos de negocio
  PERFORM aggregate_before_purge();

  -- Luego purga el detalle pesado
  DELETE FROM user_progress
  WHERE user_id IN (
    SELECT id FROM users
    WHERE status IN ('inactive', 'free_tier')
    AND (last_active_at IS NULL OR last_active_at < NOW() - INTERVAL '90 days')
  )
  AND answered_at < NOW() - INTERVAL '90 days';

  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RAISE NOTICE 'Purga completada: % filas eliminadas de user_progress', deleted_count;

  -- Actualiza failure_rate en la tabla questions con datos frescos
  UPDATE questions q
  SET
    failure_rate = sub.new_failure_rate,
    avg_time_secs = sub.new_avg_time,
    updated_at = NOW()
  FROM (
    SELECT
      question_id,
      1.0 - AVG(CASE WHEN is_correct THEN 1.0 ELSE 0.0 END) AS new_failure_rate,
      AVG(time_spent_seconds)::INTEGER AS new_avg_time
    FROM user_progress
    GROUP BY question_id
  ) sub
  WHERE q.id = sub.question_id;
END;
$$;
```

**Paso 3: Registrar el cron (ejecutar el día 1 de cada mes a las 3:00 AM México)**
```sql
-- Requiere que pg_cron esté habilitado en Supabase (Extensions > pg_cron)
SELECT cron.schedule(
  'purga-mensual-user-progress',  -- nombre del job
  '0 3 1 * *',                    -- cron expression: 3am, día 1 de cada mes
  $$SELECT purge_dead_user_progress()$$
);
```

**Ciclos de vida de datos por tipo de usuario:**

| Tipo de usuario | `user_progress` | Cuenta (`users`) | Justificación |
|-----------------|-----------------|------------------|---------------|
| Premium — pasó el examen | Purga a los 60 días post-examen | Inactiva conservada | Posible re-compra para hermano/amigo |
| `churned_reprobo` | Conservar 6 meses | Activa con status especial | Campaña de re-venta año siguiente |
| `free_tier` fantasma | Purga a los 90 días de inactividad | Conservada (email para marketing) | Evita BD pesada; email es un activo |
| `inactive` | Purga a los 90 días | Conservada | Idem |

---

<a name="3"></a>
## 3. INGENIERÍA DE BACKEND, SEGURIDAD Y CONTROL DE COSTOS (NEXT.JS & APIS)

### 3.1 Estructura de Carpetas — App Router `/src`

```
/src
├── app/
│   ├── (marketing)/                  # Layout público — sin auth, peso < 1.5MB
│   │   ├── page.tsx                  # Landing Page
│   │   ├── precios/page.tsx
│   │   ├── simulador-gratis/page.tsx # Lead Magnet (50 preguntas free)
│   │   └── aviso-de-privacidad/page.tsx
│   │
│   ├── (auth)/                       # Clerk/NextAuth routes
│   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   └── sign-up/[[...sign-up]]/page.tsx
│   │
│   ├── (app)/                        # Layout protegido — requiere sesión activa
│   │   ├── layout.tsx                # Sidebar, navbar, context providers
│   │   ├── dashboard/
│   │   │   ├── page.tsx              # Vista principal: progreso, plan, racha
│   │   │   ├── plan/page.tsx         # Planificador adaptativo
│   │   │   ├── simulacros/
│   │   │   │   ├── page.tsx          # Lista de exámenes disponibles
│   │   │   │   └── [examId]/page.tsx # Simulacro activo (Timer + QuestionCard)
│   │   │   ├── diagnostico/
│   │   │   │   └── [feedbackId]/page.tsx
│   │   │   ├── tutor/page.tsx        # Chat con AI Tutor (Mentoría 24/7)
│   │   │   └── perfil/page.tsx
│   │   │
│   │   └── (tutor)/                  # Vista papás/tutores (rol: tutor)
│   │       └── hijo/[userId]/page.tsx
│   │
│   ├── (admin)/                      # Panel admin — rol: admin
│   │   ├── layout.tsx
│   │   └── admin/
│   │       ├── page.tsx              # Dashboard general
│   │       ├── finanzas/page.tsx
│   │       ├── usuarios/page.tsx
│   │       └── ia-costos/page.tsx
│   │
│   └── api/
│       ├── webhooks/
│       │   ├── stripe/route.ts       # Pagos OXXO/SPEI/Tarjeta
│       │   └── clerk/route.ts        # Eventos de usuario de Clerk
│       ├── exams/
│       │   ├── submit/route.ts       # POST: submit simulacro → job asíncrono
│       │   └── questions/route.ts    # GET: obtener preguntas con rate limiting
│       ├── ai-tutor/route.ts         # POST: AI tutor (NUNCA recibe texto libre)
│       ├── study-plan/route.ts       # POST: generar plan adaptativo
│       └── admin/
│           └── metrics/route.ts      # GET: datos para el admin dashboard
│
├── components/
│   ├── ui/                           # Shadcn/ui re-exports
│   ├── exam/
│   │   ├── QuestionCard.tsx          # Estados: idle, selected, correct, error
│   │   ├── Timer.tsx                 # Cronómetro inverso con estado persistido
│   │   └── ProgressBar.tsx
│   ├── dashboard/
│   │   ├── StreakWidget.tsx
│   │   ├── WeaknessRadar.tsx         # Gráfica radar por materia
│   │   └── StudyCalendar.tsx
│   └── math/
│       └── MathRenderer.tsx          # react-markdown + remark-math + rehype-katex
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts                 # Supabase client (browser)
│   │   └── server.ts                 # Supabase server client (SSR)
│   ├── ai/
│   │   ├── client.ts                 # Vercel AI SDK — multi-LLM con fallback
│   │   ├── prompts.ts                # Prompts internos (NUNCA expuestos al frontend)
│   │   └── semantic-cache.ts         # Caché semántico con Upstash Redis
│   ├── stripe/
│   │   └── client.ts
│   ├── sm2.ts                        # Algoritmo de repetición espaciada
│   ├── rate-limit.ts                 # Lógica de rate limiting del simulador
│   └── auth.ts                       # Helpers de sesión y validación de token
│
├── middleware.ts                      # Rate limiting, sesión, bloqueo anti-scraping
├── inngest/
│   └── functions.ts                  # Jobs asíncronos: diagnóstico IA, purga, etc.
└── types/
    └── database.ts                   # TypeScript types generados desde Supabase schema
```

---

### 3.2 Middleware de Seguridad — Rate Limiting Anti-Scraping

```typescript
// src/middleware.ts
import { NextResponse, type NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const redis = Redis.fromEnv();

// Límite estricto para el simulador: 3 peticiones por usuario en 5 segundos
const simulatorRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '5 s'),
  analytics: true,
  prefix: 'rl:simulator',
});

// Límite para el AI tutor: 10 peticiones por minuto
const aiTutorRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '60 s'),
  prefix: 'rl:ai-tutor',
});

const isSimulatorRoute = createRouteMatcher(['/api/exams/questions(.*)']);
const isAiTutorRoute = createRouteMatcher(['/api/ai-tutor(.*)']);
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/api/(.*)']);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const userId = (await auth()).userId;

  // Rutas protegidas requieren autenticación
  if (isProtectedRoute(req) && !userId) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // Rate limiting del simulador (anti-scraping del banco de preguntas)
  if (isSimulatorRoute(req) && userId) {
    const { success, remaining } = await simulatorRateLimit.limit(userId);
    if (!success) {
      // ALERTA: posible bot. En producción, loggear a Sentry + suspender cuenta
      console.warn(`[RATE_LIMIT_HIT] userId: ${userId} — posible scraping`);
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Espera un momento antes de continuar.' },
        { status: 429, headers: { 'X-RateLimit-Remaining': '0' } }
      );
    }
  }

  // Rate limiting del AI tutor
  if (isAiTutorRoute(req) && userId) {
    const { success } = await aiTutorRateLimit.limit(userId);
    if (!success) {
      return NextResponse.json(
        { error: 'Has alcanzado el límite de consultas por minuto.' },
        { status: 429 }
      );
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)'],
};
```

---

### 3.3 Seguridad contra Inyección de Prompts (`/api/ai-tutor`)

**Principio:** El frontend **nunca** controla texto libre que llegue a la API de IA. Solo envía IDs.

```typescript
// src/app/api/ai-tutor/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { generateAIResponse } from '@/lib/ai/client';
import { buildTutorPrompt } from '@/lib/ai/prompts';
import { trackAICost } from '@/lib/ai/cost-tracker';

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  // El frontend SOLO envía IDs estructurados — NUNCA texto libre
  const body = await req.json();
  const { question_id, opcion_elegida } = body;

  // Validación estricta de tipos y formato
  if (
    typeof question_id !== 'string' ||
    !question_id.match(/^[0-9a-f-]{36}$/) ||   // UUID v4 format
    !['A','B','C','D','E'].includes(opcion_elegida)
  ) {
    return NextResponse.json({ error: 'Parámetros inválidos' }, { status: 400 });
  }

  const supabase = createServerSupabaseClient();

  // El backend busca la pregunta en la BD — el usuario nunca ve el prompt
  const { data: question, error } = await supabase
    .from('questions')
    .select('pregunta, opciones, opcion_correcta, explicacion, materia, tema')
    .eq('id', question_id)
    .single();

  if (error || !question) {
    return NextResponse.json({ error: 'Pregunta no encontrada' }, { status: 404 });
  }

  // El prompt es construido ENTERAMENTE en el servidor con datos de la BD
  // El usuario final NUNCA tiene control de ningún fragmento del prompt
  const prompt = buildTutorPrompt({
    pregunta: question.pregunta,
    opciones: question.opciones,
    opcion_correcta: question.opcion_correcta,
    opcion_elegida,
    explicacion_base: question.explicacion,
    materia: question.materia,
    tema: question.tema,
  });

  const { text, usage } = await generateAIResponse(prompt);

  // Registrar costo para FinOps
  await trackAICost({ userId, usage, endpoint: '/api/ai-tutor' });

  return NextResponse.json({ explicacion: text });
}
```

```typescript
// src/lib/ai/prompts.ts — Prompts fijos, no manipulables por el usuario
export function buildTutorPrompt(params: TutorPromptParams): string {
  const isCorrect = params.opcion_elegida === params.opcion_correcta;
  return `
Eres un tutor académico experto en el examen de admisión para universidades mexicanas.
Materia: ${params.materia}. Tema: ${params.tema}.

El alumno respondió la siguiente pregunta:
PREGUNTA: ${params.pregunta}
OPCIONES: ${JSON.stringify(params.opciones)}
RESPUESTA DEL ALUMNO: Opción ${params.opcion_elegida}
RESPUESTA CORRECTA: Opción ${params.opcion_correcta}
RESULTADO: ${isCorrect ? 'CORRECTO' : 'INCORRECTO'}

${!isCorrect ? `Explicación base de por qué la opción correcta es ${params.opcion_correcta}: ${params.explicacion_base}` : ''}

Tarea: ${isCorrect
  ? 'El alumno acertó. Felicítalo brevemente y refuerza el concepto clave en 2 líneas.'
  : 'El alumno falló. Explícale en 3 párrafos por qué su opción está mal y por qué la correcta es la correcta. Usa un ejemplo numérico si aplica. Luego propón un ejercicio de práctica adicional.'
}

Responde en español, tono motivador pero directo. Máximo 300 palabras.
NO menciones que eres una IA. NO menciones OpenAI, Anthropic ni ningún proveedor.
  `.trim();
}
```

---

### 3.4 Renderizado de Fórmulas Matemáticas/Químicas (LaTeX)

**Instalación de dependencias:**
```bash
npm install react-markdown remark-math rehype-katex katex
```

**Configuración global en `layout.tsx` (importar CSS de KaTeX una sola vez):**
```typescript
// src/app/(app)/layout.tsx
import 'katex/dist/katex.min.css';  // ← CRÍTICO: sin esto las fórmulas se rompen
```

**Advertencia con Tailwind CSS:** El CSS de KaTeX puede ser anulado por los estilos base de Tailwind (`*` reset). Agregar exclusión en `globals.css`:
```css
/* src/app/globals.css */
@layer base {
  /* Proteger los estilos de KaTeX del reset de Tailwind */
  .katex * {
    box-sizing: content-box !important;
  }
  .katex-display {
    overflow-x: auto;
    overflow-y: hidden;
  }
}
```

**Componente `MathRenderer` (Dynamic Import para no inflar la landing page):**
```typescript
// src/components/math/MathRenderer.tsx
'use client';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface MathRendererProps {
  content: string; // Texto con LaTeX embebido: "La fórmula es $$E = mc^2$$"
}

export default function MathRenderer({ content }: MathRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[[rehypeKatex, { strict: false, throwOnError: false }]]}
      className="prose prose-invert max-w-none text-base leading-relaxed"
    >
      {content}
    </ReactMarkdown>
  );
}
```

**Uso con Dynamic Import en el simulador (NO carga en landing page):**
```typescript
// src/components/exam/QuestionCard.tsx
import dynamic from 'next/dynamic';

// ssr: false → no se renderiza en el servidor, no infla el bundle de la landing
const MathRenderer = dynamic(
  () => import('@/components/math/MathRenderer'),
  { ssr: false, loading: () => <p className="animate-pulse">Cargando fórmula...</p> }
);
```

---

### 3.5 Sistema Multi-LLM con Vercel AI SDK y Caché Semántico

**Arquitectura de fallback automático:**
```typescript
// src/lib/ai/client.ts
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { createGroq } from '@ai-sdk/groq';
import { semanticCache } from './semantic-cache';

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

// Cadena de fallback: OpenAI → Claude → Llama3 en Groq (gratis)
const MODEL_CHAIN = [
  { provider: openai('gpt-4o-mini'), name: 'gpt-4o-mini' },
  { provider: anthropic('claude-3-5-haiku-20241022'), name: 'claude-3-5-haiku' },
  { provider: groq('llama3-8b-8192'), name: 'llama3-groq' },  // Último recurso gratuito
];

export async function generateAIResponse(prompt: string): Promise<{
  text: string;
  usage: { promptTokens: number; completionTokens: number };
  model: string;
}> {
  // 1. Verificar caché semántico primero (ahorra hasta 80% de llamadas)
  const cached = await semanticCache.get(prompt);
  if (cached) {
    console.log('[AI_CACHE_HIT]');
    return { text: cached, usage: { promptTokens: 0, completionTokens: 0 }, model: 'cache' };
  }

  // 2. Intentar proveedores en orden de preferencia
  for (const { provider, name } of MODEL_CHAIN) {
    try {
      const result = await generateText({
        model: provider,
        prompt,
        maxTokens: 1000,
        temperature: 0.3,  // Bajo para respuestas académicas consistentes
        // Timeout de 8 segundos antes de fallar al siguiente proveedor
        abortSignal: AbortSignal.timeout(8000),
      });

      // Guardar en caché para futuras peticiones similares
      await semanticCache.set(prompt, result.text);

      return {
        text: result.text,
        usage: {
          promptTokens: result.usage.promptTokens,
          completionTokens: result.usage.completionTokens,
        },
        model: name,
      };
    } catch (error) {
      console.warn(`[AI_FALLBACK] ${name} falló:`, (error as Error).message);
      // Continúa con el siguiente proveedor
    }
  }

  throw new Error('Todos los proveedores de IA fallaron. Intenta de nuevo en un momento.');
}
```

**Caché Semántico con Upstash Redis:**
```typescript
// src/lib/ai/semantic-cache.ts
import { SemanticCache } from '@upstash/semantic-cache';
import { Index } from '@upstash/vector';

// Requiere: UPSTASH_VECTOR_REST_URL y UPSTASH_VECTOR_REST_TOKEN en .env
const index = new Index();

export const semanticCache = new SemanticCache({ index, minProximity: 0.95 });
// minProximity: 0.95 = solo usa caché si la pregunta es 95%+ similar a una anterior.
// Esto significa que "Explica la Ley de Charles" y "¿Qué es la Ley de Charles?"
// devuelven la misma respuesta cacheada sin llamar a la API.
// Con 5,000 alumnos haciendo preguntas similares, ahorra ~80% en costo de tokens.
```

---

### 3.6 Flujo Asíncrono Anti-Timeout (Inngest + Pusher)

**Problema:** Analizar 120 respuestas con un LLM puede tomar 15–30 segundos. Vercel corta funciones serverless a los 10s en plan Hobby.

**Solución:** Submit → persistir en BD → job asíncrono → WebSocket al terminar.

```typescript
// src/app/api/exams/submit/route.ts
import { inngest } from '@/inngest/client';
import { auth } from '@clerk/nextjs/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const { exam_id, respuestas } = await req.json();
  const supabase = createServerSupabaseClient();

  // 1. Persistir las respuestas inmediatamente (< 500ms)
  const sessionId = crypto.randomUUID();
  const inserts = respuestas.map((r: any) => ({
    user_id: userId,
    question_id: r.question_id,
    exam_session_id: sessionId,
    opcion_elegida: r.opcion_elegida,
    is_correct: false, // Se actualiza en el job
    time_spent_seconds: r.time_spent_seconds ?? 0,
  }));

  await supabase.from('user_progress').insert(inserts);

  // 2. Encolar el job asíncrono (responde en < 200ms al frontend)
  await inngest.send({
    name: 'exam/diagnose',
    data: { userId, sessionId, exam_id },
  });

  // 3. Responder al frontend de inmediato — la IA trabaja en segundo plano
  return NextResponse.json({
    status: 'processing',
    sessionId,
    message: 'Tu diagnóstico está siendo generado. Te notificaremos cuando esté listo.',
  });
}
```

```typescript
// src/inngest/functions.ts
import { inngest } from './client';
import Pusher from 'pusher';
import { generateAIResponse } from '@/lib/ai/client';
import { buildDiagnosticPrompt } from '@/lib/ai/prompts';
import { createServerSupabaseClient } from '@/lib/supabase/server';

const pusher = new Pusher({ /* credenciales de Pusher desde .env */ });

export const diagnoseExam = inngest.createFunction(
  { id: 'exam-diagnose', retries: 3 },
  { event: 'exam/diagnose' },
  async ({ event }) => {
    const { userId, sessionId } = event.data;
    const supabase = createServerSupabaseClient();

    // Obtener respuestas del simulacro
    const { data: progress } = await supabase
      .from('user_progress')
      .select('*, questions(materia, tema, opcion_correcta)')
      .eq('exam_session_id', sessionId);

    // Evaluar correctas/incorrectas y actualizar is_correct en BD
    const errores = [];
    for (const p of progress ?? []) {
      const isCorrect = p.opcion_elegida === p.questions.opcion_correcta;
      await supabase.from('user_progress').update({ is_correct: isCorrect }).eq('id', p.id);
      if (!isCorrect) errores.push({ materia: p.questions.materia, tema: p.questions.tema });
    }

    // Generar diagnóstico IA
    const prompt = buildDiagnosticPrompt(errores);
    const { text } = await generateAIResponse(prompt);

    // Guardar feedback
    const { data: feedback } = await supabase
      .from('ai_feedback')
      .insert({ user_id: userId, session_id: sessionId, contenido: text })
      .select('id')
      .single();

    // Notificar al frontend vía Pusher WebSocket
    await pusher.trigger(`user-${userId}`, 'diagnostico-listo', {
      feedbackId: feedback?.id,
    });
  }
);
```

---

<a name="4"></a>
## 4. LOGÍSTICA DE PAGOS, MONETIZACIÓN Y MARKETING AUTOMATIZADO

### 4.1 Webhook de Stripe para OXXO y SPEI

Los pagos en efectivo (OXXO) son **asíncronos**: el alumno genera un voucher, paga en tienda y Stripe notifica al servidor horas después.

```typescript
// src/app/api/webhooks/stripe/route.ts
import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { sendWhatsAppAlert } from '@/lib/notifications/whatsapp';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    // Verificación de firma — NUNCA procesar sin esta validación
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    return NextResponse.json({ error: 'Firma inválida' }, { status: 400 });
  }

  const supabase = createServerSupabaseClient();

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const pi = event.data.object as Stripe.PaymentIntent;
      const userId = pi.metadata.user_id;
      const paymentMethod = pi.payment_method_types[0]; // 'card' | 'oxxo' | 'customer_balance'

      // Activar acceso premium
      await supabase
        .from('users')
        .update({ status: 'premium', updated_at: new Date().toISOString() })
        .eq('id', userId);

      // Si pagó en OXXO, mandar WhatsApp de confirmación
      if (paymentMethod === 'oxxo') {
        const user = await supabase.from('users').select('phone, full_name').eq('id', userId).single();
        if (user.data?.phone) {
          await sendWhatsAppAlert({
            phone: user.data.phone,
            template: 'pago_confirmado_oxxo',
            variables: { nombre: user.data.full_name },
          });
        }
      }
      break;
    }

    case 'payment_intent.payment_failed': {
      const pi = event.data.object as Stripe.PaymentIntent;
      // Si es OXXO con voucher expirado, notificar por WhatsApp para re-generar
      if (pi.last_payment_error?.code === 'payment_method_provider_timeout') {
        const userId = pi.metadata.user_id;
        // Disparar secuencia de recuperación en MailerLite
        await triggerMailerLiteCarritoAbandonado(userId);
      }
      break;
    }

    case 'charge.dispute.created': {
      // Contracargo recibido — guardar evidencia automáticamente
      const charge = event.data.object as Stripe.Charge;
      await handleChargeback(charge, supabase);
      break;
    }
  }

  return NextResponse.json({ received: true });
}

async function handleChargeback(charge: Stripe.Charge, supabase: any) {
  const userId = charge.metadata.user_id;
  // Recopilar logs de actividad como evidencia para Stripe
  const { data: activityLogs } = await supabase
    .from('user_progress')
    .select('answered_at, question_id, is_correct')
    .eq('user_id', userId)
    .order('answered_at', { ascending: false })
    .limit(100);

  // Guardar evidencia en tabla de disputas
  await supabase.from('chargebacks').insert({
    user_id: userId,
    charge_id: charge.id,
    evidencia: activityLogs,
    status: 'open',
  });
  // TODO: Enviar evidencia automáticamente a Stripe Disputes API
}
```

**Activar 3D Secure en el Checkout:**
```typescript
// Al crear el PaymentIntent
const paymentIntent = await stripe.paymentIntents.create({
  amount: 100000, // $1,000 MXN en centavos
  currency: 'mxn',
  payment_method_types: ['card', 'oxxo'],
  metadata: { user_id: userId },
  payment_method_options: {
    card: {
      request_three_d_secure: 'automatic', // 3DS cuando el banco lo requiera
    },
  },
});
```

---

### 4.2 Modelo "Reader App" — Evadir el 30% de Apple/Google

**Política:** La app de iOS/Android (via Capacitor) **no contiene ningún botón de compra**. La única ruta de pago es la landing page web.

```typescript
// src/app/(app)/dashboard/layout.tsx
// En la app móvil, ocultar cualquier referencia a precios o compras
import { useCapacitor } from '@/hooks/useCapacitor';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isNativeApp } = useCapacitor();

  return (
    <div>
      {/* NUNCA mostrar botones de "Suscribirse" o "Pagar" dentro de la app nativa */}
      {!isNativeApp && <UpgradeBanner />}
      {children}
    </div>
  );
}
```

```typescript
// src/hooks/useCapacitor.ts
import { Capacitor } from '@capacitor/core';

export function useCapacitor() {
  return {
    isNativeApp: Capacitor.isNativePlatform(),  // true en iOS/Android
    platform: Capacitor.getPlatform(),           // 'ios' | 'android' | 'web'
  };
}
```

**Flujo de conversión:**
1. Usuario descarga app → solo puede hacer login.
2. Para comprar, la app muestra: `"Activa tu plan en [tuplataforma.com] y regresa aquí para continuar."`
3. El morro paga en la web con Stripe/OXXO → webhook activa `status: 'premium'` en la BD → al abrir la app, Clerk detecta la sesión activa y muestra el contenido completo.

---

### 4.3 Integración Meta CAPI (Conversions API) — Atribución Cross-Device

**Problema:** El papá ve el anuncio en su Facebook desde su teléfono (Device A). El hijo paga desde su laptop (Device B). Meta pierde la atribución del lead y el ROAS aparece bajo.

**Solución:** External ID cruzado que vincula ambos dispositivos.

```typescript
// src/lib/meta-capi.ts
import crypto from 'crypto';

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID!;
const META_ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN!;

function hashData(value: string): string {
  return crypto.createHash('sha256').update(value.toLowerCase().trim()).digest('hex');
}

export async function sendMetaConversionEvent(params: {
  eventName: 'Lead' | 'Purchase' | 'CompleteRegistration';
  email: string;
  phone?: string;
  userId: string;
  value?: number;
  currency?: string;
  fbclid?: string;          // Del parámetro de URL ?fbclid=
  clientIpAddress: string;
  clientUserAgent: string;
}) {
  const payload = {
    data: [
      {
        event_name: params.eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: 'https://tuplataforma.com',
        user_data: {
          em: [hashData(params.email)],                    // Email hasheado
          ph: params.phone ? [hashData(params.phone)] : undefined,
          external_id: [hashData(params.userId)],          // ← CLAVE: el mismo ID en web y app
          client_ip_address: params.clientIpAddress,
          client_user_agent: params.clientUserAgent,
          fbc: params.fbclid ? `fb.1.${Date.now()}.${params.fbclid}` : undefined,
        },
        custom_data: params.value ? {
          value: params.value,
          currency: params.currency ?? 'MXN',
        } : undefined,
      },
    ],
    access_token: META_ACCESS_TOKEN,
  };

  await fetch(
    `https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }
  );
}
```

**El `external_id` debe ser el mismo `users.id` (UUID) tanto en el Pixel del frontend como en la CAPI del backend. Esto permite a Meta deduplicar y atribuir correctamente.**

---

### 4.4 Automatización de Marketing

**Alerta de Carrito Abandonado por WhatsApp (OXXO):**
```typescript
// src/lib/notifications/whatsapp.ts
// Usar Twilio o ManyChat API para enviar mensajes de WhatsApp

export async function sendOXXOAbandonmentAlert(userId: string) {
  const user = await getUserById(userId);
  if (!user?.phone) return;

  await fetch('https://api.twilio.com/2010-04-01/Accounts/.../Messages.json', {
    method: 'POST',
    headers: { Authorization: `Basic ${Buffer.from(`${process.env.TWILIO_SID}:${process.env.TWILIO_TOKEN}`).toString('base64')}` },
    body: new URLSearchParams({
      From: 'whatsapp:+14155238886',
      To: `whatsapp:${user.phone}`,
      ContentSid: process.env.TWILIO_TEMPLATE_OXXO_SID!,  // Template pre-aprobado por WhatsApp
      ContentVariables: JSON.stringify({
        1: user.full_name,
        2: user.voucher_expiry_date,
      }),
    }),
  });
}
```

**Secuencia MailerLite — Urgencia por fecha de examen:**

Disparador (Inngest cron job, ejecuta diariamente):
```typescript
// src/inngest/functions.ts
export const urgencyEmailCampaign = inngest.createFunction(
  { id: 'urgency-email-campaign' },
  { cron: '0 9 * * *' },  // Todos los días a las 9am
  async () => {
    const supabase = createServerSupabaseClient();
    const today = new Date();

    // Buscar usuarios free_tier con examen a 30 días
    const { data: users } = await supabase
      .from('users')
      .select('id, email, full_name, exam_date, exam_target')
      .eq('status', 'free_tier')
      .not('exam_date', 'is', null);

    for (const user of users ?? []) {
      const daysLeft = Math.ceil(
        (new Date(user.exam_date).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysLeft === 30 || daysLeft === 15 || daysLeft === 7) {
        // Obtener progreso real del usuario para personalizar el correo
        const { data: progress } = await supabase
          .from('user_progress')
          .select('is_correct')
          .eq('user_id', user.id);

        const pct = progress?.length
          ? Math.round(progress.filter(p => p.is_correct).length / progress.length * 100)
          : 0;

        // Disparar automación en MailerLite con datos reales del usuario
        await fetch('https://connect.mailerlite.com/api/subscribers', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            fields: {
              days_left: daysLeft,
              completion_pct: pct,
              exam_target: user.exam_target,
              first_name: user.full_name?.split(' ')[0],
            },
            groups: [process.env.MAILERLITE_URGENCY_GROUP_ID],
          }),
        });
      }
    }
  }
);
```

---

<a name="5"></a>
## 5. INFRAESTRUCTURA, MONITOREO Y RENDIMIENTO

### 5.1 DNS y Protección DDoS con Cloudflare

**Configuración obligatoria — El dominio NUNCA apunta directo a Vercel:**

```
DNS Records en Cloudflare (Proxy activado ← NUNCA "DNS only"):
  CNAME  @    cname.vercel-dns.com    [Proxied ✓]
  CNAME  www  cname.vercel-dns.com    [Proxied ✓]
```

**Reglas de Firewall en Cloudflare:**
```
Rule 1: Bloquear por geolocalización (opcional — si el tráfico es solo México)
  (ip.geoip.country ne "MX") → Challenge

Rule 2: Rate limiting a nivel CDN (antes de que llegue a Vercel)
  Ruta: /api/*
  Límite: 100 req / 1 min por IP
  Acción: Block

Rule 3: Bot Fight Mode → ON (Plan Free lo incluye)

Rule 4: Under Attack Mode (activar manualmente el día de convocatoria UNAM/IPN)
  Acción: JS Challenge a todo el tráfico entrante
```

**Activar Under Attack Mode programáticamente (vía Cloudflare API) antes de fechas críticas:**
```typescript
// Script de administración — ejecutar antes de la convocatoria
await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/settings/security_level`, {
  method: 'PATCH',
  headers: {
    Authorization: `Bearer ${CF_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ value: 'under_attack' }),
});
```

---

### 5.2 Control de Sesiones Simultáneas Anti-Piratería

```typescript
// src/lib/auth.ts
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function validateAndRenewSession(userId: string, deviceInfo: string): Promise<{
  valid: boolean;
  message?: string;
}> {
  const supabase = createServerSupabaseClient();
  const newToken = crypto.randomUUID();

  // Actualizar el token de sesión activo — invalida cualquier dispositivo previo
  const { data: user } = await supabase
    .from('users')
    .select('session_token, session_device')
    .eq('id', userId)
    .single();

  // Si hay un token activo diferente, es que la cuenta está en uso en otro dispositivo
  // La política es: el dispositivo MÁS RECIENTE gana (útil para "me olvidé cerrar sesión")
  await supabase.from('users').update({
    session_token: newToken,
    session_device: deviceInfo,
    last_active_at: new Date().toISOString(),
  }).eq('id', userId);

  return { valid: true };
}

// Middleware de verificación en cada request del (app) layout
export async function checkSessionValidity(userId: string, currentToken: string): Promise<boolean> {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase
    .from('users')
    .select('session_token')
    .eq('id', userId)
    .single();

  if (data?.session_token !== currentToken) {
    // Sesión invalidada — otro dispositivo tomó el control
    return false;
  }
  return true;
}
```

El token de sesión se almacena en una cookie httpOnly segura. Si `checkSessionValidity` devuelve `false`, el middleware redirige a `/sign-in` con el mensaje: `"Tu cuenta se inició sesión en otro dispositivo."`.

---

### 5.3 Compresión de Activos y Performance

**Objetivo: landing page < 1.5MB, tiempo de carga < 2s en 4G.**

```typescript
// src/app/(marketing)/page.tsx — landing page pura, SIN librerías pesadas
import dynamic from 'next/dynamic';

// ✅ Correcto: las librerías pesadas solo cargan cuando el usuario ya está logueado
// ❌ Incorrecto: importar MathRenderer o recharts en la landing page

// Si necesitas gráficas en la landing (testimoniales, estadísticas):
const LightChart = dynamic(() => import('@/components/marketing/LightChart'), {
  ssr: false,
  loading: () => <div className="h-32 bg-neutral-800 animate-pulse rounded-lg" />,
});
```

**`next.config.js` — Optimizaciones:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],  // Conversión automática a webp/avif
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: '*.b-cdn.net' },  // Bunny.net CDN
    ],
  },
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react', 'recharts'],
  },
};
```

**Video con Bunny.net (NO YouTube, NO S3 directo):**
```typescript
// src/components/video/SecureVideoPlayer.tsx
export function SecureVideoPlayer({ bunnyVideoId }: { bunnyVideoId: string }) {
  const embedUrl = `https://iframe.mediadelivery.net/embed/${process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID}/${bunnyVideoId}`;

  return (
    <div className="relative aspect-video w-full rounded-xl overflow-hidden">
      <iframe
        src={`${embedUrl}?autoplay=false&preload=false&responsive=true`}
        className="absolute inset-0 w-full h-full"
        allowFullScreen
        // Sin allow="download" — impide que el alumno descargue el video
      />
    </div>
  );
}
// Bunny.net encripta el video, genera tokens de acceso temporales y sirve por CDN global.
// Costo: ~$0.01 USD/GB servido vs. AWS S3 egress ~$0.09 USD/GB.
```

---

### 5.4 Monitoreo de Errores — Sentry

```bash
npx @sentry/wizard@latest -i nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,     // Capturar el 10% de transacciones para no llenarse de datos
  replaysOnErrorSampleRate: 1.0,  // Session replay al 100% cuando hay un error
  replaysSessionSampleRate: 0.05, // Session replay del 5% de sesiones normales
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,       // LFPD: ocultar texto en replays (datos sensibles)
      blockAllMedia: false,
    }),
  ],
});
```

**Alerta crítica para fallas del AI Tutor:**
```typescript
// En /api/ai-tutor/route.ts — cuando todos los LLMs fallan
Sentry.captureException(error, {
  tags: { endpoint: 'ai-tutor', severity: 'critical' },
  extra: { userId, question_id },
});
```

---

<a name="6"></a>
## 6. PANEL DE CONTROL GENERAL (ADMIN DASHBOARD)

### Ruta: `/admin` — Protegida con `role: 'admin'`

### 6.1 Bloque: Dinero (La Caja Registradora)

| Métrica | Fuente de datos | Cálculo |
|---------|-----------------|---------|
| **MRR** | Stripe API `v1/charges` | `SUM(amount)` de cargos exitosos del mes |
| **Ventas por Método** | Stripe `payment_method_types` | % tarjeta vs OXXO vs SPEI |
| **Tasa de Reembolsos** | Stripe `v1/refunds` | `(refunds_count / total_payments) * 100` |
| **Contracargos Activos** | Tabla `chargebacks` | `COUNT(*) WHERE status = 'open'` |
| **MXN → USD Risk** | Tipo de cambio SAT | Alertar si reembolsos > 2% del MRR |

### 6.2 Bloque: Usuarios (Tráfico y Tracción)

```sql
-- DAU (Usuarios activos diarios)
SELECT COUNT(DISTINCT user_id) AS dau
FROM user_progress
WHERE answered_at >= CURRENT_DATE;

-- Tasa de conversión free → premium (últimos 30 días)
SELECT
  COUNT(*) FILTER (WHERE status = 'premium') AS premium_count,
  COUNT(*) FILTER (WHERE status = 'free_tier') AS free_count,
  ROUND(
    COUNT(*) FILTER (WHERE status = 'premium')::NUMERIC /
    NULLIF(COUNT(*), 0) * 100, 2
  ) AS conversion_rate_pct
FROM users
WHERE created_at >= NOW() - INTERVAL '30 days';

-- Usuarios en riesgo de churn (3+ simulacros con < 40% aciertos)
SELECT u.id, u.email, u.exam_date,
  AVG(sub.score) AS avg_score
FROM users u
JOIN (
  SELECT user_id, exam_session_id,
    AVG(CASE WHEN is_correct THEN 1.0 ELSE 0.0 END) AS score
  FROM user_progress
  GROUP BY user_id, exam_session_id
) sub ON sub.user_id = u.id
WHERE u.status = 'premium'
GROUP BY u.id, u.email, u.exam_date
HAVING COUNT(*) >= 3 AND AVG(sub.score) < 0.40
ORDER BY avg_score ASC;
```

### 6.3 Bloque: Operación e IA (FinOps)

```sql
-- Consumo de tokens del mes actual
SELECT
  SUM(prompt_tokens + completion_tokens) AS total_tokens,
  SUM(cost_usd) AS total_cost_usd,
  SUM(cost_usd) * 20 AS total_cost_mxn  -- Tipo de cambio aproximado
FROM ai_costs
WHERE created_at >= date_trunc('month', NOW());

-- Margen bruto por usuario (top 20 más costosos)
SELECT
  u.id, u.email, u.full_name,
  1000 AS precio_curso_mxn,             -- Precio fijo del plan
  ROUND(SUM(ac.cost_usd) * 20, 2) AS costo_ia_mxn,
  1000 - ROUND(SUM(ac.cost_usd) * 20, 2) - 36 AS margen_neto_mxn  -- 36 = comisión Stripe ~3.6%
FROM users u
JOIN ai_costs ac ON ac.user_id = u.id
WHERE u.status = 'premium'
GROUP BY u.id
ORDER BY costo_ia_mxn DESC
LIMIT 20;
```

### 6.4 Semáforo de Calidad Académica

```sql
-- Materias con más del 60% de fallo (Foco Rojo)
SELECT
  materia,
  tema,
  COUNT(*) AS total_respuestas,
  ROUND(AVG(CASE WHEN is_correct THEN 0 ELSE 1 END) * 100, 1) AS failure_pct
FROM user_progress up
JOIN questions q ON q.id = up.question_id
WHERE up.answered_at >= NOW() - INTERVAL '30 days'
GROUP BY materia, tema
HAVING AVG(CASE WHEN is_correct THEN 0 ELSE 1 END) > 0.60
ORDER BY failure_pct DESC
LIMIT 10;
```

El dashboard renderiza esto con un `badge` rojo/amarillo/verde:
- 🔴 Foco Rojo: > 60% de fallo → "La IA necesita reescribir estas lecciones"
- 🟡 Alerta: 40–60%
- 🟢 Normal: < 40%

---

<a name="7"></a>
## 7. REGLAS PARA CURSOR Y ROADMAP DE LANZAMIENTO (MVP)

### 7.1 Archivo `.cursorrules`

```
# .cursorrules — Plataforma EdTech Exámenes de Admisión México
# Versión 1.0 — Leer COMPLETO antes de generar código

## STACK TÉCNICO OFICIAL
- Framework: Next.js 14+ con App Router (NUNCA Pages Router)
- Estilos: Tailwind CSS v3 + Shadcn/ui
- Base de datos: Supabase (PostgreSQL) con Supabase JS Client v2
- Autenticación: Clerk
- Pagos: Stripe con webhooks para OXXO/SPEI
- Video: Bunny.net (NUNCA YouTube embeds ocultos)
- Deploy: Vercel
- CDN/DDoS: Cloudflare
- Móvil: Capacitor (web-first, la app es un wrapper)

## REGLAS DE ARQUITECTURA — NO NEGOCIABLES

### 1. MOBILE-FIRST SIEMPRE
- Todo componente de Tailwind debe comenzar con clases mobile y escalar: `text-sm md:text-base lg:text-lg`
- Botones mínimo h-12 (48px) para targets táctiles en iOS/Android
- Probado mentalmente en pantalla de 375px antes de asumir que funciona

### 2. SEGURIDAD DEL AI TUTOR
- El endpoint /api/ai-tutor NUNCA acepta texto libre del usuario
- Solo acepta: { question_id: UUID, opcion_elegida: 'A'|'B'|'C'|'D'|'E' }
- El prompt se construye ENTERAMENTE en el servidor con datos de la BD
- Si alguien intenta inyectar texto → 400 Bad Request

### 3. PERFORMANCE — LANDING PAGE
- La landing page (marketing) NO importa: react-markdown, katex, recharts, ni ninguna librería > 50KB
- Todo lo pesado usa: import dynamic from 'next/dynamic' con ssr: false
- Target: < 1.5MB total de JS enviado al browser en la landing

### 4. BASE DE DATOS
- Siempre usar el Supabase SERVER client en API Routes (nunca el browser client en el server)
- Usar la URL de Connection Pooler (PgBouncer) para las API routes: DATABASE_URL_POOLER
- Usar la URL directa solo para migraciones: DATABASE_URL_DIRECT
- NUNCA exponer las claves de Supabase service_role al frontend

### 5. FÓRMULAS MATEMÁTICAS / LaTeX
- Todas las preguntas y explicaciones se renderizan con <MathRenderer> (react-markdown + remark-math + rehype-katex)
- El CSS de KaTeX se importa UNA SOLA VEZ en src/app/(app)/layout.tsx
- Proteger .katex * { box-sizing: content-box !important } en globals.css

### 6. PAGOS Y WEBHOOKS
- Los webhooks de Stripe SIEMPRE verifican la firma con stripe.webhooks.constructEvent()
- Usar 3D Secure en pagos con tarjeta: request_three_d_secure: 'automatic'
- En la app nativa (Capacitor), CERO botones de pago — modelo Reader App

### 7. SESIONES Y AUTENTICACIÓN
- Cada login genera un nuevo session_token único en users.session_token
- Si el token del request no coincide con el de la BD → logout forzado
- Rate limiting en /api/exams/questions: máx 3 peticiones en 5s por usuario (anti-scraping)

### 8. COMPONENTES OBLIGATORIOS EN EL SIMULADOR
- <Timer /> → cronómetro inverso, estado guardado en localStorage como fallback offline
- <QuestionCard /> → estados: idle | selected | correct | error (desactiva opciones tras responder en modo práctica)
- <MathRenderer /> → wrap cualquier texto que pueda contener LaTeX

### 9. NAMING CONVENTIONS
- Rutas API: kebab-case → /api/ai-tutor, /api/exams/submit
- Componentes: PascalCase → QuestionCard, MathRenderer
- Funciones de utilidad: camelCase → calcularProximaRevision, hashData
- Variables de entorno: SCREAMING_SNAKE_CASE, prefijo NEXT_PUBLIC_ solo si el frontend lo necesita

### 10. ASYNC — EVITAR TIMEOUTS DE VERCEL
- Operaciones de IA que puedan tardar > 8s: usar Inngest createFunction
- NUNCA bloquear una API route esperando la respuesta completa de un LLM para análisis de exámenes
- El frontend recibe { status: 'processing' } inmediatamente y espera notificación por Pusher

### 11. CI/CD
- Rama de trabajo: develop
- Rama de producción: main (protegida, requiere PR aprobado)
- Vercel crea Preview URL automáticamente en cada PR
- NUNCA pushear directo a main

### 12. ERRORES Y LOGGING
- Sentry instalado en sentry.client.config.ts y sentry.server.config.ts
- Sentry.captureException() en todos los catch de API routes críticas
- NUNCA usar console.log en producción para datos de usuarios (LFPD)
```

---

### 7.2 Política Legal LFPD y Facturación SAT

**Aviso de Privacidad mínimo requerido (ruta `/aviso-de-privacidad`):**

El documento debe cubrir obligatoriamente los siguientes puntos bajo la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPD, DOF 2010):

1. **Identidad del responsable:** Nombre/razón social, domicilio fiscal, RFC.
2. **Datos personales recabados:** Nombre, correo, teléfono, datos de pago, IP, historial de estudio.
3. **Finalidades:** Prestación del servicio educativo, comunicaciones comerciales (señalar cuáles son primarias y cuáles secundarias/opcionales).
4. **Transferencias:** Si se comparten datos con Stripe, Clerk, OpenAI, MailerLite — indicarlo.
5. **Derechos ARCO:** Mecanismo para Acceso, Rectificación, Cancelación y Oposición (correo dedicado: `privacidad@tuplataforma.com`).
6. **Menores de edad:** Los padres o tutores deben aceptar el aviso en nombre de menores de 18 años. Agregar un checkbox explícito en el registro: `"Soy mayor de 18 años O soy el tutor legal del menor que usará esta plataforma"`.

**Checkbox en el formulario de registro (requerido por LFPD):**
```typescript
// Guardar timestamp de aceptación
await supabase.from('users').update({
  gdpr_accepted_at: new Date().toISOString(),
}).eq('id', userId);
```

**Facturación automática con Facturapi (CFDI 4.0 para el SAT):**
```typescript
// src/lib/facturapi.ts
import Facturapi from 'facturapi';

const facturapi = new Facturapi(process.env.FACTURAPI_SECRET_KEY!);

export async function emitirFactura(params: {
  customerRfc: string;
  customerName: string;
  customerEmail: string;
  amount: number;  // en MXN
  description: string;
}) {
  const invoice = await facturapi.invoices.create({
    customer: {
      legal_name: params.customerName,
      tax_id: params.customerRfc,         // RFC del cliente
      tax_system: '616',                  // RESICO
      email: params.customerEmail,
      address: { zip: '06600' },          // CP requerido para CFDI 4.0
    },
    items: [
      {
        quantity: 1,
        product: {
          description: params.description,  // "Acceso a plataforma de preparación UNAM/IPN"
          product_key: '86101500',          // Clave SAT: Servicios educativos
          unit_key: 'E48',                  // Servicio
          price: params.amount,
          tax_included: true,
          taxes: [{ type: 'IVA', rate: 0.16, factor: 'Tasa' }],
        },
      },
    ],
    payment_form: '03',    // Transferencia electrónica (SPEI)
    use: 'G03',            // Gastos en general
  });

  // Enviar PDF y XML por correo automáticamente
  await facturapi.invoices.sendByEmail(invoice.id);
  return invoice;
}
```

**Régimen fiscal recomendado al inicio:** RESICO (Régimen Simplificado de Confianza) — tasa de ISR del 1% al 2.5% sobre ingresos brutos para personas físicas con ingresos menores a $3.5M MXN anuales.

---

### 7.3 Roadmap de Desarrollo — 4 Pasos MVP

---

#### PASO 1 — Fundación (Semanas 1–3)
**Objetivo: Infraestructura funcional, registro de usuarios y banco de preguntas inicial.**

- [ ] Setup del repositorio GitHub + Vercel (ramas `main` y `develop`)
- [ ] Inicializar proyecto Next.js 14 con Tailwind + Shadcn/ui
- [ ] Configurar Supabase: ejecutar scripts SQL de las tablas `users`, `questions`, `user_progress`, `ai_costs`
- [ ] Crear los índices compuestos en Supabase
- [ ] Integrar Clerk (auth) con `session_token` en `users`
- [ ] Configurar Cloudflare como proxy DNS (apuntar dominio)
- [ ] Instalar y configurar Sentry (`npx @sentry/wizard`)
- [ ] Configurar `pg_cron` en Supabase para la purga mensual
- [ ] Poblar banco inicial: 200 preguntas (50 por eje modular) usando el script de parser PDF + OpenAI
- [ ] Componentes base: `<QuestionCard />`, `<Timer />`, `<MathRenderer />`

**Entregable:** Se puede registrar un usuario, ver el dashboard vacío y hacer una pregunta del simulador.

---

#### PASO 2 — Simulador y AI Core (Semanas 4–7)
**Objetivo: Simulacros funcionales con diagnóstico IA y tutor 24/7.**

- [ ] Flujo completo de simulacro: selección de examen → preguntas → submit → Inngest job
- [ ] Implementar SM-2 en `user_progress` (campos `next_review_at`, `ease_factor`)
- [ ] Endpoint `/api/ai-tutor` con seguridad anti-inyección (solo acepta `question_id`)
- [ ] Implementar Multi-LLM con Vercel AI SDK (OpenAI → Claude → Groq fallback)
- [ ] Caché semántico con Upstash Redis (`@upstash/semantic-cache`)
- [ ] Integrar Pusher para notificación WebSocket cuando el diagnóstico está listo
- [ ] Planificador Adaptativo: endpoint `/api/study-plan` + calendar view
- [ ] Telemetría de ansiedad: guardar `time_spent_seconds` por pregunta
- [ ] Dificultad dinámica (lógica 70/30 → 40/45/15 → 20/40/40)
- [ ] KaTeX funcionando en mobile (validar en Chrome DevTools a 375px)

**Entregable:** Un alumno puede hacer un simulacro completo, recibir diagnóstico de IA y usar el tutor para resolver dudas.

---

#### PASO 3 — Monetización y Landing (Semanas 8–10)
**Objetivo: La plataforma genera ingresos reales.**

- [ ] Landing page pública (< 1.5MB): copy, precios, testimoniales, CTA
- [ ] Integrar Stripe: productos de suscripción + OXXO + SPEI
- [ ] Webhook de Stripe: activar `status: 'premium'` al pago confirmado
- [ ] Modelo Reader App en Capacitor (remover botones de pago en app nativa)
- [ ] Aviso de privacidad LFPD + checkbox de aceptación en registro
- [ ] Integrar Facturapi para CFDI 4.0 automático
- [ ] Configurar Meta CAPI con `external_id` hasheado
- [ ] Automatizaciones MailerLite: secuencia de urgencia a 30/15/7 días del examen
- [ ] Admin Dashboard básico: MRR, DAU, Semáforo de calidad
- [ ] Activar Cloudflare Turnstile en formularios de registro (anti-spam)

**Entregable:** Un papá puede pagar el curso en OXXO y su hijo acceder desde la app.

---

#### PASO 4 — Escala y App Móvil (Semanas 11–16)
**Objetivo: Publicar en App Store / Google Play y preparar para tráfico masivo.**

- [ ] Construir app con Capacitor: `npx cap add ios && npx cap add android`
- [ ] Integrar OneSignal/FCM para notificaciones push (`push_token` ya en `users`)
- [ ] Sistema de gamificación completo: insignias, rachas, leaderboard
- [ ] Dashboard del tutor/papás (`role: 'tutor'`) con gráficas de rendimiento
- [ ] Activar `organization_id` en `users` para primera escuela B2B piloto
- [ ] Generación de PDF de diagnóstico con `@react-pdf/renderer`
- [ ] Algoritmo de auto-re-clasificación de dificultad por `failure_rate` real
- [ ] Sistema de referidos con `referral_code` + comisión automática por Stripe Connect
- [ ] Prueba de carga: simular 500 usuarios simultáneos (k6 o Artillery)
- [ ] Activar Connection Pooler de Supabase (PgBouncer URL para API routes)
- [ ] Publicar en Google Play ($25 USD one-time) y App Store ($99 USD/año)

**Entregable:** La plataforma está en las tiendas, soporta carga de la convocatoria UNAM y tiene el primer cliente B2B escolar.

---

### KPIs de Éxito por Paso

| Paso | KPI Target |
|------|------------|
| 1 | 0 errores en Sentry al hacer onboarding completo |
| 2 | Tiempo de diagnóstico IA < 30s para 120 preguntas |
| 3 | Primer pago exitoso vía OXXO en < 24h de publicar |
| 4 | Soportar 200 usuarios simultáneos sin error 504 en Supabase |

---

*Documento generado en: 2026 · Clasificación: Interno · Próxima revisión: post-lanzamiento MVP*
