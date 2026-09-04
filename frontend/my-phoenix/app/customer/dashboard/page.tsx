import type { Metadata } from "next";

import Client from "./page-client";

export const metadata: Metadata = {
  title: "My Dining Dashboard | Tablesetter",
  description:
    "See this month's dining spend, where you've been eating, and jump back into browsing restaurants.",
  openGraph: {
    title: "My Dining Dashboard | Tablesetter",
    description: "Your dining spend and top restaurants at a glance.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <Client />;
}
