import type { OpcionId, QuestionOption } from '@/types/question';

/**
 * Pregunta de retención para el mini-quiz al final de cada guía.
 *
 * Reutiliza la forma de `Question` (id, pregunta, opciones, opcion_correcta,
 * explicacion) y añade `anchorId`, que apunta al `id` de un encabezado dentro
 * del Markdown de la guía para poder hacer scroll a la teoría del concepto fallado.
 */
export interface QuizQuestion {
  id: string;
  pregunta: string;
  opciones: QuestionOption[];
  opcion_correcta: OpcionId;
  explicacion: string;
  /** `id` de un heading dentro del contenido Markdown para "Revisar teoría". */
  anchorId: string;
}

export interface StudyGuide {
  slug: string;
  titulo: string;
  /** Etiqueta legible de la materia (p. ej. "Matemáticas"). */
  materia: string;
  /** Tiempo estimado de lectura en minutos. */
  tiempoLecturaMin: number;
  /** Resumen corto para meta/preview. */
  resumen: string;
  /** Contenido principal en Markdown (con math, blockquotes y tips). */
  contenido: string;
  /** Tres preguntas de alta prioridad sobre el tema. */
  quiz: [QuizQuestion, QuizQuestion, QuizQuestion];
}

const matematicas: StudyGuide = {
  slug: 'matematicas',
  titulo: 'Funciones cuadráticas y la fórmula general',
  materia: 'Matemáticas',
  tiempoLecturaMin: 8,
  resumen:
    'Domina la ecuación cuadrática: discriminante, fórmula general y cómo evitar las trampas más comunes del examen.',
  contenido: `## Introducción {#intro}

Una **ecuación cuadrática** tiene la forma $ax^2 + bx + c = 0$, con $a \\neq 0$. Resolverla significa encontrar los valores de $x$ que la hacen verdadera.

> Si $a = 0$ la ecuación deja de ser cuadrática y se vuelve lineal. Los examinadores adoran esconder un $a = 0$ para invalidar la fórmula general.

## El discriminante {#discriminante}

El **discriminante** $\\Delta = b^2 - 4ac$ decide cuántas soluciones reales existen:

- $\\Delta > 0$: dos raíces reales distintas.
- $\\Delta = 0$: una raíz real doble.
- $\\Delta < 0$: ninguna raíz real (dos complejas).

\`\`\`
Calcula SIEMPRE el discriminante antes de aplicar la fórmula: te dice qué esperar y evita errores con raíces negativas.
\`\`\`

## La fórmula general {#formula-general}

La solución se obtiene con la fórmula general:

$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

El signo $\\pm$ produce las dos raíces. Sustituye con cuidado los signos de $a$, $b$ y $c$.

> El error más caro es olvidar el signo negativo de $-b$. Si $b = -6$, entonces $-b = 6$, no $-6$.

## Vértice y forma canónica {#vertice}

El vértice de la parábola $y = ax^2 + bx + c$ está en $x = -\\frac{b}{2a}$. Esto te da el máximo o mínimo de la función sin derivar.

\`\`\`
Tip: el eje de simetría pasa exactamente por el vértice, así que las dos raíces son simétricas respecto a x = -b/2a.
\`\`\`
`,
  quiz: [
    {
      id: 'mat-q1',
      pregunta: '¿Cuál es el discriminante de $2x^2 - 4x + 1 = 0$?',
      opciones: [
        { id: 'A', texto: '$8$' },
        { id: 'B', texto: '$-8$' },
        { id: 'C', texto: '$24$' },
        { id: 'D', texto: '$0$' },
      ],
      opcion_correcta: 'A',
      explicacion:
        '$\\Delta = b^2 - 4ac = (-4)^2 - 4(2)(1) = 16 - 8 = 8$. Al ser positivo hay dos raíces reales distintas.',
      anchorId: 'discriminante',
    },
    {
      id: 'mat-q2',
      pregunta: 'En $x^2 - 6x + 9 = 0$, al aplicar la fórmula general, ¿cuánto vale $-b$?',
      opciones: [
        { id: 'A', texto: '$-6$' },
        { id: 'B', texto: '$6$' },
        { id: 'C', texto: '$9$' },
        { id: 'D', texto: '$-9$' },
      ],
      opcion_correcta: 'B',
      explicacion: 'Como $b = -6$, entonces $-b = 6$. Olvidar este cambio de signo es el error clásico.',
      anchorId: 'formula-general',
    },
    {
      id: 'mat-q3',
      pregunta: '¿En qué valor de $x$ se encuentra el vértice de $y = x^2 - 8x + 3$?',
      opciones: [
        { id: 'A', texto: '$x = 8$' },
        { id: 'B', texto: '$x = -4$' },
        { id: 'C', texto: '$x = 4$' },
        { id: 'D', texto: '$x = 3$' },
      ],
      opcion_correcta: 'C',
      explicacion: 'El vértice está en $x = -\\frac{b}{2a} = -\\frac{-8}{2(1)} = 4$.',
      anchorId: 'vertice',
    },
  ],
};

