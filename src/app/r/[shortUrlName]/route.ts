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

  if (
    (shortUrl.expiresAt && Date.now() > shortUrl.expiresAt.getTime()) ||
    !shortUrl.active
  ) {
    redirect('/404');
  }

  new Promise(async () => {
    // analytics logic here so redirect does not get slowed

    await prisma.shortUrlUse.create({
      data: {
        shortUrlId: shortUrl.id,
      },
    });
  });

  redirect(shortUrl.destination);
}
