'use client';

import dynamic from 'next/dynamic';
import { prepareTemarioMath, textLikelyHasMath } from '@/lib/prepare-math-text';
import type { MathVariant } from '@/components/math/MathRenderer';

const MathRenderer = dynamic(() => import('@/components/math/MathRenderer'), {
  ssr: false,
  loading: () => <span className="text-muted-foreground">…</span>,
});

interface MathTextProps {
  content: string;
  className?: string;
  variant?: MathVariant;
}

export function MathText({ content, className, variant = 'temario' }: MathTextProps) {
  const processed = variant === 'temario' ? prepareTemarioMath(content) : content;

  if (!textLikelyHasMath(processed) && !/\$/.test(processed)) {
    return <span className={className}>{content}</span>;
  }

  return <MathRenderer content={processed} variant={variant} className={className} />;
}
