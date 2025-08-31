import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-4 flex h-fit w-full flex-col gap-8 px-8 py-9">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="title-large text-text-inverse">VeriBadge</p>
          <p className="body-small text-text-disabled">
            온라인 신뢰의 새로운 기준
          </p>
        </div>
        <ul className="text-text-disabled body-small flex cursor-pointer items-center justify-center gap-8">
          <li>
            <Link href="/">서비스 이용약관</Link>
          </li>
          <li>
            <Link href="/">개인정보처리방침</Link>
          </li>
          <li>
            <Link href="/">고객센터</Link>
          </li>
        </ul>
      </div>
      <hr className="border-0.1 text-text-secondary" />
      <p className="body-small text-text-disabled text-center">
        @ 2025 VeriBadge. All rights reserved.
      </p>
    </footer>
  );
}
