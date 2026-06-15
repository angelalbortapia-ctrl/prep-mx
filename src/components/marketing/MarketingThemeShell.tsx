'use client';

import { Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { AccessRestrictedBanner } from '@/components/system/AccessRestrictedBanner';
import { useUniTheme } from '@/contexts/UniThemeContext';
import { getUniVisualIdentity } from '@/lib/uni-visual-identity';
import { cn } from '@/lib/utils';
import {
  getUniversityTheme,
  parsePageUniversidad,
  parsePlanScope,
  type UniversidadFilter,
} from '@/lib/university-theme';

function effectiveThemeKey(
  pathname: string,
  uni: UniversidadFilter,
  plan: ReturnType<typeof parsePlanScope>
): UniversidadFilter {
  const themed = pathname === '/' || pathname === '/simulador-gratis' || pathname === '/precios';
  if (!themed) return 'todas';
  if (plan === 'todo' || uni === 'todas') return 'todas';
  return uni;
}

function ShellInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isHome = pathname === '/';
  const isSimulador = pathname === '/simulador-gratis';
  const isPrecios = pathname === '/precios';
  const themed = isHome || isSimulador || isPrecios;

  const universidad = parsePageUniversidad(searchParams.get('uni'));
  const plan = parsePlanScope(searchParams.get('plan'));
  const { filterId, hydrated, uniId } = useUniTheme();
  const themeKey = effectiveThemeKey(pathname, universidad, plan);
  const contextKey = hydrated ? filterId : themeKey;
  const theme = themed ? getUniversityTheme(contextKey) : null;
  const visual = hydrated ? getUniVisualIdentity(uniId) : null;

  return (
    <div
      className={cn(
        'flex min-h-screen flex-col font-sans transition-[background-color,color] duration-300',
        themed && visual
          ? cn('uni-theme', visual.skinClass, visual.pageBgClass)
          : 'bg-mesh'
      )}
      data-universidad={themed ? contextKey : undefined}
    >
      <AccessRestrictedBanner />
      <SiteNav variant="marketing" accentBar={theme?.accentBar} />
      <main className="flex-1">{children}</main>
      <Suspense fallback={null}>
        <SiteFooter variant="marketing" />
      </Suspense>
    </div>
  );
}

export function MarketingThemeShell({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col bg-mesh">
          <main className="flex-1">{children}</main>
        </div>
      }
    >
      <ShellInner>{children}</ShellInner>
    </Suspense>
  );
}
