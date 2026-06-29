import { Radar } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';
import { cn } from '@/lib/utils';

interface WeaknessEmptyStateProps {
  className?: string;
  compact?: boolean;
}

export function WeaknessEmptyState({ className, compact }: WeaknessEmptyStateProps) {
  return (
    <EmptyState
      className={cn('border-0 bg-transparent px-0 py-2 shadow-none', className)}
      compact={compact}
      icon={Radar}
      title="Sin debilidades detectadas todavía"
      description="Completa un simulacro o una ráfaga de práctica. Aquí verás las materias donde más fallas para priorizar tu estudio."
      action={{ label: 'Hacer un simulacro', href: '/dashboard/simulacros' }}
    />
  );
}
