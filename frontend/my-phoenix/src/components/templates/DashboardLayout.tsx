"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Drawer, Layout, Menu, Typography } from "antd";
import { Menu as MenuIcon } from "lucide-react";
import { useState, type ReactNode } from "react";

import type { Role } from "@/lib/api";
import { useLogout, useRequireAuth } from "@/lib/auth";
import { BRAND } from "@/lib/theme";

type NavItem = { key: string; label: string };

const NAV: Record<Role, NavItem[]> = {
  owner: [
    { key: "/owner/dashboard", label: "My restaurants" },
    { key: "/owner/restaurants/new", label: "Add restaurant" },
    { key: "/owner/profile", label: "Business profile" },
  ],
  customer: [
    { key: "/customer/dashboard", label: "Overview" },
    { key: "/customer/dining-logs", label: "Dining logs" },
    { key: "/customer/profile", label: "My profile" },
    { key: "/restaurants", label: "Browse restaurants" },
  ],
};

export function DashboardLayout({
  role,
  title,
  extra,
  children,
}: {
  role: Role;
  title: string;
  extra?: ReactNode;
  children: ReactNode;
}) {
  const authed = useRequireAuth(role);
  const logout = useLogout(role);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = (
    <Menu
      mode="inline"
      style={{ borderInlineEnd: "none", background: "transparent" }}
      selectedKeys={[pathname]}
      items={NAV[role].map((item) => ({
        key: item.key,
        label: <Link href={item.key}>{item.label}</Link>,
      }))}
      onClick={() => setOpen(false)}
    />
  );

  if (!authed) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: BRAND.cream,
        }}
      >
        <div style={{ width: 260, display: "grid", gap: 12 }}>
          <div className="ts-shimmer" style={{ height: 20, width: "60%" }} />
          <div className="ts-shimmer" style={{ height: 12 }} />
          <div className="ts-shimmer" style={{ height: 12, width: "80%" }} />
        </div>
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh", background: BRAND.cream }}>
      <Layout.Sider
        className="ts-sider"
        width={252}
        breakpoint="lg"
        collapsedWidth={0}
        trigger={null}
        style={{
          background: BRAND.white,
          borderRight: `1px solid ${BRAND.border}`,
          padding: "26px 14px",
          boxShadow: "1px 0 24px rgba(26,24,23,0.04)",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <div
            className="ts-display"
            style={{
              margin: "0 12px 24px",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: BRAND.charcoal,
            }}
          >
            Table<span style={{ color: BRAND.red }}>setter</span>
          </div>
        </Link>
        <span
          style={{
            display: "inline-block",
            margin: "0 12px 14px",
            padding: "5px 12px",
            borderRadius: 999,
            background: BRAND.redSoft,
            color: BRAND.redDark,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          {role === "owner" ? "Owner" : "Diner"}
        </span>
        {nav}
      </Layout.Sider>

      <Layout style={{ background: BRAND.cream }}>
        <Layout.Header
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
            height: "auto",
            background: "rgba(255, 255, 255, 0.78)",
            backdropFilter: "saturate(140%) blur(10px)",
            padding: "18px 28px",
            borderBottom: `1px solid ${BRAND.border}`,
            position: "sticky",
            top: 0,
            zIndex: 15,
          }}
        >
          <Button
            icon={<MenuIcon size={18} />}
            onClick={() => setOpen(true)}
            className="ts-mobile-only"
          />
          <Typography.Title
            level={4}
            style={{ margin: 0, marginRight: "auto", fontSize: 24, letterSpacing: "-0.015em" }}
          >
            {title}
          </Typography.Title>
          {extra}
          <Button onClick={() => void logout()}>Logout</Button>
        </Layout.Header>
        <Layout.Content style={{ padding: "40px 28px 80px" }}>
          <div className="ts-fade-up" style={{ maxWidth: 1120, margin: "0 auto" }}>
            {children}
          </div>
        </Layout.Content>
      </Layout>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        placement="left"
        title="Tablesetter"
        width={272}
        styles={{ body: { background: BRAND.white } }}
        className="ts-sider"
      >
        {nav}
      </Drawer>
    </Layout>
  );
}
