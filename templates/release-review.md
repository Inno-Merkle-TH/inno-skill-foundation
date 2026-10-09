# Release review

- Version/commit/environment:
- Acceptance criteria และ test coverage:
- Functional/API/UI evidence:
- Tracking expected/observed/missing/duplicate/invalid/late/excluded:
- Consent/ownership/security gates:
- Recovery/RTO/RPO evidence และ SPOFs:
- Unverified checks:
- Risks accepted พร้อม owner ไม่ใช่ QA รับเอง:
- Rollback procedure และเงื่อนไข:
- Go/no-go / approvers / rationale:

## Checklist ก่อนเก็บหลักฐาน

- [ ] หลักฐานตรง version/commit ที่จะตัดสิน ไม่ยืมผลจาก commit เก่า
- [ ] แยก missing/invalid/excluded และ unverified checks ชัดเจน
- [ ] risks มีผู้รับผิดชอบที่ยอมรับจริง; มี rollback trigger และขั้นตรวจหลัง rollback
