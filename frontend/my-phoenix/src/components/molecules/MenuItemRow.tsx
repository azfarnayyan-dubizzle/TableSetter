"use client";

import { Button, Space, Typography } from "antd";

import { formatMoney } from "@/components/atoms/PriceTag";
import { StatusBadge } from "@/components/atoms/StatusBadge";
import { BRAND } from "@/lib/theme";
import type { MenuItem } from "@/lib/types";

type Props = {
  item: MenuItem;
  manage?: boolean;
  onEdit?: (item: MenuItem) => void;
  onDelete?: (item: MenuItem) => void;
};

export function MenuItemRow({ item, manage, onEdit, onDelete }: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 20,
        padding: "16px 0",
        borderBottom: `1px solid ${BRAND.border}`,
        opacity: item.is_available ? 1 : 0.68,
      }}
    >
      <div style={{ minWidth: 0 }}>
        <Space size={8} wrap>
          <Typography.Text strong style={{ fontSize: 16 }}>
            {item.name}
          </Typography.Text>
          {!item.is_available && <StatusBadge status={false} />}
        </Space>
        {item.description && (
          <Typography.Paragraph
            type="secondary"
            style={{ marginBottom: 0, marginTop: 2, fontSize: 14, lineHeight: 1.55 }}
          >
            {item.description}
          </Typography.Paragraph>
        )}
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <Typography.Text
          strong
          style={{
            display: "block",
            color: BRAND.red,
            fontSize: 16,
            whiteSpace: "nowrap",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {formatMoney(item.price)}
        </Typography.Text>
        {manage && (
          <Space size={0} style={{ marginTop: 2 }}>
            {onEdit && (
              <Button size="small" type="link" onClick={() => onEdit(item)}>
                Edit
              </Button>
            )}
            {onDelete && (
              <Button size="small" type="link" danger onClick={() => onDelete(item)}>
                Delete
              </Button>
            )}
          </Space>
        )}
      </div>
    </div>
  );
}
