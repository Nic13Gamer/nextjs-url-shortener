import { Skeleton } from '../ui/skeleton';

export default function StatsCardsSkeleton() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Skeleton className="flex h-full rounded-md" />
      <Skeleton className="flex h-full rounded-md" />
      <Skeleton className="flex h-full rounded-md" />
      <Skeleton className="flex h-full rounded-md" />
    </div>
  );
}
