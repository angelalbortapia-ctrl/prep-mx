#!/usr/bin/env bash
# Restaura un .sql o .sql.gz generado por backup-supabase.sh
# Uso: SUPABASE_DB_URL='...' npm run restore:supabase -- backups/prepmx-20260101T120000Z.sql.gz
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Uso: $0 <archivo.sql|archivo.sql.gz>" >&2
  exit 1
fi

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
  echo "Error: define SUPABASE_DB_URL." >&2
  exit 1
fi

if ! command -v psql >/dev/null 2>&1; then
  echo "Error: psql no está instalado (postgresql-client)." >&2
  exit 1
fi

FILE="$1"
if [[ ! -f "$FILE" ]]; then
  echo "Error: no existe $FILE" >&2
  exit 1
fi

echo "⚠️  Esto SOBREESCRIBE datos en la base apuntada por SUPABASE_DB_URL."
echo "    Usa solo en staging o tras confirmar que es el dump correcto."
read -r -p "Escribe RESTAURAR para continuar: " CONFIRM
if [[ "$CONFIRM" != "RESTAURAR" ]]; then
  echo "Cancelado."
  exit 1
fi

echo "→ Restaurando $FILE"
if [[ "$FILE" == *.gz ]]; then
  gunzip -c "$FILE" | psql "$DB_URL" --set ON_ERROR_STOP=on --single-transaction
else
  psql "$DB_URL" --set ON_ERROR_STOP=on --single-transaction -f "$FILE"
fi

echo "✓ Restauración terminada"
