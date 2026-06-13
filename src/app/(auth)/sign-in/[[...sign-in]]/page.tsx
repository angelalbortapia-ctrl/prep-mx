import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';
import { clerkAppearance } from '@/lib/clerk-appearance';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-mesh px-4 py-12">
      <SignIn
        appearance={clerkAppearance}
        fallbackRedirectUrl="/dashboard"
        signUpUrl="/sign-up"
      />
      <p className="mt-6 text-xs text-muted-foreground">
        ¿No tienes cuenta?{' '}
        <Link href="/sign-up" className="text-primary underline-offset-4 hover:underline">
          Regístrate gratis
        </Link>
      </p>
    </div>
  );
}
