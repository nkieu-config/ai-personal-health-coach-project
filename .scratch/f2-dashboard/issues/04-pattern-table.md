# F2-04: ตาราง Pattern → ความหมาย → Next Step

Status: ready-for-human
Owner: B
Sprint: 2
Priority: M
Refs: FR-2.3, โจทย์ Feature 2, output schema จาก F3-03
Blocked by: 01

## งาน

- [ ] Render ผลจาก `ai_outputs` (kind: pattern_analysis) เป็นตาราง 4 คอลัมน์: ด้าน / pattern ที่พบ / ความหมาย / next step
- [ ] สถานะ loading ระหว่าง generate + ปุ่ม refresh
- [ ] ข้อมูล < 7 วัน → แสดงข้อความ "ยังไม่พอวิเคราะห์" จาก F3-04
- [ ] มือถือ: ตารางพับเป็นการ์ดรายแถว

## Acceptance criteria

- ตรงรูปแบบตารางในโจทย์ Feature 2
- Gemini ล่ม → แสดง cache ล่าสุด ไม่ crash

## Comments
