/**
 * Genera src/data/ipn-temario-matematicas.ts desde el temario IPN (Pensamiento Matemático).
 * Uso: node scripts/gen-ipn-matematicas.mjs
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '../src/data/ipn-temario-matematicas.ts');

const topics = [
  {
    id: 'ipn-mat-1-1',
    codigo: '1.1',
    titulo: 'Razonamiento Matemático y Pensamiento Espacial',
    orden: 1,
    children: [
      {
        id: 'ipn-mat-1-1-1',
        codigo: '1.1.1',
        titulo: 'Sucesiones numéricas complejas',
        descripcion:
          'Identificación de patrones en sucesiones de segundo orden (donde la diferencia común no es constante en el primer nivel, sino en el segundo) y sucesiones alternas o intercaladas (a_n = p_n + q_n). Uso de la fórmula general para el término enésimo de una progresión aritmética (a_n = a_1 + (n-1)d) y geométrica (a_n = a_1 · r^(n-1)).',
        orden: 1,
      },
      {
        id: 'ipn-mat-1-1-2',
        codigo: '1.1.2',
        titulo: 'Sucesiones alfanuméricas con simetría',
        descripcion:
          'Series que combinan incrementos numéricos con saltos alfabéticos basándose en el abecedario oficial de 27 letras (omitiendo la ch y la ll, pero incluyendo la ñ).',
        orden: 2,
      },
      {
        id: 'ipn-mat-1-1-3',
        codigo: '1.1.3',
        titulo: 'Series espaciales y rotaciones 3D',
        descripcion:
          'Giros de figuras bidimensionales sobre ejes imaginarios (X, Y). En matrices de figuras de 3×3, identificar el patrón de rotación horaria/antihoraria (frecuentemente combinada con incrementos angulares de 45°, 90° o 135°) y cambios en el sombreado o tramado de las piezas.',
        orden: 3,
      },
      {
        id: 'ipn-mat-1-1-4',
        codigo: '1.1.4',
        titulo: 'Despliegue y armado de poliedros',
        descripcion:
          'Visualización mental de cubos desarmados (desarrollos planos en forma de cruz, de "T", etc.). El examen del IPN exige determinar qué cara queda opuesta a cuál otra o qué símbolos quedan contiguos tras armar la figura tridimensional.',
        orden: 4,
      },
      {
        id: 'ipn-mat-1-1-5',
        codigo: '1.1.5',
        titulo: 'Conteo de cubos y vistas ortogonales',
        descripcion:
          'Determinación del número exacto de bloques en arreglos tridimensionales complejos que incluyen piezas ocultas. Traducción de figuras 3D a sus vistas bidimensionales normalizadas: Planta (vista superior), Alzado (vista frontal) y Perfil (vista lateral).',
        orden: 5,
      },
    ],
  },
  {
    id: 'ipn-mat-1-2',
    codigo: '1.2',
    titulo: 'Álgebra',
    orden: 2,
    children: [
      {
        id: 'ipn-mat-1-2-1',
        codigo: '1.2.1',
        titulo: 'Operaciones y división sintética',
        descripcion:
          'Algoritmo de la división larga de polinomios y aplicación estricta de la Regla de Ruffini (División Sintética) para simplificar polinomios racionales cuando el divisor es de la forma x ± c. Aplicación práctica del Teorema del Residuo para evaluar funciones polinomiales complejas sin hacer la división.',
        orden: 1,
      },
      {
        id: 'ipn-mat-1-2-2',
        codigo: '1.2.2',
        titulo: 'Productos notables avanzados y factorización "filtro"',
        descripcion:
          'Desarrollo mecánico de binomios con coeficientes fraccionarios o exponentes algebraicos. Factorización exhaustiva de trinomios por el método de tijera o cruz (ax² + bx + c) y agrupaciones que involucran identidades ocultas (como completar un trinomio cuadrado perfecto dentro de una diferencia de cuadrados). Suma y diferencia de cubos aplicadas a simplificación de fracciones algebraicas complejas.',
        orden: 2,
      },
      {
        id: 'ipn-mat-1-2-3',
        codigo: '1.2.3',
        titulo: 'Sistemas de ecuaciones simultáneas',
        descripcion:
          'Resolución exacta de sistemas de 3×3 mediante el método de eliminación gaussiana o la Regla de Cramer (Determinantes por el método de Sarrus). Planteamiento algebraico riguroso a partir de problemas con enunciados técnicos.',
        orden: 3,
      },
      {
        id: 'ipn-mat-1-2-4',
        codigo: '1.2.4',
        titulo: 'Números complejos',
        descripcion:
          'Álgebra de los números imaginarios (i^n con reducción de potencias dividiendo entre 4). Conversión de la forma binómica (z = a + bi) a la forma polar o trigonométrica (z = r(cos θ + i sen θ)) utilizando el módulo r = √(a² + b²) y el argumento exacto θ = arctan(b/a) según el cuadrante. Operaciones de multiplicación y división en forma polar (Teorema de Moivre).',
        orden: 4,
      },
    ],
  },
  {
    id: 'ipn-mat-1-3',
    codigo: '1.3',
    titulo: 'Geometría y Trigonometría',
    orden: 3,
    children: [
      {
        id: 'ipn-mat-1-3-1',
        codigo: '1.3.1',
        titulo: 'Geometría euclidiana',
        descripcion:
          'Ángulos complementarios, suplementarios y conjugados. Teoremas de ángulos formados por rectas paralelas cortadas por una secante (alternos internos, alternos externos, correspondientes). Teorema de Tales aplicado a la semejanza de triángulos (escalonamiento de sombras y estructuras).',
        orden: 1,
      },
      {
        id: 'ipn-mat-1-3-2',
        codigo: '1.3.2',
        titulo: 'Funciones trigonométricas y círculo unitario',
        descripcion:
          'Definición de funciones fundamentales y recíprocas en el plano cartesiano. Deducción analítica de los signos de las funciones en los cuadrantes I, II, III y IV. Uso del círculo unitario para hallar los valores exactos de ángulos cuadrantales (0, π/2, π, 3π/2, 2π) y notables (30°, 45°, 60°) expresados preferentemente en radianes.',
        orden: 2,
      },
      {
        id: 'ipn-mat-1-3-3',
        codigo: '1.3.3',
        titulo: 'Identidades y ecuaciones trigonométricas complejas',
        descripcion:
          'Simplificación de expresiones trigonométricas largas utilizando identidades pitagóricas, de cociente y las identidades para ángulo doble (sen(2x) = 2 sen x cos x, cos(2x) = cos²x − sen²x). Resolución de ecuaciones trigonométricas lineales o cuadráticas que requieren factorizar la función e identificar todas las soluciones reales dentro del intervalo [0, 2π].',
        orden: 3,
      },
    ],
  },
  {
    id: 'ipn-mat-1-4',
    codigo: '1.4',
    titulo: 'Geometría analítica',
    orden: 4,
    children: [
      {
        id: 'ipn-mat-1-4-1',
        codigo: '1.4.1',
        titulo: 'La línea recta',
        descripcion:
          'Conversión fluida entre todas las formas de la ecuación (General, Ordinaria, Simétrica y Punto-Pendiente). Deducción de la ecuación de una recta que pasa por un punto dado y es paralela o perpendicular a otra recta conocida. Cálculo de la distancia más corta de un punto a una recta: d = |Ax₁ + By₁ + C| / √(A² + B²).',
        orden: 1,
      },
      {
        id: 'ipn-mat-1-4-2',
        codigo: '1.4.2',
        titulo: 'Circunferencia',
        descripcion:
          'Deducción de la ecuación general a partir del centro C(h,k) y el radio r. Proceso inverso: transformar la ecuación general x² + y² + Dx + Ey + F = 0 a su forma ordinaria (x−h)² + (y−k)² = r² completando trinomios cuadrados perfectos para determinar el centro y la longitud del radio.',
        orden: 2,
      },
      {
        id: 'ipn-mat-1-4-3',
        codigo: '1.4.3',
        titulo: 'Parábola',
        descripcion:
          'Estudio de las 4 orientaciones posibles con vértice fuera del origen V(h,k) (horizontales que abren a la derecha/izquierda y verticales que abren hacia arriba/abajo). Obtención analítica y gráfica de sus elementos esenciales: Foco, Directriz, Vértice, Eje focal y longitud del Lado Recto (LR = |4p|).',
        orden: 3,
      },
      {
        id: 'ipn-mat-1-4-4',
        codigo: '1.4.4',
        titulo: 'Elipse',
        descripcion:
          'Ecuaciones ordinarias para elipses horizontales y verticales con centro en C(h,k). Relación pitagórica fundamental entre sus semiejes: a² = b² + c² (donde a es el semieje mayor, b el semieje menor y c la distancia focal). Determinación de vértices, co-vértices, focos, excentricidad (e = c/a, donde 0 < e < 1) y longitud de sus dos lados rectos (LR = 2b²/a).',
        orden: 4,
      },
      {
        id: 'ipn-mat-1-4-5',
        codigo: '1.4.5',
        titulo: 'Hipérbola',
        descripcion:
          'Ecuaciones ordinarias para hipérbolas horizontales y verticales con centro en C(h,k). Relación matemática entre sus ejes: c² = a² + b² (donde a es el semieje real y b el semieje imaginario). Cálculo exacto de su excentricidad (e = c/a, donde e > 1) y de las ecuaciones de sus asíntotas lineales utilizando las pendientes ±b/a o ±a/b según corresponda.',
        orden: 5,
      },
    ],
  },
  {
    id: 'ipn-mat-1-5',
    codigo: '1.5',
    titulo: 'Cálculo diferencial',
    orden: 5,
    children: [
      {
        id: 'ipn-mat-1-5-1',
        codigo: '1.5.1',
        titulo: 'Funciones, dominio y rango',
        descripcion:
          'Determinación analítica rigurosa del dominio de funciones compuestas (racionales con denominadores que no pueden ser cero; radicales de índice par cuyos radicandos deben ser ≥ 0; funciones logarítmicas cuyos argumentos deben ser estrictamente mayores a cero).',
        orden: 1,
      },
      {
        id: 'ipn-mat-1-5-2',
        codigo: '1.5.2',
        titulo: 'Límites algebraicos e indeterminaciones',
        descripcion:
          'Evaluación y eliminación de indeterminaciones de la forma 0/0 utilizando factorización avanzada (conjugados, cubos, trinomios) y racionalización de radicales dobles. Límites trigonométricos basados en el límite especial: lim(x→0) sen(x)/x = 1. Resolución de límites al infinito de la forma ∞/∞ comparando analíticamente los grados de los polinomios del numerador y del denominador.',
        orden: 2,
      },
      {
        id: 'ipn-mat-1-5-3',
        codigo: '1.5.3',
        titulo: 'Derivadas por fórmulas directas y Regla de la Cadena',
        descripcion:
          'Aplicación encadenada de fórmulas para derivadas de productos (u·v) y cocientes (u/v). Derivación de funciones trascendentes compuestas utilizando la Regla de la Cadena de forma sucesiva en funciones trigonométricas directas (sen u, cos u, tan u), trigonométricas inversas (arcsen u, arctan u), exponenciales (e^u, a^u) y logarítmicas (ln u, log_a u).',
        orden: 3,
      },
      {
        id: 'ipn-mat-1-5-4',
        codigo: '1.5.4',
        titulo: 'Derivación implícita',
        descripcion:
          'Técnica de derivación para ecuaciones donde la variable dependiente y no está despejada, aplicando la derivada término a término respecto a x y despejando algebraicamente la expresión y′ o dy/dx.',
        orden: 4,
      },
      {
        id: 'ipn-mat-1-5-5',
        codigo: '1.5.5',
        titulo: 'Aplicaciones geométricas y optimización',
        descripcion:
          'Determinación de la pendiente de la recta tangente a una curva en un punto dado; cálculo de la ecuación de la recta tangente y normal. Uso de los criterios de la primera y segunda derivada para localizar puntos críticos, intervalos de crecimiento y decrecimiento, máximos y mínimos relativos, puntos de inflexión y concavidad. Planteamiento y resolución de problemas de optimización técnica (maximizar volúmenes de cajas, minimizar materiales de cilindros, velocidad de llenado).',
        orden: 5,
      },
    ],
  },
  {
    id: 'ipn-mat-1-6',
    codigo: '1.6',
    titulo: 'Cálculo integral',
    orden: 6,
    children: [
      {
        id: 'ipn-mat-1-6-1',
        codigo: '1.6.1',
        titulo: 'Integración inmediata',
        descripcion:
          'Propiedades de linealidad. Aplicación directa de las fórmulas de integración para potencias (∫x^n dx), funciones exponenciales y funciones trigonométricas básicas, incluyendo el manejo correcto de las constantes de integración (+C).',
        orden: 1,
      },
      {
        id: 'ipn-mat-1-6-2',
        codigo: '1.6.2',
        titulo: 'Métodos de integración mecánicos (filtro operativo del IPN)',
        orden: 2,
        children: [
          {
            id: 'ipn-mat-1-6-2-1',
            codigo: '1.6.2.1',
            titulo: 'Cambio de variable (sustitución)',
            descripcion:
              'Selección correcta de u y su respectivo diferencial du para completar y balancear la integral con coeficientes numéricos.',
            orden: 1,
          },
          {
            id: 'ipn-mat-1-6-2-2',
            codigo: '1.6.2.2',
            titulo: 'Integración por partes',
            descripcion:
              'Aplicación sistemática de la fórmula ∫u dv = uv − ∫v du utilizando la prioridad ILATE para seleccionar la variable u.',
            orden: 2,
          },
          {
            id: 'ipn-mat-1-6-2-3',
            codigo: '1.6.2.3',
            titulo: 'Fracciones parciales',
            descripcion:
              'Descomposición de funciones racionales complejas cuando el denominador es factorizable en factores lineales no repetidos (A/(x−c₁) + B/(x−c₂)) o factores lineales repetidos, determinando el valor de las constantes mediante sistemas de ecuaciones o sustitución directa.',
            orden: 3,
          },
        ],
      },
      {
        id: 'ipn-mat-1-6-3',
        codigo: '1.6.3',
        titulo: 'Integral definida y cálculo de áreas',
        descripcion:
          'Aplicación del Teorema Fundamental del Cálculo para evaluar límites de integración [a, b]. Cálculo exacto del área bajo una curva y del área comprendida entre las gráficas de dos funciones distintas, localizando previamente los puntos de intersección de las curvas mediante la igualación de las ecuaciones.',
        orden: 3,
      },
    ],
  },
];

function normalize(node, fallbackOrden) {
  const base = {
    id: node.id,
    codigo: node.codigo,
    titulo: node.titulo,
    orden: node.orden ?? fallbackOrden,
    status: 'publicado',
  };
  if (node.descripcion) base.descripcion = node.descripcion;
  if (node.children?.length) {
    base.children = node.children.map((c, i) => normalize(c, i + 1));
  }
  return base;
}

const normalized = topics.map((t, i) => normalize(t, i + 1));

const content = `import type { UnamTemarioTopic } from './unam-temario';

/** Temario ultra-detallado de Matemáticas (Pensamiento Matemático) — Examen IPN. */
export const IPN_MATEMATICAS_TOPICS: UnamTemarioTopic[] = ${JSON.stringify(normalized, null, 2)} as UnamTemarioTopic[];
`;

writeFileSync(outPath, content, 'utf8');
console.log(`Wrote ${outPath} (${normalized.length} bloques raíz)`);
