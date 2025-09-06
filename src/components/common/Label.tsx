import { cn } from "@/lib/cn";
import { cva } from "class-variance-authority";

type Label = "primary" | "disabled" | "dark";

type LabelProps = {
  type: Label;
  children: React.ReactNode;
};

const labelVariants = cva("label-medium rounded-full px-5 py-2", {
  variants: {
    type: {
      primary: "bg-primary text-text-inverse",
      disabled: "bg-surface-3 text-text-secondary",
      dark: "bg-text-secondary text-white",
    },
  },
  defaultVariants: {
    type: "primary",
  },
});

export default function Label({ type, children }: LabelProps) {
  return (
    <div id="label" className={cn(labelVariants({ type }))}>
      {children}
    </div>
  );
}
