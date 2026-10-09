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

## เกณฑ์ผ่าน / references

ผู้เรียนอธิบาย difference account/channel/user พร้อม threat case ของ order ownership และผลของ attribution loss

- [LINE Provider selection constraints](https://developers.line.biz/en/docs/messaging-api/getting-started/)
- [Secure account linking](https://developers.line.biz/en/docs/messaging-api/linking-accounts/)
