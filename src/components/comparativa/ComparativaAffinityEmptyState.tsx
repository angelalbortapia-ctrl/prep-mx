'use client';

import { GraduationCap } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';
import { cn } from '@/lib/utils';

export const AFFINITY_TEST_ID = 'affinity-test';
export const COMPARATIVA_AFFINITY_HREF = `/dashboard/comparativa#${AFFINITY_TEST_ID}`;

interface ComparativaAffinityEmptyStateProps {
  className?: string;
}

export function ComparativaAffinityEmptyState({ className }: ComparativaAffinityEmptyStateProps) {
  return (
    <EmptyState
      className={className}
      icon={GraduationCap}
      title="Aún no tienes un diagnóstico de afinidad"
      description="Responde 3 preguntas rápidas y descubre si UNAM, IPN o UAM encaja mejor con tu perfil académico y estilo de estudio."
      action={{ label: 'Empezar test de afinidad', href: `#${AFFINITY_TEST_ID}` }}
    />
  );
}
