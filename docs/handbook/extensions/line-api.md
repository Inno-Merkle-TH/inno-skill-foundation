# Extension — Messaging API

## Prerequisites / mental model

ผ่าน OA และ Provider approval ก่อนเปิด API Secret ใช้ตรวจ webhook; access token ใช้เรียก API; reply token ใช้ตอบ event มี lifecycle เฉพาะ ไม่ใช้แทน user ID

## Lab A: signature แบบ offline — รันได้ทันที

จาก root เปิด coding lab (ไม่ต้องสร้าง OA หรือใช้ secret จริง):

```bash
cd labs/qe-code
npm ci
npm test -- line
npm run typecheck
```

เปิด `tests/line.test.ts` หากชื่อไฟล์ต่างให้ค้นหา `verifyLineSignature` ใน tests: fixture ใช้ secret สังเคราะห์และ raw bytes ของ empty events ทำนายผลก่อนอ่าน assertions

| Input | Expected |
|---|---|
| raw bytes เดิม + signature/secret ที่ตรง | true |
| เติม whitespace แต่ใช้ signature เดิม | false แม้ JSON มีความหมายเหมือนเดิม |
| secret ผิด / signature malformed / secret ว่าง | false |

ใน sandbox เพิ่ม test signature หายหรือ body เปลี่ยน แล้วรัน tests ต้องเห็นการปฏิเสธ; helper ผ่านยังไม่พิสูจน์ webhook routing หรือ reply API

## Lab B: live integration — ต้อง implement ก่อน

