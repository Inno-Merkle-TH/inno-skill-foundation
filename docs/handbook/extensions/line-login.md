# Extension — LINE Login

## Prerequisites / mental model

OA/Core ผ่านก่อน มี mentorดู OAuth/OIDC Login พิสูจน์ identity ไม่เท่ากับเป็นเพื่อน OA/consent tracking ไม่เชื่อ display name/email เป็นหลักฐานผูกบัญชี

## Guided exercise

1. สร้าง LINE Login channel ภายใต้ Provider ที่เหมาะสมกับร้านเดิม
2. ตั้ง callback HTTPS ให้ตรง path/scheme/domain บันทึก URL ไม่ใส่ secret
3. เขียน server-side `/auth/line/start` สร้าง random state และ OIDC nonce ผูกกับ session; redirect ไป authorization endpoint ตาม official docs
4. callback ตรวจ state ก่อน token exchange; validate ID token signature/issuer/audience/expiry/nonce ด้วย vetted library ห้ามแค่ base64 decode
5. เก็บ session ฝั่ง server ใช้ Secure/HttpOnly/SameSite ที่เหมาะกับ callback flow แล้วแสดงสถานะ login โดยไม่เผย token
6. เพิ่ม account linking ที่ต้องพิสูจน์เจ้าของ web account ป้องกัน login CSRF/session fixation/account mismatch

## Tests / expected

Valid login, cancel, state mismatch, expired token, invalid issuer/audience/nonce, callback replay, account mismatch และ login สำเร็จแต่ยังไม่ friend OA ต้องมี evidence แยกกัน รุ่น core ไม่ได้ implement live Login; extension เป็นโจทย์พัฒนาร่วม mentor ไม่บังคับผ่านหลักสูตร

## Troubleshooting / cleanup

Callback mismatch: ตรวจ console กับ server configuration ไม่ใช้ wildcard เพื่อเลี่ยงตรวจ Token/secret ใน URL: หยุดและ rotate ตาม incident procedure Logout session และปิด tunnel ไม่ปิด consent/privacy checks เพื่อให้ผ่าน

## References

- [Integrate LINE Login](https://developers.line.biz/en/docs/line-login/integrate-line-login/)
- [Verify ID token](https://developers.line.biz/en/reference/line-login/)
