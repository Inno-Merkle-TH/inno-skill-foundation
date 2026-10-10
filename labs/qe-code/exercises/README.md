# Programming Exercises

Use a personal sandbox; never weaken reference validators to accept bad input.

1. Copy [summary.mjs](summary.mjs) into your sandbox and run it with Node. Its two-order assertion intentionally fails (0 instead of 24900); implement summarizeOrders without weakening assertions. See the runnable worked example in lesson 09 first.
2. Decide whether mixed currency is rejected or grouped; check safe integer totals.
3. Implement loadOrders with an injected async reader; parse and validate every record.
4. Make malformed JSON and read failure reject rather than become an empty success.
5. Capture a meaningful assertion failure, fix it, then run tests and typecheck.

- [ ] Explain unknown, guards, Promise and validation decisions.
- [ ] Change the fixture and predict the output without relying on AI.
- [ ] Demonstrate a defect the test catches.
- [ ] Keep evidence synthetic and code in a sandbox.

The reference timestamp contract is canonical UTC with milliseconds, not a universal requirement for all APIs. Read [answer guidance](../../../docs/mentor/code-answer-guide.md) only after trying.

[Programming](../../../docs/handbook/09-javascript.md) · [TypeScript](../../../docs/handbook/10-typescript-async.md)
