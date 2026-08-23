import type { Metadata } from "next";

import Client from "./page-client";

export const metadata: Metadata = {
  title: "Owner Login | Tablesetter",
  description: "Log in to your Tablesetter owner account to manage restaurants, menus and guest reviews.",
  openGraph: { title: "Owner Login | Tablesetter", description: "Access your Tablesetter restaurant owner dashboard.", type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <Client />;
}
