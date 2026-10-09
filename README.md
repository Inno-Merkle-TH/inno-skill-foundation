# QA → QE Foundation

เรียนรู้ coding, automation, tracking/data quality และ system reliability ผ่าน WordPress/WooCommerce + LINE OA

**LINE OA → ร้านค้า → cart/checkout → order → tracking → reconciliation → release review**

## เริ่มต้น

1. อ่าน [วิธีทำ lab และตรวจตัวเอง](docs/handbook/learning-guide.md) แล้ว [เตรียมเครื่อง](docs/handbook/00-setup.md)
2. ทำ [HTTP และ Git/GitHub](docs/handbook/01-http-git.md)
3. ทำ [TypeScript](docs/handbook/02-typescript.md)
4. ทำ [Git flow](docs/handbook/03-git-flow.md)
5. ตรวจ checklist ท้ายบทและเก็บ [learning evidence](templates/learning-evidence.md); ขอ mentor ช่วยเฉพาะข้อที่ติดหรือจุดที่ต้อง owner review

ทุกบทมี **lab → expected result → failure case → checklist ลงมือทำ → checklist ความเข้าใจ → cleanup** เรียนตามลำดับและปรับเวลาได้ ไม่ต้องคิดคะแนน ติ๊กเฉพาะที่มีหลักฐานหรืออธิบายด้วยตัวเองได้ งาน optional แยก offline/design ออกจาก live verification

## Learning map — คลิกเข้าบทเรียนได้เลย

| สัปดาห์ | บทเรียน | งาน/หลักฐานที่ควรส่ง |
|---|---|---|
| เตรียมตัว | [00 — Setup](docs/handbook/00-setup.md) | เครื่องมือพร้อมและบันทึกข้อจำกัด |
| 1 | [01 — HTTP, Terminal, Git/GitHub](docs/handbook/01-http-git.md) | request/response evidence และ PR แรก |
| 2 | [02 — TypeScript](docs/handbook/02-typescript.md) | valid/invalid tests และ RED → GREEN |
| 3 | [03 — Git flow](docs/handbook/03-git-flow.md) | release/hotfix/conflict/revert rehearsal |
| 4 | [04 — Docker, commerce, 3-tier](docs/handbook/04-docker-architecture.md) | เปิดร้านค้า, data flow และ persistence |
| 5 | [05 — Data/SQL](docs/handbook/05-data-sql.md) | queries และ reconciliation ที่ทราบคำตอบ |
| 6 | [06 — API/UI automation](docs/handbook/06-automation.md) | tests ตรวจ checkout และ purchase contract |
| 7 | [07 — CI, Claude Skills/Superpowers](docs/handbook/07-ci-ai-workflow.md) | CI evidence และ human review ของงาน AI |
| 8 | [08 — Tracking](docs/handbook/08-tracking.md) | tracking plan, consent และ collector checks |
| 9 | [09 — สร้าง LINE OA](docs/handbook/09-line-oa.md) | ตั้ง features เองและทดลอง rich menu |
| 10 | [10 — Identity และ connected journey](docs/handbook/10-line-identity-journey.md) | Provider/Channel/ID map และ mobile journey |
| 11 | [11 — Data failure drills](docs/handbook/11-data-failure-drills.md) | missing/duplicate/invalid/late/excluded reports |
| 12 | [12 — Reliability/recovery](docs/handbook/12-reliability.md) | failover, isolated restore และ RTO/RPO evidence |
| 13 | [13 — Security/governance/PDPA/GDPR](docs/handbook/13-governance-security.md) | inventory, risk owners และ DPO review items |
| 14 | [14 — Capstone](docs/handbook/14-capstone.md) | go/no-go พร้อม evidence และ rollback |

### Optional extensions

| เรียนต่อเมื่อ | เอกสาร | ขอบเขต |
|---|---|---|
| OA/Provider ผ่าน checkpoint | [LINE Messaging API](docs/handbook/extensions/line-api.md) | guided bot exercise + signature helper; ไม่ใช่ live bot ที่เปิดแล้ว |
| เข้าใจ web identity และ OAuth/OIDC | [LINE Login](docs/handbook/extensions/line-login.md) | guided integration/ownership/security tests |
| ตรวจ tracking ด้วย core lab ได้แล้ว | [GA4](docs/handbook/extensions/ga4.md) | event mapping และการตรวจบน test property |

คู่มือแยก reference implementation จากโจทย์ให้ผู้เรียนพัฒนาต่อ LINE live bot/Login/GA4 ไม่ใช่ระบบที่เปิดใช้งานสำเร็จแล้ว ดู [execution ledger](docs/mentor/progress.md) และ [verification](docs/mentor/verification-report.md) สำหรับผลที่ทดลองจริง

## Quick start — ใช้หลังอ่าน prerequisites

คำสั่งด้านล่างใช้ **Bash/WSL/Git Bash** และเริ่มจาก root ของ repo ทุก block ใช้ terminal ที่อยู่ root ใหม่ ต้องมี Node.js >=22.22.3 <23 ตาม [setup](docs/handbook/00-setup.md); coding tests ไม่ต้องเปิด Docker

