import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { buttonCta, buttonDefault, buttonRadius, buttonRadiusHero } from '@/lib/design-system/buttons';
import { pressScale } from '@/lib/design-system/interactive';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold',
    buttonRadius,
    pressScale,
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-50'
  ),
  {
    variants: {
      variant: {
        /** Acción principal de la pantalla (in-app) — imán de clicks indigo */
        default: cn(
          'bg-primary text-primary-foreground shadow-sm shadow-primary/20',
          'md:hover:bg-primary/90 md:hover:shadow-md md:hover:shadow-primary/25'
        ),
        /** Registro / compra — violeta exclusivo */
        conversion: cn(
          'border-0 bg-violet-600 font-bold text-white shadow-md shadow-violet-600/25',
          'md:hover:bg-violet-700 focus-visible:ring-violet-500'
        ),
        outline:
          'border border-input bg-background md:hover:border-primary/30 md:hover:bg-muted/80',
        secondary: 'bg-secondary text-secondary-foreground md:hover:bg-secondary/80',
        ghost: 'md:hover:bg-accent/80 md:hover:text-accent-foreground',
        link: 'h-auto min-h-0 rounded-none px-0 text-primary underline-offset-4 md:hover:underline',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm md:hover:bg-destructive/90 focus-visible:ring-destructive',
      },
      size: {
        default: buttonDefault,
        sm: 'h-9 px-3 text-xs',
        lg: cn(buttonCta),
        cta: cn(buttonCta),
        hero: cn(buttonCta, buttonRadiusHero, 'px-8 font-bold'),
        icon: 'h-10 w-10 shrink-0 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
