import Link from 'next/link';
import { Download, FileText, Pencil } from 'lucide-react';
import { ToolPageShell } from '@/components/tools/ToolPageShell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ANSWER_SHEET_TEMPLATES,
  ANSWER_SHEET_TIPS,
  getAnswerSheetDownloadPath,
} from '@/data/answer-sheets';
import { STUDY_TOOLS_BY_SLUG } from '@/data/study-tools/tools-meta';

export default function HojaRespuestasPage() {
  const tool = STUDY_TOOLS_BY_SLUG['hoja-respuestas'];

  return (
    <ToolPageShell title={tool.title} description={tool.description} tag={tool.tag}>
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-primary" aria-hidden />
            El examen real sigue siendo en papel
          </CardTitle>
          <CardDescription>
            En la UNAM, IPN y UAM marcas óvalos con lápiz. Practica con una hoja igual a la del
            salón para que el día del examen sea puro contenido, no sorpresas de formato.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {ANSWER_SHEET_TEMPLATES.map((sheet) => (
            <div
              key={sheet.id}
              className="flex flex-col gap-3 rounded-xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-bold">{sheet.title}</p>
                <p className="text-sm text-muted-foreground">
                  {sheet.totalQuestions} reactivos · opciones {sheet.options.join(', ')}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{sheet.examName}</p>
              </div>
              <Button asChild className="shrink-0 gap-2">
                <Link href={getAnswerSheetDownloadPath(sheet.filename)} download>
                  <Download className="h-4 w-4" aria-hidden />
                  Descargar PDF
                </Link>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Pencil className="h-4 w-4 text-primary" aria-hidden />
            Cómo rellenar los óvalos (como en el salón)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
            {ANSWER_SHEET_TIPS.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-muted-foreground">
            Flujo sugerido: resuelve el simulacro digital en PrepMX → en los últimos minutos
            transfiere tus respuestas a esta hoja impresa → cronometra esa transferencia una vez
            por semana.
          </p>
        </CardContent>
      </Card>
    </ToolPageShell>
  );
}
