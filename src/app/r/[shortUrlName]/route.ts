import prisma from '@/db';
import { redirect } from 'next/navigation';

export async function GET(
  req: Request,
  { params }: { params: { shortUrlName: string } }
) {
  const shortUrl = await prisma.shortUrl.findUnique({
    where: {
      name: params.shortUrlName,
    },
  });

  if (!shortUrl) {
    redirect('/404');
  }

  if (shortUrl.expiresAt && Date.now() > shortUrl.expiresAt.getTime()) {
    await prisma.shortUrl.delete({ where: { id: shortUrl.id } });

    redirect('/404');
  }

  // TODO: analytics logic

  new Promise(() => {
    // analytics logic here to not slow down redirect
  });

  redirect(shortUrl.destination);
}
