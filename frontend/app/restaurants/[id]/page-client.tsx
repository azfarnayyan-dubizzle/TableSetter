"use client";

import { useParams } from "next/navigation";

import { Alert, Card, Col, Divider, Empty, Row, Skeleton, Space, Typography } from "antd";

import { PriceRangeTag } from "@/components/atoms/PriceTag";
import { RatingStars } from "@/components/atoms/RatingStars";
import { MenuItemRow } from "@/components/molecules/MenuItemRow";
import { ReviewSection } from "@/components/organisms/ReviewSection";
import { getRestaurantImage } from "@/lib/restaurantImages";
import { PublicLayout } from "@/components/templates/PublicLayout";
import { extractErrorMessage } from "@/lib/api";
import { usePublicRestaurant } from "@/lib/hooks";


export default function RestaurantDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: restaurant, isPending, error } = usePublicRestaurant(id);

  if (isPending) {
    return (
      <PublicLayout>
        <Skeleton active paragraph={{ rows: 8 }} />
      </PublicLayout>
    );
  }

  if (error || !restaurant) {
    return (
      <PublicLayout>
        <Alert
          type="error"
          showIcon
          message={extractErrorMessage(error, "This restaurant could not be loaded")}
        />
      </PublicLayout>
    );
  }

  const categories = restaurant.categories ?? [];

  return (
    <PublicLayout>
      <Card
        style={{ marginBottom: 28, overflow: "hidden" }}
        styles={{ body: { padding: 0 } }}
      >
        <div style={{ position: "relative", height: 320, overflow: "hidden" }}>
          <img
            src={getRestaurantImage(restaurant.id)}
            alt={restaurant.name ?? "restaurant image"}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(26,24,23,0.05) 0%, rgba(26,24,23,0.35) 45%, rgba(26,24,23,0.86) 100%)",
            }}
          />
          <div style={{ position: "absolute", left: 32, right: 32, bottom: 26 }}>
            <span
              className="ts-eyebrow"
              style={{ color: "rgba(255,255,255,0.85)", fontSize: 11 }}
            >
              {restaurant.cuisine_type ?? "Cuisine n/a"}
            </span>
            <Typography.Title
              level={1}
              style={{ fontSize: 40, marginTop: 8, marginBottom: 0, color: "#FFFFFF" }}
            >
              {restaurant.name}
            </Typography.Title>
          </div>
        </div>
        <div style={{ padding: "24px 32px 28px" }}>
          <Space wrap size={14} style={{ marginBottom: 14 }}>
            <PriceRangeTag range={restaurant.price_range} />
            <RatingStars
              value={restaurant.average_rating}
              count={restaurant.reviews_count ?? restaurant.reviews?.length}
              size="md"
            />
          </Space>
          {restaurant.description && (
            <Typography.Paragraph style={{ fontSize: 16, lineHeight: 1.65, maxWidth: 760 }}>
              {restaurant.description}
            </Typography.Paragraph>
          )}
          {restaurant.address && (
            <Typography.Text type="secondary">{restaurant.address}</Typography.Text>
          )}
        </div>
      </Card>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={13}>
          <Card title="Menu" styles={{ body: { padding: 24 } }}>
            {categories.length === 0 ? (
              <Empty description="No menu published yet" />
            ) : (
              categories.map((category, index) => {
                const items = category.menu_items ?? category.items ?? [];
                return (
                  <div key={category.id}>
                    {index > 0 && <Divider />}
                    <Typography.Title level={5}>{category.name}</Typography.Title>
                    {items.length === 0 ? (
                      <Typography.Text type="secondary">No items in this category</Typography.Text>
                    ) : (
                      items.map((item) => <MenuItemRow key={item.id} item={item} />)
                    )}
                  </div>
                );
              })
            )}
          </Card>
        </Col>
        <Col xs={24} lg={11}>
          <ReviewSection restaurantId={restaurant.id} reviews={restaurant.reviews ?? []} />
        </Col>
      </Row>
    </PublicLayout>
  );
}
