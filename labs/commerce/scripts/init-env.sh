#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
if test -e .env; then
  printf '.env already exists; not overwriting credentials.\n'
  exit 0
fi
umask 077
node --input-type=module -e 'import {randomBytes} from "node:crypto";import {writeFileSync} from "node:fs";const secret=()=>randomBytes(24).toString("hex");writeFileSync(".env",`DB_PASSWORD=${secret()}\nDB_ROOT_PASSWORD=${secret()}\nWP_ADMIN_PASSWORD=${secret()}\nPUBLIC_URL=http://localhost:8080\n`,{flag:"wx",mode:0o600});'
printf 'Created private .env. Do not commit or attach it to evidence.\n'
