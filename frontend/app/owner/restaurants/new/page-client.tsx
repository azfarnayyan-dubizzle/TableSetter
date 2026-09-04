"use client";

import { useRouter } from "next/navigation";
import { Card } from "antd";

import { RestaurantForm } from "@/components/organisms/RestaurantForm";
import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { api } from "@/lib/api";
import { useApiMutation } from "@/lib/hooks";
import type { Restaurant } from "@/lib/types";
import { unwrap } from "@/lib/unwrap";


export default function NewRestaurantPage() {
  const router = useRouter();

  const create = useApiMutation<Record<string, string>>({
    request: (values) => api.post("/owner/restaurants", values),
    invalidate: [["owner", "restaurants"]],
    successMessage: "Restaurant created",
  });

  return (
    <DashboardLayout role="owner" title="Add restaurant">
      <Card style={{ maxWidth: 720 }}>
        <RestaurantForm
          submitLabel="Create restaurant"
          loading={create.isPending}
          onSubmit={(values) =>
            create.mutate(values, {
              onSuccess: (data) => {
                const created = unwrap<Restaurant>(
                  (data as { data?: unknown } | undefined)?.data ?? data,
                );
                if (created?.id) {
                  router.push(`/owner/restaurants/${String(created.id)}`);
                } else {
                  void router.push("/owner/dashboard");
                }
              },
            })
          }
        />
      </Card>
    </DashboardLayout>
  );
}
