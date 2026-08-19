import type { Metadata } from "next";
import { AuthForm } from "@/components/organisms/AuthForm";
import { AuthLayout } from "@/components/templates/AuthLayout";

export const metadata: Metadata = {
  title: "Diner Login | Tablesetter",
  description: "Log in to Tablesetter to review restaurants and track your dining spend.",
  openGraph: {
    title: "Diner Login | Tablesetter",
    description: "Access your Tablesetter diner dashboard.",
    type: "website",
  },
};

export default function CustomerLoginPage() {
  return (
    <AuthLayout>
      <AuthForm role="customer" mode="login" />
    </AuthLayout>
  );
}
