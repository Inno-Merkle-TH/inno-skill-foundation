# QE Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** สร้างคู่มือภาษาไทย 14 สัปดาห์และ runnable labs สำหรับ Manual QA → QE ที่ตรวจ connected commerce และ tracking/data quality ได้

**Architecture:** แบ่งงานเป็น core commerce/code/data, LINE extensions และ reliability/capstone บนร้านเดียว ใช้ local-first services และ mock external APIs ใน tests บทที่ต้องใช้บัญชีจริงมี manual verification แยกจาก automated checks

**Tech Stack:** TypeScript, Node.js, Vitest, Playwright, Docker Compose, Nginx, WordPress/WooCommerce, MariaDB, GitHub Actions, LINE OA, ngrok; GA4 optional

**Spec:** `docs/superpowers/specs/2026-10-09-qe-foundation-design.md`

## Global Constraints

- 14 สัปดาห์ สัปดาห์ละ 6–8 ชั่วโมง; ผู้เรียนเป็น Manual QA ไม่มี prerequisite เขียนโปรแกรม
- ข้อมูล synthetic เท่านั้น ไม่มี payment จริง ไม่มี paid dependency ใน core
- GA4 และ LINE API/Login เป็น extension; OA setup และ tracking validation เป็น core
- แต่ละบทมี prerequisites, mental model, steps, expected output, troubleshooting, reset, exercise, result checks, official references
- Secrets อยู่ server-side; ห้าม expose database/admin/debug tools ผ่าน tunnel
- Single-host app failover ไม่ใช่ production HA
- ไม่ commit, สร้าง branch หรือ init Git repository จนกว่าผู้ใช้ร้องขอ; ใช้ review checkpoints แทน commits
- ตรวจ version/license/quota ณ implementation; commit lockfile และ pin images ใน deliverable แต่ไม่อ้างว่าตรวจ runtime หากยังไม่ได้รัน

## Review Focus

- URLs ต่างกัน local/public: Task 2 ทดสอบ redirect และ admin routes ทั้งสอง mode
- ข้อมูลสกุลเงิน/เวลา/NULL: Task 4 ทดสอบ minor units, boundary time และ join multiplicity
- Consent revoked กับ retry ที่ค้าง: Task 5 ทดสอบไม่ส่ง event หลัง revoke และไม่ถือ excluded เป็น missing
- ข้อมูลผู้ใช้ปลอม/ข้ามบัญชี: Task 8 ทดสอบ signed identity, ownership และ invalid signature
- เครื่องผู้เรียนไม่มี Docker/LINE/Claude: Tasks 1/9 ระบุ fallback และรายงาน manual checks ว่ายังไม่ผ่าน ไม่สร้างผลสำเร็จปลอม

## Deliverable map และลำดับ

Phase A: Tasks 1–6 ทำ core local-first ที่เรียนและทดสอบได้โดยไม่มี LINE/GA4/Claude account

Phase B: Tasks 7–8 เพิ่ม LINE OA experience และ optional API/Login บน core เดิม

Phase C: Tasks 9–11 เพิ่ม reliability, governance และตรวจทั้งหลักสูตร

ใช้ `labs/qe-code` เป็น npm project เดียวเพื่อแชร์ types/tests กับ tracking และ LINE ลดการติดตั้งซ้ำ แต่แยกไฟล์ตาม responsibility `labs/tracking` และ `labs/line` เก็บ fixtures/config/manual checklists ไม่สร้าง package ซ้ำ

### Task 1: Learning map, setup และบทพื้นฐาน

**Files:** `README.md`, `docs/handbook/00-setup.md`, `01-http-git.md`, `02-typescript.md`, `03-git-flow.md`, `docs/mentor/safety-checklist.md`, `templates/learning-evidence.md`

**Interfaces:** Produces setup checklist และ evidence layout ที่ทุก lab ใช้; คำสั่งรันจาก root หรือ `labs/qe-code` ต้องระบุเสมอ

