import prisma from '@/db';
import { type ClassValue, clsx } from 'clsx';
import { Session } from 'next-auth';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getUser(session: Session | null) {
  if (!session || !session.user || !session.user.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) return null;

  return user;
}
