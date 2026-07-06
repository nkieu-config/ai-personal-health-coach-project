# INFRA-03: Vercel deploy pipeline

Status: ready-for-human
Owner: D
Sprint: 0
Priority: M
Refs: ADR-0002, docs/06 (Environments)
Blocked by: 01

## งาน

- [ ] เชื่อม repo กับ Vercel — merge เข้า `main` = deploy production อัตโนมัติ
- [ ] ตั้ง env vars: `GEMINI_API_KEY`, Supabase URL/keys (service role ฝั่ง server เท่านั้น)
- [ ] ยืนยันว่าไม่มี secret หลุดใน client bundle (NFR-4)

## Acceptance criteria

- URL production เปิดได้จากมือถือและ desktop
- Preview deploy ต่อ PR ทำงาน

## Comments
