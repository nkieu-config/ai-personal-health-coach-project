# ADR-0001: Prototype เป็น Responsive Web App

- **Status:** Accepted
- **Date:** 2026-07-06

## Context

Mission ต้องการ prototype ที่ demo workflow หลักได้ครบ (check-in, dashboard, AI coach, weekly reflection) ภายใน 30 ก.ค. 2026 ทีมมี 4 คน ทางเลือกที่พิจารณา: web app, LINE chatbot, mobile app (Expo), และ web + LINE notification

## Decision

สร้างเป็น **responsive web app** ตัวเดียว ใช้ได้ทั้งจอมือถือและ desktop

## Consequences

- Demo บนจอโปรเจกเตอร์ตอน pitch ได้โดยตรง และเปิดจากมือถือกรรมการได้ทันทีผ่าน URL
- Dashboard และ visualization ทำได้เต็มที่ ซึ่งเป็นจุดให้คะแนนสำคัญ (Prototype Quality)
- ไม่มี overhead ของ LINE Messaging API หรือ app store build
- แลกกับ: ไม่มี push notification จริง — reminder ทำเป็น in-app เท่านั้น และบันทึกไว้ใน limitations ว่าเป็น future improvement
