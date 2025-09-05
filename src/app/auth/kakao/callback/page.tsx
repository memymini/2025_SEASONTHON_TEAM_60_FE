"use client";

import { useRouter } from "next/navigation";
import { useKakaoLoginQuery } from "@/hooks/useKakaoLogin";
import Loading from "@/components/common/Loading";

export default function KakaoCallbackPage() {
  const router = useRouter();
  const { data, isPending, isError } = useKakaoLoginQuery();

  if (data) {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    router.replace("/dashboard");
    return;
  }
  router.replace("/");

  return (
    <div className="fixed inset-0 z-[9999]">
      <Loading />
      <div className="grid h-full place-items-center">
        <div className="border-surface-3 rounded-md border bg-white/80 px-6 py-4 shadow backdrop-blur">
          <p className="body-medium">
            {isPending
              ? "카카오 로그인 처리 중…"
              : isError
                ? "로그인 실패, 이동 중…"
                : "완료, 이동 중…"}
          </p>
        </div>
      </div>
    </div>
  );
}
