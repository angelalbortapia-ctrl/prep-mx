export type UniversidadLandingId = 'unam' | 'ipn' | 'uam';

export interface UniversidadLandingConfig {
  nombre: string;
  siglas: string;
  badge: string;
  reactivos: number;
  horas: number;
  aceptacion: string;
  detalleMaterias: string;
  carreraTop: string;
  aciertosTop: number;
  aciertosTopLabel: string;
  contextoRiesgo: string;
  primary: string;
  accent: string;
}

export const UNIVERSIDAD_LANDING_CONFIG: Record<UniversidadLandingId, UniversidadLandingConfig> = {
  unam: {
    nombre: 'Universidad Nacional Autónoma de México',
    siglas: 'UNAM',
    badge: 'Examen Tradicional Presencial',
    reactivos: 120,
    horas: 3,
    aceptacion: '9%',
    detalleMaterias:
      'Incluye las 4 Áreas de Estudio oficiales, con peso específico en Filosofía e Historia.',
    carreraTop: 'Medicina (Ciudad Universitaria)',
    aciertosTop: 111,
    aciertosTopLabel: 'aciertos mínimos',
    contextoRiesgo: 'Riesgo extremo: menos del 2% de aceptación en Medicina. Margen de error mínimo.',
    primary: '#002B49',
    accent: '#D4AF37',
  },
  ipn: {
    nombre: 'Instituto Politécnico Nacional',
    siglas: 'IPN',
    badge: 'Examen 100% Digital en Línea',
    reactivos: 140,
    horas: 3,
    aceptacion: '25%',
    detalleMaterias:
      'Evaluación avanzada enfocada en Cálculo Diferencial, Integral y Competencias Escritas.',
    carreraTop: 'Ingeniería en Inteligencia Artificial (UPIITA)',
    aciertosTop: 104,
    aciertosTopLabel: 'aciertos mínimos',
    contextoRiesgo: 'Riesgo alto: competencia severa en ciencias exactas. Requiere optimización.',
    primary: '#6A1B29',
    accent: '#6A1B29',
  },
  uam: {
    nombre: 'Universidad Autónoma Metropolitana',
    siglas: 'UAM',
    badge: 'Examen de Selección en Línea',
    reactivos: 120,
    horas: 3,
    aceptacion: '14%',
    detalleMaterias:
      'Enfoque crítico en Aptitud Lógica, Razonamiento Matemático y sección específica por División.',
    carreraTop: 'Medicina (UAM Xochimilco)',
    aciertosTop: 88,
    aciertosTopLabel: 'puntos totales',
    contextoRiesgo: 'Riesgo crítico: evaluación modular que promedia el 30% de tu bachillerato.',
    primary: '#F05454',
    accent: '#F05454',
  },
};

export function resolveLandingUniId(
  universidad: string,
  fallback: UniversidadLandingId = 'unam'
): UniversidadLandingId {
  if (universidad === 'ipn' || universidad === 'uam') return universidad;
  return fallback;
}
