'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { Coins, LogIn } from 'lucide-react';
import { ActiveExamSessionBlock } from '@/components/exam/ActiveExamSessionBlock';
import { ExamAreaSelector } from '@/components/exam/ExamAreaSelector';
import { ExamSimulator } from '@/components/exam/ExamSimulator';
import { TokenPaywallSheet } from '@/components/paywall/TokenPaywallSheet';
import { Button } from '@/components/ui/button';
import { SkeletonExamStartPanel } from '@/components/ui/skeleton-body';
import { useExamTokens } from '@/contexts/ExamTokensContext';
import { useVerifiedClerkSession } from '@/hooks/useVerifiedClerkSession';
import { resolvePersistedExamSessionId } from '@/hooks/useExamDraft';
import type { ActiveExamSessionInfo } from '@/lib/exam-session-client';
import { claimExamSession } from '@/lib/exam-session-client';
import { ProductEvents } from '@/lib/analytics/events';
import { captureProductEvent } from '@/lib/analytics/capture';
import { isClerkUiReady } from '@/lib/demo-mode';
import type { AcademicArea } from '@/data/academic-areas';
import type { ExamConfig } from '@/data/exams';
import type { Question } from '@/types/question';

interface ExamStartFlowProps {
  exam: ExamConfig;
  questions: Question[];
}

type FlowStep = 'area' | 'token' | 'exam';

export function ExamStartFlow({ exam, questions }: ExamStartFlowProps) {
  const { isLoaded } = useAuth();
  const { isSessionReady, sessionError } = useVerifiedClerkSession();
  const { canStartFullExam, consumeToken, purchasePack, hydrated, balance, authRequired } =
    useExamTokens();
  const [area, setArea] = useState<AcademicArea | null>(null);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [starting, setStarting] = useState(false);
  const [sessionConflict, setSessionConflict] = useState<ActiveExamSessionInfo | null>(null);
  const [claimedSessionId, setClaimedSessionId] = useState<string | null>(null);
  const [startError, setStartError] = useState<string | null>(null);

  const isPractice = exam.totalQuestions <= 20;
  const needsAreaStep = exam.universidad === 'unam' || exam.universidad === 'uam';
  const needsToken = !isPractice;

  const [step, setStep] = useState<FlowStep>(() => {
    if (needsAreaStep) return 'area';
    if (needsToken) return 'token';
    return 'exam';
  });

  function handleAreaConfirm(selected: AcademicArea) {
    setArea(selected);
    setStep(needsToken ? 'token' : 'exam');
  }

  async function handleStartExam() {
    if (needsToken && authRequired && !isSessionReady) return;
    setStartError(null);
    setSessionConflict(null);

    if (needsToken) {
      if (!canStartFullExam) {
        setPaywallOpen(true);
        return;
      }
      setStarting(true);
      const ok = await consumeToken();
      if (!ok) {
        setStarting(false);
        setPaywallOpen(true);
        return;
      }
    }

    const examSessionId = resolvePersistedExamSessionId(exam.id);

    try {
      if (needsToken && authRequired) {
        const claim = await claimExamSession(examSessionId, exam.id);
        if ('conflict' in claim) {
          setSessionConflict(claim.conflict);
          setStarting(false);
          return;
        }
      }

      setClaimedSessionId(examSessionId);
      captureProductEvent(ProductEvents.EXAM_STARTED, {
        exam_id: exam.id,
        universidad: exam.universidad,
        mode: isPractice ? 'practice' : 'exam',
      });
      setStep('exam');
    } catch (e) {
      setStartError(e instanceof Error ? e.message : 'No se pudo validar la sesión');
    } finally {
      setStarting(false);
    }
  }

  if (sessionConflict) {
    return <ActiveExamSessionBlock active={sessionConflict} />;
  }

  if (step === 'area') {
    return <ExamAreaSelector universidad={exam.universidad} onConfirm={handleAreaConfirm} />;
  }

  if (step === 'token') {
    if (!hydrated || !isClerkUiReady(isLoaded) || (authRequired && !isSessionReady)) {
      return <SkeletonExamStartPanel />;
    }

    if (authRequired) {
      return (
        <div className="exam-shell mx-auto max-w-lg space-y-5 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <LogIn className="h-7 w-7" aria-hidden />
          </div>
          <h2 className="text-xl font-bold">Inicia sesión para continuar</h2>
          <p className="text-sm text-muted-foreground">
            Los simulacros completos requieren una cuenta. Así guardamos tus créditos y progreso.
          </p>
          <Button asChild className="h-12 w-full rounded-xl">
            <Link href={`/sign-in?redirect_url=${encodeURIComponent('/dashboard/simulacros/' + exam.id)}`}>
              Entrar con mi cuenta
            </Link>
          </Button>
        </div>
      );
    }

    return (
      <>
        <div className="exam-shell mx-auto max-w-lg space-y-5 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
            <Coins className="h-7 w-7" aria-hidden />
          </div>
          <h2 className="text-xl font-bold">Listo para iniciar</h2>
          <p className="text-sm text-muted-foreground">
            {exam.name} consume <strong>1 crédito</strong>. Tienes{' '}
            <strong>{balance}</strong> disponible{balance === 1 ? '' : 's'}.
          </p>
          {startError ? <p className="text-sm text-destructive">{startError}</p> : null}
          {sessionError ? <p className="text-sm text-destructive">{sessionError}</p> : null}
          {starting ? (
            <SkeletonExamStartPanel className="p-0" />
          ) : (
          <Button
            type="button"
            className="h-12 w-full rounded-xl shadow-md shadow-primary/20 active:scale-95"
            onClick={() => void handleStartExam()}
            disabled={starting || (authRequired && !isSessionReady)}
          >
            Iniciar simulacro
          </Button>
          )}
        </div>
        <TokenPaywallSheet
          open={paywallOpen}
          onOpenChange={setPaywallOpen}
          onPurchase={purchasePack}
        />
      </>
    );
  }

  if (step === 'exam' || !needsToken) {
    const areaLabel = area?.label ?? exam.area ?? '';
    const title = areaLabel ? `${exam.name} · ${areaLabel}` : exam.name;
    const sessionId =
      claimedSessionId ?? (needsToken ? null : resolvePersistedExamSessionId(exam.id));

    if (needsToken && !sessionId) {
      return (
        <div className="exam-shell mx-auto max-w-lg p-8 text-center text-sm text-muted-foreground">
          No se pudo iniciar la sesión del simulacro.
        </div>
      );
    }

    return (
      <ExamSimulator
        questions={questions}
        title={title}
        durationMinutes={exam.durationMins}
        sessionId={exam.id}
        examId={exam.id}
        fixedExamSessionId={sessionId ?? undefined}
        mode={isPractice ? 'practice' : 'exam'}
        academicWeights={area?.weights}
      />
    );
  }

  return null;
}
