#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
public_status=$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:8080/)
test "$public_status" = 200
for path in /wp-admin/ /wp-admin/install.php /wp-login.php /xmlrpc.php /wp-json/wp/v2/users; do
  status=$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:8080$path")
  test "$status" = 403
done
admin_status=$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:8081/wp-login.php)
test "$admin_status" = 200
docker inspect "$(docker compose ps -q db)" --format '{{json .NetworkSettings.Ports}}' | node -e 'let text="";process.stdin.on("data",chunk=>text+=chunk);process.stdin.on("end",()=>{const ports=JSON.parse(text);if(Object.values(ports).some(bindings=>bindings!==null))process.exit(1);});'
before=$(docker compose run --rm -T cli option get qe_fixture_product_id)
docker compose restart wordpress
for attempt in $(seq 1 30); do
  if curl --fail -s http://127.0.0.1:8080/ >/dev/null; then break; fi
  sleep 2
done
after=$(docker compose run --rm -T cli option get qe_fixture_product_id)
test "$before" = "$after"
printf 'Commerce smoke: PASS (storefront/admin boundary/database exposure/persistence)\n'
