import Card from "antd/es/card";
import Text from "antd/es/typography/Text";
import Skeleton from "antd/es/skeleton";
import type { ReactNode } from "react";

import { BRAND } from "@/lib/theme";

export function DeltaBadge({ percent }: { percent: number | null }) {
  if (percent === null) return null;
  const up = percent >= 0;
  // Spending MORE than last month is shown in red (a flag, not praise);
  // spending less is shown in green -- inverted from a typical "growth" metric.
  const color = up ? "#B3261E" : "#2E7D32";
  const bg = up ? "#FBE7E9" : "#E7F5EA";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontSize: 12,
        fontWeight: 700,
        color,
        background: bg,
        borderRadius: 999,
        padding: "3px 9px",
      }}
    >
      {up ? "▲" : "▼"} {Math.abs(percent).toFixed(0)}% vs last month
    </span>
  );
}

export function StatCard({
  icon,
  label,
  value,
  loading,
  footer,
}: {
  icon?: ReactNode;
  label: string;
  value: ReactNode;
  loading?: boolean;
  footer?: ReactNode;
}) {
  return (
    <Card style={{ height: "100%", borderRadius: 16 }} styles={{ body: { padding: 20 } }}>
      {loading ? (
        <Skeleton active paragraph={false} />
      ) : (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            {icon && (
              <span
                style={{
                  display: "inline-flex",
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  background: BRAND.redSoft,
                  color: BRAND.red,
                  fontSize: 18,
                }}
              >
                {icon}
              </span>
            )}
            <Text type="secondary" style={{ fontSize: 13 }}>
              {label}
            </Text>
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: BRAND.charcoal, lineHeight: 1.2 }}>
            {value}
          </div>
          {footer && <div style={{ marginTop: 10 }}>{footer}</div>}
        </>
      )}
    </Card>
  );
}
