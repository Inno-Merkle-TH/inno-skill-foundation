# 12 — Docker and Reproducible Commerce Environments

## Outcomes

Start a local store and prove persistence without claiming HA.

## Prerequisites

Lessons 08–11; approved Docker Engine/Compose; ports 8080/8081 free. Check Docker Desktop licensing before use.

Commands start at the repository root unless a different directory is named. Use a fresh root terminal for a new block; never guess your working directory.

## Concepts

Images define runtime content; containers execute it; volumes retain state. Configuration copied into an image needs a rebuild. Local admin and public storefront have different trust boundaries.

## Worked Example

An app restart preserves the synthetic order in MariaDB. Deleting its volume destroys persistence; restarting is not a restore test.

## Guided Lab

1. From root: `cd labs/commerce`, `bash scripts/init-env.sh`, `docker compose config --quiet`, `bash scripts/setup.sh`, then `bash tests/smoke.sh`.
2. Open `http://localhost:8080/shop/`, buy Synthetic QE Notebook using only fake data and LAB ONLY checkout.
3. Open admin at `http://localhost:8081/wp-login.php` as qe-admin using the locally generated .env password; compare order ID and 199 THB total.
4. Run `docker compose restart wordpress` and check the same order again.

## Expected Results

Smoke passes; admin is blocked on public port and available locally. Product and order survive app restart.

## Independent Challenge

Stop only wordpress, predict the result, inspect it, then `docker compose start wordpress`.

## Troubleshooting

Startup failures: inspect `docker compose ps` and bounded logs. Editing .env does not change passwords already stored in a database volume.

## Completion Checklist

- [ ] Verified checkout in admin rather than UI alone.
- [ ] Checked DB has no published host port.
- [ ] Restored app availability after the failure.
- [ ] Saved expected/actual results and execution limits in [learning evidence](../../templates/learning-evidence.md).

## Understanding Checklist

- [ ] Explain image/container/volume differences using this store.
- [ ] Explain why `down -v` is not routine cleanup.

## Cleanup and Handoff

Use `docker compose --profile tracking down` without -v if stopping. Lesson 13 explicitly restarts its DB.

## References

- [Official/source reading](https://docs.docker.com/compose/)
- [Learning guide](learning-guide.md)

---

[Previous: Unit Tests, Debugging and Code Review](11-unit-testing-debugging.md) · [Curriculum](../../README.md) · [Next: SQL and Test-Data Management](13-sql-test-data.md)
