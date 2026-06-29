'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';
import { mathContentCompact, mathContentShell } from '@/lib/design-system/typography';
import { cn } from '@/lib/utils';

type MathVariant = 'rich' | 'temario' | 'inline' | 'exam-stem' | 'exam-option';

interface MathRenderErrorBoundaryProps {
  children: ReactNode;
  /** Texto original de la pregunta/opción — se muestra si KaTeX o markdown fallan. */
  fallbackContent: string;
  className?: string;
  variant?: MathVariant;
}

interface MathRenderErrorBoundaryState {
  hasError: boolean;
}

function MathFallback({
  content,
  className,
  variant = 'inline',
}: {
  content: string;
  className?: string;
  variant?: MathVariant;
}) {
  const isCompact = variant === 'inline' || variant === 'exam-option';

  return (
    <div
      className={cn(
        'math-content math-content--fallback text-foreground',
        isCompact ? mathContentCompact : mathContentShell,
        variant === 'rich' && 'math-content--rich',
        variant === 'temario' && 'math-content--temario',
        variant === 'inline' && 'math-content--inline',
        variant === 'exam-stem' && 'math-content--exam-stem',
        variant === 'exam-option' && 'math-content--exam-option',
        className
      )}
      data-math-fallback="true"
      title="Fórmula con error de formato — mostrando texto plano"
    >
      <p className="math-paragraph whitespace-pre-wrap">{content}</p>
    </div>
  );
}

/**
 * Aísla fallos de KaTeX / react-markdown para no tumbar el simulador entero.
 */
export class MathRenderErrorBoundary extends Component<
  MathRenderErrorBoundaryProps,
  MathRenderErrorBoundaryState
> {
  state: MathRenderErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): MathRenderErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[MathRenderer] KaTeX/markdown falló — fallback a texto plano', {
        message: error.message,
        componentStack: info.componentStack,
      });
    }
  }

  componentDidUpdate(prevProps: MathRenderErrorBoundaryProps): void {
    if (prevProps.fallbackContent !== this.props.fallbackContent && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <MathFallback
          content={this.props.fallbackContent}
          className={this.props.className}
          variant={this.props.variant}
        />
      );
    }

    return this.props.children;
  }
}
