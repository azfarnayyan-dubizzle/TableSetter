"use client";

import { useRouter } from "next/navigation";
import { Input } from "antd";
import { useState } from "react";

export function SearchBar({ initial = "", width }: { initial?: string; width?: number | string }) {
  const router = useRouter();
  const [value, setValue] = useState(initial);

  return (
    <Input.Search
      placeholder="Search restaurants or cuisines"
      allowClear
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onSearch={(q) => {
        router.push(`/search?q=${encodeURIComponent(q)}`);
      }}
      style={{ width: width ?? "100%", maxWidth: 420 }}
    />
  );
}
