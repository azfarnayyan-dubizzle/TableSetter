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
    <Card hoverable style={{ height: "100%" }} styles={{ body: { padding: 22 } }}>
      {loading ? (
        <Skeleton active paragraph={false} />
      ) : (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            {icon && (
              <span
                style={{
                  display: "inline-flex",
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  alignItems: "center",
                  justifyContent: "center",
                  background: BRAND.gradientPrimary,
                  color: BRAND.white,
                  fontSize: 17,
                  boxShadow: "0 6px 16px rgba(184,30,51,0.26)",
                }}
              >
                {icon}
              </span>
            )}
            <Text
              type="secondary"
              style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}
            >
              {label}
            </Text>
          </div>
          <div className="ts-display"
            style={{ fontSize: 32, fontWeight: 700, color: BRAND.charcoal, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            {value}
          </div>
          {footer && <div style={{ marginTop: 10 }}>{footer}</div>}
        </>
      )}
    </Card>
  );
}
