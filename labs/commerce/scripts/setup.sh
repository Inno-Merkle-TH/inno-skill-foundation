#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
test -f .env || { printf 'Run bash scripts/init-env.sh first.\n' >&2; exit 1; }
docker compose up -d --wait
if ! docker compose run --rm -T cli core is-installed; then
  docker compose run --rm -T --entrypoint sh cli -c 'wp core install --url="$QE_PUBLIC_URL" --title="QE Synthetic Store" --admin_user=qe-admin --admin_password="$WP_ADMIN_PASSWORD" --admin_email=mentor@example.invalid --skip-email'
fi
installed_version=$(docker compose run --rm -T cli plugin get woocommerce --field=version 2>/dev/null || true)
if test "$installed_version" != 11.2.0; then
  docker compose run --rm -T cli plugin install woocommerce --version=11.2.0 --activate --force
else
  docker compose run --rm -T cli plugin activate woocommerce
fi
docker compose run --rm -T cli eval-file /lab/seed.php
printf 'Store: http://localhost:8080; admin: http://localhost:8081/wp-login.php\n'
