# Enterprise QE Curriculum Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task using the user's preserved Native execution preference. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the tool-led handbook with an English, competency-led QE curriculum and working reference labs aligned with the supplied job description.

**Architecture:** Retain the commerce/collector system and add isolated API, mobile and performance learning assets. A single numbered learning path links to these assets; independent verification separates documentation, local runtime, CI, mobile and live-account evidence.

**Tech Stack:** TypeScript, Vitest, Playwright, Postman/Newman, Appium/WebdriverIO, k6, Docker Compose, MariaDB and GitHub Actions.

**Spec:** [Approved curriculum specification](../specs/2026-10-09-enterprise-qe-curriculum-design.md).

Status: written plan awaiting user review. The specification was approved; implementation has not started. This plan preserves Native execution and does not request a new execution-method choice.

## Global Constraints

- Practical labs and separate completion and understanding checklists in every lesson.
- No scores, rankings, grading rubric, or introductory audience-suitability sections.
- Optional GA4; no mandatory paid plugins, SaaS subscription, cloud deployment, or AI account.
- Native implementation in the existing repository, preserving working code where possible.
- WordPress/WooCommerce remains the main connected-commerce system under test.
- All tracked human-authored instructional prose becomes English, including historical notes; historical facts and verification limits remain unchanged.
- Core currently requires Node `>=22.22.3 <23`; keep its package/lockfile contract unless compatibility testing justifies a documented change. Isolate mobile dependencies.
- Do not create accounts, bind Providers, publish tunnels, provision paid resources or use real payments/data during implementation.
- Use `apply_patch` for file edits. Work on approved branches only; no force pushes. Review staged paths before each commit.
- Do not run commerce smoke, E2E, outage and recovery drills concurrently. Never delete existing volumes to obtain a clean result.

## Review Focus

1. A learner follows cleanup then starts the next chapter: prerequisite services are restarted explicitly; checked in Tasks 2 and 13.
2. Concurrent, repeated or unauthorized API requests: no cross-user disclosure, duplicate resource or corrupted store; tested in Tasks 3–4.
3. Denied/revoked consent or a collector outage: checkout outcomes and analytics outcomes remain separate; tested in Task 5 and explained in Task 10.
4. Mobile hardware/toolchain is absent: commands fail with actionable diagnostics, never report a skipped platform as verified; tested in Task 7.
5. A failing test or load threshold produces artifacts: CI remains failed and does not leak credentials/session data; tested in Tasks 8–9.

## File Map and Migration Contract

All paths in the following table are relative to `docs/handbook/`. Each core lesson uses the twelve-section lesson contract from the specification, previous/next links, prerequisite IDs and actual starting service state. The table is also the source for `docs/reference/chapter-migration.md`.

| New file | Existing material to reuse/rewrite |
|---|---|
| `01-quality-engineering.md` | New QE ownership, Agile and shift-left material |
| `02-requirements.md` | New acceptance criteria and ambiguity exercises |
| `03-test-strategy.md` | Existing capstone/risk material plus strategy and traceability |
| `04-test-design.md` | New boundaries, partitions, decisions and state transitions |
| `05-exploratory-testing.md` | Existing journey cases plus charter and initial defect report |
| `06-workstation-git.md` | `00-setup.md`, Git sections of `01-http-git.md`, `03-git-flow.md` |
| `07-http-rest.md` | HTTP sections of `01-http-git.md` |
| `08-architecture.md` | Architecture sections of `04-docker-architecture.md` |
| `09-javascript.md` | Basics from `02-typescript.md`, expanded worked examples |
| `10-typescript-async.md` | Runtime validation and async exercises from `02-typescript.md` |
| `11-unit-testing-debugging.md` | Existing test-first exercises and AI workflow |
| `12-docker-environments.md` | Commerce setup from `04-docker-architecture.md` |
| `13-sql-test-data.md` | `05-data-sql.md` |
| `14-postman-api.md` | New collection against the fixture API |
| `15-api-automation.md` | API parts of `06-automation.md` plus authenticated API framework |
| `16-playwright-framework.md` | Web parts of `06-automation.md` plus reusable fixtures |
| `17-automation-maintenance.md` | New flake, parallel data and diagnostics labs |
| `18-mobile-strategy.md` | New native/mobile-web strategy and device matrix |
| `19-appium.md` | New Android/iOS automation |
| `20-continuous-testing.md` | CI parts of `07-ci-ai-workflow.md` plus deployment rehearsal |
| `21-defect-lifecycle.md` | New triage, debugging, retest and regression workflow |
| `22-line-oa-journey.md` | `09-line-oa.md`, `10-line-identity-journey.md` |
| `23-tracking-reconciliation.md` | `08-tracking.md`, data definitions from `05-data-sql.md` |
| `24-data-failure-drills.md` | `11-data-failure-drills.md` |
| `25-performance-observability.md` | New bounded k6/diagnostics labs |
| `26-accessibility-compatibility.md` | New automated/manual accessibility and browser matrix |
| `27-security-governance.md` | `13-governance-security.md` and responsible AI workflow |
| `28-reliability-cloud.md` | `12-reliability.md` plus cloud responsibility mapping |
| `29-sprint-capstone.md` | Planning/change/incident portions of `14-capstone.md` |
| `30-release-handover.md` | Release/evidence portions of `14-capstone.md` |

