# Enterprise Quality Engineering Curriculum — Design Specification

Status: written specification approved by the user. The [implementation plan](../plans/2026-10-09-enterprise-qe-curriculum.md) awaits review before execution.

This specification supersedes the curriculum structure in [the original design](2026-10-09-qe-foundation-design.md) once approved. It does not claim that the proposed lessons or new labs already exist.

## 1. Intent and Success Criteria

Rebuild the repository as an English-language, dependency-ordered Quality Engineering curriculum aligned with the supplied QE job description. Develop the ability to design testing, write maintainable automation, investigate defects, collaborate in delivery, and detect business and tracking-data failures.

The curriculum must demonstrate practical capability through artifacts and repeatable experiments. It must not claim to replace three to five years of professional experience, award professional certification, or establish legal compliance.

User requirements retained:

- Practical labs and separate completion and understanding checklists in every lesson.
- No scores, rankings, grading rubric, or introductory audience-suitability sections.
- Git/GitHub and Git flow, Docker, SQL, architecture, automation, and responsible AI-assisted engineering.
- WordPress/WooCommerce as the main connected-commerce system under test.
- Real LINE OA setup and feature exploration before optional Messaging API and Login integrations.
- Tracking completeness, consent, reconciliation, governance, security, and recovery as essential capabilities.
- Optional GA4; no mandatory paid plugins, SaaS subscription, cloud deployment, or AI account.
- Native implementation in the existing repository, preserving working code where possible.

Enterprise-grade means traceable requirements, maintainable code, controlled environments, least privilege, reproducible evidence, and explicit operational limitations. It does not mean enterprise subscriptions or unnecessary framework abstraction.

## 2. Design Decisions

Choose a competency-led core with a continuous commerce case study. Reject a translation-only approach because it preserves the current ordering problems. Defer separate specialist curricula because they would fragment the foundation.

Use one primary programming language, TypeScript, and a small toolchain: Vitest, Playwright, Postman, Appium with a TypeScript WebDriver client, k6, Docker Compose, SQL, and GitHub Actions. Selenium, Cypress, Robot Framework, Python, Go, SoapUI, and RestAssured receive comparison/transfer guidance, not duplicate mandatory frameworks.

The course uses stages rather than promised weekly completion dates. Each lesson identifies its actual prerequisites. Learners may continue independent material while recording a blocked account or device task; they must not describe an unexecuted task as verified.

Quality planning precedes implementation. Security, accessibility awareness, privacy, exploratory testing, and defect recording begin early and deepen in dedicated lessons. Basic CI is introduced after the first coding tests; full pipeline design follows automation framework work.

## 3. Job Description Coverage

| JD capability | Required learning evidence | Primary stages |
|---|---|---|
| Web, mobile, and REST automation | Maintainable suites, negative cases, isolation, documented execution and maintenance | 4, 6–9 |
| Test strategy and planning | Risk-based strategy, functional/non-functional matrix, requirement-to-test traceability | 1–2, 11–12 |
| CI/CD integration | Deliberately failing and passing runs, suite selection, artifacts, deployment verification and rollback rehearsal | 9, 12 |
| Defect lifecycle management | Reproduction, isolation, evidence, triage, fix verification, regression coverage, closure/reopening | Throughout; depth in 9 |
| Exploratory and manual testing | Time-boxed charter, observations, debrief, follow-up tests | 2, 8, 10 |
| Agile collaboration and shift-left | Requirement questions, refinement notes, sprint risk updates, retrospective action | 1, 12 |
| Programming fundamentals | Tested functions, validation, async failures, debugging, code review | 4 |
| API testing | Postman collection plus code-based contract, auth, error and persistence tests | 6 |
| SQL and data verification | Joins, transactions, repeatable fixtures, reconciliation | 5, 10 |
| Git, Jira, Confluence | Reviewed PR, issue lifecycle, decision/test documentation with portable repository equivalents | 3, 9, 12 |
| Performance testing | Bounded load model, thresholds, baseline, bottleneck investigation | 11 |
| Containers and cloud familiarity | Local environment lifecycle, service boundaries, cloud deployment mapping and responsibility analysis | 5, 11 |
| Certification awareness | Official ISTQB study references and terminology mapping, without exam dumps or certification claims | 2, reference appendix |

## 4. Learning Sequence

The lesson numbers below are the authoritative target order. Numbering is not a schedule or score. Setup instructions install tools only when needed.

