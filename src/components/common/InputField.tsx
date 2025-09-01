import { cn } from "@/lib/cn";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  className?: string;
};

export default function InputField({
  label,
  error,
  errorMessage,
  className,
  ...props
}: InputFieldProps) {
  return (
    <div className="flex w-full flex-col items-start gap-2">
      <label className="text-text-primary body-small">{label}</label>
      <input
        {...props}
        className={cn(
          "bg-secondary text-text-secondary body-small focus:text-text-primary focus:outline-text-disabled invalid:outline-primary autofill:bg-secondary flex h-16 w-full items-start justify-center rounded-lg px-6 py-3",
          error && "focus:outline-primary focus:outline-2",
          className,
        )}
      />
      {error && <p className="body-small text-text-accent">{errorMessage}</p>}
    </div>
  );
}
