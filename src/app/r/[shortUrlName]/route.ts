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
    redirect('/404');
  }

  // TODO: analytics logic

  new Promise(async () => {
    // analytics logic here so redirect does not get slowed

    await prisma.shortUrl.update({
      where: shortUrl,
      data: { uses: { increment: 1 } },
    });
  });

  redirect(shortUrl.destination);
}
