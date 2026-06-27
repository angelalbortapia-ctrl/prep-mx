/**
 * Temario oficial del Examen de Admisión IPN.
 */

import { IPN_MATEMATICAS_TOPICS } from './ipn-temario-matematicas';
import { IPN_FISICA_TOPICS } from './ipn-temario-fisica';
import { IPN_QUIMICA_TOPICS } from './ipn-temario-quimica';
import { IPN_BIOLOGIA_TOPICS } from './ipn-temario-biologia';
import { IPN_ESPANOL_TOPICS } from './ipn-temario-espanol';
import { IPN_INGLES_TOPICS } from './ipn-temario-ingles';
import { IPN_HISTORIA_TOPICS } from './ipn-temario-historia';
import type { UnamTemarioMateria, UnamTemarioMeta } from './unam-temario';

export const IPN_TEMARIO_META: UnamTemarioMeta = {
  convocatoria: '2026',
  totalReactivos: 140,
  horasExamen: 3,
  fuente:
    'Examen de admisión IPN — Pensamiento Matemático, Ciencias, Español, Inglés e Historia institucional',
};

/** Materias del examen IPN (140 reactivos digitales). */
export const IPN_TEMARIO_MATERIAS: UnamTemarioMateria[] = [
  {
    id: 'matematicas',
    nombre: 'Matemáticas (Pensamiento Matemático)',
    icon: '📐',
    reactivosOficiales: 40,
    areasRelacionadas: [],
    topics: IPN_MATEMATICAS_TOPICS,
  },
  {
    id: 'fisica',
    nombre: 'Física',
    icon: '🧲',
    reactivosOficiales: 35,
    areasRelacionadas: [],
    topics: IPN_FISICA_TOPICS,
  },
  {
    id: 'quimica',
    nombre: 'Química',
    icon: '⚗️',
    reactivosOficiales: 25,
    areasRelacionadas: [],
    topics: IPN_QUIMICA_TOPICS,
  },
  {
    id: 'biologia',
    nombre: 'Biología',
    icon: '🧬',
    reactivosOficiales: 12,
    areasRelacionadas: [],
    topics: IPN_BIOLOGIA_TOPICS,
  },
  {
    id: 'espanol',
    nombre: 'Español (Competencia Escrita y Lectora)',
    icon: '📖',
    reactivosOficiales: 12,
    areasRelacionadas: [],
    topics: IPN_ESPANOL_TOPICS,
  },
  {
    id: 'ingles',
    nombre: 'Inglés',
    icon: '🇬🇧',
    reactivosOficiales: 8,
    areasRelacionadas: [],
    topics: IPN_INGLES_TOPICS,
  },
  {
    id: 'historia',
    nombre: 'Historia (México y Ciencia)',
    icon: '🏛️',
    reactivosOficiales: 8,
    areasRelacionadas: [],
    topics: IPN_HISTORIA_TOPICS,
  },
];

export function getIpnTemarioMaterias(): UnamTemarioMateria[] {
  return IPN_TEMARIO_MATERIAS;
}

export function ipnTemarioHasDetailedContent(): boolean {
  return IPN_TEMARIO_MATERIAS.some((m) => m.topics.length > 0);
}
