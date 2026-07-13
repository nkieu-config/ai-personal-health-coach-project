"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { deleteCheckin } from "@/lib/checkins/actions";
import { formatThaiDate } from "@/lib/checkins/date";
import { buildCheckinSummary } from "@/lib/checkins/summary";
import type { Checkin } from "@/lib/patterns/types";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function HistoryRow({ checkin }: { checkin: Checkin }) {
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const { lines } = buildCheckinSummary(checkin);

  function remove() {
    setError(null);
    startTransition(async () => {
      const result = await deleteCheckin(checkin.checkinDate);
      if ("error" in result) {
        setError(result.error);
        setConfirming(false);
      }
    });
  }

  return (
    <Card>
      <CardContent className="space-y-3 py-4">
        <p className="font-medium">{formatThaiDate(checkin.checkinDate)}</p>

        <ul className="space-y-1 text-sm text-muted-foreground">
          {lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>

        {error && <p className="text-sm text-destructive">{error}</p>}

        {confirming ? (
          <div className="flex gap-2">
            <Button
              variant="destructive"
              size="sm"
              className="flex-1"
              onClick={remove}
              disabled={pending}
            >
              {pending ? "กำลังลบ…" : "ยืนยันลบบันทึกวันนี้"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setConfirming(false)}
              disabled={pending}
            >
              ยกเลิก
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              href={`/checkin/edit/${checkin.checkinDate}`}
              className={buttonVariants({ variant: "outline", size: "sm", className: "flex-1" })}
            >
              <Pencil className="size-4" />
              แก้ไข
            </Link>
            <Button variant="ghost" size="sm" onClick={() => setConfirming(true)}>
              <Trash2 className="size-4" />
              ลบ
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function CheckinHistory({ checkins }: { checkins: Checkin[] }) {
  if (checkins.length === 0) {
    return (
      <Card>
        <CardContent className="space-y-3 py-8 text-center">
          <p className="text-sm text-muted-foreground">ยังไม่มีบันทึกย้อนหลัง</p>
          <Link href="/checkin" className={buttonVariants({ className: "w-full" })}>
            บันทึกวันนี้
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {checkins.map((checkin) => (
        <HistoryRow key={checkin.checkinDate} checkin={checkin} />
      ))}
    </div>
  );
}
