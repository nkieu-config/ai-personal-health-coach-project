import { Footprints, Moon, Utensils } from "lucide-react";
import type { Pillar } from "@/lib/domain";

export const PILLAR_ICONS: Record<Pillar, typeof Utensils> = {
  eating: Utensils,
  sleep: Moon,
  movement: Footprints,
};

export const PILLAR_COLORS: Record<Pillar, string> = {
  eating: "var(--chart-2)",
  sleep: "var(--chart-1)",
  movement: "var(--chart-3)",
};

export const PILLAR_ORDER: Pillar[] = ["eating", "sleep", "movement"];
