"use client";

import Card from "antd/es/card";
import Skeleton from "antd/es/skeleton";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";

import { BRAND } from "@/lib/theme";
import type { RatingBucket } from "@/lib/types";

export function RatingDistributionChart({ data, loading }: { data: RatingBucket[]; loading?: boolean }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  // Highest star count in the warmest tone -- reads as "this is where you live"
  const sorted = [...data].sort((a, b) => b.rating - a.rating);

  return (
    <Card style={{ borderRadius: 16, height: "100%" }} styles={{ body: { padding: 24 } }}>
      <Title level={4} style={{ margin: 0 }}>
        Rating breakdown
      </Title>
      <Text type="secondary" style={{ fontSize: 13 }}>
        All-time review distribution
      </Text>

      <div style={{ marginTop: 18 }}>
        {loading ? (
          <Skeleton active paragraph={{ rows: 5 }} />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {sorted.map((bucket) => (
              <div key={bucket.rating} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Text style={{ fontSize: 13, width: 34, flexShrink: 0 }}>{bucket.rating}★</Text>
                <div style={{ flex: 1, height: 10, borderRadius: 999, background: "#F1E7DC", overflow: "hidden" }}>
                  <div
                    style={{
                      width: `${(bucket.count / max) * 100}%`,
                      height: "100%",
                      borderRadius: 999,
                      background: bucket.rating >= 4 ? BRAND.red : bucket.rating === 3 ? "#E5A05A" : "#B3261E",
                      opacity: bucket.rating >= 4 ? 1 : 0.75,
                      transition: "width 0.6s ease",
                    }}
                  />
                </div>
                <Text type="secondary" style={{ fontSize: 12, width: 24, textAlign: "right", flexShrink: 0 }}>
                  {bucket.count}
                </Text>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
