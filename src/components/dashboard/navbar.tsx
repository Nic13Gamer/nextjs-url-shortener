import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky inset-0 border-b-2 bg-background/95 backdrop-blur p-3 w-screen shadow-md h-16 flex">
      <div className="container flex justify-between items-center mx-auto">
        <Link href="/dashboard" className="font-bold lg:text-3xl text-2xl">
          QuickLink
        </Link>
      </div>
    </nav>
  );
}
