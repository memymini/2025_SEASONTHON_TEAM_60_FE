import Sidebar from "@/components/common/Sidebar";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-screen">
      <Sidebar />
      <div className="ml-80 flex flex-1 flex-col gap-10 overflow-y-auto px-15 py-12">
        {children}
      </div>
    </main>
  );
}
