import type { Metadata } from "next";
import { AuthForm } from "@/components/organisms/AuthForm";
import { AuthLayout } from "@/components/templates/AuthLayout";

export const metadata: Metadata = {
  title: "Create a Diner Account | Tablesetter",
  description:
    "Sign up for Tablesetter to discover restaurants, write reviews and log what you spend on dining out.",
  openGraph: {
    title: "Create a Diner Account | Tablesetter",
    description: "Find your next favourite table on Tablesetter.",
    type: "website",
  },
};

export default function CustomerRegisterPage() {
  return (
    <AuthLayout>
      <AuthForm role="customer" mode="register" />
    </AuthLayout>
  );
}
