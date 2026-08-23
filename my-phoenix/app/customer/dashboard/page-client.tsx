"use client";

import Link from "next/link";
import Row from "antd/es/row";
import Col from "antd/es/col";
import Card from "antd/es/card";
import Button from "antd/es/button";
import dayjs from "dayjs";
import { DollarOutlined, CalendarOutlined, TrophyOutlined } from "@ant-design/icons";

import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { StatCard, DeltaBadge } from "@/components/atoms/StatCard";
import { SpendingTrendChart } from "@/components/organisms/SpendingTrendChart";
import { TopRestaurantsLeaderboard } from "@/components/organisms/TopRestaurantsLeaderboard";
import { DiningLogRow } from "@/components/molecules/DiningLogRow";
import { useAuthToken } from "@/lib/auth";
import { useCustomerProfile, useDiningLogs, useSpendingSummary } from "@/lib/hooks";
import { monthlySpend, spendByRestaurant, percentChange, toAmount } from "@/lib/analytics";

export default function CustomerDashboardPage() {
  const { token } = useAuthToken("customer");
  const enabled = Boolean(token);

  const thisMonth = dayjs().format("YYYY-MM");
  const lastMonth = dayjs().subtract(1, "month").format("YYYY-MM");

  const { data: summary, isPending: summaryPending } = useSpendingSummary(thisMonth, enabled);
  const { data: lastSummary } = useSpendingSummary(lastMonth, enabled);
  const { data: logs, isPending: logsPending } = useDiningLogs(undefined, enabled);
  const { data: profile } = useCustomerProfile(enabled);

  const allLogs = logs ?? [];
  const trend = monthlySpend(allLogs, 6);
  const leaderboard = spendByRestaurant(allLogs, 5);
  const delta = percentChange(toAmount(summary?.total_spent), toAmount(lastSummary?.total_spent));

  return (
    <DashboardLayout role="customer" title="My dining dashboard">
      <Row gutter={[20, 20]}>
        <Col xs={24} md={8}>
          <StatCard
            icon={<DollarOutlined />}
            label={`Spent in ${dayjs().format("MMMM")}`}
            value={`$${toAmount(summary?.total_spent).toFixed(2)}`}
            loading={summaryPending}
            footer={<DeltaBadge percent={delta} />}
          />
        </Col>
        <Col xs={24} md={8}>
          <StatCard
            icon={<CalendarOutlined />}
            label="Meals logged this month"
            value={summary?.entry_count ?? 0}
            loading={summaryPending}
          />
        </Col>
        <Col xs={24} md={8}>
          <StatCard icon={<TrophyOutlined />} label="Loyalty points" value={profile?.loyalty_points ?? 0} />
        </Col>
      </Row>

      <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
        <Col xs={24} lg={14}>
          <SpendingTrendChart data={trend} loading={logsPending} />
        </Col>
        <Col xs={24} lg={10}>
          <TopRestaurantsLeaderboard data={leaderboard} loading={logsPending} />
        </Col>
      </Row>

      <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
        <Col xs={24} lg={14}>
          <Card
            title="Recent activity"
            style={{ borderRadius: 16 }}
            extra={
              <Link href="/customer/dining-logs">
                <Button type="link" size="small">
                  View all
                </Button>
              </Link>
            }
          >
            {allLogs.length === 0 ? (
              <div style={{ padding: "24px 0", textAlign: "center" }}>
                <Link href="/customer/dining-logs">
                  <Button type="primary">Log your first meal</Button>
                </Link>
              </div>
            ) : (
              allLogs.slice(0, 5).map((log) => <DiningLogRow key={log.id} log={log} />)
            )}
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title="Quick links" style={{ borderRadius: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Link href="/restaurants">
                <Button block type="primary">
                  Browse restaurants
                </Button>
              </Link>
              <Link href="/customer/dining-logs">
                <Button block>Manage dining log</Button>
              </Link>
              <Link href="/customer/profile">
                <Button block>Edit my profile</Button>
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
}
