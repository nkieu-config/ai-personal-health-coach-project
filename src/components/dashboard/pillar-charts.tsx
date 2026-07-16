"use client";

import * as React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ReferenceLine } from "recharts";
import type { Checkin } from "@/lib/patterns/types";
import { daysAgo, formatShortThaiDate } from "@/lib/checkins/date";
import { MOVEMENT_TYPE_LABELS } from "@/lib/checkins/labels";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart";
import { cn } from "@/lib/utils";

// 7/14/30 Days Chart Config
const chartConfig = {
  sleepHours: { label: "ชั่วโมงนอน (ชม.)", color: "var(--chart-1)" },
  mealsCount: { label: "มื้อที่กิน (มื้อ)", color: "var(--chart-2)" },
  sweetDrinks: { label: "เครื่องดื่มหวาน (แก้ว)", color: "var(--chart-5)" },
  walk: { label: MOVEMENT_TYPE_LABELS.walk, color: "var(--chart-3)" },
  stretch: { label: MOVEMENT_TYPE_LABELS.stretch, color: "var(--chart-1)" },
  stairs: { label: MOVEMENT_TYPE_LABELS.stairs, color: "var(--chart-2)" },
  bike: { label: MOVEMENT_TYPE_LABELS.bike, color: "var(--chart-4)" },
  sport: { label: MOVEMENT_TYPE_LABELS.sport, color: "var(--chart-5)" },
} satisfies ChartConfig;

function getPastDates(daysCount: number): string[] {
  const dates: string[] = [];
  for (let i = daysCount - 1; i >= 0; i--) {
    dates.push(daysAgo(i));
  }
  return dates;
}

export function PillarCharts({ checkins, period }: { checkins: Checkin[]; period: number }) {
  const [activeTab, setActiveTab] = React.useState<"sleep" | "eating" | "movement" >("sleep");

  const processedData = React.useMemo(() => {
    const dates = getPastDates(period);
    return dates.map((dateStr) => {
      const checkin = checkins.find((c) => c.checkinDate === dateStr);
      const formattedDay = formatShortThaiDate(dateStr).split(" ")[0]; // Get only day number to keep X-axis clean

      if (!checkin) {
        return {
          day: formattedDay,
          sleepHours: null,
          mealsCount: null,
          sweetDrinks: null,
          walk: null,
          stretch: null,
          stairs: null,
          bike: null,
          sport: null,
        };
      }

      const activeTypes = checkin.movementTypes.filter((t) => t !== "none");
      const minsPerType = activeTypes.length > 0 ? checkin.movementMinutes / activeTypes.length : 0;

      return {
        day: formattedDay,
        sleepHours: checkin.sleepHours,
        mealsCount: checkin.mealsCount,
        sweetDrinks: checkin.sweetDrinks,
        walk: checkin.movementTypes.includes("walk") ? minsPerType : 0,
        stretch: checkin.movementTypes.includes("stretch") ? minsPerType : 0,
        stairs: checkin.movementTypes.includes("stairs") ? minsPerType : 0,
        bike: checkin.movementTypes.includes("bike") ? minsPerType : 0,
        sport: checkin.movementTypes.includes("sport") ? minsPerType : 0,
      };
    });
  }, [checkins, period]);

  const categories = [
    { id: "sleep", label: "ชั่วโมงนอน" },
    { id: "eating", label: "การกิน" },
    { id: "movement", label: "การเคลื่อนไหว" },
  ] as const;

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="pb-4 space-y-4">
        <div className="space-y-1">
          <CardTitle className="text-lg">กราฟแนวโน้มพฤติกรรม (3 Pillars Trend)</CardTitle>
          <CardDescription>กราฟแสดงพฤติกรรมการกิน การนอน และการเคลื่อนไหว ย้อนหลัง {period} วัน</CardDescription>
        </div>
        <div className="flex flex-wrap gap-1.5 bg-muted/40 p-1 rounded-full border w-fit">
          {categories.map((cat) => {
            const active = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={cn(
                  "inline-flex h-8 items-center justify-center rounded-full px-3 text-xs font-semibold transition-all active:scale-95 cursor-pointer select-none",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-background hover:text-foreground"
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent>
        {/* Sleep Chart */}
        {activeTab === "sleep" && (
          <div className="space-y-2">
            <span className="text-xs font-semibold text-muted-foreground block px-1">😴 ชั่วโมงการนอนหลับ</span>
            <ChartContainer config={chartConfig} className="h-44 w-full">
              <BarChart data={processedData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis domain={[0, 12]} axisLine={false} tickLine={false} />
                <ReferenceLine y={6} stroke="var(--destructive)" strokeDasharray="3 3" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="sleepHours" name="sleepHours" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </div>
        )}

        {/* Eating Chart */}
        {activeTab === "eating" && (
          <div className="space-y-2">
            <span className="text-xs font-semibold text-muted-foreground block px-1">🍏 พฤติกรรมการกิน</span>
            <ChartContainer config={chartConfig} className="h-44 w-full">
              <BarChart data={processedData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis domain={[0, "auto"]} axisLine={false} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="mealsCount" name="mealsCount" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="sweetDrinks" name="sweetDrinks" fill="var(--chart-5)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </div>
        )}

        {/* Movement Chart */}
        {activeTab === "movement" && (
          <div className="space-y-2">
            <span className="text-xs font-semibold text-muted-foreground block px-1">🏃‍♂️ การเคลื่อนไหวร่างกาย (นาที)</span>
            <ChartContainer config={chartConfig} className="h-44 w-full">
              <BarChart data={processedData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis domain={[0, "auto"]} axisLine={false} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="walk" name="walk" stackId="move" fill="var(--color-walk)" />
                <Bar dataKey="stretch" name="stretch" stackId="move" fill="var(--color-stretch)" />
                <Bar dataKey="stairs" name="stairs" stackId="move" fill="var(--color-stairs)" />
                <Bar dataKey="bike" name="bike" stackId="move" fill="var(--color-bike)" />
                <Bar dataKey="sport" name="sport" stackId="move" fill="var(--color-sport)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
