"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { BRAND } from "@/lib/theme";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: `radial-gradient(900px 520px at 12% -12%, ${BRAND.redSoft}, ${BRAND.cream} 60%), ${BRAND.cream}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "64px 20px",
        gap: 28,
      }}
    >
      <Link href="/" style={{ textDecoration: "none", textAlign: "center" }}>
        <div
          className="ts-display"
          style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.025em", color: BRAND.charcoal }}
        >
          Table<span style={{ color: BRAND.red }}>setter</span>
        </div>
      </Link>
      <div className="ts-fade-up" style={{ width: "100%", display: "grid", placeItems: "center" }}>
        {children}
      </div>
    </div>
  );
}