- [ ] สร้าง acceptance checklist ใน `docs/mentor/acceptance.md`: clean machine setup, Windows/macOS/Linux paths, free/license caveats, Git conflict/revert exercise, fallback ไม่มี Claude
- [ ] ตรวจแหล่ง Git/TypeScript/Docker/Claude ทางการก่อนเขียนคำสั่ง installation; บันทึกวันที่และ versions ที่เลือกใน `docs/handbook/00-setup.md`
- [ ] เขียน README และบทสัปดาห์ 1–3 พร้อมตัวอย่าง request/response และ progressive TypeScript exercises ไม่แจกเฉลยติดกับโจทย์
- [ ] ทำ manual walkthrough ของคำสั่งที่รันได้จริง; คำสั่งที่ไม่มี OS/account ให้ระบุ unverified และใช้ mentor checklist ไม่อ้างว่า verified
- [ ] Review checkpoint: prerequisites ต้องไม่พึ่ง lab ที่ยังไม่ได้สอน

### Task 2: ร้านค้าบน Docker และ architecture

**Files:** `labs/commerce/compose.yaml`, `.env.example`, `nginx.conf`, `scripts/setup.sh`, `scripts/backup.sh`, `scripts/restore.sh`, `docs/handbook/04-docker-architecture.md`

**Interfaces:** Produces local storefront `http://localhost:8080`, local admin endpoint `http://localhost:8081`; proxy `/lab-api/`, `/lab-events`, `/line/webhook`, `/auth/line/` to service on internal port 3000. Compose profiles `core`, `public`, `ha`; named volumes retain commerce data. Public tunnel targets 8080 only

- [ ] สร้าง `labs/commerce/tests/smoke.sh` checks: storefront 200, public admin/install routes denied, admin local reachable, DB host port unpublished, persistence after restart; รันก่อน config พร้อมบันทึก expected failure
- [ ] เลือกและ pin stable image/plugin versions ที่มี compatible architecture; setup idempotent ผ่าน WP-CLI สร้างสินค้าจำลองและ offline checkout ไม่ใช้ plugin เสียเงิน
- [ ] สร้าง config/scripts ที่ไม่พิมพ์ secrets และไม่ทำ destructive reset โดยไม่มี confirmation; `.env.example` ไม่มี credentials ใช้งานจริง
- [ ] รัน `docker compose -f labs/commerce/compose.yaml config --quiet` แล้ว clean startup/smoke; config validation อย่างเดียวไม่พอ
- [ ] เขียนบท 4 อธิบาย 3-tier, networks/volumes, proxy และ local/public URL configuration พร้อม manual cart/checkout verification

### Task 3: TypeScript foundation และ contract tests

**Files:** `labs/qe-code/package.json`, `package-lock.json`, `tsconfig.json`, `src/orders.ts`, `tests/orders.test.ts`, `exercises/README.md`, `docs/mentor/code-answer-guide.md`

**Interfaces:** `OrderRecord = {transactionId: string; status: string; valueMinor: number; currency: string; occurredAt: string; analyticsEligible: boolean}`; `validateOrder(input: unknown): OrderRecord` throws on malformed input. npm scripts `test`, `typecheck`, `test:e2e`, `start`

- [ ] เขียน failing tests สำหรับ valid synthetic order, missing ID, negative/fractional minor units, invalid currency/date และ malformed JSON
- [ ] รัน `npm test -- orders` และยืนยัน fail เพราะ behavior ยังไม่มี ไม่ใช่ dependency/config failure
- [ ] Implement validator และ beginner exercises ให้ผู้เรียนฝึก functions, loops, promises, error handling; เฉลยแยก mentor folder
- [ ] รัน `npm test -- orders` และ `npm run typecheck` ให้ผ่าน
- [ ] Review checkpoint: ผู้เรียนต้องอธิบาย transformation ไม่ใช้ AI-generated code ที่อธิบายไม่ได้

### Task 4: SQL และ reconciliation fixtures

**Files:** `labs/tracking/sql/schema.sql`, `seed.sql`, `exercises.sql`, `docs/mentor/sql-answers.sql`, `labs/qe-code/src/reconcile.ts`, `tests/reconcile.test.ts`, `docs/handbook/05-data-sql.md`

