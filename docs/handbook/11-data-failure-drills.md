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

## เกณฑ์ผ่าน / references

ส่ง defect reports สำหรับ missing/duplicate/invalid/late/excluded พร้อม root cause และ business impact อย่างน้อยอย่างละหนึ่งกรณี

- [GA4 ecommerce](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [LINE webhook handling](https://developers.line.biz/en/docs/messaging-api/receiving-messages/)
