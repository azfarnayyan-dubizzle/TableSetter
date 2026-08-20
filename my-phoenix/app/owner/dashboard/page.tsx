import type { Metadata } from "next";

import Client from "./page-client";

export const metadata: Metadata = {
  title: "Owner Dashboard | Tablesetter",
  description: "Manage every restaurant you own on Tablesetter: menus, details and guest reviews.",
  openGraph: { title: "Owner Dashboard | Tablesetter", description: "Your Tablesetter restaurant control centre.\" },\n      { property: \"og:type", type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <Client />;
}
