#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
snapshot=${1:?Pass snapshot directory}
bash scripts/restore.sh "$snapshot"
docker compose -p "${RESTORE_PROJECT_NAME:-qe-foundation-restore}" -f compose.restore.yaml run --rm -T --entrypoint sh restorefiles -c 'test -d /restore/wp-content'
printf 'Restore content directory present. Verify user-visible pages/ownership before claiming full recovery.\n'
