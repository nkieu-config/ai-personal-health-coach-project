import type { Checkin } from "@/lib/patterns/types";

export const NOTE_MAX_LENGTH = 200;

const BED_TIME_BUCKETS = ["before_23", "23_00", "00_01", "01_02", "after_02"];
const ENERGY_LEVELS = ["low", "medium", "high"];

function isBetween(value: number, min: number, max: number) {
  return Number.isFinite(value) && value >= min && value <= max;
}

export function validateCheckin(checkin: Checkin, today: string): string | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(checkin.checkinDate)) {
    return "วันที่ไม่ถูกต้อง";
  }
  if (checkin.checkinDate > today) {
    return "บันทึกล่วงหน้าไม่ได้";
  }
  if (!isBetween(checkin.mealsCount, 0, 3)) {
    return "จำนวนมื้อต้องอยู่ระหว่าง 0–3";
  }
  if (!isBetween(checkin.sweetDrinks, 0, 20)) {
    return "จำนวนเครื่องดื่มหวานไม่ถูกต้อง";
  }
  if (!isBetween(checkin.sleepHours, 0, 24)) {
    return "ชั่วโมงนอนต้องอยู่ระหว่าง 0–24";
  }
  if (!BED_TIME_BUCKETS.includes(checkin.bedTimeBucket)) {
    return "เลือกเวลาเข้านอนก่อน";
  }
  if (!isBetween(checkin.sleepQuality, 1, 5)) {
    return "คุณภาพการนอนต้องอยู่ระหว่าง 1–5";
  }
  if (!ENERGY_LEVELS.includes(checkin.energyLevel)) {
    return "เลือกระดับพลังงานก่อน";
  }
  if (!isBetween(checkin.movementMinutes, 0, 600)) {
    return "นาทีเคลื่อนไหวไม่ถูกต้อง";
  }
  if ((checkin.note?.length ?? 0) > NOTE_MAX_LENGTH) {
    return `บันทึกเพิ่มเติมยาวเกิน ${NOTE_MAX_LENGTH} ตัวอักษร`;
  }
  return null;
}
