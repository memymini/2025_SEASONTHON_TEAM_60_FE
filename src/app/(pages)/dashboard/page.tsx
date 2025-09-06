"use client";
import NoBadge from "@/components/common/NoBadge";
import { DashboardSkeleton } from "@/components/common/Skeleton";
import Badge from "@/components/dashboard/Badge";
import { useDashboardQuery } from "@/hooks/useDashboard";
import Error from "@/app/error";

export default function DashboardPage() {
  const { data, isLoading, isError, error, refetch } = useDashboardQuery();

  if (isLoading) return <DashboardSkeleton />;
  if (isError) return <Error error={error} reset={refetch} />;
  if (data) {
    return (
      <div className="flex h-fit w-full flex-col gap-10">
        <h1 className="headline-large text-text-primary">
          {data.username}님, 안녕하세요!
        </h1>
        {data.badgeLevel ? <Badge data={data} /> : <NoBadge />}
      </div>
    );
  }
}
