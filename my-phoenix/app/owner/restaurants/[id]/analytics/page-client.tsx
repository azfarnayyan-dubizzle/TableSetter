"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Row from "antd/es/row";
import Col from "antd/es/col";
import Card from "antd/es/card";
import Alert from "antd/es/alert";
import Empty from "antd/es/empty";
import Skeleton from "antd/es/skeleton";
import Button from "antd/es/button";
import {
  DollarOutlined,
  ShopOutlined,
  StarOutlined,
  MessageOutlined,
} from "@ant-design/icons";

import { ReviewCard } from "@/components/molecules/ReviewCard";
import { StatCard } from "@/components/atoms/StatCard";
import { RevenueTrendChart } from "@/components/organisms/RevenueTrendChart";
import { RatingTrendChart } from "@/components/organisms/RatingTrendChart";
import { RatingDistributionChart } from "@/components/organisms/RatingDistributionChart";
import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { extractErrorMessage } from "@/lib/api";
import { useAuthToken } from "@/lib/auth";
import {
  useOwnerRestaurant,
  useOwnerRestaurantAnalytics,
  useOwnerRestaurantReviews,
} from "@/lib/hooks";

export default function RestaurantAnalyticsPage() {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuthToken("owner");
  const enabled = Boolean(token);

  const { data: restaurant } = useOwnerRestaurant(id, enabled);
  const { data: analytics, isPending, error } = useOwnerRestaurantAnalytics(id, enabled);
  const { data: reviews, isPending: reviewsPending } = useOwnerRestaurantReviews(id, enabled);

  const recentReviews = (reviews ?? [])
    .slice()
    .sort((a, b) => new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime())
    .slice(0, 5);

  return (
    <DashboardLayout
      role="owner"
      title={`Analytics — ${restaurant?.name ?? "Restaurant"}`}
      extra={
        <Link href={`/owner/restaurants/${id}`}>
          <Button>Back to manage</Button>
        </Link>
      }
    >
      {error && (
        <Alert
          type="error"
          showIcon
          style={{ marginBottom: 20 }}
          message={extractErrorMessage(error, "Could not load analytics")}
        />
      )}

      <Row gutter={[20, 20]}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            icon={<DollarOutlined />}
            label="Total revenue"
            value={`$${(analytics?.total_revenue ?? 0).toFixed(2)}`}
            loading={isPending}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            icon={<ShopOutlined />}
            label="Logged visits"
            value={analytics?.visit_count ?? 0}
            loading={isPending}
            footer={
              analytics && analytics.visit_count > 0 ? (
                <span style={{ fontSize: 12, color: "#8A8378" }}>
                  ${analytics.avg_spend_per_visit.toFixed(2)} avg / visit
                </span>
              ) : undefined
            }
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            icon={<StarOutlined />}
            label="Average rating"
            value={`${(analytics?.avg_rating ?? 0).toFixed(1)} ★`}
            loading={isPending}
            footer={
              analytics ? (
                <span style={{ fontSize: 12, color: "#8A8378" }}>{analytics.reviews_count} reviews</span>
              ) : undefined
            }
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            icon={<MessageOutlined />}
            label="Reply rate"
            value={`${(analytics?.reply_rate ?? 0).toFixed(0)}%`}
            loading={isPending}
            footer={<span style={{ fontSize: 12, color: "#8A8378" }}>of reviews answered</span>}
          />
        </Col>
      </Row>

      <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
        <Col xs={24} lg={14}>
          <RevenueTrendChart data={analytics?.revenue_trend ?? []} loading={isPending} />
        </Col>
        <Col xs={24} lg={10}>
          <RatingDistributionChart data={analytics?.rating_distribution ?? []} loading={isPending} />
        </Col>
      </Row>

      <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
        <Col xs={24} lg={10}>
          <RatingTrendChart data={analytics?.rating_trend ?? []} loading={isPending} />
        </Col>
        <Col xs={24} lg={14}>
          <Card
            title="Recent reviews"
            style={{ borderRadius: 16, height: "100%" }}
            extra={
              <Link href={`/owner/restaurants/${id}`}>
                <Button type="link" size="small">
                  View &amp; reply to all
                </Button>
              </Link>
            }
          >
            {reviewsPending ? (
              <Skeleton active paragraph={{ rows: 6 }} />
            ) : recentReviews.length === 0 ? (
              <Empty description="No reviews yet" />
            ) : (
              recentReviews.map((review) => <ReviewCard key={review.id} review={review} />)
            )}
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
}
