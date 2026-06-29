'use client';

import { useState } from 'react';
import { SignUp } from '@clerk/nextjs';
import { LegalConsentCheckbox } from '@/components/legal/LegalConsentCheckbox';
import { clerkAppearance } from '@/lib/clerk-appearance';

export function SignUpWithLegalConsent() {
  const [consentAccepted, setConsentAccepted] = useState(false);

  return (
    <div className="flex w-full max-w-[400px] flex-col items-center">
      <LegalConsentCheckbox
        id="signup-legal-consent"
        checked={consentAccepted}
        onCheckedChange={setConsentAccepted}
        className="mb-4 w-full"
      />

      {consentAccepted ? (
        <SignUp
          appearance={clerkAppearance}
          fallbackRedirectUrl="/onboarding"
          signInUrl="/sign-in"
        />
      ) : (
        <div
          className="w-full rounded-xl border border-dashed border-border bg-card/60 px-6 py-10 text-center text-sm text-muted-foreground"
          aria-live="polite"
        >
          Marca la casilla de arriba para continuar con el registro.
        </div>
      )}
    </div>
  );
}
