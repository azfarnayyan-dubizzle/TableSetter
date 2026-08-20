"use client";

import Link from "next/link";
import { Button, Card, Col, Row, Space, Typography } from "antd";

import heroImage from "@/assets/hero-dining.jpg";
import { Reveal } from "@/components/atoms/Reveal";
import { SearchBar } from "@/components/molecules/SearchBar";
import { PublicLayout } from "@/components/templates/PublicLayout";
import { BRAND } from "@/lib/theme";


const HIGHLIGHTS = [
  {
    title: "Browse with intent",
    body: "Filter by cuisine, price range and minimum rating to shortlist places worth your evening.",
  },
  {
    title: "Menus before you go",
    body: "Full menus by category with live availability, so nobody arrives to a sold-out special.",
  },
  {
    title: "Log every meal",
    body: "Record what you spent, add notes, and watch monthly totals build a picture of your habits.",
  },
];

const STEPS = [
  { step: "01", title: "Search", body: "Find restaurants by name, dish or neighbourhood." },
  { step: "02", title: "Decide", body: "Compare ratings, price ranges and diner reviews." },
  { step: "03", title: "Track", body: "Log the visit and keep your dining spend in check." },
];

export default function LandingPage() {
  return (
    <PublicLayout>
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: 560,
          borderRadius: 28,
          border: "1px solid rgba(31, 29, 27, 0.08)",
          boxShadow: BRAND.shadowMd,

          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {/* LEFT — solid cream section */}
        <div
          style={{
            background: BRAND.creamDarker,
            padding: "clamp(10px, 6vw, 84px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          <span
            className="ts-eyebrow"
            style={{
              color: BRAND.red,
            }}
          >
            Restaurant discovery &amp; dining diary
          </span>

          <Typography.Title
            level={1}
            style={{
              marginTop: 14,
              marginBottom: 18,
              color: BRAND.charcoal,
            }}
          >
            Restaurant, menus, and honest reviews
          </Typography.Title>

          <Typography.Paragraph
            style={{
              maxWidth: 520,
              fontSize: 17,
              color: BRAND.gray,
              lineHeight: 1.62,
            }}
          >
            Tablesetter brings restaurant menus, honest reviews and your own
            dining history together in one calm, red-and-cream workspace.
          </Typography.Paragraph>

          <div
            style={{
              maxWidth: 460,
              marginBottom: 24,
            }}
          >
            <SearchBar />
          </div>

          <Space wrap size={12}>
            <Link href="/restaurants">
              <Button type="primary" size="large">
                Browse restaurants
              </Button>
            </Link>

            <Link href="/customer/register">
              <Button size="large">
                Start a dining log
              </Button>
            </Link>
          </Space>
        </div>

        {/* RIGHT — blurred restaurant image */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: -5,

              backgroundImage: `url(${heroImage.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",

              filter: "blur(0.5px)",
              transform: "scale(1.0)",
            }}
          />

          {/* Slight tint over image */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(31, 29, 27, 0.12)",
            }}
          />
        </div>
      </section>

      <Row gutter={[28, 28]} style={{ marginTop: 88 }}>
        {HIGHLIGHTS.map((item, index) => (
          <Col key={item.title} xs={24} md={8}>
            <Reveal delay={index * 70} style={{ height: "100%"}}>
              <Card style={{ height: "100%" }} styles={{ body: { padding: 28, backgroundColor: BRAND.creamDarker } }}>
                <Typography.Title level={4} style={{ marginTop: 0, fontSize: 20 }}>
                  {item.title}
                </Typography.Title>
                <Typography.Paragraph
                  style={{ marginBottom: 0, color: BRAND.gray, lineHeight: 1.62 }}
                >
                  {item.body}
                </Typography.Paragraph>
              </Card>
            </Reveal>
          </Col>
        ))}
      </Row>

      <section style={{ marginTop: 96 }}>
        <Reveal>
          <Typography.Title level={2} style={{ marginBottom: 28 }}>
            How Tablesetter works
          </Typography.Title>
        </Reveal>
        <Row gutter={[28, 28]}>
          {STEPS.map((item, index) => (
            <Col key={item.step} xs={24} md={8}>
              <Reveal delay={index * 70} style={{ height: "100%" }}>
                <Card style={{ height: "100%" }} styles={{ body: { padding: 28, backgroundColor: BRAND.creamDarker } }}>
                  <span
                    className="ts-display"
                    style={{
                      display: "inline-grid",
                      placeItems: "center",
                      width: 44,
                      height: 44,
                      borderRadius: 999,
                      background: BRAND.redTint,
                      color: BRAND.red,
                      fontWeight: 700,
                      fontSize: 17,
                    }}
                  >
                    {item.step}
                  </span>
                  <Typography.Title level={4} style={{ marginTop: 16, fontSize: 20 }}>
                    {item.title}
                  </Typography.Title>
                  <Typography.Paragraph
                    style={{ marginBottom: 0, color: BRAND.gray, lineHeight: 1.62 }}
                  >
                    {item.body}
                  </Typography.Paragraph>
                </Card>
              </Reveal>
            </Col>
          ))}
        </Row>
      </section>

      <Reveal>
        <section
          style={{
            marginTop: 96,
            borderRadius: 26,
            padding: "clamp(32px, 5vw, 56px)",
            background: `linear-gradient(120deg, ${BRAND.charcoal} 0%, #2C1A1D 100%)`,
            boxShadow: BRAND.shadowLg,
          }}
        >
          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} md={15}>
              <span className="ts-eyebrow" style={{ color: BRAND.red }}>
                For restaurants
              </span>
              <Typography.Title level={3} style={{ color: BRAND.cream, marginTop: 10 }}>
                Own a restaurant?
              </Typography.Title>
              <Typography.Paragraph
                style={{ color: "#C9C3BB", marginBottom: 0, lineHeight: 1.62, maxWidth: 560 }}
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
