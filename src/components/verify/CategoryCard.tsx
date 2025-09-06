import { IconComp } from "@/lib/types";
import Label from "../common/Label";
import { cn } from "@/lib/cn";
import Link from "next/link";

export type Category = {
  name: string;
  description: string;
  info?: string;
  icon: IconComp;
  active: boolean;
};

export default function CategoryCard({ data }: { data: Category }) {
  const Icon = data.icon;
  return (
    <div className="border-surface-3 bg-surface-1 flex h-75 w-90 flex-col items-start gap-4 rounded-xl border-1 p-6">
      <div className="bg-surface-1 flex w-full items-start justify-between">
        <div
          className={cn(
            "bg-secondary text-text-accent flex h-18 w-12 items-center justify-center rounded-full",
            data.active
              ? "text-text-accent bg-secondary"
              : "text-text-secondary bg-surface-3",
          )}
        >
          <Icon className="size-7" />
        </div>
        {data.active ? (
          <Label type="primary">인증 가능</Label>
        ) : (
          <Label type="dark">준비 중</Label>
        )}
      </div>
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col items-start gap-4">
          <h2
            className={cn(
              "headline-small text-text-primary",
              data.active ? "text-text-primary" : "text-text-secondary",
            )}
          >
            {data.name}
          </h2>
          <p className="text-text-secondary body-small">{data.description}</p>
        </div>
        {data.info && (
          <Link href="/verify/intro" className="text-text-accent label-medium">
            {data.info}
          </Link>
        )}
      </div>
    </div>
  );
}
