import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-4 text-center">
        <h1 className="text-2xl font-bold">Crear cuenta</h1>
        <p className="text-sm text-muted-foreground">
          Registro con Clerk — próximo paso del roadmap.
        </p>
        <Button asChild className="h-12 w-full">
          <Link href="/dashboard">Continuar al dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
