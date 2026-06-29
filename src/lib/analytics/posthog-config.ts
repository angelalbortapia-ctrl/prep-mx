/** Host de ingestión PostHog (US por defecto; EU: https://eu.i.posthog.com). */
export const POSTHOG_DEFAULT_HOST = 'https://us.i.posthog.com';

export function getPostHogKey(): string | undefined {
  return process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim() || undefined;
}

export function getPostHogHost(): string {
  return process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() || POSTHOG_DEFAULT_HOST;
}

export function isPostHogEnabled(): boolean {
  return Boolean(getPostHogKey());
}

/** Agrupa rutas del dashboard para funnels (ej. tutor vs simulacros). */
export function parseDashboardSection(pathname: string): string | null {
  if (!pathname.startsWith('/dashboard')) return null;
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length <= 1) return 'home';

  const section = segments[1];
  if (section === 'herramientas' && segments[2]) {
    return `herramientas/${segments[2]}`;
  }
  if (section === 'estudio' && segments[2] === 'guia' && segments[3]) {
    return `estudio/guia/${segments[3]}`;
  }
  if (section === 'simulacros' && segments[2]) {
    return 'simulacros/examen';
  }
  if (section === 'diagnostico' && segments[2]) {
    return 'diagnostico/resultado';
  }

  return section;
}

export function buildPageviewProperties(pathname: string): Record<string, string | boolean> {
  const dashboardSection = parseDashboardSection(pathname);
  return {
    pathname,
    is_dashboard: pathname.startsWith('/dashboard'),
    ...(dashboardSection ? { dashboard_section: dashboardSection } : {}),
  };
}
