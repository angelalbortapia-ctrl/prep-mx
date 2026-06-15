'use client';

import 'katex/dist/katex.min.css';
import { Children, isValidElement, useMemo, type ReactNode } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { Lightbulb, TriangleAlert } from 'lucide-react';
import { useUniTheme } from '@/contexts/UniThemeContext';
import { cn } from '@/lib/utils';

interface GuiaMarkdownProps {
  content: string;
}

const HEADING_ID_PATTERN = /\s*\{#([\w-]+)\}\s*$/;

function childrenToText(children: ReactNode): string {
  let text = '';
  Children.forEach(children, (child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      text += String(child);
    } else if (isValidElement(child)) {
      const props = child.props as { children?: ReactNode };
      text += childrenToText(props.children);
    }
  });
  return text;
}

function resolveHeading(children: ReactNode): { id: string; content: ReactNode } {
  const raw = childrenToText(children);
  const match = raw.match(HEADING_ID_PATTERN);

  if (match) {
    const id = match[1];
    const cleaned = Children.map(children, (child) => {
      if (typeof child === 'string') return child.replace(HEADING_ID_PATTERN, '');
      return child;
    });
    return { id, content: cleaned };
  }

  const slug = raw
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return { id: slug, content: children };
}

function useThemedComponents(): Components {
  const { entry } = useUniTheme();
  const primaryHsl = entry.colors.primaryHsl;
  const accentHsl = entry.colors.accentHsl;

  return useMemo(
    (): Components => ({
      h1: ({ children }) => {
        const { id, content } = resolveHeading(children);
        return (
          <h1 id={id} className="scroll-mt-24 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {content}
          </h1>
        );
      },
      h2: ({ children }) => {
        const { id, content } = resolveHeading(children);
        return (
          <h2 id={id} className="scroll-mt-24 text-xl font-bold tracking-tight text-foreground md:text-2xl">
            {content}
          </h2>
        );
      },
      h3: ({ children }) => {
        const { id, content } = resolveHeading(children);
        return (
          <h3 id={id} className="scroll-mt-24 text-lg font-semibold text-foreground md:text-xl">
            {content}
          </h3>
        );
      },
      blockquote: ({ children }) => (
        <div
          className="not-prose my-5 rounded-r-[var(--radius)] border-l-4 p-4"
          style={{
            borderColor: `hsl(${accentHsl})`,
            background: `linear-gradient(90deg, hsl(${primaryHsl} / 0.12), hsl(${accentHsl} / 0.06))`,
          }}
        >
          <p
            className="mb-1 flex items-center gap-1.5 text-sm font-bold"
            style={{ color: `hsl(${primaryHsl})` }}
          >
            <TriangleAlert className="h-4 w-4" aria-hidden />
            ⚠️ Trampa de Examen
          </p>
          <div className="text-sm leading-relaxed text-foreground/90 [&_p]:m-0">{children}</div>
        </div>
      ),
      pre: ({ children }) => (
        <div
          className="not-prose my-5 rounded-[var(--radius)] border p-4"
          style={{
            borderColor: `hsl(${accentHsl} / 0.35)`,
            background: `linear-gradient(135deg, hsl(${primaryHsl} / 0.08), hsl(${accentHsl} / 0.12))`,
          }}
        >
          <p
            className="mb-1.5 flex items-center gap-1.5 text-sm font-bold"
            style={{ color: `hsl(${primaryHsl})` }}
          >
            <Lightbulb className="h-4 w-4" aria-hidden />
            💡 Tip de Examen
          </p>
          <div className="font-mono text-[13px] leading-relaxed text-foreground/90 [&_code]:whitespace-pre-wrap [&_code]:break-words">
            {children}
          </div>
        </div>
      ),
      code: ({ className, children, ...props }) => {
        const isBlock = typeof className === 'string' && className.includes('language-');
        if (isBlock) {
          return (
            <code className={cn('block bg-transparent', className)} {...props}>
              {children}
            </code>
          );
        }
        return (
          <code
            className="rounded-md px-1.5 py-0.5 font-mono text-[0.9em]"
            style={{
              backgroundColor: `hsl(${accentHsl} / 0.15)`,
              color: `hsl(${primaryHsl})`,
            }}
            {...props}
          >
            {children}
          </code>
        );
      },
      div: ({ className, children, ...props }) => {
        if (typeof className === 'string' && className.includes('math-display')) {
          return (
            <div className={cn(className, 'overflow-x-auto')} {...props}>
              {children}
            </div>
          );
        }
        return (
          <div className={className} {...props}>
            {children}
          </div>
        );
      },
    }),
    [primaryHsl, accentHsl]
  );
}

export default function GuiaMarkdown({ content }: GuiaMarkdownProps) {
  const components = useThemedComponents();

  return (
    <div className="prose prose-slate max-w-none prose-headings:scroll-mt-24 prose-p:leading-relaxed prose-li:leading-relaxed dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[[rehypeKatex, { strict: false, throwOnError: false }]]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
