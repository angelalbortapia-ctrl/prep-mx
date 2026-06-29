#!/usr/bin/env node
/**
 * Audita enlaces estáticos en marketing/layout/legal contra rutas reales de App Router.
 * Uso: node scripts/audit-marketing-links.mjs
 */

import { readFileSync, readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');

const VALID_HASH_ANCHORS = new Set(['planes', 'showcase', 'universidades', 'temario-oficial']);

function collectAppRoutes(dir, base = '') {
  const routes = new Set();
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === 'api') continue;
      const segment = ent.name.startsWith('(') ? '' : `/${ent.name}`;
      collectAppRoutes(full, `${base}${segment}`).forEach((r) => routes.add(r));
    } else if (ent.name === 'page.tsx' || ent.name === 'page.ts') {
      routes.add(base || '/');
    }
  }
  return routes;
}

const appRoutes = collectAppRoutes(path.join(SRC, 'app'));

const scanDirs = [
  path.join(SRC, 'components/marketing'),
  path.join(SRC, 'components/layout'),
  path.join(SRC, 'components/legal'),
];

const hrefPatterns = [
  /href=\{?['"`]([^'"`#]+)/g,
  /buildJourneyHref\(\s*['"`]([^'"`]+)/g,
];

const issues = [];

function walk(dir) {
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      walk(full);
      continue;
    }
    if (!/\.(tsx|ts)$/.test(ent.name)) continue;

    const rel = path.relative(ROOT, full);
    const src = readFileSync(full, 'utf8');

    for (const re of hrefPatterns) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(src))) {
        const href = m[1];
        if (href.includes('${')) continue;
        if (href.startsWith('http') || href.startsWith('mailto:')) continue;
        const pathname = href.split('?')[0];
        const ok =
          appRoutes.has(pathname) ||
          pathname.startsWith('/blog/') ||
          pathname.startsWith('/dashboard') ||
          pathname.startsWith('/sign-in') ||
          pathname.startsWith('/sign-up');
        if (!ok) issues.push({ file: rel, href, kind: 'unknown-route' });
      }
    }

    const hashRe = /href=\{?['"`](#[a-z0-9-]+)/gi;
    let hm;
    while ((hm = hashRe.exec(src))) {
      const id = hm[1].slice(1);
      if (!VALID_HASH_ANCHORS.has(id)) {
        issues.push({ file: rel, href: hm[1], kind: 'unknown-hash' });
      }
    }
  }
}

for (const dir of scanDirs) walk(dir);

if (issues.length) {
  console.error('Marketing link audit failed:\n');
  for (const i of issues) console.error(`  [${i.kind}] ${i.file} → ${i.href}`);
  process.exit(1);
}

console.log('Marketing link audit OK');
console.log(`  App routes: ${appRoutes.size}`);
console.log(`  Hash anchors: ${[...VALID_HASH_ANCHORS].join(', ')}`);
