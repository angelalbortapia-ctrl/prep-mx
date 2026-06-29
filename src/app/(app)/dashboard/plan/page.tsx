import Link from 'next/link';
import { StudyCalendar } from '@/components/dashboard/StudyCalendar';
import { PlanSummaryEmptyState } from '@/components/dashboard/PlanSummaryEmptyState';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function PlanPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <PageHeader
        title="Mi plan de estudio"
        description="Generado según tu examen UNAM Área 2 en 47 días. Se actualiza con tu progreso."
      />

      <Card>
        <CardHeader>
          <CardTitle>Calendario inteligente</CardTitle>
          <CardDescription>
            Genera un plan semanal personalizado según tus universidades, días libres y horas de estudio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="rounded-xl">
            <Link href="/dashboard/herramientas/calendario">Abrir generador de calendario</Link>
          </Button>
        </CardContent>
      </Card>

      <PlanSummaryEmptyState />

      <StudyCalendar />
    </div>
  );
}
