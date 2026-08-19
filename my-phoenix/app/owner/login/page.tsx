import type { Metadata } from "next";
import { AuthForm } from "@/components/organisms/AuthForm";
import { AuthLayout } from "@/components/templates/AuthLayout";

export const metadata: Metadata = {
  title: "Owner Login | Tablesetter",
  description:
    "Log in to your Tablesetter owner account to manage restaurants, menus and guest reviews.",
  openGraph: {
    title: "Owner Login | Tablesetter",
    description: "Access your Tablesetter restaurant owner dashboard.",
    type: "website",
  },
};

export default function OwnerLoginPage() {
  return (
    <AuthLayout>
      <AuthForm role="owner" mode="login" />
    </AuthLayout>
  );
}
