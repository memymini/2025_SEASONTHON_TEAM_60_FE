import { api } from "@/lib/fetcher";
import { Status } from "@/lib/types";

export type StatusResponse = {
  status: Status;
};

export const getStatus = () => api.get<StatusResponse>("/certificates/me");
