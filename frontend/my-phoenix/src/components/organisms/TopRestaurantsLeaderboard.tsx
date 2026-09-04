"use client";

import Card from "antd/es/card";
import Empty from "antd/es/empty";
import Skeleton from "antd/es/skeleton";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";

import { formatMoney } from "@/components/atoms/PriceTag";
import { BRAND } from "@/lib/theme";
import type { RestaurantSpend } from "@/lib/analytics";

// A deliberate 5-step warm-red ramp, darkest for #1, so rank reads
// visually before the eye even reaches the number.
const RANK_COLORS = ["#8C0F22", "#C81E3A", "#E56773", "#EFA1AA", "#F8D7DA"];

export function TopRestaurantsLeaderboard({
  data,
  loading,
}: {
  data: RestaurantSpend[];
  loading?: boolean;
}) {
  return (
    <Card style={{ borderRadius: 16, height: "100%" }} styles={{ body: { padding: 24 } }}>
      <Title level={4} style={{ margin: 0 }}>
        Top tables
      </Title>
      <Text type="secondary" style={{ fontSize: 13 }}>
        Where your money&apos;s going
      </Text>

      <div style={{ marginTop: 18 }}>
        {loading ? (
          <Skeleton active paragraph={{ rows: 5 }} />
        ) : data.length === 0 ? (
          <Empty description="Log a meal to see your top spots" />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {data.map((item, i) => (
              <div key={item.name}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: 4,
                    gap: 8,
                  }}
                >
                  <Text strong style={{ fontSize: 13 }}>
                    <span style={{ color: RANK_COLORS[i] ?? BRAND.gray, marginRight: 6 }}>
                      #{i + 1}
                    </span>
                    {item.name}
                  </Text>
                  <Text style={{ fontSize: 13, fontWeight: 700, color: BRAND.charcoal, whiteSpace: "nowrap" }}>
                    {formatMoney(item.total)}
                  </Text>
                </div>
                <div style={{ height: 8, borderRadius: 999, background: "#F1E7DC", overflow: "hidden" }}>
                  <div
                    style={{
                      width: `${Math.max(item.percent, 3)}%`,
                      height: "100%",
                      borderRadius: 999,
                      background: RANK_COLORS[i] ?? BRAND.gray,
                      transition: "width 0.6s ease",
                    }}
                  />
                </div>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {item.visits} {item.visits === 1 ? "visit" : "visits"} · {item.percent.toFixed(0)}%
                </Text>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
