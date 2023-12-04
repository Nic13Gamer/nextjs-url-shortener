import prisma from '@/db';
import { User } from '@prisma/client';

export default async function StatsCards({ user }: { user: User }) {
  await new Promise((r) => setTimeout(r, 3000));

  const shortUrlCount = await prisma.shortUrl.count({
    where: { userId: user.id },
  });
  const expiredShortUrlCount = await prisma.shortUrl.count({
    where: { userId: user.id, expiresAt: { lt: new Date(Date.now()) } },
  });
  const totalShortUrlUses = await prisma.shortUrl.aggregate({
    where: { userId: user.id },
    _sum: { uses: true },
  });

  return (
    <div className="grid grid-cols-2 gap-6 w-full">
      <Card title="QuickLinks created" data={shortUrlCount} />
      <Card title="Total link uses" data={totalShortUrlUses._sum.uses ?? 0} />
      <Card title="Expired QuickLinks" data={expiredShortUrlCount} />
      <Card title="PLACEHOLDER" data="0" />
    </div>
  );
}

type CardProps = {
  title: string;
  data: string | number;
};

function Card({ title, data }: CardProps) {
  return (
    <div className="border-2 p-2 rounded-md h-full bg-secondary/20 flex flex-col justify-between gap-1">
      <h1 className="text-center text-xl font-semibold">{title}</h1>

      <p className="lg:text-7xl text-4xl font-extralight text-center mb-5">
        {data}
      </p>
    </div>
  );
}
