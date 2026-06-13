export interface CourseStep {
  id: string;
  text: string;
}

export interface CursorTool {
  name: string;
  when: string;
}

export interface CourseLesson {
  id: string;
  moduleId: string;
  moduleTitle: string;
  moduleNumber: number;
  lessonNumber: number;
  title: string;
  duration: string;
  what: string;
  why: string;
  steps: CourseStep[];
  verify: string;
  cursorPrompt: string;
  cursorTools: CursorTool[];
  /** Lección ya hecha en código — se marca automática */
  autoComplete?: boolean;
  /** Bloqueada hasta completar la lección anterior */
  requiresPrevious?: boolean;
}

export const courseModules = [
  { id: 'mod-0', number: 0, title: 'Introducción' },
  { id: 'mod-1', number: 1, title: 'Fundación' },
  { id: 'mod-2', number: 2, title: 'Simulador e IA' },
  { id: 'mod-3', number: 3, title: 'Monetización' },
];

export const implementationCourse: CourseLesson[] = [
  {
    id: 'lesson-welcome',
    moduleId: 'mod-0',
    moduleTitle: 'Introducción',
    moduleNumber: 0,
    lessonNumber: 1,
    title: 'Cómo usar este curso',
    duration: '5 min',
    what: 'Este centro te guía como un curso online: una lección a la vez, con checklist y prompts listos para pegar en Cursor.',
    why: 'Así no te pierdes ni te abrumas. Cada lección termina con algo concreto funcionando.',
    steps: [
      { id: 's1', text: 'Lee la lección actual completa antes de tocar código.' },
      { id: 's2', text: 'Marca cada paso del checklist cuando lo termines.' },
      { id: 's3', text: 'Copia el prompt de Cursor y pégalo en el chat del agente.' },
      { id: 's4', text: 'Verifica que funcionó antes de pulsar “Completé esta lección”.' },
    ],
    verify: 'Entiendes el flujo: leer → hacer checklist → pedir ayuda a Cursor → verificar → siguiente.',
    cursorPrompt:
      'Estoy en la lección de bienvenida del curso PrepMX en /admin. Explícame en 3 bullets cómo trabajar contigo lección por lección sin saltarme pasos.',
    cursorTools: [
      { name: 'Agent (Cmd+I)', when: 'Para que Cursor escriba código y ejecute comandos por ti.' },
      { name: 'Rules (.cursor/rules)', when: 'Reglas que Cursor recuerda en cada chat de este proyecto.' },
      { name: 'Plan mode', when: 'Cuando quieras diseñar antes de codear una lección grande.' },
    ],
    requiresPrevious: false,
  },
  {
    id: 'lesson-foundation-done',
    moduleId: 'mod-1',
    moduleTitle: 'Fundación',
    moduleNumber: 1,
    lessonNumber: 1,
    title: 'Lo que ya tienes listo',
    duration: '2 min',
    what: 'Repo, landing, dashboard, simulador demo, SQL de Supabase y algoritmo SM-2 ya están en el código.',
    why: 'No repitas trabajo. Tu punto de partida real es conectar servicios externos (Supabase, Clerk, etc.).',
    steps: [
      { id: 's1', text: 'Abre http://localhost:3000 y confirma que ves el landing.' },
      { id: 's2', text: 'Entra a /dashboard y recorre simulacros, plan y tutor (son demo).' },
      { id: 's3', text: 'Revisa que existe el archivo supabase/migrations/001_initial.sql.' },
    ],
    verify: 'El sitio corre en local y las pantallas se ven bien.',
    cursorPrompt:
      'Corre npm run dev:clean si hace falta y confirma que /, /dashboard y /simulador-gratis responden 200.',
    cursorTools: [
      { name: 'Terminal integrada', when: 'Para npm run dev y ver errores en vivo.' },
      { name: 'Browser preview (MCP)', when: 'Para que el agente abra la página y verifique visualmente.' },
    ],
    autoComplete: true,
    requiresPrevious: false,
  },
  {
    id: 'lesson-supabase',
    moduleId: 'mod-1',
    moduleTitle: 'Fundación',
    moduleNumber: 1,
    lessonNumber: 2,
    title: 'Conectar Supabase',
    duration: '45 min',
    what: 'Vas a conectar PrepMX a una base de datos en la nube (Supabase). Es la “memoria externa” de tu app: ahí se guardan usuarios, preguntas, respuestas y progreso de forma segura.',
    why: 'Hoy todo es demo en el navegador: si cierras la pestaña, se pierde. Con Supabase cada alumno tiene historial real y tú puedes cargar las 200 preguntas.',
    steps: [
      { id: 's1', text: 'Entra a supabase.com → crea cuenta gratis → New project (elige región cercana, ej. US East). Si te pide conectar GitHub: da igual si dices sí o no — no rompe nada.' },
      { id: 's2', text: 'En el panel izquierdo: SQL Editor → New query → pega TODO el archivo supabase/migrations/001_initial.sql → Run.' },
      { id: 's3', text: 'Ve al ícono de engranaje (Project Settings) → API. Copia Project URL, anon public key y service_role key.' },
      { id: 's4', text: 'En la raíz del repo crea .env.local (copia .env.example). Pega las 3 variables de Supabase.' },
      { id: 's5', text: 'En la terminal: npm run check:supabase (debe decir ✅ en todas las tablas). Luego npm run seed:questions si la tabla questions está vacía.' },
      { id: 's6', text: 'Reinicia el servidor: npm run dev:clean. Abre http://localhost:3000/api/health/supabase — debe responder ok: true.' },
    ],
    verify: 'En Supabase → Table Editor aparecen las tablas del SQL. En local el proyecto arranca sin error de conexión.',
    cursorPrompt:
      'Lección Supabase PrepMX: ya tengo NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY y SUPABASE_SERVICE_ROLE_KEY en .env.local. Verifica que src/lib/supabase/client.ts y server.ts funcionen. Crea scripts/seed-questions.ts con las 20 preguntas demo si la tabla questions está vacía.',
    cursorTools: [
      { name: 'Agent + @.env.local', when: 'Nunca pegues keys en el chat; el agente lee .env.local local.' },
      { name: '@supabase/migrations/001_initial.sql', when: 'Referencia el schema al pedir cambios en BD.' },
    ],
    requiresPrevious: true,
  },
  {
    id: 'lesson-clerk',
    moduleId: 'mod-1',
    moduleTitle: 'Fundación',
    moduleNumber: 1,
    lessonNumber: 3,
    title: 'Activar login con Clerk',
    duration: '40 min',
    what: 'Reemplazar el login demo por registro e inicio de sesión real con Clerk.',
    why: 'Cada alumno necesita su cuenta propia para guardar progreso, rachas y planes de estudio.',
    steps: [
      { id: 's1', text: 'Crea cuenta en clerk.com → New application → nombre PrepMX.' },
      { id: 's2', text: 'Copia Publishable key y Secret key a .env.local.' },
      { id: 's3', text: 'En Clerk configura URLs: sign-in /sign-in, sign-up /sign-up, after sign-in /onboarding.' },
      { id: 's4', text: 'Pide a Cursor que wiree Clerk en layout y proteja rutas /dashboard/*.' },
      { id: 's5', text: 'Prueba crear una cuenta real y llegar al onboarding.' },
    ],
    verify: 'Puedes registrarte, cerrar sesión y volver a entrar. Sin login no entras al dashboard.',
    cursorPrompt:
      'Lección Clerk PrepMX: integra @clerk/nextjs. Protege (app)/dashboard con auth. Tras login redirige a /onboarding si es usuario nuevo. Mantén el diseño actual.',
    cursorTools: [
      { name: 'Rules prep-mx-implementacion', when: 'Cursor seguirá el orden del curso y no saltará pasos.' },
      { name: '@docs Clerk Next.js', when: 'Escribe @docs y busca Clerk App Router para docs oficiales.' },
    ],
    requiresPrevious: true,
  },
  {
    id: 'lesson-questions',
    moduleId: 'mod-1',
    moduleTitle: 'Fundación',
    moduleNumber: 1,
    lessonNumber: 4,
    title: 'Subir banco de preguntas',
    duration: '2–4 hrs',
    what: 'Pasar de 20 preguntas demo a un banco real (meta: 200) en la tabla questions.',
    why: 'Los alumnos notan cuando se repiten preguntas. Un banco grande da credibilidad de “simulador serio”.',
    steps: [
      { id: 's1', text: 'Define formato: materia, tema, dificultad, enunciado, 4 opciones, respuesta correcta.' },
      { id: 's2', text: 'Empieza con 50 preguntas de tu mejor materia (ej. matemáticas UNAM Área 1).' },
      { id: 's3', text: 'Pide a Cursor un script scripts/seed-questions.ts que inserte en Supabase.' },
      { id: 's4', text: 'Corre el script y verifica en Table Editor → questions.' },
      { id: 's5', text: 'Abre /simulador-gratis y confirma preguntas distintas.' },
    ],
    verify: 'Al menos 50 filas en questions y el simulador las muestra desde BD.',
    cursorPrompt:
      'Lección preguntas PrepMX: crea scripts/seed-questions.ts que lea un JSON en data/questions/ y haga upsert a Supabase questions. Incluye 5 preguntas de ejemplo en el JSON.',
    cursorTools: [
      { name: 'Composer multi-archivo', when: 'Para crear JSON + script + tipos en un solo flujo.' },
      { name: 'CSV import en Supabase', when: 'Alternativa rápida: Table Editor → Import CSV.' },
    ],
    requiresPrevious: true,
  },
  {
    id: 'lesson-deploy',
    moduleId: 'mod-1',
    moduleTitle: 'Fundación',
    moduleNumber: 1,
    lessonNumber: 5,
    title: 'Publicar en Vercel',
    duration: '30 min',
    what: 'Subir la app a internet con una URL pública en vercel.com.',
    why: 'Para compartir con beta testers, papás o primeros alumnos necesitas algo más que localhost.',
    steps: [
      { id: 's1', text: 'Sube develop a GitHub (GitHub Desktop está bien).' },
      { id: 's2', text: 'En vercel.com → Import project → elige el repo prep-mx.' },
      { id: 's3', text: 'Agrega TODAS las variables de .env.local en Vercel → Settings → Environment Variables.' },
      { id: 's4', text: 'Deploy → abre la URL .vercel.app y prueba login + simulador.' },
      { id: 's5', text: '(Opcional) Conecta tu dominio en Cloudflare.' },
    ],
    verify: 'La URL pública carga sin error 500 y el login funciona.',
    cursorPrompt:
      'Lección deploy PrepMX: revisa next.config y package.json para compatibilidad Vercel. Lista las env vars requeridas para un checklist de deploy.',
    cursorTools: [
      { name: 'gh CLI', when: 'Para PRs y ver checks de CI desde Cursor.' },
      { name: 'Vercel dashboard', when: 'Logs de deploy cuando algo falla en producción.' },
    ],
    requiresPrevious: true,
  },
  {
    id: 'lesson-exam-submit',
    moduleId: 'mod-2',
    moduleTitle: 'Simulador e IA',
    moduleNumber: 2,
    lessonNumber: 1,
    title: 'Guardar resultados del simulacro',
    duration: '1–2 hrs',
    what: 'Cuando el alumno termina un examen, enviar respuestas al servidor y guardarlas en Supabase.',
    why: 'Sin guardar intentos no hay diagnóstico, historial ni estadísticas de debilidades.',
    steps: [
      { id: 's1', text: 'Revisa la UI actual del simulador en /dashboard/simulacros/[examId].' },
      { id: 's2', text: 'Pide a Cursor crear POST /api/exams/submit.' },
      { id: 's3', text: 'Guarda exam_attempts y respuestas en Supabase.' },
      { id: 's4', text: 'Muestra pantalla “Analizando tus resultados…” al enviar.' },
      { id: 's5', text: 'Prueba un simulacro completo y revisa datos en Supabase.' },
    ],
    verify: 'Tras terminar un examen aparece una fila nueva en exam_attempts (o tabla equivalente).',
    cursorPrompt:
      'Lección exam submit PrepMX: implementa POST /api/exams/submit. Recibe exam_id y respuestas, califica contra questions en Supabase, guarda intento. Redirige a pantalla de espera.',
    cursorTools: [
      { name: 'Plan mode', when: 'Antes de codear: diseña tablas y flujo en 5 bullets.' },
      { name: '@src/components/exam/', when: 'Referencia componentes existentes del simulador.' },
    ],
    requiresPrevious: true,
  },
  {
    id: 'lesson-sm2-db',
    moduleId: 'mod-2',
    moduleTitle: 'Simulador e IA',
    moduleNumber: 2,
    lessonNumber: 2,
    title: 'Repaso inteligente (SM-2)',
    duration: '1 hr',
    what: 'Conectar el algoritmo SM-2 que ya existe para programar cuándo repasar cada tema.',
    why: 'El alumno repasa lo que olvida en el momento justo — eso es lo que vende “estudio inteligente”.',
    steps: [
      { id: 's1', text: 'Lee src/lib/sm2.ts para entender entrada y salida.' },
      { id: 's2', text: 'Tras calificar cada respuesta, actualiza user_progress en Supabase.' },
      { id: 's3', text: 'Guarda next_review_at, ease_factor e interval_days.' },
      { id: 's4', text: 'En dashboard muestra “Repaso pendiente hoy” con temas vencidos.' },
    ],
    verify: 'Fallar una pregunta actualiza user_progress y la fecha de próximo repaso.',
    cursorPrompt:
      'Lección SM-2 PrepMX: usa src/lib/sm2.ts. Tras submit de examen actualiza user_progress por tema. Muestra conteo de repasos pendientes en dashboard.',
    cursorTools: [
      { name: '@src/lib/sm2.ts', when: 'El agente debe reutilizar esta lib, no reescribir.' },
    ],
    requiresPrevious: true,
  },
  {
    id: 'lesson-ai-tutor',
    moduleId: 'mod-2',
    moduleTitle: 'Simulador e IA',
    moduleNumber: 2,
    lessonNumber: 3,
    title: 'Tutor con IA',
    duration: '1–2 hrs',
    what: 'Botón “Explícame” que llama a OpenAI desde el servidor de forma segura.',
    why: 'Es tu diferenciador: explicación al momento del error, no un video genérico de 40 minutos.',
    steps: [
      { id: 's1', text: 'Crea cuenta OpenAI y genera API key → OPENAI_API_KEY en .env.local.' },
      { id: 's2', text: 'Pide a Cursor crear /api/ai-tutor (solo recibe question_id, no texto libre).' },
      { id: 's3', text: 'Conecta el botón en /dashboard/tutor y post-simulacro.' },
      { id: 's4', text: 'Prueba una pregunta fallada y verifica que la explicación tiene sentido.' },
    ],
    verify: 'El tutor responde en menos de 10 s y no expone la API key en el navegador.',
    cursorPrompt:
      'Lección AI tutor PrepMX: crea /api/ai-tutor. Input: question_id + opcion_elegida. Busca pregunta en Supabase, prompt fijo, OpenAI gpt-4o-mini. Conecta UI en dashboard/tutor.',
    cursorTools: [
      { name: 'Agent', when: 'Ideal para API route + hook en componente en un solo turno.' },
      { name: '.env.local', when: 'Key solo en servidor; nunca NEXT_PUBLIC_ para OpenAI.' },
    ],
    requiresPrevious: true,
  },
  {
    id: 'lesson-diagnostic',
    moduleId: 'mod-2',
    moduleTitle: 'Simulador e IA',
    moduleNumber: 2,
    lessonNumber: 4,
    title: 'Diagnóstico post-examen',
    duration: '2 hrs',
    what: 'Reporte automático: en qué temas falló más y qué estudiar mañana.',
    why: 'Cumple la promesa del marketing: “plan de ataque basado en tus errores”.',
    steps: [
      { id: 's1', text: 'Agrupa errores del intento por tema/materia.' },
      { id: 's2', text: 'Llama a OpenAI con prompt estructurado (JSON).' },
      { id: 's3', text: 'Guarda resultado en ai_feedback en Supabase.' },
      { id: 's4', text: 'Redirige a /dashboard/diagnostico/[feedbackId] con datos reales.' },
    ],
    verify: 'Tras un simulacro ves diagnóstico personalizado, no datos mock.',
    cursorPrompt:
      'Lección diagnóstico PrepMX: tras /api/exams/submit genera ai_feedback con OpenAI (temas débiles + 3 recomendaciones). Conecta página diagnostico/[feedbackId] a Supabase.',
    cursorTools: [
      { name: 'Inngest (fase 2 avanzada)', when: 'Si el análisis tarda, procésalo en background.' },
    ],
    requiresPrevious: true,
  },
  {
    id: 'lesson-study-plan',
    moduleId: 'mod-2',
    moduleTitle: 'Simulador e IA',
    moduleNumber: 2,
    lessonNumber: 5,
    title: 'Plan de estudio personalizado',
    duration: '1–2 hrs',
    what: 'Generar y guardar el calendario de /dashboard/plan según fecha de examen y área.',
    why: 'El alumno ansioso quiere saber “qué estudio hoy”; esto lo fija en concreto.',
    steps: [
      { id: 's1', text: 'Lee datos del onboarding (universidad, área, fecha_examen).' },
      { id: 's2', text: 'Calcula días disponibles hasta el examen.' },
      { id: 's3', text: 'API genera plan JSON con OpenAI o reglas + lo guarda en study_plans.' },
      { id: 's4', text: 'Renderiza el calendario desde BD, no hardcode.' },
    ],
    verify: 'Cambiar fecha de examen en onboarding actualiza el plan en dashboard/plan.',
    cursorPrompt:
      'Lección plan PrepMX: persiste study_plans en Supabase. Genera plan desde onboarding (días hasta examen + área). Reemplaza mock en dashboard/plan.',
    cursorTools: [
      { name: 'Plan mode', when: 'Define schema JSON del plan antes de implementar.' },
    ],
    requiresPrevious: true,
  },
  {
    id: 'lesson-stripe',
    moduleId: 'mod-3',
    moduleTitle: 'Monetización',
    moduleNumber: 3,
    lessonNumber: 1,
    title: 'Cobrar con Stripe',
    duration: '2–3 hrs',
    what: 'Botones de /precios que abren checkout de Stripe (tarjeta, OXXO, SPEI en MX).',
    why: 'Aquí conviertes usuarios gratis en ingresos recurrentes.',
    steps: [
      { id: 's1', text: 'Crea cuenta Stripe México en stripe.com.' },
      { id: 's2', text: 'Define 3 productos/precios que coincidan con la página /precios.' },
      { id: 's3', text: 'Pide a Cursor checkout session + webhook.' },
      { id: 's4', text: 'Al pagar, marca usuario como premium en Supabase.' },
      { id: 's5', text: 'Prueba con tarjeta de test 4242 4242 4242 4242.' },
    ],
    verify: 'Pago de prueba activa plan premium y desbloquea features en dashboard.',
    cursorPrompt:
      'Lección Stripe PrepMX: integra checkout para 3 planes en /precios. Webhook stripe actualiza subscription_status en Supabase. Modo test.',
    cursorTools: [
      { name: 'Stripe CLI', when: 'Para probar webhooks en local: stripe listen --forward-to.' },
    ],
    requiresPrevious: true,
  },
  {
    id: 'lesson-lfpd',
    moduleId: 'mod-3',
    moduleTitle: 'Monetización',
    moduleNumber: 3,
    lessonNumber: 2,
    title: 'Aviso de privacidad (LFPD)',
    duration: '30 min',
    what: 'Publicar el texto legal en /aviso-de-privacidad. Ya hay un borrador de Gemini integrado; solo faltan tus datos reales (dirección, email).',
    why: 'Obligatorio en México si guardas emails, progreso y pagos. Padres y prepas lo revisan antes de pagar.',
    steps: [
      { id: 's1', text: 'Abre /aviso-de-privacidad y lee el borrador completo.' },
      { id: 's2', text: 'Reemplaza [completa tu dirección fiscal] y confirma privacidad@prepmx.com (o tu email real).' },
      { id: 's3', text: 'Opcional: pásalo a un abogado LFPD antes de lanzar a producción.' },
      { id: 's4', text: 'Verifica que el enlace aparece en el footer y en registro.' },
    ],
    verify: 'La página ya no dice “en construcción” y los datos de contacto son reales.',
    cursorPrompt:
      'Lección LFPD PrepMX: redacta aviso de privacidad básico LFPD para EdTech México (Clerk, Supabase, Stripe, OpenAI). Actualiza /aviso-de-privacidad y enlaces en layout.',
    cursorTools: [
      { name: 'Ask mode', when: 'Solo revisar texto legal sin tocar código.' },
    ],
    requiresPrevious: true,
  },
];

