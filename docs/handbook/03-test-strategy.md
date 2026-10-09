# 03 — Risk-Based Strategy and Traceability

## Outcomes

Choose evidence based on product risk rather than test count.

## Prerequisites

Lessons 01–02.

Commands start at the repository root unless a different directory is named. Use a fresh root terminal for a new block; never guess your working directory.

## Concepts

A strategy explains scope, risks, test levels, environments and release evidence. A plan describes execution. Traceability connects requirements, risks, tests, findings and decisions.

## Worked Example

AC-01 purchase completion → risk R-01 duplicate order → API idempotency plus browser checkout → test evidence → release decision. Counting ten UI tests says nothing about whether R-01 is covered.

## Guided Lab

1. Complete the test-strategy and traceability templates for checkout.
2. Assign unit, API, UI, exploratory and non-functional checks to specific risks.
3. State out-of-scope work, environment limits, entry conditions and release decision owners.

## Expected Results

Every high-impact risk has a test or an explicit accepted/unverified status; no implied coverage.

## Independent Challenge

Reduce available execution time by half. Select a defensible subset and describe remaining exposure.

## Troubleshooting

Do not use test-case volume as a coverage denominator. Check whether risks are distinct and evidence is relevant.

## Completion Checklist

- [ ] Mapped criteria to risks and test levels.
- [ ] Recorded scope exclusions and owners.
- [ ] Saved expected/actual results and execution limits in [learning evidence](../../templates/learning-evidence.md).

## Understanding Checklist

- [ ] Explain why not every case belongs in UI automation.
- [ ] Defend a release recommendation with incomplete evidence.

## Cleanup and Handoff

Retain the matrix and revise it when requirements change.

## References

- [Official/source reading](https://www.istqb.org/certifications/certified-tester-foundation-level)
- [Learning guide](learning-guide.md)

---

[Previous: Requirements and Acceptance Criteria](02-requirements.md) · [Curriculum](../../README.md) · [Next: Systematic Test Design](04-test-design.md)
