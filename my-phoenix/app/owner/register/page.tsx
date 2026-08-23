import type { Metadata } from "next";
import { AuthForm } from "@/components/organisms/AuthForm";
import { AuthLayout } from "@/components/templates/AuthLayout";

export const metadata: Metadata = {
  title: "List Your Restaurant | Tablesetter",
  description:
    "Create a Tablesetter owner account to publish your restaurant, build menus and answer diner reviews.",
  openGraph: {
    title: "List Your Restaurant | Tablesetter",
    description: "Join Tablesetter and reach hungry diners in minutes.",
    type: "website",
  },
};

export default function OwnerRegisterPage() {
  return (
    <AuthLayout>
      <AuthForm role="owner" mode="register" />
    </AuthLayout>
  );
}
