# 14 — Capstone: connected commerce release review

## Prerequisites / เป้าหมาย

มีหลักฐาน core labs เลือก seeded defects เองหรือให้ mentor เตรียม เป้าหมายไม่ใช่ demo สวย แต่พิสูจน์ว่า QE ตรวจระบบและตัดสินใจ release ตามความเสี่ยงได้

## Scenario

ร้านจำลองเปิดสินค้าใหม่ผ่าน LINE OA rich menu ลูกค้าเข้าเว็บ checkout offline แล้วข้อมูล purchase ต้องตรงกับ order ที่ eligible ระบบมี app สอง instances แต่ยังมี database/shared-storage/proxy/host SPOFs ทีมต้องรู้ว่าเมื่อส่วนใดล้มจะกระทบลูกค้าและ reports อย่างไร

## Lab: connected release

1. เตรียม scope/acceptance/architecture/data flow และ test plan ใน PR sandbox
2. ทำ manual LINE journey บนมือถือจริง หากไม่มีบัญชีระบุไม่ verified ไม่ใช้ desktop แทน
3. รัน TypeScript/API/UI tests และ SQL/reconciliation fixtures
4. เลือก defects เองหรือให้ mentor เลือก อย่างน้อย 3 จาก missing purchase, duplicate retry, invalid money/currency, redirect UTM loss, consent exclusion, collector outage, app/DB outage
5. ผู้เรียน reproduce และจัดหมวด defect/expected behavior พร้อม root cause และ risk owner
6. ทำ failover + isolated restore ตรวจ counts/value/assets และ unverified limits
7. ส่ง release review พร้อม no-go หรือ go-with-accepted-risks และ rollback ไม่ต้องพยายามให้ทุกสถานการณ์เป็น go

## Deliverables

PR/code, tests/outputs, tracking plan, data inventory, risk register, recovery report, release decision และ AI assistance disclosure ตรวจความถูกต้องของผลและ [safety checklist](../mentor/safety-checklist.md) LINE API/Login/GA4 เป็น optional extension

## Troubleshooting / cleanup

หากข้อมูลไม่ตรง ห้ามลบ events/orders เพื่อทำรายงานสวย เก็บ fixture/queries แล้วแก้ที่ root cause ปิด public tunnel/restore services หลังจบและเก็บเฉพาะ evidence ที่ไม่มี secrets

## หลักฐานและ References

ผู้เรียนตอบได้ “อะไรอาจพัง, เราจะรู้ได้อย่างไร, ใครรับความเสี่ยง, กู้ข้อมูลอย่างไร” และสาธิต seeded defect ด้วย test ที่ fail ก่อน fix

- [Safety checklist](../mentor/safety-checklist.md)
- [Release review](../../templates/release-review.md)
- [OWASP testing](https://owasp.org/www-project-web-security-testing-guide/)

## Lab: ทำ release review ด้วยตัวเอง

ทำหลัง lab หลัก; เปลี่ยนทีละตัวแปรใน sandbox และบันทึกผลก่อนคืนค่า

| ทดลอง | ผลที่ใช้ตรวจตัวเอง |
|---|---|
| เลือก baseline commit และรัน happy path ก่อน inject failure | มี working baseline ที่เทียบผลได้ ไม่เริ่มด้วยระบบที่เสียอยู่แล้ว |
| เลือกสามสถานการณ์จากบท 11–13 ทีละกรณีใน sandbox | แต่ละกรณีมี expected/actual/root cause หรือข้อจำกัดที่ยังพิสูจน์ไม่ได้ |
| คืนระบบและ rerun checks หลังแก้ | เก็บก่อน/หลัง ไม่ลบ order/event ให้ผลดูตรง |
| เขียน release decision โดยอ้างอิง evidence paths | go/no-go พร้อม owner, residual risk, rollback trigger ไม่ใช้ความรู้สึก |

## Checklist — ลงมือทำครบหรือยัง

- [ ] เชื่อม requirement → risk → test → evidence → decision ได้
- [ ] มี coding/SQL/API/UI และ tracking evidence ของ commit เดียวกัน
- [ ] แยก mobile LINE จริง, local, mock และ optional ที่ยังไม่ทำ
- [ ] มี failover/isolated restore report และ remaining SPOFs
- [ ] ตรวจ secrets/consent/ownership และ cleanup ก่อนแชร์ PR

## Checklist — อธิบายด้วยตัวเองได้ไหม

- [ ] ตอบได้ว่า defect ใดทำให้รายได้ใน report ขาดทั้งที่ซื้อสำเร็จ
- [ ] เลือก no-go case พร้อมเหตุผลและผู้รับผิดชอบได้
- [ ] อธิบายขั้นตอนกู้ระบบและสิ่งที่ rollback โค้ดแก้ไม่ได้

ติ๊กเมื่อมีหลักฐานหรืออธิบายพร้อมตัวอย่างได้; ข้อที่ติดให้บันทึกสาเหตุ/สิ่งที่จะลองต่อ ไม่ต้องคิดคะแนน ดู [วิธีตรวจตัวเอง](learning-guide.md) และ [แบบบันทึกผล](../../templates/learning-evidence.md)

---

[สารบัญหลักสูตร](../../README.md) · [วิธีทำ lab และตรวจตัวเอง](learning-guide.md)
