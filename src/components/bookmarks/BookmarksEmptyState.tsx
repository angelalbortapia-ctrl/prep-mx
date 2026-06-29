import { StarOff } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';
import { cn } from '@/lib/utils';

interface BookmarksEmptyStateProps {
  className?: string;
  compact?: boolean;
}

export function BookmarksEmptyState({ className, compact }: BookmarksEmptyStateProps) {
  return (
    <EmptyState
      className={cn('border-dashed shadow-none', className)}
      compact={compact}
      icon={StarOff}
      title="Aún no tienes preguntas guardadas"
      description="Haz un simulacro y guarda los reactivos más difíciles para repasarlos después con la IA."
      action={{ label: 'Ir al simulador', href: '/dashboard/simulacros' }}
    />
  );
}
