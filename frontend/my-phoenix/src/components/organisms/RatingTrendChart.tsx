"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { TooltipProps } from "recharts";
import Card from "antd/es/card";
import Skeleton from "antd/es/skeleton";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";

import { BRAND } from "@/lib/theme";
import type { RatingPoint } from "@/lib/types";

function ChartTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length || payload[0].value == null) {
    return active ? (
      <div style={{ background: BRAND.charcoal, color: BRAND.cream, borderRadius: 10, padding: "8px 12px", fontSize: 13 }}>
        <div style={{ opacity: 0.7 }}>{label}</div>
        <div>No reviews</div>
      </div>
    ) : null;
  }
  return (
    <div style={{ background: BRAND.charcoal, color: BRAND.cream, borderRadius: 10, padding: "8px 12px", fontSize: 13 }}>
      <div style={{ opacity: 0.7, marginBottom: 2 }}>{label}</div>
      <div style={{ fontWeight: 700 }}>★ {Number(payload[0].value).toFixed(1)}</div>
    </div>
  );
}

export function RatingTrendChart({ data, loading }: { data: RatingPoint[]; loading?: boolean }) {
  return (
    <Card style={{ borderRadius: 16, height: "100%" }} styles={{ body: { padding: 24 } }}>
      <Title level={4} style={{ margin: 0 }}>
        Rating trend
      </Title>
      <Text type="secondary" style={{ fontSize: 13 }}>
        Average star rating by month
      </Text>

      <div style={{ height: 220, marginTop: 12 }}>
        {loading ? (
          <Skeleton active paragraph={{ rows: 4 }} />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="#EFE6D9" />
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: BRAND.gray, fontSize: 12 }} />
              <YAxis
                domain={[0, 5]}
                ticks={[0, 1, 2, 3, 4, 5]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: BRAND.gray, fontSize: 12 }}
                width={24}
              />
              <Tooltip content={<ChartTooltip />} />
              <Line
                type="monotone"
                dataKey="avg_rating"
                stroke={BRAND.red}
                strokeWidth={2.5}
                dot={{ r: 4, fill: BRAND.red, strokeWidth: 0 }}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
