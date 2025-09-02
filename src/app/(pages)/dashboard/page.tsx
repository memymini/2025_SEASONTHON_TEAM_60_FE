"use client";
import NoBadge from "@/components/common/NoBadge";
import Badge from "@/components/dashboard/Badge";
import { Role, Status, BadgeLevel, Date } from "@/lib/types";

export interface BadgeResponse {
  username: string;
  email: string;
  role: Role;
  status: Status;
  badgeLevel: BadgeLevel;
  badgeDate: Date;
}
const data: BadgeResponse = {
  username: "김지원",
  email: "test1@example.com",
  role: "USER",
  status: "NOT_SUBMITTED",
  badgeLevel: null,
  badgeDate: null,
};
export default function DashboardPage() {
  return (
    <div className="flex h-fit w-full flex-col gap-10">
      <h1 className="headline-large">{data.username}님, 안녕하세요!</h1>

      {/* 뱃지가 없는 경우 UI */}
      <NoBadge />

      {/* 뱃지가 있는 경우 UI */}
      <Badge data={data} />
    </div>
  );
}
