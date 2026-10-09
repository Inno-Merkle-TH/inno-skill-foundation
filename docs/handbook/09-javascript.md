# 09 — JavaScript Foundations for Testing

## Outcomes

Write small functions and assertions before adding a framework.

## Prerequisites

Lessons 06–08; Node.

Commands start at the repository root unless a different directory is named. Use a fresh root terminal for a new block; never guess your working directory.

## Concepts

Variables, objects and arrays represent data; functions transform it. JavaScript may coerce strings into numbers. Runtime input must be checked before arithmetic.

## Worked Example

Two orders of 19900 and 5000 minor units total 24900, not the concatenated string `199005000`. An empty set totals zero.

## Guided Lab

1. In your sandbox create `summary.mjs` with a `summarizeOrders` function returning count and totalMinor.
2. Use `node:assert/strict` to assert empty input and the two-order example before implementing the function.
3. Run `node summary.mjs`, implement the smallest solution, then test a string amount and unsafe total.

## Expected Results

The initial business assertion fails, then passes; invalid monetary input is rejected, not coerced.

## Independent Challenge

Add a third order and predict the result before running. Decide what mixed currencies should do.

## Troubleshooting

A cast or Number conversion is not a substitute for deciding which inputs are allowed.

## Completion Checklist

- [ ] Recorded failing and passing assertions.
- [ ] Handled empty input and invalid amounts.
- [ ] Saved expected/actual results and execution limits in [learning evidence](../../templates/learning-evidence.md).

## Understanding Checklist

- [ ] Explain function input/output without reading the code.
- [ ] Explain why money uses explicit units.

## Cleanup and Handoff

Keep code in the sandbox; no services or DB need cleanup.

## References

- [Official/source reading](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [Learning guide](learning-guide.md)

---

[Previous: Architecture and System Boundaries](08-architecture.md) · [Curriculum](../../README.md) · [Next: TypeScript, Validation and Asynchronous Code](10-typescript-async.md)
