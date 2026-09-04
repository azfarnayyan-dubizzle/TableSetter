import type { Metadata } from "next";

import Client from "./page-client";

export const metadata: Metadata = {
  title: "Owner Profile | Tablesetter",
  description: "Manage your Tablesetter business details, tax ID, contact number and verification status.",
  openGraph: { title: "Owner Profile | Tablesetter", description: "Keep your restaurant business details up to date.\" },\n      { property: \"og:type", type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <Client />;
}
