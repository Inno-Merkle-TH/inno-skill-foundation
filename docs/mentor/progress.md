# Native ledger — plan: docs/superpowers/plans/2026-10-09-qe-foundation.md

## Preflight rulings

- Ruling: ใช้ directory ปัจจุบันโดยไม่ init Git/worktree — ยังไม่มี repository และ plan ห้ามสร้างเอง — ต้นทุนหากผิดคือไม่มี Git recovery; เก็บ ledger และไม่ลบไฟล์ต้นฉบับ
- Ruling: Task 3 coding foundation ทำก่อน commerce runtime — บทเรียน TypeScript ต้องมี runnable tests และไม่พึ่ง Docker — ต้นทุนหากผิดคือเปลี่ยนลำดับงาน ไม่เปลี่ยน learning sequence
- Ruling: ยังไม่ทำ account actions — OA/Provider binding และ GitHub push ให้ผู้เรียนทำใน sandbox — ต้องมี manual verification ภายหลัง
- Ruling: ผู้ใช้อนุญาต push ไป Inno-Merkle-TH/inno-skill-foundation เมื่อพร้อม — ตรวจ remote ว่างและสิทธิ์ ADMIN แล้ว init main/remote ได้ — ต้นทุนหากผิดคือ commit history ต้องแก้ผ่าน review ไม่ force push
- Ruling: LINE API/Login ส่งเป็น optional guided development exercises พร้อม signature helper ไม่ใช่ live integrations — ผู้ใช้ระบุ “ถ้าทัน” และไม่อนุญาต binding/account actions — ต้นทุนหากผิดคือต้องเพิ่ม implementation สำหรับ cohort ที่ต้องใช้ bot/Login ทันที; ระบุ limitation ใน README/บทอย่างชัดเจน
- Ruling: เปลี่ยน host bind mounts เป็น Docker build contexts — Docker Desktop ปฏิเสธ Documents mount — ต้นทุนหากผิดคือ rebuild เมื่อแก้ config/code ไม่เปลี่ยน security settings ของเครื่อง
- Ruling: OrderRecord เพิ่ม required items — reviewer พบ missing product/quantity comparison — ต้นทุนหากผิดคือ fixtures/consumer ต้องส่ง items; contract/tests อัปเดตพร้อมกัน

## Shared-interface review

| Tasks | Interface | Verdict |
|---|---|---|
| 1/3 | Node setup → npm lab | Node 22.x, commands จาก labs/qe-code |
| 2/5/6/7/8 | proxy paths, local/public URLs | ยึด plan port/routes; ไม่เปิด admin/public DB |
| 3/4/5 | OrderRecord/PurchaseEvent | minor units/UTC/consent; contract สร้างก่อน reconciliation |
| 4/9/10 | reconciliation evidence | denominator eligible; outage ไม่เท่ากับ lost data โดยอัตโนมัติ |
| 1/10/11 | rubric/evidence | safety gates ไม่ชดเชยด้วยคะแนน |

## Progress

- Task 1: complete — setup/HTTP/Git/TypeScript/Git flow docs/templates; HTTP runtime และ Git rehearsal ผ่าน; GitHub PR live รอ cohort
- Task 2: core setup และ commerce smoke ผ่าน; latest WordPress/WooCommerce pin จาก official APIs; build contexts แทน bind mounts
- Task 3: complete — validator RED/GREEN, typecheck, npm ci/audit ผ่าน
- Task 4: complete — SQL fixtures/answers รันจริง, reconciliation tests รวม items mismatch ผ่าน
- Task 5: collector/API/schema ผ่าน tests; storefront purchase instrumentation และ persistent event DB มี runtime E2E evidence; client queue เป็น ephemeral demo ไม่ใช่ durable delivery
- Task 6: API/UI tests ผ่าน; CI workflow เพิ่มแล้ว ยังไม่ได้รันบน GitHub
- Task 7: complete documentation/manual checklists — OA/mobile/ngrok ต้องผู้เรียนทำเอง ไม่ mark live verified
- Task 8: optional guided exercises + tested signature helper; live webhook/Login deferred ตาม ruling
- Task 9: scripts/config เขียนแล้ว กำลัง verify failover/isolated restore
- Task 9: complete runtime verification — app failover/shared asset, DB outage และ isolated restore order count/value/options/asset ผ่าน; restore snapshot manifest ป้องกันการสลับชุด
- Task 10: complete handbook/templates/capstone/GA4 exercise — legal/live checks ยังต้อง mentor/DPO
- Task 11: final validation และ security review อยู่ระหว่างดำเนินการ
- Task 11: complete local verification — links/shell/Compose/unit/API/browser/SQL/backup/restore/credential scan ผ่าน; independent review สาม Important addressed ไม่มี Critical; GitHub CI รอ push

ผลล่าสุด: 46 unit/API/schema tests + 1 snapshot-integrity test + 1 browser checkout/purchase test ผ่าน; commerce smoke, SQL expected answers, Git rehearsal, collector restart persistence และ app failover/shared asset ผ่าน runtime บน macOS arm64

## Independent review

Native final reviewer พบสาม Important: item mismatch ไม่ถูกจับ, snapshot bundle integrity ไม่ตรวจ และ source array ถูก coercion ยอมรับ เพิ่ม RED tests แล้ว fix ตาม evidence มี scoped re-review ตามมา; ไม่มี Critical ในรอบแรก

Scoped re-review: ทั้งสาม ADDRESSED ไม่มี Important ใหม่ในขอบเขต fix; reviewer ไม่ได้ rerun Docker runtime ผล runtime เป็น executor evidence ไม่อ้างว่า independent runtime verification

## Delivery

Implementation push main commit 870d8d2 สำเร็จ; GitHub Actions run 37917734578 success ไม่มี secret/generated artifacts ใน commit ส่วน LINE API/Login/GA4 และ live account checks ยังคงเป็น guided extensions/manual verification ตามข้อจำกัดที่ระบุ