const fisica: StudyGuide = {
  slug: 'fisica',
  titulo: 'Cinemática: movimiento rectilíneo uniformemente acelerado',
  materia: 'Física',
  tiempoLecturaMin: 7,
  resumen:
    'Las ecuaciones del MRUA, el papel de la aceleración y los errores de unidades que cuestan puntos en el examen.',
  contenido: `## ¿Qué es el MRUA? {#intro}

El **Movimiento Rectilíneo Uniformemente Acelerado (MRUA)** describe a un objeto que se mueve en línea recta con aceleración $a$ constante.

> Cuidado: "velocidad constante" y "aceleración constante" no son lo mismo. Si la aceleración es constante pero distinta de cero, la velocidad cambia todo el tiempo.

## Ecuaciones fundamentales {#ecuaciones}

La posición en función del tiempo es:

$$x(t) = x_0 + v_0 t + \\tfrac{1}{2} a t^2$$

Y la velocidad evoluciona de forma lineal: $v(t) = v_0 + a t$.

\`\`\`
Apunta los datos con sus unidades antes de sustituir: convierte km/h a m/s dividiendo entre 3.6.
\`\`\`

## Caída libre {#caida-libre}

La caída libre es un MRUA con $a = g \\approx 9.8\\,\\text{m/s}^2$ dirigida hacia abajo.

> Trampa frecuente: tomar $g = 10$ cuando el examen pide $9.8$ (o viceversa). Lee siempre el valor que te dan en el enunciado.

## Relación velocidad-posición {#torricelli}

Cuando no conoces el tiempo, usa la ecuación de Torricelli:

$$v^2 = v_0^2 + 2a\\,\\Delta x$$

\`\`\`
Tip: esta ecuación es tu atajo cuando el problema no menciona el tiempo en ninguna parte.
\`\`\`
`,
  quiz: [
    {
      id: 'fis-q1',
      pregunta: 'Un auto parte del reposo con $a = 2\\,\\text{m/s}^2$. ¿Qué velocidad tiene a los $5\\,\\text{s}$?',
      opciones: [
        { id: 'A', texto: '$5\\,\\text{m/s}$' },
        { id: 'B', texto: '$10\\,\\text{m/s}$' },
        { id: 'C', texto: '$25\\,\\text{m/s}$' },
        { id: 'D', texto: '$2\\,\\text{m/s}$' },
      ],
      opcion_correcta: 'B',
      explicacion: '$v = v_0 + a t = 0 + 2(5) = 10\\,\\text{m/s}$.',
      anchorId: 'ecuaciones',
    },
    {
      id: 'fis-q2',
      pregunta: 'En caída libre desde el reposo, ¿qué velocidad lleva un objeto tras $2\\,\\text{s}$ usando $g = 9.8\\,\\text{m/s}^2$?',
      opciones: [
        { id: 'A', texto: '$9.8\\,\\text{m/s}$' },
        { id: 'B', texto: '$4.9\\,\\text{m/s}$' },
        { id: 'C', texto: '$19.6\\,\\text{m/s}$' },
        { id: 'D', texto: '$20\\,\\text{m/s}$' },
      ],
      opcion_correcta: 'C',
      explicacion: '$v = g t = 9.8 \\times 2 = 19.6\\,\\text{m/s}$. Usar $g = 10$ daría $20$, el distractor de la trampa.',
      anchorId: 'caida-libre',
    },
    {
      id: 'fis-q3',
      pregunta: '¿Qué ecuación conviene si te piden la velocidad final y NO mencionan el tiempo?',
      opciones: [
        { id: 'A', texto: '$v = v_0 + at$' },
        { id: 'B', texto: '$x = x_0 + v_0 t$' },
        { id: 'C', texto: '$v^2 = v_0^2 + 2a\\,\\Delta x$' },
        { id: 'D', texto: '$a = \\Delta v / \\Delta t$' },
      ],
      opcion_correcta: 'C',
      explicacion: 'La ecuación de Torricelli relaciona velocidad y posición sin necesitar el tiempo.',
      anchorId: 'torricelli',
    },
  ],
};

