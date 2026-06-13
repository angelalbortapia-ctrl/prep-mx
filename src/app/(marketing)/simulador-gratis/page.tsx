import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SimuladorGratisPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-3xl font-bold">Simulador gratuito</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Lead magnet: 20 preguntas de diagnóstico. Regístrate para guardar tu
        resultado y desbloquear tu plan completo.
      </p>
      <Button asChild className="mt-8 h-12">
        <Link href="/sign-up">Registrarme y empezar</Link>
      </Button>
    </section>
  );
}
