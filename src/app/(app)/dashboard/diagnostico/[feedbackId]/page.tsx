import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WeaknessRadar } from '@/components/dashboard/WeaknessRadar';

interface PageProps {
  params: { feedbackId: string };
}

export default function DiagnosticoPage({ params }: PageProps) {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Badge className="mb-2">Diagnóstico #{params.feedbackId}</Badge>
        <h1 className="text-2xl font-bold">Resultado de tu simulacro</h1>
        <p className="mt-1 text-muted-foreground">
          Análisis generado por IA — identifica tus debilidades por tema.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Puntaje general</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-primary">67%</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Fortaleza en Geometría · Debilidad crítica en Estequiometría
          </p>
        </CardContent>
      </Card>

      <WeaknessRadar />

      <Card>
        <CardHeader>
          <CardTitle>Recomendación IA</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            Prioriza estequiometría los próximos 3 días. Tu tasa de error supera el 60%
            en balanceo de ecuaciones y moles-masa.
          </p>
          <p>
            Mantén práctica de geometría 1 día por semana — es tu área más fuerte.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild className="h-11 rounded-xl">
              <Link href="/dashboard/plan">Ver plan actualizado</Link>
            </Button>
            <Button asChild variant="outline" className="h-11 rounded-xl">
              <Link href="/dashboard/tutor">Preguntar al tutor</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
