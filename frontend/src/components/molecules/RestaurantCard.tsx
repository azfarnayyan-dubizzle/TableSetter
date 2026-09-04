"use client";

import Link from "next/link";
import { Card, Typography } from "antd";
import { ArrowUpRight, MessageSquare, Star } from "lucide-react";

import { BRAND } from "@/lib/theme";
import { getRestaurantImage } from "@/lib/restaurantImages";
import type { Restaurant } from "@/lib/types";
import { toNumber } from "@/lib/unwrap";

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const rating = toNumber(restaurant.average_rating, 0);
  const image = getRestaurantImage(restaurant.id);

  return (
    <Link
      href={`/restaurants/${String(restaurant.id)}`}
      style={{ textDecoration: "none", display: "block", height: "100%" }}
    >
      <Card
        hoverable
        style={{ height: "100%", overflow: "hidden" }}
        styles={{ body: { padding: 16 } }}
      >
        <div className="ts-card-media" style={{ height: 198, marginBottom: 16 }}>
          <div
            className="ts-card-media-inner"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `linear-gradient(180deg, rgba(26,24,23,0.02) 0%, rgba(26,24,23,0.18) 45%, rgba(26,24,23,0.72) 100%), url(${image})`,
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
                  background: "rgba(255,255,255,0.94)",
                  color: BRAND.redDark,
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: "0.04em",
                  padding: "5px 11px",
                  borderRadius: 999,
                  backdropFilter: "blur(6px)",
                  boxShadow: "0 4px 12px rgba(26,24,23,0.18)",
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
                gap: 5,
                background: BRAND.gradientPrimary,
                color: BRAND.white,
                fontWeight: 700,
                fontSize: 12,
                padding: "5px 11px",
                borderRadius: 999,
                boxShadow: "0 6px 16px rgba(184,30,51,0.35)",
              }}
            >
              <Star size={12} strokeWidth={2} fill="currentColor" />
              {rating > 0 ? rating.toFixed(1) : "New"}
            </span>
          </div>
          <div
            style={{
              position: "absolute",
              left: 16,
              bottom: 14,
              right: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <span className="ts-eyebrow" style={{ color: "rgba(255,255,255,0.9)", fontSize: 11 }}>
              {restaurant.cuisine_type ?? "Cuisine n/a"}
            </span>
            <span
              style={{
                display: "inline-grid",
                placeItems: "center",
                width: 30,
                height: 30,
                borderRadius: 999,
                background: "rgba(255,255,255,0.92)",
                color: BRAND.redDark,
                flexShrink: 0,
              }}
            >
              <ArrowUpRight size={16} strokeWidth={2.2} />
            </span>
          </div>
        </div>

        <div style={{ padding: "0 4px 4px" }}>
          <Typography.Title level={5} style={{ marginBottom: 8, fontSize: 18.5 }} ellipsis>
            {restaurant.name}
          </Typography.Title>
          <span
            className="ts-meta"
            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <MessageSquare size={13} strokeWidth={1.8} />
            {restaurant.reviews_count
              ? `${restaurant.reviews_count} diner reviews`
              : "No reviews yet"}
          </span>
        </div>
      </Card>
    </Link>
  );
}
