# 17 — Automation Maintenance and Diagnostics

## Outcomes

Investigate flaky tests without hiding defects behind retries.

## Prerequisites

Lesson 16.

Commands start at the repository root unless a different directory is named. Use a fresh root terminal for a new block; never guess your working directory.

## Concepts

Flakiness can originate in product state, environment, test data or test code. Retries are diagnostic signals, not a substitute for ownership and repair. Parallel workers must not rely on a shared mutable total.

## Worked Example

A delayed status element should be awaited with a web-first assertion. A fixed sleep can be both too slow and too short.

## Guided Lab

1. Run the synthetic diagnostics test in `labs/qe-code/e2e/diagnostics.spec.ts`.
2. In a sandbox compare its condition-based wait with a deliberately too-short wait; record the root cause.
3. Run the stable suite twice; propose a quarantine record with owner, deadline, impact and exit condition for any real flake.

## Expected Results

Evidence distinguishes deterministic assertion failure from intermittent timing or environment failure.

## Independent Challenge

Run isolated diagnostic tests in parallel and explain why this does not prove concurrent checkout safety.

## Troubleshooting

Do not assert a global database order count while other tests create orders. Preserve the failing evidence before cleanup.

## Completion Checklist

- [ ] Identified the failing layer and reproduction conditions.
- [ ] Recorded remediation rather than only adding retries.
- [ ] Saved expected/actual results and execution limits in [learning evidence](../../templates/learning-evidence.md).

## Understanding Checklist

- [ ] Explain why green-after-retry is still a quality signal.
- [ ] Explain which artifacts may expose session/order keys.

## Cleanup and Handoff

Restore deliberate timing faults; keep sensitive commerce traces off.

## References

- [Official/source reading](https://playwright.dev/docs/test-retries)
- [Learning guide](learning-guide.md)

---

[Previous: Playwright Framework Foundations](16-playwright-framework.md) · [Curriculum](../../README.md) · [Next: Mobile Strategy and Exploratory Testing](18-mobile-strategy.md)
