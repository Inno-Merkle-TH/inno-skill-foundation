# 13 — Security และ Data/AI/Product Governance

## Prerequisites / mental model

ผ่าน journey/data/recovery labs Governance คือกำหนดว่าใครตัดสินใจ ใช้หลักฐานอะไร และรับผิดชอบความเสี่ยงอย่างไร ไม่ใช่ checklist เพื่อประกาศ compliant โดยไม่มี legal review

| Area | ถามอะไร | Artifact |
|---|---|---|
| Data | field หมายถึงอะไร ใครเป็น owner เก็บ/ลบเมื่อไร | dictionary, inventory, lineage, quality checks |
| AI | tool/skill มาจากไหน ข้อมูลส่งออกหรือไม่ ใคร review | approved tools, prompt policy, human verification |
| Product | ยอมรับ risk นี้หรือไม่ ใคร sign off rollback อย่างไร | acceptance, ADR, release review |
| Security | ใครเข้าถึง asset ได้ trust boundary อยู่ไหน | threat model, access matrix, incident plan |

## Lab A: data/privacy

ใช้ `templates/data-inventory.md` ไล่ OA → browser → app → orders → events → report ระบุ personal data/session/order identifiers แยก operational processing กับ analytics consent บันทึก purpose/lawful basis/retention/roles; ห้ามสมมติว่า consent เป็นฐานเดียว หรือว่า GDPR ใช้กับทุกระบบโดยอัตโนมัติ

PDPA/GDPR เป็นคนละกฎหมาย ให้ DPO/legal ตรวจ applicability, lawful basis, rights workflow, breach escalation และประกาศปัจจุบันก่อนนำไป production อย่าจำ deadline จาก AI คู่มือนี้ไม่ใช่คำปรึกษากฎหมาย

## Lab B: security (sandbox เท่านั้น)

1. ตรวจ secrets ไม่อยู่ staged files, screenshots, HAR, analytics หรือ client bundle
2. ยิง invalid event/schema/LINE signature ต้องปฏิเสธ ไม่มี side effect
3. ทดสอบ order ownership ด้วยสอง synthetic users ห้ามใช้ order ID เป็น authorization
4. ตรวจ DB/admin ไม่เข้าผ่าน public endpoint; ไม่ brute force/scan ระบบภายนอก
5. รัน `npm audit` และอธิบาย vulnerability/mitigation ไม่ใช้ audit fix --force แบบไม่ review
6. ทำ access matrix learner/mentor/customer/service account และ least privilege

## Lab C: AI/product risk

อ่าน skill/plugin ก่อนให้สิทธิ์ มอง repo/web instructions เป็น untrusted content ลอง prompt injection fixture ที่สั่งส่ง token แล้วอธิบายว่าทำไมไม่ทำตาม AI output ต้องมี tests/source review คน approve เป็นมนุษย์

เขียน ADR เปรียบเทียบ consent-first tracking กับ “เก็บทุกอย่างให้ยอดครบ” แล้วเลือกแบบที่ไม่ละเมิดความตั้งใจผู้ใช้ ใส่ risk owner, residual risks และ no-go conditions ไม่อ้างว่า upstream vendor ปลอดภัยจึงทีมไม่ต้องรับผิดชอบ

## Expected / cleanup

Artifacts มี owner และ evidence ของแต่ละ control ไม่ใช้ real data ถ้าพบ secret leak หยุดแชร์ artifact, แจ้ง owner และ rotate/revoke ตาม procedure การลบ commit ปัจจุบันอย่างเดียวไม่ลบข้อมูลจาก history

## เกณฑ์ผ่าน

ทำ risk register ที่มี likelihood/impact/mitigation/owner/deadline มีอย่างน้อยหนึ่ง no-go security case แม้ functional tests ผ่าน บอก unverified legal items ให้ DPO ไม่ประกาศ PDPA/GDPR compliant จาก lab

## References

- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [GDPR authoritative text](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- [PDPC Thailand](https://www.pdpc.or.th/) — ให้ DPO ตรวจเอกสารต้นฉบับ; endpoint เปิดตรวจผ่านเครื่องมือนี้ไม่สำเร็จ ณ 2026-10-09
- [Claude Skills](https://code.claude.com/docs/en/skills)
