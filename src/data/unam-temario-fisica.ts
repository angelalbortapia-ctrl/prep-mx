import type { UnamTemarioTopic } from './unam-temario';

/** Temario ultra-detallado de Física — Examen UNAM. */
export const UNAM_FISICA_TOPICS: UnamTemarioTopic[] = [
  {
    "id": "fis-cinematica",
    "codigo": "1",
    "titulo": "Cinemática",
    "orden": 1,
    "status": "publicado",
    "children": [
      {
        "id": "fis-cinematica-1-1",
        "codigo": "1.1",
        "titulo": "Conceptos básicos del movimiento",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "fis-cinematica-1-1-1",
            "codigo": "1.1.1",
            "titulo": "Sistemas de referencia",
            "descripcion": "Definición de observador, sistemas de referencia absolutos y relativos.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fis-cinematica-1-1-2",
            "codigo": "1.1.2",
            "titulo": "Magnitudes escalares y vectoriales",
            "descripcion": "Diferencia entre distancia (escalar) y desplazamiento (vectorial); diferencia entre rapidez (escalar) y velocidad (vectorial).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "fis-cinematica-1-1-3",
            "codigo": "1.1.3",
            "titulo": "Variables cinemáticas",
            "descripcion": "Definición de posición, trayectoria, tiempo y aceleración (cambio de velocidad por unidad de tiempo).",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "fis-cinematica-1-2",
        "codigo": "1.2",
        "titulo": "Movimiento Rectilíneo Uniforme (MRU)",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "fis-cinematica-1-2-1",
            "codigo": "1.2.1",
            "titulo": "Características fundamentales",
            "descripcion": "Velocidad constante en magnitud, dirección y sentido; aceleración igual a cero; trayectorias en línea recta.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fis-cinematica-1-2-2",
            "codigo": "1.2.2",
            "titulo": "Ecuación matemática",
            "descripcion": "Uso y despejes de v = d/t (d = v·t; t = d/v). Problemas de trenes o móviles que se encuentran o se alejan.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "fis-cinematica-1-2-3",
            "codigo": "1.2.3",
            "titulo": "Análisis gráfico del MRU",
            "descripcion": "Gráfica Posición vs. Tiempo (x-t): Línea recta diagonal cuya pendiente representa la velocidad. Gráfica Velocidad vs. Tiempo (v-t): Línea recta horizontal donde el área bajo la curva representa la distancia recorrida.",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "fis-cinematica-1-3",
        "codigo": "1.3",
        "titulo": "Movimiento Rectilíneo Uniformemente Acelerado (MRUA)",
        "orden": 3,
        "status": "publicado",
        "children": [
          {
            "id": "fis-cinematica-1-3-1",
            "codigo": "1.3.1",
            "titulo": "Características fundamentales",
            "descripcion": "Aceleración constante diferente de cero; cambios de velocidad uniformes en intervalos de tiempo iguales.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fis-cinematica-1-3-2",
            "codigo": "1.3.2",
            "titulo": "Ecuaciones de la cinemática lineal",
            "descripcion": "a = (v_f - v_i)/t, v_f = v_i + a·t, d = v_i·t + (a·t²)/2, v_f² = v_i² + 2a·d, d = ((v_i + v_f)/2)·t.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "fis-cinematica-1-3-3",
            "codigo": "1.3.3",
            "titulo": "Casos operativos",
            "descripcion": "Problemas de frenado (aceleración negativa), autos que arrancan del reposo (v_i = 0) y rebasamiento.",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "fis-cinematica-1-3-4",
            "codigo": "1.3.4",
            "titulo": "Análisis gráfico del MRUA",
            "descripcion": "Gráfica Posición vs. Tiempo (x-t): Curva parabólica. Gráfica Velocidad vs. Tiempo (v-t): Línea recta diagonal cuya pendiente es la aceleración. Gráfica Aceleración vs. Tiempo (a-t): Línea recta horizontal.",
            "orden": 4,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "fis-cinematica-1-4",
        "codigo": "1.4",
        "titulo": "Caída Libre y Tiro Vertical",
        "orden": 4,
        "status": "publicado",
        "children": [
          {
            "id": "fis-cinematica-1-4-1",
            "codigo": "1.4.1",
            "titulo": "Caída Libre",
            "descripcion": "Condiciones ideales sin resistencia del aire, v_i = 0. Ecuaciones: v_f = g·t; h = (g·t²)/2; v_f² = 2g·h (g ≈ 9.8 o 10 m/s²).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fis-cinematica-1-4-2",
            "codigo": "1.4.2",
            "titulo": "Tiro Vertical",
            "descripcion": "v_i > 0, gravedad como desaceleración. En altura máxima v_f = 0. h_máx = v_i²/(2g); t_s = v_i/g.",
            "orden": 2,
            "status": "publicado"
          }
        ]
      }
    ],
    "guideSlug": "fisica"
  },
  {
    "id": "fis-newton",
    "codigo": "2",
    "titulo": "Fuerzas, Leyes de Newton y Ley de la Gravitación Universal",
    "orden": 2,
    "status": "publicado",
    "children": [
      {
        "id": "fis-newton-2-1",
        "codigo": "2.1",
        "titulo": "Concepto de Fuerza y Vectores",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "fis-newton-2-1-1",
            "codigo": "2.1.1",
            "titulo": "Definición de fuerza",
            "descripcion": "Interacción entre dos cuerpos. Unidad: Newton (N = kg·m/s²).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fis-newton-2-1-2",
            "codigo": "2.1.2",
            "titulo": "Carácter vectorial",
            "descripcion": "F_x = F·cos θ; F_y = F·sen θ; F_R = √(F_x² + F_y²).",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "fis-newton-2-2",
        "codigo": "2.2",
        "titulo": "Leyes de la Dinámica (Leyes de Newton)",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "fis-newton-2-2-1",
            "codigo": "2.2.1",
            "titulo": "Primera Ley (Inercia)",
            "descripcion": "Reposo o MRU salvo fuerza externa neta.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fis-newton-2-2-2",
            "codigo": "2.2.2",
            "titulo": "Segunda Ley",
            "descripcion": "F = m·a.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "fis-newton-2-2-3",
            "codigo": "2.2.3",
            "titulo": "Tercera Ley",
            "descripcion": "Acción y reacción, cuerpos diferentes.",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "fis-newton-2-3",
        "codigo": "2.3",
        "titulo": "Estática y Equilibrio",
        "orden": 3,
        "status": "publicado",
        "children": [
          {
            "id": "fis-newton-2-3-1",
            "codigo": "2.3.1",
            "titulo": "Equilibrio traslacional",
            "descripcion": "Σ F_x = 0; Σ F_y = 0.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fis-newton-2-3-2",
            "codigo": "2.3.2",
            "titulo": "Equilibrio rotacional",
            "descripcion": "Σ τ = 0; τ = F·d·sen θ.",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "fis-newton-2-4",
        "codigo": "2.4",
        "titulo": "Ley de la Gravitación Universal",
        "orden": 4,
        "status": "publicado",
        "children": [
          {
            "id": "fis-newton-2-4-1",
            "codigo": "2.4.1",
            "titulo": "Enunciado",
            "descripcion": "Proporcional a masas, inverso al cuadrado de distancia.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fis-newton-2-4-2",
            "codigo": "2.4.2",
            "titulo": "Ecuación",
            "descripcion": "F = G·m₁·m₂/d², G = 6.67 × 10⁻¹¹ N·m²/kg².",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "fis-newton-2-4-3",
            "codigo": "2.4.3",
            "titulo": "Variaciones proporcionales UNAM",
            "descripcion": "Variaciones proporcionales UNAM.",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "fis-newton-2-4-4",
            "codigo": "2.4.4",
            "titulo": "Masa vs Peso",
            "descripcion": "P = m·g.",
            "orden": 4,
            "status": "publicado"
          }
        ]
      }
    ]
  },
  {
    "id": "fis-energia",
    "codigo": "3",
    "titulo": "Trabajo, Potencia y Energía",
    "orden": 3,
    "status": "publicado",
    "children": [
      {
        "id": "fis-energia-3-1",
        "codigo": "3.1",
        "titulo": "Trabajo Mecánico (W)",
        "descripcion": "W = F·d·cos θ. Joule (J = N·m).",
        "orden": 1,
        "status": "publicado"
      },
      {
        "id": "fis-energia-3-2",
        "codigo": "3.2",
        "titulo": "Potencia (P)",
        "descripcion": "P = W/t, P = F·v. Watt, HP ≈ 746 W.",
        "orden": 2,
        "status": "publicado"
      },
      {
        "id": "fis-energia-3-3",
        "codigo": "3.3",
        "titulo": "Energía",
        "descripcion": "E_c = ½mv²; E_p = mgh; conservación E_c1 + E_p1 = E_c2 + E_p2; W_neto = ΔE_c.",
        "orden": 3,
        "status": "publicado"
      }
    ]
  },
  {
    "id": "fis-fluidos",
    "codigo": "4",
    "titulo": "Mecánica de Fluidos",
    "orden": 4,
    "status": "publicado",
    "children": [
      {
        "id": "fis-fluidos-4-1",
        "codigo": "4.1",
        "titulo": "Propiedades",
        "descripcion": "ρ = m/V; γ = P/V = ρg; P = F/A (Pascal).",
        "orden": 1,
        "status": "publicado"
      },
      {
        "id": "fis-fluidos-4-2",
        "codigo": "4.2",
        "titulo": "Hidrostática",
        "descripcion": "P_h = ρgh; presión atmosférica; Pascal f/a = F/A; Arquímedes E = ρ_fluido·g·V_sumergido.",
        "orden": 2,
        "status": "publicado"
      },
      {
        "id": "fis-fluidos-4-3",
        "codigo": "4.3",
        "titulo": "Hidrodinámica",
        "descripcion": "G = V/t = A·v; continuidad A₁v₁ = A₂v₂.",
        "orden": 3,
        "status": "publicado"
      }
    ]
  },
  {
    "id": "fis-termo",
    "codigo": "5",
    "titulo": "Termodinámica",
    "orden": 5,
    "status": "publicado",
    "children": [
      {
        "id": "fis-termo-5-1",
        "codigo": "5.1",
        "titulo": "Escalas",
        "descripcion": "T_K = T_C + 273.15; conversiones F/C.",
        "orden": 1,
        "status": "publicado"
      },
      {
        "id": "fis-termo-5-2",
        "codigo": "5.2",
        "titulo": "Calor y transferencia",
        "descripcion": "Calor y transferencia.",
        "orden": 2,
        "status": "publicado"
      },
      {
        "id": "fis-termo-5-3",
        "codigo": "5.3",
        "titulo": "Calorimetría",
        "descripcion": "Q = mcΔT; equilibrio térmico; calor latente.",
        "orden": 3,
        "status": "publicado"
      },
      {
        "id": "fis-termo-5-4",
        "codigo": "5.4",
        "titulo": "Leyes",
        "descripcion": "ΔU = Q - W; segunda ley, entropía.",
        "orden": 4,
        "status": "publicado"
      }
    ]
  },
  {
    "id": "fis-ondas",
    "codigo": "6",
    "titulo": "Ondas y Acústica",
    "orden": 6,
    "status": "publicado",
    "children": [
      {
        "id": "fis-ondas-6-1",
        "codigo": "6.1",
        "titulo": "Características",
        "descripcion": "Transversales/longitudinales; f = 1/T; v = λf.",
        "orden": 1,
        "status": "publicado"
      },
      {
        "id": "fis-ondas-6-2",
        "codigo": "6.2",
        "titulo": "Fenómenos",
        "descripcion": "Reflexión, refracción, difracción, interferencia, Doppler.",
        "orden": 2,
        "status": "publicado"
      }
    ]
  },
  {
    "id": "fis-electro",
    "codigo": "7",
    "titulo": "Electromagnetismo",
    "orden": 7,
    "status": "publicado",
    "children": [
      {
        "id": "fis-electro-7-1",
        "codigo": "7.1",
        "titulo": "Electroestática",
        "descripcion": "Coulomb F = k·q₁·q₂/d²; campo E = F/q.",
        "orden": 1,
        "status": "publicado"
      },
      {
        "id": "fis-electro-7-2",
        "codigo": "7.2",
        "titulo": "Circuitos",
        "descripcion": "Ohm I = V/R; serie/paralelo; potencia P = VI.",
        "orden": 2,
        "status": "publicado"
      },
      {
        "id": "fis-electro-7-3",
        "codigo": "7.3",
        "titulo": "Magnetismo",
        "descripcion": "Oersted, Faraday.",
        "orden": 3,
        "status": "publicado"
      }
    ]
  },
  {
    "id": "fis-optica",
    "codigo": "8",
    "titulo": "Óptica",
    "orden": 8,
    "status": "publicado",
    "children": [
      {
        "id": "fis-optica-8-1",
        "codigo": "8.1",
        "titulo": "Luz",
        "descripcion": "c ≈ 3 × 10⁸ m/s.",
        "orden": 1,
        "status": "publicado"
      },
      {
        "id": "fis-optica-8-2",
        "codigo": "8.2",
        "titulo": "Geométrica",
        "descripcion": "Snell n₁·sen θ₁ = n₂·sen θ₂; espejos y lentes.",
        "orden": 2,
        "status": "publicado"
      }
    ]
  },
  {
    "id": "fis-contemp",
    "codigo": "9",
    "titulo": "Física Contemporánea",
    "orden": 9,
    "status": "publicado",
    "children": [
      {
        "id": "fis-contemp-9-1",
        "codigo": "9.1",
        "titulo": "Fotón y radiactividad",
        "descripcion": "E = hf; radiactividad α, β, γ; fisión y fusión.",
        "orden": 1,
        "status": "publicado"
      }
    ]
  }
] as UnamTemarioTopic[];
