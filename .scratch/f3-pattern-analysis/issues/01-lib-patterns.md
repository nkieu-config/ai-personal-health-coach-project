# F3-01: lib/patterns — คำนวณ pattern candidates

Status: ready-for-human
Owner: C
Sprint: 1
Priority: M
Refs: FR-3.1, docs/07 (ตาราง candidates 4 ตัว)

## งาน

- [ ] ฟังก์ชัน pure รับ `checkins[]` คืน candidates 4 ตัวตาม docs/07: นอนน้อย×ข้ามมื้อเช้า/เครื่องดื่มหวาน, deadline×นอนดึก+เคลื่อนไหวน้อย, เคลื่อนไหว×นอน/energy วันถัดไป, กินครบมื้อ×energy
- [ ] Heuristic ความชัด: ต่างกัน ≥ 20% และ ≥ 3 วันต่อกลุ่ม จึงนับเป็น candidate
- [ ] Unit tests: เคสมี pattern ชัด, ไม่มี pattern, ข้อมูลขาดวัน, กลุ่มเล็กเกิน

## Acceptance criteria

- Tests ผ่านทั้งหมด — นี่คือส่วนเดียวของระบบที่ต้องมี unit test เพราะเป็นแหล่งตัวเลขทั้งหมดที่ AI อ้าง
- ไม่มีการเรียก AI ในโมดูลนี้เลย

## Comments