**1. Coding/API tests**

```bash
cd labs/qe-code
npm ci
npm test
npm run typecheck
```

**2. ร้านค้า local** — ต้องมี Docker engine พร้อมและ port 8080/8081 ว่าง

```bash
cd labs/commerce
bash scripts/init-env.sh
docker compose config --quiet
bash scripts/setup.sh
bash tests/smoke.sh
```

เปิดร้านที่ `http://localhost:8080` และ admin ที่ `http://localhost:8081/wp-login.php` ใช้ credentials ตาม [บท Docker](docs/handbook/04-docker-architecture.md) ห้ามแนบ `.env` เป็นหลักฐาน

**3. Tracking + browser checkout** — ทำหลัง setup ร้านค้า

```bash
cd labs/commerce
docker compose --profile tracking up -d --build
curl --fail http://localhost:8080/lab-api/health
```

ถ้า collector ยังไม่พร้อมให้ตรวจ logs ตาม [บท tracking](docs/handbook/08-tracking.md) ก่อนรัน block ถัดไป จาก terminal ที่ root:

```bash
cd labs/qe-code
npm ci
npx playwright install chromium
npm run test:e2e
```

E2E สร้าง synthetic orders จริงใน lab volume อย่ารัน smoke/failover/restore ที่ restart services พร้อมกับ E2E สำหรับ cleanup อ่านบทของ lab; `docker compose down` เก็บ volumes แต่ `down -v` ลบข้อมูล

## Best Practices สำหรับ QA → QE

### 1. เรียนให้พิสูจน์ได้ ไม่ใช่แค่ทำตามได้

- ทุกบทส่ง **expected → observed → evidence → risk → next action** ผ่าน [learning evidence](templates/learning-evidence.md)
- ทำ happy path และ negative/failure case อย่างน้อยหนึ่งกรณี แล้วตรวจ checklist พร้อมหลักฐาน
- บอกให้ชัดว่าอะไรตรวจจริง อะไร mock อะไรยังไม่ตรวจ อย่าแทน mobile LINE test ด้วย desktop screenshot
- ใช้ reference implementation เป็นตัวอย่าง แล้วทำโจทย์ใน sandbox ของตน ลองเปลี่ยน fixture และทำนายผลเพื่อพิสูจน์ความเข้าใจ; ให้ mentor ช่วย review เมื่อจำเป็น

### 2. Git/PR: ทำงานเล็กและ review ได้

- หนึ่ง PR มีจุดประสงค์ชัดเจน แนบ requirement, tests, risks และ rollback; อ่าน staged diff ก่อน commit ไม่ใช้ `git add .` แบบไม่ตรวจ
- ใช้ [Git flow lab](docs/handbook/03-git-flow.md) ฝึก release/hotfix แต่เลือก workflow จริงตาม cadence และ policy ทีม ไม่ถือว่า Git flow เหมาะทุกโครงการ
- รอ review/required checks ตาม policy ก่อน merge; ไม่ force push shared history เพื่อซ่อน defect หรือ secret leak

