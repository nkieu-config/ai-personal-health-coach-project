# ADR-0005: Auth ด้วย Google OAuth + email/password

- **Status:** Accepted
- **Date:** 2026-07-07
- **Supersedes:** ส่วน auth ของ FR-0.1 (เดิม email/password อย่างเดียว)

## Context

F0-01 เดิมทำ email/password (Supabase Auth) แต่ทีมต้องการ **Google login** เพราะเข้ากับหลัก low-burden (ไม่ต้องตั้งรหัส กดปุ่มเดียว เร็วตอน demo) อย่างไรก็ตามมีข้อจำกัด 2 อย่าง:

- **demo/seed account (ADR-0004)** ต้องล็อกอินได้ด้วยรหัส — seed script สร้างบัญชีผ่าน password ไม่ใช่ Google จริง
- ต้องมี **fallback** เผื่อ OAuth มีปัญหาวัน pitch (redirect/consent screen/เน็ต)

## Decision

เปิด **ทั้งสองทาง**:

- **Google OAuth** — ผ่าน Supabase Google provider, flow PKCE: ปุ่ม → `signInWithOAuth({ provider: 'google', redirectTo: <origin>/auth/callback })` → Google → Supabase → `/auth/callback` route แลก code เป็น session แล้ว redirect ตาม onboarding status
- **email/password** — คงไว้สำหรับ demo/seed account + fallback

## Consequences

- ผู้ใช้ทั่วไป (รวมกรรมการ) กดปุ่ม Google ปุ่มเดียวจบ — low-burden
- **ต้อง config นอกโค้ด** (ทำจาก repo ไม่ได้): Google Cloud OAuth client (Client ID/Secret) + Supabase enable Google provider + Redirect URLs allowlist
- **Redirect URLs allowlist** ต้องมี: `http://localhost:3000/**` (dev — รัน dev บนพอร์ต 3000 ให้ตรง), prod `https://personal-healthcoach.vercel.app/**`, และ preview แบบ wildcard `https://*-<vercel-scope>.vercel.app/**`
- **OAuth consent screen**: scope พื้นฐาน (email/profile) ไม่ต้อง verify; ถ้าอยากให้คนนอกทีม (กรรมการ) ล็อกอิน Google ได้ ต้อง publish app — หรือให้กรรมการใช้ **demo account (email/password)** แทน ซึ่งเป็นเหตุผลหนึ่งที่คง password ไว้
- demo/seed account ใช้ email/password → **seed script (INFRA-06) ไม่ต้องแก้**
- callback origin: dev ใช้ `http://localhost` (special-case `NODE_ENV==='development'`), prod/preview ใช้ `x-forwarded-host` (https)
- ความเสี่ยง OAuth ล่มวัน pitch — บรรเทาด้วย email/password + demo account ที่ทำงานโดยไม่พึ่ง Google
