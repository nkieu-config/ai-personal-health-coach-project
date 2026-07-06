# ADR-0003: ใช้ Google Gemini Free Tier เป็น AI Engine

- **Status:** Accepted
- **Date:** 2026-07-06

## Context

ส่วน AI (pattern analysis, coach conversation, micro goal, weekly reflection) ต้องใช้ LLM ที่ภาษาไทยดี แต่ทีมไม่มีงบประมาณเลย ทางเลือก free ที่พิจารณา: Google Gemini free tier, Typhoon (SCB 10X), Groq (Llama)

## Decision

ใช้ **Google Gemini free tier (Gemini Flash)** ผ่าน API key ธรรมดา เรียกจาก Next.js API routes ฝั่ง server เท่านั้น

โค้ดฝั่งเรียก AI ให้เขียนผ่าน service module เดียว (`lib/ai/`) ที่รับ prompt เข้า–ส่งข้อความออก เพื่อให้สลับ provider ได้ถ้าเจอปัญหา rate limit

## Consequences

- ฟรีจริง ไม่ต้องผูกบัตร โควตา free tier เพียงพอสำหรับ dogfooding 4 คน + demo
- ภาษาไทยอยู่ในระดับใช้งานได้ดีสำหรับงาน coaching
- Safety guardrail ทำผ่าน system prompt กลางที่ใช้ร่วมทุก feature (ดู [../08-safety-privacy.md](../08-safety-privacy.md))
- ความเสี่ยง rate limit ช่วง demo — บรรเทาด้วย: (1) cache ผลลัพธ์ pattern/reflection ใน DB (2) service module สลับไป Typhoon ได้ (3) เตรียม screenshot สำรองตอน pitch
- API key เก็บใน environment variable ฝั่ง server เท่านั้น ห้ามเรียก Gemini จาก client
