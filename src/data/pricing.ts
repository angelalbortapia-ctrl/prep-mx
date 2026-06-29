import type { PlanScope } from '@/lib/university-theme';
import type { UniversidadFilter } from '@/lib/university-theme';

export type MonetizationPlanId = 'express' | 'pro' | 'todos';

export interface MonetizationPlan {
  id: MonetizationPlanId;
  name: string;
  price: number;
  priceLabel: string;
  period: string;
  description: string;
  features: string[];
  badge?: string;
  ctaLabel: string;
  highlighted?: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
}

/** Planes legacy — referencia en otras vistas. */
export const pricingPlans: PricingPlan[] = [
  {
    id: 'diagnostico',
    name: 'Plan Express',
    price: 0,
    period: 'gratis',
    description: 'Test de diagnóstico y créditos básicos para empezar.',
    features: ['Diagnóstico de 10 preguntas', '3 créditos de examen básico', 'Sin tarjeta'],
  },
  {
    id: 'intensivo',
    name: 'Plan Pro',
    price: 1199,
    period: 'MXN · pago único',
    description: 'Acceso completo a una universidad.',
    features: ['Guía completa', 'Banco de preguntas', 'Simuladores ilimitados'],
  },
];

export const MONETIZATION_PLANS: MonetizationPlan[] = [
  {
    id: 'express',
    name: 'Plan Express',
    price: 0,
    priceLabel: 'Gratis',
    period: 'para siempre',
    description: 'Conoce tu nivel real antes de invertir un peso.',
    features: [
      'Test de Diagnóstico de 10 preguntas',
      '3 créditos de examen básico',
      'Resultado por materia al instante',
    ],
    ctaLabel: 'Iniciar diagnóstico gratis',
  },
  {
    id: 'pro',
    name: 'Plan Pro',
    price: 1199,
    priceLabel: '$1,199 MXN',
    period: 'Pago único',
    description: 'Una institución a fondo: UNAM, IPN o UAM — tú eliges.',
    badge: 'Universidad individual',
    features: [
      'Guía de estudio completa',
      'Banco de preguntas oficial',
      'Simuladores cronometrados ilimitados',
      'Tutor IA post-error',
      'Repaso espaciado SM-2',
    ],
    ctaLabel: 'Comprar Pase Pro',
  },
  {
    id: 'todos',
    name: 'Plan Todos',
    price: 1899,
    priceLabel: '$1,899 MXN',
    period: 'Pago único',
    description: 'Las 3 carrocerías en una sola cuenta. Cambia de uni con 1 clic.',
    badge: 'El más elegido por aspirantes',
    highlighted: true,
    features: [
      'UNAM + IPN + UAM en la misma cuenta',
      'Conmutación de interfaz con 1 clic',
      'Acceso VIP a la comunidad',
      'Todo lo del Plan Pro × 3 universidades',
      'Simuladores y guías sin límite',
    ],
    ctaLabel: 'Obtener pase completo',
  },
];

export interface ScopedPlanOffer {
  scope: PlanScope;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  badge: string;
}

export function getMonetizationPlan(id: MonetizationPlanId): MonetizationPlan {
  const plan = MONETIZATION_PLANS.find((p) => p.id === id);
  if (!plan) throw new Error(`Plan desconocido: ${id}`);
  return plan;
}

export function getScopedPlanOffer(
  scope: PlanScope,
  universidadName: string
): ScopedPlanOffer {
  if (scope === 'todo') {
    const todos = getMonetizationPlan('todos');
    return {
      scope: 'todo',
      name: todos.name,
      price: todos.price,
      period: todos.period,
      description: todos.description,
      badge: todos.badge ?? 'Pase completo',
      features: todos.features,
    };
  }

  const pro = getMonetizationPlan('pro');
  return {
    scope: 'universidad',
    name: `${pro.name} ${universidadName}`,
    price: pro.price,
    period: pro.period,
    description: `Acceso completo al examen de ingreso ${universidadName}.`,
    badge: pro.badge ?? 'Universidad individual',
    features: pro.features,
  };
}

export function resolveActiveUniversityName(universidad: UniversidadFilter): string {
  if (universidad === 'unam') return 'UNAM';
  if (universidad === 'ipn') return 'IPN';
  if (universidad === 'uam') return 'UAM';
  return 'UNAM';
}
