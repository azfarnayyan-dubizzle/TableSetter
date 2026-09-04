import type { Metadata } from "next";

import Client from "./page-client";

export const metadata: Metadata = {
  title: "Diner Login | Tablesetter",
  description: "Log in to Tablesetter to review restaurants and track your dining spend.",
  openGraph: { title: "Diner Login | Tablesetter", description: "Access your Tablesetter diner dashboard.\" },\n      { property: \"og:type", type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <Client />;
}
