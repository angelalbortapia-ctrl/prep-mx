'use client';

import 'katex/dist/katex.min.css';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { cn } from '@/lib/utils';

export type MathVariant = 'rich' | 'temario' | 'inline';

interface MathRendererProps {
  content: string;
  className?: string;
  variant?: MathVariant;
}

export default function MathRenderer({ content, className, variant = 'inline' }: MathRendererProps) {
  return (
    <div
      className={cn(
        'math-content',
        variant === 'rich' && 'math-content--rich',
        variant === 'temario' && 'math-content--temario',
        variant === 'inline' && 'math-content--inline',
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
