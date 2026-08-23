"use client";

import Link from "next/link";
import { Button, Card, Col, Empty, List, Row, Skeleton, Statistic, Typography } from "antd";
import dayjs from "dayjs";

import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { useAuthToken } from "@/lib/auth";
import { useCustomerProfile, useDiningLogs, useSpendingSummary } from "@/lib/hooks";
import { toNumber } from "@/lib/unwrap";


export default function CustomerDashboardPage() {
  const { token } = useAuthToken("customer");
  const enabled = Boolean(token);
  const thisMonth = dayjs().format("YYYY-MM");
  const { data: summary, isPending: summaryPending } = useSpendingSummary(thisMonth, enabled);
  const { data: logs, isPending: logsPending } = useDiningLogs(undefined, enabled);
  const { data: profile } = useCustomerProfile(enabled);

  return (
    <DashboardLayout role="customer" title="Dashboard">
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card>
            {summaryPending ? (
              <Skeleton active paragraph={false} />
            ) : (
              <Statistic
                title={`Spent in ${dayjs().format("MMMM")}`}
                value={`$${toNumber(summary?.total_spent).toFixed(2)}`}
              />
            )}
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="Entries this month" value={summary?.entry_count ?? 0} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="Loyalty points" value={profile?.loyalty_points ?? 0} />
          </Card>
        </Col>

        <Col xs={24} lg={14}>
          <Card
            title="Recent dining log"
            extra={
              <Link href="/customer/dining-logs">
                <Button type="link" size="small">
                  View all
                </Button>
              </Link>
            }
          >
            {logsPending ? (
              <Skeleton active paragraph={{ rows: 4 }} />
            ) : (logs?.length ?? 0) === 0 ? (
              <Empty description="No entries yet — log your first meal">
                <Link href="/customer/dining-logs">
                  <Button type="primary">Add an entry</Button>
                </Link>
              </Empty>
            ) : (
              <List
                dataSource={(logs ?? []).slice(0, 5)}
                renderItem={(log) => (
                  <List.Item>
                    <List.Item.Meta
                      title={log.restaurant?.name ?? log.restaurant_name ?? "Unlinked meal"}
                      description={log.note || "No note"}
                    />
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontWeight: 600 }}>
                        ${toNumber(log.amount_spent).toFixed(2)}
                      </div>
                      <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                        {log.logged_at || log.created_at
                          ? dayjs(log.logged_at ?? log.created_at).format("MMM D, YYYY")
                          : "—"}
                      </Typography.Text>
                    </div>
                  </List.Item>
                )}
              />
            )}
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <Card title="Quick links">
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
