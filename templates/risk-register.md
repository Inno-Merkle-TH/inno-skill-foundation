# Risk register

| ID | Scenario/cause | Business/data impact | Likelihood ต่ำ/กลาง/สูง | Impact ต่ำ/กลาง/สูง | Mitigation/control | Evidence | Owner/deadline | Residual risk | Release verdict |
|---|---|---|---|---|---|---|---|---|---|
| R01 | order สำเร็จแต่ purchase event หาย | revenue report ต่ำกว่าจริง | ระบุ | ระบุ | consent-aware reconciliation | path | ระบุ | ระบุ | go/no-go |

ระดับความเสี่ยงช่วยจัดลำดับแต่ไม่แทน safety checks: secret leak/unauthorized access/consent bypass ต้อง remediation ก่อนส่งมอบ

## Checklist ก่อนเก็บหลักฐาน

- [ ] ระดับ likelihood/impact มีเหตุผลหรือ evidence ไม่ใส่ระดับลอย ๆ
- [ ] mitigation มี owner/deadline และเงื่อนไขตรวจว่าลด risk ได้
- [ ] no-go และ residual risk ผูกกับ release decision ไม่ใช่คะแนนผู้เรียน
