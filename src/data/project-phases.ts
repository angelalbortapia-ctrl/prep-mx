export type PhaseStatus = 'completado' | 'en_progreso' | 'pendiente';

export type TaskPriority = 'critica' | 'alta' | 'normal';

export interface PhaseTask {
  id: string;
  label: string;
  status: PhaseStatus;
  /** Qué es esto, en palabras simples */
  what: string;
  /** Por qué lo necesitas */
  why: string;
  /** Qué hacer ahora (solo pendientes/en curso) */
  action?: string;
  priority?: TaskPriority;
}

export interface ProjectPhase {
  id: string;
  title: string;
  weeks: string;
  objective: string;
  /** Explicación sencilla de toda la fase */
  what: string;
  why: string;
  status: PhaseStatus;
  tasks: PhaseTask[];
}

export const projectPhases: ProjectPhase[] = [
  {
    id: 'paso-1',
    title: 'Paso 1 — Fundación',
    weeks: 'Semanas 1–3',
    objective: 'Infraestructura, registro y banco de preguntas inicial.',
    what: 'Es la base de la casa: el código, las pantallas y la base de datos donde vivirá todo.',
    why: 'Sin esto no hay producto que mostrar ni lugar donde guardar alumnos, preguntas ni progreso.',
    status: 'en_progreso',
    tasks: [
      {
        id: '1-1',
        label: 'Repositorio GitHub + ramas main/develop',
        status: 'completado',
        what: 'Un “cajón” en la nube (GitHub) donde vive todo el código del proyecto, con dos copias: main (lo estable) y develop (donde experimentas).',
        why: 'Así no pierdes trabajo, puedes volver atrás si algo falla y trabajar ordenado como un equipo real.',
      },
      {
        id: '1-2',
        label: 'Next.js 14 + Tailwind + Shadcn/ui',
        status: 'completado',
        what: 'Las herramientas para construir la web: Next.js arma las páginas, Tailwind el diseño y Shadcn los botones/tarjetas bonitos.',
        why: 'Van juntas en el mercado EdTech: rápidas, modernas y te permiten iterar sin reinventar cada botón.',
      },
      {
        id: '1-3',
        label: 'Landing + rutas marketing y dashboard',
        status: 'completado',
        what: 'Las páginas públicas (inicio, precios, simulador gratis) y las privadas del alumno (dashboard, simulacros, perfil).',
        why: 'El alumno necesita una puerta de entrada atractiva y, después de registrarse, un espacio propio para estudiar.',
      },
      {
        id: '1-4',
        label: 'Componentes simulador (QuestionCard, Timer, MathRenderer)',
        status: 'completado',
        what: 'Piezas reutilizables del examen: tarjeta de pregunta, cronómetro y visor de fórmulas matemáticas (LaTeX).',
        why: 'El simulador es el corazón del producto; estas piezas hacen que se sienta como un examen real de verdad.',
      },
      {
        id: '1-4b',
        label: 'Onboarding + precios + dashboard completo (UI demo)',
        status: 'completado',
        what: 'Flujo de bienvenida (universidad, área, fecha de examen), página de planes y panel del alumno con widgets de ejemplo.',
        why: 'Puedes mostrar el producto completo a inversionistas o beta testers aunque el backend aún no esté conectado.',
      },
      {
        id: '1-5',
        label: 'Migración SQL + clients Supabase en código',
        status: 'completado',
        what: 'El “plano” de la base de datos (tablas de usuarios, preguntas, progreso) ya escrito en un archivo SQL, más el código para hablar con Supabase.',
        why: 'Cuando actives Supabase en la nube, solo pegas ese plano y la app ya sabe qué tablas usar.',
      },
      {
        id: '1-5b',
        label: 'Conectar Supabase (proyecto en la nube + .env.local)',
        status: 'pendiente',
        priority: 'critica',
        what: 'Crear tu cuenta/proyecto en Supabase (PostgreSQL en la nube) y pegar las llaves secretas en un archivo `.env.local` en tu computadora.',
        why: 'Hoy la app es solo maqueta: las respuestas no se guardan. Con Supabase cada alumno tiene historial real y las preguntas viven en un solo lugar.',
        action: 'Entra a supabase.com → Nuevo proyecto → SQL Editor → pega el archivo `supabase/migrations/001_initial.sql` → copia URL y keys a `.env.local`.',
      },
      {
        id: '1-6',
        label: 'Clerk — autenticación real de alumnos',
        status: 'pendiente',
        priority: 'critica',
        what: 'Clerk es el servicio que maneja “iniciar sesión” y “crear cuenta” de forma segura (Google, email, etc.) sin programar seguridad desde cero.',
        why: 'Sin login real cualquiera entra al dashboard y no sabes quién es quién. Clerk también cumple buenas prácticas de contraseñas y sesiones.',
        action: 'Crea app en dashboard.clerk.com → copia las keys a `.env.local` → reemplaza las páginas demo de sign-in/sign-up.',
      },
      {
        id: '1-7',
        label: '200 preguntas iniciales en BD',
        status: 'pendiente',
        priority: 'alta',
        what: 'Subir un banco mínimo de 200 preguntas reales (por materia y dificultad) a la tabla `questions` en Supabase.',
        why: 'Con 20 preguntas demo el simulador se repite enseguida. Para vender necesitas volumen y variedad como un curso de prepa serio.',
        action: 'Prepara un CSV o JSON con preguntas → importa a Supabase (o script de carga) → verifica que el simulador las jale de la BD.',
      },
      {
        id: '1-8',
        label: 'Deploy Vercel + Sentry + Cloudflare',
        status: 'pendiente',
        priority: 'normal',
        what: 'Publicar la web en internet (Vercel), vigilar errores (Sentry) y proteger/acelerar con Cloudflare (DNS, caché, DDoS).',
        why: 'localhost:3000 solo lo ves tú. Para alumnos reales necesitas URL pública, monitoreo si algo truena y sitio rápido en México.',
        action: 'Conecta el repo a vercel.com → agrega variables de entorno → configura dominio → activa Sentry y Cloudflare.',
      },
    ],
  },
  {
    id: 'paso-2',
    title: 'Paso 2 — Simulador y AI',
    weeks: 'Semanas 4–7',
    objective: 'Simulacros con diagnóstico IA y tutor 24/7.',
    what: 'Hacer que el simulador “piense”: guarde resultados, diga qué fallaste y te explique con inteligencia artificial.',
    why: 'Este es el diferenciador vs. libros y PDFs: feedback personalizado al instante, no solo calificar con ✅ o ❌.',
    status: 'pendiente',
    tasks: [
      {
        id: '2-1',
        label: 'Flujo simulacro → POST /api/exams/submit → Inngest',
        status: 'pendiente',
        priority: 'alta',
        what: 'Cuando el alumno termina el examen, la app manda las respuestas al servidor. Inngest procesa eso en segundo plano (como una fila de tareas) sin congelar la pantalla.',
        why: 'Calificar 120 preguntas + llamar a la IA puede tardar. Si lo haces en background, el alumno ve “estamos analizando…” y no una página colgada.',
        action: 'Crear ruta `/api/exams/submit` → conectar Inngest → guardar intento en Supabase → disparar job de diagnóstico.',
      },
      {
        id: '2-2',
        label: 'Algoritmo SM-2 (src/lib/sm2.ts)',
        status: 'completado',
        what: 'Una fórmula matemática que decide cuándo volver a mostrarle al alumno un tema que falló (mañana, en 3 días, en una semana…).',
        why: 'Repetir todo cada día aburre; no repetir nunca hace que olviden. SM-2 es el estándar de apps como Anki para repaso inteligente.',
      },
      {
        id: '2-2b',
        label: 'SM-2 conectado a user_progress en BD',
        status: 'pendiente',
        priority: 'alta',
        what: 'Guardar en Supabase, por cada tema, cuándo toca repasarlo otra vez (`next_review_at`, facilidad, intervalo).',
        why: 'El código SM-2 ya existe pero hoy no recuerda nada entre sesiones. Conectado, el plan de estudio se adapta solo al alumno.',
        action: 'Tras cada respuesta correcta/incorrecta, actualizar fila en `user_progress` con la fecha del próximo repaso.',
      },
      {
        id: '2-3',
        label: 'AI Tutor seguro (/api/ai-tutor)',
        status: 'pendiente',
        priority: 'alta',
        what: 'Un botón “Explícame” que manda solo el ID de la pregunta al servidor; el servidor arma el prompt y OpenAI responde sin que el alumno pueda hackear el prompt.',
        why: 'Si el alumno escribe libremente a ChatGPT puede hacer trampa o gastar tokens infinitos. Tú controlas qué se pregunta y cuánto cuesta.',
        action: 'Crear `/api/ai-tutor` → leer pregunta de Supabase → prompt fijo → devolver explicación → poner `OPENAI_API_KEY` en `.env.local`.',
      },
      {
        id: '2-3b',
        label: 'Diagnóstico post-examen con IA real',
        status: 'pendiente',
        priority: 'alta',
        what: 'Después del simulacro, un reporte que dice “fallaste mucho en Química orgánica” con resumen y ejercicios sugeridos generados por IA.',
        why: 'Es la promesa del landing: “deja de estudiar a ciegas”. Sin esto solo das un puntaje, no un plan de ataque.',
        action: 'Job Inngest agrupa errores por tema → prompt a OpenAI → guarda en `ai_feedback` → redirige a `/dashboard/diagnostico/[id]`.',
      },
      {
        id: '2-4',
        label: 'Multi-LLM + caché semántico',
        status: 'pendiente',
        priority: 'normal',
        what: 'Poder usar OpenAI o Claude según costo/calidad, y guardar respuestas parecidas para no pagar dos veces la misma explicación.',
        why: 'A escala, la IA es tu mayor gasto variable. Caché + elegir modelo barato para tareas simples puede bajar la factura 40–60%.',
      },
      {
        id: '2-5',
        label: 'Planificador adaptativo (calendario + IA)',
        status: 'en_progreso',
        priority: 'alta',
        what: 'Un calendario que reparte temas día a día hasta la fecha del examen, generado según universidad, área y días disponibles.',
        why: 'El alumno no sabe por dónde empezar. Un plan con fechas concretas reduce ansiedad y aumenta retención (siguen entrando).',
        action: 'La pantalla `/dashboard/plan` ya se ve bien; falta guardar el plan en `study_plans` y generarlo con un prompt backend real.',
      },
      {
        id: '2-6',
        label: 'Notificaciones tiempo real (Pusher/WebSocket)',
        status: 'pendiente',
        priority: 'normal',
        what: 'Avisar al navegador al instante cuando el diagnóstico IA terminó, sin que el alumno tenga que refrescar la página.',
        why: 'Mejor experiencia: termina examen → “Analizando…” → ping → “¡Tu diagnóstico está listo!” como Uber Eats cuando llega el pedido.',
      },
    ],
  },
  {
    id: 'paso-3',
    title: 'Paso 3 — Monetización',
    weeks: 'Semanas 8–10',
    objective: 'Ingresos reales con Stripe, LFPD y admin.',
    what: 'Convertir visitantes en clientes que pagan, cumpliendo la ley mexicana de datos personales.',
    why: 'Un producto gratis no paga servidores ni tu tiempo. Aquí empieza el negocio de verdad.',
    status: 'pendiente',
    tasks: [
      {
        id: '3-1',
        label: 'Stripe (tarjeta, OXXO, SPEI)',
        status: 'pendiente',
        priority: 'alta',
        what: 'Stripe cobra en línea: tarjeta de crédito/débito, referencia OXXO y transferencia SPEI — métodos que usan los estudiantes en México.',
        why: 'Sin cobro integrado tendrías que cobrar por transferencia manual (caos). Stripe automatiza suscripciones y te dice quién pagó.',
        action: 'Cuenta Stripe México → productos/precios → checkout en `/precios` → webhook para activar plan premium en Supabase.',
      },
      {
        id: '3-2',
        label: 'Aviso de privacidad LFPD (contenido legal)',
        status: 'en_progreso',
        priority: 'alta',
        what: 'Texto legal que explica qué datos recoges (email, progreso, pagos), para qué los usas y cómo ejercer derechos ARCO.',
        why: 'En México la LFPD obliga a tener aviso de privacidad si guardas datos personales. Sin él hay riesgo legal y desconfianza de padres.',
        action: 'Redactar o contratar texto LFPD → publicar en `/aviso-de-privacidad` → enlazarlo en registro y checkout.',
      },
      {
        id: '3-3',
        label: 'Facturapi CFDI 4.0',
        status: 'pendiente',
        priority: 'normal',
        what: 'Servicio que emite facturas electrónicas válidas ante el SAT cuando alguien paga (CFDI 4.0).',
        why: 'Empresas, prepas y padres a veces piden factura. Sin CFDI pierdes ventas B2B y no das imagen profesional.',
      },
      {
        id: '3-4',
        label: 'Admin métricas (MRR, DAU, conversión)',
        status: 'pendiente',
        priority: 'normal',
        what: 'Panel con números clave: ingresos mensuales recurrentes (MRR), usuarios activos al día (DAU) y % que pasa de gratis a premium.',
        why: 'Lo que no se mide no se mejora. Estos tres números te dicen si el producto crece y si el precio funciona.',
        action: 'Conectar Stripe + Supabase → calcular MRR/DAU → mostrar en `/admin` en lugar de ceros de demo.',
      },
    ],
  },
  {
    id: 'paso-4',
    title: 'Paso 4 — Escala',
    weeks: 'Semanas 11–16',
    objective: 'App móvil, gamificación y B2B.',
    what: 'Salir del navegador: app en el celular, juego/competencia entre alumnos y panel para papás o profesores.',
    why: 'Los aspirantes viven en el celular. Gamificación y visibilidad para papás aumentan uso diario y ventas.',
    status: 'pendiente',
    tasks: [
      {
        id: '4-1',
        label: 'Capacitor iOS/Android',
        status: 'pendiente',
        what: 'Capacitor “empaqueta” tu web Next.js como app instalable en iPhone y Android sin reescribir todo en otro lenguaje.',
        why: 'Notificaciones push, icono en home screen y sensación de app nativa — donde compites con Duolingo y similares.',
      },
      {
        id: '4-2',
        label: 'Gamificación (insignias, rachas, leaderboard)',
        status: 'en_progreso',
        what: 'Medallas por logros, contador de días seguidos estudiando y tabla de posiciones entre alumnos.',
        why: 'La dopamina de “racha de 7 días” o “subiste al top 10” hace que vuelvan mañana sin que tú les mandes emails.',
        action: 'Widgets demo ya en dashboard; falta guardar XP/rachas en Supabase y reglas de cuándo ganas insignias.',
      },
      {
        id: '4-3',
        label: 'Dashboard tutor/papás',
        status: 'pendiente',
        what: 'Vista read-only para que un padre o profesor vea progreso del alumno: temas débiles, horas estudiadas, simulacros hechos.',
        why: 'Muchas compras las decide el papá. Si ve avance claro, renueva la suscripción y recomienda a otros.',
      },
      {
        id: '4-4',
        label: 'Publicación App Store / Google Play',
        status: 'pendiente',
        what: 'Pasos finales: cuenta de desarrollador Apple/Google, screenshots, revisión de stores y publicación.',
        why: 'Estar en las tiendas da credibilidad (“app oficial”) y descubrimiento orgánico cuando buscan “simulador UNAM”.',
      },
    ],
  },
];

