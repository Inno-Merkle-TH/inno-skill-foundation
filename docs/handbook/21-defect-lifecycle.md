# 21 — Defect Lifecycle and Collaborative Debugging

## Outcomes

Move a finding from discovery to verified closure.

## Prerequisites

Lessons 05, 15–17, 20.

Commands start at the repository root unless a different directory is named. Use a fresh root terminal for a new block; never guess your working directory.

## Concepts

Severity describes impact; priority describes scheduling. A cause is verified by an experiment, not inferred from a symptom. Retesting a fix and adding regression protection answer different questions.

## Worked Example

An order completes while the collector returns 503. Record business success and data risk separately, isolate the collector failure, verify recovery and investigate whether old data was recovered.

## Guided Lab

1. Use the defect-report template to reproduce a seeded API or collector issue.
2. Record triage, owner, minimal reproduction, diagnostic evidence, proposed fix, retest result and regression link.
3. Map the same record to Jira fields and a Confluence investigation page, or use a GitHub issue and Markdown without paid tools.

## Expected Results

A reviewer can follow discovery → investigation → fix → retest → regression → closure, with reopening when the original case still fails.

## Independent Challenge

The fix passes but an adjacent boundary breaks. Reopen or create a linked regression and justify the decision.

## Troubleshooting

Do not close solely because a developer says fixed. Keep hypothesis and verified cause in different fields.

## Completion Checklist

- [ ] Linked report to a specific build and test.
- [ ] Verified original reproduction and relevant regression.
- [ ] Saved expected/actual results and execution limits in [learning evidence](../../templates/learning-evidence.md).

## Understanding Checklist

- [ ] Explain severity versus priority with this defect.
- [ ] Explain why removing bad data may hide rather than fix a cause.

## Cleanup and Handoff

Restore seeded faults; keep redacted evidence and unresolved risks visible.

## References

- [Official/source reading](https://www.atlassian.com/agile/software-development/bug-tracking)
- [Learning guide](learning-guide.md)

---

[Previous: Continuous Testing and Delivery Verification](20-continuous-testing.md) · [Curriculum](../../README.md) · [Next: LINE OA and Connected Customer Journeys](22-line-oa-journey.md)
