"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import Loading from "@/components/common/Loading";

function KakaoCallbackContent() {
  const router = useRouter();
  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace(/^#/, ""));
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      router.replace("/dashboard");
    } else {
      router.replace("/");
    }
  }, [router]);

  return (
    <div className="fixed inset-0 z-[9999]">
      <Loading />
      <div className="grid h-full place-items-center">
        <div className="border-surface-3 rounded-md border bg-white/80 px-6 py-4 shadow backdrop-blur">
          <p className="body-medium">로그인 처리 중...</p>
        </div>
      </div>
    </div>
  );
}
export default function KakaoCallbackPage() {
  return (
    <Suspense fallback={<Loading />}>
      <KakaoCallbackContent />
    </Suspense>
  );
}
