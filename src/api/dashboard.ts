import { api } from "@/lib/fetcher";
import { BadgeLevel, Role, Status } from "@/lib/types";

export type DashboardResponse = {
  username: string;
  role: Role;
  status: Status;
  badgeLevel: BadgeLevel | null;
  badgeDate: string | null;
};

export const getDashboard = () => api.get<DashboardResponse>("/main");
