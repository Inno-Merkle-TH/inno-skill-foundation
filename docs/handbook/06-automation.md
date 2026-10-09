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

ปิด collector แล้ว checkout ต้องยังสร้าง order ได้แต่ tracking test fail นี่คือ seeded defect ที่ทำให้เห็น business success แต่ analytics loss ใช้ DevTools แยก network error กับ store failure เพิ่ม deny-consent UI test ที่ต้องไม่มี purchase request และไม่ถือว่า order failure

เพิ่ม negative cases ระดับ API ก่อนเพิ่ม UI: malformed JSON, invalid price, repeated event ID แล้วเพิ่ม business-level assertions ห้าม assert mock call count แทน persisted outcome

## Troubleshooting / cleanup

Browser missing: install Chromium ในบัญชีผู้เรียน Timeout: ตรวจร้านค้า/selector/network ไม่แก้ด้วยเพิ่ม sleep หรือ retry แบบไม่หาสาเหตุ flaky test ต้องบันทึก reproduction/isolation; trace off เป็น default เพราะ checkout อาจมี session/order keys แก้ข้อมูลก่อนเปิด debug artifacts

Cleanup: tests สร้าง synthetic orders ไว้ใน lab volume เก็บไว้สำหรับ SQL review ไม่ใช้ automated delete ทุก orders

## เกณฑ์ผ่าน

ผู้เรียนสาธิต pass กับ intentional fail ได้และอธิบาย assertion ที่จับ purchase หาย ส่ง commands/outputs ไม่ใส่ screenshots ที่มี secrets

## References

- [Playwright assertions](https://playwright.dev/docs/test-assertions)
- [Playwright best practices](https://playwright.dev/docs/best-practices)
