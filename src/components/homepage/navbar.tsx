import Link from 'next/link';
import { buttonVariants } from '../ui/button';

export default function Navbar() {
  return (
    <nav className="sticky inset-0 border-b-2 bg-background/95 backdrop-blur p-3 w-screen shadow-md h-16 flex">
      <div className="container flex justify-between items-center mx-auto">
        <Link href="/" className="font-bold lg:text-3xl text-2xl">
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
