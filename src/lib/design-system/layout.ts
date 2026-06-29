import { cn } from '@/lib/utils';

/** Contenedor fijo landing / marketing — evita desparrame en pantallas ultra anchas. */
export const landingContainer = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';

export function landingContainerClass(className?: string): string {
  return cn(landingContainer, className);
}

/** Área útil bajo nav + ticker en el dashboard autenticado. */
export const appViewportMain = 'min-h-[var(--app-viewport-main)]';

/** Main del app shell — ocupa todo el ancho; el contenido elige su max-width interno. */
export const appMainShell = cn('flex w-full flex-1 flex-col', appViewportMain);

/** Padding estándar de páginas del dashboard. */
export const appPagePadding = 'px-4 py-6 md:px-6 lg:px-8 md:py-8';

/** Simulacro activo: sin footer, sin padding vertical — el layout de examen controla los bloques. */
export const appExamPadding = 'px-4 md:px-6 lg:px-8';

/** Contenedor interior opcional para lectura cómoda en pantallas ultra anchas. */
export const appContentWide = 'mx-auto w-full max-w-7xl';
