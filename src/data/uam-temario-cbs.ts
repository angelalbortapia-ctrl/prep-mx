import type { UnamTemarioTopic } from './unam-temario';

/** CBS — Ciencias Biológicas y de la Salud. */
export const UAM_CBS_BIOLOGIA_TOPICS: UnamTemarioTopic[] = [
  {
    id: 'uam-cbs-bio-1',
    codigo: '1',
    titulo: 'Biología Celular y Humana',
    orden: 1,
    status: 'publicado',
    children: [
      {
        id: 'uam-cbs-bio-1-1',
        codigo: '1.1',
        titulo: 'La célula',
        orden: 1,
        status: 'publicado',
        descripcion:
          'Teoría celular, orgánulos y sus funciones, membrana plasmática, transporte celular, división celular (mitosis y meiosis) y niveles de organización biológica.',
      },
      {
        id: 'uam-cbs-bio-1-2',
        codigo: '1.2',
        titulo: 'Metabolismo',
        orden: 2,
        status: 'publicado',
        descripcion:
          'Enzimas, fotosíntesis, respiración celular aeróbica y anaeróbica, ATP como moneda energética y regulación básica del metabolismo.',
      },
      {
        id: 'uam-cbs-bio-1-3',
        codigo: '1.3',
        titulo: 'Genética',
        orden: 3,
        status: 'publicado',
        descripcion:
          'ADN, ARN, replicación, transcripción y traducción. Leyes de Mendel, herencia ligada al sexo, mutaciones y biotecnología elemental.',
      },
      {
        id: 'uam-cbs-bio-1-4',
        codigo: '1.4',
        titulo: 'Anatomía y fisiología humana',
        orden: 4,
        status: 'publicado',
        descripcion:
          'Sistemas digestivo, circulatorio, respiratorio, nervioso, endocrino y reproductor. Homeostasis y relación estructura-función en el cuerpo humano.',
      },
      {
        id: 'uam-cbs-bio-1-5',
        codigo: '1.5',
        titulo: 'Ecología',
        orden: 5,
        status: 'publicado',
        descripcion:
          'Niveles tróficos, cadenas y redes alimentarias, ciclos biogeoquímicos, poblaciones, comunidades, ecosistemas y impacto humano en el ambiente.',
      },
    ],
  },
];

export const UAM_CBS_QUIMICA_TOPICS: UnamTemarioTopic[] = [
  {
    id: 'uam-cbs-quim-1',
    codigo: '2',
    titulo: 'Química General y Orgánica',
    orden: 1,
    status: 'publicado',
    children: [
      {
        id: 'uam-cbs-quim-1-1',
        codigo: '2.1',
        titulo: 'Química general',
        orden: 1,
        status: 'publicado',
        descripcion:
          'Estructura atómica, enlaces, reacciones ácido-base y redox básicas, equilibrio químico, pH y propiedades de soluciones acuosas.',
      },
      {
        id: 'uam-cbs-quim-1-2',
        codigo: '2.2',
        titulo: 'Química orgánica',
        orden: 2,
        status: 'publicado',
        descripcion:
          'Hidrocarburos alifáticos y aromáticos, grupos funcionales (alcohol, aldehído, cetona, ácido carboxílico, éster, amina), isomería y reacciones orgánicas fundamentales.',
      },
    ],
  },
];

export const UAM_CBS_FISICA_TOPICS: UnamTemarioTopic[] = [
  {
    id: 'uam-cbs-fis-1',
    codigo: '3',
    titulo: 'Física Médica y Básica',
    orden: 1,
    status: 'publicado',
    children: [
      {
        id: 'uam-cbs-fis-1-1',
        codigo: '3.1',
        titulo: 'Mecánica',
        orden: 1,
        status: 'publicado',
        descripcion:
          'Movimiento rectilíneo, caída libre, fuerzas, equilibrio, presión, principio de Pascal y aplicaciones biomecánicas elementales.',
      },
      {
        id: 'uam-cbs-fis-1-2',
        codigo: '3.2',
        titulo: 'Fluidos',
        orden: 2,
        status: 'publicado',
        descripcion:
          'Densidad, presión hidrostática, principio de Arquímedes, flujo y ecuación de continuidad. Aplicaciones en sistemas circulatorio y respiratorio.',
      },
      {
        id: 'uam-cbs-fis-1-3',
        codigo: '3.3',
        titulo: 'Óptica y ondas',
        orden: 3,
        status: 'publicado',
        descripcion:
          'Reflexión, refracción, lentes delgadas, espejos, ondas sonoras y electromagnéticas, interferencia y difracción a nivel introductorio.',
      },
    ],
  },
];
