# Extension — GA4 ecommerce

## Prerequisites / mental model

ผ่าน core tracking มี property ทดลองที่ทีมอนุญาต GA4 เป็น consumer อีกระบบ ไม่ใช่ source of truth ของ orders เปลี่ยน `valueMinor` เป็น currency decimal ตาม GA4 contract ไม่ส่ง custom lab schema ตรง ๆ โดยไม่มี mapping

## Lab A: event mapping แบบ offline — ไม่ต้องมี property

1. ใช้ synthetic purchase มูลค่า `19900` สตางค์ THB และสินค้าหนึ่งชิ้นจากบท 08
2. เติม [tracking plan](../../../templates/tracking-plan.md): source field → GA4 field → transform → consent → expected
3. เขียน expected payload: `transactionId → transaction_id`, `valueMinor → value` เป็น `199`, `itemId → item_id`, quantity/currency ตรง source; mapper ต้องกำหนด event-level value/item price ให้สอดคล้องกัน
4. ทำ fixture เพิ่ม denied consent, retry transaction เดิม, currency ผิด และ email หลุด; ระบุว่าไม่ควรส่งอะไรและ test ใดจับได้
5. หากเขียน mapper ใน sandbox ให้ test empty/invalid/items/money และ consent gate โดยไม่เรียก Google จริง

Expected: mapping + payload สังเคราะห์ + expected negative cases; lab นี้ใช้ THB อย่าสมมติทุก currency มีสอง decimal places และอย่านับ mapping review เป็น live collection

## Lab B: live test property — optional

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

## หลักฐานและ References

ส่ง mapping และ evidence ที่ไม่ใส่ PII พร้อม reconciliation caveats ไม่มี GA4 account ให้ทำ mapping exercise ไม่ถือว่า live verified

- [GA4 ecommerce](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [GA4 DebugView](https://support.google.com/analytics/answer/7201382)

## Checklist — ลงมือทำครบหรือยัง

- [ ] mapping ระบุ value units/items/transaction ID และ consent ชัดเจน
- [ ] offline cases ครอบคลุม wrong value, duplicate และ PII
- [ ] ถ้าทำ live ใช้ test property และตรวจ network + DebugView
- [ ] บันทึก timezone/window/processing delay เมื่อเทียบ orders กับ reports
- [ ] ปิด debug และไม่แนบ PII หรือระบุว่ายังไม่มี live evidence

## Checklist — อธิบายด้วยตัวเองได้ไหม

- [ ] อธิบายเหตุที่ order count ไม่จำเป็นเท่ากับ GA4 purchases
- [ ] แยก deliberate exclusion, delivery failure และ report delay
- [ ] อธิบายว่ารับ event ที่ collector ไม่ได้แปลว่า GA4 รับหรือรายงานแล้ว

ติ๊กเฉพาะสิ่งที่ทำจริง แยก offline/design/implemented/live ใน [learning evidence](../../../templates/learning-evidence.md); ไม่มีบัญชีให้เก็บ offline lab และระบุ live ยังไม่ทำ

## Cleanup ของ offline lab

เก็บ fixture/tests ใน sandbox ไม่มีบัญชีหรือ services ให้ลบ หากทดลอง live ให้ทำ cleanup ด้านบนและตรวจว่า credentials ไม่อยู่ใน staged diff

---

[สารบัญ](../../../README.md) · [วิธีตรวจตัวเอง](../learning-guide.md)
