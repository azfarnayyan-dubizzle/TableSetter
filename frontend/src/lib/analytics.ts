import dayjs from "dayjs";

export type DiningLogLike = {
  id: number | string;
  restaurant?: { id?: number | string; name?: string } | null;
  restaurant_name?: string | null;
  amount_spent: number | string;
  note?: string | null;
  logged_at?: string | null;
  created_at?: string | null;
};

export function logDate(log: DiningLogLike): string | null {
  return log.logged_at ?? log.created_at ?? null;
}

export function restaurantLabel(log: DiningLogLike): string {
  return log.restaurant?.name ?? log.restaurant_name ?? "Unlinked meal";
}

export function toAmount(value: number | string | null | undefined): number {
  const n = typeof value === "string" ? parseFloat(value) : (value ?? 0);
  return Number.isFinite(n) ? n : 0;
}

export type MonthlyPoint = { month: string; label: string; total: number };

/**
 * Last `count` months (oldest -> newest), including the current month,
 * with every month present even if it has zero spend -- so the chart
 * never silently skips a quiet month.
 */
export function monthlySpend(logs: DiningLogLike[], count = 6): MonthlyPoint[] {
  const buckets: MonthlyPoint[] = Array.from({ length: count }).map((_, i) => {
    const d = dayjs().subtract(count - 1 - i, "month");
    return { month: d.format("YYYY-MM"), label: d.format("MMM"), total: 0 };
  });
  const index = new Map(buckets.map((b, i) => [b.month, i]));

  for (const log of logs) {
    const date = logDate(log);
    if (!date) continue;
    const key = dayjs(date).format("YYYY-MM");
    const i = index.get(key);
    if (i !== undefined) buckets[i].total += toAmount(log.amount_spent);
  }
  return buckets;
}

export type RestaurantSpend = { name: string; total: number; visits: number; percent: number };

/** Top `limit` restaurants by total spend; everything else rolls into "Other". */
export function spendByRestaurant(logs: DiningLogLike[], limit = 5): RestaurantSpend[] {
  const totals = new Map<string, { total: number; visits: number }>();
  for (const log of logs) {
    const name = restaurantLabel(log);
    const entry = totals.get(name) ?? { total: 0, visits: 0 };
    entry.total += toAmount(log.amount_spent);
    entry.visits += 1;
    totals.set(name, entry);
  }

  const grand = [...totals.values()].reduce((sum, v) => sum + v.total, 0) || 1;
  const sorted = [...totals.entries()]
    .map(([name, v]) => ({
      name,
      total: v.total,
      visits: v.visits,
      percent: (v.total / grand) * 100,
    }))
    .sort((a, b) => b.total - a.total);

  if (sorted.length <= limit) return sorted;

  const top = sorted.slice(0, limit);
  const rest = sorted.slice(limit);
  const otherTotal = rest.reduce((s, r) => s + r.total, 0);
  const otherVisits = rest.reduce((s, r) => s + r.visits, 0);
  top.push({
    name: "Other",
    total: otherTotal,
    visits: otherVisits,
    percent: (otherTotal / grand) * 100,
  });
  return top;
}

/** Percent change of current vs previous. Returns null if previous is 0 (nothing to compare against). */
export function percentChange(current: number, previous: number): number | null {
  if (previous <= 0) return null;
  return ((current - previous) / previous) * 100;
}
