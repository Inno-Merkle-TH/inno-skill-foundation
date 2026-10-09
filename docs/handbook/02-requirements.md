# 02 — Requirements and Acceptance Criteria

## Outcomes

Convert ambiguous requirements into testable outcomes.

## Prerequisites

Lesson 01; the synthetic checkout story.

Commands start at the repository root unless a different directory is named. Use a fresh root terminal for a new block; never guess your working directory.

## Concepts

Acceptance criteria describe observable behavior. Examples expose assumptions about state, money, roles and failure. Non-functional requirements need measurable conditions and boundaries.

## Worked Example

Given a completed order worth 199 THB and granted analytics consent, one valid purchase should be reconciled to that order. Denied consent permits checkout but excludes analytics collection.

## Guided Lab

1. List assumptions for currency, stock, payment simulation, consent, retries and notification failure.
2. Write Given/When/Then examples for purchase success, denied consent and collector outage.
3. Separate confirmed decisions from questions; link each criterion to a risk.

## Expected Results

Criteria separate business success, data collection and notification; unresolved decisions remain explicit.

## Independent Challenge

Add a refund requirement. Identify which existing criteria do not define refund behavior.

## Troubleshooting

Avoid vague criteria such as fast or works correctly; name workload, expected result and source of truth.

## Completion Checklist

- [ ] Wrote positive and negative acceptance examples.
- [ ] Recorded unresolved assumptions rather than inventing answers.
- [ ] Saved expected/actual results and execution limits in [learning evidence](../../templates/learning-evidence.md).

## Understanding Checklist

- [ ] Explain why clicking checkout is not proof of purchase.
- [ ] Explain which criteria require data evidence.

## Cleanup and Handoff

Save the criteria with stable IDs AC-01 onward.

## References

- [Official/source reading](https://cucumber.io/docs/bdd/better-gherkin/)
- [Learning guide](learning-guide.md)

---

[Previous: Quality Engineering and Delivery](01-quality-engineering.md) · [Curriculum](../../README.md) · [Next: Risk-Based Strategy and Traceability](03-test-strategy.md)
