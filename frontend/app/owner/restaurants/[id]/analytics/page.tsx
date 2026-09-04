import type { Metadata } from "next";

import Client from "./page-client";

export const metadata: Metadata = {
  title: "Restaurant Analytics | Tablesetter",
  description: "Revenue, ratings and review trends for your restaurant on Tablesetter.",
  openGraph: {
    title: "Restaurant Analytics | Tablesetter",
    description: "See how your restaurant is performing on Tablesetter.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <Client />;
}