1. OA Manager → Settings → Messaging API → Enable หลัง mentor ยืนยัน Provider ไม่มีการเปิดแทนผู้เรียน
2. Developers Console เลือก Provider/channel ที่เกิดขึ้น ตรวจ Channel ID และเก็บ secrets ใน approved secret store ไม่ใน inventory
3. เริ่มจากอ่าน `labs/qe-code/src/line/signature.ts` และรัน `npm test -- line` จาก coding lab
4. implement webhook receiver ตาม exercise ด้านล่าง: verify raw body ก่อน JSON parse แล้วทำ service/proxy wiring ตาม [ขั้นเชื่อม route](#serviceproxy-wiring-ก่อนเปิด-tunnel) ก่อนตั้ง URL จริง
5. ตั้ง HTTPS webhook URL `<assigned-domain>/line/webhook` กด Verify ต้องรับ signed empty events และ 200
6. เปิด Use webhook ปรับ OA response settings แล้วส่งข้อความทดสอบหนึ่งข้อความ ตอบด้วย reply API โดย server-side token ไม่แสดง credential ให้ browser
7. ทดสอบ invalid signature, repeated webhookEventId, body changed และ dependency outage

## Implementation exercise และ acceptance

### Service/proxy wiring ก่อนเปิด tunnel

ทำใน sandbox extension ไม่ใช่แค่เพิ่ม handler แล้วคาดว่า URL ใช้งานได้:

1. เพิ่ม `POST /line/webhook` ใน Node service พร้อม unit/API tests และอ่าน credentials ฝั่ง server จาก environment ที่ตั้งใจ inject เท่านั้น `labs/line/.env.example` เป็นรายการตัวอย่าง ไม่ถูก Compose โหลดอัตโนมัติ เก็บค่าจริงใน ignored env file/approved secret store ไม่ใส่ YAML/โค้ด/หลักฐาน
2. เพิ่ม environment/secret mapping ให้ `qe-api` ใน Compose sandbox โดยใช้ชื่อตรงกับโค้ด ไม่ส่ง credential ไป browser หรือ log; ตรวจด้วย `docker compose config --quiet` ไม่แชร์ resolved config ที่มี secret
3. เพิ่ม exact location `/line/webhook` ใน Nginx ให้ proxy ไป `qe-api:3000` รักษา raw request body/header และจำกัด body size ต้องตั้งทั้ง core/HA config หากใช้ทั้งสองโหมด ค่าเดิมส่ง route นี้ไป WordPress จึงยังไม่ใช่ webhook ที่พร้อมใช้
4. จาก sandbox `labs/commerce` รัน `docker compose --profile tracking up -d --build qe-api proxy` เพื่อ build source/config ใหม่ ไม่ใช้ restart อย่างเดียว และรอ app พร้อม
5. ส่ง synthetic signed empty events ไป `http://localhost:8080/line/webhook` ต้องได้ 200 จาก Node receiver; ส่ง unsigned/changed body ต้องถูกปฏิเสธและไม่มี side effect ตรวจว่าไม่ใช่ WordPress HTML/404 ก่อนเปิด tunnel
6. ใช้ [public tunnel preflight](../learning-guide.md#public-tunnel-preflight) ตรวจว่า admin/DB ยังไม่เผยแพร่ แล้วจึงตั้ง HTTPS URL และ Verify กับ LINE

Expected: local route/negative tests ผ่านก่อน live Verify; signature helper อย่างเดียวไม่ครอบคลุมการตั้ง proxy, credential wiring หรือการตอบข้อความ

Core service รุ่นนี้มี signature helper แต่ยังไม่ใช่ live bot: ให้ผู้เรียนเพิ่ม receiver/processor พร้อม tests ก่อนตั้ง webhook จริง รับ verified empty events; deduplicate webhookEventId ใน persistent store; reply ครั้งเดียว; invalid signature ต้องไม่มี side effect; redelivery/reply-token expired ไม่สร้าง order หรือ notify ซ้ำ ห้ามเปิด endpoint stub ที่ตอบ 200 ทุก request แล้วอ้างว่า bot สำเร็จ

เพิ่ม order notification ได้ต่อเมื่อใช้ [account linking flow](https://developers.line.biz/en/docs/messaging-api/linking-accounts/) ที่ตรวจเจ้าของ ไม่รับ client UID/order ID เป็น authorization แยก notification status จาก order status ไม่ log message bodies/UID/token โดยไม่จำเป็น

## Troubleshooting / cleanup

Signature fail: ตรวจ raw bytes/channel secret ไม่ whitelist IP แทน signature Verify ผ่านแต่ bot ไม่ตอบ: ตรวจ event processing/access token/reply-token deadline/response modes Rotate credential โดย owner approval ไม่รีเซ็ต secret แบบสุ่ม ปิด webhook/tunnel หลัง manual test

## References

- [Webhook signature](https://developers.line.biz/en/docs/messaging-api/verify-webhook-signature/)
- [Build a bot](https://developers.line.biz/en/docs/messaging-api/building-bot/)
- [Messaging API reference](https://developers.line.biz/en/reference/messaging-api/)

## Checklist — ลงมือทำครบหรือยัง

- [ ] offline signature tests ผ่านและอธิบาย raw-body mutation ได้
- [ ] receiver ที่พัฒนาเพิ่มตรวจ signature ก่อน parse/process
- [ ] verified empty events ได้ 200 และ invalid signature ไม่มี side effect
- [ ] persistent webhookEventId dedup/reply failure มี tests ก่อนเปิด webhook
- [ ] live test ใช้บัญชีทดลอง และปิด webhook/tunnel หลังจบหรือระบุยังไม่ทำ

## Checklist — อธิบายด้วยตัวเองได้ไหม

- [ ] แยก channel secret/access token/reply token/user ID ได้
- [ ] อธิบายว่ากด Verify ผ่านยังไม่พิสูจน์ bot reply สำเร็จ
- [ ] อธิบายว่าต้องตรวจ account ownership ก่อนส่ง order notification

ติ๊กเฉพาะสิ่งที่ทำจริง แยก offline/design/implemented/live ใน [learning evidence](../../../templates/learning-evidence.md); ไม่มีบัญชีให้เก็บ offline lab และระบุ live ยังไม่ทำ

## Cleanup ของ offline lab

เก็บ fixture/tests ใน sandbox ไม่มีบัญชีหรือ services ให้ลบ หากทดลอง live ให้ทำ cleanup ด้านบนและตรวจว่า credentials ไม่อยู่ใน staged diff

---

[สารบัญ](../../../README.md) · [วิธีตรวจตัวเอง](../learning-guide.md)
