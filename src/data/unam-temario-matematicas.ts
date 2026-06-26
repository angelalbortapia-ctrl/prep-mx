import type { UnamTemarioTopic } from './unam-temario';

/** Temario ultra-detallado de Matemáticas — Examen UNAM. */
export const UNAM_MATEMATICAS_TOPICS: UnamTemarioTopic[] = [
  {
    "id": "mat-algebra",
    "codigo": "1",
    "titulo": "Álgebra",
    "orden": 1,
    "status": "publicado",
    "children": [
      {
        "id": "mat-algebra-1-1",
        "codigo": "1.1",
        "titulo": "Números reales",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "mat-algebra-1-1-1",
            "codigo": "1.1.1",
            "titulo": "Propiedades de los números reales",
            "descripcion": "Clausura, conmutatividad, asociatividad, distributividad, existencia del elemento neutro (aditivo y multiplicativo) e inverso (aditivo y multiplicativo).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "mat-algebra-1-1-2",
            "codigo": "1.1.2",
            "titulo": "Operaciones con números enteros y racionales",
            "descripcion": "Leyes de los signos para suma, resta, multiplicación y división. Jerarquía de operaciones (paréntesis, potencias/raíces, multiplicaciones/divisiones, sumas/restas).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "mat-algebra-1-1-3",
            "codigo": "1.1.3",
            "titulo": "Operaciones con fracciones",
            "descripcion": "Suma y resta con denominadores iguales y diferentes (mcm); multiplicación directa y división (producto cruzado o ley del sándwich); simplificación de fracciones complejas.",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "mat-algebra-1-1-4",
            "codigo": "1.1.4",
            "titulo": "Leyes de los exponentes",
            "descripcion": "Producto de potencias con la misma base, cociente de potencias, potencia de una potencia, exponente cero, exponente negativo y exponente fraccionario (conversión a radicales).",
            "orden": 4,
            "status": "publicado"
          },
          {
            "id": "mat-algebra-1-1-5",
            "codigo": "1.1.5",
            "titulo": "Leyes de los radicales",
            "descripcion": "Raíz de un producto, raíz de un cociente, raíz de una raíz, simplificación de radicales e introducción de factores dentro de un radical. Racionalización de denominadores (monomios y binomios usando el conjugado).",
            "orden": 5,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "mat-algebra-1-2",
        "codigo": "1.2",
        "titulo": "Expresiones algebraicas",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "mat-algebra-1-2-1",
            "codigo": "1.2.1",
            "titulo": "Clasificación y terminología",
            "descripcion": "Término algebraico, signo, coeficiente, base (variable) y exponente. Grado de un término y grado de un polinomio. Monomios, binomios, trinomios y polinomios.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "mat-algebra-1-2-2",
            "codigo": "1.2.2",
            "titulo": "Reducción de términos semejantes",
            "descripcion": "Identificación y agrupación de términos con idéntica base e idéntico exponente.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "mat-algebra-1-2-3",
            "codigo": "1.2.3",
            "titulo": "Suma y resta de polinomios",
            "descripcion": "Agrupación horizontal y vertical; cambios de signo por paréntesis precedidos por signo negativo.",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "mat-algebra-1-2-4",
            "codigo": "1.2.4",
            "titulo": "Multiplicación de expresiones algebraicas",
            "descripcion": "Monomio por monomio, monomio por polinomio, y polinomio por polinomio (propiedad distributiva y leyes de exponentes).",
            "orden": 4,
            "status": "publicado"
          },
          {
            "id": "mat-algebra-1-2-5",
            "codigo": "1.2.5",
            "titulo": "División de expresiones algebraicas",
            "descripcion": "Monomio entre monomio, polinomio entre monomio, y división larga de polinomios ordenada de forma decreciente, incluyendo el manejo del residuo.",
            "orden": 5,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "mat-algebra-1-3",
        "codigo": "1.3",
        "titulo": "Productos notables y factorización",
        "orden": 3,
        "status": "publicado",
        "children": [
          {
            "id": "mat-algebra-1-3-1",
            "codigo": "1.3.1",
            "titulo": "Binomio al cuadrado",
            "descripcion": "Desarrollo de (a ± b)² = a² ± 2ab + b² (Trinomio Cuadrado Perfecto).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "mat-algebra-1-3-2",
            "codigo": "1.3.2",
            "titulo": "Binomios conjugados",
            "descripcion": "Desarrollo de (a + b)(a - b) = a² - b² (Diferencia de cuadrados).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "mat-algebra-1-3-3",
            "codigo": "1.3.3",
            "titulo": "Binomios con término común",
            "descripcion": "Desarrollo de (x + a)(x + b) = x² + (a+b)x + ab.",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "mat-algebra-1-3-4",
            "codigo": "1.3.4",
            "titulo": "Binomio al cubo",
            "descripcion": "Desarrollo de (a ± b)³ = a³ ± 3a²b + 3ab² ± b³.",
            "orden": 4,
            "status": "publicado"
          },
          {
            "id": "mat-algebra-1-3-5",
            "codigo": "1.3.5",
            "titulo": "Factorización por término común",
            "descripcion": "Extracción del MCD numérico y de las variables con su menor exponente. Factorización por agrupación de términos.",
            "orden": 5,
            "status": "publicado"
          },
          {
            "id": "mat-algebra-1-3-6",
            "codigo": "1.3.6",
            "titulo": "Factorización de una diferencia de cuadrados",
            "descripcion": "Proceso inverso de binomios conjugados: a² - b² = (a+b)(a-b), incluyendo casos con fracciones o exponentes compuestos.",
            "orden": 6,
            "status": "publicado"
          },
          {
            "id": "mat-algebra-1-3-7",
            "codigo": "1.3.7",
            "titulo": "Factorización de Trinomios Cuadrados Perfectos",
            "descripcion": "Identificación mediante raíces de los extremos y verificación del doble producto; factorización como binomio al cuadrado.",
            "orden": 7,
            "status": "publicado"
          },
          {
            "id": "mat-algebra-1-3-8",
            "codigo": "1.3.8",
            "titulo": "Factorización de trinomios x² + bx + c",
            "descripcion": "Búsqueda de dos números que multiplicados den c y sumados/restados den b.",
            "orden": 8,
            "status": "publicado"
          },
          {
            "id": "mat-algebra-1-3-9",
            "codigo": "1.3.9",
            "titulo": "Factorización de trinomios ax² + bx + c",
            "descripcion": "Métodos de descomposición, método de la cruz o multiplicación por el coeficiente a.",
            "orden": 9,
            "status": "publicado"
          },
          {
            "id": "mat-algebra-1-3-10",
            "codigo": "1.3.10",
            "titulo": "Factorización de suma y diferencia de cubos",
            "descripcion": "a³ ± b³ = (a ± b)(a² ∓ ab + b²).",
            "orden": 10,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "mat-algebra-1-4",
        "codigo": "1.4",
        "titulo": "Ecuaciones de primer grado",
        "orden": 4,
        "status": "publicado",
        "children": [
          {
            "id": "mat-algebra-1-4-1",
            "codigo": "1.4.1",
            "titulo": "Resolución de ecuaciones lineales",
            "descripcion": "Despejes básicos, ecuaciones con paréntesis, ecuaciones con fracciones algebraicas (eliminación de denominadores multiplicando por el mcm).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "mat-algebra-1-4-2",
            "codigo": "1.4.2",
            "titulo": "Problemas de aplicación",
            "descripcion": "Traducción de lenguaje común a algebraico: edades, mezclas, inversiones, reparto proporcional y geometría básica.",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "mat-algebra-1-5",
        "codigo": "1.5",
        "titulo": "Sistemas de ecuaciones lineales",
        "orden": 5,
        "status": "publicado",
        "children": [
          {
            "id": "mat-algebra-1-5-1",
            "codigo": "1.5.1",
            "titulo": "Sistemas 2×2",
            "descripcion": "Método de Reducción (Suma y Resta). Método de Sustitución. Método de Igualación. Método por Determinantes (Regla de Cramer).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "mat-algebra-1-5-2",
            "codigo": "1.5.2",
            "titulo": "Sistemas 3×3",
            "descripcion": "Resolución por reducción sucesiva (reducir a un sistema 2×2) o por determinantes (Regla de Sarrus).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "mat-algebra-1-5-3",
            "codigo": "1.5.3",
            "titulo": "Problemas de aplicación de sistemas",
            "descripcion": "Compras combinadas, velocidades de corrientes/viento, y combinación de soluciones o aleaciones.",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "mat-algebra-1-6",
        "codigo": "1.6",
        "titulo": "Ecuaciones de segundo grado",
        "orden": 6,
        "status": "publicado",
        "children": [
          {
            "id": "mat-algebra-1-6-1",
            "codigo": "1.6.1",
            "titulo": "Métodos de resolución",
            "descripcion": "Incompletas puras (ax² + c = 0): despeje y raíces ±. Incompletas mixtas (ax² + bx = 0): factorización de término común x. Completas por factorización, completando el TCP, y Fórmula General x = (-b ± √(b²-4ac)) / 2a.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "mat-algebra-1-6-2",
            "codigo": "1.6.2",
            "titulo": "Análisis del discriminante",
            "descripcion": "Δ = b² - 4ac: Δ > 0 dos raíces reales distintas; Δ = 0 una raíz real única; Δ < 0 dos raíces complejas conjugadas.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "mat-algebra-1-6-3",
            "codigo": "1.6.3",
            "titulo": "Problemas de aplicación",
            "descripcion": "Áreas, productos de números consecutivos o proyectiles.",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "mat-algebra-1-7",
        "codigo": "1.7",
        "titulo": "Desigualdades e inecuaciones",
        "orden": 7,
        "status": "publicado",
        "children": [
          {
            "id": "mat-algebra-1-7-1",
            "codigo": "1.7.1",
            "titulo": "Desigualdades lineales de primer grado",
            "descripcion": "Propiedades (efecto de multiplicar/dividir por negativo). Solución analítica, de intervalo y gráfica en la recta numérica.",
            "orden": 1,
            "status": "publicado"
          }
        ]
      }
    ],
    "guideSlug": "matematicas"
  },
  {
    "id": "mat-funciones",
    "codigo": "2",
    "titulo": "Funciones Algebraicas y Análisis Gráfico",
    "orden": 2,
    "status": "publicado",
    "children": [
      {
        "id": "mat-funciones-2-1",
        "codigo": "2.1",
        "titulo": "Conceptos fundamentales de funciones",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "mat-funciones-2-1-1",
            "codigo": "2.1.1",
            "titulo": "Definición de función",
            "descripcion": "Relación donde a cada elemento del dominio le corresponde un único elemento del codominio. Criterio de la recta vertical.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "mat-funciones-2-1-2",
            "codigo": "2.1.2",
            "titulo": "Componentes",
            "descripcion": "Variable independiente, variable dependiente, dominio, codominio y rango (imagen).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "mat-funciones-2-1-3",
            "codigo": "2.1.3",
            "titulo": "Cálculo del dominio analítico",
            "descripcion": "Polinomiales (todos los reales). Racionales (excluir ceros del denominador). Radicales de índice par (radicando ≥ 0).",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "mat-funciones-2-2",
        "codigo": "2.2",
        "titulo": "Operaciones con funciones",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "mat-funciones-2-2-1",
            "codigo": "2.2.1",
            "titulo": "Operaciones básicas",
            "descripcion": "Suma (f+g)(x), resta (f-g)(x), multiplicación (f·g)(x) y división (f/g)(x).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "mat-funciones-2-2-2",
            "codigo": "2.2.2",
            "titulo": "Composición de funciones",
            "descripcion": "(f∘g)(x) = f(g(x)) y (g∘f)(x) = g(f(x)).",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "mat-funciones-2-3",
        "codigo": "2.3",
        "titulo": "Tipos de funciones y sus gráficas",
        "orden": 3,
        "status": "publicado",
        "children": [
          {
            "id": "mat-funciones-2-3-1",
            "codigo": "2.3.1",
            "titulo": "Función lineal f(x) = mx + b",
            "descripcion": "Identificación de pendiente m y ordenada al origen b.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "mat-funciones-2-3-2",
            "codigo": "2.3.2",
            "titulo": "Función cuadrática f(x) = ax² + bx + c",
            "descripcion": "Parábola, concavidad (signo de a), vértice h = -b/(2a), k = f(h).",
            "orden": 2,
            "status": "publicado"
          }
        ]
      }
    ]
  },
  {
    "id": "mat-trigonometria",
    "codigo": "3",
    "titulo": "Trigonometría",
    "orden": 3,
    "status": "publicado",
    "children": [
      {
        "id": "mat-trig-3-1",
        "codigo": "3.1",
        "titulo": "Sistemas de medición de ángulos",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "mat-trig-3-1-1",
            "codigo": "3.1.1",
            "titulo": "Conversión de unidades",
            "descripcion": "Grados a radianes y viceversa: π rad = 180°.",
            "orden": 1,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "mat-trig-3-2",
        "codigo": "3.2",
        "titulo": "Funciones trigonométricas en el triángulo rectángulo",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "mat-trig-3-2-1",
            "codigo": "3.2.1",
            "titulo": "Razones fundamentales y recíprocas",
            "descripcion": "sen(θ), cos(θ), tan(θ), cot(θ), sec(θ) y csc(θ) respecto a catetos e hipotenusa.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "mat-trig-3-2-2",
            "codigo": "3.2.2",
            "titulo": "Teorema de Pitágoras",
            "descripcion": "Uso combinado con funciones trigonométricas para encontrar lados faltantes.",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "mat-trig-3-3",
        "codigo": "3.3",
        "titulo": "Ángulos notables y cuadrantales",
        "orden": 3,
        "status": "publicado",
        "children": [
          {
            "id": "mat-trig-3-3-1",
            "codigo": "3.3.1",
            "titulo": "Valores exactos",
            "descripcion": "30°, 45°, 60° — memorización o deducción geométrica.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "mat-trig-3-3-2",
            "codigo": "3.3.2",
            "titulo": "Ángulos cuadrantales",
            "descripcion": "0°, 90°, 180°, 270° y 360° basados en el círculo unitario.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "mat-trig-3-3-3",
            "codigo": "3.3.3",
            "titulo": "Signos por cuadrante",
            "descripcion": "Determinación del signo (+ o -) de cada función en los cuatro cuadrantes.",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "mat-trig-3-4",
        "codigo": "3.4",
        "titulo": "Identidades trigonométricas",
        "orden": 4,
        "status": "publicado",
        "children": [
          {
            "id": "mat-trig-3-4-1",
            "codigo": "3.4.1",
            "titulo": "Identidades recíprocas",
            "descripcion": "csc(x) = 1/sen(x), sec(x) = 1/cos(x), cot(x) = 1/tan(x).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "mat-trig-3-4-2",
            "codigo": "3.4.2",
            "titulo": "Identidades de cociente",
            "descripcion": "tan(x) = sen(x)/cos(x), cot(x) = cos(x)/sen(x).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "mat-trig-3-4-3",
            "codigo": "3.4.3",
            "titulo": "Identidades pitagóricas",
            "descripcion": "sen²(x) + cos²(x) = 1, tan²(x) + 1 = sec²(x), cot²(x) + 1 = csc²(x).",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "mat-trig-3-5",
        "codigo": "3.5",
        "titulo": "Ley de Senos y Ley de Cosenos",
        "orden": 5,
        "status": "publicado",
        "children": [
          {
            "id": "mat-trig-3-5-1",
            "codigo": "3.5.1",
            "titulo": "Triángulos oblicuángulos",
            "descripcion": "Ley de Senos: a/sen(A) = b/sen(B) = c/sen(C) (AAL o LLA). Ley de Cosenos: a² = b² + c² - 2bc·cos(A) (LAL o LLL).",
            "orden": 1,
            "status": "publicado"
          }
        ]
      }
    ]
  },
  {
    "id": "mat-geo-analitica",
    "codigo": "4",
    "titulo": "Geometría Analítica",
    "orden": 4,
    "status": "publicado",
    "children": [
      {
        "id": "mat-geo-4-1",
        "codigo": "4.1",
        "titulo": "Conceptos fundamentales en el plano cartesiano",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "mat-geo-4-1-1",
            "codigo": "4.1.1",
            "titulo": "Distancia entre dos puntos",
            "descripcion": "d = √((x₂-x₁)² + (y₂-y₁)²).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "mat-geo-4-1-2",
            "codigo": "4.1.2",
            "titulo": "Punto medio de un segmento",
            "descripcion": "P_m = ((x₁+x₂)/2, (y₁+y₂)/2).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "mat-geo-4-1-3",
            "codigo": "4.1.3",
            "titulo": "Pendiente de una recta",
            "descripcion": "m = (y₂-y₁)/(x₂-x₁). Ángulo de inclinación θ = arctan(m).",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "mat-geo-4-2",
        "codigo": "4.2",
        "titulo": "La línea recta",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "mat-geo-4-2-1",
            "codigo": "4.2.1",
            "titulo": "Formas de la ecuación de la recta",
            "descripcion": "Punto-Pendiente: y-y₁ = m(x-x₁). Ordinaria: y = mx+b. Simétrica: x/a + y/b = 1. General: Ax+By+C = 0.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "mat-geo-4-2-2",
            "codigo": "4.2.2",
            "titulo": "Relaciones entre dos rectas",
            "descripcion": "Paralelismo: m₁ = m₂. Perpendicularidad: m₁·m₂ = -1.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "mat-geo-4-2-3",
            "codigo": "4.2.3",
            "titulo": "Distancia de un punto a una recta",
            "descripcion": "d = |Ax₁+By₁+C| / √(A²+B²).",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "mat-geo-4-3",
        "codigo": "4.3",
        "titulo": "Secciones cónicas",
        "orden": 3,
        "status": "publicado",
        "children": [
          {
            "id": "mat-geo-4-3-1",
            "codigo": "4.3.1",
            "titulo": "Circunferencia",
            "descripcion": "Centro origen: x²+y² = r². Centro (h,k): (x-h)²+(y-k)² = r². General: x²+y²+Dx+Ey+F = 0; completar cuadrados.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "mat-geo-4-3-2",
            "codigo": "4.3.2",
            "titulo": "Parábola",
            "descripcion": "Foco, directriz, eje focal, vértice, LR = |4p|. V(0,0): y² = ±4px o x² = ±4py. V(h,k): (y-k)² = ±4p(x-h) o (x-h)² = ±4p(y-k).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "mat-geo-4-3-3",
            "codigo": "4.3.3",
            "titulo": "Elipse",
            "descripcion": "Vértices, focos, ejes 2a y 2b, a² = b²+c², e = c/a < 1, LR = 2b²/a. Ecuaciones horizontal/vertical con centro en origen o (h,k).",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "mat-geo-4-3-4",
            "codigo": "4.3.4",
            "titulo": "Hipérbola",
            "descripcion": "Vértices, focos, ejes 2a y 2b, c² = a²+b², e = c/a > 1, asíntotas. Ecuaciones horizontal/vertical con centro en origen o (h,k).",
            "orden": 4,
            "status": "publicado"
          },
          {
            "id": "mat-geo-4-3-5",
            "codigo": "4.3.5",
            "titulo": "Ecuación general de segundo grado",
            "descripcion": "Ax²+Bxy+Cy²+Dx+Ey+F = 0 (B=0 usualmente): A=C circunferencia; A=0 o C=0 parábola; A≠C mismo signo elipse; signos opuestos hipérbola.",
            "orden": 5,
            "status": "publicado"
          }
        ]
      }
    ]
  },
  {
    "id": "mat-calc-diff",
    "codigo": "5",
    "titulo": "Cálculo Diferencial (mayor profundidad Área 1 y 2)",
    "orden": 5,
    "status": "publicado",
    "children": [
      {
        "id": "mat-calc-diff-5-1",
        "codigo": "5.1",
        "titulo": "Límites",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "mat-calc-diff-5-1-1",
            "codigo": "5.1.1",
            "titulo": "Concepto de límite",
            "descripcion": "Comportamiento de f(x) cuando x se aproxima a c.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "mat-calc-diff-5-1-2",
            "codigo": "5.1.2",
            "titulo": "Teoremas de los límites",
            "descripcion": "Suma, resta, producto, cociente y potencia de límites.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "mat-calc-diff-5-1-3",
            "codigo": "5.1.3",
            "titulo": "Límites determinados",
            "descripcion": "Evaluación por sustitución directa.",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "mat-calc-diff-5-1-4",
            "codigo": "5.1.4",
            "titulo": "Límites indeterminados 0/0",
            "descripcion": "Factorización (diferencia de cuadrados, trinomios) o racionalización (conjugado).",
            "orden": 4,
            "status": "publicado"
          },
          {
            "id": "mat-calc-diff-5-1-5",
            "codigo": "5.1.5",
            "titulo": "Límites al infinito",
            "descripcion": "Forma ∞/∞: dividir entre la mayor potencia del denominador.",
            "orden": 5,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "mat-calc-diff-5-2",
        "codigo": "5.2",
        "titulo": "La derivada",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "mat-calc-diff-5-2-1",
            "codigo": "5.2.1",
            "titulo": "Definición analítica",
            "descripcion": "f'(x) = lim(Δx→0) [f(x+Δx)-f(x)]/Δx (método de los cuatro pasos).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "mat-calc-diff-5-2-2",
            "codigo": "5.2.2",
            "titulo": "Interpretación geométrica",
            "descripcion": "Derivada como pendiente de la recta tangente en un punto.",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "mat-calc-diff-5-3",
        "codigo": "5.3",
        "titulo": "Reglas de derivación",
        "orden": 3,
        "status": "publicado",
        "children": [
          {
            "id": "mat-calc-diff-5-3-1",
            "codigo": "5.3.1",
            "titulo": "Funciones algebraicas",
            "descripcion": "Constante, x, constante por función, xⁿ, suma/resta.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "mat-calc-diff-5-3-2",
            "codigo": "5.3.2",
            "titulo": "Reglas complejas",
            "descripcion": "Producto [u·v]' = u·v' + v·u'. Cociente [u/v]' = (v·u' - u·v')/v².",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "mat-calc-diff-5-3-3",
            "codigo": "5.3.3",
            "titulo": "Regla de la cadena",
            "descripcion": "Derivación de funciones compuestas [u(x)]ⁿ.",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "mat-calc-diff-5-4",
        "codigo": "5.4",
        "titulo": "Derivadas de funciones trascendentes",
        "orden": 4,
        "status": "publicado",
        "children": [
          {
            "id": "mat-calc-diff-5-4-1",
            "codigo": "5.4.1",
            "titulo": "Trigonométricas",
            "descripcion": "Derivadas de sen(u), cos(u), tan(u), cot(u), sec(u), csc(u) con regla de la cadena.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "mat-calc-diff-5-4-2",
            "codigo": "5.4.2",
            "titulo": "Exponenciales y logarítmicas",
            "descripcion": "Derivadas de ln(u), log_a(u), e^u y a^u.",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "mat-calc-diff-5-5",
        "codigo": "5.5",
        "titulo": "Aplicaciones de la derivada",
        "orden": 5,
        "status": "publicado",
        "children": [
          {
            "id": "mat-calc-diff-5-5-1",
            "codigo": "5.5.1",
            "titulo": "Rectas tangente y normal",
            "descripcion": "Ecuación de la tangente y de la normal (perpendicular) a una curva en un punto.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "mat-calc-diff-5-5-2",
            "codigo": "5.5.2",
            "titulo": "Criterio de la primera derivada",
            "descripcion": "Puntos críticos; intervalos creciente (f' positiva) y decreciente (f' negativa); máximos y mínimos locales.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "mat-calc-diff-5-5-3",
            "codigo": "5.5.3",
            "titulo": "Criterio de la segunda derivada",
            "descripcion": "Máximo si f'' negativa, mínimo si f'' positiva.",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "mat-calc-diff-5-5-4",
            "codigo": "5.5.4",
            "titulo": "Problemas de optimización",
            "descripcion": "Maximizar áreas, volúmenes o ganancias; minimizar costos con derivadas.",
            "orden": 4,
            "status": "publicado"
          }
        ]
      }
    ]
  },
  {
    "id": "mat-calc-int",
    "codigo": "6",
    "titulo": "Cálculo Integral (mayor profundidad Área 1 y 2)",
    "orden": 6,
    "status": "publicado",
    "children": [
      {
        "id": "mat-calc-int-6-1",
        "codigo": "6.1",
        "titulo": "La integral indefinida",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "mat-calc-int-6-1-1",
            "codigo": "6.1.1",
            "titulo": "Concepto",
            "descripcion": "Integración como antiderivada (inversa de la derivación). Constante de integración C.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "mat-calc-int-6-1-2",
            "codigo": "6.1.2",
            "titulo": "Propiedades de linealidad",
            "descripcion": "Constante por función; integración de sumas y restas.",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "mat-calc-int-6-2",
        "codigo": "6.2",
        "titulo": "Fórmulas de integración inmediata",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "mat-calc-int-6-2-1",
            "codigo": "6.2.1",
            "titulo": "Integrales algebraicas",
            "descripcion": "∫k dx, ∫xⁿ dx (n≠-1), ∫(1/x)dx = ln|x|.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "mat-calc-int-6-2-2",
            "codigo": "6.2.2",
            "titulo": "Integrales trascendentes",
            "descripcion": "∫eˣ dx, ∫sen(x) dx, ∫cos(x) dx, ∫sec²(x) dx.",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "mat-calc-int-6-3",
        "codigo": "6.3",
        "titulo": "Métodos de integración básicos",
        "orden": 3,
        "status": "publicado",
        "children": [
          {
            "id": "mat-calc-int-6-3-1",
            "codigo": "6.3.1",
            "titulo": "Cambio de variable (sustitución)",
            "descripcion": "Identificar u, obtener du, completar la integral.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "mat-calc-int-6-3-2",
            "codigo": "6.3.2",
            "titulo": "Integración por partes",
            "descripcion": "∫u dv = u·v - ∫v du. Regla ILATE para elegir u.",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "mat-calc-int-6-4",
        "codigo": "6.4",
        "titulo": "La integral definida",
        "orden": 4,
        "status": "publicado",
        "children": [
          {
            "id": "mat-calc-int-6-4-1",
            "codigo": "6.4.1",
            "titulo": "Teorema Fundamental del Cálculo",
            "descripcion": "∫ₐᵇ f(x)dx = F(b) - F(a).",
            "orden": 1,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "mat-calc-int-6-5",
        "codigo": "6.5",
        "titulo": "Aplicaciones de la integral",
        "orden": 5,
        "status": "publicado",
        "children": [
          {
            "id": "mat-calc-int-6-5-1",
            "codigo": "6.5.1",
            "titulo": "Áreas bajo la curva",
            "descripcion": "Área acotada por f(x), eje X y rectas x=a, x=b.",
            "orden": 1,
            "status": "publicado"
          }
        ]
      }
    ]
  }
] as UnamTemarioTopic[];
