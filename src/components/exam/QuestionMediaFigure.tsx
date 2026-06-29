'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface QuestionMediaFigureProps {
  src: string;
  alt: string;
  className?: string;
  /** Diagramas de física/geometría suelen ser horizontales. */
  aspect?: 'diagram' | 'square';
}

export function QuestionMediaFigure({
  src,
  alt,
  className,
  aspect = 'diagram',
}: QuestionMediaFigureProps) {
  return (
    <figure
      className={cn(
        'relative overflow-hidden rounded-xl border border-border bg-muted/30',
        aspect === 'diagram' ? 'aspect-[16/10] max-h-72 w-full' : 'aspect-square max-h-64 w-full max-w-xs',
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain p-2"
        sizes="(max-width: 768px) 100vw, 640px"
        unoptimized={src.endsWith('.svg')}
      />
    </figure>
  );
}

interface QuestionVideoEmbedProps {
  embedUrl: string;
  title: string;
  className?: string;
}

export function QuestionVideoEmbed({ embedUrl, title, className }: QuestionVideoEmbedProps) {
  return (
    <div
      className={cn(
        'relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-black',
        className
      )}
    >
      <iframe
        src={embedUrl}
        title={title}
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
