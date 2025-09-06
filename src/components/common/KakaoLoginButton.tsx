"use client";
import Image from "next/image";

export default function KakaoLoginButton() {
  const handleKakaoLogin = () => {
    window.location.assign(
      `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/kakao`,
    );
  };
  return (
    <button
      onClick={handleKakaoLogin}
      type="button"
      className="flex cursor-pointer items-center justify-center gap-1.5 rounded-md bg-[#FEE500] px-4 py-2 text-[#000000]"
    >
      <Image
        src="/images/kakao-logo.png"
        alt="kakao-logo.png"
        width={18}
        height={18}
      />
      <p className="text-xs text-[#000000]">카카오 로그인</p>
    </button>
  );
}
