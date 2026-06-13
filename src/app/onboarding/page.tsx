'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { areaLabels, universidadLabels, type Universidad } from '@/types/user-profile';

const steps = ['Universidad', 'Área', 'Fecha de examen'];

export default function OnboardingPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [step, setStep] = useState(0);
  const [universidad, setUniversidad] = useState<Universidad | ''>('');
  const [area, setArea] = useState('');
  const [examDate, setExamDate] = useState('');
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoaded && !user) {
      router.replace('/sign-in');
    }
  }, [isLoaded, user, router]);

  async function finish() {
    if (!user) return;

    setSaving(true);
    setError('');

    const profile = {
      fullName: name || user.firstName || 'Alumno PrepMX',
      universidad,
      area,
      examDate,
      examTarget: `${universidad}_${area}`,
      onboardingComplete: true,
    };

    try {
      const res = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      if (!res.ok) throw new Error('No se pudo guardar el perfil');

      localStorage.setItem('prepmx-profile', JSON.stringify(profile));
      window.location.href = '/dashboard';
    } catch {
      setError('Algo falló al guardar. Intenta otra vez.');
      setSaving(false);
    }
  }

  if (!isLoaded || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-mesh">
        <p className="text-sm text-muted-foreground">Cargando…</p>
      </div>
    );
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
            Con esto generamos tu plan adaptativo hasta el día del examen.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 0 && (
            <>
              <Input placeholder="Tu nombre" value={name} onChange={(e) => setName(e.target.value)} />
              <div className="grid gap-2">
                {(['unam', 'ipn', 'uam'] as Universidad[]).map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setUniversidad(u)}
                    className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                      universidad === u ? 'border-primary bg-primary/5' : 'hover:bg-muted'
                    }`}
                  >
                    {universidadLabels[u]}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <div className="grid max-h-64 gap-2 overflow-y-auto">
              {Object.entries(areaLabels).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setArea(key)}
                  className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                    area === key ? 'border-primary bg-primary/5' : 'hover:bg-muted'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">¿Cuándo es tu examen?</label>
              <Input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} />
            </div>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex gap-2 pt-2">
            {step > 0 && (
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
                disabled={step === 0 ? !universidad : !area}
                onClick={() => setStep((s) => s + 1)}
              >
                Siguiente
              </Button>
            ) : (
              <Button className="h-11 flex-1" disabled={!examDate || saving} onClick={finish}>
                {saving ? 'Guardando…' : 'Crear mi plan'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
