import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-mesh px-4">
      <div className="exam-shell w-full max-w-sm space-y-4 text-center">
        <h1 className="text-2xl font-bold">Iniciar sesión</h1>
        <p className="text-sm text-muted-foreground">
          Clerk se activará con tus API keys. Por ahora entra con el flujo demo.
        </p>
        <Button asChild className="h-12 w-full rounded-xl">
          <Link href="/onboarding">Continuar con demo</Link>
        </Button>
        <p className="text-xs text-muted-foreground">
          ¿No tienes cuenta?{' '}
          <Link href="/sign-up" className="text-primary underline-offset-4 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
