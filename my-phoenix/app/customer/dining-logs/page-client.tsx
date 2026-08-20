"use client";

import { Button, Card, Col, DatePicker, Empty, Modal, Row, Statistic, Table, Tag } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

import { DiningLogForm, type DiningLogValues } from "@/components/organisms/DiningLogForm";
import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { api } from "@/lib/api";
import { useAuthToken } from "@/lib/auth";
import {
  useApiMutation,
  useDiningLogs,
  usePublicRestaurants,
  useSpendingSummary,
} from "@/lib/hooks";
import type { DiningLog } from "@/lib/types";
import { toNumber } from "@/lib/unwrap";


const money = (value: unknown) => `$${toNumber(value).toFixed(2)}`;

export default function DiningLogsPage() {
  const { token } = useAuthToken("customer");
  const enabled = Boolean(token);
  const [month, setMonth] = useState<string | undefined>(undefined);
  const [modal, setModal] = useState<{ open: boolean; editing: DiningLog | null }>({
    open: false,
    editing: null,
  });

  const { data: logs, isPending } = useDiningLogs(month, enabled);
  const { data: summary } = useSpendingSummary(month, enabled);
  const { data: restaurantPage } = usePublicRestaurants({});
  const restaurants = restaurantPage?.items ?? [];

  const invalidate = [
    ["customer", "dining-logs"],
    ["customer", "dining-summary"],
  ];

  const save = useApiMutation<{ editing: DiningLog | null; values: DiningLogValues }>({
    request: ({ editing, values }) => {
      const body = {
        restaurant_id: values.restaurant_id ?? null,
        amount_spent: values.amount_spent,
        note: values.note ?? "",
        ...(values.logged_at ? { logged_at: values.logged_at.format("YYYY-MM-DD") } : {}),
      };
      return editing
        ? api.put(`/customer/dining-logs/${editing.id}`, body)
        : api.post("/customer/dining-logs", body);
    },
    invalidate,
    successMessage: "Dining entry saved",
  });

  const remove = useApiMutation<number>({
    request: (id) => api.delete(`/customer/dining-logs/${id}`),
    invalidate,
    successMessage: "Entry deleted",
  });

  return (
    <DashboardLayout role="customer" title="Dining log">
      <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="Total spent" value={money(summary?.total_spent)} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="Entries" value={summary?.entry_count ?? logs?.length ?? 0} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <div style={{ marginBottom: 8, fontSize: 14, opacity: 0.65 }}>Month</div>
            <DatePicker
              picker="month"
              allowClear
              style={{ width: "100%" }}
              value={month ? dayjs(`${month}-01`) : null}
              onChange={(value) => setMonth(value ? value.format("YYYY-MM") : undefined)}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="Entries"
        extra={
          <Button type="primary" onClick={() => setModal({ open: true, editing: null })}>
            Add entry
          </Button>
        }
      >
        <Table<DiningLog>
          rowKey="id"
          loading={isPending}
          dataSource={logs ?? []}
          scroll={{ x: 640 }}
          pagination={{ pageSize: 10, hideOnSinglePage: true }}
          locale={{
            emptyText: <Empty description="No dining entries yet — log your first meal" />,
          }}
          columns={[
            {
              title: "Restaurant",
              dataIndex: "restaurant_id",
              render: (_value, record) =>
                record.restaurant?.name ??
                record.restaurant_name ??
                restaurants.find((r) => r.id === record.restaurant_id)?.name ?? (
                  <Tag>Not linked</Tag>
                ),
            },
            {
              title: "Amount",
              dataIndex: "amount_spent",
              render: (value) => money(value),
              sorter: (a, b) => toNumber(a.amount_spent) - toNumber(b.amount_spent),
            },
            { title: "Note", dataIndex: "note", render: (value: string | null) => value || "—" },
            {
              title: "Date",
              dataIndex: "logged_at",
              render: (_value, record) => {
                const raw = record.logged_at ?? record.created_at;
                return raw ? dayjs(raw).format("MMM D, YYYY") : "—";
              },
            },
            {
              title: "",
              key: "actions",
              align: "right",
              render: (_value, record) => (
                <>
                  <Button
                    type="link"
                    size="small"
                    onClick={() => setModal({ open: true, editing: record })}
                  >
                    Edit
                  </Button>
                  <Button
                    type="link"
                    size="small"
                    danger
                    onClick={() =>
                      Modal.confirm({
                        title: "Delete this entry?",
                        okText: "Delete",
                        okButtonProps: { danger: true },
                        onOk: () => remove.mutateAsync(record.id),
                      })
                    }
                  >
                    Delete
                  </Button>
                </>
              ),
            },
          ]}
        />
      </Card>

      <DiningLogForm
        open={modal.open}
        editing={modal.editing}
        restaurants={restaurants}
        loading={save.isPending}
        onCancel={() => setModal({ open: false, editing: null })}
        onSubmit={(values) =>
          save.mutate(
            { editing: modal.editing, values },
            { onSuccess: () => setModal({ open: false, editing: null }) },
          )
        }
      />
    </DashboardLayout>
  );
}
