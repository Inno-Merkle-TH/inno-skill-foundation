# Native execution ledger — enterprise QE curriculum

Plan: [implementation plan](../superpowers/plans/2026-10-09-enterprise-qe-curriculum.md).

## Decisions

- Ruling: work in the existing checkout on main, as approved in the specification/plan and established delivery workflow; do not create an unsolicited branch or worktree. Cost if wrong: changes are not isolated from simultaneous local edits; check Git status before every commit.
- Shared interfaces: API service/collection/performance use the same resource contract; Playwright preserves purchase/consent semantics; mobile is isolated from commerce; documentation manifest owns lesson order.
- Ruling: retain the skill scratch workspace but keep the authoritative execution ledger here so delivery decisions survive cleanup.

## Baseline

- Task 1: core npm ci, 46 tests, typecheck and snapshot-integrity test passed on Node 22.22.3, npm 12.1.0, Docker server 29.8.1.
- Xcode 27.0 is available; Android adb and k6 are not initially on PATH. Availability is not runtime verification.
- npm reports blocked optional install scripts; existing core tests run successfully without changing global policy.

## Progress

- Tasks 2–13: pending.
