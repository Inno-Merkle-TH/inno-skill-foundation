# LINE journey test cases

| Case | Expected |
|---|---|
| Add friend | greeting ตาม config |
| Rich menu shop | shop เดิมและ UTM ตาม tracking plan |
| In-app → external browser | ตรวจ continuity ไม่สมมติ session เหมือนเดิม |
| ngrok warning | บันทึก friction ไม่ตีความว่า app bug |
| Consent deny | checkout ได้ ไม่มี nonessential analytics |
| Close browser before response | order/event state ต้องตรวจแยก |
| Login cancel (extension) | ไม่มี identity link ที่ยังไม่พิสูจน์ |
| Block OA (extension) | notification fail ไม่เปลี่ยน order success |
| Forged order ID (extension) | ไม่คืนรายละเอียดคำสั่งซื้อผู้อื่น |
