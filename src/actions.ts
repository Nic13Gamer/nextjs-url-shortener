'use server';

import { z } from 'zod';
import prisma from './db';
import { generate as generateString } from 'randomstring';

const SHORT_URL_RANDOM_NAME_LENGTH = 10;

export async function createDemoShortUrl(prevState: any, data: FormData) {
  const urlSchema = z.string().url();
  const urlResult = urlSchema.safeParse(data.get('url'));

  if (!urlResult.success) {
    return { message: 'Invalid URL' };
  }

  const currentDate = new Date(Date.now());
  const expirationDate = new Date(
    currentDate.setDate(currentDate.getDate() + 7) // Set expiration date 1 week from now
  );

  const randomName = generateString(SHORT_URL_RANDOM_NAME_LENGTH);

  try {
    await prisma.shortUrl.create({
      data: {
        destination: urlResult.data,
        name: randomName,
        expiresAt: expirationDate,
      },
    });
  } catch (error) {
    return { message: 'Server error. Please try again' };
  }

  return { message: '', url: randomName };
}
