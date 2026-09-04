"use client";

import { DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

import type { DiningLog, Restaurant } from "@/lib/types";
import { toNumber } from "@/lib/unwrap";

export type DiningLogValues = {
  restaurant_id?: number | undefined;
  amount_spent: number;
  note?: string | undefined;
  logged_at?: dayjs.Dayjs | undefined;
};

export function DiningLogForm({
  open,
  editing,
  restaurants,
  loading,
  onCancel,
  onSubmit,
}: {
  open: boolean;
  editing: DiningLog | null;
  restaurants: Restaurant[];
  loading?: boolean;
  onCancel: () => void;
  onSubmit: (values: DiningLogValues) => void;
}) {
  const [form] = Form.useForm<DiningLogValues>();

  useEffect(() => {
    if (!open) return;
    form.setFieldsValue({
      restaurant_id: editing?.restaurant_id ?? undefined,
      amount_spent: toNumber(editing?.amount_spent, 0),
      note: editing?.note ?? "",
      logged_at: editing?.logged_at ? dayjs(editing.logged_at) : dayjs(),
    });
  }, [open, editing, form]);

  return (
    <Modal
      open={open}
      title={editing ? "Edit dining entry" : "Log a meal"}
      okText="Save entry"
      confirmLoading={loading ?? false}
      onCancel={onCancel}
      onOk={() => void form.submit()}
      destroyOnHidden
    >
      <Form<DiningLogValues> form={form} layout="vertical" requiredMark={false} onFinish={onSubmit}>
        <Form.Item name="restaurant_id" label="Restaurant (optional)">
          <Select
            allowClear
            showSearch
            optionFilterProp="label"
            placeholder="Where did you eat?"
            options={restaurants.map((r) => ({ label: r.name, value: r.id }))}
          />
        </Form.Item>
        <Form.Item
          name="amount_spent"
          label="Amount spent"
          rules={[
            { required: true, message: "Amount is required" },
            { type: "number", min: 0, message: "Amount cannot be negative" },
          ]}
        >
          <InputNumber min={0} step={1} precision={0} prefix="Rs" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="logged_at" label="Date">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="note" label="Note" rules={[{ max: 500 }]}>
          <Input.TextArea rows={3} placeholder="Anniversary dinner — the tasting menu was superb." />
        </Form.Item>
      </Form>
    </Modal>
  );
}
