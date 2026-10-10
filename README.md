# Quality Engineering Foundation

A practical engineering curriculum built around one delivery lifecycle:

**Requirements → risks → test design → code → automation → continuous testing → diagnosis → release evidence.**

## Start Here

1. Read the [learning guide](docs/handbook/learning-guide.md).
2. Start with [01 — Quality Engineering](docs/handbook/01-quality-engineering.md). The opening strategy exercises need no installed services.
3. Follow the sequence below. Install each tool when its lesson requires it.
4. Keep [learning evidence](templates/learning-evidence.md) and use each lesson's completion and understanding checklists. There are no scores.

## Learning Path

| Stage | Lessons in order | Practical outcome |
|---|---|---|
| 1. Quality engineering workflow | [01 Quality Engineering and Delivery](docs/handbook/01-quality-engineering.md)<br>[02 Requirements and Acceptance Criteria](docs/handbook/02-requirements.md) | Clarified acceptance criteria and quality ownership |
| 2. Test strategy and design | [03 Risk-Based Strategy and Traceability](docs/handbook/03-test-strategy.md)<br>[04 Systematic Test Design](docs/handbook/04-test-design.md)<br>[05 Exploratory Testing and Initial Defect Reports](docs/handbook/05-exploratory-testing.md) | Strategy, traceability, designed cases and exploratory charter |
| 3. Engineering foundations | [06 Workstation, GitHub and Git Flow](docs/handbook/06-workstation-git.md)<br>[07 HTTP, REST and Browser Investigation](docs/handbook/07-http-rest.md)<br>[08 Architecture and System Boundaries](docs/handbook/08-architecture.md) | Reviewed Git change and request/system model |
| 4. Programming for testing | [09 JavaScript Foundations for Testing](docs/handbook/09-javascript.md)<br>[10 TypeScript, Validation and Asynchronous Code](docs/handbook/10-typescript-async.md)<br>[11 Unit Tests, Debugging and Code Review](docs/handbook/11-unit-testing-debugging.md) | Tested utilities and meaningful RED/GREEN evidence |
| 5. Environments and data | [12 Docker and Reproducible Commerce Environments](docs/handbook/12-docker-environments.md)<br>[13 SQL and Test-Data Management](docs/handbook/13-sql-test-data.md) | Local commerce, persistence and SQL verification |
| 6. API engineering | [14 API Investigation with Postman](docs/handbook/14-postman-api.md)<br>[15 Maintainable API Automation](docs/handbook/15-api-automation.md) | Ownership, idempotency and portable API collection |
| 7. Web automation | [16 Playwright Framework Foundations](docs/handbook/16-playwright-framework.md)<br>[17 Automation Maintenance and Diagnostics](docs/handbook/17-automation-maintenance.md) | Reusable browser fixtures and failure diagnosis |
| 8. Mobile engineering | [18 Mobile Strategy and Exploratory Testing](docs/handbook/18-mobile-strategy.md)<br>[19 Appium Automation for Android and iOS](docs/handbook/19-appium.md) | Device matrix and native sample automation |
| 9. Continuous testing and defects | [20 Continuous Testing and Delivery Verification](docs/handbook/20-continuous-testing.md)<br>[21 Defect Lifecycle and Collaborative Debugging](docs/handbook/21-defect-lifecycle.md) | Commit-specific gates and verified defect lifecycle |
| 10. Connected commerce and data quality | [22 LINE OA and Connected Customer Journeys](docs/handbook/22-line-oa-journey.md)<br>[23 Tracking Contracts and Reconciliation](docs/handbook/23-tracking-reconciliation.md)<br>[24 Investigating Tracking Data Loss](docs/handbook/24-data-failure-drills.md) | OA features, consent-aware tracking and loss investigation |
| 11. Non-functional quality | [25 Performance and Observability](docs/handbook/25-performance-observability.md)<br>[26 Accessibility and Compatibility](docs/handbook/26-accessibility-compatibility.md)<br>[27 Security and Data, AI and Product Governance](docs/handbook/27-security-governance.md)<br>[28 Reliability, Recovery and Cloud Concepts](docs/handbook/28-reliability-cloud.md) | Load/accessibility/security/recovery evidence |
| 12. Delivery capstone | [29 Sprint Simulation and Integrated Strategy](docs/handbook/29-sprint-capstone.md)<br>[30 Release Review and Operational Handover](docs/handbook/30-release-handover.md) | Integrated release recommendation and handover |

Stages are a dependency map, not a promised weekly schedule. Device/account constraints must be recorded; they do not block unrelated local work.

