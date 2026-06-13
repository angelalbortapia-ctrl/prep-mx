import Link from 'next/link';
import { ArrowRight, Brain, Calendar, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

export default function LandingPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-12 md:px-8 md:pb-24 md:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary shadow-sm">
              UNAM · IPN · UAM
            </span>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Entra a la uni con un plan hecho{' '}
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
                <Link href="/simulador-gratis">
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
              {['A) 1 mol', 'B) 2 mol ✓', 'C) 3 mol'].map((opt) => (
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
            <p className="mt-4 text-xs text-muted-foreground">Feedback inmediato · Con fórmulas LaTeX</p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/60 bg-white/40 py-16 md:py-20">
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
    </>
  );
}
