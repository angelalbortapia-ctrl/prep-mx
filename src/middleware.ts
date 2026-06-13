import { NextResponse, type NextRequest } from 'next/server';
import { getAdminCookieName, verifySessionToken } from '@/lib/admin-auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/proyecto')) return NextResponse.next();

  if (pathname === '/proyecto/login') return NextResponse.next();

  const token = request.cookies.get(getAdminCookieName())?.value;
  const valid = token ? await verifySessionToken(token) : false;

  if (!valid) {
    const loginUrl = new URL('/proyecto/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/proyecto/:path*'],
};
