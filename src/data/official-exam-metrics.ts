import type { UniversidadFilter } from '@/lib/university-theme';

export interface OfficialExamMetrics {
  id: Exclude<UniversidadFilter, 'todas'>;
  formatBadge: string;
  reactivos: number;
  timeLimit: string;
  note: string;
  ctaPrimary: string;
  containerClass: string;
  badgeClass: string;
  metricValueClass: string;
  metricLabelClass: string;
}

const UNAM_METRICS = (area: string): OfficialExamMetrics => ({
  id: 'unam',
  formatBadge: 'Examen Tradicional Presencial',
  reactivos: 120,
  timeLimit: '3 Horas',
  note: 'Incluye las 4 Áreas de Estudio oficiales, con peso específico en Filosofía e Historia.',
  ctaPrimary: `Iniciar Simulacro de 120 Preguntas Área ${area}`,
  containerClass: 'bg-[#002B49] text-[#D4AF37] border-[#D4AF37]/30',
  badgeClass: 'bg-[#D4AF37]/15 text-[#D4AF37] border-[#D4AF37]/40',
  metricValueClass: 'text-[#D4AF37]',
  metricLabelClass: 'text-[#D4AF37]/80',
});

const IPN_METRICS: OfficialExamMetrics = {
  id: 'ipn',
  formatBadge: 'Examen 100% Digital en Línea',
  reactivos: 140,
  timeLimit: '3 Horas',
  note: 'Evaluación avanzada en Cálculo Diferencial, Integral y Competencias Escritas.',
  ctaPrimary: 'Medir Eficiencia en Simulador Digital de 140 Reactivos',
  containerClass: 'bg-white text-[#6A1B29] border-[#6A1B29]/25 shadow-[0_0_28px_rgba(106,27,41,0.18)]',
  badgeClass: 'bg-[#6A1B29]/10 text-[#6A1B29] border-[#6A1B29]/30',
  metricValueClass: 'text-[#6A1B29]',
  metricLabelClass: 'text-[#6A1B29]/75',
};

const UAM_METRICS: OfficialExamMetrics = {
  id: 'uam',
  formatBadge: 'Examen de Selección en Línea',
  reactivos: 120,
  timeLimit: '3 Horas',
  note: 'Enfoque en Aptitud Lógica, Razonamiento Matemático y Conocimientos Específicos por División (CBI, CBS, CSH, CAD).',
  ctaPrimary: 'Resolver Prueba de Aptitud Lógica de la UAM',
  containerClass: 'bg-[#111111] text-[#F05454] border-zinc-800',
  badgeClass: 'bg-[#F05454]/10 text-[#F05454] border-[#F05454]/35',
  metricValueClass: 'text-[#F05454]',
  metricLabelClass: 'text-zinc-400',
};

export function getOfficialExamMetrics(
  universidad: UniversidadFilter,
  area = '2'
): OfficialExamMetrics | OfficialExamMetrics[] {
  if (universidad === 'unam') return UNAM_METRICS(area);
  if (universidad === 'ipn') return IPN_METRICS;
  if (universidad === 'uam') return UAM_METRICS;
  return [UNAM_METRICS(area), IPN_METRICS, UAM_METRICS];
}

export function getInstitutionalCta(universidad: UniversidadFilter, area = '2'): string {
  const data = getOfficialExamMetrics(universidad, area);
  if (Array.isArray(data)) {
    return 'Iniciar Diagnóstico Gratis (10 Reactivos Meta)';
  }
  return data.ctaPrimary;
}
