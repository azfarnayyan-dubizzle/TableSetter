"use client";

import { Button, Card, DatePicker, Form, Input, Skeleton, Statistic } from "antd";
import dayjs, { type Dayjs } from "dayjs";
import { useEffect } from "react";

import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { api } from "@/lib/api";
import { useAuthToken } from "@/lib/auth";
import { useApiMutation, useCustomerProfile } from "@/lib/hooks";
import { BRAND } from "@/lib/theme";

type ProfileFormValues = {
  phone_number: string;
  date_of_birth: Dayjs | null;
  dietary_preferences: string;
};

type ProfilePayload = {
  phone_number: string;
  date_of_birth: string | null;
  dietary_preferences: string;
};


export default function CustomerProfilePage() {
  const { token } = useAuthToken("customer");
  const { data: profile, isPending } = useCustomerProfile(Boolean(token));
  const [form] = Form.useForm<ProfileFormValues>();

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        phone_number: profile.phone_number ?? "",
        date_of_birth: profile.date_of_birth ? dayjs(profile.date_of_birth) : null,
        dietary_preferences: profile.dietary_preferences ?? "",
      });
    }
  }, [profile, form]);

  const save = useApiMutation<ProfilePayload>({
    request: (values) => api.put("/customer/profile", values),
    invalidate: [["customer", "profile"]],
    successMessage: "Profile updated",
  });

  return (
    <DashboardLayout role="customer" title="My profile">
      <div style={{ display: "grid", gap: 24, maxWidth: 640 }}>
        <Card style={{ background: BRAND.redSoft, borderColor: "#F4D2D7" }}>
          {isPending ? (
            <Skeleton active paragraph={{ rows: 1 }} />
          ) : (
            <Statistic
              title="Loyalty points"
              value={profile?.loyalty_points ?? 0}
              valueStyle={{ color: BRAND.red, fontWeight: 700 }}
              suffix="pts"
            />
          )}
        </Card>

        <Card title="Personal details">
          {isPending ? (
            <Skeleton active paragraph={{ rows: 5 }} />
          ) : (
            <Form<ProfileFormValues>
              form={form}
              layout="vertical"
              requiredMark={false}
              onFinish={(values) =>
                save.mutate({
                  phone_number: values.phone_number,
                  date_of_birth: values.date_of_birth
                    ? values.date_of_birth.format("YYYY-MM-DD")
                    : null,
                  dietary_preferences: values.dietary_preferences ?? "",
                })
              }
            >
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

              <Form.Item
                name="date_of_birth"
                label="Date of birth"
                rules={[{ required: true, message: "Date of birth is required" }]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  format="YYYY-MM-DD"
                  disabledDate={(current) => current && current.isAfter(dayjs(), "day")}
                />
              </Form.Item>

              <Form.Item
                name="dietary_preferences"
                label="Dietary preferences"
                rules={[{ max: 255 }]}
              >
                <Input.TextArea
                  rows={3}
                  placeholder="Vegetarian, no shellfish, gluten-free…"
                />
              </Form.Item>

              <Button type="primary" htmlType="submit" loading={save.isPending}>
                Save profile
              </Button>
            </Form>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
