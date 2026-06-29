'use client';

import { formatCalendarDateMx } from '@/lib/format-date';
import { useClientMounted } from '@/hooks/useClientMounted';
import { cn } from '@/lib/utils';

interface ClientFormattedDateProps {
  /** Fecha calendario de Supabase (YYYY-MM-DD o ISO). */
  isoDate: string;
  className?: string;
  prefix?: string;
}

/**
 * Fecha formateada solo en el cliente — evita hydration mismatch UTC vs CDMX.
 */
export function ClientFormattedDate({ isoDate, className, prefix }: ClientFormattedDateProps) {
  const mounted = useClientMounted();

  if (!mounted) {
    return (
      <time
        dateTime={isoDate.slice(0, 10)}
        className={cn(className)}
        suppressHydrationWarning
      >
        {prefix}
        —
      </time>
    );
  }

  return (
    <time dateTime={isoDate.slice(0, 10)} className={cn(className)}>
      {prefix}
      {formatCalendarDateMx(isoDate)}
    </time>
  );
}
