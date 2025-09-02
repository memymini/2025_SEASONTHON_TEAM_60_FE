"use client";

import Link from "next/link";
import HomeIcon from "@public/assets/home-icon.svg";
import VerifiedIcon from "@public/assets/verified-icon.svg";
import BadgeIcon from "@public/assets/badge-icon.svg";
import ProfileIcon from "@public/assets/profile-icon.svg";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <aside className="bg-surface-1 fixed flex h-screen w-80 flex-col justify-between px-6 py-5">
      <div className="flex h-fit w-full flex-col items-start justify-start gap-9">
        <Link href="/" className="text-text-accent headline-medium">
          VeriBadge
        </Link>

        <ul className="flex h-fit w-full flex-col gap-4" id="menu">
          <li>
            <NavItem href="/dashboard" active={pathname === "/dashboard"}>
              <HomeIcon />
              대시보드
            </NavItem>
          </li>

          <li className="flex cursor-pointer flex-col gap-4">
            <NavItem
              active={pathname.startsWith("/verify")}
              onToggle={() => setMenuOpen((v) => !v)}
              open={isMenuOpen}
            >
              <VerifiedIcon />
              인증센터
            </NavItem>
            {isMenuOpen && (
              <ul
                id="verified-sub-menu"
                className="text-text-secondary flex flex-col gap-5 py-2.5 pl-8"
              >
                <SubNavLink href="/verify/intro">
                  베리뱃지의 소득증명이란?
                </SubNavLink>
                <SubNavLink href="/verify/upload">
                  소득 증명서 업로드
                </SubNavLink>
                <SubNavLink href="/verify/status">처리 현황</SubNavLink>
              </ul>
            )}
          </li>

          <li>
            <NavItem href="/my-badges" active={pathname === "/my-badges"}>
              <BadgeIcon />
              나의 뱃지 관리
            </NavItem>
          </li>
          <li>
            <NavItem href="/account" active={pathname === "/account"}>
              <ProfileIcon />
              계정관리
            </NavItem>
          </li>
        </ul>
      </div>
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <p className="title-small text-text-primary">name</p>
          <p className="body-small text-text-primary">name@example.com</p>
        </div>
        <p className="body-small text-text-primary cursor-pointer underline">
          로그아웃
        </p>
      </div>
    </aside>
  );
}

type CommonProps = {
  active?: boolean;
  exact?: boolean;
  className?: string;
  children: React.ReactNode;
};

type LinkItemProps = CommonProps & { href: string };
type ToggleItemProps = CommonProps & { onToggle: () => void; open: boolean };
type NavItemProps = LinkItemProps | ToggleItemProps;

export function NavItem(props: NavItemProps) {
  const NavItemVariants = cn(
    "title-small text-text-secondary flex h-fit w-full items-center justify-start gap-2.5 rounded-lg px-2.5 py-2",
    props.active ? "bg-secondary text-text-accent" : "hover:bg-surface-2",
  );

  if ("href" in props) {
    return (
      <Link
        href={props.href}
        aria-current={props.active ? "page" : undefined}
        className={NavItemVariants}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-expanded={props.open}
      onClick={props.onToggle}
      className={NavItemVariants}
    >
      {props.children}
    </button>
  );
}

function SubNavLink({
  href,
  exact = false,
  children,
}: {
  href: string;
  exact?: boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = exact
    ? pathname === href
    : pathname.startsWith(href + (href.endsWith("/") ? "" : "/")) ||
      pathname === href;
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "body-small text-text-secondary flex h-fit w-full cursor-pointer items-center justify-start gap-5",
        active ? "text-text-accent font-bold" : "hover:text-text-primary",
      )}
    >
      {children}
    </Link>
  );
}
