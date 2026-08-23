"use client";

import Link from "next/link";
import { Card, Typography } from "antd";
import { Star } from "lucide-react";

import foodPlaceholder from "@/assets/food-placeholder.jpg";
import { BRAND } from "@/lib/theme";
import type { Restaurant } from "@/lib/types";
import { toNumber } from "@/lib/unwrap";

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const rating = toNumber(restaurant.average_rating, 0);

  return (
    <Link
      href={`/restaurants/${String(restaurant.id)}`}
      style={{ textDecoration: "none", display: "block", height: "100%" }}
    >
      <Card
        hoverable
        style={{ height: "100%", overflow: "hidden" }}
        styles={{ body: { padding: 18 } }}
      >
        <div className="ts-card-media" style={{ height: 168, marginBottom: 16 }}>
          <div
            className="ts-card-media-inner"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `linear-gradient(180deg, rgba(31,29,27,0.05) 0%, rgba(31,29,27,0.55) 100%), url(${foodPlaceholder.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              right: 12,
              display: "flex",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            {restaurant.price_range && (
              <span
                style={{
                  background: "rgba(255,255,255,0.92)",
                  color: BRAND.red,
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: "0.04em",
                  padding: "4px 10px",
                  borderRadius: 999,
                }}
              >
                {restaurant.price_range}
              </span>
            )}
            <span
              style={{
                marginLeft: "auto",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                background: BRAND.red,
                color: BRAND.white,
                fontWeight: 700,
                fontSize: 12,
                padding: "4px 10px",
                borderRadius: 999,
              }}
            >
              <Star size={12} strokeWidth={2} fill="currentColor" />
              {rating > 0 ? rating.toFixed(1) : "New"}
            </span>
          </div>
          <div style={{ position: "absolute", left: 14, bottom: 12, right: 14 }}>
            <span
              className="ts-eyebrow"
              style={{ color: "rgba(255,255,255,0.86)", fontSize: 11 }}
            >
              {restaurant.cuisine_type ?? "Cuisine n/a"}
            </span>
          </div>
        </div>

        <Typography.Title level={5} style={{ marginBottom: 6, fontSize: 18 }} ellipsis>
          {restaurant.name}
        </Typography.Title>
        <Typography.Text className="ts-meta">
          {restaurant.reviews_count ? `${restaurant.reviews_count} diner reviews` : "No reviews yet"}
        </Typography.Text>
      </Card>
    </Link>
  );
}
