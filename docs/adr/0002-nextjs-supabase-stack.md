# ADR-0002: Tech Stack — Next.js + Supabase, Deploy บน Vercel

- **Status:** Accepted
- **Date:** 2026-07-06

## Context

ทีม 4 คนทักษะ fullstack ใกล้เคียงกัน มีเวลา 3.5 สัปดาห์ ไม่มีงบประมาณ และไม่มีเวลาเรียน stack ใหม่ ทางเลือกที่พิจารณา: Next.js + Supabase กับ React + FastAPI (Python)

## Decision

- **Next.js (App Router, TypeScript)** — frontend + API routes ในโปรเจกต์เดียว
- **Supabase (free tier)** — Postgres, Auth, Row Level Security
- **Tailwind CSS + shadcn/ui** — UI components สำเร็จรูป
- **Vercel (free tier)** — deploy อัตโนมัติจาก GitHub

## Consequences

- ภาษาเดียว (TypeScript) ทั้งระบบ — ทุกคนในทีมทำได้ทุกส่วน แบ่งงานตาม feature ได้ตามแผน
- Supabase Auth + RLS ให้ privacy requirement (ผู้ใช้เห็น/แก้/ลบได้เฉพาะข้อมูลตัวเอง) แทบไม่ต้องเขียนเอง
- ทั้งหมด free tier — งบ 0 บาทตามข้อจำกัดทีม
- แลกกับ: ผูกกับ Supabase ecosystem — ยอมรับได้เพราะเป็น prototype