Keep `learning-guide.md` and extension filenames `line-api.md`, `line-login.md`, `ga4.md`; rewrite them in English and label E01–E03. Delete superseded core chapter files only in the complete navigation/migration task, not while references still point to them.

Runtime lab additions live in `labs/api`, `labs/mobile` and `labs/performance`. Keep application code and tests separate. New packages contain their own `package.json`, lockfile and README where needed; never assume a root `npm test` exists.

## Task 1: Baseline and Compatibility Record

**Files:** Create `docs/reference/environment-matrix.md`; update `docs/mentor/verification-report.md` with a dated baseline section.

**Interfaces:** Produces supported runtime/toolchain entries and executed/not-executed evidence used by later tasks.

- [ ] Record Git status, branch, Node/npm/Docker versions and available Android/Xcode tools without printing secrets. Follow the worktree skill's environment check; use the existing workspace unless isolation is actually required.
- [ ] Run from `labs/qe-code`: `npm ci && npm test && npm run typecheck`; from root: `node --test labs/commerce/tests/snapshot-integrity.test.mjs`. Record fresh results, not the historical test count as an assumption.
- [ ] Resolve and pin new package versions against their official engine requirements. Preserve core Node 22 compatibility; document a separate supported mobile Node runtime if necessary. Do not install device SDKs or change global machine security settings automatically.
- [ ] Commit the baseline record alone with `docs: record curriculum migration baseline`.

## Task 2: Documentation Contract and Validation

**Files:** Create `scripts/check-docs.mjs`, `scripts/tests/check-docs.test.mjs`, `docs/reference/curriculum.json`; rewrite `docs/handbook/learning-guide.md` after lesson migration in Task 12.

**Interfaces:** Export `validateDocuments({root, manifestPath, checkEnglish}): Promise<string[]>`; CLI exits 1 for errors, 0 for success. Manifest entries contain `id`, `path`, `prerequisites`, `kind` (`core` or `extension`) and `requiredHeadings`. Dependencies form a DAG; extension IDs never become mandatory core prerequisites.

- [ ] Add failing temporary-directory tests named `rejects broken local links and anchors`, `rejects missing lesson sections`, `rejects prerequisite cycles`, `rejects duplicate lesson ids`, `rejects Thai instructional prose`, and `accepts a complete lesson`. Use Node's test runner, not another test framework.
- [ ] Run `node --test scripts/tests/check-docs.test.mjs`; confirm each failure is attributable to the missing validator.
- [ ] Implement link/anchor checking, balanced fences, exact lesson headings and manifest checks. Scan tracked textual instructions, not binaries, downloaded apps, lockfiles or generated files. The English check flags Thai for review rather than altering source identifiers.
- [ ] Keep full-English validation as the final migration gate; during migration support structural validation without rejecting existing legacy prose. Add a checklist for human inspection of service startup/cleanup, which a heading checker cannot prove.
- [ ] Rerun validator tests and commit with `test: add curriculum documentation validation`.

## Task 3: Isolated API Learning Service

**Files:** Create `labs/api/package.json`, `package-lock.json`, `tsconfig.json`, `src/app.ts`, `src/store.ts`, `src/server.ts`, `tests/app.test.ts`, `tests/store.test.ts`, `README.md`, `.env.example`, `openapi.json`; update root `.gitignore` for local state.

