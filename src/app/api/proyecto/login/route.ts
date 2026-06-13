import { NextRequest, NextResponse } from 'next/server';
import {
  createSessionToken,
  getAdminCookieName,
  validateCredentials,
} from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { username, password } = body;

  if (typeof username !== 'string' || typeof password !== 'string') {
    return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 400 });
  }

  if (!validateCredentials(username, password)) {
    return NextResponse.json({ error: 'Usuario o contraseña incorrectos' }, { status: 401 });
  }

  const token = await createSessionToken(username);
  const response = NextResponse.json({ ok: true });

  response.cookies.set(getAdminCookieName(), token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 30 * 24 * 60 * 60,
  });

  return response;
}
