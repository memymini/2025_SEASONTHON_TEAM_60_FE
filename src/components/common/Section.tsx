import { cn } from "@/lib/cn";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Section({ children, className }: SectionProps) {
  return (
    <section
      className={cn(
        "bg-surface-1 border-surface-3 flex h-fit w-full max-w-[1200px] gap-5 rounded-xl border-1 px-8 py-7",
        className,
      )}
    >
      {children}
    </section>
  );
}
