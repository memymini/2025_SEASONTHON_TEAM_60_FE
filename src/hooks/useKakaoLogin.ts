// useKakaoLoginQuery.ts
"use client";
import { useQuery } from "@tanstack/react-query";
import { getKakaoLogin } from "@/api/auth";
import { USER_QUERY_KEY } from "@/api/queryKeys";

export function useKakaoLoginQuery() {
  return useQuery({
    queryKey: USER_QUERY_KEY.root(),
    queryFn: () => getKakaoLogin(),
    select: (res) => res.data,
  });
}
