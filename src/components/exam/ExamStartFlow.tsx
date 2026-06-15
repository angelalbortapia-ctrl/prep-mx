'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { Coins, LogIn } from 'lucide-react';
import { ExamAreaSelector } from '@/components/exam/ExamAreaSelector';
import { ExamSimulator } from '@/components/exam/ExamSimulator';
import { TokenPaywallSheet } from '@/components/paywall/TokenPaywallSheet';
import { Button } from '@/components/ui/button';
import { useExamTokens } from '@/contexts/ExamTokensContext';
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
  const { canStartFullExam, consumeToken, purchasePack, hydrated, balance, authRequired } =
    useExamTokens();
  const [area, setArea] = useState<AcademicArea | null>(null);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [starting, setStarting] = useState(false);

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
    if (needsToken && authRequired) return;
    if (needsToken) {
      if (!canStartFullExam) {
        setPaywallOpen(true);
        return;
      }
      setStarting(true);
      const ok = await consumeToken();
      setStarting(false);
      if (!ok) {
        setPaywallOpen(true);
        return;
      }
    }
    setStep('exam');
  }

  if (step === 'area') {
    return <ExamAreaSelector universidad={exam.universidad} onConfirm={handleAreaConfirm} />;
  }

  if (step === 'token') {
    if (!hydrated || !isLoaded) {
      return (
        <div className="exam-shell mx-auto max-w-lg animate-pulse space-y-4 p-8 text-center">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-muted" />
          <div className="mx-auto h-6 w-48 rounded bg-muted" />
          <div className="mx-auto h-4 w-full max-w-sm rounded bg-muted" />
        </div>
      );
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
          <Button
            type="button"
            className="h-12 w-full rounded-xl shadow-md shadow-primary/20 active:scale-95"
            onClick={handleStartExam}
            disabled={starting}
          >
            {starting ? 'Validando sesión…' : 'Iniciar simulacro'}
          </Button>
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

    return (
      <ExamSimulator
        questions={questions}
        title={title}
        durationMinutes={exam.durationMins}
        sessionId={exam.id}
        academicWeights={area?.weights}
      />
    );
  }

  return null;
}
