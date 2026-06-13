import { StudyCalendar } from '@/components/dashboard/StudyCalendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function PlanPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Mi plan de estudio</h1>
        <p className="mt-1 text-muted-foreground">
          Generado según tu examen UNAM Área 2 en 47 días. Se actualiza con tu progreso.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resumen del plan</CardTitle>
          <CardDescription>Planificador adaptativo — Paso 2 conectará IA en vivo</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3 text-center sm:text-left">
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
