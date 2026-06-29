import { Bot } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';

export function TutorEmptyState() {
  return (
    <EmptyState
      icon={Bot}
      title="Aún no hay preguntas para repasar con IA"
      description="Cuando falles reactivos en un simulacro, aparecerán aquí para que el tutor te explique el porqué y cómo resolverlos."
      action={{ label: 'Hacer un simulacro', href: '/dashboard/simulacros' }}
    />
  );
}
