"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Alert, Button, Card, Form, Input, Typography } from "antd";
import { useState } from "react";

import { extractErrorMessage, type Role } from "@/lib/api";
import { authenticate } from "@/lib/auth";
import { BRAND } from "@/lib/theme";

type Mode = "login" | "register";

type FormValues = {
  name?: string;
  email: string;
  password: string;
  password_confirmation?: string;
};

const COPY: Record<Role, { label: string; blurb: string }> = {
  owner: {
    label: "Restaurant Owner",
    blurb: "Manage your restaurants, menus and guest reviews.",
  },
  customer: {
    label: "Diner",
    blurb: "Discover restaurants, log meals and share reviews.",
  },
};

export function AuthForm({ role, mode }: { role: Role; mode: Mode }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isRegister = mode === "register";
  const other = isRegister ? "login" : "register";

  const onFinish = async (values: FormValues) => {
    setError(null);
    setLoading(true);
    try {
      await authenticate(role, mode, {
        ...(values.name ? { name: values.name } : {}),
        email: values.email,
        password: values.password,
        ...(isRegister ? { password_confirmation: values.password_confirmation ?? "" } : {}),
      });
      await router.push(role === "owner" ? "/owner/dashboard" : "/customer/dashboard");
    } catch (e) {
      setError(extractErrorMessage(e, "Unable to authenticate. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ width: "100%", maxWidth: 460 }} styles={{ body: { padding: 32 } }}>
      <Typography.Text style={{ color: BRAND.red, fontWeight: 700, letterSpacing: 1 }}>
        {COPY[role].label.toUpperCase()}
      </Typography.Text>
      <Typography.Title level={2} style={{ marginTop: 8, marginBottom: 4 }}>
        {isRegister ? "Create your account" : "Welcome back"}
      </Typography.Title>
      <Typography.Paragraph type="secondary">{COPY[role].blurb}</Typography.Paragraph>

      {error && <Alert type="error" message={error} showIcon style={{ marginBottom: 20 }} />}

      <Form<FormValues> layout="vertical" onFinish={onFinish} requiredMark={false} size="large">
        {isRegister && (
          <Form.Item
            name="name"
            label="Full name"
            rules={[{ required: true, message: "Please enter your name" }, { max: 255 }]}
          >
            <Input placeholder="Jane Doe" autoComplete="name" />
          </Form.Item>
        )}
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Enter a valid email address" },
          ]}
        >
          <Input placeholder="you@example.com" autoComplete="email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Please enter your password" },
            ...(isRegister ? [{ min: 8, message: "Use at least 8 characters" }] : []),
          ]}
        >
          <Input.Password
            placeholder="••••••••"
            autoComplete={isRegister ? "new-password" : "current-password"}
          />
        </Form.Item>
        {isRegister && (
          <Form.Item
            name="password_confirmation"
            label="Confirm password"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator: (_, value: string) =>
                  !value || value === getFieldValue("password")
                    ? Promise.resolve()
                    : Promise.reject(new Error("Passwords do not match")),
              }),
            ]}
          >
            <Input.Password placeholder="••••••••" autoComplete="new-password" />
          </Form.Item>
        )}
        <Button type="primary" htmlType="submit" block loading={loading}>
          {isRegister ? "Create account" : "Log in"}
        </Button>
      </Form>

      <Typography.Paragraph style={{ marginTop: 20, marginBottom: 0, textAlign: "center" }}>
        {isRegister ? "Already have an account? " : "New to Tablesetter? "}
        <Link href={role === "owner" ? `/owner/${other}` : `/customer/${other}`}>
          {isRegister ? "Log in" : "Create an account"}
        </Link>
      </Typography.Paragraph>
      <Typography.Paragraph type="secondary" style={{ textAlign: "center", marginBottom: 0 }}>
        {role === "owner" ? (
          <Link href="/customer/login">I&apos;m a diner instead</Link>
        ) : (
          <Link href="/owner/login">I own a restaurant</Link>
        )}
      </Typography.Paragraph>
    </Card>
  );
}
