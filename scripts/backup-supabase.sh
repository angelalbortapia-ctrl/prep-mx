#!/usr/bin/env bash
# Respaldo lógico de Postgres (Supabase) con pg_dump.
# Uso: SUPABASE_DB_URL='postgresql://...' npm run backup:supabase
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ -f .env.local ]]; then
  set -a
  # shellcheck disable=SC1091
  source <(grep -v '^\s*#' .env.local | grep -v '^\s*$' | sed 's/^/export /')
  set +a
fi

DB_URL="${SUPABASE_DB_URL:-}"
if [[ -z "$DB_URL" ]]; then
  echo "Error: define SUPABASE_DB_URL en .env.local o en el entorno." >&2
  echo "  Supabase → Project Settings → Database → Connection string (URI, directa, puerto 5432)" >&2
  exit 1
fi

if ! command -v pg_dump >/dev/null 2>&1; then
  echo "Error: pg_dump no está instalado." >&2
  echo "  macOS: brew install libpq && brew link --force libpq" >&2
  echo "  Ubuntu/CI: apt-get install postgresql-client" >&2
  exit 1
fi

RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-14}"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
OUT_DIR="${BACKUP_OUTPUT_DIR:-$ROOT/backups}"
mkdir -p "$OUT_DIR"

OUT_FILE="$OUT_DIR/prepmx-${STAMP}.sql.gz"
SCHEMA_FILE="$OUT_DIR/prepmx-${STAMP}.schema.sql.gz"

echo "→ Volcando datos a $OUT_FILE"
pg_dump "$DB_URL" \
  --no-owner \
  --no-privileges \
  --format=plain \
  --encoding=UTF8 \
  | gzip -9 > "$OUT_FILE"

echo "→ Volcando solo esquema a $SCHEMA_FILE"
pg_dump "$DB_URL" \
  --schema-only \
  --no-owner \
  --no-privileges \
  --format=plain \
  | gzip -9 > "$SCHEMA_FILE"

BYTES="$(wc -c < "$OUT_FILE" | tr -d ' ')"
echo "✓ Respaldo listo ($(numfmt --to=iec-i --suffix=B "$BYTES" 2>/dev/null || echo "${BYTES} bytes"))"

if [[ "$RETENTION_DAYS" =~ ^[0-9]+$ ]] && [[ "$RETENTION_DAYS" -gt 0 ]]; then
  DELETED="$(find "$OUT_DIR" -maxdepth 1 -type f -name 'prepmx-*.sql.gz' -mtime +"$RETENTION_DAYS" -print -delete | wc -l | tr -d ' ')"
  if [[ "$DELETED" -gt 0 ]]; then
    echo "→ Eliminados $DELETED archivo(s) con más de ${RETENTION_DAYS} días"
  fi
fi

echo "$OUT_FILE"
