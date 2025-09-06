import { api } from "@/lib/fetcher";
import { BadgeLevel, Status } from "@/lib/types";

export type MyBadgesResponse = {
  username: string;
  status: Status;
  badgeLevel: BadgeLevel | null;
  badgeDate: string | null;
  channelUrl: string | null;
  badgeTag: string | null;
};

export const getMyBadge = () => api.get<MyBadgesResponse>("/my-badge");
