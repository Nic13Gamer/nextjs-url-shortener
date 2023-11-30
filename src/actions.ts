'use server';

import { z } from 'zod';
import { createShortUrl } from './lib/short-url';
import { auth } from './auth';
import { getUserBySession } from './lib/utils';
import prisma from './db';

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
  const user = await getUserBySession(session);

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

    return { message: '', url: shortUrl };
  } catch (error) {
    return { message: 'Server error. Please try again' };
  }
}
