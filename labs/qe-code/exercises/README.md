# Beginner exercises

ทำงานในสำเนา sandbox ไม่แก้ reference tests ให้ยอมรับ input ผิด

1. สร้าง summarizeOrders ตามบท 02: empty/two-order tests ก่อน function
2. เขียน policy currency ผสมก่อนเขียนโค้ด ขอ review ถ้าไม่แน่ใจ
3. ทำ async loadOrders โดย inject readText ที่คืน Promise<string>
4. เก็บ failing assertion → passing assertion และ PR evidence

Reference validator ไม่รับ PII/unknown fields และรับ timestamp UTC canonical แบบ `YYYY-MM-DDTHH:mm:ss.sssZ` เท่านั้น เป็น contract ของ lab ไม่ใช่ข้ออ้างว่า API ทั่วไปต้องใช้รูปแบบนี้ทั้งหมด

## Lab และ self-check

ทำตาม [บท 02](../../../docs/handbook/02-typescript.md) จาก sandbox coding lab ใช้ `npm test` และ `npm run typecheck` หลังแต่ละการเปลี่ยนแปลง

- [ ] empty array คืน count 0/totalMinor 0
- [ ] ยอด 19900 และ 5000 คืน count 2/totalMinor 24900
- [ ] invalid/mixed currency/unsafe total ทำตาม policy ไม่ silently coerce
- [ ] malformed JSON/read failure reject ไม่กลายเป็น empty success
- [ ] เปลี่ยน logic ให้ผิดแล้ว assertion จับได้ ก่อนคืนโค้ดให้ผ่าน
- [ ] อธิบาย unknown/guard/Promise และเก็บ RED/GREEN โดยไม่มี secrets

หลังลองเองอ่าน [แนวทางตรวจคำตอบ](../../../docs/mentor/code-answer-guide.md) แล้วเปลี่ยน fixture ใหม่เพื่อทดสอบความเข้าใจ Cleanup: ไม่มี DB ให้ลบ เก็บงานใน sandbox branch