**Interfaces:** `reconcile(orders: OrderRecord[], events: PurchaseEvent[], window: {from: string; to: string}): ReconciliationReport`; window half-open `[from,to)`. Report counts `expected`, `observed`, `missing`, `duplicate`, `invalid`, `late`, `excluded`; IDs supporting each finding. Task 5 defines `PurchaseEvent` in shared `src/event-contract.ts`

- [ ] สร้าง tests/fixtures: 4 orders มี 3 eligible; 1 matching purchase, 1 missing, 1 duplicate, 1 excluded; expected=3, observed unique=2, missing=1, duplicate surplus=1, excluded=1
- [ ] เพิ่ม boundary timestamp, NULL SQL, multi-item join ที่ทำยอดซ้ำ และ currency/value mismatch; กำหนด invalid ไม่ให้ซ่อน missing valid purchase
- [ ] Implement report และ SQL lab แยกจาก WooCommerce schema; การอ่าน WooCommerce ระบุ HPOS compatibility และใช้ API หาก schema เปลี่ยน
- [ ] รัน `npm test -- reconcile`; execute SQL seeds/answers ใน lab database และเทียบกับ fixture expected results
- [ ] เขียนบท 5 เรื่อง keys/joins/NULL/transactions และการเทียบข้อมูลอย่างไม่แก้ commerce DB

### Task 5: Tracking collector, consent และ failure drills

**Files:** `labs/qe-code/src/event-contract.ts`, `src/collector.ts`, `src/server.ts`, `tests/collector.test.ts`, `tests/event-contract.test.ts`, `labs/tracking/fixtures/`, `docs/handbook/08-tracking.md`, `11-data-failure-drills.md`, `templates/tracking-plan.md`

**Interfaces:** `PurchaseEvent` includes `eventId`, `schemaVersion: 1`, `eventName: 'purchase'`, `transactionId`, `valueMinor`, `currency`, `items`, `occurredAt`, `receivedAt`, `consentState`, `source`; other event names have separate discriminated types. POST `/lab-events`: 202 accepted, 200 duplicate, 400 invalid, 403 consent denied; GET `/lab-api/health`: 200; server 3000. Persist accepted events in separate lab DB, unique `eventId`; duplicate purchase with new eventId remains visible to reconciliation

- [ ] เขียน contract tests สำหรับ malformed schema, denied/revoked consent, exact duplicate, different event IDs same transaction, PII/unexpected fields rejected, restart persistence
- [ ] เขียน client queue tests: revoke ก่อน retry ต้องลบ analytics queue และไม่ส่ง; collection outage ไม่เปลี่ยน order status
- [ ] Implement collector, local storefront tracking hook และ client consent controls ที่ไม่เก็บ nonessential events ก่อน opt-in; allowlist fields ไม่ log body ที่มี secrets
- [ ] รัน `npm test -- collector` และ integration persistence check กับ lab DB; verify tracking hook บน storefront จริง
- [ ] เขียน tracking plan ระบุ semantics, eligible denominator, reconciliation window และ seeded failures ตาม spec รวม delayed/out-of-order events

### Task 6: API/UI automation และ CI

**Files:** `labs/qe-code/playwright.config.ts`, `tests/api.test.ts`, `e2e/checkout.spec.ts`, `.github/workflows/qe-labs.yml`, `docs/handbook/06-automation.md`, `07-ci-ai-workflow.md`

**Interfaces:** API tests use service Task 5; UI tests use storefront Task 2; each run generates isolated synthetic order identifiers and sanitized artifacts

- [ ] เขียน failing tests สำหรับ checkout business outcome และ tracking purchase contract ไม่ assert เพียง button/HTTP 200; seeded missing purchase ต้องทำให้ test fail
- [ ] Implement API/UI test helpers ใช้ polling/web assertions ไม่ fixed sleeps; retry ต้องไม่สร้าง duplicate orders
- [ ] รัน `npm test`, `npm run typecheck`, `npm run test:e2e`; ผลผ่านต้องไม่มีการเรียก LINE จริง
- [ ] สร้าง workflow least-privilege permissions, pinned action revisions หลังตรวจ official docs, local commands เหมือน CI และ artifact redaction
- [ ] เขียนบท 6–7 พร้อม debugging flaky tests, Superpowers/Claude Skills provenance, human review และ manual fallback

