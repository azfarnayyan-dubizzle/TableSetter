"use client";

import { Button, Card, Descriptions, Form, Input, Skeleton } from "antd";
import { useEffect } from "react";

import { StatusBadge } from "@/components/atoms/StatusBadge";
import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { api } from "@/lib/api";
import { useAuthToken } from "@/lib/auth";
import { useApiMutation, useOwnerProfile } from "@/lib/hooks";

type ProfileValues = { business_tax_id: string; phone_number: string };


export default function OwnerProfilePage() {
  const { token } = useAuthToken("owner");
  const { data: profile, isPending } = useOwnerProfile(Boolean(token));
  const [form] = Form.useForm<ProfileValues>();

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        business_tax_id: profile.business_tax_id ?? "",
        phone_number: profile.phone_number ?? "",
      });
    }
  }, [profile, form]);

  const save = useApiMutation<ProfileValues>({
    request: (values) => api.put("/owner/profile", values),
    invalidate: [["owner", "profile"]],
    successMessage: "Profile updated",
  });

  return (
    <DashboardLayout role="owner" title="Business profile">
      <Card style={{ maxWidth: 640 }}>
        {isPending ? (
          <Skeleton active paragraph={{ rows: 5 }} />
        ) : (
          <>
            <Descriptions column={1} style={{ marginBottom: 24 }}>
              <Descriptions.Item label="Identity verification">
                <StatusBadge
                  status={profile?.verification_status ?? Boolean(profile?.identity_verified)}
                  trueLabel="Verified"
                  falseLabel="Pending verification"
                />
              </Descriptions.Item>
            </Descriptions>
            <Form<ProfileValues>
              form={form}
              layout="vertical"
              requiredMark={false}
              onFinish={(values) => save.mutate(values)}
            >
              <Form.Item
                name="business_tax_id"
                label="Business tax ID"
                rules={[{ required: true, message: "Tax ID is required" }, { max: 50 }]}
              >
                <Input placeholder="12-3456789" />
              </Form.Item>
              <Form.Item
                name="phone_number"
                label="Phone number"
                rules={[
                  { required: true, message: "Phone number is required" },
                  { max: 30 },
                  { pattern: /^[0-9+()\-\s]+$/, message: "Enter a valid phone number" },
                ]}
              >
                <Input placeholder="+1 555 018 2244" />
              </Form.Item>
              <Button type="primary" htmlType="submit" loading={save.isPending}>
                Save profile
              </Button>
            </Form>
          </>
        )}
      </Card>
    </DashboardLayout>
  );
}
