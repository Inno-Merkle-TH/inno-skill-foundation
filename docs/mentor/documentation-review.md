# Documentation Review

## Historical self-study update — 2026-10-09

The earlier review covered README, core 00–14, three extensions, LINE/coding exercises, templates and design/mentor records. It added completion/understanding checklists without scores and clarified offline versus live evidence.

The independent review identified three learner blockers: DB startup after cleanup, restore cleanup using the actual project name, and missing LINE service/proxy/secret wiring. All were addressed in that revision.

Historical checks: 42 Markdown files, 156 internal links/anchors, 18 lessons, 46 unit/API tests, typecheck and one snapshot-integrity test passed. Docker outage/HA/restore/E2E were not rerun for that prose-only revision. LINE/GA4/account actions were not performed.

## Enterprise migration

The course is being replaced by the approved 30-core/3-extension learning path, not another appended ordering layer. The [manifest](../reference/curriculum.json) and executable validator enforce structure; human review must still check instructional usefulness and command dependencies.

Current results and limitations are recorded in [verification](verification-report.md) and the [execution ledger](enterprise-migration-ledger.md). Historical verification must not be counted as a new run.
