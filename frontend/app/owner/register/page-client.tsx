"use client";

import { AuthForm } from "@/components/organisms/AuthForm";
import { AuthLayout } from "@/components/templates/AuthLayout";

export default function Page() {
  return (
    <AuthLayout>
      <AuthForm role="owner" mode="register" />
    </AuthLayout>
  );
}
