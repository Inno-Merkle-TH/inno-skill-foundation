# 20 — Continuous Testing and Delivery Verification

## Outcomes

Connect the right suites to the right delivery stage.

## Prerequisites

Lessons 15–17. Mobile jobs depend on available devices, not completion of the core CI lab.

Commands start at the repository root unless a different directory is named. Use a fresh root terminal for a new block; never guess your working directory.

## Concepts

PR feedback should be fast and bounded. Broader regression, deployment verification and recovery have different costs. CI green applies to a commit and suite selection, not every environment.

## Worked Example

A candidate can answer /health while failing a resource journey. A deployment check must test the business path before selecting it; a failed candidate must leave the baseline usable.

## Guided Lab

1. Inspect `.github/workflows/qe-labs.yml` and compare each command with local scripts.
2. Run `npm run test:release` from `labs/api` for the isolated candidate-selection rehearsal.
3. In a sandbox PR, break one assertion, observe the run for that SHA fail, restore it and verify the new SHA. Use local evidence if hosted Actions is unavailable.

## Expected Results

A failed assertion remains a failed run. Candidate rejection preserves baseline behavior; the local rehearsal is not a production deployment.

## Independent Challenge

Design an extended job for a device unavailable on the normal runner; state runner requirements and failure reporting.

## Troubleshooting

Do not use continue-on-error for mandatory checks or upload raw credentials/commerce sessions as artifacts.

## Completion Checklist

- [ ] Recorded commit-specific pipeline evidence.
- [ ] Separated CI testing from actual deployment verification.
- [ ] Saved expected/actual results and execution limits in [learning evidence](../../templates/learning-evidence.md).

## Understanding Checklist

- [ ] Explain why retries cannot authorize release.
- [ ] Explain least-privilege workflow permissions and artifact retention.

## Cleanup and Handoff

Restore the broken assertion; stop only rehearsal-owned processes.

## References

- [Official/source reading](https://docs.github.com/en/actions)
- [Learning guide](learning-guide.md)

---

[Previous: Appium Automation for Android and iOS](19-appium.md) · [Curriculum](../../README.md) · [Next: Defect Lifecycle and Collaborative Debugging](21-defect-lifecycle.md)
