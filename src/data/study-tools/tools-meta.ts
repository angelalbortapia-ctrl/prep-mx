import type { LucideIcon } from 'lucide-react';
import {
  Atom,
  Calculator,
  CalendarDays,
  Clock,
  GitCompare,
  Landmark,
  Scale,
} from 'lucide-react';

export interface StudyToolMeta {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  tag?: string;
}

export const STUDY_TOOLS: StudyToolMeta[] = [
  {
    id: 'compatibilidad',
    slug: 'compatibilidad',
    title: 'Calculadora de compatibilidad',
    description:
      'Materias favoritas, teoría vs práctica, velocidad de lectura y promedio de prepa → tu % UNAM, IPN y UAM.',
    icon: GitCompare,
    href: '/dashboard/herramientas/compatibilidad',
    tag: 'Diagnóstico',
  },
  {
    id: 'uam-diezmo',
    slug: 'uam-diezmo',
    title: 'Simulador del diezmo UAM',
    description:
      'Con tu promedio de prepa (30 %) calcula cuántos aciertos necesitas en el examen (70 %) para el corte de tu carrera.',
    icon: Calculator,
    href: '/dashboard/herramientas/uam-diezmo',
    tag: 'UAM',
  },
  {
    id: 'rafaga',
    slug: 'rafaga',
    title: 'Modo ráfaga',
    description:
      'Pregunta aleatoria, 45 segundos y puntos por acierto. Ideal para el metro o el camión.',
    icon: Clock,
    href: '/dashboard/herramientas/rafaga',
    tag: 'Juego',
  },
  {
    id: 'calendario',
    slug: 'calendario',
    title: 'Calendario inteligente',
    description:
      'Elige universidades, días libres y horas diarias. Genera un plan semanal alternando materias pesadas y ligeras.',
    icon: CalendarDays,
    href: '/dashboard/herramientas/calendario',
    tag: 'Planificación',
  },
  {
    id: 'falacias',
    slug: 'falacias',
    title: 'Diccionario de falacias',
    description:
      'Ad hominem, ad baculum y más — con ejemplos de la vida cotidiana en México para Filosofía (Área 4 UNAM).',
    icon: Scale,
    href: '/dashboard/herramientas/falacias',
    tag: 'Filosofía',
  },
  {
    id: 'formulas',
    slug: 'formulas',
    title: 'Formulario de rescate',
    description:
      'Física y química: fórmulas interactivas con letras, unidades y el despeje trampa del examen.',
    icon: Atom,
    href: '/dashboard/herramientas/formulas',
    tag: 'Física · Química',
  },
  {
    id: 'historia',
    slug: 'historia',
    title: 'Cheat sheets de historia',
    description:
      'Línea de tiempo doble: lo que pasaba en México al mismo tiempo que en el mundo.',
    icon: Landmark,
    href: '/dashboard/herramientas/historia',
    tag: 'Historia',
  },
];

export const STUDY_TOOLS_BY_SLUG = Object.fromEntries(
  STUDY_TOOLS.map((t) => [t.slug, t])
) as Record<string, StudyToolMeta>;
