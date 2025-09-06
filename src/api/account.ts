import { api } from "@/lib/fetcher";

export type AccountResponse = {
  username: string;
  channelUrl: string;
};

export const getAccount = () => api.get<AccountResponse>("/account");
