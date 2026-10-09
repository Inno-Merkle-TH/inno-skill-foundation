# Rubric และ safety gates

| หมวด | คะแนน | หลักฐานที่ต้องเห็น |
|---|---:|---|
| Coding/automation | 25 | test ที่จับ defect, readable code, PR และคำอธิบายของผู้เรียน |
| Tracking/data quality | 30 | contract, reconciliation, consent exclusions, missing/duplicate diagnosis |
| Architecture/reliability | 20 | data flow, boundary, failover และ restore evidence |
| Privacy/security/governance | 15 | data inventory, owner, risk และ mitigations |
| Communication/evidence | 10 | ทำซ้ำได้, แยก verified/unverified, release decision |

Final pass 75/100 และผ่าน safety gates ทุกข้อ คะแนนรวมทดแทนการละเมิดไม่ได้ LINE API/Login/GA4 ไม่ใช่เงื่อนไขผ่าน core

Safety gates: ไม่มี secret leak; ไม่มี real customer data; ไม่มี unauthorized access; ไม่ bypass consent; ไม่กล่าวอ้างผลทดสอบที่ไม่ได้ทำ หากพลาดให้หยุดการส่งมอบ artifact ที่เสี่ยงและทำ remediation กับ mentor ไม่ปิดบังเพื่อรักษาคะแนน

Weekly checkpoint: 0 = ยังไม่มี evidence, 1 = ทำตามได้, 2 = อธิบายและทำซ้ำได้, 3 = จับ seeded defect และอธิบาย impact ได้ ต้องได้อย่างน้อย 2 ทุกหัวข้อของสัปดาห์และ 3 ใน negative test ก่อนขึ้นระดับ

Mentor ถามสด: เปลี่ยน field นี้จะเกิดอะไร, test ใดจับได้, ข้อมูลนี้มาจากไหน, 200 ต่างจาก business success อย่างไร ห้ามให้คะแนน coding จากความสวยของ AI output อย่างเดียว
