import type { UnamTemarioTopic } from './unam-temario';

/** Tronco común — Aptitud (~40 % del examen, todas las divisiones). */
export const UAM_RAZONAMIENTO_VERBAL_TOPICS: UnamTemarioTopic[] = [
  {
    id: 'uam-rv-1',
    codigo: '1',
    titulo: 'Razonamiento Verbal',
    orden: 1,
    status: 'publicado',
    children: [
      {
        id: 'uam-rv-1-1',
        codigo: '1.1',
        titulo: 'Comprensión de lectura',
        orden: 1,
        status: 'publicado',
        descripcion:
          'Lectura de textos informativos, argumentativos y narrativos. Identificación de idea principal, inferencias, propósito del autor, tono y relaciones de causa-efecto entre párrafos.',
      },
      {
        id: 'uam-rv-1-2',
        codigo: '1.2',
        titulo: 'Analogías verbales',
        orden: 2,
        status: 'publicado',
        descripcion:
          'Relaciones semánticas entre pares de palabras: sinónimos, antónimos, parte-todo, causa-efecto, instrumento-función, grado-intensidad y analogías de uso contextual.',
      },
      {
        id: 'uam-rv-1-3',
        codigo: '1.3',
        titulo: 'Completar oraciones',
        orden: 3,
        status: 'publicado',
        descripcion:
          'Selección de conectores, preposiciones y palabras que mantienen coherencia gramatical y lógica. Oraciones con dos o más espacios en blanco y opciones de respuesta muy parecidas.',
      },
    ],
  },
];

export const UAM_RAZONAMIENTO_MATEMATICO_TOPICS: UnamTemarioTopic[] = [
  {
    id: 'uam-rm-2',
    codigo: '2',
    titulo: 'Razonamiento Matemático',
    orden: 1,
    status: 'publicado',
    children: [
      {
        id: 'uam-rm-2-1',
        codigo: '2.1',
        titulo: 'Lógica matemática',
        orden: 1,
        status: 'publicado',
        descripcion:
          'Tablas de verdad sencillas, negación de proposiciones, diagramas de Venn con dos o tres conjuntos y razonamiento deductivo con premisas numéricas o categóricas.',
      },
      {
        id: 'uam-rm-2-2',
        codigo: '2.2',
        titulo: 'Sucesiones y series',
        orden: 2,
        status: 'publicado',
        descripcion:
          'Patrones en secuencias numéricas, alfabéticas y mixtas. Progresiones aritméticas y geométricas elementales, series con operaciones alternadas y figuras que siguen una regla.',
      },
      {
        id: 'uam-rm-2-3',
        codigo: '2.3',
        titulo: 'Planteamiento de problemas verbales',
        orden: 3,
        status: 'publicado',
        descripcion:
          'Traducción de enunciados a ecuaciones o desigualdades. Proporciones, porcentajes, regla de tres, razones, mezclas, edades y problemas de velocidad-distancia-tiempo de nivel bachillerato.',
      },
    ],
  },
];
