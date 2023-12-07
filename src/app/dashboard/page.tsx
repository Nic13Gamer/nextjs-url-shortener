import { auth } from '@/auth';
import ShortenUrlForm from '@/components/dashboard/shorten-url-form';
import StatsCards from '@/components/dashboard/stats-cards';
import StatsCardsSkeleton from '@/components/dashboard/stats-cards-skeleton';
import { getUserBySession } from '@/lib/utils';
import { Suspense } from 'react';

export default async function Page() {
  const session = await auth();
  const user = await getUserBySession(session);

  if (!user) return null;

  // TODO: created quicklinks table and page to display stats and edit quicklink

  return (
    <div className="container">
      <header className="mb-10 mt-7 flex flex-col gap-1">
        <h1 className="text-center text-5xl font-bold">QuickLink Dashboard</h1>
        <h2 className="text-center text-2xl">Welcome, {user.name}!</h2>
      </header>

      <div className="flex flex-col justify-between gap-10 lg:flex-row">
        <div className="shrink-0 lg:w-[50%]">
          <ShortenUrlForm />
        </div>

        <Suspense fallback={<StatsCardsSkeleton />}>
          <StatsCards user={user} />
        </Suspense>
      </div>
    </div>
  );
}
