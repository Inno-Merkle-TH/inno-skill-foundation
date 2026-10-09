# 08 — Tracking contract และ collector

## Prerequisites / mental model

ผ่าน SQL/API basics Tracking มีหลายขั้น: trigger → queue → network → collector → storage → processing → report HTTP 202 ของ collector บอกเพียงรับเข้า store ไม่พิสูจน์ GA4 report Consent ไม่ให้เก็บเป็น expected exclusion ไม่ใช่ missing defect

## Lab

จาก root `cd labs/commerce` แล้ว `docker compose --profile tracking up -d --build` (ต้อง setup core ก่อน) รอ `docker compose logs qe-api` เห็น listening; ไม่แนบ raw logs หากมี secret

```bash
curl --fail http://localhost:8080/lab-api/health
curl -i http://localhost:8080/lab-events -H 'Content-Type: application/json' --data '{"eventId":"demo-event-001","schemaVersion":1,"eventName":"purchase","transactionId":"demo-order-001","valueMinor":19900,"currency":"THB","items":[{"itemId":"QE-NOTEBOOK-001","quantity":1}],"occurredAt":"2026-10-09T10:00:00.000Z","consentState":"granted","source":"browser"}'
```

Expected: health 200; event แรก 202, ส่งซ้ำ 200 duplicate; เปลี่ยน consent denied ได้ 403, ใส่ email ได้ 400 จาก root `cd labs/qe-code && npm test` ตรวจ unit/API tests

ตรวจ persistence จาก `labs/commerce`:

```bash
docker compose exec -T eventdb sh -c 'MYSQL_PWD="$MARIADB_PASSWORD" mariadb -u collector lab -e "SELECT event_id FROM events;"'
docker compose restart qe-api
```

ส่ง demo ID เดิมหลัง restart ต้อง duplicate ไม่ accepted ใหม่ เปลี่ยน eventId แต่ transactionId เดิมต้องเก็บได้เพื่อให้ reconciliation ตรวจ semantic duplicate

## Exercise

เชื่อม browser journey กับ contract: เก็บ tracking plan ก่อนเพิ่ม instrumentation ห้ามส่ง purchase ตอน click checkout โดยไม่เห็น order success ฝึก consent granted/denied/revoke และ browser refresh; เขียน client queue ที่ retry ได้แต่ revoke แล้วล้าง queue และไม่ส่งตาม consent เดิม

Reference collector ไม่รับ event types อื่นและไม่ authenticate ความจริงของ purchase จึงต้อง reconcile กับ commerce data ไม่ใช้ collector เป็น authorization หรือบัญชีรายได้

Instrumentation demo มี pending queue ใน memory เท่านั้น: online event ทำ retry ได้แต่ปิดหน้าแล้วอาจหาย และ response 503 ไม่ retry จนมี trigger อีกครั้ง นี่เป็นโจทย์ data-loss ให้ QE พัฒนาต่อ ไม่ใช่ durable tracking guarantee การ deny/revoke ล้าง pending queue ของหน้านี้ การประมวลผลที่เกิดก่อน revoke ต้องมี retention/deletion policy แยก

## Troubleshooting / cleanup

502: service profile tracking ยังไม่พร้อม; 503: event store unavailable; 400: schema ผิด; ห้ามแก้ด้วยปิด validator ล้าง fixture โดยเปลี่ยน event ID ไม่ DROP events table ที่ mentor ต้องตรวจ; down เก็บ volumes

## หลักฐานที่เก็บ

จับ missing, duplicate, invalid, late และ excluded ได้พร้อมหลักฐาน DB แยก collection success กับธุรกิจสำเร็จ ไม่ใช้ server-side tracking ข้าม consent

## Lab: ตรวจ response กับข้อมูลที่เก็บ

ทำหลัง lab หลัก; เปลี่ยนทีละตัวแปรใน sandbox และบันทึกผลก่อนคืนค่า

| ทดลอง | ผลที่ใช้ตรวจตัวเอง |
|---|---|
| ส่ง demo event ใหม่ แล้วส่ง eventId เดิมซ้ำ | 202 ครั้งแรก / 200 duplicate; rerun lab ด้วย ID เก่าอาจเริ่มที่ 200 |
| ส่ง consent denied หรือเพิ่ม email ใน payload | 403 หรือ 400; ไม่เพิ่ม record ของ payload ที่ถูกปฏิเสธ |
| restart qe-api แล้วส่ง ID เดิม | ยัง duplicate เพราะ dedup อยู่ใน DB ไม่ใช่ memory |
| ส่ง eventId ใหม่แต่ transactionId เดิม | รับได้ที่ collector; reconciliation ต้องจับ business duplicate |

## Checklist — ลงมือทำครบหรือยัง

- [ ] มี tracking plan ระบุ trigger, fields, consent และ source of truth
- [ ] เทียบ response กับ SELECT event_id ใน eventdb จริง
- [ ] ใช้ ID ใหม่ต่อการทดลอง แต่คง ID เดิมเมื่อตั้งใจ retry
- [ ] บันทึกขอบเขต queue ใน memory และการสูญหายเมื่อปิดหน้า

## Checklist — อธิบายด้วยตัวเองได้ไหม

- [ ] แยก eventId dedup กับ transactionId reconciliation ได้
- [ ] อธิบายได้ว่า health 200 เป็น liveness ไม่รับรอง DB พร้อม
- [ ] บอกเหตุผลที่ collector รับข้อมูลไม่ได้แปลว่ามี order จริง

ติ๊กเมื่อมีหลักฐานหรืออธิบายพร้อมตัวอย่างได้; ข้อที่ติดให้บันทึกสาเหตุ/สิ่งที่จะลองต่อ ไม่ต้องคิดคะแนน ดู [วิธีตรวจตัวเอง](learning-guide.md) และ [แบบบันทึกผล](../../templates/learning-evidence.md)

## References

- [Tracking plan template](../../templates/tracking-plan.md)
- [GA4 ecommerce event semantics](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)

---

[สารบัญหลักสูตร](../../README.md) · [วิธีทำ lab และตรวจตัวเอง](learning-guide.md)
