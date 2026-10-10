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

- Task 2: documentation validator RED (six behavioral failures) then GREEN (seven tests).
- Task 3: API RED (four tests received 501), then GREEN (four integration tests and typecheck).
- Ruling: Newman 6.2.3 introduces 19 dependency advisories, including critical/high findings. Keep an importable Postman collection and implement a restricted declarative runner without JavaScript evaluation. Cost: it intentionally does not implement arbitrary Postman scripts; real Postman app execution remains separate evidence.
- Ruling: npm dependency resolution crashed in Arborist loadPeerSet; generate the lockfile with legacy peer resolution, then verify ordinary npm ci. No global configuration change.
- Task 4: collection RED/GREEN; 12 local declared-request assertions pass twice with isolated data. Real Postman desktop is not executed.
- Task 5: two browser cases failed against unimplemented helpers, then granted/denied/mocked-outage/diagnostic cases passed. Core assertions remain explicit.
- Task 6: English lessons 01–17 and strategy/design/evidence templates written against actual lab contracts.
- Task 7: mobile preflight RED/GREEN, seven tests/typecheck and clean install/audit passed. Xcode listing returned no usable simulator; Android adb absent. No SDK/device installation was forced.
- Ruling: mobile uses the standalone WebdriverIO client rather than adding a separate runner framework. Cost: no full runner reporter; assertions exit nonzero and device evidence is still required.
- Task 8: performance safety RED/GREEN, eight tests. Pinned k6 2.3.0 macOS binary digest verified; 2 users/10 seconds yielded 40 checks, zero HTTP failures and p95 2.44 ms. Impossible threshold exited 99 as expected. Accessibility labelled fixture RED/GREEN; storefront audit remains separate.
- Task 9: child-process release rehearsal RED/GREEN; healthy candidate selected, live-but-broken candidate rejected (health 200/business 503), baseline readable and processes closed. CI definitions added; hosted execution pending push.
- Tasks 10–12: English connected-commerce, governance/recovery/capstone, supporting records, navigation and migration map written. Manifest has 30 core lessons and 3 extensions; English/link validation passes.
- Ruling: historical Thai spec/plan/log prose is replaced with labelled English summaries preserving dates/results/decisions and pointing to Git history. Cost: original wording requires consulting history rather than current navigation.
- Task 13: local validation and independent review/fix pass complete. Root checks 16, core tests 46, API tests 10, mobile preflight tests 7 and browser tests 7 passed (1 separate audit skipped). Actual storefront audit found a serious list-structure issue; recorded without suppressing it. Commerce failover, DB outage and isolated restore rerun. See [verification report](verification-report.md) for limitations and exact evidence. Commit/push and hosted CI are the remaining delivery steps.
- Review correction: persist immutable creation snapshots separately from mutable resources; retain keys until disposable state reset. Lifecycle/restart regression failed 409 versus 200 before the fix and passed afterward. Old array-only state is rejected with documented fresh-state instructions.
- Review correction: resource idempotency is not commerce order idempotency. Corrected strategy/traceability claims; added runnable JavaScript scaffolding, explicit storefront-audit and LINE working-directory commands, and pending-event consent-revocation coverage.