**Interfaces:** `Resource = {id: string, ownerId: string, title: string, version: number, clientRequestId: string}`. `createApi({store, tokens}): Server` accepts an injected store and token-to-owner map. `createStore(filePath): ResourceStore` serializes mutations and atomically replaces its JSON file. Storage failures return 503 without claiming success. Bind standalone service to `127.0.0.1:8090` only.

API contract: `GET /health` is liveness; authenticated `POST /resources` accepts `{title, clientRequestId}` and returns 201; an identical repeat for the same owner returns 200 and the original ID, while changed data with that key returns 409. `GET /resources?offset=0&limit=10` returns `{items, total}` for the caller only, stable insertion order, integer offset >=0 and limit 1–100. `GET /resources/:id`, `PATCH /resources/:id` with `{title, version}`, and `DELETE /resources/:id` return 200/200/204 respectively; stale version is 409. Missing auth is 401; missing or other-owner resource is 404. Reject unknown fields, empty/overlong title (1–120 trimmed characters), malformed JSON and bodies above 64 KiB. Client-supplied ownerId is never accepted.

- [ ] Add table-driven RED tests for the contract, including cross-owner reads/mutations/lists, invalid pagination, concurrent duplicate POSTs, corrupt backing files, injected storage failure and restart persistence. Use per-test temporary directories and ephemeral ports.
- [ ] Run `npm test` from `labs/api`, confirm RED, then implement only this fixture surface with built-in Node HTTP/fs and the established TypeScript test stack. No dependency on WooCommerce or LINE.
- [ ] Read two local synthetic tokens from environment; fail startup for missing/equal tokens. Tests inject synthetic values. No default production-like credentials, authentication bypass switch or public reset endpoint.
- [ ] Run `npm ci && npm test && npm run typecheck`; compare OpenAPI responses and schemas against tests. Document local seed/reset by a new isolated state directory, never deletion of shared state.
- [ ] Commit with `feat: add isolated authenticated API training service`.

## Task 4: Postman and API Framework Exercises

**Files:** Create `labs/api/postman/collection.json`, `postman/environment.example.json`, `tests/collection.test.ts`, `tests/journey.test.ts`, `src/client.ts`, `scripts/run-collection.mjs`; extend API package scripts and README.

**Interfaces:** Collection variables `baseUrl`, `tokenA`, `tokenB`, `resourceId`, `runId`; no real secrets exported. `ApiClient` wraps fetch and returns status/body without treating every 2xx as business correctness. The local runner starts an isolated fixture server/store, injects synthetic credentials into Newman programmatically, and always closes server/temp state.

- [ ] Write RED checks asserting collection schema, no saved bearer secrets, unique run IDs, expected 401/404/409 cases and no dependency on an existing local DB.
- [ ] Build a collection covering create/read/list/update/delete, ownership denial, validation and idempotency. Add assertions for exact fields and resource state, not just status.
- [ ] Add `npm run test:collection` and a code-based journey using the same API contract. Assert two independently executed collections do not collide.
- [ ] Run tests, typecheck and collection locally; collect a deliberate wrong-assertion failure then restore it. Commit with `feat: add repeatable API and Postman learning labs`.

## Task 5: Maintainable Web Framework

**Files:** Create `labs/qe-code/e2e/fixtures.ts`, `e2e/pages/storefront.ts`, `e2e/data/buyer.ts`, `e2e/consent.spec.ts`, `e2e/diagnostics.spec.ts`; refactor `e2e/checkout.spec.ts`; update Playwright configuration and package scripts only as needed.

**Interfaces:** Typed fixture `storefront` exposes `addNotebookToCart()` and `completeCheckout(buyer)`; assertions stay in tests. `syntheticBuyer(runId)` creates non-real, per-run inputs. Preserve the current purchase contract, amounts and local-only checkout behavior.

