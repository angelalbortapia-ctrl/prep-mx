import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StreakWidget } from '@/components/dashboard/StreakWidget';
import { WeaknessRadar } from '@/components/dashboard/WeaknessRadar';
import { StudyCalendar } from '@/components/dashboard/StudyCalendar';

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Badge variant="secondary" className="mb-2">UNAM · Área 2</Badge>
          <h1 className="text-2xl font-bold md:text-3xl">Hola, bienvenido de vuelta</h1>
          <p className="mt-1 text-muted-foreground">
            Tu examen es en <strong>47 días</strong> · Plan al 18%
          </p>
        </div>
        <Button asChild className="h-11 rounded-xl">
          <Link href="/dashboard/simulacros/unam-area2-practica">Continuar estudio</Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StreakWidget days={3} />
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">XP total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">120</p>
            <p className="text-sm text-muted-foreground">Nivel 2 — Estudiante</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Próximo repaso SM-2</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">Mañana</p>
            <p className="text-sm text-muted-foreground">Estequiometría · 12 preguntas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <StudyCalendar />
        <WeaknessRadar />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Acciones rápidas</CardTitle>
          <CardDescription>Flujo del alumno según tu plan PrepMX</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild variant="outline" className="h-11 rounded-xl">
            <Link href="/dashboard/simulacros">Simulacros</Link>
          </Button>
          <Button asChild variant="outline" className="h-11 rounded-xl">
            <Link href="/dashboard/plan">Mi plan</Link>
          </Button>
          <Button asChild variant="outline" className="h-11 rounded-xl">
            <Link href="/dashboard/tutor">Tutor IA</Link>
          </Button>
          <Button asChild variant="outline" className="h-11 rounded-xl">
            <Link href="/dashboard/diagnostico/demo">Último diagnóstico</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