### Task 7: LINE OA setup และ identity core

**Files:** `docs/handbook/09-line-oa.md`, `10-line-identity-journey.md`, `labs/line/oa-checklist.md`, `identity-map.md`, `journey-test-cases.md`, `templates/channel-inventory.md`

**Interfaces:** Consumes public storefront Task 2; produces rich-menu URLs with UTM and nonsecret ID inventory; API activation only after Provider checklist complete

- [ ] สร้าง manual acceptance cases: create OA, add friend, greeting/auto-response/human chat/rich menu, quota check, LINE-browser journey, redirect UTM, different-browser session
- [ ] ตรวจ LINE/ngrok docs ปัจจุบันก่อนเขียน OA Manager steps; ระบุ irreversible Provider binding ก่อน activation
- [ ] เขียน screenshot guidance ที่ปิด token/user identifiers และ identity map แยก OA/Provider/Channel/customer IDs
- [ ] เพิ่ม ngrok one-domain routing steps และ caveat HTML interstitial; ห้าม expose admin endpoint หรือ DB
- [ ] รัน manual journey หากมี authorized account; ถ้าไม่มีให้ส่ง checklist ที่ยังไม่ checked และระบุว่ายังไม่ได้ verify OA จริง

### Task 8: LINE API/Login extensions

**Files:** `labs/qe-code/src/line/signature.ts`, `webhook.ts`, `notification.ts`, `login.ts`, `tests/line.test.ts`, `tests/login.test.ts`, `labs/line/.env.example`, `docs/handbook/extensions/line-api.md`, `line-login.md`

**Interfaces:** `verifyLineSignature(rawBody: Buffer, signature: string, secret: string): boolean`; POST `/line/webhook` accepts verified empty events and deduplicates webhookEventId. `/auth/line/start` and `/auth/line/callback` use server-side session/state and vetted OIDC client; order notification consumes verified customer-to-LINE account link only

- [ ] เขียน failing tests: modified raw body, invalid signature, empty verification events, redelivery, spoofed order ownership, reply-token retry failure และ notification failure ไม่สร้าง order ใหม่
- [ ] Implement webhook/reply ด้วย official API client ตาม docs ปัจจุบัน; API access mocked ใน CI; test real call เฉพาะ manual extension
- [ ] เขียน Login tests สำหรับ state mismatch, cancel, expired/invalid token, nonce/issuer/audience ตาม flow, account mismatch และ login ไม่เท่ากับ friend/consent
- [ ] Implement Login extension และ account linking ตาม official flow ไม่เชื่อมด้วย client-supplied UID/email
- [ ] รัน `npm test -- line` และ `npm test -- login`; เขียน setup/rotation/troubleshooting พร้อม manual steps ที่ไม่อ้างผล live หากไม่ได้ทดลอง

### Task 9: Reliability และ recovery

**Files:** `labs/commerce/compose.ha.yaml`, `nginx-ha.conf`, `tests/failover.sh`, `tests/restore.sh`, `docs/handbook/12-reliability.md`, `templates/recovery-report.md`

**Interfaces:** Task 2 backup/restore scripts ใช้ isolated restore volume/database ห้ามเขียนทับ default store โดยอัตโนมัติ; two app instances share uploads; health checks identify instance without exposing sensitive metadata

