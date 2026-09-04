import type { Metadata } from "next";

import Client from "./page-client";

export const metadata: Metadata = {
  title: "List Your Restaurant | Tablesetter",
  description: "Create a Tablesetter owner account to publish your restaurant, build menus and answer diner reviews.",
  openGraph: { title: "List Your Restaurant | Tablesetter", description: "Join Tablesetter and reach hungry diners in minutes.", type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <Client />;
}
