# Tracking plan

| Event | Business meaning | Trigger | Fields | Consent | Source of truth | Owner |
|---|---|---|---|---|---|---|
| view_item | เห็นรายละเอียดสินค้า | หลัง render สินค้าจริง | item_id | analytics | product view | ระบุ owner |
| add_to_cart | cart เปลี่ยนสำเร็จ | หลัง cart response สำเร็จ | item_id, quantity | analytics | cart state | ระบุ owner |
| begin_checkout | เริ่มขั้น checkout | ตาม page/state ที่กำหนด | cart summary | analytics | checkout state | ระบุ owner |
| purchase | order เข้า completed ใน lab | หลัง authoritative order state | transaction_id, value_minor, currency, items | analytics | commerce order | ระบุ owner |

Collector reference ในรุ่นนี้ validate/persist เฉพาะ purchase ไม่ใช่ events ทั้งหมด ผู้เรียนต้องเพิ่ม discriminated schemas/test ก่อนส่ง event อื่น

- Reconciliation window (UTC `[from,to)`):
- Late-arrival allowance:
- Eligible denominator / excluded reasons:
- Duplicate definition / event ID policy:
- Consent revoke / pending queue policy:
- Source/browser/server trust boundary:
- PII allowlist, retention และ access:
- Version/change approval:
- Missing/invalid/duplicate thresholds และ escalation owner:
