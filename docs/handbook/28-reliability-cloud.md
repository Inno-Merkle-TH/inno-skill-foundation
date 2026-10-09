# 28 — Reliability, Recovery and Cloud Concepts

## Outcomes

Measure recovery and explain remaining failure boundaries.

## Prerequisites

Lessons 12, 20, 23–24; stop tunnel and all concurrent E2E before drills.

Commands start at the repository root unless a different directory is named. Use a fresh root terminal for a new block; never guess your working directory.

## Concepts

Backup is not HA; replication is not backup. RTO is a recovery-time target, RPO an acceptable data-loss target. Measure observed outcomes separately. Cloud services move responsibilities, not eliminate them.

## Worked Example

Two WordPress instances still share DB, volume, proxy and host. Commerce backup excludes eventdb, LINE and GA4, so restoring it is not end-to-end recovery.

## Guided Lab

1. From `labs/commerce` set targets and record baseline, then run `bash tests/failover.sh`.
2. Stop db, observe the expected outage, then `docker compose start db` and verify health/business reads.
3. Stop app B with `docker compose -f compose.yaml -f compose.ha.yaml stop wordpress-b`; restore core proxy using `docker compose up -d --build --wait proxy wordpress`.
4. Run `bash scripts/backup.sh`, then `bash tests/restore.sh backups/<actual-snapshot>` using the printed path. Record manifest, order count/value and asset results.
5. Map the local design to cloud compute/storage/network/IAM/availability/cost responsibilities without provisioning resources.

## Expected Results

Failover proves bounded GET behavior, not exactly-once checkout. Isolated restore validates its snapshot without overwriting primary data.

## Independent Challenge

Explain how restoring older orders while retaining newer events changes reconciliation.

## Troubleshooting

For a second restore use a new `RESTORE_PROJECT_NAME=qe-foundation-restore-round2`; never delete a nonempty DB to bypass protection.

## Completion Checklist

- [ ] Measured outage/recovery times and observed data state.
- [ ] Verified snapshot identity and isolated restore.
- [ ] Listed remaining SPOFs and unprotected stores.
- [ ] Saved expected/actual results and execution limits in [learning evidence](../../templates/learning-evidence.md).

## Understanding Checklist

- [ ] Explain target versus observed RTO/RPO.
- [ ] Explain shared responsibility without claiming cloud makes a system resilient.

## Cleanup and Handoff

Stop the actual restore project with `docker compose -p <used-name> -f compose.restore.yaml down` (no -v). Return to core mode and verify readiness.

## References

- [Official/source reading](https://docs.docker.com/engine/storage/volumes/)
- [Learning guide](learning-guide.md)

---

[Previous: Security and Data, AI and Product Governance](27-security-governance.md) · [Curriculum](../../README.md) · [Next: Sprint Simulation and Integrated Strategy](29-sprint-capstone.md)
