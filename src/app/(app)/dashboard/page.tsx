import Link from "next/link";
import { CalendarCheck } from "lucide-react";
import { getCheckins } from "@/lib/checkins/queries";
import { MAX_BACKFILL_DAYS } from "@/lib/checkins/validate";
import { PageContainer } from "@/components/page-container";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { ComingSoon } from "@/components/coming-soon";

export default async function DashboardPage() {
  const checkins = await getCheckins(MAX_BACKFILL_DAYS);

  if (checkins.length === 0) {
    return (
      <PageContainer width="content" className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">ภาพรวมสุขภาพ</h1>
          <p className="text-sm text-muted-foreground">
            ดูแนวโน้มสุขภาพและคำแนะนำจากบันทึกสุขภาพรายวันของคุณ
          </p>
        </div>

        <Card className="flex flex-col items-center justify-center p-8 text-center border-dashed">
          <CardContent className="flex flex-col items-center justify-center space-y-4 pt-6 max-w-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CalendarCheck className="size-6" />
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">ยังไม่มีข้อมูลสุขภาพ</h2>
              <p className="text-sm text-muted-foreground">
                บันทึกสุขภาพรายวันครั้งแรกของคุณเพื่อเริ่มต้นวิเคราะห์แนวโน้มสุขภาพทั้ง 3 ด้าน (การกิน การนอน และการเคลื่อนไหว)
              </p>
            </div>
            <Link href="/checkin" className={buttonVariants({ className: "w-full sm:w-auto" })}>
              เช็คอินวันนี้
            </Link>
          </CardContent>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer width="content" className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">ภาพรวมสุขภาพ</h1>
        <p className="text-sm text-muted-foreground">
          ดูแนวโน้มสุขภาพและคำแนะนำจากบันทึกสุขภาพรายวันของคุณ
        </p>
      </div>
      <ComingSoon title="ภาพรวมสุขภาพ" issue="F2-01 / F2-02" owner="แพรรี่" />
    </PageContainer>
  );
}

