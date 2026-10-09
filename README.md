# QA → QE Foundation

คู่มือภาษาไทยสำหรับ Manual QA ที่ต้องการเขียนโค้ดและตรวจความเสี่ยงด้าน tracking/data quality ผ่านร้านค้า WordPress/WooCommerce + LINE OA เดียว

## เริ่มต้น

1. อ่าน [เตรียมเครื่อง](docs/handbook/00-setup.md)
2. ทำ [HTTP และ Git/GitHub](docs/handbook/01-http-git.md)
3. ทำ [TypeScript](docs/handbook/02-typescript.md)
4. ทำ [Git flow](docs/handbook/03-git-flow.md)
5. ส่งหลักฐานตาม [แบบฟอร์ม](templates/learning-evidence.md) ให้ mentor ตรวจ

ร้านค้า: [Docker/3-tier](docs/handbook/04-docker-architecture.md) → [SQL](docs/handbook/05-data-sql.md) → [Automation](docs/handbook/06-automation.md) → [CI/AI workflow](docs/handbook/07-ci-ai-workflow.md) → [Tracking](docs/handbook/08-tracking.md)

ประสบการณ์ LINE: [สร้าง OA](docs/handbook/09-line-oa.md) → [Identity/journey](docs/handbook/10-line-identity-journey.md) → [Failure drills](docs/handbook/11-data-failure-drills.md)

ความพร้อม release: [Reliability](docs/handbook/12-reliability.md) → [Governance/security](docs/handbook/13-governance-security.md) → [Capstone](docs/handbook/14-capstone.md)

Extensions: [LINE API](docs/handbook/extensions/line-api.md) · [LINE Login](docs/handbook/extensions/line-login.md) · [GA4](docs/handbook/extensions/ga4.md)

ใช้เวลาเป้าหมาย 14 สัปดาห์ สัปดาห์ละ 6–8 ชั่วโมง: concept 1 ชั่วโมง, guided lab 2 ชั่วโมง, exercise 2–3 ชั่วโมง, review 1 ชั่วโมง ไม่ต้องรีบขึ้นระดับถ้ายังอธิบายงานเองไม่ได้

## Learning map

| สัปดาห์ | หัวข้อ | สถานะเนื้อหา |
|---|---|---|
| 1 | Terminal, HTTP, Git/GitHub | คู่มือพร้อม |
| 2 | TypeScript และ validation | คู่มือและ coding lab พร้อม |
| 3 | Git flow, release, hotfix, conflict, revert | คู่มือพร้อม; PR จริงต้องมี sandbox repository |
| 4 | Docker, commerce, 3-tier | คู่มือและ local lab |
| 5 | Data, SQL, reconciliation | คู่มือและ synthetic fixtures/tests |
| 6–7 | API/UI tests, CI, Claude Skills/Superpowers | คู่มือ/tests/workflow; AI live ตามสิทธิ์ |
| 8 | Tracking contract, consent, collection | purchase collector และ instrumentation demo |
| 9–10 | สร้าง LINE OA และ connected journey | guided manual lab; ผู้เรียนสร้างบัญชีเอง |
| 11 | Data failure drills; LINE API/Login extension | core drills; API/Login guided exercises |
| 12 | Failover และ backup/restore | scripts และ recovery checklist |
| 13 | Security, Data/AI/Product Governance, PDPA/GDPR | exercises/templates; ต้อง DPO review |
| 14 | Capstone; GA4 extension | assessment และ optional GA4 exercise |

คู่มือแยก reference implementation จากโจทย์ให้ผู้เรียนพัฒนาต่อ LINE live bot/Login/GA4 ไม่ใช่ระบบที่เปิดใช้งานสำเร็จแล้ว ดู [execution ledger](docs/mentor/progress.md) และ [verification](docs/mentor/verification-report.md) สำหรับผลที่ทดลองจริง

## Guardrails

- ใช้ synthetic data และ offline checkout เท่านั้น ไม่ใช้ข้อมูล/บัญชีลูกค้าจริง
- LINE API, LINE Login และ GA4 เป็น extension; tracking/data quality เป็น core
- ไม่ต้องซื้อ plugin, domain หรือบริการ AI เพื่อผ่าน core
- Docker Desktop มีเงื่อนไข license องค์กร; LINE/ngrok มีโควตา; Claude ต้องใช้สิทธิ์ที่อนุมัติ
- ไม่เปิด database/admin ผ่าน tunnel และไม่ commit credentials
- App สอง instance บนเครื่องเดียวเป็น HA simulation ไม่ใช่ production HA

Mentor: [rubric](docs/mentor/rubric.md), [acceptance checklist](docs/mentor/acceptance.md)

Design: [spec](docs/superpowers/specs/2026-10-09-qe-foundation-design.md) · [implementation plan](docs/superpowers/plans/2026-10-09-qe-foundation.md)
