#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
compose=(docker compose -f compose.yaml -f compose.ha.yaml)
"${compose[@]}" up -d --build --wait
trap '"${compose[@]}" start wordpress >/dev/null' EXIT
curl --fail -s http://localhost:8080/shop/ >/dev/null
test "$(curl --fail -s http://localhost:8080/wp-content/uploads/qe-asset.txt)" = "QE synthetic asset"
"${compose[@]}" stop wordpress
curl --fail --retry 5 --retry-delay 1 --retry-all-errors -s http://localhost:8080/shop/ >/dev/null
test "$(curl --fail --retry 5 --retry-delay 1 --retry-all-errors -s http://localhost:8080/wp-content/uploads/qe-asset.txt)" = "QE synthetic asset"
printf 'App failover PASS; database/proxy/host/shared-storage remain SPOFs.\n'
