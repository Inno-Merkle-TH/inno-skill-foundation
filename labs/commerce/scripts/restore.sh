#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
snapshot=${1:?Pass backup directory relative to labs/commerce}
test -f "$snapshot/commerce.sql.gz" && test -f "$snapshot/wp-content.tar.gz"
node scripts/snapshot-integrity.mjs verify "$snapshot"
project_name=${RESTORE_PROJECT_NAME:-qe-foundation-restore}
[[ "$project_name" =~ ^qe-foundation-restore(-[a-z0-9-]+)?$ ]] || { printf 'Restore project must use qe-foundation-restore prefix.\n' >&2; exit 1; }
compose=(docker compose -p "$project_name" -f compose.restore.yaml)
"${compose[@]}" up -d --wait restoredb
tables=$("${compose[@]}" exec -T restoredb sh -c 'MYSQL_PWD="$MARIADB_PASSWORD" mariadb -u commerce commerce -N -e "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema=DATABASE();"')
test "$tables" = 0 || { printf 'Refusing to overwrite existing isolated restore database.\n' >&2; exit 1; }
gzip -dc "$snapshot/commerce.sql.gz" | "${compose[@]}" exec -T restoredb sh -c 'MYSQL_PWD="$MARIADB_PASSWORD" mariadb -u commerce commerce'
cat "$snapshot/wp-content.tar.gz" | "${compose[@]}" run --rm -T restorefiles
actual=$("${compose[@]}" exec -T restoredb sh -c 'MYSQL_PWD="$MARIADB_PASSWORD" mariadb -u commerce commerce -N -e "SELECT COUNT(*) FROM wp_options;"')
test "$actual" = "$(cat "$snapshot/options-count.txt")"
"${compose[@]}" up -d --wait restoreapp
"${compose[@]}" build restorecli >/dev/null
summary=$("${compose[@]}" run --rm -T restorecli eval-file /lab/snapshot.php)
test "$summary" = "$(cat "$snapshot/orders-summary.txt")"
"${compose[@]}" run --rm -T --entrypoint sh restorefiles -c 'test "$(cat /restore/wp-content/uploads/qe-asset.txt)" = "QE synthetic asset"'
printf 'Isolated restore PASS: options/orders count/value and uploaded fixture match; primary store untouched.\n'
