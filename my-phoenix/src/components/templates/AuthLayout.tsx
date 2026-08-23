import Link from "next/link";
import Title from "antd/es/typography/Title";
import type { ReactNode } from "react";

import { BRAND } from "@/lib/theme";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: `radial-gradient(1000px 600px at 10% -10%, ${BRAND.redSoft}, ${BRAND.cream})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 20px",
        gap: 24,
      }}
    >
      <Link href="/" style={{ textDecoration: "none" }}>
        <Title level={3} style={{ margin: 0, color: BRAND.charcoal }}>
          Table<span style={{ color: BRAND.red }}>setter</span>
        </Title>
      </Link>
      {children}
    </div>
  );
}
