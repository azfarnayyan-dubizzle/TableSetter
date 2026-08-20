"use client";

import { Button, Card, Rate, Space, Typography } from "antd";

import { BRAND } from "@/lib/theme";
import type { Review } from "@/lib/types";

type Props = {
  review: Review;
  canEdit?: boolean;
  onEdit?: (review: Review) => void;
  onDelete?: (review: Review) => void;
  canReply?: boolean;
  onReply?: (review: Review) => void;
};

export function ReviewCard({ review, canEdit, onEdit, onDelete, canReply, onReply }: Props) {
  const author = review.customer?.name ?? review.customer_name ?? "Guest";
  const initials = author
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return (
    <Card size="small" style={{ marginBottom: 14 }} styles={{ body: { padding: 18 } }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: BRAND.redSoft,
              color: BRAND.red,
              display: "grid",
              placeItems: "center",
              fontWeight: 700,
              fontSize: 14,
              flexShrink: 0,
            }}
          >
            {initials || "G"}
          </div>
          <div>
            <Typography.Text strong style={{ fontSize: 15 }}>
              {author}
            </Typography.Text>
            <div style={{ lineHeight: 1 }}>
              <Rate disabled value={review.rating} style={{ fontSize: 13, color: BRAND.red }} />
            </div>
          </div>
        </div>
        <Space size={4}>
          {canEdit && onEdit && (
            <Button size="small" type="link" onClick={() => onEdit(review)}>
              Edit
            </Button>
          )}
          {canEdit && onDelete && (
            <Button size="small" type="link" danger onClick={() => onDelete(review)}>
              Delete
            </Button>
          )}
          {canReply && onReply && (
            <Button size="small" onClick={() => onReply(review)}>
              {review.owner_reply ? "Edit reply" : "Reply"}
            </Button>
          )}
        </Space>
      </div>
      {review.comment && (
        <Typography.Paragraph style={{ marginTop: 12, marginBottom: 0, lineHeight: 1.62 }}>
          {review.comment}
        </Typography.Paragraph>
      )}
      {review.owner_reply && (
        <div
          style={{
            marginTop: 14,
            marginLeft: 52,
            padding: "14px 16px",
            borderRadius: 12,
            background: BRAND.creamDeep,
            borderLeft: `3px solid ${BRAND.red}`,
          }}
        >
          <span className="ts-eyebrow" style={{ color: BRAND.red, fontSize: 11 }}>
            Owner reply
          </span>
          <Typography.Paragraph style={{ marginBottom: 0, marginTop: 6, lineHeight: 1.6 }}>
            {review.owner_reply}
          </Typography.Paragraph>
        </div>
      )}
    </Card>
  );
}
