# F7-02: ลบข้อมูลทั้งหมด / ลบบัญชี

Status: ready-for-human
Owner: D
Sprint: 1
Priority: M — ห้ามตัด (เกณฑ์ Privacy)
Refs: FR-7.2, docs/05 (on delete cascade)
Blocked by: 01

## งาน

- [ ] ปุ่ม "ลบข้อมูลทั้งหมด" (เหลือบัญชี) และ "ลบบัญชีถาวร" — confirm 2 ชั้นพิมพ์ยืนยัน
- [ ] ลบบัญชีผ่าน service role ฝั่ง server → cascade ลบทุกตาราง
- [ ] ทดสอบว่าไม่เหลือข้อมูลตกค้างตารางไหนเลย

## Acceptance criteria

- ลบบัญชีแล้ว query ทุกตารางด้วย user_id เดิม = 0 แถว (บันทึกหลักฐานใน Comments)

## Comments
