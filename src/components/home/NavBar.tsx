"use cli";
import Link from "next/link";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();
  return (
    <header className="bg-surface-1 fixed top-0 flex h-fit w-full items-center justify-between px-6 py-3">
      <div className="text-text-accent headline-medium">VeriBadge</div>
      <ul className="text-text-secondary body-large flex items-center gap-8">
        <li>
          <Link href="/" className="hover:text-text-primary">
            소개
          </Link>
        </li>
        <li>
          <Link href="/" className="hover:text-text-primary">
            확장 프로그램
          </Link>
        </li>
        <li>
          <Link href="/login" className="hover:text-text-primary">
            로그인
          </Link>
        </li>
        <li>
          <Button size="sm" onClick={() => router.push("/signup")}>
            회원가입
          </Button>
        </li>
      </ul>
    </header>
  );
}
