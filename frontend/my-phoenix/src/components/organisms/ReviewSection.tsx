"use client";

import Link from "next/link";
import { Button, Card, Empty, Form, Input, Modal, Rate, Typography } from "antd";
import { useEffect, useState } from "react";

import { ReviewCard } from "@/components/molecules/ReviewCard";
import { api } from "@/lib/api";
import { useAuthToken } from "@/lib/auth";
import { useApiMutation } from "@/lib/hooks";
import type { Review } from "@/lib/types";

type ReviewFormValues = { rating: number; comment?: string };

export function ReviewSection({
  restaurantId,
  reviews,
}: {
  restaurantId: number;
  reviews: Review[];
}) {
  const { token } = useAuthToken("customer");
  const [editing, setEditing] = useState<Review | null>(null);
  const [form] = Form.useForm<ReviewFormValues>();
  const [editForm] = Form.useForm<ReviewFormValues>();
  const [mergedReviews, setMergedReviews] = useState<Review[]>(reviews);
  const invalidate = [["restaurant", String(restaurantId)]];

  useEffect(() => {
    // start from provided reviews and try to fetch owner-side reviews which may include
    // a nested `reply` object; merge owner reply text into our review objects.
    setMergedReviews(reviews);
    let mounted = true;
    (async () => {
      try {
        const { data } = await api.get(`/owner/restaurants/${restaurantId}/reviews`);
        const items = (data && data.data) ? data.data : data;
        if (!Array.isArray(items)) return;
        const byId = new Map<number, any>();
        items.forEach((r: any) => byId.set(r.id, r));
        const merged = reviews.map((r) => {
          const ownerRow = byId.get(r.id);
          const owner_reply = ownerRow?.reply?.owner_reply ?? ownerRow?.owner_reply ?? r.owner_reply ?? null;
          return { ...r, owner_reply } as Review;
        });
        if (mounted) setMergedReviews(merged);
      } catch (e) {
        // ignore - fall back to provided reviews
      }
    })();
    return () => {
      mounted = false;
    };
  }, [restaurantId, reviews]);

  const createReview = useApiMutation<ReviewFormValues>({
    request: (values) =>
      api.post(`/customer/restaurants/${restaurantId}/reviews`, {
        rating: values.rating,
        comment: values.comment ?? "",
      }),
    invalidate,
    successMessage: "Thanks for your review!",
  });

  const updateReview = useApiMutation<{ id: number; values: ReviewFormValues }>({
    request: ({ id, values }) =>
      api.put(`/customer/reviews/${id}`, { rating: values.rating, comment: values.comment ?? "" }),
    invalidate,
    successMessage: "Review updated",
  });

  const deleteReview = useApiMutation<number>({
    request: (id) => api.delete(`/customer/reviews/${id}`),
    invalidate,
    successMessage: "Review deleted",
  });

  return (
    <Card title={`Reviews (${reviews.length})`}>
      {token ? (
        <Form<ReviewFormValues>
          form={form}
          layout="vertical"
          onFinish={(values) =>
            createReview.mutate(values, { onSuccess: () => form.resetFields() })
          }
          style={{ marginBottom: 20 }}
        >
          <Form.Item
            name="rating"
            label="Your rating"
            rules={[
              { required: true, message: "Please pick a rating" },
              {
                type: "number",
                min: 1,
                max: 5,
                message: "Rating must be between 1 and 5",
              },
            ]}
          >
            <Rate />
          </Form.Item>
          <Form.Item
            name="comment"
            label="Your review"
            rules={[{ max: 1000, message: "Keep it under 1000 characters" }]}
          >
            <Input.TextArea rows={3} placeholder="What did you think of the food and service?" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={createReview.isPending}>
            Write a review
          </Button>
        </Form>
      ) : (
        <Typography.Paragraph type="secondary">
          <Link href="/customer/login">Log in as a diner</Link> to write a review.
        </Typography.Paragraph>
      )}

      {mergedReviews.length === 0 ? (
        <Empty description="No reviews yet — be the first" />
      ) : (
        mergedReviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            canEdit={Boolean(token)}
            onEdit={(r) => {
              setEditing(r);
              editForm.setFieldsValue({ rating: r.rating, comment: r.comment ?? "" });
            }}
            onDelete={(r) =>
              Modal.confirm({
                title: "Delete this review?",
                okText: "Delete",
                okButtonProps: { danger: true },
                onOk: () => deleteReview.mutateAsync(r.id),
              })
            }
          />
        ))
      )}

      <Modal
        open={editing !== null}
        title="Edit your review"
        okText="Save"
        confirmLoading={updateReview.isPending}
        onCancel={() => setEditing(null)}
        onOk={() => void editForm.submit()}
      >
        <Form<ReviewFormValues>
          form={editForm}
          layout="vertical"
          onFinish={(values) => {
            if (!editing) return;
            updateReview.mutate(
              { id: editing.id, values },
              { onSuccess: () => setEditing(null) },
            );
          }}
        >
          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, message: "Please pick a rating" }]}
          >
            <Rate />
          </Form.Item>
          <Form.Item name="comment" label="Comment" rules={[{ max: 1000 }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
