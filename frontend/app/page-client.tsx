"use client";

import Link from "next/link";
import { Button, Col, Row, Space, Typography } from "antd";
import { BookOpenText, CompassIcon, LineChart, Star } from "lucide-react";

import heroImage from "@/assets/hero-dining.jpg";
import { Reveal } from "@/components/atoms/Reveal";
import { SearchBar } from "@/components/molecules/SearchBar";
import { PublicLayout } from "@/components/templates/PublicLayout";
import { BRAND } from "@/lib/theme";

const HIGHLIGHTS = [
  {
    icon: CompassIcon,
    title: "Browse with intent",
    body: "Filter by cuisine, price range and minimum rating to shortlist places worth your evening.",
  },
  {
    icon: BookOpenText,
    title: "Menus before you go",
    body: "Full menus by category with live availability, so nobody arrives to a sold-out special.",
  },
  {
    icon: LineChart,
    title: "Log every meal",
    body: "Record what you spent, add notes, and watch monthly totals build a picture of your habits.",
  },
];

const STEPS = [
  { step: "01", title: "Search", body: "Find restaurants by name, dish or neighbourhood." },
  { step: "02", title: "Decide", body: "Compare ratings, price ranges and diner reviews." },
  { step: "03", title: "Track", body: "Log the visit and keep your dining spend in check." },
];

const PROOF = [
  { value: "Curated", label: "Restaurant directory" },
  { value: "Full menus", label: "Categories & availability" },
  { value: "Honest", label: "Diner-written reviews" },
  { value: "Private", label: "Your dining log" },
];

