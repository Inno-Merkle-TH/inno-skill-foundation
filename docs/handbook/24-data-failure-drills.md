# 24 — Investigating Tracking Data Loss

## Outcomes

Diagnose missing, duplicate, invalid, late and excluded observations.

## Prerequisites

Lesson 23; isolated synthetic store and a recorded baseline.

Commands start at the repository root unless a different directory is named. Use a fresh root terminal for a new block; never guess your working directory.

## Concepts

A single count hides different failure modes. The demo queue is memory-only, so closing a page may lose pending data. Restarting a service does not prove backlog recovery.

## Worked Example

A completed order remains valid during collector outage, but its event may never reach storage. A late valid event can still count as observed in the reference reconciliation implementation.

## Guided Lab

1. Run reconciliation tests, then change a sandbox event's money/items and receivedAt independently.
2. From `labs/commerce` stop qe-api and do one consent-granted synthetic checkout. Record UI, network and database observations.
3. Start with `docker compose --profile tracking up -d qe-api`; check health, then inspect actual retry/persistence before claiming recovery.
4. Refresh the thank-you page with the same transaction and inspect dedup.

## Expected Results

Invalid data does not count as a valid purchase; late and observed may overlap. Denied consent is excluded, not automatically a loss defect.

## Independent Challenge

Revoke consent while an event is pending. Explain why a retry must not bypass the new consent state.

## Troubleshooting

Use the same UTC window and known IDs. Never change order IDs or delete events to conceal duplication.

## Completion Checklist

- [ ] Recorded baseline, trigger, result and recovery for each drill.
- [ ] Distinguished transport failure from confirmed permanent loss.
- [ ] Saved expected/actual results and execution limits in [learning evidence](../../templates/learning-evidence.md).

## Understanding Checklist

- [ ] Explain the memory-only queue limitation.
- [ ] Explain business success with analytics failure.

## Cleanup and Handoff

Restore qe-api and verify health; retain unresolved events as evidence.

## References

- [Official/source reading](https://developers.line.biz/en/docs/messaging-api/receiving-messages/)
- [Learning guide](learning-guide.md)

---

[Previous: Tracking Contracts and Reconciliation](23-tracking-reconciliation.md) · [Curriculum](../../README.md) · [Next: Performance and Observability](25-performance-observability.md)
