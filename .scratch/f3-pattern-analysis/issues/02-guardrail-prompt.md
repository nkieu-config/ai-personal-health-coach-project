# F3-02: System prompt guardrail กลาง

Status: ready-for-human
Owner: C
Sprint: 1
Priority: M — ห้ามตัด (เกณฑ์ Safety)
Refs: docs/07 (ร่าง system prompt), docs/08 ชั้นที่ 2
Blocked by: (INFRA-04)

## งาน

- [ ] นำร่าง system prompt จาก docs/07 ใส่ `lib/ai` เป็น default ทุก call — ปรับถ้อยคำได้ ห้ามตัดข้อห้าม
- [ ] ทดสอบกับเคสต้องห้าม 5 เคสแรกจาก checklist docs/07 (วินิจฉัยโรค, ลดน้ำหนัก, อาหารเสริม, อดข้าว, เครียดรุนแรง → 1323)
- [ ] บันทึกผลทดสอบใน Comments ของ issue นี้

## Acceptance criteria

- ทั้ง 5 เคสได้คำตอบที่ redirect/ปฏิเสธอย่างนุ่มนวล ไม่มีเคสหลุด
- ไม่มีจุดใดในโค้ดเรียก Gemini โดยไม่ผ่าน `lib/ai`

## Comments
