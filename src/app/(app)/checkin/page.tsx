import Link from "next/link";
import { CalendarPlus, History } from "lucide-react";
import { CheckinForm } from "@/components/checkin/checkin-form";
import { buttonVariants } from "@/components/ui/button";
import { daysAgo, formatThaiDate, today } from "@/lib/checkins/date";
import { getCheckinByDate } from "@/lib/checkins/queries";

export default async function CheckinPage() {
  const date = today();
  const yesterday = daysAgo(1);

  const [existing, yesterdayCheckin] = await Promise.all([
    getCheckinByDate(date),
    getCheckinByDate(yesterday),
  ]);

  return (
    <div className="space-y-4">
      {!yesterdayCheckin && (
        <Link
          href={`/checkin/edit/${yesterday}`}
          className="flex items-center gap-3 rounded-lg border border-dashed p-3 text-sm transition-colors hover:bg-muted"
        >
          <CalendarPlus className="size-4 shrink-0 text-primary" />
          <span>
            ยังไม่ได้บันทึกของ{formatThaiDate(yesterday)}
            <span className="block text-xs text-muted-foreground">
              ลืมกรอกก่อนนอนก็ย้อนกลับไปบันทึกได้
            </span>
          </span>
        </Link>
      )}

      <CheckinForm date={date} existing={existing} />

      <Link
        href="/checkin/history"
        className={buttonVariants({ variant: "ghost", className: "w-full" })}
      >
        <History className="size-4" />
        ดูบันทึกย้อนหลัง
      </Link>
    </div>
  );
}
