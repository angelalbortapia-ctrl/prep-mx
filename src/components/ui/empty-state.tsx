import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface EmptyStateAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: EmptyStateAction;
  /** Segundo enlace discreto bajo el botón principal. */
  secondaryAction?: EmptyStateAction;
  className?: string;
  /** Tarjeta compacta para incrustar en paneles existentes. */
  compact?: boolean;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  className,
  compact = false,
}: EmptyStateProps) {
  const actionButton = action ? (
    action.href ? (
      <Button asChild className={cn('mt-6 h-11 rounded-xl', compact && 'mt-4 h-10')}>
        <Link href={action.href}>{action.label}</Link>
      </Button>
    ) : (
      <Button
        type="button"
        onClick={action.onClick}
        className={cn('mt-6 h-11 rounded-xl', compact && 'mt-4 h-10')}
      >
        {action.label}
      </Button>
    )
  ) : null;

  const secondaryLink = secondaryAction ? (
    secondaryAction.href != null ? (
      <Button
        asChild
        variant="link"
        className={cn('mt-2 h-auto p-0 text-xs text-muted-foreground', compact && 'mt-1')}
      >
        <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
      </Button>
    ) : secondaryAction.onClick ? (
      <Button
        type="button"
        variant="link"
        onClick={secondaryAction.onClick}
        className={cn('mt-2 h-auto p-0 text-xs text-muted-foreground', compact && 'mt-1')}
      >
        {secondaryAction.label}
      </Button>
    ) : null
  ) : null;

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-border bg-card text-center shadow-sm',
        compact ? 'px-5 py-8' : 'px-6 py-10 md:px-10 md:py-12',
        className
      )}
    >
      <div
        className={cn(
          'mb-4 flex items-center justify-center rounded-2xl bg-muted/40',
          compact ? 'h-12 w-12' : 'h-16 w-16'
        )}
        aria-hidden
      >
        <Icon
          className={cn(
            'text-slate-300 dark:text-slate-600',
            compact ? 'h-6 w-6' : 'h-8 w-8'
          )}
          strokeWidth={1.5}
        />
      </div>
      <h3 className={cn('font-semibold text-foreground', compact ? 'text-sm' : 'text-base')}>
        {title}
      </h3>
      <p
        className={cn(
          'mt-2 max-w-md leading-relaxed text-muted-foreground',
          compact ? 'text-xs' : 'text-sm'
        )}
      >
        {description}
      </p>
      {actionButton}
      {secondaryLink}
    </div>
  );
}
