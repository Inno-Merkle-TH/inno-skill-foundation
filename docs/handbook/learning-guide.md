# Learning Guide

## The Learning Cycle

Read the outcome and prerequisites, write expected results, perform the guided lab, then change an input for the independent challenge. Tick completion checks only with evidence and understanding checks only when you can explain or predict behavior yourself. Finish cleanup before starting a dependent lesson.

Use one [evidence record](../../templates/learning-evidence.md) per lesson. Statuses are **verified**, **investigate**, **not executed**, and **out of scope**. Never convert an unavailable device/account into a pass. There is no scoring system.

## Working Directory and Tools

Root means the directory containing README.md, docs, labs and templates. Run `pwd` before commands. A new block beginning `cd labs/...` assumes a new root terminal. Scripts use Bash/WSL/Git Bash, not unmodified PowerShell syntax. Node must match package engines; use npm ci with the lockfile, not arbitrary dependency upgrades.

Use approved official installers. Docker Desktop is not free for every organization; Linux Docker Engine is an alternative subject to policy. Do not disable security controls, install global SDKs without approval or use sudo npm to fix ownership mistakes.

## Sandbox and Evidence

Use a personal sandbox for learner changes. Copy only tracked source files, not .env, backups, node_modules, app binaries or another repository's .git directory. Inspect git status, git diff and git diff --cached before committing. A file not yet tracked will not appear in ordinary git diff.

Evidence identifies requirement, input, expected/actual, command/directory, exit status, commit and limitations. Remove cookies, tokens, real UID, customer data and order keys. Screenshots alone do not prove persistence. Keep review feedback and AI assistance disclosure; never send real customer data to an AI tool.

## Public Tunnel Preflight

Before ngrok is running, check the local public port:

```bash
for route in /wp-admin/ /wp-login.php /xmlrpc.php /wp-json/wp/v2/users '/?rest_route=/wp/v2/users'; do
  curl -s -o /dev/null -w '%{http_code}\\n' "http://localhost:8080$route"
done
```

All responses must be 403. From labs/commerce inspect docker compose ps: DB has no published host port; admin port 8081 binds loopback. Get the endpoint owner's review before exposure. A local collector is a lab, not a hardened public service.

Use an approved ngrok free account/agent. Store its token privately. Run `ngrok http 8080`, note the assigned HTTPS origin, then stop the tunnel while changing `PUBLIC_URL=https://<assigned-domain>` in labs/commerce/.env. From labs/commerce run `docker compose up -d --force-recreate wordpress`. Reopen the tunnel, recheck denied routes through HTTPS and verify the storefront before publishing the test rich-menu link. If restrictions fail, close it immediately. Never tunnel 8081 or database ports. Record any warning page separately from app behavior.

## Service Handoffs and Cleanup

| After | Safe next action from labs/commerce |
|---|---|
| Core was stopped | `docker compose up -d --wait` |
| SQL-only lab | Start core before browser work; retain qe_* fixture tables |
| Collector outage | `docker compose --profile tracking up -d qe-api`; verify health and actual persistence separately |
| DB outage | `docker compose start db`; inspect health and business reads |
| Public tunnel | Stop ngrok, restore PUBLIC_URL=http://localhost:8080, recreate wordpress and inspect shop/admin |
| HA exercise | Stop wordpress-b with the HA override, rebuild core proxy and verify core mode |
| Isolated restore | Stop the actual restore project by its name and compose.restore.yaml; retain volumes |
| End of core/tracking work | `docker compose --profile tracking down`, without -v |

Smoke/failover/backup can restart services: never run them alongside E2E. Config/source COPY changes need image rebuild, not only restart. Do not run down -v, git clean -fdx or restore over primary to obtain a green report.

## What Existing Labs Prove

SQL/TypeScript fixtures do not automatically extract live WooCommerce orders. The collector accepts purchase only and does not authenticate commerce truth. Client pending events are memory-only; closing a page can lose them. Core backup covers commerce DB/wp-content, not eventdb/LINE/GA4. Native mobile sample tests do not test a native commerce app.

## Using Answers and Feedback

Try the exercise before opening answer guidance. After reading a hint, change the fixture and predict the result to check understanding. Mentors help with uncertainty; they do not score every checkbox. Provider binding, public exposure, legal decisions and release risk acceptance still require the appropriate owner.

[Start lesson 01](01-quality-engineering.md) · [Curriculum](../../README.md)
