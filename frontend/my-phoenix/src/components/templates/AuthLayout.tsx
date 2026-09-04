"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import type { ReactNode } from "react";

import heroImage from "@/assets/hero-dining.jpg";
import { BRAND } from "@/lib/theme";

const POINTS = [
  "Browse menus, prices and availability before you go",
  "Read and write honest, diner-written reviews",
  "Keep a private log of every meal and what it cost",
];

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="ts-auth-split">
      {/* Brand panel */}
      <aside className="ts-auth-aside ts-grain">
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${heroImage.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.35,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(160deg, rgba(26,24,23,0.92) 0%, rgba(46,26,29,0.9) 55%, rgba(126,18,34,0.85) 100%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 2 }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <div
              className="ts-display"
              style={{
                fontSize: 30,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: BRAND.cream,
              }}
            >
              Table<span style={{ color: "#F2808F" }}>setter</span>
            </div>
          </Link>

          <h2
            className="ts-display"
            style={{
              marginTop: 56,
              marginBottom: 18,
              fontSize: 40,
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              color: BRAND.cream,
              fontWeight: 600,
              maxWidth: 420,
            }}
          >
            Every good night out starts with a good table.
          </h2>

          <ul style={{ listStyle: "none", padding: 0, margin: "28px 0 0", display: "grid", gap: 14 }}>
            {POINTS.map((point) => (
              <li
                key={point}
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                  color: "#D9D2CA",
                  fontSize: 15,
                  lineHeight: 1.55,
                  maxWidth: 400,
                }}
              >
                <span
                  style={{
                    display: "inline-grid",
                    placeItems: "center",
                    width: 24,
                    height: 24,
                    flexShrink: 0,
                    borderRadius: 999,
                    background: "rgba(215,38,61,0.28)",
                    color: "#FFC9CF",
                    marginTop: 1,
                  }}
                >
                  <Star size={12} fill="currentColor" strokeWidth={0} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Form panel */}
      <main className="ts-auth-main">
        <Link href="/" className="ts-auth-mobile-mark" style={{ textDecoration: "none" }}>
          <div
            className="ts-display"
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: BRAND.charcoal,
              marginBottom: 24,
              textAlign: "center",
            }}
          >
            Table<span style={{ color: BRAND.red }}>setter</span>
          </div>
        </Link>
        <div className="ts-fade-up" style={{ width: "100%", display: "grid", placeItems: "center" }}>
          {children}
        </div>
      </main>
    </div>
  );
}
