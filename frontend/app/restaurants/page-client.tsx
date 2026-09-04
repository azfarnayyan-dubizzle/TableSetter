"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Card, Col, Pagination, Row, Select, Slider, Space, Typography } from "antd";

import { RestaurantGrid } from "@/components/organisms/RestaurantGrid";
import { PublicLayout } from "@/components/templates/PublicLayout";
import { extractErrorMessage } from "@/lib/api";
import { usePublicRestaurants } from "@/lib/hooks";

type SearchParams = {
  page?: number | undefined;
  cuisine_type?: string | undefined;
  price_range?: string | undefined;
  min_rating?: number | undefined;
};

const CUISINES = [
  "Pakistani",
  "Italian",
  "Japanese",
  "Mexican",
  "Indian",
  "Chinese",
  "French",
  "Thai",
  "American",
  "Mediterranean",
  "Vegan",
];


export default function RestaurantsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const search: SearchParams = {
    page: Number(searchParams.get("page") ?? 1) || 1,
    ...(searchParams.get("cuisine_type") ? { cuisine_type: searchParams.get("cuisine_type") as string } : {}),
    ...(searchParams.get("price_range") ? { price_range: searchParams.get("price_range") as string } : {}),
    ...(Number(searchParams.get("min_rating") ?? 0) > 0
      ? { min_rating: Number(searchParams.get("min_rating")) }
      : {}),
  };

  const pushSearch = (next: SearchParams) => {
    const params = new URLSearchParams();
    if (next.page && next.page > 1) params.set("page", String(next.page));
    if (next.cuisine_type) params.set("cuisine_type", next.cuisine_type);
    if (next.price_range) params.set("price_range", next.price_range);
    if (next.min_rating) params.set("min_rating", String(next.min_rating));
    const qs = params.toString();
    router.push(qs ? `/restaurants?${qs}` : "/restaurants");
  };
  const { data, isPending, error } = usePublicRestaurants(search);

  const update = (patch: Partial<SearchParams>) => {
    pushSearch({ ...search, page: 1, ...patch });
  };

  return (
    <PublicLayout>
      <div style={{ marginBottom: 26 }}>
        <span className="ts-eyebrow" style={{ color: "#D7263D" }}>
          The directory
        </span>
        <Typography.Title level={2} style={{ marginTop: 8, marginBottom: 6 }}>
          Browse restaurants
        </Typography.Title>
        <Typography.Paragraph type="secondary" style={{ marginBottom: 0, fontSize: 16 }}>
          Filter by cuisine, price range and minimum rating.
        </Typography.Paragraph>
      </div>

      <Card style={{ marginBottom: 28 }} styles={{ body: { padding: 24 } }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={8}>
            <Typography.Text strong>Cuisine</Typography.Text>
            <Select
              allowClear
              placeholder="Any cuisine"
              style={{ width: "100%", marginTop: 6 }}
              value={search.cuisine_type ?? undefined}
              onChange={(value: string | undefined) => update({ cuisine_type: value })}
              options={CUISINES.map((c) => ({ label: c, value: c }))}
            />
          </Col>
          <Col xs={24} md={8}>
            <Typography.Text strong>Price range</Typography.Text>
            <Select
              allowClear
              placeholder="Any price"
              style={{ width: "100%", marginTop: 6 }}
              value={search.price_range ?? undefined}
              onChange={(value: string | undefined) => update({ price_range: value })}
              options={["$", "$$", "$$$", "$$$$"].map((p) => ({ label: p, value: p }))}
            />
          </Col>
          <Col xs={24} md={8}>
            <Typography.Text strong>Minimum rating: {search.min_rating ?? 0}</Typography.Text>
            <Slider
              min={0}
              max={5}
              step={1}
              value={search.min_rating ?? 0}
              onChangeComplete={(value: number) => update({ min_rating: value || undefined })}
            />
          </Col>
        </Row>
      </Card>

      <RestaurantGrid
        restaurants={data?.items ?? []}
        loading={isPending}
        error={error ? extractErrorMessage(error, "Could not load restaurants") : null}
        emptyText="No restaurants match these filters yet"
      />

      <Space style={{ marginTop: 32, width: "100%", justifyContent: "center" }}>
        <Pagination
          current={data?.currentPage ?? search.page ?? 1}
          total={data?.total ?? 0}
          pageSize={data?.perPage ?? 12}
          showSizeChanger={false}
          onChange={(page) => pushSearch({ ...search, page })}
        />
      </Space>
    </PublicLayout>
  );
}
