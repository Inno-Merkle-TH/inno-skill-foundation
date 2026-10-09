# Extension — LINE Login

## Prerequisites / mental model

OA/Core ผ่านก่อน มี mentorดู OAuth/OIDC Login พิสูจน์ identity ไม่เท่ากับเป็นเพื่อน OA/consent tracking ไม่เชื่อ display name/email เป็นหลักฐานผูกบัญชี

## Lab A: ออกแบบและตรวจ callback แบบ offline

Core ยังไม่มี auth routes ให้ทำ sequence diagram และ test table ก่อน ไม่ต้องใช้บัญชีหรือ token จริง:

1. วาด browser → start → LINE authorize → callback → token verification → server session ระบุว่า state/nonce ถูกสร้าง เก็บ เทียบ และใช้แล้วทิ้งตรงไหน
2. ทำตาราง synthetic fixtures ด้านล่าง ใส่ expected side effects: สร้าง session หรือปฏิเสธ และต้องไม่มี identity link ที่ไม่ได้ยืนยัน
3. ใน sandbox ที่พัฒนา extension สร้าง unit tests ของ callback policy โดย inject token verifier เป็น fake; ห้ามใช้ fake นี้แทน live verification
4. ก่อนทำ live lab เพิ่ม integration tests ให้พิสูจน์ว่า production verifier ถูกเรียกจริงและ reject invalid token ได้

| กรณี | Expected |
|---|---|
| state ตรง, token ผ่าน verifier, nonce ตรง | สร้าง session หลังตรวจครบ |
| state ไม่ตรง/หาย หรือ callback ใช้ซ้ำ | ปฏิเสธ ไม่สร้าง session/link |
| issuer/audience/expiry/nonce ผิด | ปฏิเสธ ไม่เชื่อ payload ที่ decode ได้ |
| ผู้ใช้ cancel | ไม่ login; guest checkout ตาม policy ยังใช้ได้ |
| login สำเร็จ แต่ยังไม่ friend OA | ไม่แก้ friend/analytics consent โดยอนุมาน |

Expected artifact: diagram + test matrix; หากยังไม่เขียน integration ให้ระบุ design-only ไม่อ้างว่า live login ผ่าน

## Lab B: live Login — guided implementation

1. สร้าง LINE Login channel ภายใต้ Provider ที่เหมาะสมกับร้านเดิม
2. ออกแบบ callback path และทำ service/proxy wiring ด้านล่างก่อน จากนั้นตั้ง callback HTTPS ให้ตรง path/scheme/domain ใน Console บันทึก URL ไม่ใส่ secret
3. เขียน server-side `/auth/line/start` สร้าง random state และ OIDC nonce ผูกกับ session; redirect ไป authorization endpoint ตาม official docs
4. callback ตรวจ state ก่อน token exchange; validate ID token signature/issuer/audience/expiry/nonce ด้วย vetted library ห้ามแค่ base64 decode
5. เก็บ session ฝั่ง server ใช้ Secure/HttpOnly/SameSite ที่เหมาะกับ callback flow แล้วแสดงสถานะ login โดยไม่เผย token
6. เพิ่ม account linking ที่ต้องพิสูจน์เจ้าของ web account ป้องกัน login CSRF/session fixation/account mismatch

### Service/proxy wiring ก่อน live Login

1. ใน sandbox เพิ่ม `/auth/line/start`, callback ที่เลือก และ logout/session handling ใน Node service; core ไม่มี routes เหล่านี้ ใช้ secret/session configuration ฝั่ง server ที่ inject ผ่าน Compose อย่างชัดเจน ไม่โหลด `labs/line/.env.example` อัตโนมัติ
2. เพิ่ม Nginx location สำหรับ `/auth/line/` ให้ไป `qe-api:3000` แทน WordPress; กำหนด public origin/callback จาก trusted configuration และส่ง scheme/host headers ตาม trust policy ไม่เชื่อ header ที่ client ปลอมเอง ใช้ core mode ก่อนหรือแก้ HA config ด้วยถ้าจะทดสอบ HA
3. จาก sandbox `labs/commerce` รัน `docker compose --profile tracking up -d --build qe-api proxy` แล้วตรวจ route ด้วย fake provider/verifier เฉพาะ local tests: start redirect ไป endpoint ที่กำหนด, invalid state/callback ถูกปฏิเสธ และไม่ใช่หน้า WordPress
4. ก่อน live สลับใช้ real provider/verifier, ทำ [public tunnel preflight](../learning-guide.md#public-tunnel-preflight), ตั้ง HTTPS callback ตรง Console และตรวจ session cookie flags กับ redirect จริง ไม่ลด cookie security เพื่อให้ HTTP local fake test ผ่าน
5. แยก Node login session ออกจาก WordPress customer session: ถ้าต้อง login ร้านค้าจริงต้องพัฒนา verified account/session bridge เพิ่ม ห้ามถือว่า Node login ผ่านแล้ว WooCommerce รู้จัก user โดยอัตโนมัติ

Expected: route, session lifecycle และ identity bridge มีหลักฐานแยกกัน; ถ้าทำได้แค่ standalone Login ให้ระบุว่ายังไม่เชื่อม web customer

## Tests / expected

Valid login, cancel, state mismatch, expired token, invalid issuer/audience/nonce, callback replay, account mismatch และ login สำเร็จแต่ยังไม่ friend OA ต้องมี evidence แยกกัน รุ่น core ไม่ได้ implement live Login; extension เป็นโจทย์พัฒนาร่วม mentor ไม่บังคับผ่านหลักสูตร

## Troubleshooting / cleanup

Callback mismatch: ตรวจ console กับ server configuration ไม่ใช้ wildcard เพื่อเลี่ยงตรวจ Token/secret ใน URL: หยุดและ rotate ตาม incident procedure Logout session และปิด tunnel ไม่ปิด consent/privacy checks เพื่อให้ผ่าน

## References

- [Integrate LINE Login](https://developers.line.biz/en/docs/line-login/integrate-line-login/)
- [Verify ID token](https://developers.line.biz/en/reference/line-login/)

## Checklist — ลงมือทำครบหรือยัง

- [ ] มี diagram/state/nonce/session lifecycle และ negative matrix
- [ ] แยก fake verifier unit tests จาก real verifier integration tests
- [ ] live callback URL ตรง console หรือระบุ integration ยังไม่ทำ
- [ ] ตรวจ cancel/replay/ownership และไม่ส่ง token ลง client logs
- [ ] logout session/ปิด tunnel และ redact evidence หลัง live test

## Checklist — อธิบายด้วยตัวเองได้ไหม

- [ ] อธิบาย state, nonce และ ID token verification ทำหน้าที่ต่างกันอย่างไร
- [ ] บอกได้ว่าการ decode JWT ไม่ยืนยัน authenticity
- [ ] อธิบาย login, OA friend และ analytics consent เป็นคนละสถานะ

ติ๊กเฉพาะสิ่งที่ทำจริง แยก offline/design/implemented/live ใน [learning evidence](../../../templates/learning-evidence.md); ไม่มีบัญชีให้เก็บ offline lab และระบุ live ยังไม่ทำ

## Cleanup ของ offline lab

เก็บ fixture/tests ใน sandbox ไม่มีบัญชีหรือ services ให้ลบ หากทดลอง live ให้ทำ cleanup ด้านบนและตรวจว่า credentials ไม่อยู่ใน staged diff

---

[สารบัญ](../../../README.md) · [วิธีตรวจตัวเอง](../learning-guide.md)
