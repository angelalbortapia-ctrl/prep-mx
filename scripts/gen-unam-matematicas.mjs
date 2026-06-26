import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pub = 'publicado';

function leaf(id, codigo, titulo, descripcion, orden) {
  return { id, codigo, titulo, descripcion, orden, status: pub };
}
function branch(id, codigo, titulo, orden, children, extra = {}) {
  return { id, codigo, titulo, orden, status: pub, children, ...extra };
}

const topics = [
  branch('mat-algebra', '1', 'Álgebra', 1, [
    branch('mat-algebra-1-1', '1.1', 'Números reales', 1, [
      leaf('mat-algebra-1-1-1', '1.1.1', 'Propiedades de los números reales', 'Clausura, conmutatividad, asociatividad, distributividad, existencia del elemento neutro (aditivo y multiplicativo) e inverso (aditivo y multiplicativo).', 1),
      leaf('mat-algebra-1-1-2', '1.1.2', 'Operaciones con números enteros y racionales', 'Leyes de los signos para suma, resta, multiplicación y división. Jerarquía de operaciones (paréntesis, potencias/raíces, multiplicaciones/divisiones, sumas/restas).', 2),
      leaf('mat-algebra-1-1-3', '1.1.3', 'Operaciones con fracciones', 'Suma y resta con denominadores iguales y diferentes (mcm); multiplicación directa y división (producto cruzado o ley del sándwich); simplificación de fracciones complejas.', 3),
      leaf('mat-algebra-1-1-4', '1.1.4', 'Leyes de los exponentes', 'Producto de potencias con la misma base, cociente de potencias, potencia de una potencia, exponente cero, exponente negativo y exponente fraccionario (conversión a radicales).', 4),
      leaf('mat-algebra-1-1-5', '1.1.5', 'Leyes de los radicales', 'Raíz de un producto, raíz de un cociente, raíz de una raíz, simplificación de radicales e introducción de factores dentro de un radical. Racionalización de denominadores (monomios y binomios usando el conjugado).', 5),
    ]),
    branch('mat-algebra-1-2', '1.2', 'Expresiones algebraicas', 2, [
      leaf('mat-algebra-1-2-1', '1.2.1', 'Clasificación y terminología', 'Término algebraico, signo, coeficiente, base (variable) y exponente. Grado de un término y grado de un polinomio. Monomios, binomios, trinomios y polinomios.', 1),
      leaf('mat-algebra-1-2-2', '1.2.2', 'Reducción de términos semejantes', 'Identificación y agrupación de términos con idéntica base e idéntico exponente.', 2),
      leaf('mat-algebra-1-2-3', '1.2.3', 'Suma y resta de polinomios', 'Agrupación horizontal y vertical; cambios de signo por paréntesis precedidos por signo negativo.', 3),
      leaf('mat-algebra-1-2-4', '1.2.4', 'Multiplicación de expresiones algebraicas', 'Monomio por monomio, monomio por polinomio, y polinomio por polinomio (propiedad distributiva y leyes de exponentes).', 4),
      leaf('mat-algebra-1-2-5', '1.2.5', 'División de expresiones algebraicas', 'Monomio entre monomio, polinomio entre monomio, y división larga de polinomios ordenada de forma decreciente, incluyendo el manejo del residuo.', 5),
    ]),
    branch('mat-algebra-1-3', '1.3', 'Productos notables y factorización', 3, [
      leaf('mat-algebra-1-3-1', '1.3.1', 'Binomio al cuadrado', 'Desarrollo de (a ± b)² = a² ± 2ab + b² (Trinomio Cuadrado Perfecto).', 1),
      leaf('mat-algebra-1-3-2', '1.3.2', 'Binomios conjugados', 'Desarrollo de (a + b)(a - b) = a² - b² (Diferencia de cuadrados).', 2),
      leaf('mat-algebra-1-3-3', '1.3.3', 'Binomios con término común', 'Desarrollo de (x + a)(x + b) = x² + (a+b)x + ab.', 3),
      leaf('mat-algebra-1-3-4', '1.3.4', 'Binomio al cubo', 'Desarrollo de (a ± b)³ = a³ ± 3a²b + 3ab² ± b³.', 4),
      leaf('mat-algebra-1-3-5', '1.3.5', 'Factorización por término común', 'Extracción del MCD numérico y de las variables con su menor exponente. Factorización por agrupación de términos.', 5),
      leaf('mat-algebra-1-3-6', '1.3.6', 'Factorización de una diferencia de cuadrados', 'Proceso inverso de binomios conjugados: a² - b² = (a+b)(a-b), incluyendo casos con fracciones o exponentes compuestos.', 6),
      leaf('mat-algebra-1-3-7', '1.3.7', 'Factorización de Trinomios Cuadrados Perfectos', 'Identificación mediante raíces de los extremos y verificación del doble producto; factorización como binomio al cuadrado.', 7),
      leaf('mat-algebra-1-3-8', '1.3.8', 'Factorización de trinomios x² + bx + c', 'Búsqueda de dos números que multiplicados den c y sumados/restados den b.', 8),
      leaf('mat-algebra-1-3-9', '1.3.9', 'Factorización de trinomios ax² + bx + c', 'Métodos de descomposición, método de la cruz o multiplicación por el coeficiente a.', 9),
      leaf('mat-algebra-1-3-10', '1.3.10', 'Factorización de suma y diferencia de cubos', 'a³ ± b³ = (a ± b)(a² ∓ ab + b²).', 10),
    ]),
    branch('mat-algebra-1-4', '1.4', 'Ecuaciones de primer grado', 4, [
      leaf('mat-algebra-1-4-1', '1.4.1', 'Resolución de ecuaciones lineales', 'Despejes básicos, ecuaciones con paréntesis, ecuaciones con fracciones algebraicas (eliminación de denominadores multiplicando por el mcm).', 1),
      leaf('mat-algebra-1-4-2', '1.4.2', 'Problemas de aplicación', 'Traducción de lenguaje común a algebraico: edades, mezclas, inversiones, reparto proporcional y geometría básica.', 2),
    ]),
    branch('mat-algebra-1-5', '1.5', 'Sistemas de ecuaciones lineales', 5, [
      leaf('mat-algebra-1-5-1', '1.5.1', 'Sistemas 2×2', 'Método de Reducción (Suma y Resta). Método de Sustitución. Método de Igualación. Método por Determinantes (Regla de Cramer).', 1),
      leaf('mat-algebra-1-5-2', '1.5.2', 'Sistemas 3×3', 'Resolución por reducción sucesiva (reducir a un sistema 2×2) o por determinantes (Regla de Sarrus).', 2),
      leaf('mat-algebra-1-5-3', '1.5.3', 'Problemas de aplicación de sistemas', 'Compras combinadas, velocidades de corrientes/viento, y combinación de soluciones o aleaciones.', 3),
    ]),
    branch('mat-algebra-1-6', '1.6', 'Ecuaciones de segundo grado', 6, [
      leaf('mat-algebra-1-6-1', '1.6.1', 'Métodos de resolución', 'Incompletas puras (ax² + c = 0): despeje y raíces ±. Incompletas mixtas (ax² + bx = 0): factorización de término común x. Completas por factorización, completando el TCP, y Fórmula General x = (-b ± √(b²-4ac)) / 2a.', 1),
      leaf('mat-algebra-1-6-2', '1.6.2', 'Análisis del discriminante', 'Δ = b² - 4ac: Δ > 0 dos raíces reales distintas; Δ = 0 una raíz real única; Δ < 0 dos raíces complejas conjugadas.', 2),
      leaf('mat-algebra-1-6-3', '1.6.3', 'Problemas de aplicación', 'Áreas, productos de números consecutivos o proyectiles.', 3),
    ]),
    branch('mat-algebra-1-7', '1.7', 'Desigualdades e inecuaciones', 7, [
      leaf('mat-algebra-1-7-1', '1.7.1', 'Desigualdades lineales de primer grado', 'Propiedades (efecto de multiplicar/dividir por negativo). Solución analítica, de intervalo y gráfica en la recta numérica.', 1),
    ]),
  ], { guideSlug: 'matematicas' }),
  branch('mat-funciones', '2', 'Funciones Algebraicas y Análisis Gráfico', 2, [
    branch('mat-funciones-2-1', '2.1', 'Conceptos fundamentales de funciones', 1, [
      leaf('mat-funciones-2-1-1', '2.1.1', 'Definición de función', 'Relación donde a cada elemento del dominio le corresponde un único elemento del codominio. Criterio de la recta vertical.', 1),
      leaf('mat-funciones-2-1-2', '2.1.2', 'Componentes', 'Variable independiente, variable dependiente, dominio, codominio y rango (imagen).', 2),
      leaf('mat-funciones-2-1-3', '2.1.3', 'Cálculo del dominio analítico', 'Polinomiales (todos los reales). Racionales (excluir ceros del denominador). Radicales de índice par (radicando ≥ 0).', 3),
    ]),
    branch('mat-funciones-2-2', '2.2', 'Operaciones con funciones', 2, [
      leaf('mat-funciones-2-2-1', '2.2.1', 'Operaciones básicas', 'Suma (f+g)(x), resta (f-g)(x), multiplicación (f·g)(x) y división (f/g)(x).', 1),
      leaf('mat-funciones-2-2-2', '2.2.2', 'Composición de funciones', '(f∘g)(x) = f(g(x)) y (g∘f)(x) = g(f(x)).', 2),
    ]),
    branch('mat-funciones-2-3', '2.3', 'Tipos de funciones y sus gráficas', 3, [
      leaf('mat-funciones-2-3-1', '2.3.1', 'Función lineal f(x) = mx + b', 'Identificación de pendiente m y ordenada al origen b.', 1),
      leaf('mat-funciones-2-3-2', '2.3.2', 'Función cuadrática f(x) = ax² + bx + c', 'Parábola, concavidad (signo de a), vértice h = -b/(2a), k = f(h).', 2),
    ]),
  ]),
  branch('mat-trigonometria', '3', 'Trigonometría', 3, [
    branch('mat-trig-3-1', '3.1', 'Sistemas de medición de ángulos', 1, [
      leaf('mat-trig-3-1-1', '3.1.1', 'Conversión de unidades', 'Grados a radianes y viceversa: π rad = 180°.', 1),
    ]),
    branch('mat-trig-3-2', '3.2', 'Funciones trigonométricas en el triángulo rectángulo', 2, [
      leaf('mat-trig-3-2-1', '3.2.1', 'Razones fundamentales y recíprocas', 'sen(θ), cos(θ), tan(θ), cot(θ), sec(θ) y csc(θ) respecto a catetos e hipotenusa.', 1),
      leaf('mat-trig-3-2-2', '3.2.2', 'Teorema de Pitágoras', 'Uso combinado con funciones trigonométricas para encontrar lados faltantes.', 2),
    ]),
    branch('mat-trig-3-3', '3.3', 'Ángulos notables y cuadrantales', 3, [
      leaf('mat-trig-3-3-1', '3.3.1', 'Valores exactos', '30°, 45°, 60° — memorización o deducción geométrica.', 1),
      leaf('mat-trig-3-3-2', '3.3.2', 'Ángulos cuadrantales', '0°, 90°, 180°, 270° y 360° basados en el círculo unitario.', 2),
      leaf('mat-trig-3-3-3', '3.3.3', 'Signos por cuadrante', 'Determinación del signo (+ o -) de cada función en los cuatro cuadrantes.', 3),
    ]),
    branch('mat-trig-3-4', '3.4', 'Identidades trigonométricas', 4, [
      leaf('mat-trig-3-4-1', '3.4.1', 'Identidades recíprocas', 'csc(x) = 1/sen(x), sec(x) = 1/cos(x), cot(x) = 1/tan(x).', 1),
      leaf('mat-trig-3-4-2', '3.4.2', 'Identidades de cociente', 'tan(x) = sen(x)/cos(x), cot(x) = cos(x)/sen(x).', 2),
      leaf('mat-trig-3-4-3', '3.4.3', 'Identidades pitagóricas', 'sen²(x) + cos²(x) = 1, tan²(x) + 1 = sec²(x), cot²(x) + 1 = csc²(x).', 3),
    ]),
    branch('mat-trig-3-5', '3.5', 'Ley de Senos y Ley de Cosenos', 5, [
      leaf('mat-trig-3-5-1', '3.5.1', 'Triángulos oblicuángulos', 'Ley de Senos: a/sen(A) = b/sen(B) = c/sen(C) (AAL o LLA). Ley de Cosenos: a² = b² + c² - 2bc·cos(A) (LAL o LLL).', 1),
    ]),
  ]),
  branch('mat-geo-analitica', '4', 'Geometría Analítica', 4, [
    branch('mat-geo-4-1', '4.1', 'Conceptos fundamentales en el plano cartesiano', 1, [
      leaf('mat-geo-4-1-1', '4.1.1', 'Distancia entre dos puntos', 'd = √((x₂-x₁)² + (y₂-y₁)²).', 1),
      leaf('mat-geo-4-1-2', '4.1.2', 'Punto medio de un segmento', 'P_m = ((x₁+x₂)/2, (y₁+y₂)/2).', 2),
      leaf('mat-geo-4-1-3', '4.1.3', 'Pendiente de una recta', 'm = (y₂-y₁)/(x₂-x₁). Ángulo de inclinación θ = arctan(m).', 3),
    ]),
    branch('mat-geo-4-2', '4.2', 'La línea recta', 2, [
      leaf('mat-geo-4-2-1', '4.2.1', 'Formas de la ecuación de la recta', 'Punto-Pendiente: y-y₁ = m(x-x₁). Ordinaria: y = mx+b. Simétrica: x/a + y/b = 1. General: Ax+By+C = 0.', 1),
      leaf('mat-geo-4-2-2', '4.2.2', 'Relaciones entre dos rectas', 'Paralelismo: m₁ = m₂. Perpendicularidad: m₁·m₂ = -1.', 2),
      leaf('mat-geo-4-2-3', '4.2.3', 'Distancia de un punto a una recta', 'd = |Ax₁+By₁+C| / √(A²+B²).', 3),
    ]),
    branch('mat-geo-4-3', '4.3', 'Secciones cónicas', 3, [
      leaf('mat-geo-4-3-1', '4.3.1', 'Circunferencia', 'Centro origen: x²+y² = r². Centro (h,k): (x-h)²+(y-k)² = r². General: x²+y²+Dx+Ey+F = 0; completar cuadrados.', 1),
      leaf('mat-geo-4-3-2', '4.3.2', 'Parábola', 'Foco, directriz, eje focal, vértice, LR = |4p|. V(0,0): y² = ±4px o x² = ±4py. V(h,k): (y-k)² = ±4p(x-h) o (x-h)² = ±4p(y-k).', 2),
      leaf('mat-geo-4-3-3', '4.3.3', 'Elipse', 'Vértices, focos, ejes 2a y 2b, a² = b²+c², e = c/a < 1, LR = 2b²/a. Ecuaciones horizontal/vertical con centro en origen o (h,k).', 3),
      leaf('mat-geo-4-3-4', '4.3.4', 'Hipérbola', 'Vértices, focos, ejes 2a y 2b, c² = a²+b², e = c/a > 1, asíntotas. Ecuaciones horizontal/vertical con centro en origen o (h,k).', 4),
      leaf('mat-geo-4-3-5', '4.3.5', 'Ecuación general de segundo grado', 'Ax²+Bxy+Cy²+Dx+Ey+F = 0 (B=0 usualmente): A=C circunferencia; A=0 o C=0 parábola; A≠C mismo signo elipse; signos opuestos hipérbola.', 5),
    ]),
  ]),
  branch('mat-calc-diff', '5', 'Cálculo Diferencial (mayor profundidad Área 1 y 2)', 5, [
    branch('mat-calc-diff-5-1', '5.1', 'Límites', 1, [
      leaf('mat-calc-diff-5-1-1', '5.1.1', 'Concepto de límite', 'Comportamiento de f(x) cuando x se aproxima a c.', 1),
      leaf('mat-calc-diff-5-1-2', '5.1.2', 'Teoremas de los límites', 'Suma, resta, producto, cociente y potencia de límites.', 2),
      leaf('mat-calc-diff-5-1-3', '5.1.3', 'Límites determinados', 'Evaluación por sustitución directa.', 3),
      leaf('mat-calc-diff-5-1-4', '5.1.4', 'Límites indeterminados 0/0', 'Factorización (diferencia de cuadrados, trinomios) o racionalización (conjugado).', 4),
      leaf('mat-calc-diff-5-1-5', '5.1.5', 'Límites al infinito', 'Forma ∞/∞: dividir entre la mayor potencia del denominador.', 5),
    ]),
    branch('mat-calc-diff-5-2', '5.2', 'La derivada', 2, [
      leaf('mat-calc-diff-5-2-1', '5.2.1', 'Definición analítica', "f'(x) = lim(Δx→0) [f(x+Δx)-f(x)]/Δx (método de los cuatro pasos).", 1),
      leaf('mat-calc-diff-5-2-2', '5.2.2', 'Interpretación geométrica', 'Derivada como pendiente de la recta tangente en un punto.', 2),
    ]),
    branch('mat-calc-diff-5-3', '5.3', 'Reglas de derivación', 3, [
      leaf('mat-calc-diff-5-3-1', '5.3.1', 'Funciones algebraicas', 'Constante, x, constante por función, xⁿ, suma/resta.', 1),
      leaf('mat-calc-diff-5-3-2', '5.3.2', 'Reglas complejas', "Producto [u·v]' = u·v' + v·u'. Cociente [u/v]' = (v·u' - u·v')/v².", 2),
      leaf('mat-calc-diff-5-3-3', '5.3.3', 'Regla de la cadena', 'Derivación de funciones compuestas [u(x)]ⁿ.', 3),
    ]),
    branch('mat-calc-diff-5-4', '5.4', 'Derivadas de funciones trascendentes', 4, [
      leaf('mat-calc-diff-5-4-1', '5.4.1', 'Trigonométricas', 'Derivadas de sen(u), cos(u), tan(u), cot(u), sec(u), csc(u) con regla de la cadena.', 1),
      leaf('mat-calc-diff-5-4-2', '5.4.2', 'Exponenciales y logarítmicas', 'Derivadas de ln(u), log_a(u), e^u y a^u.', 2),
    ]),
    branch('mat-calc-diff-5-5', '5.5', 'Aplicaciones de la derivada', 5, [
      leaf('mat-calc-diff-5-5-1', '5.5.1', 'Rectas tangente y normal', 'Ecuación de la tangente y de la normal (perpendicular) a una curva en un punto.', 1),
      leaf('mat-calc-diff-5-5-2', '5.5.2', 'Criterio de la primera derivada', "Puntos críticos; intervalos creciente (f' positiva) y decreciente (f' negativa); máximos y mínimos locales.", 2),
      leaf('mat-calc-diff-5-5-3', '5.5.3', 'Criterio de la segunda derivada', "Máximo si f'' negativa, mínimo si f'' positiva.", 3),
      leaf('mat-calc-diff-5-5-4', '5.5.4', 'Problemas de optimización', 'Maximizar áreas, volúmenes o ganancias; minimizar costos con derivadas.', 4),
    ]),
  ]),
  branch('mat-calc-int', '6', 'Cálculo Integral (mayor profundidad Área 1 y 2)', 6, [
    branch('mat-calc-int-6-1', '6.1', 'La integral indefinida', 1, [
      leaf('mat-calc-int-6-1-1', '6.1.1', 'Concepto', 'Integración como antiderivada (inversa de la derivación). Constante de integración C.', 1),
      leaf('mat-calc-int-6-1-2', '6.1.2', 'Propiedades de linealidad', 'Constante por función; integración de sumas y restas.', 2),
    ]),
    branch('mat-calc-int-6-2', '6.2', 'Fórmulas de integración inmediata', 2, [
      leaf('mat-calc-int-6-2-1', '6.2.1', 'Integrales algebraicas', '∫k dx, ∫xⁿ dx (n≠-1), ∫(1/x)dx = ln|x|.', 1),
      leaf('mat-calc-int-6-2-2', '6.2.2', 'Integrales trascendentes', '∫eˣ dx, ∫sen(x) dx, ∫cos(x) dx, ∫sec²(x) dx.', 2),
    ]),
    branch('mat-calc-int-6-3', '6.3', 'Métodos de integración básicos', 3, [
      leaf('mat-calc-int-6-3-1', '6.3.1', 'Cambio de variable (sustitución)', 'Identificar u, obtener du, completar la integral.', 1),
      leaf('mat-calc-int-6-3-2', '6.3.2', 'Integración por partes', '∫u dv = u·v - ∫v du. Regla ILATE para elegir u.', 2),
    ]),
    branch('mat-calc-int-6-4', '6.4', 'La integral definida', 4, [
      leaf('mat-calc-int-6-4-1', '6.4.1', 'Teorema Fundamental del Cálculo', '∫ₐᵇ f(x)dx = F(b) - F(a).', 1),
    ]),
    branch('mat-calc-int-6-5', '6.5', 'Aplicaciones de la integral', 5, [
      leaf('mat-calc-int-6-5-1', '6.5.1', 'Áreas bajo la curva', 'Área acotada por f(x), eje X y rectas x=a, x=b.', 1),
    ]),
  ]),
];

function countLeaves(arr) {
  let n = 0;
  for (const t of arr) {
    if (t.children?.length) n += countLeaves(t.children);
    else n++;
  }
  return n;
}

const outPath = path.join(__dirname, '../src/data/unam-temario-matematicas.ts');
const content = `import type { UnamTemarioTopic } from './unam-temario';

/** Temario ultra-detallado de Matemáticas — Examen UNAM. */
export const UNAM_MATEMATICAS_TOPICS: UnamTemarioTopic[] = ${JSON.stringify(topics, null, 2)} as UnamTemarioTopic[];
`;

fs.writeFileSync(outPath, content, 'utf8');
console.log('Written', outPath);
console.log('Leaf count:', countLeaves(topics));
