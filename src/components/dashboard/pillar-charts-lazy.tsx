"use client";

import dynamic from "next/dynamic";
import { LoadingLabel } from "@/components/page-skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function ChartCardSkeleton() {
  return (
    <Card className="flex h-full flex-col justify-between">
      <CardHeader className="space-y-4 pb-4">
        <LoadingLabel />
        <div className="space-y-1">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex w-fit flex-wrap gap-1.5 rounded-full border bg-muted/40 p-1">
          <Skeleton className="h-11 w-24 rounded-full" />
          <Skeleton className="h-11 w-20 rounded-full" />
          <Skeleton className="h-11 w-28 rounded-full" />
          <Skeleton className="h-11 w-20 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-60 w-full" />
        <Skeleton className="mx-auto h-4 w-40" />
      </CardContent>
    </Card>
  );
}

export const PillarChartsLazy = dynamic(
  () => import("./pillar-charts").then((mod) => mod.PillarCharts),
  { ssr: false, loading: () => <ChartCardSkeleton /> }
);
