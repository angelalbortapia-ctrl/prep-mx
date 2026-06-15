'use client';

import * as React from 'react';
import { useDeviceType } from '@/hooks/useDeviceType';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

/**
 * Capa adaptativa: en escritorio / iPad grande (>= lg) renderiza un Dialog modal
 * clásico; en móvil / tablet (< lg, iPhone/Android) renderiza un Bottom Sheet
 * (Vaul) con barra de arrastre táctil. La API de subcomponentes es idéntica en
 * ambos modos para que la vista que la consume no tenga que ramificar.
 */

type SheetVariant = 'drawer' | 'dialog';
const VariantContext = React.createContext<SheetVariant>('dialog');

function useSheetVariant(): SheetVariant {
  const { isDesktop, hydrated } = useDeviceType();
  // Antes de hidratar asumimos dialog (coincide con el render por defecto SSR).
  if (!hydrated) return 'dialog';
  return isDesktop ? 'dialog' : 'drawer';
}

export interface AdaptiveSheetProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  /** Para móvil: impide cerrar arrastrando/clic fuera (p. ej. feedback obligatorio). */
  dismissible?: boolean;
}

export function AdaptiveSheet({
  open,
  defaultOpen,
  onOpenChange,
  children,
  dismissible = true,
}: AdaptiveSheetProps) {
  const variant = useSheetVariant();

  if (variant === 'drawer') {
    return (
      <VariantContext.Provider value="drawer">
        <Drawer open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange} dismissible={dismissible}>
          {children}
        </Drawer>
      </VariantContext.Provider>
    );
  }

  return (
    <VariantContext.Provider value="dialog">
      <Dialog open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        {children}
      </Dialog>
    </VariantContext.Provider>
  );
}

export const AdaptiveSheetTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof DialogTrigger>
>((props, ref) => {
  const variant = React.useContext(VariantContext);
  const Trigger = variant === 'drawer' ? DrawerTrigger : DialogTrigger;
  return <Trigger ref={ref} {...props} />;
});
AdaptiveSheetTrigger.displayName = 'AdaptiveSheetTrigger';

export function AdaptiveSheetContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const variant = React.useContext(VariantContext);

  if (variant === 'drawer') {
    return (
      <DrawerContent className={className} {...props}>
        <div className="overflow-y-auto px-5 pt-4">{children}</div>
      </DrawerContent>
    );
  }

  return (
    <DialogContent className={cn('max-h-[90vh] overflow-y-auto', className)} {...props}>
      {children}
    </DialogContent>
  );
}

export function AdaptiveSheetHeader(props: React.HTMLAttributes<HTMLDivElement>) {
  const variant = React.useContext(VariantContext);
  const Header = variant === 'drawer' ? DrawerHeader : DialogHeader;
  // En drawer el padding lateral ya lo aplica el contenedor scroll.
  return <Header {...props} className={cn(variant === 'drawer' ? 'px-0 pt-0' : '', props.className)} />;
}

export function AdaptiveSheetFooter(props: React.HTMLAttributes<HTMLDivElement>) {
  const variant = React.useContext(VariantContext);
  const Footer = variant === 'drawer' ? DrawerFooter : DialogFooter;
  return <Footer {...props} className={cn(variant === 'drawer' ? 'px-0' : '', props.className)} />;
}

export function AdaptiveSheetTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogTitle>) {
  const variant = React.useContext(VariantContext);
  const Title = variant === 'drawer' ? DrawerTitle : DialogTitle;
  return <Title className={className} {...props} />;
}

export function AdaptiveSheetDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogDescription>) {
  const variant = React.useContext(VariantContext);
  const Description = variant === 'drawer' ? DrawerDescription : DialogDescription;
  return <Description className={className} {...props} />;
}
