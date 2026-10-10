# Original QA to QE Foundation Design — Historical English Summary

Historical record, superseded by the [approved enterprise design](2026-10-09-enterprise-qe-curriculum-design.md). This is an English summary of the original design, not a fresh verification report. The original wording remains in Git history at e964c54.

## Original Intent and Constraints

Build a practical Manual-QA-to-QE foundation using one WordPress/WooCommerce project, synthetic checkout, LINE OA, coding, automation, SQL, tracking quality and recovery. Use free routes where policy permits; optional GA4 and LINE API/Login; do not require a paid AI account. No real payment/customer data, unapproved public database/admin access or production-HA claims.

The initial planning assumption was fourteen weeks at six to eight hours per week with mentor feedback. That was an estimate, not a guarantee or scoring system. The current curriculum replaces weekly framing with dependency-ordered stages.

## Original Sequence

Setup/HTTP/Git → TypeScript → Git flow → Docker/3-tier → SQL → API/UI automation → CI/AI workflows → tracking → OA setup → identity/journey → failure drills → recovery → governance → capstone.

## Original Architecture

Browser/LINE rich menu → temporary ngrok HTTPS → Nginx public storefront → WordPress/WooCommerce → commerce MariaDB. A separate Node collector wrote purchase events to a lab database. Local admin used a separate loopback endpoint. Webhook/Login routes were proposed extensions, not completed core implementations.

The HA simulation added a second app, shared content and reverse-proxy balancing. DB, proxy, shared volume, host and tunnel remained single points of failure. Backup/recovery needed actual restore checks, counts/value/assets and explicit RTO/RPO.

## Learning and Data Contracts

Each chapter needed prerequisites, concepts, commands, expected results, troubleshooting, cleanup, exercises and references. Code tests, API tests and browser tests had distinct roles; negative fixtures were mandatory. Starter work and answer guidance were separate.

Purchase represented an authoritative completed synthetic order, not a click. Contracts included event/transaction IDs, version, timestamps, source, consent, currency, amount and items. Reconciliation used eligible orders, UTC windows and explicit missing/duplicate/invalid/late/excluded categories. Browser collection was not guaranteed complete, and server-side collection could not bypass consent.

## LINE and Governance

OA features came before API work: profile, greeting, responses, human chat, rich menu, quota and actual mobile journey. Provider/Channel/OA/user identifiers were distinct. Provider ownership required review before binding. Account linking and order ownership could not trust client UID/display name.

Governance covered data purpose/access/retention, AI provenance/permissions/human review, product risk ownership, security boundaries and DPO/legal decisions. Passing labs did not establish PDPA/GDPR compliance.

## Original Delivery Scope

Core handbook/local labs, OA/manual identity exercises, optional API/Login/GA4, failure/recovery and evidence-backed capstone. The runtime outcomes and design deviations are recorded in [historical verification](../../mentor/verification-report.md) and [historical ledger](../../mentor/progress.md).