- [ ] Add RED browser cases for granted purchase, denied consent with successful checkout, and collector rejection/outage with order outcome checked independently. Denied-event checks observe the entire bounded checkout completion interval, not an arbitrary short sleep.
- [ ] Introduce fixtures and focused helpers without a generic base-class framework. Keep fresh browser contexts, retries 0 by default, and use real runtime outcomes separately from mocked diagnostics tests.
- [ ] Add a local synthetic HTML diagnostic case using `page.setContent` for delayed UI/state changes; show that web-first assertions pass without fixed sleep and that a wrong expected value fails.
- [ ] Run `npm test && npm run typecheck`; with core/tracking running, run `npm run test:e2e`. Run unaffected tests twice to detect shared data dependence. Do not claim whole-database order counts are isolated across workers.
- [ ] Keep sensitive traces/screenshots off for commerce by default; permit artifacts only for synthetic fixtures with a documented redaction policy. Commit with `refactor: structure web automation learning framework`.

## Task 6: Foundations, Strategy and Framework Lessons

**Files:** Create lessons 01–17 from the file map. Create `templates/test-strategy.md`, `test-plan.md`, `traceability-matrix.md`, `exploratory-charter.md`, `defect-report.md`, `test-data-plan.md`, `automation-design.md`.

**Interfaces:** Lessons consume Tasks 3–5 contracts; traceability uses requirement ID, risk, test ID, evidence and decision. Initial requirement fixture is synthetic checkout with deliberately unspecified currency, consent, retry and error behavior.

- [ ] Write lessons 01–05 with complete worked artifacts, not only blank templates. Include boundary values, a decision table, state transitions and an exploratory debrief.
- [ ] Write 06–11 in progressive programming order with small exercises before reading the reference implementation. Teach AI provenance/verification here and add the first minimal CI example.
- [ ] Write 12–17 against actual scripts/contracts, including explicit DB start after cleanup, SQL transaction connection lifetime and unit/API/UI scope differences.
- [ ] Manually walk the prerequisite sequence and run the documentation structural check; leave full-language gating until Task 12. Commit with `docs: build QE foundation and automation learning sequence`.

## Task 7: Android and iOS Mobile Track

**Files:** Create `labs/mobile/package.json`, `package-lock.json`, `tsconfig.json`, `wdio.shared.conf.ts`, `wdio.android.conf.ts`, `wdio.ios.conf.ts`, `src/preflight.ts`, `tests/preflight.test.ts`, `specs/forms.spec.ts`, `scripts/verify-app.mjs`, `apps-manifest.json`, `README.md`; lessons 18–19; `templates/device-matrix.md`.

**Interfaces:** Use Appium with WebdriverIO. App input comes from `MOBILE_APP_PATH`; Android selection uses `ANDROID_UDID`, iOS uses `IOS_UDID`. Preflight returns a diagnostic list for missing app, checksum mismatch, unavailable platform tools or missing device; nonempty errors prevent a run. Downloads/app binaries remain ignored.

Selected sample: `webdriverio/native-demo-app` release `v2.2.0` (MIT), using these published assets verified through GitHub release metadata during planning:

- Android: `android.wdio.native.app.v2.2.0.apk`, SHA256 `fe1d605ce099c73d93f33e5cbcb0df0bea437ce57aaaaf156b3b0fa1ca54931d`.
- iOS simulator: `ios.simulator.wdio.native.app.v2.2.0.zip`, SHA256 `84c7efda441f7a8ed37bb1527bae357de8a44a16f878996d52bdfd9d58a8c66a`.

