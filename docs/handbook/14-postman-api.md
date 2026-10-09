# 14 — API Investigation with Postman

## Outcomes

Investigate an API contract, save repeatable requests and inspect negative cases.

## Prerequisites

Lessons 12–13; Node. Read the API lab README. Postman application is optional for the automated local route.

Commands start at the repository root unless a different directory is named. Use a fresh root terminal for a new block; never guess your working directory.

## Concepts

An API collection makes request intent repeatable. Variables isolate environments. Authentication identifies a caller; authorization determines what that caller may access. Exported collections must not contain credentials.

## Worked Example

Owner A creates a resource. Owner B receives 404 for its ID and an empty own-resource list. A successful health endpoint does not prove the file store is readable.

## Guided Lab

1. From `labs/api` run `npm ci`, `npm test`, `npm run typecheck`, `npm run test:collection`.
2. Follow that lab's README to start the manual loopback server and import `postman/collection.json`.
3. Set synthetic tokenA/tokenB and a unique runId in collection variables; run the requests in order and inspect script assertions.

## Expected Results

The local runner verifies 12 requests on an isolated store. Postman-app execution is separate evidence; the runner does not evaluate arbitrary Postman scripts.

## Independent Challenge

Send an invalid title and a duplicate request key with changed data; predict 400 versus 409 before sending.

## Troubleshooting

If a request returns 401, check the collection variable scope and server token mapping; never disable auth to get green.

## Completion Checklist

- [ ] Executed owner/other-owner and malformed-input cases.
- [ ] Recorded which runner/application was actually used.
- [ ] Saved expected/actual results and execution limits in [learning evidence](../../templates/learning-evidence.md).

## Understanding Checklist

- [ ] Explain authentication versus authorization.
- [ ] Explain the portability limits of the restricted runner.

## Cleanup and Handoff

Ctrl+C the manual server; keep .state ignored or use a new state path for the next run.

## References

- [Official/source reading](https://learning.postman.com/docs/tests-and-scripts/write-scripts/test-scripts/)
- [Learning guide](learning-guide.md)

---

[Previous: SQL and Test-Data Management](13-sql-test-data.md) · [Curriculum](../../README.md) · [Next: Maintainable API Automation](15-api-automation.md)
