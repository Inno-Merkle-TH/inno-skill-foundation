# 15 — Maintainable API Automation

## Outcomes

Automate contract, ownership and persistence checks with isolated data.

## Prerequisites

Lesson 14; working API lab.

Commands start at the repository root unless a different directory is named. Use a fresh root terminal for a new block; never guess your working directory.

## Concepts

Tests should control their own data and verify effects. The server uses a serialized single-process file store, not a distributed database. Repeating the same idempotency key should not create another resource.

## Worked Example

Eight concurrent POSTs with the same owner/key/payload produce one 201 and seven 200 responses, and one stored resource. A changed payload with that key returns 409.

## Guided Lab

1. From `labs/api` run `npm test` and read the ownership/idempotency integration tests.
2. Add a sandbox test for a valid boundary title and another for invalid pagination.
3. Restart a manual server against the same state path and read the created resource; compare with tests using independent temporary stores.

## Expected Results

Tests fail when ownership is removed or duplicate creation is introduced. Persistence is verified separately from response assertions.

## Independent Challenge

Create a stale version update and verify 409 without overwriting the newer title.

## Troubleshooting

Never share a writable state file between server processes. A corrupt file is a 503 condition, not an excuse to reset data silently.

## Completion Checklist

- [ ] Verified response and resulting resource state.
- [ ] Demonstrated same-key replay and stale-write conflict.
- [ ] Saved expected/actual results and execution limits in [learning evidence](../../templates/learning-evidence.md).

## Understanding Checklist

- [ ] Explain contract versus integration versus end-to-end scope.
- [ ] Explain why tests need independent data ownership.

## Cleanup and Handoff

Tests clean their own temporary stores; stop manual processes without deleting shared state.

## References

- [Official/source reading](https://nodejs.org/api/test.html)
- [Learning guide](learning-guide.md)

---

[Previous: API Investigation with Postman](14-postman-api.md) · [Curriculum](../../README.md) · [Next: Playwright Framework Foundations](16-playwright-framework.md)
