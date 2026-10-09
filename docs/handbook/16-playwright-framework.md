# 16 — Playwright Framework Foundations

## Outcomes

Build readable, isolated browser tests around user-visible behavior.

## Prerequisites

Lessons 12, 15; core and tracking services running; Chromium installed.

Commands start at the repository root unless a different directory is named. Use a fresh root terminal for a new block; never guess your working directory.

## Concepts

Fixtures manage dependencies and lifetime; page helpers express domain actions. Assertions belong near test intent. A small useful helper is preferable to a generic framework hierarchy.

## Worked Example

The Storefront helper adds the notebook and completes synthetic checkout. The test asserts the completed order and purchase contract, rather than assuming clicks imply success.

## Guided Lab

1. From `labs/commerce` run `docker compose --profile tracking up -d --build` and check `/lab-api/health`.
2. From `labs/qe-code` run `npx playwright install chromium`, `npm run test:e2e` and inspect e2e/fixtures.ts and pages/storefront.ts.
3. Trace the granted, denied and mocked collector-rejection cases; label mocked evidence accurately.

## Expected Results

Checkout and purchase assertions pass for granted consent; denied consent allows checkout without collection. Rejection does not become an order failure.

## Independent Challenge

Change a business assertion in a sandbox, observe the targeted failure and restore it.

## Troubleshooting

Do not run smoke/failover/restore concurrently with E2E. Diagnose readiness, selectors and business state before changing timeouts.

## Completion Checklist

- [ ] Used a fresh browser context per test.
- [ ] Kept assertions readable and synthetic inputs explicit.
- [ ] Saved expected/actual results and execution limits in [learning evidence](../../templates/learning-evidence.md).

## Understanding Checklist

- [ ] Explain why the helper does not prove the order was persisted.
- [ ] Explain which outage case is mocked versus a real service failure.

## Cleanup and Handoff

Retain synthetic orders for data review; do not bulk-delete orders to reset tests.

## References

- [Official/source reading](https://playwright.dev/docs/best-practices)
- [Learning guide](learning-guide.md)

---

[Previous: Maintainable API Automation](15-api-automation.md) · [Curriculum](../../README.md) · [Next: Automation Maintenance and Diagnostics](17-automation-maintenance.md)
