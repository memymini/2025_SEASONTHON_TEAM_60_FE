"use client";
import NoBadge from "@/components/common/NoBadge";
import Badge from "@/components/dashboard/Badge";
import { useDashboardQuery } from "@/hooks/useDashboard";

export default function DashboardPage() {
  const { data, isLoading, isError } = useDashboardQuery();

  if (isLoading) return <div>isLoading</div>;
  if (isError) return <div>error</div>;
  if (!data) return <div>데이터 없음</div>;

  return (
    <div className="flex h-fit w-full flex-col gap-10">
      <h1 className="headline-large">{data.username}님, 안녕하세요!</h1>

      {data.badgeLevel ? <Badge data={data} /> : <NoBadge />}
    </div>
  );
}
