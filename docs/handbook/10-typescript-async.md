# 10 — TypeScript, Validation and Asynchronous Code

## Outcomes

Validate unknown input and propagate asynchronous failures.

## Prerequisites

Lesson 09; coding lab dependencies installed with `npm ci` from `labs/qe-code`.

Commands start at the repository root unless a different directory is named. Use a fresh root terminal for a new block; never guess your working directory.

## Concepts

TypeScript checks development-time types. JSON received at runtime remains untrusted. A rejected Promise is a failure, not an empty successful result.

## Worked Example

`loadOrders(readText)` awaits text, parses JSON, requires an array and validates each order. A malformed document must reject, not return `[]`.

## Guided Lab

1. From `labs/qe-code` run `npm test -- orders` and read `src/orders.ts` with its tests.
2. In a sandbox implement `loadOrders` with an injected `() => Promise<string>` reader and tests for valid, malformed and rejected reads.
3. Run `npm test` and `npm run typecheck` after adding a mixed-currency policy.

## Expected Results

Typechecking and runtime tests pass; invalid input is rejected with no fabricated successful output.

## Independent Challenge

Change valueMinor to a string and occurredAt to a noncanonical timestamp. Predict which guard rejects each.

## Troubleshooting

Follow existing `.js` import suffixes for NodeNext TypeScript. Inspect the contract rather than weakening tests.

## Completion Checklist

- [ ] Tested read rejection and malformed JSON.
- [ ] Explained every validation branch added.
- [ ] Saved expected/actual results and execution limits in [learning evidence](../../templates/learning-evidence.md).

## Understanding Checklist

- [ ] Explain unknown versus any.
- [ ] Explain why typechecking cannot validate a network payload.

## Cleanup and Handoff

Retain synthetic fixtures only; return to root.

## References

- [Official/source reading](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [Learning guide](learning-guide.md)

---

[Previous: JavaScript Foundations for Testing](09-javascript.md) · [Curriculum](../../README.md) · [Next: Unit Tests, Debugging and Code Review](11-unit-testing-debugging.md)
