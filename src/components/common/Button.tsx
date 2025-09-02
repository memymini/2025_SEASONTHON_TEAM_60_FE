import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/cn";
import Link from "next/link";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  size: "sm" | "md" | "lg";
  href?: string;
  className?: string;
};

const buttonVariants = cva(
  "flex items-center justify-center focus:outline-none disabled:bg-surface-3 disabled:text-text-disabled disabled:cursor-default bg-primary text-text-inverse hover:bg-hover cursor-pointer w-fit",
  {
    variants: {
      size: {
        sm: "px-6 h-8 label-small rounded-sm",
        md: "px-12 h-12 label-medium rounded-md",
        lg: "px-16 h-16 label-large rounded-lg",
      },
    },
  },
);

export default function Button({
  children,
  size,
  href,
  className,
  ...props
}: ButtonProps) {
  if (href) {
    return (
      <Link href={href} className={cn(buttonVariants({ size }), className)}>
        {children}
      </Link>
    );
  }
  return (
    <button {...props} className={cn(buttonVariants({ size }), className)}>
      {children}
    </button>
  );
}
