"use client";

import { Rate, Typography } from "antd";

import { toNumber } from "@/lib/unwrap";

type Props = {
  value: number | string | null | undefined;
  count?: number | undefined;
  showValue?: boolean;
  size?: "sm" | "md";
};

export function RatingStars({ value, count, showValue = true, size = "sm" }: Props) {
  const rating = toNumber(value, 0);
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <Rate
        disabled
        allowHalf
        value={rating}
        style={{ fontSize: size === "sm" ? 14 : 20, lineHeight: 1 }}
      />
      {showValue && (
        <Typography.Text type="secondary" style={{ fontSize: 13 }}>
          {rating > 0 ? rating.toFixed(1) : "New"}
          {typeof count === "number" ? ` (${count})` : ""}
        </Typography.Text>
      )}
    </span>
  );
}
