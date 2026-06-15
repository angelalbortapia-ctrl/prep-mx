'use client';

import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { LogIn } from 'lucide-react';
import { ExamSimulator } from '@/components/exam/ExamSimulator';
import { UniversityBanner } from '@/components/marketing/UniversityBanner';
import { Button } from '@/components/ui/button';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { filterToUniId } from '@/lib/uni-theme-config';
import { isDemoMode } from '@/lib/demo-mode';
import {
  diagnosticTitle,
  parsePlanScope,
  type UniversidadFilter,
} from '@/lib/university-theme';
import { FREE_DIAGNOSTIC_QUESTION_LIMIT } from '@/types/subscription';
import { useSearchParams } from 'next/navigation';
import type { Question } from '@/types/question';

interface SimuladorGratisViewProps {
  universidad: UniversidadFilter;
  questions: Question[];
}

export function SimuladorGratisView({ universidad, questions }: SimuladorGratisViewProps) {
  const searchParams = useSearchParams();
  const plan = parsePlanScope(searchParams.get('plan'));
  const isFreemium = searchParams.get('freemium') === 'diagnostico';
  const { isLoaded, isSignedIn } = useAuth();
  const { markDiagnosticDone, hasAccess } = useSubscription();

  const uniId = filterToUniId(universidad);
  const freemiumActive = isFreemium && !hasAccess(uniId);
  const needsAuth = !freemiumActive && isLoaded && !isSignedIn && !isDemoMode();

  const activeQuestions = freemiumActive
    ? questions.slice(0, FREE_DIAGNOSTIC_QUESTION_LIMIT)
    : questions;

  return (
    <div className="space-y-8">
      <UniversityBanner value={universidad} plan={plan} basePath="/simulador-gratis" compact />

      {freemiumActive && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/80 px-4 py-3 text-sm text-amber-950">
          <strong>Diagnóstico gratuito:</strong> {FREE_DIAGNOSTIC_QUESTION_LIMIT} preguntas de
          muestra. Al terminar, desbloquea simulacros completos con tu plan.
        </div>
      )}

      {needsAuth ? (
        <div className="exam-shell mx-auto max-w-lg space-y-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <LogIn className="h-7 w-7" aria-hidden />
          </div>
          <h2 className="text-xl font-bold">Simulador completo</h2>
          <p className="text-sm text-muted-foreground">
            Inicia sesión para usar tus créditos de examen y acceder a reactivos premium con RLS
            activo en Supabase.
          </p>
          <Button asChild className="h-12 w-full rounded-xl">
            <Link
              href={`/sign-in?redirect_url=${encodeURIComponent(
                `/simulador-gratis?uni=${universidad}&plan=${plan}`
              )}`}
            >
              Entrar con mi cuenta
            </Link>
          </Button>
        </div>
      ) : (
        <ExamSimulator
          key={`${universidad}-${freemiumActive}-${activeQuestions.map((q) => q.id).join(',')}`}
          questions={activeQuestions}
          title={
            freemiumActive
              ? `Diagnóstico gratis — ${FREE_DIAGNOSTIC_QUESTION_LIMIT} preguntas`
              : diagnosticTitle(universidad)
          }
          durationMinutes={freemiumActive ? 12 : 30}
          sessionId={`free-diagnostic-${universidad}${freemiumActive ? '-freemium' : ''}`}
          freemiumMode={freemiumActive}
          freemiumUniId={uniId}
          onFreemiumComplete={() => markDiagnosticDone(uniId)}
        />
      )}
    </div>
  );
}
