import { describe, expect, it } from "vitest";
import { makeCheckin } from "@/lib/patterns/test-fixtures";
import { daysAgo, today } from "./date";
import { validateCheckin } from "./validate";

const TODAY = "2026-07-14";

describe("validateCheckin", () => {
  it("ผ่านเมื่อค่าถูกต้องครบ", () => {
    expect(validateCheckin(makeCheckin(), TODAY)).toBeNull();
  });

  it("กันบันทึกล่วงหน้า", () => {
    const future = makeCheckin({ checkinDate: "2026-07-15" });
    expect(validateCheckin(future, TODAY)).toBe("บันทึกล่วงหน้าไม่ได้");
  });

  it("กันค่าที่ DB จะ reject (sleep_quality นอกช่วง 1–5)", () => {
    const bad = makeCheckin({ sleepQuality: 9 as 1 });
    expect(validateCheckin(bad, TODAY)).not.toBeNull();
  });

  it("กัน note ยาวเกิน 200 ตัวอักษร", () => {
    const bad = makeCheckin({ note: "ก".repeat(201) });
    expect(validateCheckin(bad, TODAY)).toContain("200");
  });
});

describe("date", () => {
  it("today() คืนรูปแบบ YYYY-MM-DD", () => {
    expect(today()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("daysAgo(0) คือวันนี้ และย้อนหลังได้ถูกวัน", () => {
    expect(daysAgo(0)).toBe(today());
    const [start, end] = [daysAgo(6), daysAgo(0)];
    const diffDays = (Date.parse(`${end}T00:00:00Z`) - Date.parse(`${start}T00:00:00Z`)) / 86_400_000;
    expect(diffDays).toBe(6);
  });
});
