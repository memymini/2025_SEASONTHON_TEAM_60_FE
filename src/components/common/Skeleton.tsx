import { cn } from "@/lib/cn";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-surface-3 max-w-300 animate-pulse rounded-xl",
        className,
      )}
    />
  );
}

export function DashboardSkeleton() {
  return (
    <div className="flex w-full flex-col gap-10">
      <Skeleton className="h-20" />
      <Skeleton className="h-50" />
    </div>
  );
}

export function MyBadgesSkeleton() {
  return (
    <div className="flex w-full flex-col gap-10">
      <Skeleton className="h-50" />
      <Skeleton className="h-50" />
    </div>
  );
}
