import { Suspense } from "react";
import type { Metadata } from "next";

import Client from "./page-client";

export const metadata: Metadata = {
  title: "Search Restaurants | Tablesetter",
  description: "Search Tablesetter by restaurant name or cuisine to find exactly what you crave.",
  openGraph: { title: "Search Restaurants | Tablesetter", description: "Find restaurants by name or cuisine on Tablesetter.\" },\n      { property: \"og:type", type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return (
    <Suspense>
      <Client />
    </Suspense>
  );
}
