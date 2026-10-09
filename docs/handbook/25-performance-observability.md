# 25 — Performance and Observability

## Outcomes

Measure bounded local workloads and interpret failure thresholds.

## Prerequisites

Lessons 15, 20, 23; local API fixture, k6 installed through the approved route.

Commands start at the repository root unless a different directory is named. Use a fresh root terminal for a new block; never guess your working directory.

## Concepts

Latency distributions, throughput and error rate describe different behavior. Load requires a workload model and a stable environment. Logs/metrics help isolate causes; a health check alone is not a business benchmark.

## Worked Example

Two users for ten seconds read authenticated resources. The lab hypothesis is p95 below 500 ms and failures below 1%, not a production SLA.

## Guided Lab

1. Follow `labs/performance/README.md` to run safety tests and the default loopback-only workload.
2. Record runtime, fixture size, workload, latency, errors and process resource observations.
3. Run the deliberately impossible threshold and capture its nonzero exit; restore the normal threshold.
4. Compare API resource results with /health and explain their different scope.

## Expected Results

The bounded run yields actual metrics; a failed threshold remains failed rather than being hidden in CI.

## Independent Challenge

Increase data volume without increasing load. Predict whether pagination or storage reads could change latency and test locally.

## Troubleshooting

Do not load-test ngrok, LINE or public systems. Reject external hosts and excessive duration before generating traffic.

## Completion Checklist

- [ ] Recorded workload and environment alongside metrics.
- [ ] Demonstrated threshold failure and stop conditions.
- [ ] Saved expected/actual results and execution limits in [learning evidence](../../templates/learning-evidence.md).

## Understanding Checklist

- [ ] Explain p95 versus average latency.
- [ ] Explain why low load cannot prove production capacity.

## Cleanup and Handoff

Stop the load process and manual fixture; preserve only synthetic reports.

## References

- [Official/source reading](https://grafana.com/docs/k6/latest/using-k6/thresholds/)
- [Learning guide](learning-guide.md)

---

[Previous: Investigating Tracking Data Loss](24-data-failure-drills.md) · [Curriculum](../../README.md) · [Next: Accessibility and Compatibility](26-accessibility-compatibility.md)
