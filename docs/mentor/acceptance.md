# Acceptance checklist

ใช้ตรวจการส่งมอบหลักสูตร ไม่ใช่คะแนนผู้เรียน ไม่ติ๊กข้อที่ยังไม่ได้ทดลองจริง แต่ละข้อแนบ command/result หรือ evidence path; ผลทดสอบต่าง OS/account แยกกัน

- [ ] ทุกบทมี prerequisite, lab, expected/negative cases และ cleanup
- [ ] ทุกบทมี checklist การลงมือทำและความเข้าใจที่ตรวจได้เฉพาะเรื่อง
- [ ] Optional extensions แยก offline/design/implemented/live ชัดเจน
- [ ] ลิงก์ภายในและคำสั่งอ้างอิงไฟล์ที่มีจริงหรือระบุว่าให้สร้าง
- [ ] README และ templates สนับสนุนการตรวจตัวเองโดยไม่บังคับรอ mentor ทุกขั้น

- [ ] Setup instructions ใช้ได้บน macOS
- [ ] Setup instructions ใช้ได้บน Windows/WSL
- [ ] Setup instructions ใช้ได้บน Linux
- [ ] Free/license caveats ชัดเจนและ core ไม่บังคับ Claude
- [ ] HTTP local server bind loopback และ cleanup ได้
- [ ] GitHub PR จริงมี mentor review ไม่มี credentials
- [ ] Git release/hotfix, conflict และ ordinary revert rehearsal ผ่าน
- [ ] TypeScript validator มี valid/invalid tests และ typecheck ผ่าน
- [ ] SQL fixtures/reconciliation จับ seeded defect
- [ ] Commerce clean setup, persistence, checkout และ public admin blocking
- [ ] Consent/revoke/outage tracking drills ผ่าน
- [ ] LINE OA setup และ mobile journey ผ่านจริง
- [ ] HA/isolated restore report ไม่อ้าง production HA
- [ ] Capstone report แยก verified/unverified และมี risk owners
