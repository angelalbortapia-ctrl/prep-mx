import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-16 md:py-24">
      <div className="flex max-w-2xl flex-col gap-4">
        <p className="text-sm font-medium text-primary">UNAM · IPN · UAM</p>
        <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
          Certeza matemática de entrada a la universidad
        </h1>
        <p className="text-base text-muted-foreground md:text-lg">
          Simulacros reales, plan de estudio adaptado a tu fecha de examen y
          diagnóstico de debilidades con IA. Sin contenido genérico.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg" className="h-12">
          <Link href="/simulador-gratis">Diagnóstico gratuito</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="h-12">
          <Link href="/precios">Ver planes</Link>
        </Button>
      </div>
      <div className="grid gap-4 pt-8 md:grid-cols-3">
        {[
          { title: 'Plan adaptativo', desc: 'Calendario según tu examen y área.' },
          { title: 'Simulacros', desc: 'Preguntas calibradas por dificultad real.' },
          { title: 'Tutor IA', desc: 'Explicaciones después de cada error.' },
        ].map((item) => (
          <article key={item.title} className="rounded-xl border p-4">
            <h2 className="font-semibold">{item.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
