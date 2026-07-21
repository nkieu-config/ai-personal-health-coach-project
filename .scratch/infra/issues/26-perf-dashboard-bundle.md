# INFRA-26: dashboard โหลด JS หนักกว่าทุกหน้า 61% + re-render เกินจำเป็น 2 จุด

Status: done
Owner: A
Sprint: 3
Priority: M — กระทบความเร็วตอน demo วัน pitch (เน็ตในห้องพิตช์คุมไม่ได้)
Refs: src/components/dashboard/pillar-charts.tsx, src/components/dashboard/disruptor-overlay.tsx, src/components/coach/message-variants.tsx

ตรวจตาม Vercel React Best Practices (70 กฎ) แล้ววัดขนาด bundle จริงจาก `npm run build`

## 1. Recharts ทำให้ /dashboard หนักกว่าทุกหน้า 103 KB (`bundle-dynamic-imports`)

วัดจาก `.next/static/chunks` หลัง build:

| Route | JS gzip |
| --- | --- |
| ทุกหน้า (baseline ร่วม) | 169 KB |
| `/dashboard` | **272 KB** |

ส่วนต่างทั้งหมดคือ chunk เดียว (364 KB ดิบ / **103 KB gzip**) ที่มาจาก
`import { BarChart, ... } from "recharts"` แบบ static ใน `pillar-charts.tsx`
ยืนยันแล้วว่า chunk นี้ถูกอ้างจาก `dashboard/page_client-reference-manifest.js` ที่เดียว
— ไม่ได้ปนอยู่ใน baseline ที่หน้าอื่นโหลด

ผลคือ dashboard ต้องดาวน์โหลด + parse ครบ 103 KB ก่อนหน้าจะ interactive
ทั้งที่กราฟแสดงทีละแท็บเดียว และ `ResponsiveContainer` ของ shadcn วัดความกว้างฝั่ง client อยู่แล้ว
(SSR ของกราฟจึงแทบไม่มีเนื้อหาให้เสียอยู่แล้ว)

## 2. `useEffect` ผูก listener ใหม่ทุกครั้งที่เมาส์ผ่านกราฟ (`rerender-dependencies`)

`useDisruptorMarkers()` ใน `disruptor-overlay.tsx`:

```ts
}, [activeDisruptor]);
```

effect อ่านแค่ `activeDisruptor?.isLocked` (boolean) แต่ dep เป็น object ทั้งก้อน
ซึ่ง `handleMarkerHover` สร้างใหม่ทุกครั้งที่ hover marker (`{ ...data, x, y, isLocked }`)
→ ถอด/ใส่ `document` click listener ใหม่ทุกการ hover

## 3. พิมพ์ในแชท 1 ตัวอักษร = re-render ทุกฟองข้อความ (`rerender-memo`)

`chat-client.tsx` ถือ `inputValue` เป็น state ในคอมโพเนนต์เดียวกับ list (824 บรรทัด, 11 `useState`)
และ `UserMessage` / `CoachMessage` ไม่ได้ memo → ทุก keystroke re-render ทุกบับเบิล

ที่ ~10 ข้อความในเดโมยังไม่รู้สึก แต่เป็นหนี้เชิงโครงสร้างที่ควรกันไว้

## ขอบเขต

- ข้อ 1: ห่อ `PillarCharts` ด้วย `next/dynamic` + `ssr: false` ผ่าน client wrapper
  (docs ของ Next 16 ที่ `node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md`
  ระบุชัดว่า `ssr: false` ใช้ใน Server Component ไม่ได้ ต้องย้ายเข้า Client Component)
  · skeleton ต้องสูงเท่าการ์ดจริงเพื่อไม่ให้เกิด CLS
- ข้อ 2: ยกค่า boolean ออกมาแล้วใช้เป็น dep
- ข้อ 3: `memo` ที่ `UserMessage` / `CoachMessage` เท่านั้น — **ไม่แตะโครงสร้าง `chat-client.tsx`**
  (ไฟล์ของสายโค้ช · เหลือ 9 วันถึงพิตช์ · การรื้อ state ออกเป็น composer เสี่ยงเกินกำไร)

## ไม่ต้องแก้ (ตรวจแล้วผ่าน)

- `server-cache-react` — `cache()` ครบที่ `createClient` / `getCurrentUser` / `getProfile`
- `async-parallel` — `Promise.all` 6 จุด รวม `chat/context.ts` ที่ยิง 4 query พร้อมกัน
- `async-suspense-boundaries` — dashboard/goals ห่อการ์ดช้าด้วย `Suspense` แล้ว
- `bundle-barrel-imports` — barrel 2 ตัว (`@/lib/ai`, `@/lib/patterns`) เป็น server-only
  และ `@/lib/ai` เป็น guardrail ที่ `AGENTS.md` บังคับ → กฎเรโปชนะ
- lucide-react — Next 16 ใส่ไว้ใน `optimizePackageImports` default แล้ว
  (`node_modules/next/dist/server/config.js:988`) ไม่ต้องตั้งเอง

## Definition of done

- [x] chunk recharts ไม่อยู่ใน payload แรกของ `/dashboard`
- [x] e2e กราฟ 4 แท็บยังเขียว (`routes.spec.ts` — วัดความสูงแท่งจริง)
- [x] ด่าน CI ครบ 5 + `npm run e2e`

## Comments

### 21 ก.ค. 2026 — A

แก้ครบ 3 ข้อ

- ข้อ 1 → `pillar-charts-lazy.tsx` (client wrapper + `ssr: false` + skeleton สูงเท่าการ์ดจริง)
  `dashboard/page.tsx` เปลี่ยน import อย่างเดียว ไม่แตะ `pillar-charts.tsx`
- ข้อ 2 → ยก `isLocked` ออกมาเป็นตัวแปร แล้วใช้เป็น dep เดียว · `exhaustive-deps` ไม่บ่นเพิ่ม
- ข้อ 3 → `memo` ที่ `UserMessage` / `CoachMessage` เท่านั้น

**พิสูจน์ในเบราว์เซอร์จริง** (prod build + บัญชีปาล์ม, `next start` พอร์ต 3100):

- chunk recharts ไม่ถูกอ้างใน HTML แรกของ `/dashboard` แล้ว — โหลดทีหลัง 360 KB ดิบ / 102 KB gz
- กราฟยังวาดแท่งจริง 14 แท่ง

ด่าน: format ✓ · lint ✓ (เหลือ warning เดิม 1 อันที่ `chat-client.tsx:98` ไม่ใช่ของใหม่) ·
tsc ✓ · unit 135 ✓ · build ✓ · **e2e 61 ผ่าน 0 พัง**

ข้อ 3 แก้แค่ผิวเดียว — ต้นเหตุจริงคือ `inputValue` อยู่ในคอมโพเนนต์เดียวกับ list
ถ้าจะรื้อให้จบต้องแยก composer ออกมา ซึ่งไม่ควรทำก่อนพิตช์
