"use client";
import Link from "next/link";
import KakaoLoginButton from "../common/KakaoLoginButton";
import { useKakaoLoginQuery } from "@/hooks/useKakaoLogin";
import { useRouter } from "next/navigation";

export default function NavBar() {
  return (
    <header className="bg-surface-1 fixed top-0 flex h-fit w-full items-center justify-between px-6 py-3">
      <Link href="/" className="text-text-accent headline-medium">
        VeriBadge
      </Link>
      <ul className="text-text-secondary body-large flex items-center gap-8">
        <li>
          <Link href="/#intro" className="hover:text-text-primary">
            소개
          </Link>
        </li>
        <li>
          <Link href="/download" className="hover:text-text-primary">
            확장 프로그램
          </Link>
        </li>
        <li>
          <Link href="/dashboard" className="hover:text-text-primary">
            대시보드
          </Link>
        </li>
        <li>
          <KakaoLoginButton />
        </li>
      </ul>
    </header>
  );
}

function AuthButton() {
  const router = useRouter();
  const handleLogout = async () => {
    // 서버 로그아웃 API 호출
    localStorage.resetItem("accessToken");
    localStorage.resetItem("refreshToken");
    router.refresh();
  };

  //if (isLoading) return null;

  return true ? (
    <button
      onClick={handleLogout}
      type="button"
      className="body-small text-text-secondary hover:text-text-primary underline"
    >
      로그아웃
    </button>
  ) : (
    <KakaoLoginButton />
  );
}