- [ ] เขียน acceptance tests สำหรับ stop app A, healthy app B serving, shared uploaded asset, DB outage ทำ checkout fail อย่างชัดเจน, restore isolated backup พร้อม order count/value เท่า snapshot
- [ ] Implement failover config และ backup consistency สำหรับ DB/uploads; record manifest/time และป้องกัน restore backup ผิดชุด
- [ ] รัน failover/restore tests; วัด outage/error rate และ reconcile before/after ตาม Task 4 ไม่ใช้ restart success แทน recovery evidence
- [ ] เขียนบท 12 ระบุ RTO/RPO ที่ mentor ตั้งก่อน drill, single-host/SPOF limits และ fallback tabletop หากเครื่องรันสอง app ไม่ไหว
- [ ] Review checkpoint: บันทึกสิ่งที่ยังล้มได้ database/proxy/host/tunnel ไม่กล่าวว่า HA สมบูรณ์

### Task 10: Governance, capstone และ GA4 extension

**Files:** `docs/handbook/13-governance-security.md`, `14-capstone.md`, `extensions/ga4.md`, `templates/risk-register.md`, `data-inventory.md`, `release-review.md`, `adr.md`, `docs/mentor/capstone-guide.md`

**Interfaces:** Safety checklist Task 1; consumes Task 4 report and Task 9 recovery evidence; ไม่มีเกณฑ์ให้คะแนน

- [ ] สร้าง mentor cases: secret leak, IDOR, missing purchase, consent exclusion, duplicated notification และ release ที่ต้อง no-go แม้ functional tests ผ่าน
- [ ] เขียน data/AI/product governance exercises พร้อม owner, mitigation, residual risk, evidence และ rollback; PDPA/GDPR อ้าง authoritative sources และ DPO review ไม่ให้คำรับรอง legal compliance
- [ ] เขียน capstone instructions ที่ผู้เรียนต้องแก้ seeded defects และ defend release decision โดยแยก core/extension score
- [ ] เขียน GA4 optional tracking mapping และ DebugView/collection/report delay checks จาก official docs; ไม่มี BigQuery หรือ paid plugin dependency
- [ ] Mentor walkthrough ให้หลักฐานทุกชิ้นมี path และทดสอบว่าคนไม่มี LINE API/Claude/GA4 ยังผ่าน core ได้

### Task 11: Whole-course verification และส่งมอบ

**Files:** `docs/mentor/verification-report.md`, `docs/mentor/reference-review.md`, README updates

**Interfaces:** รายงานแบ่ง verified runtime / manual account checks / unverified platforms; ไม่มี placeholder ที่ใช้แทน implementation

- [ ] ตรวจทุกบทครบรูปแบบ Task 1; ตรวจ internal links และ references ทางการ พร้อม access date
- [ ] รัน clean setup → compose health → checkout → SQL → collector → tests → failover → isolated restore ตามลำดับ บันทึก exact commands/results และ environment
- [ ] ตรวจ tree/fixtures/artifacts ไม่มี credentials หรือ customer data; destructive commands มี safety prompts และ cleanup instructions
- [ ] Review spec coverage โดย map แต่ละ requirement กับไฟล์/test; แก้เฉพาะข้อผิดพลาดใน scope และรายงานข้อจำกัดที่ยัง verify ไม่ได้
- [ ] ส่ง README เป็น entry point พร้อม verification summary; ไม่ประกาศว่ารัน OA/Login/GA4 จริงหากไม่มี evidence

## Self-review และ execution handoff

ครอบคลุม spec ทั้ง learning sequence, core/extension, consent/tracking, identity, free route, HA caveats, safety checks และ references งานเอกสารใช้ acceptance walkthrough; implementation code ใช้ failing test → minimal implementation → verification แยกจาก account-dependent checks

Tasks 4–5 แชร์ event contract: executor สร้าง type contract ก่อน Task 4 tests แล้ว implement collector ใน Task 5 โดยไม่เปลี่ยนชื่อ fields ภายหลัง งานนี้แนะนำ Native execution เพราะ interfaces ต่อเนื่องและ repo ยังไม่มีระบบเดิม ลด coordination/context overhead; หากไม่มี independent reviewer tool ต้องระบุว่าใช้ self-review ไม่ปลอมผล independent review

ผู้ใช้ต้องรีวิวแผนและเลือก execution method ก่อนสร้าง handbook/code/config จริง แผนนี้ไม่อนุมัติ external account actions หรือการผูก Provider แทนผู้เรียน
