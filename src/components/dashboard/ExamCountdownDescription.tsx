'use client';

import { useMemo } from 'react';
import { examCountdownLabelForUni } from '@/data/admission-timeline';
import { useUniTheme } from '@/hooks/useUniTheme';
import { useClientMounted } from '@/hooks/useClientMounted';

interface ExamCountdownDescriptionProps {
  planLabel: string;
}

/** Cuenta regresiva al examen — solo en cliente (evita mismatch de zona horaria). */
export function ExamCountdownDescription({ planLabel }: ExamCountdownDescriptionProps) {
  const mounted = useClientMounted();
  const { uniId } = useUniTheme();

  const examLabel = useMemo(() => {
    if (!mounted) return '';
    return examCountdownLabelForUni(uniId, new Date());
  }, [mounted, uniId]);

  return (
    <span suppressHydrationWarning>
      {mounted ? `${examLabel} · ${planLabel}` : `… · ${planLabel}`}
    </span>
  );
}
