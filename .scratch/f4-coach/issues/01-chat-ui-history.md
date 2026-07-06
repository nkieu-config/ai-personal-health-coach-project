# F4-01: Chat UI + เก็บประวัติ

Status: ready-for-human
Owner: C
Sprint: 2
Priority: M
Refs: FR-4.1, FR-4.5

## งาน

- [ ] หน้าแชท: ประวัติจาก `chat_messages`, กล่องพิมพ์, loading ระหว่างรอ (NFR-2 ~10 วิ)
- [ ] บันทึกทั้ง user และ coach message ลง DB
- [ ] ปุ่มเริ่มบทสนทนา (chip): "ช่วยดู pattern สัปดาห์นี้", "อยากตั้งเป้าสัปดาห์หน้า" — ลดกำแพงไม่รู้จะพิมพ์อะไร
- [ ] ข้อความกำกับ safety ถาวรท้ายหน้า (F0-03)

## Acceptance criteria

- ปิดหน้าแล้วกลับมา ประวัติยังอยู่
- Gemini ล่ม → ข้อความสุภาพ + ปุ่ม retry ไม่ crash

## Comments
