import { auth } from '@/auth';
import CommandBar from '@/components/dashboard/view/command-bar';
import QRCodeCard from '@/components/dashboard/view/qrcode-card';
import UrlUseChart from '@/components/dashboard/view/url-use-chart';
import { buttonVariants } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import prisma from '@/db';
import { isExpired } from '@/lib/shortUrl';
import { getUser } from '@/lib/utils';
import { ExternalLink, Undo2 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const session = await auth();
  const user = await getUser(session);
  const shortUrl = await prisma.shortUrl.findUnique({ where: { id } });

  if (!user || !shortUrl || shortUrl.userId !== user.id) {
    notFound();
  }

  const expired = isExpired(shortUrl);

  return (
    <>
      <div className="absolute flex h-full w-full flex-col justify-center px-2 sm:hidden">
        <div className="rounded-md border-2 p-2 text-center text-xl font-semibold">
          Please use landscape mode to view this page
        </div>
      </div>

      <div className="container mt-7 hidden rounded-md border-2 p-2 sm:block">
        <header className="mb-5 flex flex-col items-center justify-center gap-3">
          {(expired || !shortUrl.active) && (
            <div className="w-full rounded bg-destructive p-2 text-center text-xl">
              Warning: This QuickLink is {expired ? 'expired' : 'not active'}{' '}
              and cannot be used.
            </div>
          )}

          <p className="text-center text-3xl">
            Viewing QuickLink:{' '}
            <span className="font-semibold">{shortUrl.name}</span>
          </p>

          <nav className="flex items-center gap-2">
            <a
              href={shortUrl.destination}
              target="_blank"
              className={buttonVariants({ variant: 'default' })}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Visit destination
            </a>

            <Link
              href="/dashboard"
              className={buttonVariants({
                variant: 'secondary',
              })}
            >
              <Undo2 className="mr-2 h-4 w-4" />
              Back to overview
            </Link>
          </nav>
        </header>

        <div className="flex justify-between gap-2">
          <div className="flex w-full flex-col gap-2">
            <CommandBar url={shortUrl} />

            <Suspense fallback={<Skeleton className="h-[400px]" />}>
              <UrlUseChart url={shortUrl} />
            </Suspense>
          </div>

          <div className="hidden lg:block">
            <QRCodeCard url={shortUrl} />
          </div>
        </div>
      </div>
    </>
  );
}
