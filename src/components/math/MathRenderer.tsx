'use client';

// Estilos KaTeX: import global en app/layout.tsx (evita FOUT con dynamic + ssr:false).
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { MathRenderErrorBoundary } from '@/components/math/MathRenderErrorBoundary';
import { mathContentCompact, mathContentShell } from '@/lib/design-system/typography';
import { cn } from '@/lib/utils';

export type MathVariant = 'rich' | 'temario' | 'inline' | 'exam-stem' | 'exam-option';

interface MathRendererProps {
  content: string;
  className?: string;
  variant?: MathVariant;
}

function MathRendererInner({ content, className, variant = 'inline' }: MathRendererProps) {
  const isCompact = variant === 'inline' || variant === 'exam-option';

  return (
    <div
      className={cn(
        'math-content text-foreground',
        isCompact ? mathContentCompact : mathContentShell,
        variant === 'rich' && 'math-content--rich',
        variant === 'temario' && 'math-content--temario',
        variant === 'inline' && 'math-content--inline',
        variant === 'exam-stem' && 'math-content--exam-stem',
        variant === 'exam-option' && 'math-content--exam-option',
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[[rehypeKatex, { strict: false, throwOnError: false }]]}
        components={{
          p: ({ children }) => <p className="math-paragraph">{children}</p>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default function MathRenderer(props: MathRendererProps) {
  const { content } = props;

  return (
    <MathRenderErrorBoundary
      key={content}
      fallbackContent={content}
      className={props.className}
      variant={props.variant}
    >
      <MathRendererInner {...props} />
    </MathRenderErrorBoundary>
  );
}
