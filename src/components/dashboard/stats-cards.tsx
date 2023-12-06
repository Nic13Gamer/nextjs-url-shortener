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
    <div className="grid grid-cols-2 gap-6 w-full">
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
    <div className="border-2 p-2 rounded-md h-full bg-secondary/20 flex flex-col justify-between gap-1">
      <h1 className="text-center text-xl font-semibold">{title}</h1>

      <p className="lg:text-7xl text-4xl font-extralight text-center mb-5">
        {data}
      </p>
    </div>
  );
}
