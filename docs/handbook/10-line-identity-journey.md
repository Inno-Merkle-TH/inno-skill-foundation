# 10 — Provider, Channel และ identity ใน journey เดียว

## Prerequisites / mental model

ทำ OA setup แล้ว Provider คือขอบเขตบริการ/identity; Channel คือช่องทางใช้ LINE platform feature; OA คือบัญชีสื่อสารธุรกิจ การเป็นเพื่อน OA, login เว็บ และยินยอม analytics เป็นคนละสถานะ

| Identifier | หมายถึง | ใช้แทนกันได้ไหม |
|---|---|---|
| OA Basic ID | บัญชี OA เช่น @... | ไม่ใช่ user ID ของลูกค้า |
| Provider ID | provider ใน Developers Console | ไม่ใช่ channel/customer |
| Channel ID | Messaging API หรือ Login channel | channel คนละประเภทคนละ ID |
| LINE user ID | identity ภายใต้ Provider | อย่าสมมติเท่ากันข้าม Provider |
| Web customer ID | บัญชีในร้านค้า | ต้องมี verified account linking |

## Lab / Provider safety review

ก่อน enable Messaging API ให้ mentor ตรวจว่า Provider ใครเป็นเจ้าของ admin role/team continuity และมี Login channel อยู่ที่ใด ห้ามใช้ Provider ของ vendor/บุคคลอื่นเพียงเพราะเห็นใน dropdown ผูก Provider กับ OA แล้วเปลี่ยน/ถอดไม่ได้ตามเอกสาร LINE จึงเป็น checkpoint ต้องอนุมัติแยก

วาด Provider ของร้านทดลอง → Messaging API channel ↔ OA และ Login channel ↔ เว็บ เติม nonsecret IDs ใน `templates/channel-inventory.md` ไม่ใส่ channel secret/access token

## Journey exercise

Rich menu → shop → product → cart → checkout → order success จาก LINE app และ external browser ทดสอบ UTM ผ่าน redirect, session continuity, cancel/open new browser และ consent states ไม่อ้างว่า UTM พิสูจน์ identity ผู้ซื้อ

Expected: mapping อธิบายขอบเขต IDs ได้และบอกสิ่งที่วัดได้/ไม่ได้จากแต่ละ step หากไม่มี verified linking อย่าส่ง order detail กลับ UID ที่ client ส่งมา

## Troubleshooting / cleanup

Provider ไม่ขึ้น: ตรวจ Admin role ไม่เลือก provider อื่นเพื่อข้ามปัญหา UID mismatch: ตรวจ Provider scope ก่อน join ไม่เทียบด้วย display name/email Cleanup เก็บ inventory แบบ redacted ไม่ลบ/ย้าย Provider ใน lab

## หลักฐานและ References

ผู้เรียนอธิบาย difference account/channel/user พร้อม threat case ของ order ownership และผลของ attribution loss

- [LINE Provider selection constraints](https://developers.line.biz/en/docs/messaging-api/getting-started/)
- [Secure account linking](https://developers.line.biz/en/docs/messaging-api/linking-accounts/)

## Lab: ทำ identity map โดยยังไม่ต้องเปิด API

ทำหลัง lab หลัก; เปลี่ยนทีละตัวแปรใน sandbox และบันทึกผลก่อนคืนค่า

| ทดลอง | ผลที่ใช้ตรวจตัวเอง |
|---|---|
| ใช้ aliases วาด OA → Messaging channel → Provider และ Login channel | แยก OA Basic ID/Channel ID/Provider ID/UID/web customer |
| ทำตาราง friend yes/no × login yes/no × consent yes/no | ไม่อนุมานสถานะหนึ่งจากอีกสถานะ; ช่องที่ระบบยังไม่มีระบุ not implemented |
| สมมติ request ส่ง order ของ user B แต่ session เป็น user A | คาดว่าจะถูกปฏิเสธโดย ownership check ไม่เชื่อ UID/order ID จาก client |

## Checklist — ลงมือทำครบหรือยัง

- [ ] เติม channel inventory เฉพาะข้อมูล nonsecret ที่มีจริง
- [ ] ระบุ intended Provider/owner และผลที่แก้กลับไม่ได้ก่อน enable
- [ ] ทำ mobile journey พร้อม UTM/session/consent observations
- [ ] แยก conceptual identity review จาก live verified account linking

## Checklist — อธิบายด้วยตัวเองได้ไหม

- [ ] อธิบายขอบเขต UID และเหตุที่ห้าม join ด้วย display name
- [ ] อธิบายได้ว่า UTM เป็น attribution ไม่ใช่ authorization
- [ ] ระบุจุดที่ต้องตรวจเจ้าของ order ก่อนส่งรายละเอียดผ่าน LINE

ติ๊กเมื่อมีหลักฐานหรืออธิบายพร้อมตัวอย่างได้; ข้อที่ติดให้บันทึกสาเหตุ/สิ่งที่จะลองต่อ ไม่ต้องคิดคะแนน ดู [วิธีตรวจตัวเอง](learning-guide.md) และ [แบบบันทึกผล](../../templates/learning-evidence.md)

---

[สารบัญหลักสูตร](../../README.md) · [วิธีทำ lab และตรวจตัวเอง](learning-guide.md)
