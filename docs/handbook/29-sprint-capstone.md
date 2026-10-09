# 29 — Sprint Simulation and Integrated Strategy

## Outcomes

Apply QE practices to changing requirements and incidents.

## Prerequisites

Core lessons completed to available execution scope; do not hide unavailable mobile/account work.

Commands start at the repository root unless a different directory is named. Use a fresh root terminal for a new block; never guess your working directory.

## Concepts

A delivery simulation links product decisions, code changes, tests and operational risk. It is not a demonstration assembled from unrelated green screenshots.

## Worked Example

Mid-sprint, the product owner changes consent wording while the team investigates duplicate analytics. The test strategy and regression scope must change with the requirement.

## Guided Lab

1. Select a baseline commit and create a sprint backlog around connected checkout.
2. Refine criteria, update traceability, implement a small tested change and record review feedback.
3. Inject one business/data failure and one non-functional or recovery scenario separately; diagnose, restore and retest.
4. Record a daily risk update and a retrospective action with owner and observable outcome.

## Expected Results

Evidence forms a coherent requirement-to-release chain on known versions, with actual device/account scope.

## Independent Challenge

A deadline arrives before iOS verification. Propose a transparent decision rather than inventing coverage.

## Troubleshooting

Do not mix outputs from unrelated commits or run failure drills during the baseline suite.

## Completion Checklist

- [ ] Updated strategy after requirement change.
- [ ] Linked incident, fix, retest and regression evidence.
- [ ] Saved expected/actual results and execution limits in [learning evidence](../../templates/learning-evidence.md).

## Understanding Checklist

- [ ] Explain what your suite cannot establish.
- [ ] Explain the most important remaining release risk.

## Cleanup and Handoff

Restore services and deliberate defects before final review.

## References

- [Official/source reading](https://scrumguides.org/scrum-guide.html)
- [Learning guide](learning-guide.md)

---

[Previous: Reliability, Recovery and Cloud Concepts](28-reliability-cloud.md) · [Curriculum](../../README.md) · [Next: Release Review and Operational Handover](30-release-handover.md)
