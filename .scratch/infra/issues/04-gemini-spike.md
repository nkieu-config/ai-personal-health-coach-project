# INFRA-04: Gemini spike + โครง lib/ai

Status: ready-for-human
Owner: C
Sprint: 0
Priority: M
Refs: ADR-0003, docs/07 (system prompt กลาง)

## งาน

- [ ] สมัคร Gemini API key (free tier) — key กลางของทีม เก็บใน env
- [ ] สร้าง `lib/ai`: ฟังก์ชันเดียวรับ (systemPrompt, messages | prompt, jsonSchema?) คืนข้อความ/JSON
- [ ] แนบ system prompt guardrail จาก docs/07 เป็น default ทุก call
- [ ] ลองยิงภาษาไทย 5 เคส รวมเคสต้องห้าม (ขอแผนลดน้ำหนัก, ถามวินิจฉัยโรค) — บันทึกผลใน Comments
- [ ] วัด latency + สังเกต rate limit จริงของ free tier

## Acceptance criteria

- เรียกจาก API route แล้วได้คำตอบภาษาไทยผ่าน guardrail
- โครงรองรับสลับ provider ได้ (interface ไม่ผูก Gemini)

## Comments
