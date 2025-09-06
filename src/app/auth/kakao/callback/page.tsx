"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/components/common/Loading";
import { useEffect } from "react";

export default function KakaoCallbackPage() {
  // const router = useRouter();
  // const { data, isPending, isError, error, refetch } = useKakaoLoginQuery();

  // useEffect(() => {
  //   if (data) {
  //     localStorage.setItem("token", data.token);
  //     router.replace("/dashboard");
  //   }
  // }, [data, router]);

  // if (isError) return <Error error={error} reset={refetch} />;
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token"); // URL 쿼리에서 token 추출
    if (token) {
      localStorage.setItem("token", token);
      router.replace("/dashboard"); // 토큰 저장 후 대시보드로 이동
    }
  }, [searchParams, router]);

  return (
    <div className="fixed inset-0 z-[9999]">
      <Loading />
      <div className="grid h-full place-items-center">
        <div className="border-surface-3 rounded-md border bg-white/80 px-6 py-4 shadow backdrop-blur">
          <p className="body-medium">
            로그인 처리 중...
            {/* {isPending
              ? "카카오 로그인 처리 중…"
              : isError
                ? "로그인 실패, 이동 중…"
                : "완료, 이동 중…"} */}
          </p>
        </div>
      </div>
    </div>
  );
}
