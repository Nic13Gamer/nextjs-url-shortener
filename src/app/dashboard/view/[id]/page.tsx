import { auth } from '@/auth';
import { buttonVariants } from '@/components/ui/button';
import prisma from '@/db';
import { getUser } from '@/lib/utils';
import { Undo2 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const session = await auth();
  const user = await getUser(session);
  const shortUrl = await prisma.shortUrl.findUnique({ where: { id } });

  if (!user || !shortUrl || shortUrl.userId !== user.id) {
    notFound();
  }

  return (
    <div className="container mt-7 rounded-md border-2 p-2">
      <header className="flex items-center justify-between">
        <p className="text-2xl">
          Viewing link: <span className="font-semibold">{shortUrl.name}</span>
        </p>

        <Link
          href="/dashboard"
          className={buttonVariants({
            variant: 'secondary',
            className: 'w-52',
          })}
        >
          <Undo2 className="mr-2 h-4 w-4" />
          Back
        </Link>
      </header>
    </div>
  );
}
