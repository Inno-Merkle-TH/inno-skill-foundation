# Mentor capstone guide

เลือก defects ล่วงหน้าแต่ไม่เปิดเฉลย ให้ผู้เรียนตรวจสามชั้น business/network/data ไม่สอนให้ไล่ UI อย่างเดียว

- Missing: collector stop แต่ order completed → functional pass/data no-go ตาม threshold
- Duplicate: new event ID/same transaction → store accepts แต่ reconciliation จับ surplus
- Consent deny: purchase ไม่เก็บตาม design → excluded ไม่ missing; ต้องไม่ bypass
- Wrong amount/currency: 200/202 ไม่ทำให้ valid report ต้องเทียบ source of truth
- IDOR/secret leak: no-go แม้คะแนน >75 ต้อง remediation
- App failover: GET ผ่านไม่ได้พิสูจน์ POST checkout exactly-once

Answer guide สำหรับ SQL อยู่ sql-answers.sql ให้ใช้หลังผู้เรียนส่งโจทย์ ไม่ให้ลดความยากด้วยแก้ fixtures เป็น happy path
