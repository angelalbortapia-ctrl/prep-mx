'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { PlanScope } from '@/lib/university-theme';

interface PlanScopeToggleProps {
  value: PlanScope;
  basePath?: string;
  className?: string;
}

export function PlanScopeToggle({
  value,
  basePath,
  className,
}: PlanScopeToggleProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function setScope(scope: PlanScope) {
    if (scope === value) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set('plan', scope);
    if (scope === 'todo') {
      params.set('uni', 'todas');
    } else if (params.get('uni') === 'todas') {
      params.set('uni', 'unam');
    }

    const path = basePath ?? window.location.pathname;
    router.push(`${path}?${params.toString()}#planes`, { scroll: false });
  }

  const options: { id: PlanScope; label: string; hint: string }[] = [
    { id: 'universidad', label: 'Por universidad', hint: 'Enfocado en una sola uni' },
    { id: 'todo', label: 'Todo en uno', hint: 'UNAM + IPN + UAM incluidas' },
  ];

  return (
    <div className={cn('space-y-3', className)}>
      <p className="text-center text-sm font-medium text-muted-foreground">
        Elige cómo quieres prepararte
      </p>
      <div className="mx-auto flex max-w-md flex-col gap-2 sm:flex-row sm:rounded-2xl sm:border sm:bg-white sm:p-1 sm:shadow-sm">
        {options.map((opt) => {
          const active = value === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setScope(opt.id)}
              aria-pressed={active}
              className={cn(
                'flex flex-1 flex-col rounded-xl px-4 py-3 text-left transition-all sm:rounded-lg',
                active
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                  : 'border bg-white hover:bg-muted/50 sm:border-0 sm:bg-transparent'
              )}
            >
              <span className="text-sm font-bold">{opt.label}</span>
              <span
                className={cn(
                  'text-xs',
                  active ? 'text-primary-foreground/85' : 'text-muted-foreground'
                )}
              >
                {opt.hint}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