## Optional Integrations

- [E01 — LINE Messaging API](docs/handbook/extensions/line-api.md): offline signature lab, then guided receiver/reply implementation.
- [E02 — LINE Login](docs/handbook/extensions/line-login.md): OAuth/OIDC, sessions and verified account linking.
- [E03 — GA4](docs/handbook/extensions/ga4.md): offline event mapping and optional test-property verification.

Core does not ship live LINE webhook/Login routes or GA4 instrumentation. These are explicit extension-development exercises, not preconfigured integrations.

## Runnable Labs

Run each block from a fresh repository-root terminal. Use Node **>=22.22.3 <23** and the committed lockfiles.

### Coding and collector tests — no Docker

```bash
cd labs/qe-code
npm ci
npm test
npm run typecheck
```

### Isolated API, collection and release rehearsal — no accounts

```bash
cd labs/api
npm ci
npm test
npm run typecheck
npm run test:collection
npm run test:release
```

The collection is importable into Postman. The default local runner executes its declared request assertions without evaluating arbitrary scripts; it is not Newman or a substitute for recording a Postman-app run.

### Commerce and browser journey

Follow [lesson 12](docs/handbook/12-docker-environments.md) before these commands:

```bash
cd labs/commerce
bash scripts/init-env.sh
bash scripts/setup.sh
docker compose --profile tracking up -d --build
```

Wait for core/collector readiness, then from a new root terminal:

```bash
cd labs/qe-code
npx playwright install chromium
npm run test:e2e
```

Storefront: `http://localhost:8080`. Local admin: `http://localhost:8081/wp-login.php`. Use synthetic data and LAB ONLY checkout; never real payment or customer data. Do not run smoke/failover/backup while browser tests are running.

- [API lab](labs/api/README.md) · [Mobile lab](labs/mobile/README.md) · [Performance lab](labs/performance/README.md)
- [Environment matrix](docs/reference/environment-matrix.md) · [Verification report](docs/mentor/verification-report.md)

## Delivery Artifacts

Use [test strategy](templates/test-strategy.md), [test plan](templates/test-plan.md), [traceability](templates/traceability-matrix.md), [exploratory charter](templates/exploratory-charter.md), [defect report](templates/defect-report.md), [automation design](templates/automation-design.md), [test-data plan](templates/test-data-plan.md), [device matrix](templates/device-matrix.md), [pipeline policy](templates/pipeline-policy.md), [tracking plan](templates/tracking-plan.md), [data inventory](templates/data-inventory.md), [channel inventory](templates/channel-inventory.md), [risk register](templates/risk-register.md), [ADR](templates/adr.md), [performance report](templates/performance-report.md), [recovery report](templates/recovery-report.md), [release review](templates/release-review.md), and [handover](templates/handover.md).

## Engineering Rules

- Assert business and persisted outcomes, not only clicks or HTTP status.
- Keep tests isolated; use synthetic data, explicit contracts and condition-based waits.
- Keep requirement → risk → test → evidence → decision traceable to a candidate commit.
- Investigate flakes and failures; do not mask them with retries or changed expectations.
- Distinguish missing/duplicate/invalid/late data from intentional consent exclusions.
- Treat identity, authorization, attribution and analytics consent as separate concerns.
- Never expose admin/DB through a tunnel, commit secrets, or reset shared data to make tests pass.
- Record local/mock/device/live execution honestly. A simulator design review is not a mobile runtime pass.
- App redundancy on one host is a simulation, not production HA. Legal and release decisions need the appropriate owners.

## Reference and Maintenance

[JD coverage](docs/reference/jd-coverage.md) · [Glossary](docs/reference/glossary.md) · [Tool choices](docs/reference/tool-comparisons.md) · [Old-to-new chapter map](docs/reference/chapter-migration.md)

[Code answer guidance](docs/mentor/code-answer-guide.md) · [SQL answers](docs/mentor/sql-answers.sql) · [Capstone guidance](docs/mentor/capstone-guide.md) · [Safety checks](docs/mentor/safety-checklist.md)

Authoring records are separate from lessons: [design](docs/superpowers/specs/2026-10-09-enterprise-qe-curriculum-design.md), [plan](docs/superpowers/plans/2026-10-09-enterprise-qe-curriculum.md), [execution ledger](docs/mentor/enterprise-migration-ledger.md).

No mandatory paid SaaS, cloud deployment or AI account. Docker Desktop licensing, hosted CI features and external service quotas remain subject to organizational policy. Learning artifacts do not replace professional experience, legal review or certification.
