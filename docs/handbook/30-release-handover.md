# 30 — Release Review and Operational Handover

## Outcomes

Make an evidence-backed release recommendation and a usable handover.

## Prerequisites

Lesson 29; strategy, test/data/recovery reports and risk register.

Commands start at the repository root unless a different directory is named. Use a fresh root terminal for a new block; never guess your working directory.

## Concepts

Release decisions balance evidence and residual risk; QE advises and appropriate owners accept risk. Handover must explain detection, response and rollback, not only installation.

## Worked Example

A release can be no-go despite a successful checkout if ownership fails. A go-with-accepted-risks decision must name the risk owner and verification limit.

## Guided Lab

1. Complete release-review and handover templates for the same candidate commit.
2. Summarize functional/API/web/mobile, data-quality, performance, accessibility, security and recovery evidence with executed/not-executed labels.
3. Specify rollback triggers, exact safe steps, post-rollback checks, known limitations and escalation contacts/roles.
4. Have a peer follow one recovery instruction or perform a documented self-rehearsal.

## Expected Results

The decision is traceable and operationally usable; it does not claim production HA, compliance or years of experience.

## Independent Challenge

An incident occurs after rollback but the missing analytics remain missing. Explain why code rollback alone is insufficient.

## Troubleshooting

Do not substitute test count for confidence. Verify every linked artifact is accessible and redacted.

## Completion Checklist

- [ ] Recorded decision, approvers/owners and residual risks.
- [ ] Rehearsed handover instructions and cleanup.
- [ ] Saved expected/actual results and execution limits in [learning evidence](../../templates/learning-evidence.md).

## Understanding Checklist

- [ ] Explain why a no-go is a valid engineering outcome.
- [ ] Explain what evidence would change your recommendation.

## Cleanup and Handoff

Stop public tunnels and temporary services, preserve approved evidence, and record follow-up work.

## References

- [Official/source reading](https://docs.github.com/en/actions/concepts/workflows-and-actions/deployment-environments)
- [Learning guide](learning-guide.md)

---

[Previous: Sprint Simulation and Integrated Strategy](29-sprint-capstone.md) · [Curriculum](../../README.md)
