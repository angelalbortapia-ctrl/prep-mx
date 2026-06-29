import type { ReactNode } from 'react';

/** El simulacro activo llena el viewport bajo el header (layout de 3 bloques). */
export default function ExamActiveLayout({ children }: { children: ReactNode }) {
  return <div className="flex min-h-full flex-1 flex-col">{children}</div>;
}
