# 08 — Architecture and System Boundaries

## Outcomes

Identify tiers, trust boundaries and failure propagation.

## Prerequisites

Lesson 07; repository diagrams and Compose file, no running services required.

Commands start at the repository root unless a different directory is named. Use a fresh root terminal for a new block; never guess your working directory.

## Concepts

Presentation, business and data tiers describe responsibilities, not container count. A reverse proxy routes traffic. State, sessions, queues and shared storage determine failure behavior.

## Worked Example

Browser → Nginx → WordPress/WooCommerce → MariaDB; a separate collector writes analytics to eventdb. A completed order and a missing event can coexist.

## Guided Lab

1. Draw the commerce request path and tracking path separately.
2. Mark public versus local admin endpoints and stores containing state.
3. For app, collector, database and host failure, predict user impact and evidence to inspect.

## Expected Results

The diagram names dependencies and distinguishes liveness, readiness, persistence and recovery.

## Independent Challenge

Add a second app instance. Identify which single points of failure remain.

## Troubleshooting

Do not label Nginx a business tier or assume every container needs a public port.

## Completion Checklist

- [ ] Drew two data paths and their trust boundaries.
- [ ] Predicted a failure that does not stop checkout.
- [ ] Saved expected/actual results and execution limits in [learning evidence](../../templates/learning-evidence.md).

## Understanding Checklist

- [ ] Explain why app redundancy does not protect a single database.
- [ ] Explain backup versus replication versus availability.

## Cleanup and Handoff

Keep the diagram as the environment lab's hypothesis.

## References

- [Official/source reading](https://docs.docker.com/compose/)
- [Learning guide](learning-guide.md)

---

[Previous: HTTP, REST and Browser Investigation](07-http-rest.md) · [Curriculum](../../README.md) · [Next: JavaScript Foundations for Testing](09-javascript.md)