- [ ] Recheck the manifest against [the tagged release](https://github.com/webdriverio/native-demo-app/releases/tag/v2.2.0), verify the tagged license and hashes before install, and inspect supported driver/runtime requirements. Pin the selected Appium/driver/WebdriverIO versions; never use unbounded `latest` in learner commands.
- [ ] Add RED preflight tests for wrong hash, missing device, iOS on a non-macOS host and unsupported runtime. Use injected tool detection so these tests run without emulators.
- [ ] Implement platform configs and a shared Forms smoke flow using inspected sample accessibility IDs: enter text, assert echoed text, change a control, submit and assert its result. Add one deliberately wrong assertion exercise without shipping it enabled.
- [ ] Document native/mobile-web distinction, permissions/lifecycle/connectivity exploratory cases, setup/cleanup and a real-device matrix. This app is not a native commerce client.
- [ ] Run mobile package tests/typecheck; execute Android/iOS smoke only on available approved toolchains. Record each platform's actual execution status. Commit with `feat: add Android and iOS QE learning track`.

## Task 8: Bounded Performance and Accessibility

**Files:** Create `labs/performance/api-smoke.js`, `config.mjs`, `README.md`, `tests/safety.test.mjs`; `labs/qe-code/e2e/accessibility.spec.ts`; lessons 25–26; `templates/performance-report.md`.

**Interfaces:** k6 `BASE_URL` accepts loopback hosts only; baseline defaults to 2 virtual users for 10 seconds, hard caps 5 users/30 seconds. Require explicit synthetic API token. Measure a resource read in addition to liveness; thresholds are `http_req_failed rate<0.01` and `http_req_duration p(95)<500` as lab hypotheses, not production SLOs. Override threshold in a deliberate failure exercise without changing safety caps.

- [ ] Add RED safety tests for external targets and excessive workloads; export `validateLoadConfig({baseUrl, vus, durationSeconds})` from `config.mjs`, returning validated values or throwing before traffic starts. Use portable JavaScript so Node tests exercise the same checks imported by k6.
- [ ] Implement the bounded script and baseline/error/latency evidence instructions. Pin and document the verified k6 installation route; do not run load against LINE, ngrok or public APIs.
- [ ] Add axe-based tests against controlled accessible/inaccessible HTML fixtures, verifying the known violation is detected. Add a separate storefront audit that reports real findings without suppressing them to make CI green.
- [ ] Run safety tests, local k6 smoke and a deliberately impossible threshold; expect exit 0 then nonzero. Pair automated accessibility output with keyboard/focus/form-error and cross-browser manual labs.
- [ ] Commit with `feat: add bounded non-functional testing labs`.

## Task 9: Continuous Testing and Defect Lifecycle

**Files:** Modify `.github/workflows/qe-labs.yml`; create `.github/workflows/qe-extended.yml`, `labs/api/scripts/release-rehearsal.mjs`, `labs/api/tests/release-rehearsal.test.ts`; lessons 20–21; `templates/pipeline-policy.md`.

**Interfaces:** PR gate runs documentation, unit/API/typecheck/collection checks and a bounded containerized web smoke job. Extended manual workflow selects performance or supported runtime checks; mobile execution is not silently scheduled on an incompatible runner. Local release rehearsal starts baseline and candidate API fixture processes on ephemeral loopback ports with separate state files.

- [ ] Write RED rehearsal tests: healthy candidate is selected; failing candidate is rejected and baseline still serves the known resource; both processes and temporary files are cleaned up on error. No shell evaluation of user-supplied deployment commands.
- [ ] Implement the rehearsal with explicit business verification, not only health. Explain hosted environments and approvals as policy-dependent alternatives.
- [ ] Add CI jobs with immutable reviewed action revisions, minimal permissions, lockfile installs, bounded timeouts and service readiness. Save only allowlisted synthetic reports with short retention; keep raw commerce sessions/tokens out of artifacts.
- [ ] Teach deliberate assertion failure, commit-specific evidence, quarantine ownership/expiry, and red/green verification. Defect lesson includes severity versus priority, reopen, retest, regression and Jira/Confluence-to-Markdown mappings.
- [ ] Run local workflow commands and rehearsal tests. Verify hosted CI after authorized push; inspect that failures remain failures. Commit with `ci: integrate layered QE checks and delivery rehearsal`.

## Task 10: Connected Commerce and Data Quality

**Files:** Create lessons 22–24; rewrite extensions E01–E03, `labs/line/*.md`, `templates/channel-inventory.md`, `tracking-plan.md`; preserve existing collector/reconciliation interfaces.

- [ ] Write OA setup before Provider/API material: profile, greeting, keyword response, human chat, rich menu, test audience and quota checks. Keep real-account actions learner-run.
- [ ] Explain identity and consent separately. Preserve proxy/secret wiring and WordPress-versus-Node session boundaries for optional integrations; no claims that routes already exist.
- [ ] Connect browser and API observations to SQL/TypeScript reconciliation. Keep fixtures separate from live WooCommerce data, event-ID dedup separate from transaction-level duplicate detection, and late/observed categories explicitly nonexclusive.
- [ ] Provide failure drills with baseline, trigger, expected business/data impact and recovery for missing, duplicate, invalid, late and excluded cases. Reference Task 5 consent/outage tests.
- [ ] Run `npm test -- reconcile` and `npm test -- line` from `labs/qe-code`; verify links and mark live OA/Login/GA4 execution separately. Commit with `docs: rebuild connected commerce and tracking track`.

## Task 11: Governance, Recovery and Capstone

**Files:** Create lessons 27–30; rewrite existing governance/recovery/release/ADR/evidence templates; create `templates/handover.md`, `docs/reference/tool-comparisons.md`, `docs/reference/jd-coverage.md`.

- [ ] Cover ownership/authorization, secret handling, data purpose/retention, incident escalation and Data/AI/Product decision rights. Link authoritative legal material without inventing compliance conclusions or statutory deadlines.
- [ ] Preserve isolated restore, actual RTO/RPO measurement and remaining SPOFs. Make project-specific cleanup and stores not covered by backup explicit.
- [ ] Add cloud architecture/responsibility/cost mapping with no required provisioning, and official ISTQB study references without exam dumps.
- [ ] Build a sprint simulation with a changed acceptance criterion, data incident, reviewed regression fix and release/handover artifacts. Map every JD capability to its lesson and evidence.
- [ ] Run snapshot-integrity tests and review capstone dependencies. Commit with `docs: add governance recovery and delivery capstone`.

## Task 12: English Migration and Navigation Cutover

**Files:** Rewrite `README.md`, `docs/handbook/learning-guide.md`, all `docs/mentor/*.md`, existing `docs/superpowers` records, `labs/qe-code/exercises/README.md` and remaining templates/instructional text; create `docs/reference/glossary.md`, `chapter-migration.md`; remove superseded core files listed in the file map.

- [ ] Translate remaining tracked instructions while preserving historical dates/SHAs/results and labeling old spec/plan status as historical. Do not rewrite historical evidence as a new run.
- [ ] Translate user-facing instructional strings where necessary without changing protocol fields or intentional locale fixtures; rerun affected tests for any runtime text change.
- [ ] Replace README with one path, setup entry, supported execution matrix and optional extensions. Remove duplicate lesson order and audience/grading sections.
- [ ] Update all links atomically, including historical links via migration notes. Run `node scripts/check-docs.mjs --english` and `git diff --check`; expected zero errors, 30 core lessons and 3 extensions.
- [ ] Inspect each lesson for twelve required sections, a worked example, independent challenge and specific self-checks. Commit with `docs: publish English competency-led handbook`.

## Task 13: Whole-Course Verification and Delivery

**Files:** Update `docs/mentor/verification-report.md`, `documentation-review.md`, `reference-review.md`, `acceptance.md`, `progress.md` and `docs/reference/environment-matrix.md`.

- [ ] Run documentation validator tests, full English/link checks, all package unit/typecheck suites, collection runner, mobile preflight, performance guards and snapshot integrity. Record exact commands and results per package.
- [ ] Walk lesson 12 cleanup → lesson 13 DB startup → API/web setup to prove handoffs. Run commerce smoke, browser suite, then failure/recovery labs sequentially on synthetic local state; retain snapshots and clean up only projects created for the drill.
- [ ] Execute available Android/iOS smoke, bounded k6 and accessibility checks; record unavailable platforms and live-account checks as not executed. Do not replace missing runtime evidence with a source review.
- [ ] Perform one independent final review under Native execution, covering the five review-focus conditions, JD coverage, lesson sequence and safety. Fix findings and rerun affected checks.
- [ ] Inspect staged diff for generated state, binaries, credentials and untranslated instructions. Commit the verification report and push under the standing repository authorization; inspect CI for the pushed SHA.
- [ ] Report delivery links, verified capabilities and remaining device/account limitations without claiming production readiness or certification.

## Plan Self-Review

- Specification coverage: curriculum/English migration in Tasks 2, 6, 10–12; API/web/mobile/performance/accessibility in Tasks 3–8; CI/defects in Task 9; governance/recovery/cloud/capstone in Task 11; final verification in Task 13.
- Interface consistency: fixture API is independent of purchase collector; mobile has its own package/runtime; no task assumes native commerce, live LINE routes or a shared WordPress/Node identity session.
- Safety: public exposure, paid account actions and destructive resets are not execution shortcuts. Missing device access changes the verification status, not test expectations.
- Approval handoff: review this plan before implementation. Preserve Native execution; no need to choose an execution method again.
