# Original Foundation Implementation Plan — Historical English Summary

Superseded by the [enterprise implementation plan](2026-10-09-enterprise-qe-curriculum.md). The original plan is retained in Git history at e964c54. This summary records intent, not current task completion.

## Original Work Packages

1. Learning map, setup, HTTP/Git/TypeScript/Git flow and evidence templates.
2. Local WooCommerce/Docker architecture, seed, smoke and persistence.
3. Runtime validators and beginner coding exercises using test-first development.
4. SQL fixtures, known answers and reconciliation contracts.
5. Collector storage/API, consent-aware purchase instrumentation and data-loss cases.
6. API/UI automation and hosted CI after repository authorization.
7. OA setup, Provider safety and connected mobile journey documentation.
8. Optional signature/webhook/Login development exercises and ownership checks.
9. App failover, backup, snapshot integrity and isolated restore.
10. Security, privacy/governance, capstone and optional GA4.
11. Whole-course links/tests/runtime/security review and delivery.

## Constraints and Interfaces

Use synthetic data and offline checkout; no customer credentials in Git. Keep database/admin off public tunnels. Orders and events have separate truth/eligibility rules. TypeScript/API tests precede browser proof; restore must not overwrite primary volumes. The single-host HA exercise is not production HA. LINE account binding and public exposure require owner decisions.

Native execution was selected. Evidence distinguished local implementation, hosted CI and live account work. The repository was initialized/pushed only after explicit user authorization. Read [historical ledger](../../mentor/progress.md) and [verification](../../mentor/verification-report.md) for actual results and deviations, including build contexts, ephemeral queues and deferred live integrations.
