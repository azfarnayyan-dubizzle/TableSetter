"use client";

import Link from "next/link";
import Alert from "antd/es/alert";
import Button from "antd/es/button";
import Card from "antd/es/card";
import Col from "antd/es/col";
import Empty from "antd/es/empty";
import Row from "antd/es/row";
import Skeleton from "antd/es/skeleton";
import Space from "antd/es/space";
import Text from "antd/es/typography/Text";
import Paragraph from "antd/es/typography/Paragraph";

import { PriceRangeTag } from "@/components/atoms/PriceTag";
import { RatingStars } from "@/components/atoms/RatingStars";
import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { extractErrorMessage } from "@/lib/api";
import { useAuthToken } from "@/lib/auth";
import { useOwnerRestaurants } from "@/lib/hooks";

export default function OwnerDashboard() {
  const { token } = useAuthToken("owner");
  const { data, isPending, error } = useOwnerRestaurants(Boolean(token));

  return (
    <DashboardLayout
      role="owner"
      title="My restaurants"
      extra={
        <Link href="/owner/restaurants/new">
          <Button type="primary">Add restaurant</Button>
        </Link>
      }
    >
      {error && (
        <Alert
          type="error"
          showIcon
          message={extractErrorMessage(error, "Could not load your restaurants")}
          style={{ marginBottom: 20 }}
        />
      )}

      {isPending ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : (data?.length ?? 0) === 0 ? (
        <Card>
          <Empty description="No restaurants yet — add your first one">
            <Link href="/owner/restaurants/new">
              <Button type="primary">Add restaurant</Button>
            </Link>
          </Empty>
        </Card>
      ) : (
        <Row gutter={[20, 20]}>
          {(data ?? []).map((restaurant) => (
            <Col key={restaurant.id} xs={24} md={12}>
              <Card
                title={restaurant.name}
                extra={
                  <Space size={12}>
                    <Link href={`/owner/restaurants/${String(restaurant.id)}/analytics`}>
                      Analytics
                    </Link>
                    <Link href={`/owner/restaurants/${String(restaurant.id)}`}>
                      Manage
                    </Link>
                  </Space>
                }
              >
                <Space direction="vertical" size={8} style={{ width: "100%" }}>
                  <Space wrap>
                    <Text type="secondary">{restaurant.cuisine_type ?? "Cuisine n/a"}</Text>
                    <PriceRangeTag range={restaurant.price_range} />
                  </Space>
                  <RatingStars value={restaurant.average_rating} count={restaurant.reviews_count} />
                  <Paragraph type="secondary" ellipsis={{ rows: 2 }} style={{ marginBottom: 0 }}>
                    {restaurant.description ?? "No description yet"}
                  </Paragraph>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </DashboardLayout>
  );
}
