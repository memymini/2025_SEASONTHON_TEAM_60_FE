"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function Modal({
  open,
  onClose,
  children,
  className,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // 스크롤 잠금
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose(); // 배경 클릭 시 닫기
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={cn("bg-surface-1 rounded-xl shadow-xl", className)}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
