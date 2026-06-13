export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'diagnostico',
    name: 'Diagnóstico',
    price: 0,
    period: 'gratis',
    description: '20 preguntas para conocer tu nivel actual.',
    features: ['Simulador corto', 'Resultado por materia', 'Sin tarjeta'],
  },
  {
    id: 'premium',
    name: 'Plan Completo',
    price: 999,
    period: 'MXN / mes',
    description: 'Todo lo que necesitas hasta tu fecha de examen.',
    features: [
      'Plan adaptativo con IA',
      'Simulacros ilimitados',
      'Tutor 24/7 post-error',
      'Diagnóstico semanal',
      'Repaso espaciado SM-2',
    ],
    highlighted: true,
  },
  {
    id: 'intensivo',
    name: 'Intensivo',
    price: 1499,
    period: 'MXN / 2 meses',
    description: 'Para quienes tienen el examen muy cerca.',
    features: [
      'Todo en Plan Completo',
      'Simulacros diarios modo real',
      'Reporte PDF de velocidad',
      'Prioridad en soporte',
    ],
  },
];
