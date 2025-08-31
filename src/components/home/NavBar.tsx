import Link from "next/link";
import Button from "@/components/common/Button";

export default function NavBar() {
  return (
    <header className="bg-surface-1 fixed top-0 flex h-fit w-full items-center justify-between px-6 py-3">
      <div className="text-text-accent headline-medium">VeriBadge</div>
      <ul className="text-text-secondary body-large flex items-center gap-8">
        <li>
          <Link href="/">소개</Link>
        </li>
        <li>
          <Link href="/">확장 프로그램</Link>
        </li>
        <li>
          <Link href="/">로그인</Link>
        </li>
        <li>
          <Link href="/">
            <Button size="sm">무료로 시작하기</Button>
          </Link>
        </li>
      </ul>
    </header>
  );
}
