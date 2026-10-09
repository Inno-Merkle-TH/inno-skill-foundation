# 14 — Capstone: connected commerce release review

## Prerequisites / เป้าหมาย

ผ่าน core weekly checkpoints Mentor เตรียม seeded defects เป้าหมายไม่ใช่ demo สวย แต่พิสูจน์ว่า QE ตรวจระบบและตัดสินใจ release ตามความเสี่ยงได้

## Scenario

ร้านจำลองเปิดสินค้าใหม่ผ่าน LINE OA rich menu ลูกค้าเข้าเว็บ checkout offline แล้วข้อมูล purchase ต้องตรงกับ order ที่ eligible ระบบมี app สอง instances แต่ยังมี database/shared-storage/proxy/host SPOFs ทีมต้องรู้ว่าเมื่อส่วนใดล้มจะกระทบลูกค้าและ reports อย่างไร

## ขั้นตอน

1. เตรียม scope/acceptance/architecture/data flow และ test plan ใน PR sandbox
2. ทำ manual LINE journey บนมือถือจริง หากไม่มีบัญชีระบุไม่ verified ไม่ใช้ desktop แทน
3. รัน TypeScript/API/UI tests และ SQL/reconciliation fixtures
4. Mentor เลือก defects อย่างน้อย 3 จาก missing purchase, duplicate retry, invalid money/currency, redirect UTM loss, consent exclusion, collector outage, app/DB outage
5. ผู้เรียน reproduce และจัดหมวด defect/expected behavior พร้อม root cause และ risk owner
6. ทำ failover + isolated restore ตรวจ counts/value/assets และ unverified limits
7. ส่ง release review พร้อม no-go หรือ go-with-accepted-risks และ rollback ไม่ต้องพยายามให้ทุกสถานการณ์เป็น go

## Deliverables

PR/code, tests/outputs, tracking plan, data inventory, risk register, recovery report, release decision และ AI assistance disclosure ตรวจความถูกต้องของผลและ [safety checklist](../mentor/safety-checklist.md) LINE API/Login/GA4 เป็น optional extension

## Troubleshooting / cleanup

หากข้อมูลไม่ตรง ห้ามลบ events/orders เพื่อทำรายงานสวย เก็บ fixture/queries แล้วแก้ที่ root cause ปิด public tunnel/restore services หลังจบและเก็บเฉพาะ evidence ที่ไม่มี secrets

## เกณฑ์ผ่าน / references

ผู้เรียนตอบได้ “อะไรอาจพัง, เราจะรู้ได้อย่างไร, ใครรับความเสี่ยง, กู้ข้อมูลอย่างไร” และสาธิต seeded defect ด้วย test ที่ fail ก่อน fix

- [Safety checklist](../mentor/safety-checklist.md)
- [Release review](../../templates/release-review.md)
- [OWASP testing](https://owasp.org/www-project-web-security-testing-guide/)
