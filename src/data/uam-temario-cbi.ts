import type { UnamTemarioTopic } from './unam-temario';

/** CBI — Ciencias Básicas e Ingeniería. */
export const UAM_CBI_MATEMATICAS_TOPICS: UnamTemarioTopic[] = [
  {
    id: 'uam-cbi-mat-1',
    codigo: '1',
    titulo: 'Matemáticas Avanzadas',
    orden: 1,
    status: 'publicado',
    children: [
      {
        id: 'uam-cbi-mat-1-1',
        codigo: '1.1',
        titulo: 'Álgebra',
        orden: 1,
        status: 'publicado',
        descripcion:
          'Polinomios, factorización, ecuaciones de segundo grado, sistemas 2x2, funciones lineales y cuadráticas, logaritmos y exponenciales de nivel bachillerato.',
      },
      {
        id: 'uam-cbi-mat-1-2',
        codigo: '1.2',
        titulo: 'Geometría y Trigonometría',
        orden: 2,
        status: 'publicado',
        descripcion:
          'Áreas y perímetros, teorema de Pitágoras, semejanza de triángulos, razones trigonométricas en triángulos rectángulos y resolución de triángulos sencillos.',
      },
      {
        id: 'uam-cbi-mat-1-3',
        codigo: '1.3',
        titulo: 'Geometría Analítica',
        orden: 3,
        status: 'publicado',
        descripcion:
          'Plano cartesiano, distancia entre puntos, pendiente, ecuación de la recta, circunferencia y parábola en forma estándar. Intersección de rectas y cónicas elementales.',
      },
      {
        id: 'uam-cbi-mat-1-4',
        codigo: '1.4',
        titulo: 'Cálculo',
        orden: 4,
        status: 'publicado',
        descripcion:
          'Límites algebraicos, continuidad intuitiva, derivada como razón de cambio, reglas de derivación básicas y aplicaciones: máximos, mínimos y tasas relacionadas sencillas.',
      },
    ],
  },
];

export const UAM_CBI_FISICA_TOPICS: UnamTemarioTopic[] = [
  {
    id: 'uam-cbi-fis-1',
    codigo: '2',
    titulo: 'Física',
    orden: 1,
    status: 'publicado',
    children: [
      {
        id: 'uam-cbi-fis-1-1',
        codigo: '2.1',
        titulo: 'Mecánica',
        orden: 1,
        status: 'publicado',
        descripcion:
          'Cinemática en una y dos dimensiones, leyes de Newton, trabajo, energía cinética y potencial, conservación de energía, momento lineal e impulso.',
      },
      {
        id: 'uam-cbi-fis-1-2',
        codigo: '2.2',
        titulo: 'Termodinámica',
        orden: 2,
        status: 'publicado',
        descripcion:
          'Temperatura, calor, cambios de fase, calor específico, dilatación térmica, gases ideales (PV = nRT) y primer principio de la termodinámica a nivel introductorio.',
      },
      {
        id: 'uam-cbi-fis-1-3',
        codigo: '2.3',
        titulo: 'Electromagnetismo',
        orden: 3,
        status: 'publicado',
        descripcion:
          'Carga eléctrica, ley de Coulomb, campo y potencial eléctrico, corriente, resistencia (Ley de Ohm), circuitos en serie y paralelo, campo magnético y fuerza sobre cargas en movimiento.',
      },
    ],
  },
];

export const UAM_CBI_QUIMICA_TOPICS: UnamTemarioTopic[] = [
  {
    id: 'uam-cbi-quim-1',
    codigo: '3',
    titulo: 'Química',
    orden: 1,
    status: 'publicado',
    children: [
      {
        id: 'uam-cbi-quim-1-1',
        codigo: '3.1',
        titulo: 'Estructura de la materia',
        orden: 1,
        status: 'publicado',
        descripcion:
          'Modelo atómico, configuración electrónica, tabla periódica, propiedades periódicas, isótopos y estados de agregación de la materia.',
      },
      {
        id: 'uam-cbi-quim-1-2',
        codigo: '3.2',
        titulo: 'Enlaces y reacciones químicas',
        orden: 2,
        status: 'publicado',
        descripcion:
          'Enlaces iónico, covalente y metálico. Nomenclatura inorgánica básica, balanceo de ecuaciones, tipos de reacción (síntesis, descomposición, sustitución, doble desplazamiento) y estequiometría elemental.',
      },
      {
        id: 'uam-cbi-quim-1-3',
        codigo: '3.3',
        titulo: 'Estequiometría',
        orden: 3,
        status: 'publicado',
        descripcion:
          'Mol, masa molar, relaciones mol-masa-volumen en gases, reactivo limitante, rendimiento y concentración molar y porcentual en soluciones.',
      },
    ],
  },
];
