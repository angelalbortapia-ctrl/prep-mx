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
            "descripcion": "Gráfica Posición vs. Tiempo (x-t): línea recta diagonal cuya pendiente representa la velocidad. Gráfica Velocidad vs. Tiempo (v-t): línea recta horizontal donde el área bajo la curva representa la distancia recorrida.",
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
            "titulo": "Ecuaciones del cinemática lineal",
            "descripcion": "a = (v_f − v_i)/t; v_f = v_i + a·t; d = v_i·t + (a·t²)/2; v_f² = v_i² + 2a·d; d = ((v_i + v_f)/2)·t.",
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
            "descripcion": "Gráfica Posición vs. Tiempo (x-t): curva parabólica. Gráfica Velocidad vs. Tiempo (v-t): línea recta diagonal cuya pendiente es la aceleración. Gráfica Aceleración vs. Tiempo (a-t): línea recta horizontal.",
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
            "descripcion": "Condiciones ideales: sin resistencia del aire, objeto que se suelta desde una altura h (v_i = 0). Ecuaciones con g ≈ 9.8 m/s² (o 10 m/s² en examen): v_f = g·t; h = (g·t²)/2; v_f² = 2g·h.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fis-cinematica-1-4-2",
            "codigo": "1.4.2",
            "titulo": "Tiro Vertical",
            "descripcion": "El objeto se lanza hacia arriba con velocidad inicial (v_i > 0). La gravedad actúa como desaceleración al subir. En la altura máxima la velocidad instantánea es cero (v_f = 0). El tiempo de subida es idéntico al de bajada. h_máx = v_i²/(2g); t_s = v_i/g.",
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
            "descripcion": "Interacción entre dos cuerpos capaz de modificar el estado de reposo, de movimiento o producir una deformación. Unidad en el SI: el Newton (N = kg·m/s²).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fis-newton-2-1-2",
            "codigo": "2.1.2",
            "titulo": "Carácter vectorial",
            "descripcion": "Suma de fuerzas concurrentes mediante descomposición analítica en componentes rectangulares (F_x = F·cos θ; F_y = F·sen θ) y cálculo de la fuerza resultante (F_R = √(F_x² + F_y²)).",
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
            "titulo": "Primera Ley de Newton (Ley de la Inercia)",
            "descripcion": "Todo cuerpo permanece en su estado de reposo o de movimiento rectilíneo uniforme a menos que una fuerza externa neta actúe sobre él. Concepto de inercia y su relación directa con la masa.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fis-newton-2-2-2",
            "codigo": "2.2.2",
            "titulo": "Segunda Ley de Newton",
            "descripcion": "La aceleración de un cuerpo es directamente proporcional a la fuerza neta que actúa sobre él e inversamente proporcional a su masa. Ecuación: F = m·a. Problemas típicos: cálculo de la fuerza para acelerar bloques y masas en planos horizontales lisos.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "fis-newton-2-2-3",
            "codigo": "2.2.3",
            "titulo": "Tercera Ley de Newton",
            "descripcion": "A toda fuerza de acción le corresponde una fuerza de reacción de igual magnitud y dirección, pero en sentido opuesto, actuando en cuerpos diferentes (nunca se anulan entre sí).",
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
            "titulo": "Primera condición de equilibrio (traslacional)",
            "descripcion": "La suma vectorial de todas las fuerzas que actúan sobre un cuerpo debe ser cero (∑F_x = 0; ∑F_y = 0).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fis-newton-2-3-2",
            "codigo": "2.3.2",
            "titulo": "Segunda condición de equilibrio (rotacional)",
            "descripcion": "La suma de los momentos o torques respecto a cualquier punto debe ser cero (∑τ = 0). Torque: τ = F·d·sen θ (fuerza por brazo de palanca). Convención: antihorario (+), horario (−). Problemas: palancas, balancines, vigas apoyadas.",
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
            "descripcion": "La fuerza de atracción entre dos cuerpos es directamente proporcional al producto de sus masas e inversamente proporcional al cuadrado de la distancia que los separa.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fis-newton-2-4-2",
            "codigo": "2.4.2",
            "titulo": "Ecuación",
            "descripcion": "F = G·(m₁·m₂)/d², donde G es la constante de gravitación universal (6.67 × 10⁻¹¹ N·m²/kg²).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "fis-newton-2-4-3",
            "codigo": "2.4.3",
            "titulo": "Variaciones proporcionales (pregunta clásica UNAM)",
            "descripcion": "Qué pasa con la fuerza si una masa se duplica, o si la distancia se reduce a la mitad (relación inversa del cuadrado).",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "fis-newton-2-4-4",
            "codigo": "2.4.4",
            "titulo": "Distinción entre Masa y Peso",
            "descripcion": "Masa como cantidad de materia (constante en el universo); peso como fuerza gravitacional dependiente del lugar (P = m·g).",
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
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "fis-energia-3-1-1",
            "codigo": "3.1.1",
            "titulo": "Definición",
            "descripcion": "Producto de la componente de la fuerza en la dirección del movimiento por el desplazamiento del cuerpo. Unidad en el SI: Joule (J = N·m).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fis-energia-3-1-2",
            "codigo": "3.1.2",
            "titulo": "Ecuación",
            "descripcion": "W = F·d·cos θ.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "fis-energia-3-1-3",
            "codigo": "3.1.3",
            "titulo": "Casos particulares",
            "descripcion": "Trabajo máximo (θ = 0°), trabajo nulo (θ = 90°, fuerzas perpendiculares al movimiento como la normal), y trabajo negativo (θ = 180°, fuerza de fricción).",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "fis-energia-3-2",
        "codigo": "3.2",
        "titulo": "Potencia Mecánica (P)",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "fis-energia-3-2-1",
            "codigo": "3.2.1",
            "titulo": "Definición",
            "descripcion": "Rapidez con la que se realiza un trabajo mecánico. Unidad en el SI: Watt (W = J/s). Otras unidades: caballo de fuerza (HP ≈ 746 W).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fis-energia-3-2-2",
            "codigo": "3.2.2",
            "titulo": "Ecuaciones",
            "descripcion": "P = W/t y su equivalencia con velocidad constante P = F·v.",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "fis-energia-3-3",
        "codigo": "3.3",
        "titulo": "Energía Mecánica y su Conservación",
        "orden": 3,
        "status": "publicado",
        "children": [
          {
            "id": "fis-energia-3-3-1",
            "codigo": "3.3.1",
            "titulo": "Energía Cinética (E_c)",
            "descripcion": "Energía asociada al estado de movimiento de un cuerpo. Fórmula: E_c = ½·m·v².",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fis-energia-3-3-2",
            "codigo": "3.3.2",
            "titulo": "Energía Potencial Gravitatoria (E_p)",
            "descripcion": "Energía almacenada en virtud de la posición respecto a una altura de referencia. Fórmula: E_p = m·g·h.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "fis-energia-3-3-3",
            "codigo": "3.3.3",
            "titulo": "Ley de la Conservación de la Energía Mecánica",
            "descripcion": "En ausencia de fricción (sistemas conservativos), la energía mecánica total se mantiene constante (E_M1 = E_M2 → E_c1 + E_p1 = E_c2 + E_p2).",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "fis-energia-3-3-4",
            "codigo": "3.3.4",
            "titulo": "Teorema del Trabajo y la Energía",
            "descripcion": "El trabajo neto realizado sobre un objeto es igual al cambio en su energía cinética (W_neto = ΔE_c = E_cf − E_ci).",
            "orden": 4,
            "status": "publicado"
          }
        ]
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
        "titulo": "Propiedades de los fluidos",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "fis-fluidos-4-1-1",
            "codigo": "4.1.1",
            "titulo": "Densidad (ρ)",
            "descripcion": "Masa por unidad de volumen (ρ = m/V).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fis-fluidos-4-1-2",
            "codigo": "4.1.2",
            "titulo": "Peso específico (γ)",
            "descripcion": "Peso de una sustancia por unidad de volumen (γ = P/V = ρ·g).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "fis-fluidos-4-1-3",
            "codigo": "4.1.3",
            "titulo": "Presión (P)",
            "descripcion": "Fuerza normal ejercida por unidad de área (P = F/A). Unidad en el SI: Pascal (Pa = N/m²).",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "fis-fluidos-4-2",
        "codigo": "4.2",
        "titulo": "Hidrostática (fluidos en reposo)",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "fis-fluidos-4-2-1",
            "codigo": "4.2.1",
            "titulo": "Presión Hidrostática",
            "descripcion": "Presión ejercida por el peso de una columna de fluido. Fórmula: P_h = ρ·g·h. A mayor profundidad, mayor presión.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fis-fluidos-4-2-2",
            "codigo": "4.2.2",
            "titulo": "Presión Atmosférica y Absoluta",
            "descripcion": "Presión de la capa de aire terrestre (Torricelli: 1 atm ≈ 760 mmHg ≈ 1.013 × 10⁵ Pa). Presión absoluta: P_abs = P_atm + P_h.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "fis-fluidos-4-2-3",
            "codigo": "4.2.3",
            "titulo": "Principio de Pascal",
            "descripcion": "Toda presión ejercida sobre un fluido encerrado se transmite íntegramente a todas las direcciones y a las paredes del recipiente. Prensa hidráulica: f/a = F/A (multiplicación de fuerzas con distintas áreas de émbolos).",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "fis-fluidos-4-2-4",
            "codigo": "4.2.4",
            "titulo": "Principio de Arquímedes",
            "descripcion": "Todo cuerpo sumergido experimenta un empuje vertical hacia arriba igual al peso del volumen de fluido desalojado. E = ρ_fluido·g·V_sumergido. Flotación: E > P flota; E = P equilibrio; E < P se hunde.",
            "orden": 4,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "fis-fluidos-4-3",
        "codigo": "4.3",
        "titulo": "Hidrodinámica (fluidos en movimiento — básico)",
        "orden": 3,
        "status": "publicado",
        "children": [
          {
            "id": "fis-fluidos-4-3-1",
            "codigo": "4.3.1",
            "titulo": "Gasto o Caudal (G o Q)",
            "descripcion": "Volumen de fluido que pasa por una sección transversal por unidad de tiempo (G = V/t = A·v, donde A es el área y v la velocidad).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fis-fluidos-4-3-2",
            "codigo": "4.3.2",
            "titulo": "Ecuación de Continuidad",
            "descripcion": "Para un fluido incompresible, el gasto es constante a lo largo del conducto (A₁·v₁ = A₂·v₂). Si el área se reduce, la velocidad del fluido aumenta.",
            "orden": 2,
            "status": "publicado"
          }
        ]
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
        "titulo": "Temperatura y Escalas Termométricas",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "fis-termo-5-1-1",
            "codigo": "5.1.1",
            "titulo": "Definición",
            "descripcion": "Medida de la energía cinética promedio de las partículas de un cuerpo.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fis-termo-5-1-2",
            "codigo": "5.1.2",
            "titulo": "Fórmulas de conversión",
            "descripcion": "De Celsius a Kelvin: T_K = T_C + 273.15. De Celsius a Fahrenheit: T_F = 1.8(T_C) + 32. De Fahrenheit a Celsius: T_C = (T_F − 32)/1.8.",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "fis-termo-5-2",
        "codigo": "5.2",
        "titulo": "Calor y Transferencia Térmica",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "fis-termo-5-2-1",
            "codigo": "5.2.1",
            "titulo": "Definición de Calor (Q)",
            "descripcion": "Energía en tránsito debido a una diferencia de temperaturas. Unidades: caloría (cal), Joule (J). Equivalencia: 1 cal ≈ 4.186 J.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fis-termo-5-2-2",
            "codigo": "5.2.2",
            "titulo": "Mecanismos de propagación",
            "descripcion": "Conducción (contacto directo en sólidos), convección (movimiento de masas de fluidos en líquidos/gases), radiación (ondas electromagnéticas, no requiere medio material).",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "fis-termo-5-3",
        "codigo": "5.3",
        "titulo": "Calorimetría",
        "orden": 3,
        "status": "publicado",
        "children": [
          {
            "id": "fis-termo-5-3-1",
            "codigo": "5.3.1",
            "titulo": "Calor específico (c)",
            "descripcion": "Cantidad de calor requerida para elevar un grado de temperatura una unidad de masa de una sustancia.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fis-termo-5-3-2",
            "codigo": "5.3.2",
            "titulo": "Ecuación del calor sensible",
            "descripcion": "Q = m·c·ΔT = m·c·(T_f − T_i).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "fis-termo-5-3-3",
            "codigo": "5.3.3",
            "titulo": "Equilibrio térmico",
            "descripcion": "En un sistema aislado, el calor ganado por los cuerpos fríos es igual al calor perdido por los cuerpos calientes (Q_ganado = −Q_perdido).",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "fis-termo-5-3-4",
            "codigo": "5.3.4",
            "titulo": "Cambios de fase y Calor latente (L)",
            "descripcion": "Calor absorbido o cedido durante un cambio de estado físico sin alteración de temperatura (Q = m·L_f para fusión o Q = m·L_v para vaporización).",
            "orden": 4,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "fis-termo-5-4",
        "codigo": "5.4",
        "titulo": "Leyes de la Termodinámica",
        "orden": 4,
        "status": "publicado",
        "children": [
          {
            "id": "fis-termo-5-4-1",
            "codigo": "5.4.1",
            "titulo": "Ley Cero",
            "descripcion": "Si dos sistemas están en equilibrio térmico con un tercer sistema de forma independiente, están en equilibrio térmico entre sí (base del termómetro).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fis-termo-5-4-2",
            "codigo": "5.4.2",
            "titulo": "Primera Ley (Conservación de la energía)",
            "descripcion": "El cambio en la energía interna de un sistema es igual al calor neto transferido al sistema menos el trabajo realizado por el mismo. Ecuación: ΔU = Q − W (cuidado con la convención de signos de la guía UNAM).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "fis-termo-5-4-3",
            "codigo": "5.4.3",
            "titulo": "Segunda Ley",
            "descripcion": "El calor fluye espontáneamente de un cuerpo de mayor temperatura a uno de menor temperatura, nunca a la inversa. Introduce entropía (desorden del universo) y postula que ninguna máquina térmica puede tener eficiencia del 100%.",
            "orden": 3,
            "status": "publicado"
          }
        ]
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
        "titulo": "Características fundamentales de las ondas",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "fis-ondas-6-1-1",
            "codigo": "6.1.1",
            "titulo": "Clasificación por el medio de propagación",
            "descripcion": "Ondas mecánicas (requieren medio elástico como el sonido o cuerdas) y ondas electromagnéticas (se propagan en el vacío como la luz).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fis-ondas-6-1-2",
            "codigo": "6.1.2",
            "titulo": "Clasificación por la dirección de la vibración",
            "descripcion": "Ondas transversales (partículas vibran perpendicularmente a la propagación) y longitudinales (vibran en la misma dirección).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "fis-ondas-6-1-3",
            "codigo": "6.1.3",
            "titulo": "Anatomía y parámetros de una onda",
            "descripcion": "Cresta (punto más alto), valle (punto más bajo), amplitud (máximo desplazamiento), periodo (T: tiempo en completar un ciclo), frecuencia (f = 1/T: ciclos por segundo o Hertz, Hz), longitud de onda (λ: distancia entre dos crestas consecutivas).",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "fis-ondas-6-1-4",
            "codigo": "6.1.4",
            "titulo": "Ecuación de velocidad de propagación",
            "descripcion": "v = λ/T = λ·f.",
            "orden": 4,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "fis-ondas-6-2",
        "codigo": "6.2",
        "titulo": "Fenómenos ondulatorios",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "fis-ondas-6-2-1",
            "codigo": "6.2.1",
            "titulo": "Reflexión",
            "descripcion": "Choque contra un obstáculo y regreso al medio de origen.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fis-ondas-6-2-2",
            "codigo": "6.2.2",
            "titulo": "Refracción",
            "descripcion": "Cambio de dirección y velocidad al pasar de un medio a otro.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "fis-ondas-6-2-3",
            "codigo": "6.2.3",
            "titulo": "Difracción",
            "descripcion": "Propiedad de rodear obstáculos o pasar por rendijas.",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "fis-ondas-6-2-4",
            "codigo": "6.2.4",
            "titulo": "Interferencia",
            "descripcion": "Superposición de ondas (constructiva si se suman amplitudes, destructiva si se restan).",
            "orden": 4,
            "status": "publicado"
          },
          {
            "id": "fis-ondas-6-2-5",
            "codigo": "6.2.5",
            "titulo": "Efecto Doppler",
            "descripcion": "Cambio aparente en la frecuencia de una onda debido al movimiento relativo entre la fuente emisora y el observador (ej. la sirena de una ambulancia).",
            "orden": 5,
            "status": "publicado"
          }
        ]
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
        "titulo": "Electrostática",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "fis-electro-7-1-1",
            "codigo": "7.1.1",
            "titulo": "Carga eléctrica",
            "descripcion": "Propiedad intrínseca de la materia. Ley de conservación de la carga y cuantización (q = n·e). Ley de los signos: cargas iguales se repelen, opuestas se atraen.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fis-electro-7-1-2",
            "codigo": "7.1.2",
            "titulo": "Ley de Coulomb",
            "descripcion": "La fuerza entre dos cargas puntuales en reposo es directamente proporcional al producto de las cargas e inversamente proporcional al cuadrado de la distancia. F = k·(q₁·q₂)/d², con k ≈ 9 × 10⁹ N·m²/C² en el vacío.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "fis-electro-7-1-3",
            "codigo": "7.1.3",
            "titulo": "Campo Eléctrico (E⃗)",
            "descripcion": "Región del espacio que rodea a una carga donde se manifiestan fuerzas eléctricas. E = F/q y E = k·Q/d². Dirección: sale de cargas positivas y entra en las negativas.",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "fis-electro-7-2",
        "codigo": "7.2",
        "titulo": "Electrodinámica y Circuitos Eléctricos",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "fis-electro-7-2-1",
            "codigo": "7.2.1",
            "titulo": "Corriente eléctrica (I)",
            "descripcion": "Flujo ordenado de electrones a través de un conductor por unidad de tiempo (I = q/t). Unidad: Ampere (A).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fis-electro-7-2-2",
            "codigo": "7.2.2",
            "titulo": "Ley de Ohm",
            "descripcion": "La intensidad de corriente es directamente proporcional al voltaje aplicado e inversamente proporcional a la resistencia. I = V/R (o V = I·R). Unidad de resistencia: Ohm (Ω).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "fis-electro-7-2-3",
            "codigo": "7.2.3",
            "titulo": "Circuitos de Resistencias",
            "descripcion": "En serie: corriente constante (I_t = I₁ = I₂ = …), voltaje se suma (V_t = V₁ + V₂ + …), R_eq = R₁ + R₂ + R₃ + …. En paralelo: voltaje constante, corriente se divide, 1/R_eq = 1/R₁ + 1/R₂ + 1/R₃ + ….",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "fis-electro-7-2-4",
            "codigo": "7.2.4",
            "titulo": "Potencia Eléctrica",
            "descripcion": "Energía disipada o consumida por unidad de tiempo. P = V·I = I²·R = V²/R (Ley de Joule).",
            "orden": 4,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "fis-electro-7-3",
        "codigo": "7.3",
        "titulo": "Magnetismo y Electromagnetismo",
        "orden": 3,
        "status": "publicado",
        "children": [
          {
            "id": "fis-electro-7-3-1",
            "codigo": "7.3.1",
            "titulo": "Campos magnéticos",
            "descripcion": "Propiedades de los imanes (polos norte y sur inseparables).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fis-electro-7-3-2",
            "codigo": "7.3.2",
            "titulo": "Experimento de Oersted",
            "descripcion": "Descubrimiento de que una corriente eléctrica genera un campo magnético a su alrededor.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "fis-electro-7-3-3",
            "codigo": "7.3.3",
            "titulo": "Inducción Electromagnética (Ley de Faraday)",
            "descripcion": "Un campo magnético variable en el tiempo a través de una espira induce una fuerza electromotriz (voltaje) y, por ende, una corriente eléctrica inducida (principio de motores y generadores eléctricos).",
            "orden": 3,
            "status": "publicado"
          }
        ]
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
        "titulo": "Naturaleza de la luz",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "fis-optica-8-1-1",
            "codigo": "8.1.1",
            "titulo": "Modelo Dual",
            "descripcion": "Comportamiento ondulatorio (propagación, interferencia) y corpuscular (efecto fotoeléctrico, fotones). Velocidad en el vacío: c ≈ 3 × 10⁸ m/s.",
            "orden": 1,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "fis-optica-8-2",
        "codigo": "8.2",
        "titulo": "Óptica Geométrica",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "fis-optica-8-2-1",
            "codigo": "8.2.1",
            "titulo": "Reflexión de la luz",
            "descripcion": "Ley de la reflexión: el ángulo de incidencia es igual al ángulo de reflexión respecto a la línea normal.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fis-optica-8-2-2",
            "codigo": "8.2.2",
            "titulo": "Refracción e Índice de refracción (n)",
            "descripcion": "Relación entre la velocidad de la luz en el vacío y en un medio material (n = c/v). Ley de Snell: n₁·sen θ₁ = n₂·sen θ₂.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "fis-optica-8-2-3",
            "codigo": "8.2.3",
            "titulo": "Espejos y Lentes",
            "descripcion": "Espejos (reflejan la luz): planos (imágenes virtuales y simétricas) y esféricos (cóncavos y convexos). Lentes (refractan la luz): convergentes (lupas, hipermetropía) y divergentes (miopía).",
            "orden": 3,
            "status": "publicado"
          }
        ]
      }
    ]
  },
  {
    "id": "fis-contemp",
    "codigo": "9",
    "titulo": "Física Contemporánea (Básica)",
    "orden": 9,
    "status": "publicado",
    "children": [
      {
        "id": "fis-contemp-9-1",
        "codigo": "9.1",
        "titulo": "Estructura atómica y radiación",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "fis-contemp-9-1-1",
            "codigo": "9.1.1",
            "titulo": "El fotón",
            "descripcion": "El cuanto de energía electromagnética (E = h·f, donde h es la constante de Planck).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fis-contemp-9-1-2",
            "codigo": "9.1.2",
            "titulo": "Radiactividad nuclear",
            "descripcion": "Emisiones Alfa (α), Beta (β) y Gamma (γ). Procesos fundamentales de fisión (ruptura de núcleos pesados) y fusión nuclear (unión de núcleos ligeros como en las estrellas).",
            "orden": 2,
            "status": "publicado"
          }
        ]
      }
    ]
  }
] as UnamTemarioTopic[];
