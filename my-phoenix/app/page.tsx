import type { Metadata } from "next";

import Client from "./page-client";

export const metadata: Metadata = {
  title: "Tablesetter — Discover Restaurants & Track Every Meal",
  description: "Browse restaurants by cuisine, price and rating, read real diner reviews, and log every meal with monthly spending insights.",
  openGraph: { title: "Tablesetter — Discover Restaurants & Track Every Meal", description: "Find your next favourite table and keep a running log of what you spend dining out.", type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <Client />;
}