export default function LandingPage() {
  return (
    <PublicLayout>
      <section
        className="ts-grain ts-hero-split"
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: 620,
          borderRadius: 32,
          border: `1px solid ${BRAND.border}`,
          boxShadow: BRAND.shadowLg,
          display: "grid",
          gridTemplateColumns: "1.05fr 0.95fr",
          background: BRAND.white,
        }}
      >
        {/* LEFT — editorial copy */}
        <div
          style={{
            background: `linear-gradient(165deg, #FFFFFF 0%, #FFF8F0 62%, #FDF0EE 100%)`,
            padding: "clamp(28px, 5vw, 76px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          <span
            style={{
              alignSelf: "flex-start",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 14px",
              borderRadius: 999,
              background: BRAND.redSoft,
              border: "1px solid rgba(215,38,61,0.16)",
              color: BRAND.redDark,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            <Star size={12} fill="currentColor" strokeWidth={0} />
            Restaurant discovery &amp; dining diary
          </span>

          <Typography.Title
            level={1}
            style={{
              marginTop: 20,
              marginBottom: 18,
              color: BRAND.charcoal,
            }}
          >
            Restaurants, menus, and{" "}
            <span className="ts-accent">honest reviews</span>
          </Typography.Title>

          <Typography.Paragraph
            style={{
              maxWidth: 520,
              fontSize: 17.5,
              color: BRAND.gray,
              lineHeight: 1.65,
            }}
          >
            Tablesetter brings restaurant menus, honest reviews and your own dining history together
            in one calm, red-and-cream workspace.
          </Typography.Paragraph>

          <div style={{ maxWidth: 470, marginBottom: 26, marginTop: 6 }}>
            <SearchBar />
          </div>

          <Space wrap size={12}>
            <Link href="/restaurants">
              <Button type="primary" size="large">
                Browse restaurants
              </Button>
            </Link>

            <Link href="/customer/register">
              <Button size="large">Start a dining log</Button>
            </Link>
          </Space>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: 18,
              marginTop: 34,
              paddingTop: 26,
              borderTop: `1px solid ${BRAND.border}`,
            }}
          >
            {PROOF.map((item) => (
              <div key={item.label}>
                <div
                  className="ts-display"
                  style={{ fontSize: 18, fontWeight: 600, color: BRAND.charcoal }}
                >
                  {item.value}
                </div>
                <div style={{ fontSize: 12.5, color: BRAND.grayLight }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — photography */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              inset: -6,
              backgroundImage: `url(${heroImage.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: "scale(1.03)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(255,248,240,0.96) 0%, rgba(255,248,240,0.35) 18%, rgba(26,24,23,0.12) 55%, rgba(26,24,23,0.45) 100%)",
            }}
          />
          <div
            className="ts-glass ts-float"
            style={{
              position: "absolute",
              left: 28,
              bottom: 32,
              right: 28,
              maxWidth: 300,
              borderRadius: 20,
              padding: "16px 18px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: BRAND.red,
                marginBottom: 6,
              }}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <div style={{ fontSize: 14.5, color: BRAND.charcoal, lineHeight: 1.5 }}>
              “Found the place, read the menu, booked the night — then logged what it cost.”
            </div>
            <div style={{ fontSize: 12.5, color: BRAND.grayLight, marginTop: 8 }}>
              A Tablesetter diner
            </div>
          </div>
        </div>
      </section>

      <Row gutter={[28, 28]} style={{ marginTop: 92 }}>
        {HIGHLIGHTS.map((item, index) => {
          const Icon = item.icon;
          return (
            <Col key={item.title} xs={24} md={8}>
              <Reveal delay={index * 70} style={{ height: "100%" }}>
                <div
                  style={{
                    height: "100%",
                    padding: 30,
                    borderRadius: 22,
                    background: BRAND.white,
                    border: `1px solid ${BRAND.border}`,
                    boxShadow: BRAND.shadowSm,
                  }}
                >
                  <span
                    style={{
                      display: "inline-grid",
                      placeItems: "center",
                      width: 46,
                      height: 46,
                      borderRadius: 14,
                      background: BRAND.redSoft,
                      color: BRAND.red,
                      marginBottom: 18,
                    }}
                  >
                    <Icon size={21} strokeWidth={1.8} />
                  </span>
                  <Typography.Title level={4} style={{ marginTop: 0, fontSize: 20 }}>
                    {item.title}
                  </Typography.Title>
                  <Typography.Paragraph
                    style={{ marginBottom: 0, color: BRAND.gray, lineHeight: 1.62 }}
                  >
                    {item.body}
                  </Typography.Paragraph>
                </div>
              </Reveal>
            </Col>
          );
        })}
      </Row>

      <section style={{ marginTop: 100 }}>
        <Reveal>
          <div className="ts-section-head">
            <div>
              <span className="ts-eyebrow" style={{ color: BRAND.red }}>
                The flow
              </span>
              <Typography.Title level={2} style={{ marginBottom: 0, marginTop: 8 }}>
                How Tablesetter works
              </Typography.Title>
            </div>
          </div>
          <hr className="ts-rule" style={{ marginBottom: 32 }} />
        </Reveal>
        <Row gutter={[28, 28]}>
          {STEPS.map((item, index) => (
            <Col key={item.step} xs={24} md={8}>
              <Reveal delay={index * 70} style={{ height: "100%" }}>
                <div
                  style={{
                    height: "100%",
                    padding: 30,
                    borderRadius: 22,
                    background: BRAND.gradientCream,
                    border: `1px solid ${BRAND.border}`,
                    boxShadow: BRAND.shadowSm,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <span
                    className="ts-display"
                    style={{
                      display: "inline-grid",
                      placeItems: "center",
                      width: 46,
                      height: 46,
                      borderRadius: 999,
                      background: BRAND.gradientPrimary,
                      color: BRAND.white,
                      fontWeight: 700,
                      fontSize: 16,
                      boxShadow: "0 8px 18px rgba(184,30,51,0.28)",
                    }}
                  >
                    {item.step}
                  </span>
                  <Typography.Title level={4} style={{ marginTop: 18, fontSize: 20 }}>
                    {item.title}
                  </Typography.Title>
                  <Typography.Paragraph
                    style={{ marginBottom: 0, color: BRAND.gray, lineHeight: 1.62 }}
                  >
                    {item.body}
                  </Typography.Paragraph>
                </div>
              </Reveal>
            </Col>
          ))}
        </Row>
      </section>

      <Reveal>
        <section
          className="ts-grain"
          style={{
            marginTop: 100,
            borderRadius: 30,
            padding: "clamp(34px, 5vw, 64px)",
            background: BRAND.gradientInk,
            boxShadow: BRAND.shadowLg,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 420,
              height: 420,
              right: -120,
              top: -160,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(215,38,61,0.35), transparent 66%)",
            }}
          />
          <Row gutter={[24, 28]} align="middle" style={{ position: "relative", zIndex: 1 }}>
            <Col xs={24} md={15}>
              <span className="ts-eyebrow" style={{ color: "#F2808F" }}>
                For restaurants
              </span>
              <Typography.Title level={3} style={{ color: BRAND.cream, marginTop: 10 }}>
                Own a restaurant?
              </Typography.Title>
              <Typography.Paragraph
                style={{ color: "#C9C3BB", marginBottom: 0, lineHeight: 1.65, maxWidth: 560 }}
              >
                Publish your listing, keep menu categories and items current, and reply to reviews
                from a single owner dashboard.
              </Typography.Paragraph>
            </Col>
            <Col xs={24} md={9}>
              <Space wrap size={12}>
                <Link href="/owner/register">
                  <Button type="primary" size="large">
                    Claim your listing
                  </Button>
                </Link>
                <Link href="/owner/login">
                  <Button size="large" ghost>
                    Owner login
                  </Button>
                </Link>
              </Space>
            </Col>
          </Row>
        </section>
      </Reveal>
    </PublicLayout>
  );
}
