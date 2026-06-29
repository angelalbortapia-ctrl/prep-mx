'use client';

import { useEffect, useMemo, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getAcademicAreasForUni } from '@/data/academic-areas';
import {
  areaIdForUni,
  type AffinityResult,
  type StudyAreaId,
} from '@/data/university-comparison';
import { persistAffinityResult } from '@/lib/persist-affinity';
import { flushPendingDiagnostic, readPendingDiagnostic } from '@/lib/pending-diagnostic';
import { useVerifiedClerkSession } from '@/hooks/useVerifiedClerkSession';
import { LegalConsentCheckbox } from '@/components/legal/LegalConsentCheckbox';
import { areaLabels, universidadLabels, type Universidad } from '@/types/user-profile';

const steps = ['Tu perfil', 'Área de carrera', 'Fecha de examen'];

interface OnboardingProfileWizardProps {
  affinity: AffinityResult;
  studyArea: StudyAreaId;
  onBack: () => void;
}

export function OnboardingProfileWizard({
  affinity,
  studyArea,
  onBack,
}: OnboardingProfileWizardProps) {
  const { user } = useUser();
  const { isSessionReady, sessionError } = useVerifiedClerkSession();
  const [step, setStep] = useState(0);
  const [universidad, setUniversidad] = useState<Universidad>(affinity.recommended);
  const [area, setArea] = useState(() => areaIdForUni(affinity.recommended, studyArea, affinity));
  const [examDate, setExamDate] = useState('');
  const [name, setName] = useState('');
  const [legalConsentAccepted, setLegalConsentAccepted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!name && user?.firstName) {
      setName(user.firstName);
    }
  }, [user?.firstName, name]);

  const divisionOptions = useMemo(() => {
    if (universidad === 'uam') return getAcademicAreasForUni('uam');
    if (universidad === 'ipn') return getAcademicAreasForUni('ipn');
    return Object.entries(areaLabels).map(([id, label]) => ({
      id,
      label,
      description: '',
      weights: {},
    }));
  }, [universidad]);

  useEffect(() => {
    if (step === 1 && divisionOptions.length === 1) {
      setArea(divisionOptions[0].id);
      setStep(2);
    }
  }, [step, divisionOptions]);

  function selectUniversidad(u: Universidad) {
    setUniversidad(u);
    setArea(areaIdForUni(u, studyArea, affinity));
  }

  async function finish() {
    if (!legalConsentAccepted) {
      setError('Debes aceptar los Términos y el Aviso de Privacidad para continuar.');
      return;
    }

    if (!isSessionReady) {
      setError(sessionError ?? 'Tu sesión aún se está verificando. Espera un momento e intenta de nuevo.');
      return;
    }

    setSaving(true);
    setError('');

    const profile = {
      fullName: name || user?.firstName || 'Alumno PrepMX',
      universidad,
      area,
      examDate,
      examTarget: `${universidad}_${area}`,
      affinityScores: {
        unam: affinity.unam,
        ipn: affinity.ipn,
        uam: affinity.uam,
      },
      recommendedUni: affinity.recommended,
      recommendedArea: affinity.recommendedArea,
      studyArea,
      onboardingComplete: true,
    };

    try {
      const res = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...profile,
          hadDiagnostic: Boolean(readPendingDiagnostic()),
          legalConsentAccepted: true,
        }),
      });
      if (!res.ok) throw new Error('No se pudo guardar');

      persistAffinityResult(affinity, { studyArea });
      localStorage.setItem('prepmx-profile', JSON.stringify(profile));

      const flushed = await flushPendingDiagnostic();
      window.location.href = flushed.feedbackId
        ? `/dashboard/diagnostico/${flushed.feedbackId}`
        : `/dashboard/estudio?uni=${universidad}`;
    } catch {
      setError('Algo falló al guardar. Intenta otra vez.');
      setSaving(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-mesh px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <p className="text-xs font-medium text-primary">
            Paso {step + 1} de {steps.length} — {steps[step]}
          </p>
          <CardTitle>Configura tu preparación</CardTitle>
          <CardDescription>
            {step === 0 && (
              <>
                Según tu test, tu mejor match es{' '}
                <strong>{universidadLabels[affinity.recommended]}</strong> ({affinity[affinity.recommended]}
                %). Puedes cambiarla si lo prefieres.
              </>
            )}
            {step === 1 && 'Elige el área o división académica de la carrera que aspiras.'}
            {step === 2 && 'Con esto armamos tu plan adaptativo hasta el día del examen.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 0 && (
            <>
              <LegalConsentCheckbox
                id="onboarding-legal-consent"
                checked={legalConsentAccepted}
                onCheckedChange={setLegalConsentAccepted}
              />
              <Input
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="grid gap-2">
                {(['unam', 'ipn', 'uam'] as Universidad[]).map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => selectUniversidad(u)}
                    className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                      universidad === u ? 'border-primary bg-primary/5' : 'hover:bg-muted'
                    }`}
                  >
                    <span className="font-bold">{universidadLabels[u]}</span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      {affinity[u]}% afinidad
                      {affinity.recommended === u ? ' · Recomendado' : ''}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <div className="grid max-h-64 gap-2 overflow-y-auto">
              {divisionOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setArea(opt.id)}
                  className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                    area === opt.id ? 'border-primary bg-primary/5' : 'hover:bg-muted'
                  }`}
                >
                  <span className="font-medium">{opt.label}</span>
                  {opt.description ? (
                    <p className="mt-0.5 text-xs text-muted-foreground">{opt.description}</p>
                  ) : null}
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-2">
              <label htmlFor="exam-date" className="text-sm font-medium">
                ¿Cuándo es tu examen?
              </label>
              <Input
                id="exam-date"
                type="date"
                value={examDate}
                min={new Date().toISOString().slice(0, 10)}
                onChange={(e) => setExamDate(e.target.value)}
              />
            </div>
          )}

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <div className="flex gap-2 pt-2">
            {step === 0 ? (
              <Button variant="outline" className="h-11 flex-1" onClick={onBack}>
                Volver al diagnóstico
              </Button>
            ) : (
              <Button
                variant="outline"
                className="h-11 flex-1"
                disabled={saving}
                onClick={() => setStep((s) => s - 1)}
              >
                Atrás
              </Button>
            )}
            {step < steps.length - 1 ? (
              <Button
                className="h-11 flex-1"
                disabled={
                  step === 0
                    ? !universidad || !legalConsentAccepted
                    : !area
                }
                onClick={() => setStep((s) => s + 1)}
              >
                Siguiente
              </Button>
            ) : (
              <Button
                className="h-11 flex-1"
                disabled={!examDate || !legalConsentAccepted || saving || !isSessionReady}
                onClick={finish}
              >
                {saving ? 'Guardando…' : 'Crear mi plan'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
