# 06 — API/UI automation ที่ตรวจผลธุรกิจ

## Prerequisites / mental model

ผ่านบท 05 และร้านค้าเปิดได้ Unit tests ตรวจ logic; API tests ตรวจ contract/error handling; UI tests ตรวจ journey จริง ใช้ tests หลายระดับ ไม่ใช้ UI ทุกกรณีหรือเชื่อจำนวน tests มากเท่ากับ coverage

## Lab

จาก `labs/commerce` เปิด `docker compose --profile tracking up -d --build` รอ qe-api พร้อม จาก root:

```bash
cd labs/qe-code
npm ci
npx playwright install chromium
npm test
npm run typecheck
npm run test:e2e
```

Expected: API tests รับ/ปฏิเสธ event ตาม schema และ outage ไม่คืน success UI checkout สร้าง synthetic order และ purchase value/currency ตรง order โดยไม่ใช้ email/token ใน event ค่าที่ collector รับไม่ใช่รายได้จริง

## Exercise

คำสั่งหยุด/คืน collector จาก `labs/commerce`: `docker compose stop qe-api` และ `docker compose --profile tracking up -d qe-api` ตามลำดับ ตรวจ `curl --fail http://localhost:8080/lab-api/health` ก่อน rerun ไม่รัน smoke/failover/restore พร้อม E2E

ปิด collector แล้ว checkout ต้องยังสร้าง order ได้แต่ tracking test fail นี่คือ seeded defect ที่ทำให้เห็น business success แต่ analytics loss ใช้ DevTools แยก network error กับ store failure เพิ่ม deny-consent UI test ที่ต้องไม่มี purchase request และไม่ถือว่า order failure

เพิ่ม negative cases ระดับ API ก่อนเพิ่ม UI: malformed JSON, invalid price, repeated event ID แล้วเพิ่ม business-level assertions ห้าม assert mock call count แทน persisted outcome

## Troubleshooting / cleanup

Browser missing: install Chromium ในบัญชีผู้เรียน Timeout: ตรวจร้านค้า/selector/network ไม่แก้ด้วยเพิ่ม sleep หรือ retry แบบไม่หาสาเหตุ flaky test ต้องบันทึก reproduction/isolation; trace off เป็น default เพราะ checkout อาจมี session/order keys แก้ข้อมูลก่อนเปิด debug artifacts

Cleanup: tests สร้าง synthetic orders ไว้ใน lab volume เก็บไว้สำหรับ SQL review ไม่ใช้ automated delete ทุก orders

## หลักฐานที่เก็บ

ผู้เรียนสาธิต pass กับ intentional fail ได้และอธิบาย assertion ที่จับ purchase หาย ส่ง commands/outputs ไม่ใส่ screenshots ที่มี secrets

## Lab: ตรวจว่า automation จับความเสียหายจริง

ทำหลัง lab หลัก; เปลี่ยนทีละตัวแปรใน sandbox และบันทึกผลก่อนคืนค่า

| ทดลอง | ผลที่ใช้ตรวจตัวเอง |
|---|---|
| เปิด core + tracking แล้วรัน unit/API/typecheck และ E2E | tests ผ่าน; บันทึก order/event จาก checkout ทดสอบ |
| หยุด qe-api แล้วรัน E2E อีกครั้งเพียงครั้งเดียว | purchase assertion ต้อง fail; ตรวจ admin ว่า order ยังเกิดหรือไม่ |
| เปิด qe-api กลับ ตรวจ health แล้ว rerun | E2E กลับมาผ่าน; เป็น order ใหม่ ไม่ใช่การ recover event เก่า |
| เพิ่ม deny-consent case ใน sandbox | checkout ได้และไม่มี purchase request; expected exclusion ไม่ใช่ test failure |

## Checklist — ลงมือทำครบหรือยัง

- [ ] อ่าน assertion ของ `e2e/checkout.spec.ts` และบอกขอบเขตที่ตรวจจริง
- [ ] เก็บ pass/failure/recovery โดยไม่รัน smoke/failover พร้อมกัน
- [ ] ใช้ isolated browser context/test data ไม่แชร์ session ข้าม tests
- [ ] ตรวจ artifacts ไม่มี order keys/session/token ก่อนแชร์

## Checklist — อธิบายด้วยตัวเองได้ไหม

- [ ] เลือก unit/API/UI ให้แต่ละ failure case พร้อมเหตุผล
- [ ] อธิบายได้ว่ารอด้วย assertion ดีกว่า fixed sleep อย่างไร
- [ ] แยก mocked API store tests ออกจาก persistence ใน eventdb จริงได้

ติ๊กเมื่อมีหลักฐานหรืออธิบายพร้อมตัวอย่างได้; ข้อที่ติดให้บันทึกสาเหตุ/สิ่งที่จะลองต่อ ไม่ต้องคิดคะแนน ดู [วิธีตรวจตัวเอง](learning-guide.md) และ [แบบบันทึกผล](../../templates/learning-evidence.md)

## References

- [Playwright assertions](https://playwright.dev/docs/test-assertions)
- [Playwright best practices](https://playwright.dev/docs/best-practices)

---

[สารบัญหลักสูตร](../../README.md) · [วิธีทำ lab และตรวจตัวเอง](learning-guide.md)
