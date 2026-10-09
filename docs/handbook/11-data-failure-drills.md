# 11 — Tracking failure drills

## Prerequisites / mental model

ผ่าน tracking collector, SQL และ OA journey ข้อมูลขาด ซ้ำ ผิด และส่งช้าเป็นคนละ defect ต้องแยก expected exclusions ก่อนวัด completeness

## Lab

1. รัน `npm test -- reconcile` จาก `labs/qe-code`; อ่าน fixture 4 orders/3 events
2. ใส่ invalid value/currency ในสำเนา fixture ต้องเห็น invalid และ missing valid purchase ไม่ใช่ observed success
3. เปลี่ยน receivedAt ข้าม window จับ late; เปลี่ยน consent eligible=false ควร excluded ไม่ missing
4. จาก `labs/commerce` หยุด `docker compose stop qe-api` แล้ว checkout local: order ยังสำเร็จแต่ event ส่งไม่ถึง
5. เปิด `docker compose --profile tracking up -d qe-api` แล้ว retry ตาม consent; อย่าเปลี่ยน order ID เพื่อซ่อน duplicate
6. รีเฟรช thank-you page: exact event ID ควร duplicate ที่ collector ไม่เพิ่ม record; new event ID/transaction เดิมต้องถูก reconciliation จับ

## Exercise / expected

สร้างตาราง incident: business outcome, client/network outcome, persistence, reporting และ mitigation ตรวจ UTM/session/cancel login ด้วย manual mobile journey API request success ไม่แปลว่า notification delivered/read หรือ GA4 reported

## Troubleshooting / cleanup

เริ่มด้วย timestamp UTC และ window เดียวกัน ไม่ลบ events เพื่อให้ยอดตรง เปิด service กลับและบันทึก pending/retry ที่ยังไม่ recover ห้าม bypass denied consent เพื่อทำ completeness ให้สูงขึ้น

## หลักฐานและ References

เก็บ case reports สำหรับ missing/duplicate/invalid/late/excluded พร้อม expected/actual และ business impact; excluded ตาม consent เป็น expected behavior ไม่ใช่ defect โดยอัตโนมัติ

- [GA4 ecommerce](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [LINE webhook handling](https://developers.line.biz/en/docs/messaging-api/receiving-messages/)

## Lab: แยก defect ออกจาก expected behavior

ทำหลัง lab หลัก; เปลี่ยนทีละตัวแปรใน sandbox และบันทึกผลก่อนคืนค่า

| ทดลอง | ผลที่ใช้ตรวจตัวเอง |
|---|---|
| ใช้ baseline reconcile test ใน sandbox | expected 3 / observed 2 / missing order-b / duplicate c2 / excluded order-d |
| เปลี่ยน amount หรือ items ของ order-a event | invalid และ missing valid purchase ของ order-a ไม่ใช่ observed success |
| ตั้ง receivedAt เท่ากับ window.to | late; implementation นี้ยังนับ observed ถ้า contract ตรง |
| ทดลอง deny consent ใน browser แล้ว checkout | order สำเร็จได้โดยไม่มี purchase; ไม่แจ้งเป็น missing defect |
| หยุด collector และรีเฟรช thank-you หลังเปิดกลับ โดยยัง granted | ตรวจ DB/Network ว่า recovery เกิดจริง; ห้ามถือว่า up service แล้ว queue ส่งเอง |

## Checklist — ลงมือทำครบหรือยัง

- [ ] แต่ละ drill ระบุ baseline, เปลี่ยนอะไร, expected, actual และ recovery
- [ ] แยก missing/duplicate/invalid/late/excluded โดยไม่ใช้จำนวน event รวมอย่างเดียว
- [ ] เก็บ defect report เฉพาะความผิด; excluded เก็บเป็น behavior evidence
- [ ] เปิด qe-api กลับและยืนยัน health หลังจบ

## Checklist — อธิบายด้วยตัวเองได้ไหม

- [ ] อธิบายได้ว่า late กับ observed ซ้อนกันได้ใน lab นี้
- [ ] บอกเหตุผลที่ HTTP retry ไม่ควรสร้าง order ใหม่
- [ ] อธิบายช่องว่างระหว่าง browser event, store record และ report

ติ๊กเมื่อมีหลักฐานหรืออธิบายพร้อมตัวอย่างได้; ข้อที่ติดให้บันทึกสาเหตุ/สิ่งที่จะลองต่อ ไม่ต้องคิดคะแนน ดู [วิธีตรวจตัวเอง](learning-guide.md) และ [แบบบันทึกผล](../../templates/learning-evidence.md)

---

[สารบัญหลักสูตร](../../README.md) · [วิธีทำ lab และตรวจตัวเอง](learning-guide.md)
