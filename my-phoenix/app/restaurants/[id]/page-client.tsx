"use client";

import { useParams } from "next/navigation";

import { Alert, Card, Col, Divider, Empty, Row, Skeleton, Space, Typography } from "antd";

import { PriceRangeTag } from "@/components/atoms/PriceTag";
import { RatingStars } from "@/components/atoms/RatingStars";
import { MenuItemRow } from "@/components/molecules/MenuItemRow";
import { ReviewSection } from "@/components/organisms/ReviewSection";
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
      <Card style={{ marginBottom: 24 }}>
        <Typography.Title level={1} style={{ fontSize: 34, marginBottom: 8 }}>
          {restaurant.name}
        </Typography.Title>
        <Space wrap size={12} style={{ marginBottom: 12 }}>
          <Typography.Text type="secondary">{restaurant.cuisine_type ?? "Cuisine n/a"}</Typography.Text>
          <PriceRangeTag range={restaurant.price_range} />
          <RatingStars
            value={restaurant.average_rating}
            count={restaurant.reviews_count ?? restaurant.reviews?.length}
            size="md"
          />
        </Space>
        {restaurant.description && (
          <Typography.Paragraph>{restaurant.description}</Typography.Paragraph>
        )}
        {restaurant.address && (
          <Typography.Text type="secondary">{restaurant.address}</Typography.Text>
        )}
      </Card>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={13}>
          <Card title="Menu">
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
