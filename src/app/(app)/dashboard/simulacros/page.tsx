import Link from 'next/link';
import { Clock, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { availableExams } from '@/data/exams';

export default function SimulacrosPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Simulacros</h1>
        <p className="mt-1 text-muted-foreground">
          Exámenes completos cronometrados o práctica con feedback inmediato.
        </p>
      </div>

      <div className="space-y-4">
        {availableExams.map((exam) => (
          <Card key={exam.id}>
            <CardHeader className="pb-3">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <CardTitle className="text-lg">{exam.name}</CardTitle>
                {exam.isOfficial && <Badge variant="warning">Basado en examen real</Badge>}
              </div>
              <CardDescription>{exam.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <GraduationCap className="h-4 w-4" />
                  {exam.totalQuestions} preguntas
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {exam.durationMins} min
                </span>
              </div>
              <Button asChild className="h-11 rounded-xl">
                <Link href={`/dashboard/simulacros/${exam.id}`}>Iniciar</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
