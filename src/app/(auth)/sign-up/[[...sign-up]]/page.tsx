import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';
import { clerkAppearance } from '@/lib/clerk-appearance';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-mesh px-4 py-12">
      <SignUp
        appearance={clerkAppearance}
        fallbackRedirectUrl="/onboarding"
        signInUrl="/sign-in"
      />
      <p className="mt-6 text-xs text-muted-foreground">
        ¿Ya tienes cuenta?{' '}
        <Link href="/sign-in" className="text-primary underline-offset-4 hover:underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}
