# Verification report

Environment inspected 2026-10-09: macOS arm64, Node 22.22.3, npm 12.1.0, Docker client 29.8.2/server 29.8.1 (Desktop 4.93.0). Docker server ตอบได้ ไม่ได้แปลว่า commerce lab ผ่านแล้ว

Account-dependent checks (GitHub PR, LINE OA, Login, ngrok, GA4) ยังไม่ได้ทำ ไม่มีการเปิดบัญชี/Provider/tunnel ในนามผู้ใช้ Windows/Linux setup ยังไม่ได้ทดลองจริง

Runtime tests และ Git rehearsal จะบันทึกเมื่อรันจริง ไม่ถือว่า documentation self-review เป็น runtime verification

## 2026-10-09: foundation

- HTTP example: automated request ผ่าน status/body/query assertions และหยุด server หลังตรวจ
- Local Markdown links: 11 ลิงก์ผ่าน (ก่อนเพิ่ม commerce chapter)
- Validator RED: 18 tests fail เพราะ `Not implemented`; GREEN: 18/18 passed
- `npm ci`, `npm run typecheck`, `npm audit`: ผ่าน; audit 0 vulnerabilities หลัง pin Vitest 4.1.11
- พบ npm peer-resolution crash ขณะ update Vitest; stack ชี้ Arborist loadPeerSet; regenerate lock ด้วย `npm install --legacy-peer-deps` แล้วพิสูจน์ `npm ci` ปกติผ่าน ไม่ต้องใช้ flag ตอนผู้เรียนติดตั้ง
- Node dependencies: TypeScript 6.0.2, Vitest 4.1.11, @types/node 22.19.15; lockfile รวมแล้ว
- Git rehearsal/PR จริงยังไม่ได้รัน; ตัวอย่างยังรอ manual acceptance
- Commerce smoke RED: exit 7 เพราะ storefront ยังไม่มี; config validation ผ่าน; runtime setup กำลังดำเนินการ

## 2026-10-09: commerce/data runtime

- Compose core setup ผ่าน: WordPress 7.1.3/PHP8.3, WooCommerce 11.2.0, MariaDB 11.4.8, Nginx 1.28.0
- Docker Desktop bind mount จาก Documents ถูกปฏิเสธ; เปลี่ยนเป็น build contexts แล้ว runtime ผ่าน ไม่ปรับ security settings ของเครื่อง
- `bash tests/smoke.sh`: storefront/admin boundary/DB not published/persistence หลัง app restart ผ่าน
- SQL fixture answers: missing order-b, duplicate order-c surplus=1, eligible total minor=59700
- `npm test`: 46 passed; `npm run typecheck`: ผ่าน หลัง explicit node types และแยก Vitest จาก Playwright
- `node --test labs/commerce/tests/snapshot-integrity.test.mjs`: 1 passed; RED ก่อน implementation บันทึกไว้
- `npm run test:e2e`: 1 browser checkout test ผ่าน (order completed, purchase accepted, value/currency/transaction contract); เคย fail เพราะ block checkout/default template จึงแก้ seed ให้ classic shortcode และ assertion ตาม semantic heading
- Collector actual MariaDB persistence: first POST 202 → restart service → same event ID 200 duplicate
- `bash tests/failover.sh`: app A stop แล้ว storefront/shared asset ยังผ่าน app B; primary A เปิดกลับด้วย trap
- Git local sandbox rehearsal: release/hotfix/conflict/revert ผ่าน ไม่มี push ไป production sandbox
- Markdown local links 28 และ shell syntax ผ่าน
- Browser runner มี NO_COLOR/FORCE_COLOR warning จาก environment; ไม่กระทบ assertions
- LINE/mobile/ngrok/GA4/Login/Claude account actions และ Windows/Linux runtime ยังไม่ verified

## Recovery และ independent review

- Database outage: หยุด DB แล้ว storefront HTTP 500 ตามคาด เปิด DB กลับและ health ผ่าน
- Core snapshot `backups/20261009T102107Z`: SHA256 manifest + identity, SQL/content และ order summary; backup ไม่อยู่ Git
- Isolated restore round2 ผ่าน: wp_options count 358, orders count/value minor 2:39800 และ uploaded synthetic asset ตรง snapshot; primary project/volumes ไม่ถูกเขียนทับ
- Restore attempt แรก import สำเร็จแต่ wrapper compare fail เพราะ first-run build output ปน stdout ของ summary; แยก explicit build ก่อน capture แล้ว verify ใน isolated round2 โดยไม่ลบข้อมูลเก่า
- Initial review พบสาม Important; เพิ่ม RED tests และแก้ item comparison, strict source type, snapshot integrity ก่อน rerun GREEN
- LINE API/Login guided exercises แทน live implementation เป็น deliberate extension scope; ไม่กล่าวว่า routes นี้มี bot/auth implementation แล้ว
- CI workflow รัน pure/API/typecheck/snapshot integrity; Docker/UI/recovery ไม่เป็น CI gates ในรุ่นนี้
- Staged-file/credential scan 90 files ผ่าน ไม่พบ generated passwords/.env/node_modules/backups/test-results
- Scoped independent re-review: ทั้งสาม Important ADDRESSED ไม่มี Important ใหม่ใน fix scope; runtime tests เป็น executor evidence
- Final `npm ci/test/typecheck/audit` ผ่าน, 46 tests; snapshot integrity 1 test; browser E2E 1 test ผ่านหลัง rebuild ล่าสุด
- Core backup ไม่รวม eventdb/LINE/GA4; restore validation ไม่พิสูจน์ end-to-end recovery ทุก store; ระบุในบท reliability
