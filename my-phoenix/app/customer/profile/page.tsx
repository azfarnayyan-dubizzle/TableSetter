import type { Metadata } from "next";

import Client from "./page-client";

export const metadata: Metadata = {
  title: "My Profile | Tablesetter",
  description: "Update your Tablesetter diner profile: contact number, date of birth and dietary preferences, and check your loyalty points.",
  openGraph: { title: "My Profile | Tablesetter", description: "Manage your diner details and view your loyalty points balance.", type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <Client />;
}
