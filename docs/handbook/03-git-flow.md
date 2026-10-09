# 03 — Git flow, release และ rollback

## Prerequisites / เป้าหมาย

ผ่านบท 01–02 ใช้เฉพาะ sandbox repo ที่ไม่มี production remote เป้าหมายคือแยก feature/release/hotfix ทำ conflict และ revert ได้ ไม่ต้องติดตั้ง git-flow extension

## Mental model

`main` เก็บ release history; `develop` รวมงานรุ่นถัดไป; `feature/*` แตกจาก develop; `release/*` freeze รุ่น; `hotfix/*` แตกจาก main เพื่อแก้รุ่นใช้งาน Hotfix ต้องกลับทั้ง main และ develop ไม่เช่นนั้น release ถัดไปนำ defect กลับมา

Git flow เป็น workflow หนึ่ง ไม่ใช่ข้อบังคับทุกทีม Trunk-based ลด long-lived branches แต่ต้องมี CI และ release controls ที่เหมาะสม Tag คือชื่อชี้ commit ไม่ใช่ deployment

## Lab A: release และ hotfix

จาก sandbox repo ที่ main มี initial commit และ working tree clean; หาก default branch ไม่ชื่อ main ให้ mentorปรับตัวอย่างก่อน:

```bash
git switch main
git switch -c develop
git switch -c feature/event-contract
printf 'purchase: transaction_id,value,currency\n' > tracking-contract.txt
git add tracking-contract.txt
git commit -m "feat: add purchase contract"
git switch develop
git merge --no-ff feature/event-contract -m "merge purchase contract"
git switch -c release/0.1.0
printf 'Release 0.1.0: synthetic tracking contract\n' > release-notes.txt
git add release-notes.txt
git commit -m "docs: prepare release notes"
git switch main
git merge --no-ff release/0.1.0 -m "release 0.1.0"
git tag v0.1.0
git switch develop
git merge --no-ff release/0.1.0 -m "sync release changes"
git switch main
git switch -c hotfix/currency-contract
printf 'purchase: transaction_id,value,currency uppercase ISO code\n' > tracking-contract.txt
git add tracking-contract.txt
git commit -m "fix: clarify currency contract"
git switch main
git merge --no-ff hotfix/currency-contract -m "merge currency hotfix"
git tag v0.1.1
git switch develop
git merge --no-ff hotfix/currency-contract -m "sync currency hotfix"
git log --oneline --graph --all
```

Expected: graph แสดง feature/release/hotfix และทั้ง main/develop มี currency fix การ merge local นี้เป็น rehearsal; งานทีมจริงต้องใช้ PR/review ห้าม bypass branch protection

## Lab B: conflict ที่ตั้งใจสร้าง

เริ่มที่ develop ใน sandbox:

```bash
printf 'owner=unassigned\n' > owners.txt
git add owners.txt
git commit -m "docs: add owner fixture"
git switch -c feature/owner-a
printf 'owner=data-team\n' > owners.txt
git add owners.txt
git commit -m "docs: propose data owner"
git switch develop
git switch -c feature/owner-b
printf 'owner=product-team\n' > owners.txt
git add owners.txt
git commit -m "docs: propose product owner"
git switch develop
git merge --no-ff feature/owner-a -m "merge owner A"
git merge --no-ff feature/owner-b -m "merge owner B"
```

Expected: merge ครั้งสุดท้าย fail พร้อม CONFLICT เปิด owners.txt อ่าน markers หาข้อตกลงกับ mentor แล้วแก้เป็น owner เดียวที่รับผิดชอบจริง ลบ markers, `git add owners.txt`, `git commit -m "docs: resolve owner decision"` ไม่เลือก ours/theirs แบบไม่อ่าน ถ้ายังตัดสินไม่ได้ `git merge --abort` คืนก่อน merge โดยไม่ลบ commits

## Lab C: revert โดยไม่เขียน history ใหม่

จาก develop หลัง resolve/abort และ working tree clean:

```bash
printf 'tracking-enabled=false\n' > rollback-fixture.txt
git add rollback-fixture.txt
git commit -m "test: simulate bad tracking configuration"
git revert --no-edit HEAD
git log -2 --oneline
```

Expected: commit ใหม่ย้อนการเพิ่มไฟล์ อย่าใช้ reset/force push แทน revert บน shared history การ revert merge commit ต้องเข้าใจ mainline ก่อน บทนี้ย้อน ordinary commit เท่านั้น

## Troubleshooting / cleanup

ชื่อ branch ซ้ำ: ใช้ sandbox ใหม่หรือ suffix ใหม่ ไม่ delete branch คนอื่น Uncommitted changes: ตรวจ diff และ commit งานที่ต้องเก็บก่อน switch Conflict: อย่า stage markers ถ้าจะหยุดใช้ merge --abort ไม่ต้องลบ repo

## หลักฐานที่เก็บ

ส่ง graph และ release checklist: contract diff, tests, risks, owner, rollback สาธิต PR hotfix จริงเมื่อมี GitHub sandbox พร้อม อธิบายว่าทำไมต้อง sync develop และ revert ไม่รับประกัน tracking data ที่หายไปแล้วจะกลับมา

## Lab D: ตรวจ graph และผล rollback

ทำหลัง lab หลัก; เปลี่ยนทีละตัวแปรใน sandbox และบันทึกผลก่อนคืนค่า

| ทดลอง | ผลที่ใช้ตรวจตัวเอง |
|---|---|
| รัน `git log --graph --decorate --oneline --all` ใน sandbox | เห็น release tag และ hotfix กลับทั้ง main/develop |
| เปิด `tracking-contract.txt` บน main และ develop หลัง hotfix | ทั้งสอง branch มี currency contract ที่แก้แล้ว |
| ตรวจ `git status` และไฟล์หลัง revert | working tree clean; rollback-fixture.txt ถูกย้อนการเพิ่ม แต่ history ยังอยู่ |

## Checklist — ลงมือทำครบหรือยัง

- [ ] ทำ feature → release → tag ใน sandbox
- [ ] ทำ hotfix และ merge กลับสอง branch
- [ ] resolve conflict โดยอ่าน intent และไม่มี conflict markers
- [ ] revert ordinary commit และเก็บ graph ที่ไม่เผย remote credentials

## Checklist — อธิบายด้วยตัวเองได้ไหม

- [ ] อธิบายได้ว่าทำไม tag ไม่ใช่ deployment
- [ ] อธิบายผลถ้า hotfix ไม่กลับ develop
- [ ] บอกได้ว่า revert โค้ดไม่กู้ tracking events ที่สูญหาย

ติ๊กเมื่อมีหลักฐานหรืออธิบายพร้อมตัวอย่างได้; ข้อที่ติดให้บันทึกสาเหตุ/สิ่งที่จะลองต่อ ไม่ต้องคิดคะแนน ดู [วิธีตรวจตัวเอง](learning-guide.md) และ [แบบบันทึกผล](../../templates/learning-evidence.md)

## References

- [Git branching and merging](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)
- [git revert](https://git-scm.com/docs/git-revert)
- [Original Git flow และข้อควรเลือกตามบริบท](https://nvie.com/posts/a-successful-git-branching-model/)

---

[สารบัญหลักสูตร](../../README.md) · [วิธีทำ lab และตรวจตัวเอง](learning-guide.md)
