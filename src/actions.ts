'use server';

import { z } from 'zod';
import { createShortUrl } from './lib/shortUrl';
import { auth } from './auth';
import { getUser } from './lib/utils';
import prisma from './db';
import { revalidatePath } from 'next/cache';

export async function generateDemoShortUrl(prevState: any, data: FormData) {
  const urlSchema = z.string().url();
  const urlResult = urlSchema.safeParse(data.get('url'));

  if (!urlResult.success) {
    return { message: 'Invalid URL' };
  }

  const currentDate = new Date(Date.now());
  const expirationDate = new Date(
    currentDate.setDate(currentDate.getDate() + 7) // Set expiration date 1 week from now
  );

  try {
    const shortUrl = await createShortUrl({
      destination: urlResult.data,
      expirationDate: expirationDate,
    });

    return { message: '', url: shortUrl };
  } catch (error) {
    return { message: 'Server error. Please try again' };
  }
}

export async function generateShortUrl(prevState: any, data: FormData) {
  const session = await auth();
  const user = await getUser(session);

  const formSchema = z.object({
    customName: z.string().max(24).trim(),
    destination: z.string().url(),
  });
  const shortUrlData = formSchema.safeParse({
    customName: data.get('customName'),
    destination: data.get('url'),
  });

  const expirationDateSchema = z.coerce.date();
  let expirationDate;
  if (data.get('expirationDate')) {
    expirationDate = expirationDateSchema.safeParse(data.get('expirationDate'));
  }

  if (!shortUrlData.success || (expirationDate && !expirationDate.success)) {
    return { message: 'An invalid input was received' };
  }

  if (
    await prisma.shortUrl.findUnique({
      where: { name: shortUrlData.data.customName },
    })
  ) {
    return { message: 'This custom name is not available!' };
  }

  try {
    const shortUrl = await createShortUrl({
      name: shortUrlData.data.customName,
      destination: shortUrlData.data.destination,
      expirationDate: expirationDate?.data,
      userId: user?.id,
    });

    revalidatePath('/dashboard');
    return { message: '', url: shortUrl };
  } catch (error) {
    return { message: 'Server error. Please try again' };
  }
}

export async function toggleShortUrlActive({
  active,
  shortUrlId,
}: {
  active: boolean;
  shortUrlId: string;
}) {
  const session = await auth();
  const user = await getUser(session);

  if (!session || !user) {
    return { message: 'Invalid session' };
  }

  const dataSchema = z.object({
    active: z.boolean(),
    shortUrlId: z.string(),
  });
  const dataResult = dataSchema.safeParse({ active, shortUrlId });

  if (!dataResult.success) {
    return { message: 'Invalid input' };
  }

  const shortUrl = await prisma.shortUrl.findUnique({
    where: { id: shortUrlId },
  });
  if (!shortUrl) {
    return { message: 'Invalid input' };
  }

  if (shortUrl.userId !== user.id) {
    return { message: 'You are not the short url owner' };
  }

  try {
    await prisma.shortUrl.update({
      where: { id: shortUrlId },
      data: { active },
    });

    revalidatePath('/dashboard');
    return { message: '' };
  } catch (error) {
    return { message: 'An error occurred' };
  }
}

export async function deleteShortUrl(id: string) {
  const session = await auth();
  const user = await getUser(session);

  if (!session || !user) {
    return { message: 'Invalid session' };
  }

  const idSchema = z.string();
  if (!idSchema.safeParse(id)) {
    return { message: 'Invalid input' };
  }

  const shortUrl = await prisma.shortUrl.findUnique({ where: { id } });
  if (!shortUrl) {
    return { message: 'Invalid input' };
  }

  if (shortUrl.userId !== user.id) {
    return { message: 'You are not the short url owner' };
  }

  try {
    await prisma.shortUrl.delete({ where: { id } });

    revalidatePath('/dashboard');
    return { message: '' };
  } catch (error) {
    return { message: 'An error occurred' };
  }
}
