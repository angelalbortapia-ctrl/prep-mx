import type { UnamTemarioTopic } from './unam-temario';

/** CSH — Ciencias Sociales y Humanidades. */
export const UAM_CSH_HISTORIA_TOPICS: UnamTemarioTopic[] = [
  {
    id: 'uam-csh-hist-1',
    codigo: '1',
    titulo: 'Historia Universal y México',
    orden: 1,
    status: 'publicado',
    children: [
      {
        id: 'uam-csh-hist-1-1',
        codigo: '1.1',
        titulo: 'Historia Universal',
        orden: 1,
        status: 'publicado',
        descripcion:
          'Antigüedad clásica, Edad Media, Renacimiento, Revoluciones atlánticas, revolución industrial, imperialismo, guerras mundiales, Guerra Fría y globalización.',
      },
      {
        id: 'uam-csh-hist-1-2',
        codigo: '1.2',
        titulo: 'Historia de México',
        orden: 2,
        status: 'publicado',
        descripcion:
          'México prehispánico, Conquista y Colonia, Independencia, Reforma, Porfiriato, Revolución Mexicana, México posrevolucionario y procesos políticos y sociales del siglo XX y XXI.',
      },
    ],
  },
];

export const UAM_CSH_LITERATURA_TOPICS: UnamTemarioTopic[] = [
  {
    id: 'uam-csh-lit-1',
    codigo: '2',
    titulo: 'Literatura',
    orden: 1,
    status: 'publicado',
    children: [
      {
        id: 'uam-csh-lit-1-1',
        codigo: '2.1',
        titulo: 'Géneros literarios',
        orden: 1,
        status: 'publicado',
        descripcion:
          'Narrativa, lírica y dramaturgia. Elementos del cuento y la novela, figuras retóricas, métrica básica y estructura de obras teatrales.',
      },
      {
        id: 'uam-csh-lit-1-2',
        codigo: '2.2',
        titulo: 'Literatura mexicana y universal',
        orden: 2,
        status: 'publicado',
        descripcion:
          'Movimientos literarios (romanticismo, modernismo, vanguardias, realismo mágico). Autores representativos de México y América Latina en contexto histórico.',
      },
      {
        id: 'uam-csh-lit-1-3',
        codigo: '2.3',
        titulo: 'Análisis de textos literarios',
        orden: 3,
        status: 'publicado',
        descripcion:
          'Identificación de tema, conflicto, narrador, tiempo y espacio. Interpretación de fragmentos poéticos y narrativos con apoyo en recursos estilísticos.',
      },
    ],
  },
];

export const UAM_CSH_POLITICA_TOPICS: UnamTemarioTopic[] = [
  {
    id: 'uam-csh-pol-1',
    codigo: '3',
    titulo: 'Política y Sociedad',
    orden: 1,
    status: 'publicado',
    children: [
      {
        id: 'uam-csh-pol-1-1',
        codigo: '3.1',
        titulo: 'Estado y gobierno',
        orden: 1,
        status: 'publicado',
        descripcion:
          'Formas de gobierno, división de poderes, Constitución mexicana, derechos humanos, participación ciudadana y mecanismos democráticos.',
      },
      {
        id: 'uam-csh-pol-1-2',
        codigo: '3.2',
        titulo: 'Sociedad y cultura',
        orden: 2,
        status: 'publicado',
        descripcion:
          'Estructura social, desigualdad, migración, identidad cultural, medios de comunicación y transformaciones sociales en México contemporáneo.',
      },
      {
        id: 'uam-csh-pol-1-3',
        codigo: '3.3',
        titulo: 'Economía y desarrollo',
        orden: 3,
        status: 'publicado',
        descripcion:
          'Oferta y demanda, inflación, empleo, comercio internacional, política económica y relación entre crecimiento económico y bienestar social.',
      },
    ],
  },
];
