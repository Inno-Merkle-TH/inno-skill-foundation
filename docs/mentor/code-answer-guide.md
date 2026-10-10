# Code Review and Answer Guidance

Read after attempting the exercises. Change the fixture and predict the result afterward; copying an answer is not evidence of understanding.

## Summary and Async Exercises

summarizeOrders returns count and totalMinor. Empty input gives 0/0; 19900 and 5000 give 2/24900. Require safe integer amounts and choose an explicit mixed-currency policy: reject or group, never silently combine.

loadOrders awaits the injected reader, parses JSON, requires the expected structure, validates each record and propagates rejection. Malformed JSON/read failure must not become empty success.

## Review Prompts

- [ ] Explain unknown, guards, async/await and Promise rejection using the implementation.
- [ ] Change amount to a string, currency to lowercase, timestamp format or an extra field; predict the result.
- [ ] Name a business mutation that each test catches.
- [ ] Separate an import failure from a meaningful assertion failure.
- [ ] Verify typecheck and runtime validation independently.

See [programming lessons](../handbook/09-javascript.md) and [API lab](../../labs/api/README.md).
