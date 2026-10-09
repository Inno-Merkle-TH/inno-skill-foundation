# Extension — Messaging API

## Prerequisites / mental model

ผ่าน OA และ Provider approval ก่อนเปิด API Secret ใช้ตรวจ webhook; access token ใช้เรียก API; reply token ใช้ตอบ event มี lifecycle เฉพาะ ไม่ใช้แทน user ID

## Guided lab

1. OA Manager → Settings → Messaging API → Enable หลัง mentor ยืนยัน Provider ไม่มีการเปิดแทนผู้เรียน
2. Developers Console เลือก Provider/channel ที่เกิดขึ้น ตรวจ Channel ID และเก็บ secrets ใน approved secret store ไม่ใน inventory
3. เริ่มจากอ่าน `labs/qe-code/src/line/signature.ts` และรัน `npm test -- line` จาก coding lab
4. ใช้ webhook receiver extension ที่ต้อง implement ตาม exercise ด้านล่างและ verify raw body ก่อน JSON parse
5. ตั้ง HTTPS webhook URL `<assigned-domain>/line/webhook` กด Verify ต้องรับ signed empty events และ 200
6. เปิด Use webhook ปรับ OA response settings แล้วส่งข้อความทดสอบหนึ่งข้อความ ตอบด้วย reply API โดย server-side token ไม่แสดง credential ให้ browser
7. ทดสอบ invalid signature, repeated webhookEventId, body changed และ dependency outage

## Implementation exercise และ acceptance

Core service รุ่นนี้มี signature helper แต่ยังไม่ใช่ live bot: ให้ผู้เรียนเพิ่ม receiver/processor พร้อม tests ก่อนตั้ง webhook จริง รับ verified empty events; deduplicate webhookEventId ใน persistent store; reply ครั้งเดียว; invalid signature ต้องไม่มี side effect; redelivery/reply-token expired ไม่สร้าง order หรือ notify ซ้ำ ห้ามเปิด endpoint stub ที่ตอบ 200 ทุก request แล้วอ้างว่า bot สำเร็จ

เพิ่ม order notification ได้ต่อเมื่อใช้ [account linking flow](https://developers.line.biz/en/docs/messaging-api/linking-accounts/) ที่ตรวจเจ้าของ ไม่รับ client UID/order ID เป็น authorization แยก notification status จาก order status ไม่ log message bodies/UID/token โดยไม่จำเป็น

## Troubleshooting / cleanup

Signature fail: ตรวจ raw bytes/channel secret ไม่ whitelist IP แทน signature Verify ผ่านแต่ bot ไม่ตอบ: ตรวจ event processing/access token/reply-token deadline/response modes Rotate credential โดย owner approval ไม่รีเซ็ต secret แบบสุ่ม ปิด webhook/tunnel หลัง manual test

## References

- [Webhook signature](https://developers.line.biz/en/docs/messaging-api/verify-webhook-signature/)
- [Build a bot](https://developers.line.biz/en/docs/messaging-api/building-bot/)
- [Messaging API reference](https://developers.line.biz/en/reference/messaging-api/)
