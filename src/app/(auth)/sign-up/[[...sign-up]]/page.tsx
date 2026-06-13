import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-mesh px-4">
      <div className="exam-shell w-full max-w-sm space-y-4 text-center">
        <h1 className="text-2xl font-bold">Crear cuenta</h1>
        <p className="text-sm text-muted-foreground">
          Regístrate gratis y haz tu diagnóstico inicial de 20 preguntas.
        </p>
        <Button asChild className="h-12 w-full rounded-xl">
          <Link href="/onboarding">Empezar registro</Link>
        </Button>
        <p className="text-xs text-muted-foreground">
          ¿Ya tienes cuenta?{' '}
          <Link href="/sign-in" className="text-primary underline-offset-4 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