const quimica: StudyGuide = {
  slug: 'quimica',
  titulo: 'El mol y la estequiometría básica',
  materia: 'Química',
  tiempoLecturaMin: 9,
  resumen:
    'El concepto de mol, el número de Avogadro y cómo balancear reacciones sin perder puntos por unidades.',
  contenido: `## El concepto de mol {#intro}

Un **mol** es la cantidad de sustancia que contiene tantas entidades como átomos hay en $12\\,\\text{g}$ de carbono-12.

> No confundas "mol" con "molécula". Un mol son $6.022 \\times 10^{23}$ entidades; una molécula es solo una.

## Número de Avogadro {#avogadro}

El número de Avogadro relaciona la cantidad de sustancia con el número de partículas:

$$N = n \\cdot N_A, \\quad N_A = 6.022 \\times 10^{23}\\,\\text{mol}^{-1}$$

\`\`\`
Para pasar de gramos a moles divide entre la masa molar: n = m / M.
\`\`\`

## Masa molar {#masa-molar}

La masa molar $M$ (en g/mol) es numéricamente igual a la masa atómica/molecular. Por ejemplo, el agua $H_2O$ tiene $M \\approx 18\\,\\text{g/mol}$.

> Trampa: sumar mal los subíndices. En $H_2O$ hay dos hidrógenos, no uno: $2(1) + 16 = 18$.

## Balanceo de reacciones {#balanceo}

Una reacción balanceada conserva los átomos de cada elemento. Por ejemplo:

$$2H_2 + O_2 \\rightarrow 2H_2O$$

\`\`\`
Tip: ajusta primero metales, luego no metales, después hidrógeno y al final oxígeno (regla "MNHO").
\`\`\`
`,
  quiz: [
    {
      id: 'qui-q1',
      pregunta: '¿Cuántas entidades hay en un mol de cualquier sustancia?',
      opciones: [
        { id: 'A', texto: '$6.022 \\times 10^{23}$' },
        { id: 'B', texto: '$1 \\times 10^{6}$' },
        { id: 'C', texto: '$18$' },
        { id: 'D', texto: '$12$' },
      ],
      opcion_correcta: 'A',
      explicacion: 'Un mol equivale al número de Avogadro: $6.022 \\times 10^{23}$ entidades.',
      anchorId: 'avogadro',
    },
    {
      id: 'qui-q2',
      pregunta: '¿Cuál es la masa molar aproximada del agua $H_2O$?',
      opciones: [
        { id: 'A', texto: '$17\\,\\text{g/mol}$' },
        { id: 'B', texto: '$18\\,\\text{g/mol}$' },
        { id: 'C', texto: '$2\\,\\text{g/mol}$' },
        { id: 'D', texto: '$36\\,\\text{g/mol}$' },
      ],
      opcion_correcta: 'B',
      explicacion: '$2(1) + 16 = 18\\,\\text{g/mol}$. Olvidar el subíndice 2 del hidrógeno daría 17.',
      anchorId: 'masa-molar',
    },
    {
      id: 'qui-q3',
      pregunta: 'En $2H_2 + O_2 \\rightarrow 2H_2O$, ¿cuántos átomos de oxígeno hay de cada lado?',
      opciones: [
        { id: 'A', texto: '$1$ de cada lado' },
        { id: 'B', texto: '$2$ de cada lado' },
        { id: 'C', texto: '$3$ a la izquierda y $2$ a la derecha' },
        { id: 'D', texto: '$4$ de cada lado' },
      ],
      opcion_correcta: 'B',
      explicacion: 'A la izquierda $O_2$ aporta 2 oxígenos; a la derecha $2H_2O$ también: $2 \\times 1 = 2$. Está balanceada.',
      anchorId: 'balanceo',
    },
  ],
};

const STUDY_GUIDES: readonly StudyGuide[] = [matematicas, fisica, quimica];

/** Lista de todas las guías disponibles (orden de presentación). */
export const studyGuides: readonly StudyGuide[] = STUDY_GUIDES;

/** Slugs válidos, útil para `generateStaticParams` si se requiere. */
export const studyGuideSlugs: readonly string[] = STUDY_GUIDES.map((g) => g.slug);

/** Devuelve la guía por slug, o `undefined` si no existe. */
export function getStudyGuide(slug: string): StudyGuide | undefined {
  return STUDY_GUIDES.find((guide) => guide.slug === slug);
}
