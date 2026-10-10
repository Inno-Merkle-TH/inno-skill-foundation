# Bounded Local Performance Lab

Use only the owned API fixture on loopback. Do not target LINE, ngrok, a customer service or a public host. This is a lab hypothesis, not a production capacity claim.

## Run

Install k6 through its official release/package instructions with organizational approval. Reference runtime: k6 2.3.0; the extended workflow pins its Linux release and verifies its published SHA256 before execution. Record your actual version. From repository root:

```bash
node --test labs/performance/tests/safety.test.mjs
```

Start the API in a separate terminal from `labs/api`:

```bash
LAB_TOKEN_A=synthetic-local-a LAB_TOKEN_B=synthetic-local-b npm start
```

From root, using the same synthetic token:

```bash
LAB_TOKEN_A=synthetic-local-a k6 run labs/performance/api-smoke.js
FORCE_THRESHOLD_FAILURE=1 LAB_TOKEN_A=synthetic-local-a k6 run labs/performance/api-smoke.js
```

The first run should pass under a healthy local baseline; investigate if it does not. The second deliberately requires p95 < 0 and must exit nonzero. Record actual exit status, latency, error rate, workload and environment. Do not weaken thresholds to hide the result.

Defaults: 2 users, 10 seconds, p95 < 500 ms, HTTP failure rate < 1%, all response-shape checks passing. Environment overrides `VUS` and `DURATION_SECONDS` are capped at 5/30. Do not bypass the intended workload with k6 CLI scenario overrides. Requests have a two-second timeout and do not follow redirects. Stop immediately for unexpected traffic or machine resource pressure.

The list can be empty; create known resources through the API to investigate dataset-size effects. Record dataset size. Reads do not benchmark checkout, writes, DB contention, production traffic or a distributed deployment.

## Self-check and cleanup

- [ ] Captured normal and intentionally failing threshold outcomes.
- [ ] Explained p95, error rate and the limits of this workload.
- [ ] Correlated slow responses with local process/resource observations.
- [ ] Stopped the fixture server and retained only synthetic results.

[k6 thresholds](https://grafana.com/docs/k6/latest/using-k6/thresholds/)
