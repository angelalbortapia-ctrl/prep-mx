'use client';

import Link from 'next/link';
import { ArrowRight, Brain, Calendar, Check, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { UniversityBanner } from '@/components/marketing/UniversityBanner';
import { pricingPlans } from '@/data/pricing';
import { landingCopy, type LandingUniversidad } from '@/lib/university-theme';

const features = [
  {
    icon: Calendar,
    title: 'Plan adaptativo',
    desc: 'Calendario personalizado según tu fecha de examen y área.',
  },
  {
    icon: Target,
    title: 'Simulacros reales',
    desc: 'Preguntas calibradas por dificultad y temario oficial.',
  },
  {
    icon: Brain,
    title: 'Tutor con IA',
    desc: 'Explicación inmediata en cada error, sin respuestas genéricas.',
  },
];

interface LandingPageViewProps {
  universidad: LandingUniversidad;
}

export function LandingPageView({ universidad }: LandingPageViewProps) {
  const copy = landingCopy(universidad);
  const planIntegral = pricingPlans.find((p) => p.id === 'premium')!;

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-6 md:px-8 md:pb-24 md:pt-8">
        <UniversityBanner value={universidad} basePath="/" showMixto={false} />

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Entra a {copy.heroHighlight} con un plan hecho{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                para ti
              </span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Simulacros, diagnóstico de debilidades y repaso inteligente.
              Deja de estudiar a ciegas.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-xl text-base shadow-lg shadow-primary/25">
                <Link href={copy.simuladorHref}>
                  Diagnóstico gratuito
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 rounded-xl border-2 bg-white/80 text-base">
                <Link href="/precios">Ver planes</Link>
              </Button>
            </div>
          </div>

          <div className="exam-shell relative overflow-hidden">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Vista previa</p>
            <p className="mt-3 text-lg font-semibold">¿Cuántos moles de H₂O se forman…?</p>
            <div className="mt-5 space-y-2">
              {['A) 1 mol', 'C) 3 mol', 'B) 2 mol ✓'].map((opt) => (
                <div
                  key={opt}
                  className={`rounded-xl border px-4 py-3 text-sm ${
                    opt.includes('✓')
                      ? 'border-green-300 bg-green-50 font-medium text-green-800'
                      : 'bg-muted/50'
                  }`}
                >
                  {opt}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Opciones mezcladas · Feedback inmediato · LaTeX
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 bg-white/50 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3 md:px-8">
          {features.map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              className="rounded-2xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-lg font-bold">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Plan integral PrepMX</h2>
          <p className="mt-3 text-muted-foreground">
            Todo lo que necesitas para {copy.theme.name}, con simulacros, tutor IA y repaso
            inteligente.
          </p>
        </div>

        <Card className="mx-auto mt-10 max-w-xl border-primary shadow-xl shadow-primary/15 ring-2 ring-primary/20">
          <CardHeader>
            <Badge className="w-fit">Recomendado</Badge>
            <CardTitle className="text-2xl">{planIntegral.name}</CardTitle>
            <CardDescription>{planIntegral.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              ${planIntegral.price}
              <span className="text-sm font-normal text-muted-foreground"> {planIntegral.period}</span>
            </p>
            <ul className="mt-6 space-y-3">
              {planIntegral.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-12 w-full rounded-xl shadow-lg shadow-primary/20">
              <Link href="/sign-up">
                Empezar plan integral
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 w-full rounded-xl bg-white">
              <Link href={copy.simuladorHref}>Probar diagnóstico gratis</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </>
  );
}
