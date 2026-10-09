# Documentation review — 2026-10-09

## ขอบเขตและวิธีตรวจ

ตรวจ README, core 00–14, extensions ทั้งสาม, LINE/coding exercises, templates, mentor guides และเอกสารออกแบบ/แผนเดิม เทียบคำสั่งกับ scripts, tests, Compose, proxy routes และ package engines ใน repository ไม่เปลี่ยน runtime implementation

แนวทาง: คง lab ที่ใช้งานได้ → เติม expected/negative cases เฉพาะบท → checklist ลงมือทำและความเข้าใจ → ตรวจ dependency/cleanup → ตรวจ links/tests → ส่งกลับ repository ไม่เพิ่มคะแนนหรือเนื้อหาเหมาะกับใคร

## การแก้สำคัญ

- ทั้ง 18 บทมี lab และ self-check สองประเภท พร้อมผลที่ใช้เทียบ ไม่ติ๊กผ่านล่วงหน้า
- เพิ่ม [วิธีทำ lab](../handbook/learning-guide.md), evidence statuses, working-directory/sandbox/cleanup conventions และ public tunnel preflight
- แยก offline/design/implemented/live ของ LINE API/Login/GA4; core ไม่มี live integration เหล่านี้
- ระบุ Node engines, CI snapshot test, SQL starter/transaction connection และ consent-excluded ที่ไม่ใช่ defect
- ใช้ templates ตรวจ completeness ของ artifacts; mentor เป็นผู้ช่วย ไม่ใช่ผู้ให้คะแนน จุด account binding/public exposure/legal ยังคงให้ owner ตรวจ
- เก็บ ledger/verification/spec/plan เป็นประวัติพร้อมลิงก์วิธีเรียนปัจจุบัน ไม่เขียนทับผล runtime ในอดีต
- Independent documentation review พบสามจุดและแก้แล้ว: เปิด DB ก่อน SQL หลัง cleanup, หยุด restore project ตามชื่อจริง และเพิ่ม LINE service/proxy/secret wiring รวมข้อจำกัด Node session กับ WordPress session

## Verification รอบนี้

- `npm test`: 46 tests ผ่านใน 5 files
- `npm run typecheck`: ผ่าน
- `node --test ../commerce/tests/snapshot-integrity.test.mjs` จาก coding lab: 1 test ผ่าน
- ตรวจ Markdown 42 ไฟล์: ลิงก์ภายใน/anchors 156 จุดผ่าน, code fences สมดุล และทั้ง 18 บทมี lab/expected/self-check/cleanup; `git diff --check` ผ่าน
- ไม่ rerun Docker outage/HA/restore/E2E ในรอบแก้ prose; ผล runtime เดิมอยู่ [verification report](verification-report.md)
- ไม่เปิด OA/Provider/tunnel/Login/GA4 และไม่ถือว่า desktop/mock เป็น mobile/live evidence

## References ที่เปิดทบทวน

- [LINE signature](https://developers.line.biz/en/docs/messaging-api/verify-webhook-signature/) — raw bytes ก่อน process
- [LINE Login](https://developers.line.biz/en/docs/line-login/integrate-line-login/) — flow และ callback verification
- [ngrok free limits](https://ngrok.com/docs/pricing-limits/free-plan-limits/) — ตรวจข้อจำกัดบัญชีก่อน live lab ไม่ hardcode quota
- [Playwright practices](https://playwright.dev/docs/best-practices) — isolated tests และ assertions

References อื่นคง reading list เดิมตาม [reference review](reference-review.md); ไม่อ้างว่าตรวจข้อกฎหมายหรือทุก external URL ใหม่ในรอบนี้
