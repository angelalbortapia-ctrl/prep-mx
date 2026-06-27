import type { UnamTemarioTopic } from './unam-temario';

/** CAD — Ciencias y Artes para el Diseño. */
export const UAM_CAD_DISENO_TOPICS: UnamTemarioTopic[] = [
  {
    id: 'uam-cad-dis-1',
    codigo: '1',
    titulo: 'Fundamentos del Diseño',
    orden: 1,
    status: 'publicado',
    children: [
      {
        id: 'uam-cad-dis-1-1',
        codigo: '1.1',
        titulo: 'Elementos visuales',
        orden: 1,
        status: 'publicado',
        descripcion:
          'Línea, forma, color, textura, valor y espacio. Teoría del color (círculo cromático, armonías, contraste) y principios de composición (equilibrio, ritmo, proporción, énfasis).',
      },
      {
        id: 'uam-cad-dis-1-2',
        codigo: '1.2',
        titulo: 'Diseño gráfico y espacial',
        orden: 2,
        status: 'publicado',
        descripcion:
          'Tipografía básica, jerarquía visual, maquetación, identidad visual y relación forma-función en objetos y espacios diseñados.',
      },
    ],
  },
];

export const UAM_CAD_ARTE_TOPICS: UnamTemarioTopic[] = [
  {
    id: 'uam-cad-art-1',
    codigo: '2',
    titulo: 'Historia del Arte y Arquitectura',
    orden: 1,
    status: 'publicado',
    children: [
      {
        id: 'uam-cad-art-1-1',
        codigo: '2.1',
        titulo: 'Arte universal',
        orden: 1,
        status: 'publicado',
        descripcion:
          'Arte prehistórico, clásico, medieval, renacentista, barroco, moderno y contemporáneo. Estilos, técnicas y contexto histórico de obras representativas.',
      },
      {
        id: 'uam-cad-art-1-2',
        codigo: '2.2',
        titulo: 'Arte y arquitectura en México',
        orden: 2,
        status: 'publicado',
        descripcion:
          'Arte prehispánico, arquitectura virreinal, muralismo mexicano, arquitectura moderna y movimientos artísticos nacionales del siglo XX.',
      },
    ],
  },
];

export const UAM_CAD_GEOMETRIA_TOPICS: UnamTemarioTopic[] = [
  {
    id: 'uam-cad-geo-1',
    codigo: '3',
    titulo: 'Geometría y Dibujo Técnico',
    orden: 1,
    status: 'publicado',
    children: [
      {
        id: 'uam-cad-geo-1-1',
        codigo: '3.1',
        titulo: 'Geometría plana y del espacio',
        orden: 1,
        status: 'publicado',
        descripcion:
          'Ángulos, polígonos, circunferencia, áreas, volúmenes de prismas y cilindros, secciones y proyecciones ortogonales elementales.',
      },
      {
        id: 'uam-cad-geo-1-2',
        codigo: '3.2',
        titulo: 'Dibujo técnico',
        orden: 2,
        status: 'publicado',
        descripcion:
          'Vistas principales, perspectiva cónica y caballera, escalas, acotación y lectura de planos arquitectónicos y de diseño industrial básicos.',
      },
    ],
  },
];

export const UAM_CAD_FISICA_MAT_TOPICS: UnamTemarioTopic[] = [
  {
    id: 'uam-cad-fm-1',
    codigo: '4',
    titulo: 'Física y Matemáticas para el Diseño',
    orden: 1,
    status: 'publicado',
    children: [
      {
        id: 'uam-cad-fm-1-1',
        codigo: '4.1',
        titulo: 'Matemáticas aplicadas',
        orden: 1,
        status: 'publicado',
        descripcion:
          'Proporción áurea, escalas, porcentajes, funciones lineales aplicadas a costos y materiales, trigonometría en estructuras y optimización geométrica.',
      },
      {
        id: 'uam-cad-fm-1-2',
        codigo: '4.2',
        titulo: 'Física aplicada al diseño',
        orden: 2,
        status: 'publicado',
        descripcion:
          'Estática básica, centro de gravedad, materiales y resistencia, iluminación, acústica elemental y ergonomía en espacios y productos.',
      },
    ],
  },
];
