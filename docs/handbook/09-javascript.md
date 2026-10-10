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

Create `worked-example.mjs` in your sandbox and run `node worked-example.mjs`:

```javascript
import assert from 'node:assert/strict';

function addAmounts(first, second) {
  if (!Number.isSafeInteger(first) || !Number.isSafeInteger(second)) {
    throw new TypeError('Amounts must be safe integers');
  }
  const totalMinor = first + second;
  if (!Number.isSafeInteger(totalMinor)) {
    throw new RangeError('Total exceeds safe integer range');
  }
  return totalMinor;
}

const orders = [{ amountMinor: 19900 }, { amountMinor: 5000 }];
assert.equal(addAmounts(orders[0].amountMinor, orders[1].amountMinor), 24900);
assert.throws(() => addAmounts('19900', 5000), TypeError);
console.log('Worked example passed');
```

`import` loads Node's assertion module; no package install is needed. `const` names a value. Brackets create an array and select an item by zero-based index; braces create objects and function bodies. Dot notation reads a property. A function accepts named inputs and `return` supplies its output. `if`, `!` (not), and `||` (or) guard invalid input; `throw` stops normal execution. Assertions throw when actual and expected outcomes differ. To process every item, use `for (const order of orders) { ... }`; use `let` for a running total that changes.

## Guided Lab

1. Copy [the exercise stub](../../labs/qe-code/exercises/summary.mjs) into your sandbox as `summary.mjs`. Input is an array of `{ amountMinor: number }` objects in one currency; output is `{ count: number, totalMinor: number }`. Require nonnegative safe-integer amounts; reject wrong types with TypeError and unsafe totals with RangeError.
2. Run `node summary.mjs`. The empty case passes and the two-order assertion intentionally fails: actual total 0, expected 24900. This is a business failure, not a missing dependency.
3. Replace only the function body using the worked example and a loop. Keep the assertions, add a negative-amount case, then rerun until all assertions pass. Record both runs; do not edit expected values to match a broken implementation.

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