| Stage | Lessons | Main lab outcome | Dependencies |
|---|---|---|---|
| 1. QE workflow | 01 Quality ownership and Agile delivery; 02 Requirement analysis and acceptance criteria | Review a deliberately ambiguous checkout story; clarify acceptance and delivery risks | None; document exercises require no services |
| 2. Test strategy and design | 03 Risk-based strategy and traceability; 04 Test-design techniques; 05 Exploratory testing and initial defect reports | Produce a strategy, boundary/decision/state cases, charter and reproducible defect report | 01–02; supplied screenshots/fixtures support offline work |
| 3. Engineering foundations | 06 Workstation, Git/GitHub and Git flow; 07 HTTP, REST and browser investigation; 08 Architecture and system boundaries | Submit a small PR and trace a request through presentation, application and data layers | 01–05; Git/Node installed in 06 |
| 4. Programming for testing | 09 JavaScript fundamentals; 10 TypeScript, asynchronous code and validation; 11 Unit testing, debugging and code review | Build tested utilities, demonstrate a meaningful failing assertion, and introduce a minimal CI check | 06–08 |
| 5. Environments and data | 12 Docker and reproducible commerce environments; 13 SQL and test-data management | Create a synthetic order, verify persistence and query known fixtures safely | 09–11; Docker installed in 12 |
| 6. API engineering | 14 API investigation with Postman; 15 Maintainable API automation | Export a portable collection and build auth/contract/error/persistence checks | 12–13 |
| 7. Web automation | 16 Playwright framework foundations; 17 Framework maintenance and diagnostics | Reusable fixtures and domain helpers; investigate a seeded flake without masking it | 14–15 |
| 8. Mobile engineering | 18 Mobile strategy and exploratory testing; 19 Appium automation for Android and iOS | Device matrix, native sample-app smoke test, platform-specific evidence | 16–17; platform setup contained in 19 |
| 9. Continuous delivery and defects | 20 Continuous testing and pipeline design; 21 Defect lifecycle and collaborative debugging | Failing/passing pipeline evidence, deployment rehearsal, complete defect-to-regression chain | 15–17; mobile jobs depend on device readiness, not core pipeline execution |
| 10. Connected commerce and data | 22 LINE OA and connected journeys; 23 Tracking contracts and reconciliation; 24 Data-loss investigation | Configure OA features; distinguish missing, duplicate, invalid, late and consent-excluded data | 12–17; LINE setup is not required to run offline reconciliation |
| 11. Non-functional quality | 25 Performance and observability; 26 Accessibility and compatibility; 27 Security and Data/AI/Product Governance; 28 Reliability, recovery and cloud concepts | Controlled load experiment, accessibility report, threat/risk review and isolated recovery evidence | 20–24; cloud concepts do not require a cloud account |
| 12. Delivery capstone | 29 Sprint simulation and integrated test strategy; 30 Release review and operational handover | One traceable delivery package including an incident, regression fix, release decision and follow-up work | All applicable core labs; unexecuted device/account work remains explicit |

Optional extensions follow lesson 22/23 and relevant security fundamentals: E01 LINE Messaging API; E02 LINE Login and account linking; E03 GA4 ecommerce. They do not interrupt the numbered core path.

The README presents this path once. Each lesson includes previous/next navigation and specific prerequisites; reference material and historical execution records are outside the learning sequence.

## 5. Standard Lesson Contract

Every lesson contains these sections, in this order:

1. Outcomes: observable capabilities, not a list of tools to install.
2. Prerequisites: previous lesson IDs, accounts, runtime, directory and required service state.
3. Concepts: concise definitions and a system-relevant mental model.
4. Worked example: a small complete example before independent work.
5. Guided lab: explicit steps, safe synthetic inputs, commands and working directories.
6. Expected results: assertions, business outcomes, data effects and failure interpretation.
7. Independent challenge: a changed input or failure that cannot be completed by copying output.
8. Troubleshooting: likely symptoms and diagnostic actions, not arbitrary sleeps or resets.
9. Completion checklist: actions and evidence that can be inspected.
10. Understanding checklist: explanations or predictions demonstrated with a new example.
11. Cleanup and handoff: stop/restart instructions, retained data and next-lesson starting state.
12. References: primary sources with review dates for version-sensitive instructions.

Planning lessons use concrete document-based labs; not every lab requires code. Checklists stay unchecked in reference materials. Evidence records distinguish verified, needs investigation, not executed, and out of selected scope; no point totals or implied certification.

Avoid appended duplicate lab/checklist sections. Each concept has a canonical explanation with links from other lessons. Glossary entries support—not replace—explanation at first use.

