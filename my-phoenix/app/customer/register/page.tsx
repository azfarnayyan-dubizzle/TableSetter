import type { Metadata } from "next";

import Client from "./page-client";

export const metadata: Metadata = {
  title: "Create a Diner Account | Tablesetter",
  description: "Sign up for Tablesetter to discover restaurants, write reviews and log what you spend on dining out.",
  openGraph: { title: "Create a Diner Account | Tablesetter", description: "Find your next favourite table on Tablesetter.\" },\n      { property: \"og:type", type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <Client />;
}
