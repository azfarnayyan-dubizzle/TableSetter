"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { TooltipProps } from "recharts";
import Card from "antd/es/card";
import Skeleton from "antd/es/skeleton";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";

import { BRAND } from "@/lib/theme";
import type { RevenuePoint } from "@/lib/types";

function ChartTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: BRAND.charcoal, color: BRAND.cream, borderRadius: 10, padding: "8px 12px", fontSize: 13 }}>
      <div style={{ opacity: 0.7, marginBottom: 2 }}>{label}</div>
      <div style={{ fontWeight: 700 }}>${Number(payload[0].value).toFixed(2)}</div>
    </div>
  );
}

export function RevenueTrendChart({ data, loading }: { data: RevenuePoint[]; loading?: boolean }) {
  const total = data.reduce((s, d) => s + d.total, 0);

  return (
    <Card style={{ borderRadius: 16, height: "100%" }} styles={{ body: { padding: 24 } }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <Title level={4} style={{ margin: 0 }}>
          Revenue trend
        </Title>
        <Text type="secondary" style={{ fontSize: 13 }}>
          ${total.toFixed(0)} over {data.length}mo
        </Text>
      </div>
      <Text type="secondary" style={{ fontSize: 13 }}>
        Based on logged customer visits
      </Text>

      <div style={{ height: 260, marginTop: 12 }}>
        {loading ? (
          <Skeleton active paragraph={{ rows: 5 }} />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={BRAND.red} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={BRAND.red} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#EFE6D9" />
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: BRAND.gray, fontSize: 12 }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: BRAND.gray, fontSize: 12 }}
                tickFormatter={(v: number) => `$${v}`}
                width={48}
              />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="total" stroke={BRAND.red} strokeWidth={2.5} fill="url(#revenueFill)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
