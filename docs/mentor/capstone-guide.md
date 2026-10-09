# Mentor capstone guide

เลือก defects ล่วงหน้าแต่ไม่เปิดเฉลย ให้ผู้เรียนตรวจสามชั้น business/network/data ไม่สอนให้ไล่ UI อย่างเดียว หากเรียนเองให้เลือกจากบท 11–13 ทีละกรณี บันทึก expected ก่อน inject และเก็บ baseline สำหรับคืนระบบ

- Missing: collector stop แต่ order completed → functional pass/data no-go ตาม threshold
- Duplicate: new event ID/same transaction → store accepts แต่ reconciliation จับ surplus
- Consent deny: purchase ไม่เก็บตาม design → excluded ไม่ missing; ต้องไม่ bypass
- Wrong amount/currency: 200/202 ไม่ทำให้ valid report ต้องเทียบ source of truth
- IDOR/secret leak: no-go แม้ functional tests ผ่าน ต้อง remediation
- App failover: GET ผ่านไม่ได้พิสูจน์ POST checkout exactly-once

Answer guide สำหรับ SQL อยู่ [sql-answers.sql](sql-answers.sql) เปิดหลังลอง query เอง ไม่ลดความยากด้วยแก้ fixtures เป็น happy path

## Review checklist

- [ ] ข้อค้นพบอ้างอิง requirement และหลักฐาน ไม่ใช่จำนวน tests
- [ ] Consent-excluded แยกจาก missing defect
- [ ] Release decision ระบุ risk owner และสิ่งที่ยังไม่ verified
- [ ] ผู้เรียนเปลี่ยน fixture แล้วอธิบายผลได้ ไม่ท่องเฉลย
- [ ] คืน services และปิด public tunnel แล้ว ไม่มีคะแนนหรือจัดอันดับ
