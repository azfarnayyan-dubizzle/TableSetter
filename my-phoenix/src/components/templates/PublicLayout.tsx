"use client";

import Link from "next/link";
import { Button, Layout, Space, Typography } from "antd";
import { useEffect, useState, type ReactNode } from "react";

import { SearchBar } from "@/components/molecules/SearchBar";
import { BRAND } from "@/lib/theme";

function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span
      className="ts-wordmark"
      style={{
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: "-0.02em",
        color: light ? BRAND.cream : BRAND.charcoal,
      }}
    >
      <span className="ts-wordmark-base">
        Table<span style={{ color: BRAND.red }}>setter</span>
      </span>

      <span className="ts-wordmark-shine">
        Table<span>setter</span>
      </span>
    </span>
  );
}

export function PublicLayout({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh", background: BRAND.creamDeep }}>
      <Layout.Header
        className={scrolled ? "ts-header--scrolled" : undefined}
        style={{
          position: "sticky",
          top: 14,
          zIndex: 20,

          display: "flex",
          alignItems: "center",
          gap: 14,

          width: "calc(100% - 28px)",
          maxWidth: 1200,
          height: 80,

          margin: "0 auto",
          padding: "8px 14px",

          borderRadius: 18,
          border: `1px solid ${BRAND.border}`,

          background: BRAND.creamDarker,
          backdropFilter: "saturate(140%) blur(14px)",
          WebkitBackdropFilter: "saturate(140%) blur(14px)",

          boxShadow: scrolled
            ? "0 10px 30px rgba(31, 29, 27, 0.12)"
            : "0 4px 18px rgba(31, 29, 27, 0.06)",

          transition: "box-shadow 0.2s ease, transform 0.2s ease",
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: "none",
            marginRight: "auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Wordmark />
        </Link>

        <div
          style={{
            flex: "1 1 220px",
            minWidth: 180,
            maxWidth: 360,
          }}
        >
          <SearchBar />
        </div>

        <Space
          wrap
          size={6}
          className="ts-nav-link"
        >
          <Link href="/restaurants">
            <Button type="text">
              Restaurants
            </Button>
          </Link>

          <Link href="/customer/login">
            <Button>
              Diner login
            </Button>
          </Link>

          <Link href="/owner/login">
            <Button type="primary">
              For restaurants
            </Button>
          </Link>
        </Space>
      </Layout.Header>

      <Layout.Content>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 96px" }}>{children}</div>
      </Layout.Content>

      <Layout.Footer style={{ background: BRAND.charcoal, padding: "56px 24px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              gap: 48,
              flexWrap: "wrap",
              justifyContent: "space-between",
              paddingBottom: 32,
              borderBottom: "1px solid rgba(253,248,240,0.12)",
            }}
          >
            <div style={{ maxWidth: 300 }}>
              <Wordmark light />
              <Typography.Paragraph
                style={{ color: "#B8B2AA", marginTop: 10, marginBottom: 0, lineHeight: 1.6 }}
              >
                Discover great restaurants. Track every meal.
              </Typography.Paragraph>
            </div>
            {[
              {
                title: "Discover",
                links: [
                  { label: "Browse restaurants", to: "/restaurants" },
                  { label: "Search", to: "/search" },
                ],
              },
              {
                title: "For diners",
                links: [
                  { label: "Diner login", to: "/customer/login" },
                  { label: "Create account", to: "/customer/register" },
                ],
              },
              {
                title: "For owners",
                links: [
                  { label: "Owner login", to: "/owner/login" },
                  { label: "Claim your listing", to: "/owner/register" },
                ],
              },
            ].map((group) => (
              <div key={group.title} style={{ display: "grid", gap: 10 }}>
                <span className="ts-eyebrow" style={{ color: BRAND.red, fontSize: 11 }}>
                  {group.title}
                </span>
                {group.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.to}
                    style={{ color: "#D8D2CA", textDecoration: "none", fontSize: 14 }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <Typography.Text style={{ color: "#8C8680", fontSize: 13, display: "block", marginTop: 24 }}>
            © {new Date().getFullYear()} Tablesetter. All rights reserved.
          </Typography.Text>
        </div>
      </Layout.Footer>
    </Layout>
  );
}
