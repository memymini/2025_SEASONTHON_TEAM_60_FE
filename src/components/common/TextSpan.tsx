export default function TextSpan({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-text-accent">
      <b>{children}</b>
    </span>
  );
}
