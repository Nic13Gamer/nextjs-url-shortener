import Link from 'next/link';
import { buttonVariants } from '../../ui/button';
import SignOutButton from './signout-button';
import ThemeToggle from '@/components/theme-toggle';

export default function Navbar() {
  return (
    <nav className="sticky inset-0 z-50 flex h-16 w-screen border-b-2 bg-background/95 p-3 shadow-md backdrop-blur">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/dashboard" className="text-2xl font-bold lg:text-3xl">
          QuickLink
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className={buttonVariants({ variant: 'ghost', size: 'sm' })}
          >
            Overview
          </Link>

          <SignOutButton />

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
