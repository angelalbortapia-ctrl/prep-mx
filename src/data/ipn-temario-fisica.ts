import type { UnamTemarioTopic } from './unam-temario';

/** Temario ultra-detallado de Física — Examen IPN. */
export const IPN_FISICA_TOPICS: UnamTemarioTopic[] = [
  {
    "id": "ipn-fis-2-1",
    "codigo": "2.1",
    "titulo": "Mecánica avanzada",
    "orden": 1,
    "status": "publicado",
    "children": [
      {
        "id": "ipn-fis-2-1-1",
        "codigo": "2.1.1",
        "titulo": "Vectores en dos dimensiones",
        "orden": 1,
        "status": "publicado",
        "descripcion": "Descomposición analítica bidimensional de fuerzas. Cálculo de las componentes rectangulares utilizando funciones trigonométricas (F_x = F cos θ, F_y = F sen θ). Suma de vectores concurrentes por el método de componentes para determinar la magnitud, dirección y sentido del vector resultante (F_R = √((ΣF_x)² + (ΣF_y)²))."
      },
      {
        "id": "ipn-fis-2-1-2",
        "codigo": "2.1.2",
        "titulo": "Cinemática lineal y bidimensional",
        "orden": 2,
        "status": "publicado",
        "descripcion": "MRU y MRUA: despejes y resolución de problemas que involucran dos móviles (encuentro y alcance) igualando sus ecuaciones de posición en el tiempo. Caída libre y tiro vertical: movimiento acelerado bajo gravedad, calculando tiempos de vuelo y alturas máximas. Tiro parabólico: movimiento horizontal MRU (x = v_x·t) y vertical MRUA (y = v_iy·t − gt²/2); componentes iniciales (v_ix = v_i cos θ, v_iy = v_i sen θ), tiempo de altura máxima, tiempo de vuelo total, y_máx y x_máx. MCU: periodo (T), frecuencia (f), velocidad angular (ω = 2π/T = 2πf), velocidad tangencial (v = ω·r) y aceleración centrípeta (a_c = v²/r = ω²·r)."
      },
      {
        "id": "ipn-fis-2-1-3",
        "codigo": "2.1.3",
        "titulo": "Dinámica y Leyes de Newton",
        "orden": 3,
        "status": "publicado",
        "descripcion": "Aplicación de la Segunda Ley de Newton (ΣF = m·a) mediante la construcción rigurosa de Diagramas de Cuerpo Libre (DCL). Resolución de sistemas de bloques interconectados por cuerdas en planos horizontales e inclinados lisos o con fricción. Diferenciación y cálculo de la fuerza de fricción estática máxima (f_se = μ_e·N) y de la fricción cinética (f_c = μ_c·N)."
      },
      {
        "id": "ipn-fis-2-1-4",
        "codigo": "2.1.4",
        "titulo": "Estática y condiciones de equilibrio",
        "orden": 4,
        "status": "publicado",
        "descripcion": "Primera condición (equilibrio traslacional): ΣF_x = 0, ΣF_y = 0. Resolución de sistemas de cables en tensión sosteniendo pesos (nudos, semáforos colgados). Segunda condición (equilibrio rotacional): Στ = 0. Definición del momento de una fuerza o torque (τ = F·d·sen θ). Problemas mecánicos aplicados a vigas rígidas uniformes apoyadas sobre pivotes o sostenidas por cables, calculando las fuerzas de reacción en los apoyos."
      },
      {
        "id": "ipn-fis-2-1-5",
        "codigo": "2.1.5",
        "titulo": "Trabajo, potencia y energía",
        "orden": 5,
        "status": "publicado",
        "descripcion": "Cálculo del trabajo mecánico realizado por una fuerza constante aplicada con un ángulo respecto al desplazamiento (W = F·d·cos θ). Cálculo de la potencia mecánica (P = W/t = F·v). Uso del Teorema de la Conservación de la Energía Mecánica para predecir velocidades o alturas en sistemas sin fricción (E_M1 = E_M2). Introducción del trabajo de fricción como energía mecánica disipada en sistemas no conservativos (E_M1 − W_f = E_M2)."
      }
    ]
  },
  {
    "id": "ipn-fis-2-2",
    "codigo": "2.2",
    "titulo": "Termodinámica",
    "orden": 2,
    "status": "publicado",
    "children": [
      {
        "id": "ipn-fis-2-2-1",
        "codigo": "2.2.1",
        "titulo": "Calorimetría y dilatación",
        "orden": 1,
        "status": "publicado",
        "descripcion": "Conversión operativa de temperaturas entre escalas Celsius, Fahrenheit y Kelvin. Problemas de dilatación térmica lineal (ΔL = α·L_i·ΔT), superficial y volumétrica en metales. Resolución de problemas de transferencia de calor y equilibrio térmico en sistemas cerrados (calorímetros) utilizando Q = m·c·ΔT e incorporando los calores latentes de fusión o vaporización (Q = m·L) durante los cambios de estado físico."
      },
      {
        "id": "ipn-fis-2-2-2",
        "codigo": "2.2.2",
        "titulo": "Gases ideales y procesos termodinámicos",
        "orden": 2,
        "status": "publicado",
        "descripcion": "Leyes empíricas de los gases: Isotérmico (Boyle: P₁V₁ = P₂V₂), Isobárico (Charles: V₁/T₁ = V₂/T₂) e Isocórico (Gay-Lussac: P₁/T₁ = P₂/T₂), manteniendo siempre la temperatura en escala absoluta (Kelvin). Aplicación de la ecuación general del gas ideal P·V = n·R·T."
      },
      {
        "id": "ipn-fis-2-2-3",
        "codigo": "2.2.3",
        "titulo": "Leyes de la termodinámica",
        "orden": 3,
        "status": "publicado",
        "descripcion": "Cálculo del trabajo realizado por un gas durante una expansión o compresión isobárica (W = P·ΔV). Aplicación de la Primera Ley de la Termodinámica (ΔU = Q − W) determinando los signos correctos: Q es positivo si el sistema absorbe calor; W es positivo si el sistema realiza trabajo sobre los alrededores. Principios de la Segunda Ley y cálculo de la eficiencia térmica de una máquina térmica (e = W/Q_h = 1 − Q_c/Q_h) o de una máquina ideal de Carnot (e = 1 − T_c/T_h)."
      }
    ]
  },
  {
    "id": "ipn-fis-2-3",
    "codigo": "2.3",
    "titulo": "Electromagnetismo",
    "orden": 3,
    "status": "publicado",
    "children": [
      {
        "id": "ipn-fis-2-3-1",
        "codigo": "2.3.1",
        "titulo": "Electrostática",
        "orden": 1,
        "status": "publicado",
        "descripcion": "Aplicación analítica de la Ley de Coulomb para determinar la fuerza de atracción o repulsión entre cargas eléctricas puntuales distribuidas de forma lineal o triangular en el plano cartesiano: F = k|q₁·q₂|/d². Cálculo de la intensidad de un campo eléctrico (E⃗ = F⃗/q = k·Q/d²) y del potencial eléctrico (V = k·Q/d). Análisis de capacitores y cálculo de la capacitancia equivalente para arreglos de condensadores en serie (1/C_eq = Σ1/C_i) y en paralelo (C_eq = ΣC_i)."
      },
      {
        "id": "ipn-fis-2-3-2",
        "codigo": "2.3.2",
        "titulo": "Electrodinámica (circuitos eléctricos)",
        "orden": 2,
        "status": "publicado",
        "descripcion": "Aplicación de la Ley de Ohm (V = I·R) y cálculo de la resistencia eléctrica de un conductor en función de su geometría y resistividad (Ley de Pouillet: R = ρ·L/A). Resolución completa de circuitos eléctricos con resistencias conectadas en serie, en paralelo y mixtas, determinando la resistencia equivalente, el voltaje local y la intensidad de corriente en cada ramal. Cálculo de la potencia eléctrica disipada por efecto Joule (P = V·I = I²·R)."
      },
      {
        "id": "ipn-fis-2-3-3",
        "codigo": "2.3.3",
        "titulo": "Magnetismo e inducción",
        "orden": 3,
        "status": "publicado",
        "descripcion": "Determinación de la fuerza magnética ejercida sobre una carga que se mueve dentro de un campo magnético uniforme (F = q·v·B·sen θ, usando la regla de la mano derecha) y sobre un conductor recto con corriente (F = I·L·B·sen θ). Concepto de flujo magnético (Φ = B·A·cos θ) y aplicación de la Ley de Inducción de Faraday para calcular la FEM inducida en una bobina debido a la variación temporal del flujo magnético: ℰ = −N·ΔΦ/Δt."
      }
    ]
  }
] as UnamTemarioTopic[];
