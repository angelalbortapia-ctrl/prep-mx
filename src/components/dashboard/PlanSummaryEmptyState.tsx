import { CalendarDays } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function PlanSummaryEmptyState() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumen del plan</CardTitle>
        <CardDescription>Tu calendario adaptativo aparecerá aquí</CardDescription>
      </CardHeader>
      <CardContent>
        <EmptyState
          compact
          className="border-dashed shadow-none"
          icon={CalendarDays}
          title="Aún no tienes un plan generado"
          description="Haz tu primer simulacro o usa el generador de calendario para que PrepMX arme una ruta de estudio según tus metas y días libres."
          action={{ label: 'Ir a simulacros', href: '/dashboard/simulacros' }}
          secondaryAction={{
            label: 'O abrir el generador de calendario',
            href: '/dashboard/herramientas/calendario',
          }}
        />
      </CardContent>
    </Card>
  );
}
