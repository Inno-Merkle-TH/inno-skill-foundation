# Local API Training Lab

This independent fixture teaches ownership, validation, idempotency, persistence and optimistic concurrency. It is not the commerce backend and is not production authentication.

Creation keys are owner-scoped and retained until the entire disposable state file is reset. Identical POST retries return the original creation snapshot (200), even after PATCH or DELETE; they never recreate deleted resources. Changed payloads return 409. GET remains authoritative for current existence/version. The state file stores separate `records` and immutable `creations` arrays in one atomic write. Legacy array-only state is rejected, not silently migrated: stop the lab and select a fresh `LAB_STATE_PATH` for this version. This unbounded teaching ledger is not a production retention policy.

## Quick start

From this directory, with Node >=22.22.3 <23:

```bash
npm ci
npm test
npm run typecheck
npm run test:collection
```

The collection runner starts an isolated loopback server and temporary JSON store, executes 12 requests, then removes only its own temporary directory. It uses declarative `x-qe-expected` assertions; it does not evaluate arbitrary Postman scripts or claim Newman compatibility. The importable collection includes equivalent Postman test scripts for manual use.

To run a persistent manual sandbox:

```bash
LAB_TOKEN_A=synthetic-local-a LAB_TOKEN_B=synthetic-local-b npm start
```

Only use these deliberately synthetic tokens on loopback. Import `postman/collection.json` in Postman. Set collection variables baseUrl to `http://127.0.0.1:8090`, tokenA/tokenB to your local values, and runId to a new unique value. Do not export real credentials. `.env.example` is not loaded automatically.

## Contract

| Method/path | Result |
|---|---|
| GET /health | 200 liveness, not persistence readiness |
| POST /resources | `{title,clientRequestId}`; 201 new, 200 identical retry, 409 changed retry |
| GET /resources?offset=0&limit=10 | Caller-owned `{items,total}`, stable insertion order |
| GET /resources/:id | 200 own resource, 404 absent/other owner |
| PATCH /resources/:id | `{title,version}`; 200 increments version, 409 stale |
| DELETE /resources/:id | 204 own resource, 404 absent/other owner |

Resource fields: id, ownerId, title, version, clientRequestId. Title is 1–120 trimmed characters; limit is 1–100; offset is a nonnegative integer. Unknown fields are rejected. Missing auth returns 401; malformed input 400; body above 64 KiB 413; storage failure 503.

The machine-readable contract is [openapi.json](openapi.json). The typed client in src/client.ts preserves status/body and refuses cross-origin paths; it does not turn every 2xx into a business assertion.

## Release rehearsal

Run `npm run test:release`. It starts separate baseline/candidate processes with isolated temporary state, verifies a known resource, and rejects a candidate whose health is 200 but business read is 503. Baseline readability is checked before both processes are stopped. This rehearses candidate selection and fallback, not an actual production traffic switch or cloud deployment.

The file store serializes mutations inside one process and atomically replaces the state file. It is not a multiprocess database. Do not point two running servers at one state file. Existing JSON state is validated; corrupt state fails closed rather than being silently reset.

## Exercises and self-check

- [ ] Create/read/update/delete your own resource and prove another owner cannot access it.
- [ ] Retry the same request key; verify one resource, then change the payload and observe 409.
- [ ] Restart the manual server with the same state path and verify persistence.
- [ ] Explain why liveness 200 is not a store-readiness guarantee.
- [ ] Explain what the declarative runner does not verify about the Postman application.

Cleanup: Ctrl+C the manual server. `.state/` remains ignored for inspection. To reset safely, choose a new `LAB_STATE_PATH`; never delete shared state automatically. Collection tests clean their own temporary stores.
