import Navbar from '@/components/dashboard/navbar/navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />

      {children}
    </div>
  );
}
