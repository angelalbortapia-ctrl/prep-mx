import type { UnamTemarioTopic } from './unam-temario';

/** CNI y CCD — divisiones exclusivas del campus Cuajimalpa (placeholder). */
export const UAM_CNI_PLACEHOLDER_TOPICS: UnamTemarioTopic[] = [
  {
    id: 'uam-cni-ph-1',
    codigo: '1',
    titulo: 'Ciencias Naturales e Ingeniería (Cuajimalpa)',
    orden: 1,
    status: 'publicado',
    descripcion:
      'División CNI del campus Cuajimalpa. Combina razonamiento cuantitativo con ciencias naturales aplicadas a ingeniería ambiental, energías y sistemas. El temario detallado por subtema se publicará conforme a la guía oficial de la convocatoria Cuajimalpa.',
  },
];

export const UAM_CCD_PLACEHOLDER_TOPICS: UnamTemarioTopic[] = [
  {
    id: 'uam-ccd-ph-1',
    codigo: '1',
    titulo: 'Ciencias de la Comunicación y Diseño (Cuajimalpa)',
    orden: 1,
    status: 'publicado',
    descripcion:
      'División CCD del campus Cuajimalpa. Orientada a comunicación, medios digitales y diseño interdisciplinario. El desglose oficial de subtemas se añadirá en una actualización próxima.',
  },
];
