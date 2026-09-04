import type { Metadata } from "next";

import Client from "./page-client";

export const metadata: Metadata = {
  title: "Dining Log | Tablesetter",
  description: "Track every meal out: log what you spent, add notes and review your monthly dining totals.",
  openGraph: { title: "Dining Log | Tablesetter", description: "Your personal record of meals out and money spent.\" },\n      { property: \"og:type", type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <Client />;
}