## 6. Lab Architecture and Boundaries

Preserve the existing commerce, collector, reconciliation, Git and recovery labs unless verification identifies a task-related defect. Separate framework helpers, test data and application code so learners can identify what they are testing.

The connected case study remains:

```text
Requirement and risk
  -> test design and implementation
  -> browser / LINE rich menu
  -> local proxy -> WordPress/WooCommerce -> commerce database
  -> consent-aware purchase event -> collector -> event database
  -> reconciliation -> release evidence
```

Local admin remains a separate loopback-only endpoint. Tunnels are short-lived and require endpoint checks before exposure. LINE webhook/Login routes are extensions, not existing core features. A Node login session must not be represented as a WooCommerce customer session without a verified bridge.

### API learning surface

Keep the purchase collector's purpose unchanged. Add a small isolated synthetic API fixture service for authenticated resource CRUD, ownership, pagination, validation and conflict cases that the collector does not provide. It must bind locally, use no production credentials, and document seed/reset behavior. It is not a second commerce backend.

Postman collections and automated API tests target the same published fixture contract. Tests check response semantics and relevant persisted state; collection success does not establish business truth. Deliberate defects are enabled only in a controlled exercise fixture or sandbox, not by weakening default authentication.

### Web automation framework

Use Playwright with typed configuration, fixtures, thin page/component helpers where they improve readability, API clients, deterministic test-data builders, and clear suite tags. Do not build a large base-class hierarchy or hide assertions inside generic helpers.

