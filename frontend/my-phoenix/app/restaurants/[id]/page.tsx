import type { Metadata } from "next";

import Client from "./page-client";

export const metadata: Metadata = {
  title: "Restaurant Profile | Tablesetter",
  description: "See the full menu, address, price range and diner reviews for this restaurant on Tablesetter.",
  openGraph: { title: "Restaurant Profile | Tablesetter", description: "Menus, prices and honest diner reviews on Tablesetter.", type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <Client />;
}
