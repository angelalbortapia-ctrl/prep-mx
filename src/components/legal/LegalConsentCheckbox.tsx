'use client';

import Link from 'next/link';
import { PRIVACY_PATH, TERMS_PATH } from '@/lib/legal-consent';
import { cn } from '@/lib/utils';

interface LegalConsentCheckboxProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}

export function LegalConsentCheckbox({
  id,
  checked,
  onCheckedChange,
  className,
  disabled = false,
}: LegalConsentCheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        'flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3 text-left text-sm leading-snug',
        disabled && 'cursor-not-allowed opacity-60',
        className
      )}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-primary"
      />
      <span className="text-muted-foreground">
        Acepto los{' '}
        <Link
          href={TERMS_PATH}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline-offset-4 hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          Términos y Condiciones
        </Link>{' '}
        y el{' '}
        <Link
          href={PRIVACY_PATH}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline-offset-4 hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          Aviso de Privacidad
        </Link>{' '}
        de PrepMX.
      </span>
    </label>
  );
}
