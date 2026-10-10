# Capstone Facilitation

The capstone is an evidence-backed delivery exercise, not a grading rubric. Let learners investigate before giving hints.

## Seeded Scenarios

| Scenario | Evidence to seek |
|---|---|
| Collector stopped, order completed | Separate business success from analytics failure and inspect actual recovery |
| New event ID, same transaction | Collector may accept; reconciliation identifies surplus |
| Denied consent | Expected exclusion, not automatically a missing-data defect |
| Wrong amount/currency/items | Transport success does not establish a valid purchase |
| Ownership failure or leaked secret | No-go even when functional paths pass |
| App failover | GET success does not prove exactly-once checkout |

Select one scenario at a time after recording a healthy baseline. Use synthetic data and restore service state after each drill.

## Review

- [ ] Requirement → risk → test → evidence → decision is traceable to a candidate.
- [ ] Root causes are verified, not guessed from symptoms.
- [ ] Mobile/account work is labelled executed or not executed.
- [ ] Release risks have actual owners and follow-up.
- [ ] A second person can follow the handover without secrets or destructive resets.

[SQL answer guide](sql-answers.sql) · [Sprint capstone](../handbook/29-sprint-capstone.md) · [Release handover](../handbook/30-release-handover.md)
