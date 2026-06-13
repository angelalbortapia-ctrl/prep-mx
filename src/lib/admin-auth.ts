const COOKIE_NAME = 'prepmx_admin_session';
const SESSION_DAYS = 30;

async function hmacSign(payload: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(payload));
  return Buffer.from(sig).toString('base64url');
}

export async function createSessionToken(username: string): Promise<string> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error('ADMIN_SESSION_SECRET no configurado');

  const exp = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const payload = `${username}:${exp}`;
  const sig = await hmacSign(payload, secret);
  return `${payload}:${sig}`;
}

export async function verifySessionToken(token: string): Promise<boolean> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  const expectedUser = process.env.ADMIN_USERNAME;
  if (!secret || !expectedUser) return false;

  const lastColon = token.lastIndexOf(':');
  if (lastColon === -1) return false;

  const sig = token.slice(lastColon + 1);
  const payload = token.slice(0, lastColon);
  const expIndex = payload.lastIndexOf(':');
  if (expIndex === -1) return false;

  const username = payload.slice(0, expIndex);
  const exp = Number(payload.slice(expIndex + 1));

  if (username !== expectedUser) return false;
  if (!Number.isFinite(exp) || Date.now() > exp) return false;

  const expectedSig = await hmacSign(payload, secret);
  return sig === expectedSig;
}

export function getAdminCookieName() {
  return COOKIE_NAME;
}

export function validateCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPass = process.env.ADMIN_PASSWORD;
  if (!expectedUser || !expectedPass) return false;

  if (username.length !== expectedUser.length || password.length !== expectedPass.length) {
    return username === expectedUser && password === expectedPass;
  }

  let userMatch = 0;
  let passMatch = 0;
  for (let i = 0; i < username.length; i++) {
    userMatch |= username.charCodeAt(i) ^ expectedUser.charCodeAt(i);
  }
  for (let i = 0; i < password.length; i++) {
    passMatch |= password.charCodeAt(i) ^ expectedPass.charCodeAt(i);
  }

  return userMatch === 0 && passMatch === 0;
}
