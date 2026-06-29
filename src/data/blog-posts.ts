export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  universidad: 'unam' | 'ipn' | 'uam' | 'general';
  publishedAt: string;
  readMinutes: number;
  tags: string[];
  body: string;
  /** Componente interactivo embebido (SEO + engagement). */
  interactive?: 'sm2-timeline';
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'memorizar-pdfs-unam-repeticion-espaciada-100-aciertos',
    title:
      'Por qué memorizar guías en PDF no sirve para la UNAM (y cómo la Repetición Espaciada te asegura +100 aciertos)',
    description:
      'El examen UNAM no premia leer 300 páginas: premia recordar bajo presión. Te explicamos la ciencia del SM-2 y cómo PrepMX programa tus repasos como Anki, pero con reactivos reales.',
    universidad: 'unam',
    publishedAt: '2026-06-20',
    readMinutes: 9,
    tags: [
      'UNAM',
      'repetición espaciada',
      'SM-2',
      'examen de admisión',
      'memorizar PDF',
      'simulador UNAM',
      'aciertos UNAM',
    ],
    featured: true,
    interactive: 'sm2-timeline',
    body: `## El mito del PDF de 400 páginas

Cada año miles de aspirantes descargan guías, apuntes y "resúmenes definitivos" de Telegram. Las subrayan, las releen, las imprimen… y el día del examen **no recuerdan** el reactivo exacto que ya habían visto.

No es falta de inteligencia. Es **mala estrategia de memoria**.

El examen de admisión a la UNAM no evalúa si leíste el temario completo: evalúa si puedes **resolver reactivos bajo tiempo**. Eso es retrieval practice — sacar la respuesta de tu memoria, no reconocerla en un PDF abierto.

## Por qué releer no es estudiar

La psicología cognitiva lo llama *ilusión de competencia*: al releer sientes que ya dominas el tema porque el material te resulta familiar. Pero la familiaridad no es recuerdo.

Lo que sí funciona (decenas de meta-análisis lo confirman) es la **repetición espaciada**: volver a practicar justo antes de que tu cerebro olvide, con intervalos que crecen si aciertas y se acortan si fallas.

Ese es el principio detrás de Anki, SuperMemo y del algoritmo **SM-2** que usa PrepMX en \`src/lib/sm2.ts\`.

## Qué hace SM-2 en PrepMX (sin humo)

Cuando terminas un simulacro, cada pregunta que fallas se guarda con tres números:

1. **Intervalo** — cuántos días hasta el próximo repaso.
2. **Facilidad** — qué tan "fácil" es el tema para ti.
3. **Calidad de respuesta** — de 0 (blackout) a 5 (perfecto).

La función \`calcularProximaRevision()\` actualiza esos valores. Si fallas, repasas mañana. Si aciertas bien, el intervalo salta a 6 días, luego semanas. **No decides tú cuándo repasar: el algoritmo sí.**

Eso es lo que expone tu API \`/api/study/sm2-summary\` en el dashboard: cuántas tarjetas vencen hoy, mañana y cuál es el próximo tema.

## Ejemplo real: una pregunta de Química

Imagina que fallas en número de oxidación del oxígeno en H₂O₂. Sin sistema:

- La vuelves a ver una vez en el PDF.
- La olvidas en 5 días.
- El día del examen la confundes con −2 (error clásico).

Con PrepMX + SM-2:

- **Día 0:** fallo en simulacro → repaso programado mañana.
- **Día 1:** aciertas → siguiente repaso en 6 días.
- **Día 7:** aciertas de nuevo → intervalo ~15 días.
- **3 días antes del examen:** notificación: "Te toca Química · Número de oxidación".

Llegas al salón con la pregunta **consolidada**, no con 400 páginas en la cabeza.

Prueba la simulación interactiva arriba: usa el mismo algoritmo que producción.

## PDF vs simulacro + SM-2: la comparación honesta

| Estrategia | Esfuerzo | Retención a 30 días | Útil día del examen |
| --- | --- | --- | --- |
| Leer PDF una vez | Alto | Baja (~20%) | ❌ |
| Resumir a mano | Alto | Media | ⚠️ |
| Simulacros sin repaso | Medio | Media-baja | ⚠️ |
| Simulacro + SM-2 | Medio | Alta (~80%+) | ✅ |

La meta de +100 aciertos en UNAM no es memorizar más: es **no regalar puntos** por olvido. Cada reactivo que recuperas por repaso espaciado es un acierto que no depende de suerte.

## "¿No es lo mismo que Anki?"

Anki es excelente para tarjetas genéricas. PrepMX está hecho para el **ecosistema UNAM / IPN / UAM**:

- Banco de preguntas tipo examen real.
- Cronómetro y presión de tiempo.
- Diagnóstico gratis de 10 preguntas sin tarjeta.
- SM-2 sincronizado en Supabase cuando creas cuenta.

No necesitas importar decks ni formatear LaTeX: el simulador ya es tu deck.

## Cómo empezar hoy (gratis)

1. Haz el **diagnóstico de 10 preguntas** en el simulador gratis.
2. Crea cuenta para guardar errores y activar SM-2.
3. Revisa el widget "Próximo repaso SM-2" en tu dashboard — ahí ves cuántas preguntas vencen mañana.

Deja el PDF como referencia. Tu ventaja competitiva es **practicar lo correcto en el momento correcto**.

## Preguntas frecuentes

### ¿Funciona si me falta poco para el examen?

Sí, pero los intervalos se comprimen. SM-2 prioriza lo que más fallas; mejor 3 semanas de repaso inteligente que 3 meses de lectura pasiva.

### ¿Necesito pagar para usar SM-2?

El diagnóstico es gratis. El historial completo y repasos ilimitados van con el Plan Pro — porque requieren guardar tu progreso en la nube.

### ¿Es ciencia real o marketing?

SM-2 viene del paper de Wozniak (1990). PrepMX implementa la fórmula en TypeScript, auditable en el repo. La demo de esta página llama a esa misma función.`,
  },
  {
    slug: 'convocatoria-unam-2026-fechas-clave',
    title: 'Convocatoria UNAM 2026: fechas clave y cómo prepararte',
    description:
      'Calendario orientativo del examen de admisión UNAM, áreas académicas y estrategia de estudio con simulacros.',
    universidad: 'unam',
    publishedAt: '2026-01-15',
    readMinutes: 6,
    tags: ['UNAM', 'convocatoria', 'examen de admisión'],
    body: `## ¿Cuándo es el examen UNAM?

La convocatoria de ingreso a la UNAM se publica cada año en el portal oficial. Revisa siempre **dgae.unam.mx** para fechas definitivas de registro, aplicación del examen y resultados.

## Áreas del examen

El examen de nivel superior evalúa competencias en varias áreas según tu carrera: matemáticas, física, química, biología, humanidades y más. No todas las carreras piden las mismas materias.

## Cómo prepararte sin estudiar a ciegas

1. Haz un **diagnóstico de 10 preguntas** para ubicar debilidades reales.
2. Simula bajo presión con cronómetro (como en PrepMX).
3. Repasa con **repetición espaciada (SM-2)** lo que fallas — no todo el temario cada semana.

## PrepMX y tu plan

Con PrepMX guardas cada intento, ves en qué materia fallas y el algoritmo SM-2 te dice **cuándo** volver a repasar cada tema antes del examen real.`,
  },
  {
    slug: 'examen-admision-ipn-2026-guia',
    title: 'Examen de admisión IPN 2026: guía para aspirantes',
    description:
      'Qué evalúa el IPN, diferencias por carrera y cómo usar simulacros para subir tu puntaje.',
    universidad: 'ipn',
    publishedAt: '2026-01-20',
    readMinutes: 7,
    tags: ['IPN', 'COMIPEMS', 'ingeniería'],
    body: `## El examen del IPN

El Instituto Politécnico Nacional evalúa matemáticas, física, química, español e inglés según el tipo de bachillerato y carrera. El volumen de reactivos es alto: necesitas velocidad y precisión.

## Error común: solo leer apuntes

Leer no basta. El IPN premia resolver reactivos bajo tiempo. Practica con:

- Simulacros cronometrados
- Análisis de errores por tema
- Repaso programado (no cramming la noche anterior)

## Tráfico orgánico = convocatoria + práctica

Si buscas "examen admisión IPN 2026" o "simulador IPN gratis", lo que necesitas es **práctica real** con feedback. Ese es el embudo de PrepMX: diagnóstico gratis → plan con SM-2 → simulacros completos.`,
  },
  {
    slug: 'uam-examen-ubicacion-2026',
    title: 'Examen de ubicación UAM: qué esperar en 2026',
    description:
      'Estructura del examen UAM, divisiones académicas y tips para el día del examen.',
    universidad: 'uam',
    publishedAt: '2026-02-01',
    readMinutes: 5,
    tags: ['UAM', 'examen de ubicación', 'CDMX'],
    body: `## Examen de ubicación UAM

La UAM aplica un examen de ubicación que mide conocimientos de bachillerato según la división a la que aspiras. Las materias y el peso relativo varían.

## División y carrera

Antes de estudiar, confirma tu división (CSH, CBS, CADyC, etc.) y el temario oficial de esa unidad.

## PrepMX para UAM

En PrepMX puedes filtrar por universidad UAM, hacer un diagnóstico corto sin registro y, al crear cuenta, guardar tu historial con repaso SM-2 para no olvidar lo que ya dominaste.`,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogPostsByUni(uni?: BlogPost['universidad']): BlogPost[] {
  if (!uni || uni === 'general') {
    return [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }
  return blogPosts
    .filter((p) => p.universidad === uni || p.universidad === 'general')
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
