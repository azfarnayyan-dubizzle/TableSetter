"use client";

import { Tag } from "antd";

type Props = {
  status: boolean | string | null | undefined;
  trueLabel?: string;
  falseLabel?: string;
};

export function StatusBadge({ status, trueLabel = "Available", falseLabel = "Unavailable" }: Props) {
  if (typeof status === "string" && status.length > 0) {
    const positive = ["verified", "approved", "active", "complete"].includes(status.toLowerCase());
    return (
      <Tag color={positive ? "green" : "gold"} style={{ margin: 0, textTransform: "capitalize" }}>
        {status.replace(/_/g, " ")}
      </Tag>
    );
  }
  return (
    <Tag color={status ? "green" : "default"} style={{ margin: 0 }}>
      {status ? trueLabel : falseLabel}
    </Tag>
  );
}
