'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { cn } from '@/lib/utils';

interface ToolPageShellProps {
  title: string;
  description?: string;
  tag?: string;
  children: React.ReactNode;
  className?: string;
}

export function ToolPageShell({ title, description, tag, children, className }: ToolPageShellProps) {
  return (
    <div className={cn('space-y-6 pb-8', className)}>
      <Link
        href="/dashboard/herramientas"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Todas las herramientas
      </Link>

      <PageHeader
        eyebrow={tag ? <span className="text-xs font-bold uppercase tracking-wider text-primary">{tag}</span> : undefined}
        title={title}
        description={description}
      />

      {children}
    </div>
  );
}
