import Text from "antd/es/typography/Text";
import dayjs from "dayjs";

import { restaurantLabel, logDate, toAmount, type DiningLogLike } from "@/lib/analytics";
import { BRAND } from "@/lib/theme";

export function DiningLogRow({ log }: { log: DiningLogLike }) {
  const date = logDate(log);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        padding: "12px 0",
        borderBottom: "1px solid #F1E7DC",
      }}
    >
      <div style={{ minWidth: 0 }}>
        <Text strong>{restaurantLabel(log)}</Text>
        <div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {log.note || "No note"}
          </Text>
        </div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ fontWeight: 700, color: BRAND.red }}>
          ${toAmount(log.amount_spent).toFixed(2)}
        </div>
        <Text type="secondary" style={{ fontSize: 12 }}>
          {date ? dayjs(date).format("MMM D, YYYY") : "—"}
        </Text>
      </div>
    </div>
  );
}
