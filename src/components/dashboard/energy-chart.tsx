"use client";

import * as React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import type { Checkin } from "@/lib/patterns/types";
import { daysAgo, formatShortThaiDate } from "@/lib/checkins/date";
import { ENERGY_LABELS } from "@/lib/checkins/labels";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  energy: { label: "ระดับพลังงาน", color: "var(--chart-4)" },
} satisfies ChartConfig;

function getPastDates(daysCount: number): string[] {
  const dates: string[] = [];
  for (let i = daysCount - 1; i >= 0; i--) {
    dates.push(daysAgo(i));
  }
  return dates;
}

export function EnergyChart({ checkins, period }: { checkins: Checkin[]; period: number }) {
  const processedData = React.useMemo(() => {
    const dates = getPastDates(period);
    return dates.map((dateStr) => {
      const checkin = checkins.find((c) => c.checkinDate === dateStr);
      const formattedDay = formatShortThaiDate(dateStr).split(" ")[0];

      if (!checkin) {
        return {
          day: formattedDay,
          energyRaw: null,
        };
      }

      const energyValueMap = { low: 1, medium: 2, high: 3 };
      const energyRaw = energyValueMap[checkin.energyLevel] ?? null;

      return {
        day: formattedDay,
        energyRaw,
      };
    });
  }, [checkins, period]);

  const formatEnergyYAxis = (value: number) => {
    if (value === 1) return ENERGY_LABELS.low;
    if (value === 2) return ENERGY_LABELS.medium;
    if (value === 3) return ENERGY_LABELS.high;
    return "";
  };

  const formatEnergyTooltip = (value: number | string | null | undefined) => {
    if (value === 1) return ENERGY_LABELS.low;
    if (value === 2) return ENERGY_LABELS.medium;
    if (value === 3) return ENERGY_LABELS.high;
    return value ?? "";
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">ระดับพลังงานร่างกาย (Energy Level Trend)</CardTitle>
        <CardDescription>ระดับพลังงานรายวัน ย้อนหลัง {period} วัน</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-28 w-full">
          <BarChart data={processedData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} />
            <YAxis
              ticks={[1, 2, 3]}
              tickFormatter={formatEnergyYAxis}
              domain={[0, 3.2]}
              axisLine={false}
              tickLine={false}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => {
                    const val = Array.isArray(value) ? value[0] : value;
                    return formatEnergyTooltip(val);
                  }}
                />
              }
            />
            <Bar dataKey="energyRaw" name="energy" fill="var(--chart-4)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
