import Link from 'next/link';
import { buttonVariants } from '../ui/button';

export default function Navbar() {
  return (
    <nav className="sticky inset-0 flex h-16 w-screen border-b-2 bg-background/95 p-3 shadow-md backdrop-blur">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold lg:text-3xl">
          QuickLink
        </Link>

        <Link
          href="/dashboard"
          className={buttonVariants({ variant: 'default' })}
        >
          Dashboard
        </Link>
      </div>
    </nav>
  );
}
