import Link from 'next/link';
import { MonitorSmartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ActiveExamSessionInfo } from '@/lib/exam-session-client';

interface ActiveExamSessionBlockProps {
  active: ActiveExamSessionInfo;
  title?: string;
}

export function ActiveExamSessionBlock({
  active,
  title = 'Simulacro en curso',
}: ActiveExamSessionBlockProps) {
  const continueHref = active.examId
    ? `/dashboard/simulacros/${active.examId}`
    : '/dashboard/simulacros';

  return (
    <div className="exam-shell mx-auto max-w-lg space-y-5 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
        <MonitorSmartphone className="h-7 w-7" aria-hidden />
      </div>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm text-muted-foreground">
        Esta cuenta ya tiene un simulacro cronometrado abierto en otro dispositivo o pestaña.
        Termínalo ahí o espera unas horas si lo abandonaste — no se permiten dos sesiones a la vez.
      </p>
      <Button asChild className="h-12 w-full rounded-xl">
        <Link href={continueHref}>Continuar simulacro activo</Link>
      </Button>
    </div>
  );
}
