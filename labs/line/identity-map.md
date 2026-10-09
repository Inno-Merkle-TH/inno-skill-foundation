# Identity map exercise

วาด Provider → Messaging API Channel ↔ OA และ Login Channel ↔ web application เติม nonsecret IDs ใน channel inventory แล้ววาด customer-to-LINE link ที่ยืนยันเจ้าของทั้งสองฝั่งได้

คำถาม: ใช้คนละ Provider แล้ว UID ต่างกันจะ reconcile อย่างไร? ทำไม UTM/session cookie ไม่พิสูจน์เจ้าของ LINE account? เป็นเพื่อน OA แปลว่ายินยอม analytics หรือไม่? Login ยกเลิกแล้ว checkout guest ยังทำงานไหม?

## Checklist ก่อนเก็บหลักฐาน

- [ ] วาด Provider/channel/OA/web customer แยกกันได้
- [ ] ใช้ aliases แทน real UID และชี้ trust boundary ก่อน linking
- [ ] อธิบาย friend/login/consent ว่าไม่ใช่สถานะเดียวกัน