export function getLessonById(id: string): CourseLesson | undefined {
  return implementationCourse.find((l) => l.id === id);
}

export function getNextLesson(currentId: string): CourseLesson | undefined {
  const idx = implementationCourse.findIndex((l) => l.id === currentId);
  if (idx === -1 || idx >= implementationCourse.length - 1) return undefined;
  return implementationCourse[idx + 1];
}

export function getFirstIncompleteLesson(
  completedIds: string[]
): CourseLesson {
  const found = implementationCourse.find(
    (l) => !l.autoComplete && !completedIds.includes(l.id)
  );
  return found ?? implementationCourse[implementationCourse.length - 1];
}

export function getCourseStats(completedIds: string[]) {
  const actionable = implementationCourse.filter((l) => !l.autoComplete);
  const done = actionable.filter((l) => completedIds.includes(l.id)).length;
  const total = actionable.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return { done, total, pct };
}

export function isLessonUnlocked(
  lesson: CourseLesson,
  completedIds: string[],
  allLessons: CourseLesson[] = implementationCourse
): boolean {
  if (!lesson.requiresPrevious) return true;
  const idx = allLessons.findIndex((l) => l.id === lesson.id);
  if (idx <= 0) return true;
  const prev = allLessons[idx - 1];
  return prev.autoComplete || completedIds.includes(prev.id);
}

