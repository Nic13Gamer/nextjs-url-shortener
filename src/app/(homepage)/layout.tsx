import Navbar from '@/components/homepage/navbar';

export default function HomeLayout({
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
