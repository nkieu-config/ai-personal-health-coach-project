# F6-01: Reflection generation + cache

Status: ready-for-human
Owner: C
Sprint: 3
Priority: M
Refs: FR-6.1, FR-6.3, docs/07 งานที่ 4
Blocked by: (F3-01, F3-02)

## งาน

- [ ] คำนวณสรุปสัปดาห์ด้วยโค้ด: วันที่บันทึก x/7, สถิติ 3 pillars แยกวันมี/ไม่มี disruptor, ผล goal
- [ ] Gemini เขียนตามโครงบังคับ: ความถี่บันทึก / กิน / นอน / เคลื่อนไหว / จุดแข็งที่ควรรักษา / ข้อเสนอ 1–2 ข้อ
- [ ] Generate เมื่อผู้ใช้เปิดดูสัปดาห์ที่จบแล้วและยังไม่มีรายงาน → cache ลง `ai_outputs`
- [ ] สัปดาห์ที่บันทึก < 3 วัน → รายงานสั้นเชิงชวนกลับมา ไม่วิเคราะห์เกินข้อมูล

## Acceptance criteria

- โครงตรงตัวอย่างโจทย์ Feature 6
- ไม่มีคะแนน/เกรด ไม่มีคำตำหนิวันที่ขาด (สุ่มอ่าน 3 ฉบับจาก seed + dogfooding)

## Comments
