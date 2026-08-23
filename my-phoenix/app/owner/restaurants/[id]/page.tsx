import type { Metadata } from "next";

import Client from "./page-client";

export const metadata: Metadata = {
  title: "Manage Restaurant | Tablesetter",
  description: "Edit restaurant details, build menu categories and items, and reply to diner reviews on Tablesetter.",
  openGraph: { title: "Manage Restaurant | Tablesetter", description: "Menus, details and review replies in one place.\" },\n      { property: \"og:type", type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <Client />;
}
