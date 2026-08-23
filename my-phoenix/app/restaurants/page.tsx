import { Suspense } from "react";
import type { Metadata } from "next";

import Client from "./page-client";

export const metadata: Metadata = {
  title: "Browse Restaurants | Tablesetter",
  description: "Browse restaurants on Tablesetter and filter by cuisine, price range and diner rating to find your next meal.",
  openGraph: { title: "Browse Restaurants | Tablesetter", description: "Filter restaurants by cuisine, price and rating on Tablesetter.", type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return (
    <Suspense>
      <Client />
    </Suspense>
  );
}
