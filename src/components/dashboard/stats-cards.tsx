import { fetchStatCardsData } from '@/lib/short-url';
import { User } from '@prisma/client';

export default async function StatsCards({ user }: { user: User }) {
  const [
    shortUrlCount,
    expiredShortUrlCount,
    activeShortUrlCount,
    totalShortUrlUses,
  ] = await fetchStatCardsData(user.id);

  return (
    <div className="flex w-full flex-col gap-4">
      <Card title="Created QuickLinks" data={shortUrlCount} />
      <Card title="Active QuickLinks" data={activeShortUrlCount} />
      <Card title="Total link uses" data={totalShortUrlUses} />
      <Card title="Expired QuickLinks" data={expiredShortUrlCount} />
    </div>
  );
}

type CardProps = {
  title: string;
  data: string | number;
};

function Card({ title, data }: CardProps) {
  return (
    <div className="flex h-full items-center justify-between gap-1 rounded-md border-2 bg-secondary/20 px-3 py-2">
      <h1 className="text-center text-xl font-semibold">{title}</h1>

      <p className="text-center text-4xl font-light">{data}</p>
    </div>
  );
}
