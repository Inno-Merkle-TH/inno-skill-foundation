# 23 — Tracking Contracts and Reconciliation

## Outcomes

Prove eligible business events match validated observations.

## Prerequisites

Lessons 13, 15–16; core/tracking services running. LINE is not required for offline data work.

Commands start at the repository root unless a different directory is named. Use a fresh root terminal for a new block; never guess your working directory.

## Concepts

Trace trigger → queue → network → collector → store → processing → report. Define purchase semantics before instrumentation. Event ID dedup and transaction-level matching solve different problems.

## Worked Example

For four fixture orders, three are eligible. Two have valid observations; order-b is missing, order-c has a surplus event and order-d is excluded. An invalid amount must not hide a missing valid purchase.

## Guided Lab

1. Complete the tracking-plan template, including consent, units, items, owner, time window and source of truth.
2. From `labs/qe-code` run `npm test -- reconcile` and inspect expected outputs.
3. Use a synthetic checkout, inspect its /lab-events request and compare transaction/value/currency/items with the order.
4. From `labs/commerce` query event IDs using `docker compose exec -T eventdb sh -c 'MYSQL_PWD="$MARIADB_PASSWORD" mariadb -u collector lab -e "SELECT event_id FROM events;"'`.

## Expected Results

Collector acceptance and actual DB evidence agree, but neither alone proves a GA4 report or a genuine authorized purchase.

## Independent Challenge

Replay an identical event ID, then a new event ID with the same transaction. Explain dedup versus semantic duplicate detection.

## Troubleshooting

The reference collector accepts purchase only. Its liveness endpoint does not check the DB; 503 is not successful persistence.

## Completion Checklist

- [ ] Defined eligibility and the reconciliation window.
- [ ] Compared money, currency and items, not only counts.
- [ ] Saved expected/actual results and execution limits in [learning evidence](../../templates/learning-evidence.md).

## Understanding Checklist

- [ ] Explain excluded versus missing.
- [ ] Explain why analytics is not the revenue source of truth.

## Cleanup and Handoff

Keep synthetic records; do not delete mismatches to improve reports.

## References

- [Official/source reading](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [Learning guide](learning-guide.md)

---

[Previous: LINE OA and Connected Customer Journeys](22-line-oa-journey.md) · [Curriculum](../../README.md) · [Next: Investigating Tracking Data Loss](24-data-failure-drills.md)
