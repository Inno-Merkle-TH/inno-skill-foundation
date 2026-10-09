# Data inventory

| Dataset/field | Meaning/source | Personal data? | Purpose/basis ที่ต้อง review | Owner | Access | Retention/deletion | Downstream |
|---|---|---|---|---|---|---|---|
| synthetic order | order ID/value/currency | พิจารณาเชื่อมบัญชี | operations | กำหนด | service/mentor | กำหนด | reconciliation |
| purchase event | analytics contract | พิจารณา identifiers | consented analytics ใน lab | กำหนด | collector/mentor | กำหนด | report |

Privacy review: applicability, rights request, data processor, international transfer, breach escalation และสิ่งที่ต้องให้ DPO/legal ยืนยัน

## Checklist ก่อนเก็บหลักฐาน

- [ ] ไล่ source → processing → storage → downstream ได้ครบใน scope
- [ ] ระบุ owner/access/retention และสิ่งที่ DPO ต้องตัดสิน ไม่เดาฐานกฎหมาย
- [ ] ไม่มีข้อมูลจริงหรือ identifiers ที่เชื่อมกลับบุคคลในตัวอย่าง
