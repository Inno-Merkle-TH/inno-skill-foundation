# Recovery report

- Scenario / preconditions / baseline:
- Target RTO/RPO กำหนดก่อน drill:
- Outage start / detection / recovery timestamps UTC:
- Requests tested / errors / outcomes:
- Actual RTO / data loss และ duplicate count:
- Orders count/value และ event counts ก่อน/หลัง:
- Snapshot path และ integrity checks (ไม่มี secrets):
- Restore DB/content isolated จาก primary อย่างไร:
- Uploaded asset และ order ownership verification:
- Remaining SPOFs / unverified checks:
- Owner / remediation / release decision:

## Checklist ก่อนเก็บหลักฐาน

- [ ] เก็บ baseline และเป้าหมายก่อน outage พร้อม timestamp UTC
- [ ] พิสูจน์ restore แยก primary และตรวจ counts/value/assets
- [ ] ระบุ stores ที่ไม่ได้ backup และ observed loss/duplicates แยกจากเป้าหมาย
