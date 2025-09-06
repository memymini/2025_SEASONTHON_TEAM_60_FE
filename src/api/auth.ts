import { api } from "@/lib/fetcher";

export type KakaoLoginResponse = {
  userId: number;
  username: string;
  token: string;
};

export const getKakaoLogin = () =>
  api.get<KakaoLoginResponse>("/oauth2/authorization/kakao");
