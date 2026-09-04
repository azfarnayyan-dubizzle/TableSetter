import type { Metadata } from "next";

import Client from "./page-client";

export const metadata: Metadata = {
  title: "Add a Restaurant | Tablesetter",
  description: "Publish a new restaurant profile on Tablesetter with cuisine, price range and address.",
  openGraph: { title: "Add a Restaurant | Tablesetter", description: "Create a new restaurant listing on Tablesetter.\" },\n      { property: \"og:type", type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <Client />;
}
