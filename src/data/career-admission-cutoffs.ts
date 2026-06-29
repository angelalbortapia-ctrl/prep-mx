import type { Universidad } from '@/types/user-profile';

/** Reactivos oficiales en examen de admisión (referencia UNAM / IPN). */
export const ADMISSION_EXAM_REACTIVOS = 120;

export type AdmissionScoreKind = 'aciertos' | 'puntos';

export interface AdmissionCareer {
  id: string;
  universidad: Universidad;
  name: string;
  campus: string;
  area?: string;
  /** Mínimo histórico en aciertos (UNAM / IPN). */
  minAciertos?: number;
  /** Mínimo histórico en puntos totales (UAM: prepa + examen). */
  minPuntos?: number;
  scoreKind: AdmissionScoreKind;
}

/** Cortes orientativos 2025–2026 — fuente: convocatorias recientes / ticker PrepMX. */
export const ADMISSION_CAREERS: AdmissionCareer[] = [
  // ── UNAM (aciertos / 120) ──
  { id: 'unam-aero', universidad: 'unam', name: 'Ingeniería Aeroespacial', campus: 'Fac. Ingeniería, C.U.', area: 'Área 1', minAciertos: 117, scoreKind: 'aciertos' },
  { id: 'unam-med-cu', universidad: 'unam', name: 'Médico Cirujano', campus: 'Fac. Medicina, C.U.', area: 'Área 2', minAciertos: 116, scoreKind: 'aciertos' },
  { id: 'unam-traduccion', universidad: 'unam', name: 'Traducción', campus: 'FFyL, C.U.', area: 'Área 4', minAciertos: 110, scoreKind: 'aciertos' },
  { id: 'unam-cc', universidad: 'unam', name: 'Ciencias de la Computación', campus: 'Fac. Ciencias, C.U.', area: 'Área 1', minAciertos: 109, scoreKind: 'aciertos' },
  { id: 'unam-actuaria', universidad: 'unam', name: 'Actuaría', campus: 'Fac. Ciencias, C.U.', area: 'Área 1', minAciertos: 109, scoreKind: 'aciertos' },
  { id: 'unam-med-izta', universidad: 'unam', name: 'Médico Cirujano', campus: 'FES Iztacala', area: 'Área 2', minAciertos: 109, scoreKind: 'aciertos' },
  { id: 'unam-ingenieria', universidad: 'unam', name: 'Ingeniería Mecánica', campus: 'Fac. Ingeniería, C.U.', area: 'Área 1', minAciertos: 104, scoreKind: 'aciertos' },
  { id: 'unam-psico-cu', universidad: 'unam', name: 'Psicología', campus: 'Fac. Psicología, C.U.', area: 'Área 3', minAciertos: 104, scoreKind: 'aciertos' },
  { id: 'unam-derecho-cu', universidad: 'unam', name: 'Derecho', campus: 'Fac. Derecho, C.U.', area: 'Área 3', minAciertos: 103, scoreKind: 'aciertos' },
  { id: 'unam-fisica', universidad: 'unam', name: 'Física', campus: 'Fac. Ciencias, C.U.', area: 'Área 1', minAciertos: 104, scoreKind: 'aciertos' },
  { id: 'unam-ri', universidad: 'unam', name: 'Relaciones Internacionales', campus: 'FCPyS, C.U.', area: 'Área 3', minAciertos: 101, scoreKind: 'aciertos' },
  { id: 'unam-vet', universidad: 'unam', name: 'Medicina Veterinaria', campus: 'Fac. Medicina, C.U.', area: 'Área 2', minAciertos: 105, scoreKind: 'aciertos' },
  { id: 'unam-odonto', universidad: 'unam', name: 'Cirujano Dentista', campus: 'Fac. Odontología, C.U.', area: 'Área 2', minAciertos: 100, scoreKind: 'aciertos' },
  { id: 'unam-bio', universidad: 'unam', name: 'Biología', campus: 'Fac. Ciencias, C.U.', area: 'Área 2', minAciertos: 95, scoreKind: 'aciertos' },
  { id: 'unam-industrial', universidad: 'unam', name: 'Ingeniería Industrial', campus: 'Fac. Ingeniería, C.U.', area: 'Área 1', minAciertos: 95, scoreKind: 'aciertos' },
  { id: 'unam-comp-cu', universidad: 'unam', name: 'Ingeniería en Computación', campus: 'Fac. Ingeniería, C.U.', area: 'Área 1', minAciertos: 101, scoreKind: 'aciertos' },
  { id: 'unam-enfermeria', universidad: 'unam', name: 'Enfermería y Obstetricia', campus: 'Fac. Enfermería, C.U.', area: 'Área 2', minAciertos: 90, scoreKind: 'aciertos' },
  { id: 'unam-admin', universidad: 'unam', name: 'Administración', campus: 'FCA, C.U.', area: 'Área 3', minAciertos: 88, scoreKind: 'aciertos' },
  { id: 'unam-ambiental', universidad: 'unam', name: 'Ingeniería Ambiental', campus: 'Fac. Ingeniería, C.U.', area: 'Área 1', minAciertos: 94, scoreKind: 'aciertos' },
  { id: 'unam-mat-apl', universidad: 'unam', name: 'Matemáticas Aplicadas', campus: 'Fac. Ciencias, C.U.', area: 'Área 1', minAciertos: 93, scoreKind: 'aciertos' },
  { id: 'unam-economia', universidad: 'unam', name: 'Economía', campus: 'Fac. Economía, C.U.', area: 'Área 3', minAciertos: 75, scoreKind: 'aciertos' },
  { id: 'unam-ind-aragon', universidad: 'unam', name: 'Ingeniería Industrial', campus: 'FES Aragón', area: 'Área 1', minAciertos: 78, scoreKind: 'aciertos' },
  { id: 'unam-civil-aragon', universidad: 'unam', name: 'Ingeniería Civil', campus: 'FES Aragón', area: 'Área 1', minAciertos: 68, scoreKind: 'aciertos' },
  { id: 'unam-farmacia', universidad: 'unam', name: 'Farmacia', campus: 'FES Cuautitlán', area: 'Área 2', minAciertos: 63, scoreKind: 'aciertos' },

  // ── IPN (aciertos / 120) ──
  { id: 'ipn-control-pue', universidad: 'ipn', name: 'Ing. en Control y Automatización', campus: 'UPII Puebla', area: 'Ingenierías', minAciertos: 111, scoreKind: 'aciertos' },
  { id: 'ipn-med-esm', universidad: 'ipn', name: 'Médico Cirujano y Partero', campus: 'ESM', area: 'Médicas', minAciertos: 114, scoreKind: 'aciertos' },
  { id: 'ipn-med-milpa', universidad: 'ipn', name: 'Médico Cirujano y Partero', campus: 'CICS Milpa Alta', area: 'Médicas', minAciertos: 113, scoreKind: 'aciertos' },
  { id: 'ipn-meca-upiita', universidad: 'ipn', name: 'Ingeniería Mecatrónica', campus: 'UPIITA', area: 'Ingenierías', minAciertos: 106, scoreKind: 'aciertos' },
  { id: 'ipn-bionica', universidad: 'ipn', name: 'Ingeniería Biónica', campus: 'UPIITA', area: 'Ingenierías', minAciertos: 104, scoreKind: 'aciertos' },
  { id: 'ipn-biomedica', universidad: 'ipn', name: 'Ingeniería Biomédica', campus: 'UPIBI', area: 'Ingenierías', minAciertos: 105, scoreKind: 'aciertos' },
  { id: 'ipn-aero', universidad: 'ipn', name: 'Ingeniería Aeronáutica', campus: 'ESIME Ticomán', area: 'Ingenierías', minAciertos: 102, scoreKind: 'aciertos' },
  { id: 'ipn-med-homeo', universidad: 'ipn', name: 'Médico Cirujano y Partero', campus: 'ENMyH', area: 'Médicas', minAciertos: 109, scoreKind: 'aciertos' },
  { id: 'ipn-odontologia', universidad: 'ipn', name: 'Odontología', campus: 'CICS Santo Tomás', area: 'Médicas', minAciertos: 102, scoreKind: 'aciertos' },
  { id: 'ipn-ia', universidad: 'ipn', name: 'Ing. en Inteligencia Artificial', campus: 'ESCOM', area: 'Ingenierías', minAciertos: 96, scoreKind: 'aciertos' },
  { id: 'ipn-sistemas', universidad: 'ipn', name: 'Ing. en Sistemas Computacionales', campus: 'ESCOM', area: 'Ingenierías', minAciertos: 94, scoreKind: 'aciertos' },
  { id: 'ipn-electrica', universidad: 'ipn', name: 'Ingeniería Eléctrica', campus: 'ESIME Zacatenco', area: 'Ingenierías', minAciertos: 99, scoreKind: 'aciertos' },
  { id: 'ipn-automotriz', universidad: 'ipn', name: 'Ing. en Sistemas Automotrices', campus: 'ESIME Culhuacán', area: 'Ingenierías', minAciertos: 98, scoreKind: 'aciertos' },
  { id: 'ipn-negocios', universidad: 'ipn', name: 'Negocios Internacionales', campus: 'ESCA Santo Tomás', area: 'Sociales', minAciertos: 89, scoreKind: 'aciertos' },
  { id: 'ipn-contador', universidad: 'ipn', name: 'Contador Público', campus: 'ESCA Tepepan', area: 'Sociales', minAciertos: 83, scoreKind: 'aciertos' },
  { id: 'ipn-comerciales', universidad: 'ipn', name: 'Relaciones Comerciales', campus: 'ESCA Santo Tomás', area: 'Sociales', minAciertos: 86, scoreKind: 'aciertos' },

  // ── UAM (puntos totales / 1,000) ──
  { id: 'uam-med-xoch', universidad: 'uam', name: 'Medicina', campus: 'Xochimilco', area: 'CBS', minPuntos: 806, scoreKind: 'puntos' },
  { id: 'uam-odonto-xoch', universidad: 'uam', name: 'Estomatología', campus: 'Xochimilco', area: 'CBS', minPuntos: 764, scoreKind: 'puntos' },
  { id: 'uam-derecho-cuaj', universidad: 'uam', name: 'Derecho', campus: 'Cuajimalpa', area: 'CSH', minPuntos: 758, scoreKind: 'puntos' },
  { id: 'uam-enfermeria', universidad: 'uam', name: 'Enfermería', campus: 'Xochimilco', area: 'CBS', minPuntos: 741, scoreKind: 'puntos' },
  { id: 'uam-nutricion', universidad: 'uam', name: 'Nutrición Humana', campus: 'Xochimilco', area: 'CBS', minPuntos: 738, scoreKind: 'puntos' },
  { id: 'uam-diseno-ind', universidad: 'uam', name: 'Diseño Industrial', campus: 'Xochimilco', area: 'CAD', minPuntos: 733, scoreKind: 'puntos' },
  { id: 'uam-diseno-graf', universidad: 'uam', name: 'Diseño Comunicación Gráfica', campus: 'Xochimilco', area: 'CAD', minPuntos: 727, scoreKind: 'puntos' },
  { id: 'uam-vet', universidad: 'uam', name: 'Medicina Veterinaria', campus: 'Xochimilco', area: 'CBS', minPuntos: 720, scoreKind: 'puntos' },
  { id: 'uam-qfb', universidad: 'uam', name: 'Química Farmacéutica Biológica', campus: 'Xochimilco', area: 'CBS', minPuntos: 710, scoreKind: 'puntos' },
  { id: 'uam-arq-xoch', universidad: 'uam', name: 'Arquitectura', campus: 'Xochimilco', area: 'CAD', minPuntos: 708, scoreKind: 'puntos' },
  { id: 'uam-psico', universidad: 'uam', name: 'Psicología', campus: 'Xochimilco', area: 'CSH', minPuntos: 701, scoreKind: 'puntos' },
  { id: 'uam-comp-cuaj', universidad: 'uam', name: 'Ing. en Computación', campus: 'Cuajimalpa', area: 'CBI', minPuntos: 675, scoreKind: 'puntos' },
  { id: 'uam-fisica-azca', universidad: 'uam', name: 'Ingeniería Física', campus: 'Azcapotzalco', area: 'CBI', minPuntos: 655, scoreKind: 'puntos' },
  { id: 'uam-comunicacion', universidad: 'uam', name: 'Comunicación Social', campus: 'Xochimilco', area: 'CSH', minPuntos: 618, scoreKind: 'puntos' },
  { id: 'uam-economia', universidad: 'uam', name: 'Economía', campus: 'Xochimilco', area: 'CSH', minPuntos: 600, scoreKind: 'puntos' },
  { id: 'uam-sociologia', universidad: 'uam', name: 'Sociología', campus: 'Xochimilco', area: 'CSH', minPuntos: 462, scoreKind: 'puntos' },
];

export function careersForUniversity(universidad: Universidad): AdmissionCareer[] {
  return ADMISSION_CAREERS.filter((c) => c.universidad === universidad).sort((a, b) => {
    const scoreA = a.minAciertos ?? a.minPuntos ?? 0;
    const scoreB = b.minAciertos ?? b.minPuntos ?? 0;
    return scoreB - scoreA;
  });
}
