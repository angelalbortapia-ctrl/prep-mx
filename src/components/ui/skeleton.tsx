import { cn } from '@/lib/utils';

/** Primitivo Shadcn — pulso Tailwind para bloques simples. */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />;
}

export { Skeleton };
