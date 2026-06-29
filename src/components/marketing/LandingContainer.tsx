import { landingContainer } from '@/lib/design-system/layout';
import { cn } from '@/lib/utils';
import type { ElementType, ReactNode } from 'react';

interface LandingContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

export function LandingContainer({ as: Component = 'div', className, children }: LandingContainerProps) {
  return <Component className={cn(landingContainer, className)}>{children}</Component>;
}
