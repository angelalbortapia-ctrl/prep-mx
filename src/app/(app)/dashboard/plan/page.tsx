import Link from 'next/link';
import { StudyCalendar } from '@/components/dashboard/StudyCalendar';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function PlanPage() {
  return (
    <div className="space-y-6">
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

      <Card>
        <CardHeader>
          <CardTitle>Resumen del plan</CardTitle>
          <CardDescription>Planificador adaptativo — Paso 2 conectará IA en vivo</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 text-center sm:grid-cols-3 sm:text-left">
          <div>
            <p className="text-2xl font-bold text-primary">47</p>
            <p className="text-sm text-muted-foreground">días restantes</p>
          </div>
          <div>
            <p className="text-2xl font-bold">18%</p>
            <p className="text-sm text-muted-foreground">completado</p>
          </div>
          <div>
            <p className="text-2xl font-bold">6.2h</p>
            <p className="text-sm text-muted-foreground">/semana promedio</p>
          </div>
        </CardContent>
      </Card>

      <StudyCalendar />
    </div>
  );
}
