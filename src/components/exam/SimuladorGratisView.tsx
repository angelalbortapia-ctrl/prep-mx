'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { filterToUniId } from '@/lib/uni-theme-config';
import { getFreemiumQuestions } from '@/lib/freemium-questions';
import { savePendingDiagnostic } from '@/lib/pending-diagnostic';
import { isDemoMode } from '@/lib/demo-mode';
import { FREE_DIAGNOSTIC_QUESTION_LIMIT } from '@/types/subscription';
import { UniversityBanner } from '@/components/marketing/UniversityBanner';
import { ExamSimulator } from '@/components/exam/ExamSimulator';
import { parseUniversidadFilter, parsePlanScope } from '@/lib/university-theme';
import type { PendingDiagnosticPayload } from '@/lib/pending-diagnostic';
import { useGamification } from '@/hooks/useGamification';
import { useUserProfile } from '@/hooks/useUserProfile';
import { FREEMIUM_DAILY_LIVES } from '@/lib/gamification/freemium-lives';

/**
 * Simulador freemium: preguntas estáticas + 3 vidas/día (efecto Duolingo).
 * Plan Pro = práctica ilimitada sin congelamiento.
 */
export function SimuladorGratisView() {
  const searchParams = useSearchParams();
  const universidad = parseUniversidadFilter(searchParams.get('uni') ?? undefined);
  const plan = parsePlanScope(searchParams.get('plan'));
  const { markDiagnosticDone } = useSubscription();
  const { isSignedIn } = useAuth();
  const { data: profile } = useUserProfile();
  const { data: gamification } = useGamification();

  const uniId = filterToUniId(universidad);

  const isPremium = useMemo(() => {
    if (isDemoMode()) return false;
    return Boolean(profile?.isPremium || gamification?.isPremium);
  }, [profile?.isPremium, gamification?.isPremium]);

  const questions = useMemo(
    () => getFreemiumQuestions(universidad, FREE_DIAGNOSTIC_QUESTION_LIMIT),
    [universidad]
  );

  function handleFreemiumComplete(
    payload: Omit<PendingDiagnosticPayload, 'completedAt' | 'uniId'>
  ) {
    savePendingDiagnostic({
      ...payload,
      uniId,
      completedAt: new Date().toISOString(),
    });
    markDiagnosticDone(uniId);
  }

  return (
    <div className="space-y-8">
      <UniversityBanner value={universidad} plan={plan} basePath="/simulador-gratis" compact />

      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 px-4 py-3 text-sm text-emerald-950 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-100">
        <strong>Sin registro para empezar:</strong> {FREE_DIAGNOSTIC_QUESTION_LIMIT} preguntas en tu
        navegador.
        {!isPremium ? (
          <>
            {' '}
            Tienes <strong>{FREEMIUM_DAILY_LIVES} vidas</strong> al día — cada error quita una vida. Sin
            vidas, pausa 24 h o Plan Pro.
          </>
        ) : (
          <> Plan Pro activo: práctica ilimitada.</>
        )}
        {isSignedIn ? ' Tu racha diaria vive en el dashboard.' : ' Al terminar, crea cuenta para SM-2.'}
      </div>

      <ExamSimulator
        key={`${universidad}-${questions.map((q) => q.id).join(',')}`}
        questions={questions}
        title={`Diagnóstico gratis — ${FREE_DIAGNOSTIC_QUESTION_LIMIT} preguntas`}
        durationMinutes={12}
        sessionId={`free-diagnostic-${universidad}`}
        mode="practice"
        freemiumMode
        freemiumUniId={uniId}
        freemiumLivesEnabled={!isPremium}
        onFreemiumComplete={handleFreemiumComplete}
      />
    </div>
  );
}
