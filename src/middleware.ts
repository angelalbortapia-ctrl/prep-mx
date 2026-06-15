import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { isDemoMode } from '@/lib/demo-mode';
import { getExamById } from '@/data/exams';
import { filterToUniId, parseUniId } from '@/lib/uni-theme-config';
import { hasFilterAccess, hasUniAccess, parseSubscriptions } from '@/lib/subscriptions';

const SUBSCRIPTION_COOKIE_KEY = 'prepmx-subscriptions';
const UNI_THEME_COOKIE_KEY = 'prepmx-uni-theme';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/onboarding']);

const isSubscriptionGatedRoute = createRouteMatcher([
  '/dashboard/estudio/guia/(.*)',
  '/dashboard/simulacros/((?!$).*)',
]);

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

export default clerkMiddleware(async (auth, req) => {
  if (isDemoMode()) {
    // Auth bypass en demo; suscripción sigue aplicando abajo.
  } else if (isProtectedRoute(req)) {
    await auth.protect();
  }

  if (!isSubscriptionGatedRoute(req)) return;

  // En modo demo exploramos libremente sin redirecciones de paywall.
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
  matcher: ['/dashboard(.*)', '/onboarding'],
};
