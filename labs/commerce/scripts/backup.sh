#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
if docker ps --format '{{.Names}}' | grep -q '^qe-foundation-commerce-wordpress-b-'; then
  printf 'Stop HA app B before taking a consistent core snapshot.\n' >&2
  exit 1
fi
umask 077
snapshot="backups/$(date -u +%Y%m%dT%H%M%SZ)"
test ! -e "$snapshot" || { printf 'Snapshot already exists.\n' >&2; exit 1; }
mkdir -p "$snapshot"
docker compose stop proxy wordpress
trap 'docker compose start wordpress proxy >/dev/null' EXIT
docker compose run --no-deps --rm -T cli eval-file /lab/snapshot.php > "$snapshot/orders-summary.txt"
docker compose exec -T db sh -c 'MYSQL_PWD="$MARIADB_PASSWORD" mariadb-dump -u commerce --single-transaction commerce' | gzip > "$snapshot/commerce.sql.gz"
docker compose run --no-deps --rm -T --entrypoint sh cli -c 'tar -czf - -C /var/www/html wp-content' > "$snapshot/wp-content.tar.gz"
docker compose exec -T db sh -c 'MYSQL_PWD="$MARIADB_PASSWORD" mariadb -u commerce commerce -N -e "SELECT COUNT(*) FROM wp_options;"' > "$snapshot/options-count.txt"
node scripts/snapshot-integrity.mjs write "$snapshot"
printf '%s\n' "$snapshot"
printf 'Core backup only. Stop HA app B before backup if present.\n'