Teach independent tests, semantic locators, condition-based waiting, data ownership under parallel execution, failure classification, artifact redaction and a flake remediation policy. Retries must not turn an unresolved failure into release evidence. See [Playwright guidance](https://playwright.dev/docs/best-practices).

### Mobile automation

Provide separate Android and iOS setup/run instructions, with Appium drivers and a TypeScript client. Use controlled, license-reviewed sample applications and pinned source/release references; verify artifact provenance before installation. The implementation plan must select the exact samples and supported versions before writing commands.

Cover native versus hybrid/mobile-web contexts, locators, app lifecycle, permissions where applicable, connectivity, reset behavior and device/OS coverage. The native sample is a supplementary testing surface, not a claimed native WooCommerce application. Do not automate LINE's account creation or infer native coverage from desktop viewport emulation.

Android emulator work is the default local execution route. iOS execution requires an appropriate macOS/Xcode environment; learners without it can complete the design exercise but must record iOS runtime work as not executed. Physical-device setup, signing and device-farm accounts are not mandatory dependencies for the baseline simulator exercises. Platform support is verified against current [Appium driver documentation](https://appium.io/docs/en/latest/quickstart/) during implementation.

### Performance, accessibility and recovery

Performance scripts target only local owned services, start with a bounded smoke workload, set explicit duration/concurrency limits, and include stop conditions. A green liveness load test does not prove checkout capacity. Teach latency distributions, error rates, throughput, resource observations and thresholds before stress exercises. [k6 thresholds](https://grafana.com/docs/k6/latest/using-k6/thresholds/) provide the executable acceptance mechanism.

Accessibility combines automated checks with keyboard/focus/form-error inspection. Tool success is not a conformance certification; [W3C guidance](https://www.w3.org/WAI/test-evaluate/) requires broader evaluation.

Preserve app failover and isolated restore. Explicitly distinguish app redundancy, shared host/storage/DB failure, recovery targets and observed outcomes. Commerce snapshots do not cover eventdb, LINE or GA4. Cloud work maps compute, storage, networking, IAM, availability and cost responsibility without provisioning paid resources.

## 7. Continuous Testing and Collaboration

Build pipeline literacy incrementally, then define a full test-selection policy:

- Pull requests: type checking, unit/API checks and a bounded web smoke suite where the runner supports its dependencies.
- Main/release candidate: broader integration/regression and deployment verification against an isolated environment.
- Scheduled/manual: bounded performance, recovery and mobile checks with explicit runner/device prerequisites.
- Evidence: commit, environment, suite selection, failures, artifacts, retention and unverified scope.

Use a local isolated deployment rehearsal when hosted deployment or paid features are unavailable. Exercise candidate deployment, health/business verification, intentional failure and rollback; do not claim continuous deployment from a test-only workflow. Hosted protection features remain conditional on repository permissions and plan availability. See [GitHub environments](https://docs.github.com/en/actions/concepts/workflows-and-actions/deployment-environments).

Track a defect from discovery through triage, investigation, fix, retest, regression and closure/reopening. Separate severity from priority and defect symptoms from verified causes. Introduce the defect record in lesson 05 rather than waiting for the lifecycle chapter.

Provide Jira issue and Confluence page mappings alongside Markdown/GitHub equivalents. Require the workflow and evidence, not paid product access. Include refinement, daily risk communication and a retrospective with an actionable improvement rather than ceremony attendance alone.

AI/Claude Skills/Superpowers exercises follow design, test, review and verification. Learners disclose assistance, inspect tool permissions and reject untrusted instructions. An entirely manual route uses the same engineering checkpoints.

## 8. Documentation and Repository Organization

Target layout:

```text
README.md                         Entry point, stage map, supported execution routes
docs/handbook/                    01–30 English core lessons and learning guide
docs/handbook/extensions/         E01–E03 optional lessons
docs/reference/                   Glossary, JD coverage, environment matrix, tool comparisons
docs/mentor/                      Answer guidance, facilitation and verification records
docs/superpowers/                 English design/plan records with historical status labels
templates/                       Reusable delivery and evidence artifacts
labs/commerce/                   Existing commerce/recovery system
labs/qe-code/                    Existing code, collector, unit/API/web tests
labs/api/                        Isolated synthetic API fixture and Postman collection
labs/mobile/                     Sample provenance, Android/iOS setup and automation
labs/performance/                Bounded k6 scripts and workload notes
labs/line/                       Account/identity/journey exercises
.github/workflows/               Verified test gates and manual execution routes
```

Add templates for test strategy, test plan/matrix, traceability, exploratory charter, defect report, test-data plan, automation design, device matrix, performance report, pipeline policy and handover. Keep existing tracking, inventory, risk, ADR, recovery and release templates, rewritten consistently in English.

## 9. Migration Rules

Rewrite rather than append another ordering layer. Preserve implementation behavior and useful fixtures; replace chapter names/order and update every internal link atomically. Maintain an English old-to-new chapter map in the reference section; Git history preserves removed original prose.

Translate all tracked human-authored instructional Markdown, templates and supporting notes, including historical design and execution documents. Preserve historical dates, SHAs, counts and verified/unverified distinctions; label translations as historical records, not new execution evidence. Do not translate API fields, commands or identifiers in ways that change behavior. User-facing lab instructions and intentional locale-specific fixtures must be clearly distinguished; English is the default instructional and example locale.

Replace README duplication with one learning map, a short entry path, setup links, repository navigation and verification limitations. Keep historical implementation logs out of the beginner navigation.

Versions are validated and pinned during implementation, not blindly updated to latest. New mobile tooling may use an isolated runtime if its supported Node range differs from the existing coding lab; do not silently break the working core package.

## 10. Verification and Completion Contract

The implementation is complete only when:

- All core lessons and extensions satisfy the lesson contract and have correct dependencies/navigation.
- JD capabilities map to concrete labs/artifacts, with optional and unavailable execution explicitly identified.
- All tracked instructional prose is English; a language scan flags remaining Thai for human review.
- Local links, anchors, code fences, referenced scripts and document structure checks pass.
- Existing unit/API/typecheck/snapshot tests remain green; affected runtime labs are rerun rather than borrowing old results.
- New API/Postman, web-framework, performance and accessibility exercises have runnable reference paths and recorded positive/negative outcomes.
- Android/iOS setup and tests distinguish what was actually executed on available hardware from source review. Missing hardware is documented, never represented as a passing mobile run.
- CI gates report the intended suite, use appropriate permissions and do not expose secrets or sensitive artifacts.
- Cleanup is reversible and preserves evidence; failure drills do not run alongside suites that assume healthy services.
- Documentation and code review find no unresolved learner-blocking instruction errors or safety defects.

No new LINE account, Provider binding, public tunnel, paid cloud resource or real payment is created as part of authoring without the relevant owner's authorization. Live account tasks remain learner-run exercises.

## 11. Scope and Delivery Handoff

This specification authorizes no implementation by itself. After written-spec approval, prepare an implementation plan with dependency-ordered tasks, exact new-lab selections, file migration mapping and verification commands. Use native execution, as previously requested, once that plan is reviewed.

Implementation should deliver the English curriculum and the runnable learning assets above—not merely describe future exercises as completed integrations. Approval-dependent or hardware-dependent execution must remain visible in the final verification report.

Out of scope: a production commerce platform, a native commerce application, full cloud infrastructure, paid certification, production HA, guaranteed analytics completeness, and legal compliance certification.
