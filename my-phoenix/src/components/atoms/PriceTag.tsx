"use client";

import { Tag, Typography } from "antd";

import { BRAND } from "@/lib/theme";
import { toNumber } from "@/lib/unwrap";

export function formatMoney(value: number | string | null | undefined): string {
  const amount = Math.round(toNumber(value, 0));
  return `Rs ${amount.toLocaleString("en-PK")}`;
}

export function PriceTag({ amount }: { amount: number | string | null | undefined }) {
  return (
    <Typography.Text strong style={{ color: BRAND.red, whiteSpace: "nowrap" }}>
      {formatMoney(amount)}
    </Typography.Text>
  );
}

export function PriceRangeTag({ range }: { range: string | null | undefined }) {
  if (!range) return null;
  return (
    <Tag color="#FBE7E9" style={{ color: BRAND.red, border: "none", fontWeight: 600, margin: 0 }}>
      {range}
    </Tag>
  );
}
