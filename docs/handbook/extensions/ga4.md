# Extension — GA4 ecommerce

## Prerequisites / mental model

ผ่าน core tracking มี property ทดลองที่ทีมอนุญาต GA4 เป็น consumer อีกระบบ ไม่ใช่ source of truth ของ orders เปลี่ยน `valueMinor` เป็น currency decimal ตาม GA4 contract ไม่ส่ง custom lab schema ตรง ๆ โดยไม่มี mapping

## Guided lab

1. สร้าง/ใช้ GA4 test property และ web data stream ตาม official setup เลือก ownership/retention/access กับ mentor
2. ทำ tracking plan mapping `view_item`, `add_to_cart`, `begin_checkout`, `purchase`; purchase มี transaction_id, value, currency และ items ตาม official schema
3. เพิ่ม instrumentation ผ่านวิธีที่ทีมอนุมัติ (gtag/GTM) โดยไม่ซื้อ paid WordPress plugin; ห้ามวาง API secret ใน client
4. ทำ consent controls ก่อนเก็บ nonessential data ไม่ใช้ server-side Measurement Protocol เพื่อข้าม consent
5. เปิด DebugView ตาม docs ตรวจ params แล้วเทียบ collector/commerce data; realtime/debug/processed report เป็นคนละขั้นและมี processing delay
6. ทดสอบ blocker, deny/revoke, redirect, refresh/duplicate, cross-browser sessions และ timezone/report window

## Expected / exercise

ได้ event ที่ semantic ถูกจาก eligible journey และบอกเหตุผลเมื่อ report ไม่เท่า orders ทั้งหมด แยก configuration defect, deliberate exclusion และ reporting delay ไม่ใช้ DebugView event หนึ่งรายการเป็นหลักฐาน production completeness

## Troubleshooting / cleanup

ไม่เห็น event: ตรวจ consent/network/schema/stream/debug mode ก่อนทำซ้ำ purchase ปิด debug และใช้ synthetic identifiers ไม่ส่ง email/LINE UID หรือ token ลบ test access ตาม policyเมื่อจบ ไม่ต้องต่อ BigQuery

## เกณฑ์ผ่าน / references

ส่ง mapping และ evidence ที่ไม่ใส่ PII พร้อม reconciliation caveats ไม่มี GA4 account ให้ทำ mapping exercise ไม่ถือว่า live verified

- [GA4 ecommerce](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [GA4 DebugView](https://support.google.com/analytics/answer/7201382)