export function getProjectStats(phases: ProjectPhase[]) {
  const allTasks = phases.flatMap((p) => p.tasks);
  const done = allTasks.filter((t) => t.status === 'completado').length;
  const inProgress = allTasks.filter((t) => t.status === 'en_progreso').length;
  const pending = allTasks.filter((t) => t.status === 'pendiente').length;
  const total = allTasks.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return { done, inProgress, pending, total, pct };
}

export function getPhaseStats(phase: ProjectPhase) {
  const done = phase.tasks.filter((t) => t.status === 'completado').length;
  const total = phase.tasks.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return { done, total, pct };
}

export function getPendingTasks(phases: ProjectPhase[]) {
  return phases.flatMap((phase) =>
    phase.tasks
      .filter((t) => t.status === 'pendiente' || t.status === 'en_progreso')
      .map((task) => ({ ...task, phaseId: phase.id, phaseTitle: phase.title }))
  );
}

export function getCompletedTasks(phases: ProjectPhase[]) {
  return phases.flatMap((phase) =>
    phase.tasks
      .filter((t) => t.status === 'completado')
      .map((task) => ({ ...task, phaseId: phase.id, phaseTitle: phase.title }))
  );
}

const priorityOrder: Record<TaskPriority, number> = {
  critica: 0,
  alta: 1,
  normal: 2,
};

export function getAdminPriorities(phases: ProjectPhase[]) {
  return getPendingTasks(phases).sort((a, b) => {
    const pa = priorityOrder[a.priority ?? 'normal'];
    const pb = priorityOrder[b.priority ?? 'normal'];
    if (pa !== pb) return pa - pb;
    if (a.status === 'en_progreso' && b.status !== 'en_progreso') return -1;
    if (b.status === 'en_progreso' && a.status !== 'en_progreso') return 1;
    return 0;
  });
}

export function getCurrentPhase(phases: ProjectPhase[]) {
  return phases.find((p) => p.status === 'en_progreso') ?? phases[0];
}
