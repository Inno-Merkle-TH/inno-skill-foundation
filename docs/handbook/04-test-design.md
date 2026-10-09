# 04 — Systematic Test Design

## Outcomes

Derive cases using boundaries, partitions, decisions and state transitions.

## Prerequisites

Lesson 03.

Commands start at the repository root unless a different directory is named. Use a fresh root terminal for a new block; never guess your working directory.

## Concepts

Equivalence partitions group similar behavior. Boundary analysis targets transitions. Decision tables cover combinations of conditions; state models cover allowed and forbidden transitions.

## Worked Example

For an API title length of 1–120 trimmed characters, test empty, 1, 120 and 121. For consent × order completion, only granted + completed is analytics-eligible in this lab.

## Guided Lab

1. Build a boundary table with input and expected result before execution.
2. Create a decision table for completed/pending order and granted/denied consent.
3. Draw draft → completed → refunded states and identify undefined transitions that need product decisions.

## Expected Results

Cases include invalid inputs and prohibited transitions, with a requirement source for each expectation.

## Independent Challenge

Introduce whitespace-only titles and a repeated callback. Explain which techniques identify them.

## Troubleshooting

Do not derive expected results from current implementation alone; distinguish discovery from an agreed requirement.

## Completion Checklist

- [ ] Covered boundaries and condition combinations.
- [ ] Flagged undefined transitions as questions.
- [ ] Saved expected/actual results and execution limits in [learning evidence](../../templates/learning-evidence.md).

## Understanding Checklist

- [ ] Explain partition versus boundary coverage.
- [ ] Explain why pairwise sampling may miss a critical business combination.

## Cleanup and Handoff

Keep the designed cases for API and tracking labs.

## References

- [Official/source reading](https://www.istqb.org/certifications/certified-tester-foundation-level)
- [Learning guide](learning-guide.md)

---

[Previous: Risk-Based Strategy and Traceability](03-test-strategy.md) · [Curriculum](../../README.md) · [Next: Exploratory Testing and Initial Defect Reports](05-exploratory-testing.md)
