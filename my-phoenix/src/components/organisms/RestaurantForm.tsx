"use client";

import { Button, Form, Input, Select } from "antd";

export type RestaurantFormValues = {
  name: string;
  description: string;
  address: string;
  cuisine_type: string;
  price_range: string;
};

const CUISINES = [
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

export function RestaurantForm({
  initialValues,
  submitLabel,
  loading,
  onSubmit,
}: {
  initialValues?: Partial<RestaurantFormValues>;
  submitLabel: string;
  loading?: boolean;
  onSubmit: (values: RestaurantFormValues) => void;
}) {
  return (
    <Form<RestaurantFormValues>
      layout="vertical"
      requiredMark={false}
      {...(initialValues ? { initialValues } : {})}
      onFinish={onSubmit}
    >
      <Form.Item
        name="name"
        label="Restaurant name"
        rules={[{ required: true, message: "Name is required" }, { max: 255 }]}
      >
        <Input placeholder="Osteria Rossa" />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Description is required" }, { max: 2000 }]}
      >
        <Input.TextArea rows={4} placeholder="Wood-fired Roman classics in a warm, tiled dining room." />
      </Form.Item>
      <Form.Item
        name="address"
        label="Address"
        rules={[{ required: true, message: "Address is required" }, { max: 255 }]}
      >
        <Input placeholder="128 Grand Street, Brooklyn" />
      </Form.Item>
      <Form.Item
        name="cuisine_type"
        label="Cuisine type"
        rules={[{ required: true, message: "Pick a cuisine" }]}
      >
        <Select
          showSearch
          placeholder="Select cuisine"
          options={CUISINES.map((c) => ({ label: c, value: c }))}
        />
      </Form.Item>
      <Form.Item
        name="price_range"
        label="Price range"
        rules={[{ required: true, message: "Pick a price range" }]}
      >
        <Select
          placeholder="Select price range"
          options={["$", "$$", "$$$", "$$$$"].map((p) => ({ label: p, value: p }))}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={loading ?? false}>
        {submitLabel}
      </Button>
    </Form>
  );
}
