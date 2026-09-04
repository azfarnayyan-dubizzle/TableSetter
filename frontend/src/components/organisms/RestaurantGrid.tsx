"use client";

import Link from "next/link";
import { Alert, Button, Card, Col, Row } from "antd";
import { UtensilsCrossed } from "lucide-react";

import { RestaurantCard } from "@/components/molecules/RestaurantCard";
import { BRAND } from "@/lib/theme";
import type { Restaurant } from "@/lib/types";

type Props = {
  restaurants: Restaurant[];
  loading?: boolean;
  error?: string | null;
  emptyText?: string;
};

function CardSkeleton() {
  return (
    <Card styles={{ body: { padding: 18 } }}>
      <div className="ts-shimmer" style={{ height: 168, borderRadius: 14, marginBottom: 16 }} />
      <div className="ts-shimmer" style={{ height: 18, width: "70%", marginBottom: 10 }} />
      <div className="ts-shimmer" style={{ height: 12, width: "45%" }} />
    </Card>
  );
}

export function RestaurantGrid({ restaurants, loading, error, emptyText }: Props) {
  if (error) {
    return (
      <Alert
        type="error"
        showIcon
        message={error}
        description="Please retry in a moment — if it keeps happening, refresh the page."
        style={{ background: BRAND.redSoft, border: `1px solid rgba(215,38,61,0.2)` }}
      />
    );
  }

  if (loading) {
    return (
      <Row gutter={[28, 28]}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Col key={index} xs={24} sm={12} lg={8}>
            <CardSkeleton />
          </Col>
        ))}
      </Row>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "64px 24px",
          borderRadius: 20,
          background: BRAND.surfaceAlt,
          border: `1px dashed rgba(215,38,61,0.25)`,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            margin: "0 auto 18px",
            borderRadius: "50%",
            background: BRAND.redSoft,
            color: BRAND.red,
            display: "grid",
            placeItems: "center",
          }}
        >
          <UtensilsCrossed size={28} strokeWidth={1.6} />
        </div>
        <h3 className="ts-display" style={{ fontSize: 22, margin: "0 0 8px", color: BRAND.charcoal }}>
          {emptyText ?? "No restaurants found"}
        </h3>
        <p style={{ color: BRAND.gray, margin: "0 0 20px" }}>
          Try widening your filters, or browse the full directory.
        </p>
        <Link href="/restaurants">
          <Button type="primary">Browse all restaurants</Button>
        </Link>
      </div>
    );
  }

  return (
    <Row gutter={[28, 28]}>
      {restaurants.map((restaurant, index) => (
        <Col
          key={restaurant.id}
          xs={24}
          sm={12}
          lg={8}
          className="ts-fade-up"
          style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
        >
          <RestaurantCard restaurant={restaurant} />
        </Col>
      ))}
    </Row>
  );
}
