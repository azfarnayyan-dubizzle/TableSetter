"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import Alert from "antd/es/alert";
import Button from "antd/es/button";
import Card from "antd/es/card";
import Col from "antd/es/col";
import Empty from "antd/es/empty";
import Form from "antd/es/form";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import Modal from "antd/es/modal";
import Row from "antd/es/row";
import Skeleton from "antd/es/skeleton";
import { useState } from "react";

import { ReviewCard } from "@/components/molecules/ReviewCard";
import { MenuManager } from "@/components/organisms/MenuManager";
import { RestaurantForm } from "@/components/organisms/RestaurantForm";
import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { api, extractErrorMessage } from "@/lib/api";
import { useAuthToken } from "@/lib/auth";
import { useApiMutation, useOwnerRestaurant, useOwnerRestaurantReviews } from "@/lib/hooks";
import type { Review } from "@/lib/types";

export default function ManageRestaurantPage() {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuthToken("owner");
  const enabled = Boolean(token);
  const { data: restaurant, isPending, error } = useOwnerRestaurant(id, enabled);
  const { data: reviews } = useOwnerRestaurantReviews(id, enabled);
  const [replyTo, setReplyTo] = useState<Review | null>(null);
  const [replyForm] = Form.useForm<{ owner_reply: string }>();

  const update = useApiMutation<Record<string, string>>({
    request: (values) => api.put(`/owner/restaurants/${id}`, values),
    invalidate: [
      ["owner", "restaurant", id],
      ["owner", "restaurants"],
    ],
    successMessage: "Restaurant updated",
  });

  const reply = useApiMutation<{ reviewId: number; owner_reply: string }>({
    request: ({ reviewId, owner_reply }) =>
      api.post(`/owner/reviews/${reviewId}/reply`, { owner_reply }),
    invalidate: [["owner", "reviews", id]],
    successMessage: "Reply posted",
  });

  return (
    <DashboardLayout
      role="owner"
      title={restaurant?.name ?? "Manage restaurant"}
      extra={
        <Link href={`/owner/restaurants/${id}/analytics`}>
          <Button>View analytics</Button>
        </Link>
      }
    >
      {error && (
        <Alert
          type="error"
          showIcon
          style={{ marginBottom: 20 }}
          message={extractErrorMessage(error, "Could not load this restaurant")}
        />
      )}

      {isPending ? (
        <Skeleton active paragraph={{ rows: 8 }} />
      ) : (
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card title="Restaurant details">
              <RestaurantForm
                submitLabel="Save changes"
                loading={update.isPending}
                initialValues={{
                  name: restaurant?.name ?? "",
                  description: restaurant?.description ?? "",
                  address: restaurant?.address ?? "",
                  cuisine_type: restaurant?.cuisine_type ?? "",
                  price_range: restaurant?.price_range ?? "",
                }}
                onSubmit={(values) => update.mutate(values)}
              />
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <MenuManager restaurantId={id} />
            <Card title={`Reviews (${reviews?.length ?? 0})`} style={{ marginTop: 24 }}>
              {(reviews?.length ?? 0) === 0 ? (
                <Empty description="No reviews yet" />
              ) : (
                (reviews ?? []).map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    canReply
                    onReply={(target) => {
                      replyForm.setFieldsValue({ owner_reply: target.owner_reply ?? "" });
                      setReplyTo(target);
                    }}
                  />
                ))
              )}
            </Card>
          </Col>
        </Row>
      )}

      <Modal
        open={replyTo !== null}
        title="Reply to review"
        okText="Post reply"
        confirmLoading={reply.isPending}
        onCancel={() => setReplyTo(null)}
        onOk={() => void replyForm.submit()}
      >
        <Form<{ owner_reply: string }>
          form={replyForm}
          layout="vertical"
          onFinish={(values) => {
            if (!replyTo) return;
            reply.mutate(
              { reviewId: replyTo.id, owner_reply: values.owner_reply },
              { onSuccess: () => setReplyTo(null) },
            );
          }}
        >
          <FormItem
            name="owner_reply"
            label="Your reply"
            rules={[{ required: true, message: "Write a reply" }, { max: 1000 }]}
          >
            <TextArea rows={4} placeholder="Thanks for dining with us…" />
          </FormItem>
        </Form>
      </Modal>
    </DashboardLayout>
  );
}
