"use client";

import { Button, Card, Empty, Form, Input, InputNumber, Modal, Space, Switch, Typography } from "antd";
import { useState } from "react";

import { MenuItemRow } from "@/components/molecules/MenuItemRow";
import { api } from "@/lib/api";
import { useApiMutation, useOwnerCategories } from "@/lib/hooks";
import type { MenuCategory, MenuItem } from "@/lib/types";
import { toNumber } from "@/lib/unwrap";

type CategoryValues = { name: string };
type ItemValues = {
  name: string;
  description?: string;
  price: number;
  is_available: boolean;
};

export function MenuManager({ restaurantId }: { restaurantId: string }) {
  const { data: categories, isPending } = useOwnerCategories(restaurantId);
  const invalidate = [
    ["owner", "categories", restaurantId],
    ["owner", "restaurant", restaurantId],
  ];

  const [categoryModal, setCategoryModal] = useState<{ open: boolean; editing: MenuCategory | null }>(
    { open: false, editing: null },
  );
  const [itemModal, setItemModal] = useState<{
    open: boolean;
    categoryId: number | null;
    editing: MenuItem | null;
  }>({ open: false, categoryId: null, editing: null });

  const [categoryForm] = Form.useForm<CategoryValues>();
  const [itemForm] = Form.useForm<ItemValues>();

  const saveCategory = useApiMutation<{ editing: MenuCategory | null; values: CategoryValues }>({
    request: ({ editing, values }) =>
      editing
        ? api.put(`/owner/categories/${editing.id}`, values)
        : api.post(`/owner/restaurants/${restaurantId}/categories`, values),
    invalidate,
    successMessage: "Category saved",
  });

  const deleteCategory = useApiMutation<number>({
    request: (id) => api.delete(`/owner/categories/${id}`),
    invalidate,
    successMessage: "Category deleted",
  });

  const saveItem = useApiMutation<{
    categoryId: number;
    editing: MenuItem | null;
    values: ItemValues;
  }>({
    request: ({ categoryId, editing, values }) => {
      const body = {
        name: values.name,
        description: values.description ?? "",
        price: values.price,
        is_available: values.is_available,
      };
      return editing
        ? api.put(`/owner/menu-items/${editing.id}`, body)
        : api.post(`/owner/categories/${categoryId}/menu-items`, body);
    },
    invalidate,
    successMessage: "Menu item saved",
  });

  const deleteItem = useApiMutation<number>({
    request: (id) => api.delete(`/owner/menu-items/${id}`),
    invalidate,
    successMessage: "Menu item deleted",
  });

  const openCategory = (editing: MenuCategory | null) => {
    categoryForm.setFieldsValue({ name: editing?.name ?? "" });
    setCategoryModal({ open: true, editing });
  };

  const openItem = (categoryId: number, editing: MenuItem | null) => {
    itemForm.setFieldsValue({
      name: editing?.name ?? "",
      description: editing?.description ?? "",
      price: toNumber(editing?.price, 0),
      is_available: editing?.is_available ?? true,
    });
    setItemModal({ open: true, categoryId, editing });
  };

  return (
    <Card
      title="Menu"
      loading={isPending}
      extra={
        <Button type="primary" onClick={() => openCategory(null)}>
          Add category
        </Button>
      }
    >
      {(categories?.length ?? 0) === 0 ? (
        <Empty description="No categories yet — add your first one" />
      ) : (
        (categories ?? []).map((category) => {
          const items = category.menu_items ?? category.items ?? [];
          return (
            <div key={category.id} style={{ marginBottom: 28 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <Typography.Title level={5} style={{ margin: 0 }}>
                  {category.name}
                </Typography.Title>
                <Space size={4}>
                  <Button size="small" onClick={() => openItem(category.id, null)}>
                    Add item
                  </Button>
                  <Button size="small" type="link" onClick={() => openCategory(category)}>
                    Rename
                  </Button>
                  <Button
                    size="small"
                    type="link"
                    danger
                    onClick={() =>
                      Modal.confirm({
                        title: `Delete “${category.name}”?`,
                        content: "All menu items in this category will be removed.",
                        okText: "Delete",
                        okButtonProps: { danger: true },
                        onOk: () => deleteCategory.mutateAsync(category.id),
                      })
                    }
                  >
                    Delete
                  </Button>
                </Space>
              </div>
              {items.length === 0 ? (
                <Typography.Text type="secondary">No items yet</Typography.Text>
              ) : (
                items.map((item) => (
                  <MenuItemRow
                    key={item.id}
                    item={item}
                    manage
                    onEdit={(target) => openItem(category.id, target)}
                    onDelete={(target) =>
                      Modal.confirm({
                        title: `Delete “${target.name}”?`,
                        okText: "Delete",
                        okButtonProps: { danger: true },
                        onOk: () => deleteItem.mutateAsync(target.id),
                      })
                    }
                  />
                ))
              )}
            </div>
          );
        })
      )}

      <Modal
        open={categoryModal.open}
        title={categoryModal.editing ? "Rename category" : "New category"}
        okText="Save"
        confirmLoading={saveCategory.isPending}
        onCancel={() => setCategoryModal({ open: false, editing: null })}
        onOk={() => void categoryForm.submit()}
      >
        <Form<CategoryValues>
          form={categoryForm}
          layout="vertical"
          onFinish={(values) =>
            saveCategory.mutate(
              { editing: categoryModal.editing, values },
              { onSuccess: () => setCategoryModal({ open: false, editing: null }) },
            )
          }
        >
          <Form.Item
            name="name"
            label="Category name"
            rules={[{ required: true, message: "Name is required" }, { max: 255 }]}
          >
            <Input placeholder="Starters" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={itemModal.open}
        title={itemModal.editing ? "Edit menu item" : "New menu item"}
        okText="Save"
        confirmLoading={saveItem.isPending}
        onCancel={() => setItemModal({ open: false, categoryId: null, editing: null })}
        onOk={() => void itemForm.submit()}
      >
        <Form<ItemValues>
          form={itemForm}
          layout="vertical"
          onFinish={(values) => {
            if (itemModal.categoryId === null) return;
            saveItem.mutate(
              { categoryId: itemModal.categoryId, editing: itemModal.editing, values },
              { onSuccess: () => setItemModal({ open: false, categoryId: null, editing: null }) },
            );
          }}
        >
          <Form.Item
            name="name"
            label="Item name"
            rules={[{ required: true, message: "Name is required" }, { max: 255 }]}
          >
            <Input placeholder="Cacio e pepe" />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ max: 1000 }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: "Price is required" },
              { type: "number", min: 0, message: "Price cannot be negative" },
            ]}
          >
            <InputNumber min={0} step={0.5} precision={2} prefix="$" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="is_available" label="Available" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
