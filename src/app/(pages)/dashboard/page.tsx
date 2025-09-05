"use client";
import NoBadge from "@/components/common/NoBadge";
import { DashboardSkeleton } from "@/components/common/Skeleton";
import Badge from "@/components/dashboard/Badge";
import { useDashboardQuery } from "@/hooks/useDashboard";

export default function DashboardPage() {
  const { data, isLoading, isError } = useDashboardQuery();

  if (isLoading) return <DashboardSkeleton />;
  if (isError) return <div>error</div>;
  if (data) {
    return (
      <div className="flex h-fit w-full flex-col gap-10">
        <h1 className="headline-large">{data.username}님, 안녕하세요!</h1>
        {data.badgeLevel ? <Badge data={data} /> : <NoBadge />}
      </div>
    );
  }
}
