"use client";

import { useSearchParams } from "next/navigation";

import { Typography } from "antd";

import { RestaurantGrid } from "@/components/organisms/RestaurantGrid";
import { PublicLayout } from "@/components/templates/PublicLayout";
import { extractErrorMessage } from "@/lib/api";
import { useRestaurantSearch } from "@/lib/hooks";


export default function SearchPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const { data, isPending, error } = useRestaurantSearch(q);

  return (
    <PublicLayout>
      <Typography.Title level={2}>Search results</Typography.Title>
      <Typography.Paragraph type="secondary">
        {q ? `Showing matches for “${q}”` : "Type a restaurant name or cuisine in the search bar."}
      </Typography.Paragraph>
      <RestaurantGrid
        restaurants={data ?? []}
        loading={Boolean(q) && isPending}
        error={error ? extractErrorMessage(error, "Search failed") : null}
        emptyText={q ? `No restaurants matched “${q}”` : "Start typing to search"}
      />
    </PublicLayout>
  );
}