export function getLessonsGroupedByModule() {
  return courseModules.map((mod) => ({
    ...mod,
    lessons: implementationCourse.filter((l) => l.moduleId === mod.id),
  }));
}

export function getGlobalLessonIndex(lessonId: string): number {
  return implementationCourse.findIndex((l) => l.id === lessonId) + 1;
}

/** Herramientas Cursor generales — panel de referencia */
export const cursorToolsGuide = [
  {
    id: 'agent',
    name: 'Agent (Cmd+I / Ctrl+I)',
    icon: '🤖',
    desc: 'Modo principal: Cursor lee tu proyecto, edita archivos y corre comandos. Úsalo en cada lección con el prompt copiado.',
  },
  {
    id: 'rules',
    name: 'Project Rules',
    icon: '📋',
    desc: 'Archivos en .cursor/rules/ que Cursor lee siempre. Ya incluimos prep-mx-implementacion.mdc para seguir el curso.',
  },
  {
    id: 'plan',
    name: 'Plan mode',
    icon: '🗺️',
    desc: 'Antes de lecciones grandes (Stripe, IA, exam submit): diseña el plan contigo sin tocar código hasta que apruebes.',
  },
  {
    id: 'docs',
    name: '@docs y @web',
    icon: '📚',
    desc: 'En el chat escribe @docs Clerk o @web para documentación actualizada sin salir de Cursor.',
  },
  {
    id: 'context',
    name: '@archivos',
    icon: '📎',
    desc: 'Menciona @src/lib/sm2.ts o carpetas enteras para que Cursor no invente código que ya existe.',
  },
  {
    id: 'skills',
    name: 'Agent Skills',
    icon: '⚡',
    desc: 'Instrucciones reutilizables en ~/.cursor/skills-cursor/. Puedes crear una skill “PrepMX lección X” por módulo.',
  },
  {
    id: 'composer',
    name: 'Composer / Multi-file',
    icon: '✏️',
    desc: 'Edita varios archivos a la vez — ideal para API + componente + tipos en una lección.',
  },
  {
    id: 'terminal',
    name: 'Terminal integrada',
    icon: '💻',
    desc: 'npm run dev:clean, scripts de seed, Stripe CLI. El agente puede ejecutarla por ti.',
  },
  {
    id: 'gh',
    name: 'GitHub (gh) + Desktop',
    icon: '🐙',
    desc: 'Sube cambios a develop. GitHub Desktop si prefieres UI; gh pr create desde Cursor si usas CLI.',
  },
  {
    id: 'browser',
    name: 'Browser MCP',
    icon: '🌐',
    desc: 'El agente abre localhost:3000, hace clic y verifica que la lección funcionó visualmente.',
  },
];
