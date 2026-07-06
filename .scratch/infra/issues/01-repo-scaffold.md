# INFRA-01: ตั้ง GitHub repo + Next.js scaffold

Status: claimed
Owner: D
Sprint: 0
Priority: M
Refs: ADR-0002, docs/06 (โครงสร้างโปรเจกต์)

## งาน

- [ ] สร้าง GitHub repo (private) เชิญทีมครบ 4 คน
- [x] Next.js (App Router, TypeScript) + Tailwind + shadcn/ui
- [x] โครงโฟลเดอร์ตาม docs/06: `app/`, `lib/supabase`, `lib/patterns`, `lib/ai`, `components/`, `scripts/`
- [ ] Branch protection บน `main` + PR template สั้น ๆ
- [x] README วิธี setup local (env vars ที่ต้องมี)

## Acceptance criteria

- ทีมทุกคน clone แล้ว `npm run dev` ขึ้นภายใน 10 นาที
- Push ตรง `main` ไม่ได้ ต้องผ่าน PR

## Comments

2026-07-06 (AI scaffold): scaffold เสร็จแล้ว — Next.js 16.2 + Tailwind v4 + shadcn (button, card, input, label, badge, textarea), โครง lib ครบ, `npm run build` และ `npm run lint` ผ่าน, `git init` แล้วแต่ยังไม่ commit
ข้อควรรู้: Next.js 16 เปลี่ยน `middleware.ts` เป็น `src/proxy.ts` (ทำไว้แล้วพร้อม auth guard) — อ่าน `node_modules/next/dist/docs/` ก่อนเขียนโค้ดเพราะ API ต่างจากที่คุ้น
เหลือของที่ต้องใช้บัญชีทีม: สร้าง GitHub repo + push, ตั้ง branch protection, PR template