อ่านเพิ่ม: [GitHub — Helping others review your changes](https://docs.github.com/en/pull-requests/concepts/helping-others-review-your-changes)

### 3. Automation: ตรวจผลผู้ใช้และผลธุรกิจ

- แยก unit/API/UI tests ตามหน้าที่ ใช้ synthetic fixtures และแยกข้อมูล/session ต่อ test
- UI ใช้ semantic locators และ web-first assertions เมื่อทำได้; ไม่พึ่ง CSS โครงสร้างหรือ fixed sleep เพื่อกลบ race condition
- Assert order/event state ไม่ใช่แค่ HTTP 200 หรือกดปุ่มได้; mock third-party ใน routine tests และแยก live integration checks
- แก้ flaky tests ที่ root cause อย่าเพิ่ม retries จนผลดูผ่าน เก็บหลักฐาน failure ก่อน fix

อ่านเพิ่ม: [Playwright — Best Practices](https://playwright.dev/docs/best-practices)

### 4. Tracking: วัด completeness อย่างไม่ข้าม consent

- เขียน [tracking plan](templates/tracking-plan.md) ก่อน instrumentation ระบุ event semantics, source of truth, owner และ version
- เทียบ transaction ID, value/currency และ items กับ commerce data ไม่เชื่อ collector response หรือ analytics dashboard เพียงอย่างเดียว
- แยก missing, duplicate, invalid, late และ consent-excluded; denominator ต้องตรงกับ orders ที่มีสิทธิ์เก็บตาม policy
- ใช้ UTC/window ที่ชัดเจนและ minor units ตาม lab contract; client retry ต้องไม่สร้าง order ซ้ำและต้องเคารพ revoke
- รู้ข้อจำกัด: instrumentation demo มี queue ใน memory ไม่รับประกัน delivery เมื่อปิดหน้า ดู [failure drills](docs/handbook/11-data-failure-drills.md)

### 5. LINE/security: ตรวจ trust boundary ก่อนเชื่อมข้อมูล

- ให้ mentor review owner/Provider ก่อนผูก OA และทบทวน [identity map](labs/line/identity-map.md); อย่า join UID ข้าม Provider โดยสมมติว่าเท่ากัน
- ตรวจ webhook signature จาก raw bytes ก่อน parse/process และตรวจ ownership ก่อนคืนรายละเอียด order
- Login, friend OA และ analytics consent เป็นคนละสถานะ เก็บ token/secret ฝั่ง server ไม่ส่ง LINE UID/email ลง analytics โดยตรง
- เปิด ngrok เฉพาะ endpoint ที่ผ่าน review แล้ว ไม่ expose admin/DB และปิด tunnel หลัง manual test

อ่านเพิ่ม: [LINE — Verify webhook signature](https://developers.line.biz/en/docs/messaging-api/verify-webhook-signature/)

### 6. Reliability/governance: test ผ่านไม่ได้แปลว่า release ได้

- ทดสอบ failover และ **restore จริง** พร้อม counts/value/assets; กำหนด RTO/RPO ก่อน drill และรายงานสิ่งที่ยังเป็น SPOF
- Core backup ไม่รวม eventdb/LINE/GA4 ต้องมี recovery policy แยก ไม่ประกาศ end-to-end HA จาก app สองตัว
- ใช้ [risk register](templates/risk-register.md) ระบุ owner/mitigation/residual risk และ [release review](templates/release-review.md) ตัดสิน go/no-go ด้วยหลักฐาน
- AI-generated code ต้องอธิบายและทดสอบได้ ตรวจแหล่ง skill/plugin ก่อนให้สิทธิ์; PDPA/GDPR applicability และ legal decisions ให้ DPO/legal ตรวจ

## เอกสารและ templates ที่แนะนำ

| งานที่กำลังทำ | ใช้เอกสารนี้ |
|---|---|
| ส่งงาน/บันทึกผล lab | [Learning evidence](templates/learning-evidence.md) |
| กำหนด event contract/consent/owner | [Tracking plan](templates/tracking-plan.md) |
| ระบุข้อมูล, lineage, access, retention | [Data inventory](templates/data-inventory.md) |
| สำรวจ OA/Provider/Channel โดยไม่เก็บ secrets | [Channel inventory](templates/channel-inventory.md) |
| ตัดสินใจ architecture พร้อม trade-offs | [ADR](templates/adr.md) |
| ประเมินความเสี่ยงและผู้รับผิดชอบ | [Risk register](templates/risk-register.md) |
| สรุป outage/restore/RTO/RPO | [Recovery report](templates/recovery-report.md) |
| ตัดสินใจก่อน release | [Release review](templates/release-review.md) |

**แบบฝึกและ checklists**

- [Coding exercises](labs/qe-code/exercises/README.md)
- [LINE OA setup checklist](labs/line/oa-checklist.md) · [Identity map](labs/line/identity-map.md) · [Journey test cases](labs/line/journey-test-cases.md)

**เอกสารตรวจทาน/เฉลย** — ลองเองก่อนเปิดเฉลย แล้วทดสอบซ้ำด้วย fixture ใหม่

- [Safety checklist](docs/mentor/safety-checklist.md) · [Acceptance checklist](docs/mentor/acceptance.md)
- [Code answer guide](docs/mentor/code-answer-guide.md) · [SQL answer guide](docs/mentor/sql-answers.sql) · [Capstone guide](docs/mentor/capstone-guide.md)
- [Documentation review](docs/mentor/documentation-review.md) · [Verification report](docs/mentor/verification-report.md) · [Reference review](docs/mentor/reference-review.md) · [Progress/decisions](docs/mentor/progress.md)

## Guardrails

- ใช้ synthetic data และ offline checkout เท่านั้น ไม่ใช้ข้อมูล/บัญชีลูกค้าจริง
- LINE API, LINE Login และ GA4 เป็น extension; tracking/data quality เป็น core
- ไม่ต้องซื้อ plugin, domain หรือบริการ AI เพื่อผ่าน core
- Docker Desktop มีเงื่อนไข license องค์กร; LINE/ngrok มีโควตา; Claude ต้องใช้สิทธิ์ที่อนุมัติ
- ไม่เปิด database/admin ผ่าน tunnel และไม่ commit credentials
- App สอง instance บนเครื่องเดียวเป็น HA simulation ไม่ใช่ production HA

## การออกแบบหลักสูตร

[Design spec](docs/superpowers/specs/2026-10-09-qe-foundation-design.md) · [Implementation plan](docs/superpowers/plans/2026-10-09-qe-foundation.md)

เอกสารทางการเพิ่มเติมอยู่ท้ายแต่ละบท ตรวจ versions, quota, permissions และหน้าจอของบริการอีกครั้งก่อนเปิด cohort ใหม่
