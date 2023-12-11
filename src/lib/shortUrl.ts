import prisma from '@/db';
import { generate as generateString } from 'randomstring';
import { z } from 'zod';

const SHORT_URL_RANDOM_NAME_LENGTH = 10;

export async function createShortUrl({
  name,
  destination,
  expirationDate,
  userId,
}: {
  name?: string;
  destination: string;
  expirationDate?: Date;
  userId?: string;
}) {
  if (!name) {
    while (true) {
      const randomName = generateString(SHORT_URL_RANDOM_NAME_LENGTH);

      if (
        !(await prisma.shortUrl.findUnique({ where: { name: randomName } }))
      ) {
        name = randomName;
        break;
      }
    }
  }

  const shortUrlSchema = z.object({
    name: z.string().min(2).max(24),
    destination: z.string().url(),
    expirationDate: z.date().nullish(),
    userId: z.string().nullish(),
  });
  const shortUrlData = shortUrlSchema.parse({
    name,
    destination,
    expirationDate,
    userId,
  });

  try {
    const createdShortUrl = await prisma.shortUrl.create({
      data: {
        name: shortUrlData.name,
        destination: shortUrlData.destination,
        expiresAt: shortUrlData.expirationDate,
        userId: shortUrlData.userId,
      },
    });

    return createdShortUrl.name;
  } catch (error) {
    throw error;
  }
}

export async function fetchStatCardsData(userId: string) {
  const shortUrlCount = prisma.shortUrl.count({
    where: { userId },
  });
  const expiredShortUrlCount = prisma.shortUrl.count({
    where: { userId, expiresAt: { lt: new Date(Date.now()) } },
  });
  const activeShortUrlCount = prisma.shortUrl.count({
    where: {
      userId,
      OR: [{ expiresAt: { gt: new Date(Date.now()) } }, { expiresAt: null }],
      active: true,
    },
  });
  const totalShortUrlUses = prisma.shortUrlUse.count({
    where: { shortUrl: { userId } },
  });

  const data = await Promise.all([
    shortUrlCount,
    expiredShortUrlCount,
    activeShortUrlCount,
    totalShortUrlUses,
  ]);

  return data;
}
