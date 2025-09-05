import { api } from "@/lib/fetcher";

export type KakaoLoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export const getKakaoLogin = () =>
  api.get<KakaoLoginResponse>("/auth/kakao/callback");
