import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { isDemoMode } from '@/lib/demo-mode';
import { isMaintenanceMode } from '@/lib/maintenance-mode';
import { getExamById } from '@/data/exams';
import { filterToUniId, parseUniId } from '@/lib/uni-theme-config';
import { hasFilterAccess, hasUniAccess, parseSubscriptions } from '@/lib/subscriptions';

const SUBSCRIPTION_COOKIE_KEY = 'prepmx-subscriptions';
const UNI_THEME_COOKIE_KEY = 'prepmx-uni-theme';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/onboarding', '/admin(.*)']);

/** Sin auth Clerk — simulador gratis, catálogos estáticos, health. */
const isPublicApiRoute = createRouteMatcher([
  '/api/exam/questions',
  '/api/study/materias',
  '/api/study/temario',
  '/api/study/temario/(.*)',
  '/api/temario/overview',
  '/api/health/(.*)',
]);

/** APIs que siguen activas durante mantenimiento (webhooks, jobs, health, catálogo público). */
const isMaintenanceExemptApi = createRouteMatcher([
  '/api/webhooks/(.*)',
  '/api/stripe/webhook',
  '/api/inngest',
  '/api/health/(.*)',
  '/api/admin/(.*)',
  '/api/exam/questions',
  '/api/study/materias',
  '/api/study/temario',
  '/api/study/temario/(.*)',
  '/api/temario/overview',
  '/api/public/sm2-demo',
]);

const isMaintenanceBlockedPage = createRouteMatcher([
  '/dashboard(.*)',
  '/onboarding',
  '/simulador-gratis',
]);

const isSubscriptionGatedRoute = createRouteMatcher([
  '/dashboard/estudio/guia/(.*)',
  '/dashboard/simulacros/((?!$).*)',
]);

function maintenanceApiResponse(): NextResponse {
  return NextResponse.json(
    {
      error: 'PrepMX está en mantenimiento. Intenta de nuevo en unos minutos.',
      maintenance: true,
    },
    { status: 503, headers: { 'Retry-After': '1800' } }
  );
}

function maintenancePageRedirect(req: NextRequest): NextResponse {
  const url = req.nextUrl.clone();
  url.pathname = '/mantenimiento';
  url.search = '';
  return NextResponse.redirect(url);
}

function readCookie(req: NextRequest, key: string): string | undefined {
  if (!key) return undefined;
  try {
    return req.cookies.get(key)?.value;
  } catch {
    return undefined;
  }
}

function getSubscriptions(req: NextRequest) {
  const raw = readCookie(req, SUBSCRIPTION_COOKIE_KEY);
  if (!raw) return parseSubscriptions(undefined);
  try {
    return parseSubscriptions(decodeURIComponent(raw));
  } catch {
    return parseSubscriptions(undefined);
  }
}

function getActiveUniId(req: NextRequest) {
  const raw = readCookie(req, UNI_THEME_COOKIE_KEY);
  return parseUniId(raw ?? 'unam');
}

function redirectRestricted(req: NextRequest, uni?: string) {
  const url = req.nextUrl.clone();
  url.pathname = '/';
  url.searchParams.set('access', 'restricted');
  if (uni) url.searchParams.set('uni', uni);
  return NextResponse.redirect(url);
}

function handleMaintenance(req: NextRequest): NextResponse | undefined {
  if (!isMaintenanceMode()) return undefined;

  const { pathname } = req.nextUrl;
  if (pathname === '/mantenimiento') return undefined;

  if (pathname.startsWith('/api/')) {
    if (isMaintenanceExemptApi(req)) return undefined;
    return maintenanceApiResponse();
  }

  if (isMaintenanceBlockedPage(req)) {
    return maintenancePageRedirect(req);
  }

  return undefined;
}

export default clerkMiddleware(async (auth, req) => {
  const maintenanceResponse = handleMaintenance(req);
  if (maintenanceResponse) return maintenanceResponse;

  if (isPublicApiRoute(req)) return;

  if (isDemoMode()) {
    // Auth bypass en demo; suscripción sigue aplicando abajo.
  } else if (isProtectedRoute(req)) {
    await auth.protect();
  }

  if (!isSubscriptionGatedRoute(req)) return;

  if (isDemoMode()) return;

  const subs = getSubscriptions(req);
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith('/dashboard/estudio/guia/')) {
    const activeUni = getActiveUniId(req);
    if (!hasUniAccess(subs, activeUni)) {
      return redirectRestricted(req, activeUni);
    }
    return;
  }

  const examMatch = pathname.match(/^\/dashboard\/simulacros\/([^/]+)$/);
  if (examMatch) {
    const examId = examMatch[1];
    const exam = getExamById(examId);
    if (!exam) return;
    const filter =
      exam.universidad === 'general'
        ? ('todas' as const)
        : exam.universidad;
    if (!hasFilterAccess(subs, filter)) {
      return redirectRestricted(req, filterToUniId(filter));
    }
  }
});

export const config = {
  matcher: [
    '/dashboard(.*)',
    '/onboarding',
    '/admin(.*)',
    '/simulador-gratis',
    '/mantenimiento',
    '/api/(.*)',
  ],
};
