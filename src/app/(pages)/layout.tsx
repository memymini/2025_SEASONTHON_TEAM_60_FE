import Sidebar from "@/components/common/Sidebar";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-screen">
      <Sidebar />
      <div className="flex flex-1">{children}</div>
    </main>
  );
}
